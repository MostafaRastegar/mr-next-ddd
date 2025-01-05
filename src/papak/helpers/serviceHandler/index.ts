import type { ResponseObject } from 'papak/_modulesTypes';

interface ServiceResponseHandlerProps<T> {
  onSuccess?: (response: ResponseObject<T>) => any;
  onError?: (error: ResponseObject<any>) => any;
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
      options.onError(error as unknown as any);
    }
    throw error;
  }
};
