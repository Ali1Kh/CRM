/**
* Checks if the user is logged in before accessing the route
* Use this route if you want to protect the route
@return Object [next] Retrun next obj to call the next middleware
*/

import { catchAsync } from "../utils/catchAsync.utils.js";

export const protectedRoute = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.header("authorization") &&
    req.header("authorization").startsWith("Bearer")
  )
    token = req.header("authorization")?.split(" ")[1];

  if (req.cookies && req.cookies.jwt) token = req.cookies.jwt;

  if (req.body.token) token = req.body.token;

  const decode = token && (await verifyToken(token));

  if (!token || !decode.id) {
    return next(
      new apiError(res.t("Token invalid, Please login again to get one!"), 400)
    );
  }

  const userData = await User.findById(decode.id).select("+passwordChangedAt");

  if (
    userData.passwordChangedAt &&
    userData.passwordChangedAt > decode.iat * 1000
  ) {
    return next(
      new apiError(
        res.t(
          "User changed the password after issuing token. Please login again."
        ),
        400
      )
    );
  }

  req.user = userData;

  next();
});
