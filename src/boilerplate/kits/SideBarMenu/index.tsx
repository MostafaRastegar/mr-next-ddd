import React from 'react';
import Link from 'next/link';
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import type { GetProp, MenuProps } from 'antd';
import { useTranslations } from 'next-intl';

type MenuItem = GetProp<MenuProps, 'items'>[number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Admin', 'sub1', <AppstoreOutlined />, [
    getItem(
      <Link href="/en/dashboard">Dashboard</Link>,
      '1',
      <CalendarOutlined />,
    ),
    getItem(
      <Link href="/en/dashboard/profile">Profile</Link>,
      '2',
      <MailOutlined />,
    ),
  ]),

  getItem(
    <Link href="https://ant.design" target="_blank" rel="noopener noreferrer">
      Ant Design
    </Link>,
    'ant',
    <LinkOutlined />,
  ),
  getItem(
    <Link
      href="https://ahooks.js.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Ahooks
    </Link>,
    'Ahooks',
    <LinkOutlined />,
  ),
  getItem(
    <Link
      href="https://tailwindcss.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Tailwindcss
    </Link>,
    'Tailwindcss',
    <LinkOutlined />,
  ),
  getItem('Navigation Two', 'sub5', <AppstoreOutlined />, [
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
    getItem('Submenu', 'sub1-2', null, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
    ]),
  ]),
  getItem('Navigation Three', 'sub2', <SettingOutlined />, [
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
  ]),
];

const MainMenu = () => {
  const t = useTranslations('Boilerplate');
  console.log('object :>> ', t('title'));
  return (
    <Menu
      mode="inline"
      theme="dark"
      defaultOpenKeys={['sub1']}
      style={{ height: '100%' }}
      items={items}
    />
  );
};

export default MainMenu;
