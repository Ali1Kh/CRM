import { catchAsync } from "../../utils/catchAsync.utils.js";
import { User } from "../../../DB/models/user.model.js";
import jwt from "jsonwebtoken";
import { apiError } from "../../utils/apiError.utils.js";
import crypto from "crypto";

// // import DEV_PERMISSIONS from '../Dev-Data/permissions';

/**
* Verify the given jwt token and return the valid data stored in the token
@param String [token] JWT Token
@return Object
*/

// const producer = new Producer({
//   url: process.env['RABBITMQ_CONNECTION'],
//   exchangeName: process.env['MAILING_EXCHANGE'],
// });

const verifyToken = async (token) => {
  // const asyncVerifyJWT = promisify(jwt.verify);

  //verify token add 2nd arg as process.env['JWT_SECERT_KEY']
  const { id, iat } = jwt.verify(token, process.env["JWT_SECERT_KEY"]);

  return { id, iat };
};

/**
* Create a valid token, valid for limit timestamp
@param String [id] ID of the user to store in token
@return String [] Returns a valid token
*/

const createToken = (id) => {
  return jwt.sign({ id }, process.env["JWT_SECERT_KEY"], {
    expiresIn: process.env["JWT_EXPIRES_IN"],
  });
};

/**
* Create & Send valid JWT & document Data in response
@param res [Object] Response to be sent with token
@param status [Number] Reponse status of the response
@param data [Object] Object of data to be sent
@return Number [] Reponse status of the response
*/

const sendTokenAndResponse = (res, status, data) => {
  const token = createToken(data.id);
  if (data.password) data.password = undefined;
  return res
    .cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000 * 10, httpOnly: true })
    .status(status)
    .json({ status: res.t("success"), token, data });
};

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new apiError("Please enter email & password.", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  const checkpassword = await user?.correctPassword(password, user.password);

  if (!user || !checkpassword) {
    return next(new apiError(res.t("Invalid email or password."), 401));
  }

  sendTokenAndResponse(res, 200, user);
});

/**
* Update the Password of the account
@params id [String] id will be in params, otherwise it will the id of logged-in user
@return Object [res] Retrun response with valid data
*/

export const updatePassword = catchAsync(async (req, res, next) => {
  // const { id } = req.params || req.user
  const { id } = req.user;
  const { oldPassword, password, passwordConfirm } = req.body;

  if ((!req.params.id && !oldPassword) || !password || !passwordConfirm)
    return next(
      new apiError(
        `${res.t("Please provide")} ${
          !req.params.id ? res.t("current-password,") : ""
        } ${res.t("password & password-confirm")}`,
        400
      )
    );

  const user = await User.findById(id).select("+password");
  // const user = await User.findById(id);
  if (!user)
    return next(
      new apiError(
        res.t("No user found with :id or account is un-active."),
        404
      )
    );

  //this will check if the there is id in the param, that means admin is changing password of the sub account
  // if (
  //   !req.params.id &&
  //   !(await user.correctPassword(oldPassword, user.password))
  // )
  //   return next(new apiError(res.t('Your current password is invalid.'), 401));

  if (password !== passwordConfirm)
    return next(
      new apiError(res.t("password & passwordConfirm not matched."), 400)
    );

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  sendTokenAndResponse(res, 200, user);
});

/**
* Signup a new account
@params mainId [String] Id of the admin user
@return Object [res] Retrun response with valid data
*/

export const signup = catchAsync(async (req, res, next) => {
  const { email, password, passwordConfirm, fullname } = req.body;

  const user = await User.create({
    email,
    password,
    passwordConfirm,
    fullname,
  });
  const url = `${req.protocol}://${req.hostname}`;
  // await new Email(user, url).sendWelcome();
  //to start rabbitmq
  if (user) {
    // await producer.publishMessage('auth-mailing', {
    //   email: user.email,
    //   firstname,
    //   lastname,
    //   mailType: 'welcome',
    //   url,
    // });
    return sendTokenAndResponse(res, 201, user);
  }
});

/**
* Request the forget password of the account
* This will send a reset token to your given email address
@query email [String] email address of the account
@return Object [res] Retrun response with a message
*/

export const forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new apiError(res.t("Please provide a valid email."), 400));
  }
  const user = await User.findOne({ email });

  if (!user)
    return next(
      new apiError(res.t("No user found. Or account is deactivated."), 404)
    );

  const resetToken = await user.createResetToken();

  const tokenURl = `${process.env["FRONTEND_APP"]}/auth/reset-password/${resetToken}`;

  // const tokenURl = `${req.protocol}://${req.get(
  //   "host"
  // )}/auth/reset-password/${resetToken}`;

  user.save({ validateBeforeSave: false });

  const publishingData = {
    mailType: "reset-password",
    email: user.email,
    fullname: user.fullname,
    // firstname: user.firstname,
    // lastname: user.lastname,
    url: tokenURl,
  };
  // to start rabbitmq
  // await producer.publishMessage('auth-mailing', publishingData);
  // await sendMail(email, resetToken);

  res.status(200).json({
    status: res.t("success"),
    message: res.t("Reset link sent to your email. Please check your mail."),
  });
});

/**
* Update your password if the given reset token is valid
* You will get the reset token in your mail
@params token [String] reset token for updating password
@return Object [res] Retrun response with valid data
*/

export const resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const { password, passwordConfirm } = req.body;
  if (!token)
    return next(
      new apiError(
        res.t("Please check your mail, you may receive a reset token."),
        400
      )
    );
  if (!password || !passwordConfirm) {
    return next(
      new apiError(res.t("Please provide provide a new password."), 401)
    );
  }

  const decryptToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: decryptToken,
  }).select("+passwordResetToken +passwordResetExpire");

  if (!user) {
    return next(
      new apiError(
        res.t("Invalid reset token, Please check your mail again."),
        401
      )
    );
  }

  if (
    !user.passwordResetToken ||
    (user.passwordResetExpire &&
      user.passwordResetExpire.getTime() < Date.now())
  ) {
    return next(new apiError(res.t("Reset token expired."), 401));
  }

  user.passwordResetToken = "";
  user.passwordResetExpire = null;
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save({ validateBeforeSave: true });
  res.status(200).json({
    status: res.t("success"),
    message: res.t("Password changed successfully."),
  });
});

/**
* Logout the profile
@return Object [res] return the response will no data
*/

export const logoutProfile = catchAsync(async (req, res, next) => {
  res
    .cookie("jwt", "")
    .status(200)
    .json({ status: res.t("success"), data: null });
});

/**
 * Deactive the currently logged-in account
 @return return response with a message of success
 */

export const deactiveAccount = catchAsync(async (req, res, next) => {
  const id = (req.params && req.params.id) || req.user.id;
  await User.findByIdAndUpdate(id, { isActive: false });

  res
    .cookie("jwt", "")
    .status(200)
    .json({
      status: res.t("success"),
      message: res.t("Account deactivated successfully!"),
    });
});

export const logger = catchAsync((req, res, next) => {
  res.status(200).json({ status: "working...." });
});
