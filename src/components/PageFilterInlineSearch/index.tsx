'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button, Form, Input } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import clsx from 'clsx';
import { AnyObject } from 'papak/_utilsTypes';
import objectToQueryString from 'papak/utils/objectToQueryString';
import { useMakeParamsUrl } from 'papak/utils/useMakeParamsUrl';
import usePrevious from 'papak/utils/usePrevious';
import { useSearchParamsToObject } from 'papak/utils/useSearchParamsToObject';
import { createPortal } from 'react-dom';
import { PageFilterForm } from '../PageFilterForm';

export const PageFilterInlineSearch = ({
  title,
  children,
  className,
  quickFilterData,
  searchBar = true,
  inlineFilter,
  layout,
  formDataMapper,
}: {
  title: React.ReactNode;
  layout?: 'inline' | 'vertical';
  className?: string;
  children?: React.ReactNode;
  inlineFilter?: () => React.ReactNode;
  quickFilterData?: DefaultOptionType[];
  searchBar?: boolean;
  formDataMapper?: (v: AnyObject) => AnyObject;
}) => {
  const { resetPage } = useMakeParamsUrl();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsObject = useSearchParamsToObject();

  const prevSearchParams = usePrevious(searchParams.toString());
  const [filter] = useState(true);
  const [toggleFilter, setToggleFilter] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (Object.keys(paramsObject).length > 2) {
      setToggleFilter(true);
    }
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!filter) {
      resetPage();
    } else {
      const builedPath =
        '?' + (prevSearchParams ?? objectToQueryString(paramsObject));
      router.replace(pathname + builedPath);
    }
  }, [filter]);

  return (
    mounted && (
      <>
        {createPortal(
          <PageFilterForm
            layout={layout}
            formDataMapper={formDataMapper}
            formClassName={clsx(className, {
              'flex flex-col': !!children,
            })}
          >
            <div className="flex w-full items-center px-4">
              <h2
                className={clsx([
                  'whitespace-nowrap text-lg font-[600] leading-[22px] text-gray-900 ltr:mr-6 ltr:pr-6 rtl:ml-6 rtl:pl-6',
                  {
                    'ltr:border-r rtl:border-l':
                      !!quickFilterData?.length || inlineFilter || searchBar,
                  },
                ])}
              >
                {title}
              </h2>

              {inlineFilter && inlineFilter()}
              {!children && searchBar && (
                <>
                  <Form.Item
                    name="search"
                    colon={false}
                    label={<div className="font-[500]">search</div>}
                  >
                    <Input size="small" />
                  </Form.Item>
                  <Form.Item id="submit">
                    <Button size="small" htmlType="submit" type="default">
                      search
                    </Button>
                  </Form.Item>
                </>
              )}
            </div>
            {toggleFilter && (
              <div className="flex flex-row flex-wrap gap-4 px-6 py-2">
                {children}
              </div>
            )}
          </PageFilterForm>,

          document?.querySelector('.page-title') as HTMLElement,
        )}
      </>
    )
  );
};
