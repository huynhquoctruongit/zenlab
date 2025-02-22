import axios from "axios";
import { NEXT_PUBLIC_CMS } from "@/services/helpers";
export const axiosServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.TOKEN_CMS}`,
    timeout: 10000,
  },
});

export const axiosServerDirectus = axios.create({
  baseURL: NEXT_PUBLIC_CMS,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosServerDirectus.interceptors.response.use(function (response: any) {
  return response.data;
});

axiosServer.interceptors.response.use(function (response: any) {
  return response;
});

axiosServer.interceptors.request.use(function (config: any) {
  return config;
});

export const fetcherClient = (url: any, params: any) => {
  if (url) {
    return axiosServer.get(url, { params });
  }
};
export const optionsFetch = {
  fetcher: fetcherClient,
};
export default axiosServer;
