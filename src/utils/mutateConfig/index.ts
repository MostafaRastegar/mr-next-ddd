export default function mutateConfig(
  config: { onSuccess: any; notShowSuccess?: any; onError?: any },
  extraConfig = {}
) {
  const notShowSuccess = config?.notShowSuccess;
  return {
    onSuccess: (data: { message: any }) => {
      if (notShowSuccess) {
        return false;
      }
      console.log({
        message: "با موفقیت انجام شد!",
      });
      if (!!config?.onSuccess) {
        config?.onSuccess(data);
      }
    },
    onError: (data: string) => {
      console.log(data);
      if (!!config?.onError) {
        config?.onError(data);
      }
    },
    ...extraConfig,
  };
}
