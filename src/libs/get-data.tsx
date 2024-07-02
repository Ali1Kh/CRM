import axios from "axios";
import config from "../services/config";

axios.defaults.baseURL = config.api_url;

export interface IGetData {
  token?: string;
  locale?: string;
  url: string;
  data?: any;
  method: string;
  params?: any;
}

export const getData = async ({
  url,
  token,
  locale,
  data,
  method,
  params,
}: IGetData) => {
  // const session = await getServerSession(authOptions);
  // do something for session in reactjs
  // const auth_token = session?.user.token || token;
  const auth_token = token;
  try {
    const headers: any = {
      locale,
    };
    // if (auth_token) headers['Authorization'] = 'Bearer ' + auth_token;

    const response = await axios({ url: url, headers, data, method, params });

    if (response) return Promise.resolve(response.data);
  } catch (error: any) {
    if (error.status === 500) throw Error("Something went wrong!");
    if (error.response) return Promise.reject(error.response);
    return Promise.reject(error);
  }
};
