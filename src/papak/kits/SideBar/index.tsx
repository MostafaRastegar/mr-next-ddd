"use client";

import React, { useState } from "react";
import { IconLayoutSidebarLeftCollapse } from "@tabler/icons-react";
import { Layout } from "antd";
import clsx from "clsx";
import { palettes } from "papak/configs/palettes";
import MainMenu, { type MenuItemType } from "../SideBarMenu";

const { Sider } = Layout;

interface SideBarProps {
  items: MenuItemType[];
}

const SideBar: React.FC<SideBarProps> = ({ items }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="xl"
      className="bg-black"
      width={250}
      trigger={
        <div
          className={clsx(
            "flex h-[100%] flex-1 flex-row items-center overflow-hidden bg-gray-900 px-4",
            {
              "justify-center": collapsed,
              "justify-start": !collapsed,
            }
          )}
        >
          <>
            <IconLayoutSidebarLeftCollapse color={`${palettes.gray[500]}`} />
            <span
              className={clsx(
                "h-full w-full overflow-hidden text-nowrap pl-2 text-left text-gray-500 transition-all duration-300",
                {
                  "opacity-0": collapsed,
                  "w-0": collapsed,
                  "pl-0": collapsed,
                  "opacity-100": !collapsed,
                }
              )}
            >
              Collapse sidebar
            </span>
          </>
        </div>
      }
    >
      <MainMenu items={items} />
    </Sider>
  );
};

export default SideBar;
