"use client";
import axios from "axios";
import { directus } from "../directus";
import { getCookie, setCookie } from "react-use-cookie";
import { getHostname } from "@/services/helpers";

export let isRefreshing = false;
export let refreshSubscribers = [];
let callbackErrorAuthentication = () => {};

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const updateIsRefreshing = (value: any) => {
  isRefreshing = value;
};
export const updateRefreshSubscribers = (value: any) => {
  refreshSubscribers = value;
};
const removeCookie = () => {
  setCookie("refresh_token", "");
  setCookie("expires", "");

  var params: any = {};
  params["SameSite"] = "None";
  params["Secure"] = true;
  params["domain"] = getHostname(location.hostname);
  params["days"] = 1000;
  setCookie("auth_token", "", params);
};

export const refreshAccessToken = async () => {
  const res: any = await directus.refresh().catch((error: any) => {
    removeCookie();
    directus.logout();
    return null;
  });

  if (!res) {
    removeCookie();
    return null;
  }
  
  const { access_token, expires } = res;
  setCookie("expires", expires);
  var params: any = {};
  params["SameSite"] = "None";
  params["Secure"] = true;
  params["domain"] = getHostname(location.hostname);
  setCookie("auth_token", access_token, params);
  return access_token;
};

export function subscribeTokenRefresh(cb: any) {
  refreshSubscribers.push(cb as never);
}

export function onRrefreshed(token: any) {
  refreshSubscribers.map((cb: any) => cb(token));
  refreshSubscribers = [];
}

export const constructCallBack = (handle: any) => {
  callbackErrorAuthentication = handle;
};

export async function interceptorError(error: any) {
  const auth_token = getCookie("auth_token");
  if (!auth_token) {
    return Promise.reject(error);
  }

  if (error?.response?.status == 401 || error?.response?.status === 403) {
    const originalRequest = error.config;
    const retryOrigReq = new Promise((resolve, reject) => {
      subscribeTokenRefresh((token: any) => {
        originalRequest.headers["Authorization"] = token ? "Bearer " + token : "";
        resolve(axios(originalRequest));
      });
    });
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const result: any = await refreshAccessToken();
        if (!result) {
          isRefreshing = false;
          return Promise.reject(error);
        }
        isRefreshing = false;
        onRrefreshed(result);
      } catch (error) {
        isRefreshing = false;
        callbackErrorAuthentication();
        return Promise.reject(error);
      }
    }
    return retryOrigReq;
  } else {
    return Promise.reject(error);
  }
}
