"use client";

import { useLayoutEffect, useRef } from "react";
import { Pagination } from "antd";
import { AnyObject } from "papak/_utilsTypes";
import { useParamsChange } from "./useParamsChange";

interface PaginationCPProps {
  total: number;
  pathUrl: string;
  showQuickJumper?: boolean;
  showTotal?: (range: any, total: any) => React.ReactNode;
  rest?: AnyObject;
}

const PaginationCP = ({
  total,
  showQuickJumper,
  pathUrl,
  showTotal,
  ...rest
}: PaginationCPProps) => {
  const pagiantionRef = useRef();
  const { onChangeHandler, pageParams, sizeParams } = useParamsChange(pathUrl);

  useLayoutEffect(() => {
    const paginationRefCurrent =
      pagiantionRef.current as unknown as HTMLElement;
    const customPaginaiton =
      paginationRefCurrent.querySelector(".custom-pagination");

    const totalText = customPaginaiton?.querySelector(
      ".ant-pagination-total-text"
    ) as unknown as HTMLElement;

    const pageText = customPaginaiton?.querySelector(".ant-pagination-options");

    const childLength = customPaginaiton?.children.length;
    pageText?.classList.add(`ml-auto`);
    totalText.style.marginLeft = !!pageText ? "4px" : "auto";
    // @ts-ignore
    totalText.style.order = childLength;
  }, []);

  return (
    <div ref={pagiantionRef as unknown as React.RefObject<HTMLDivElement>}>
      <Pagination
        className="custom-pagination flex items-center"
        current={!!pageParams ? parseInt(pageParams, 10) : 1}
        total={total}
        showTotal={(total, range) => (
          <div className="margin-8-t  ml-2">
            Showing {`${range[0]} - ${range[1]} of ${total}`}
          </div>
        )}
        onChange={onChangeHandler}
        pageSize={parseInt(sizeParams, 10)}
        showQuickJumper={showQuickJumper}
        pageSizeOptions={["10", "30", "50", "100"]}
        showSizeChanger
        showPrevNextJumpers
        {...rest}
      />
    </div>
  );
};

export default PaginationCP;
