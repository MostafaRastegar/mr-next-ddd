import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Form } from 'antd';
import clsx from 'clsx';
import { AnyObject } from 'papak/_utilsTypes';
import objectToQueryString from 'papak/utils/objectToQueryString';
import { useSearchParamsToObject } from 'papak/utils/useSearchParamsToObject';

export const PageFilterForm: React.FC<{
  children: React.ReactNode;
  formClassName?: string;
  childClassName?: string;
  formDataMapper?: (v: AnyObject) => AnyObject;
  layout?: 'inline' | 'vertical';
}> = ({
  children,
  formClassName,
  childClassName,
  layout = 'inline',
  formDataMapper = (v) => v,
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const initData = useSearchParamsToObject();
  const [formRef] = Form.useForm();
  useEffect(() => {
    formRef.resetFields();
    formRef.setFieldsValue(initData);
  }, [initData]);
  return (
    <Form
      form={formRef}
      layout={layout}
      onFinish={(formData) => {
        const createdQueryString = objectToQueryString(
          formDataMapper(formData),
        );
        return router.push(
          pathName +
            '?page=1&' +
            `page_size=${initData.page_size}&` +
            createdQueryString,
        );
      }}
      autoComplete="off"
      initialValues={initData}
      className={clsx('w-full', formClassName)}
    >
      {children}
    </Form>
  );
};
