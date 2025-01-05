import { FormInstance } from "antd";

export const formErrorHandler = (
  form: FormInstance,
  error: { [v: string]: string[] }
) => {
  if (!error) {
    return [];
  }
  const errorMaped = Object.keys(error).map((item) => ({
    name: item,
    errors: error[item],
  }));
  return form.setFields(errorMaped);
};
