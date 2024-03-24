import { ResponseObject } from '@/modules/_modulesTypes';

interface ServiceResponseHandlerProps<T> {
  onSuccess?: (response: ResponseObject<T>) => any;
  onError?: (error: unknown) => ResponseObject<T>;
}

export const serviceHandler = async <T>(
  service: () => ResponseObject<T> | unknown,
  options?: ServiceResponseHandlerProps<T>,
): Promise<ResponseObject<T>> => {
  try {
    const response = (await service()) as unknown as ResponseObject<T>;
    if (
      response &&
      typeof response === 'object' &&
      'status' in response &&
      'data' in response
    ) {
      if (options?.onSuccess) {
        options.onSuccess(response);
      }
      return response;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    if (options?.onError) {
      return options.onError(error);
    }
    throw error;
  }
};
