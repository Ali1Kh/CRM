import { Schema, model } from "mongoose";
import validator from "validator";
import crypto from "crypto";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please enter your fullname."],
      minLength: [2, "Please use a name of atleast 2 charcters."],
      maxLength: [64, "Please use a name between 64 charcters."],
    },
    email: {
      type: String,
      required: [true, "A user must have a valid email."],
      validate: validator.isEmail,
      unique: true,
      select: true,
    },
    password: {
      type: String,
      minLength: [8, "Password must have at-least 8 characters or letters."],
      maxLength: [32, "Password must be less than 32 characters or letters."],
      required: [true, "Please choose a unique password."],
      select: false,
    },
    passwordConfirm: {
      type: String,
      // required: [true, 'Please confirm your password.'],
      minLength: [8, "Password must have at-least 8 characters or letters."],
      maxLength: [32, "Password must be less than 32 characters or letters."],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Please match your password.",
      },
      select: false,
    },
    profilePicture: {
      type: String,
      default: "default-profilePicture.jpg",
    },
    passwordChangedAt: {
      type: Date,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpire: {
      type: Date,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: {
      virtuals: true,
    },
  }
);

userSchema.methods.createResetToken = async function () {
  const randomToken = crypto.randomBytes(32).toString("hex");
  const resetToken = crypto
    .createHash("sha256")
    .update(randomToken)
    .digest("hex");
  this.passwordResetToken = resetToken;
  this.passwordResetExpire = Date.now() + 10 * 60 * 60 * 1000;
  return randomToken;
};
/**
 *
 * @param {String} inputPassword Password typed by the user
 * @param {String} encryptedPassword EncryptedPassword, by which the typed one will be compare
 * @returns Return true if both passwords match, otherwise return false
 */
userSchema.methods.correctPassword = async function (
  inputPassword,
  encryptedPassword
) {
  return await bcrypt.compare(inputPassword, encryptedPassword);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = "";
  next();
});

export const User = model("User", userSchema);
