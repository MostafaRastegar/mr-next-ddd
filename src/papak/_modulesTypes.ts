export interface ResponseObject<T> {
  message?: string;
  status: number;
  data: T;
  error?: boolean;
}

export interface PaginationList<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export interface PaginationParams {
  page: string;
  page_size: string;
  [v: string]: string;
}
