import {
  AxiosError,
  AxiosInstance, // AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { AnyObject } from 'papak/_utilsTypes';
// import axiosRetry from 'axios-retry';
import Cookies from 'universal-cookie';
import { refreshToken } from '@/modules/papak_auth/refreshToken';

const cookies = new Cookies(null, { path: '/' });

export interface SuccessResponse extends AxiosResponse {
  message: string;
  error: boolean;
}

export type CustomError = {
  message: string;
  status_code: number;
  details: { [v: string]: string[] };
  error: boolean;
};

export interface ErrorResponse {
  message: string[];
  status: number;
  data: { error: CustomError };
  error: boolean;
}

const onRequest = (
  config: InternalAxiosRequestConfig,
  withHeader: boolean,
): InternalAxiosRequestConfig => {
  const accessToken = cookies.get('access_token');

  const deleteConfigHeader = () => {
    if (config && config.headers) {
      delete config.headers['Authorization'];
    }
  };

  if (withHeader === false) {
    deleteConfigHeader();
    return config;
  }

  if (accessToken) {
    if (config && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
  } else {
    deleteConfigHeader();
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject({
    message: error?.response?.statusText,
    status: error?.response?.status,
    data: error?.response?.data,
  });
};

const onResponse = (response: AxiosResponse): SuccessResponse => {
  return {
    ...response,
    message: response.statusText,
    error: false,
  };
};

export const onResponseError = async (
  error: AxiosError<{ error: CustomError }>,
): Promise<ErrorResponse> => {
  const errorData = error?.response?.data?.error as unknown as CustomError;
  const checkedRefreshUrl = error.request.responseURL
    ? error.request.responseURL.split('/').includes('refresh')
    : false;
  if (error?.response?.status === 401 && !checkedRefreshUrl) {
    // impilement refre`sh token with post request
    await refreshToken();
    // redirect('/login');
  }
  // if (error?.response?.data?.error)
  // alert("Error!: " + error?.response?.data?.error);

  // if (!error.response) {
  //   exceptionHandlers.handle503();
  // }
  // const exceptionHandlersMethod = (status) => `handle${status}`;
  // // @ts-ignore
  // exceptionHandlers[exceptionHandlersMethod(error.response.status)]();

  // if (errorMessage) {
  //   toast.error(errorMessage);
  // }

  if (!errorData) {
    return Promise.reject({
      message: 'An error has occurred.',
      status_code: 500,
      details: [],
      error: true,
    });
  }

  return Promise.reject({
    message: errorData?.message,
    status: errorData?.status_code,
    details: errorData?.details,
    error: true,
  });
};

// const retryRequest = (axiosInstance: AxiosInstance) => {
//   axiosRetry(axiosInstance, {
//     retries: 3,
//     retryDelay: (retryCount) => {
//       return retryCount * 1500;
//     },
//   });
//   return axiosInstance;
// };

export const setupInterceptorsTo = (
  axiosInstance: AxiosInstance,
  withHeader = true,
): AxiosInstance => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => onRequest(config, withHeader),
    onRequestError,
  );
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
};
