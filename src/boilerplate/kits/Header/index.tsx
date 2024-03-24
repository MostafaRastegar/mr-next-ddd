'use client';

import React from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import {
  MoonOutlined,
  NotificationOutlined,
  SunOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Space,
  theme,
} from 'antd';

const { Header: AntHeader } = Layout;
const { Item } = Menu;

interface SideBarProps {
  handleThemeMode: () => void;
  isDarkMode: boolean;
  handleThemeDirection: () => void;
  isRtlMode: boolean;
}

const Header: React.FC<SideBarProps> = ({
  handleThemeMode,
  isDarkMode,
  isRtlMode,
  handleThemeDirection,
}) => {
  const segment = useSelectedLayoutSegment();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const profileItems: MenuProps['items'] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ];

  const menu = (
    <Menu>
      <Item>English</Item>
      <Item>فارسی</Item>
    </Menu>
  );
  return (
    <AntHeader
      className="sticky top-0 z-[999] flex items-center justify-end gap-4 border-b p-0 px-4 dark:border-gray-700"
      style={{ background: colorBgContainer }}
    >
      <div>
        <Button
          onClick={() => handleThemeDirection()}
          shape="circle"
          icon={<span className="font-bold">{isRtlMode ? 'EN' : 'فا'}</span>}
        />
      </div>
      <div>
        <Button
          shape="circle"
          onClick={() => handleThemeMode()}
          icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
        />
      </div>
      <div>
        <Badge count={5}>
          <Button icon={<NotificationOutlined />} />
        </Badge>
      </div>

      <div className="flex flex-row items-center">
        <Dropdown menu={{ items: profileItems }} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <span className="p-1">Mostafa</span>
              <Avatar size="small" icon={<UserOutlined />} />
            </Space>
          </a>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;
