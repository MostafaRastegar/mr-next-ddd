"use client";

import React from "react";
import { Menu } from "antd";
import type { GetProp, MenuProps } from "antd";
import { useCurrentPath } from "papak/utils/useCurrentPath";

// import { useTranslations } from 'next-intl';

export type MenuItemType = GetProp<MenuProps, "items">[number];

export function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItemType[]
): MenuItemType {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItemType;
}

interface SideBarMenuProps {
  items: MenuItemType[];
}
const SideBarMenu = ({ items }: SideBarMenuProps) => {
  // const t = useTranslations('Boilerplate');
  // console.log('object :>> ', t('title'));
  const { currentPath, pathnameList } = useCurrentPath();

  const slicePathnameList = [...pathnameList].slice(3);
  return (
    <Menu
      mode="inline"
      theme="dark"
      defaultSelectedKeys={[...slicePathnameList, currentPath]}
      defaultOpenKeys={slicePathnameList}
      items={items}
      className="
      [&_.ant-menu-inline-collapsed >.ant-menu-item]:px-[calc(50% 
      - 12px - 0px)] relative sticky
      top-[70px] pt-4
       [&_.ant-menu-item-icon]:align-middle
       [&_.ant-menu-item-selected:after]:left-0
       [&_.ant-menu-item-selected:after]:w-1
       [&_.ant-menu-item-selected]:bg-secondary-main
      "
    />
  );
};

export default SideBarMenu;
