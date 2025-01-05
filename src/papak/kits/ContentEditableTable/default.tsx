import React from "react";
import { TableProps } from "antd";
import { ExpandableConfig } from "antd/es/table/interface";
import { DispatchSetStateAction } from "papak/_utilsTypes";
import Pagination from "papak/kits/Pagination/default";
import { TableComponents } from "./_partials/TableComponents";

interface ContentEditableTableProps<T extends Object> {
  data: T[];
  count?: number;
  isPending: boolean;
  rowKey?: string;
  hideSelectAll?: boolean;

  paginationPath: string;
  columns: TableProps<T>["columns"];
  setSelectedRowsState?: DispatchSetStateAction<T[]>;
  selectedRowsState?: T[];
  expandable?: ExpandableConfig<T> | undefined;
  selectionType?: "checkbox" | "radio";
  showTotal?: (range: any, total: any) => string;
  showTotalCount?: boolean;
  showQuickJumper?: boolean;
  actions: {
    icon?: JSX.Element;
    label: string;
    key: string;
    disabled?: boolean;
    onClick(): void;
  }[];
}

export const ContentEditableTable = function <T extends Object>({
  data = [],
  count = 0,
  isPending = false,
  columns,
  selectedRowsState,
  setSelectedRowsState,
  rowKey = "",
  actions,
  hideSelectAll = true,
  showQuickJumper,
  paginationPath = "",
  expandable,
  showTotalCount,
  selectionType = "checkbox",
  showTotal,
}: ContentEditableTableProps<T>) {
  return (
    <TableComponents
      pagination={() => (
        <Pagination
          pathUrl={paginationPath}
          total={count || 0}
          showTotal={showTotal}
          showQuickJumper={showQuickJumper}
        />
      )}
      rowKey={rowKey}
      expandable={expandable}
      selectionType={selectionType}
      data={data}
      isPending={isPending}
      hideSelectAll={hideSelectAll}
      columns={columns}
      setSelectedRowsState={setSelectedRowsState}
      selectedRowsState={selectedRowsState}
      actions={actions}
      showTotalCount={showTotalCount}
    />
  );
};
