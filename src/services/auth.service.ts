import axios from "axios";
import config from "./config";
import { getData } from "../libs/get-data";

axios.defaults.baseURL = config.api_url;

interface ILogin {
  email: string;
  password: string;
}

interface IResetPassword {
  password: string;
  passwordConfirm: string;
}

interface IForgetPassword {
  email: string;
}

interface IRegisterAccount {
  email: string;
  password: string;
  fullname: string;
}

// export const login = async (data: ILogin) =>
//   apiRequeset({ data, url: config.login.url });
export const reset_password = async (data: IResetPassword, token: string) =>
  getData({
    data,
    url: config.reset_password.url + token,
    method: config.reset_password.method,
  });

export const forget_password = async (data: IForgetPassword) =>
  getData({
    data,
    url: config.forget_password.url,
    method: config.forget_password.method,
  });
export const register_account = async (data: IRegisterAccount) =>
  getData({
    data,
    url: config.signup.url,
    method: config.signup.method,
  });
