import axios from "axios";
import config from "./config";
import { getData } from "../libs/get-data";

axios.defaults.baseURL = config.api_url;

// export const login = async (data: ILogin) =>
//   apiRequeset({ data, url: config.login.url });
export const getLatestPosts = async ({ searchParams }: { searchParams: any }) =>
  getData({
    url: config.posts.url,
    method: "GET",
    params: searchParams,
  });

export const getOnePost = async ({ id }: { id: any }) =>
  getData({
    url: config.posts.url + "/" + id,
    method: "GET",
  });
