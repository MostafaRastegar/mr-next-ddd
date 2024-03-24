export interface ResponseObject<T> {
  message?: string;
  status: number;
  data: T;
  error?: boolean;
}
