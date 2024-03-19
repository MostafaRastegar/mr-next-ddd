import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

export interface SuccessResponse extends AxiosResponse {
  message: string;
  error: boolean;
}

export interface ErrorResponse {
  message: string[];
  status: number;
  data: any;
  error: boolean;
}

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const accessToken = cookies.get('access_token');
  if (accessToken) {
    if (config && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
  } else {
    if (config && config.headers) {
      delete config.headers['Authorization'];
    }
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
  error: AxiosError,
): Promise<ErrorResponse> => {
  // console.log('error?.response?.status :>> ', error?.response?.status);
  // if (error?.response?.status === 401 || error?.response?.status === 403) {
  //   redirect('/login');
  // }
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

  return Promise.reject({
    message: error?.message,
    status: error?.response?.status || 500,
    data: error.response?.data,
    error: true,
  });
};

// const retryRequest = (axiosInstance: AxiosInstance) => {
//   axiosRetry(axiosInstance, {
//     retries: 1,
//     retryDelay: (retryCount) => {
//       return retryCount * 1500;
//     },
//   });
// };

export const setupInterceptorsTo = (
  axiosInstance: AxiosInstance,
  withHeader = true,
): AxiosInstance => {
  if (withHeader) {
    // @ts-ignore
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
  }
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
};
