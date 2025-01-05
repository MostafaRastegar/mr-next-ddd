import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconArrowDown,
  IconArrowNarrowDown,
  IconArrowNarrowUp,
  IconArrowUp,
  IconX,
} from "@tabler/icons-react";
import clsx from "clsx";
import { useMakeSort } from "papak/utils/useMakeParamsUrl";

export const useTableAction = ({ selectedRowsState, columns }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const router = useRouter();
  const { onSort, orderingParams, originalPath } = useMakeSort();
  const sortedColumns = () => {
    if (columns && !!columns?.length) {
      return columns.map((item: any) => {
        return {
          ...item,
          title: (
            <span
              className={clsx({
                "cursor-pointer": !item.notSortable,
                "pointer-events-none": item.notSortable,
              })}
              onClick={() => {
                if (orderingParams === `-${item.dataIndex}`) {
                  return router.push(originalPath);
                }
                return onSort(item.dataIndex);
              }}
            >
              <div className="flex items-center justify-start">
                <span>{item?.title}</span>
                {/* {item.dataIndex === orderingParams ? (
                  <IconArrowDown />
                ) : (
                  <IconArrowUp />
                )} */}
                <div
                  className={clsx("relative flex", {
                    hidden: item.notSortable,
                  })}
                >
                  <IconArrowNarrowDown
                    stroke={1.5}
                    className={clsx("absolute ltr:left-2 rtl:right-2", {
                      "text-primary-main":
                        orderingParams === `-${item.dataIndex}`,
                      "text-gray-300": orderingParams !== `-${item.dataIndex}`,
                    })}
                  />
                  <IconArrowNarrowUp
                    stroke={1.5}
                    className={clsx({
                      "text-primary-main": item.dataIndex === orderingParams,
                      "text-gray-300": orderingParams !== item.dataIndex,
                    })}
                  />
                </div>
              </div>
            </span>
          ),
        };
      });
    }
  };

  useEffect(() => {
    if (selectedRowsState && selectedRowsState?.length === 0) {
      setSelectedRowKeys([]);
    }
  }, [selectedRowsState]);

  return {
    sortedColumns,
    collapsed,
    setCollapsed,
    selectedRowKeys,
    setSelectedRowKeys,
  };
};

export const _rowSelectionHandler = function <T>(
  selectedRowKeys: any,
  setSelectedRowsState: Dispatch<SetStateAction<T[]>>,
  setSelectedRowKeys: any
) {
  return {
    selectedRowKeys,
    onChange: (_selectedRowKeys: any, selectedRows: SetStateAction<T[]>) => {
      setSelectedRowsState(selectedRows);
      setSelectedRowKeys(_selectedRowKeys);
    },
    onSelectAll: (
      _selected: any,
      selectedRows: SetStateAction<T[]>,
      _changeRows: any
    ) => {
      setSelectedRowsState(selectedRows);
    },
  };
};
