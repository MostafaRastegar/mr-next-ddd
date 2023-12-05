import { useMutation as useRqMutation } from '@tanstack/react-query';

const useMutation = (actionService, config) => {
  const mutationConfigs = {};
  if (!!config?.onSuccess) {
    mutationConfigs['onSuccess'] = async (data) => {
      if (data?.response && data.response?.status >= 400) {
        config.onError(data?.response?.data?.error);
        return data;
      }
      return config.onSuccess(data);
    };
  }
  if (!!config?.onError) {
    mutationConfigs['onError'] = async (data) => {
      return config.onError(data);
    };
  }

  return useRqMutation((params, config) => {
    return actionService(params, config);
  }, mutationConfigs);
};

export default useMutation;
