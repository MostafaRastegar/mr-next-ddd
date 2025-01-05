"use client";

import React, { useLayoutEffect, useRef } from "react";
import { Pagination } from "antd";
import { useParamsChange } from "../useParamsChange";

interface PaginationCPProps {
  total: number;
  pathUrl: string;
  showQuickJumper?: boolean;
  showTotal?: (range: any, total: any) => React.ReactNode;
}

const PaginationCP = ({
  total,
  showQuickJumper,
  pathUrl,
  showTotal,
}: PaginationCPProps) => {
  const pagiantionRef = useRef();

  const { onChangeHandler, pageParams, sizeParams } = useParamsChange(pathUrl);
  useLayoutEffect(() => {
    const paginationRefCurrent =
      pagiantionRef.current as unknown as HTMLElement;
    const customPaginaiton =
      paginationRefCurrent.querySelector(".custom-pagination");

    const pageText = customPaginaiton?.querySelector(".ant-pagination-options");
    pageText?.classList.add(`ml-auto`);
  }, []);
  return (
    <div
      ref={pagiantionRef as unknown as React.RefObject<HTMLDivElement>}
      className="flex flex-col justify-center rtl:[&_.ant-pagination-options]:mr-auto"
    >
      <Pagination
        className="custom-pagination flex items-center"
        current={!!pageParams ? parseInt(pageParams, 10) : 1}
        total={total}
        showTotal={showTotal}
        onChange={onChangeHandler}
        pageSize={parseInt(sizeParams, 10)}
        showQuickJumper={showQuickJumper}
        pageSizeOptions={["10", "30", "50", "100"]}
        showSizeChanger
        showPrevNextJumpers
      />
    </div>
  );
};

export default PaginationCP;
