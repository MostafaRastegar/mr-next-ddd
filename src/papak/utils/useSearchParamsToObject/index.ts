import { useSearchParams } from 'next/navigation';

export function useSearchParamsToObject(): {
  page: string;
  page_size: string;
  [v: string]: string;
} {
  const queryParams = useSearchParams();
  const pageParams = queryParams.get('page') || '1';
  const sizeParams = queryParams.get('page_size') || '50';
  const result: { [v: string]: string | string[] } = {};

  queryParams.forEach((_value: any, key: string) => {
    if (queryParams.getAll(key).length > 1) {
      result[key] = queryParams.getAll(key);
    } else {
      if (queryParams.get(key) !== undefined) {
        result[key] = queryParams.get(key)!;
      }
    }
  });

  return { ...result, page: pageParams, page_size: sizeParams };
}
