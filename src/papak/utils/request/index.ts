import axios from 'axios';
import { setupInterceptorsTo } from './interceptors';

interface RequestConfigs {[v:string]: any}
export const request = (configs: RequestConfigs = 
  {}
) => setupInterceptorsTo(
  axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
    ...configs
  }),
);
export const requestWithoutAuth = (configs: RequestConfigs = {}) => setupInterceptorsTo(axios.create({
  ...configs
}), false);

export default request;
