import Axios, { AxiosError } from "axios";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { get } from "lodash";
import { getToken } from ".";

const request = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 60000, // request timeout
});

function commonReqInterceptor(config: InternalAxiosRequestConfig) {
  const token = getToken()
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return {
    ...config,
  };
}

function commonResInterceptor(res: AxiosResponse) {
  const { config, data } = res;
  const { code, msg, message } = data;

  /**
   * 出现了/oauth/token 接口404 但返回了200 http status的情况
   */
  if ((code !== -1 && config.url) || data instanceof Blob) {
    return res;
  }

  if (+code !== 0) {
    const err = new AxiosError(msg || message || "服务器无返回信息，请联系管理员", "", config, res.request, res);

    return Promise.reject(err);
  }

  return res;
}

const codeMaps: Record<number, string> = {
  400: "错误请求，服务器无法处理",
  401: "未授权，服务器拒绝访问",
  403: "禁止访问， 服务器拒绝请求",
  404: "服务器找不到请求或请求不存在",
  500: "服务器内部错误",
  502: "网关错误",
  503: "服务不可用，服务器暂时过载或维护",
  504: "网关超时",
};

function errorHandler(err: AxiosError) {
  const { response } = err;

  const newErr = new AxiosError(err.message, err.code, err.config, err.request, response);

  Object.assign(newErr, err);

  if (!response || !response.data) {
    newErr.message = "网络异常，请稍后再试";
  } else {
    const { status, data } = response;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    newErr.message = get(data, "msg") || get(data, "message") || get(data, "error_description") || codeMaps[status];
  }

  return Promise.reject(newErr);
}

request.interceptors.request.use(commonReqInterceptor);
request.interceptors.response.use(commonResInterceptor, errorHandler);

export default request;
