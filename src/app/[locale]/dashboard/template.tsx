'use client';

import { type ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  IconBell,
  IconFolder,
  IconLayoutDashboard,
  IconUser,
} from '@tabler/icons-react';
import { Avatar, Dropdown, Layout, MenuProps, Space } from 'antd';
import { customTheme } from 'papak/configs/antdCustomTheme';
import Header from 'papak/kits/Header';
import SideBar from 'papak/kits/SideBar';
import { type MenuItemType, getItem } from 'papak/kits/SideBarMenu';
import { useAccessTokenPayload } from 'papak/utils/useAccessTokenPayload';
import { useThemeProvider } from 'papak/utils/useThemeProvider';
import { blackListToken } from '@/modules/papak_auth/refreshToken';

export default function Template({ children }: { children: ReactNode }) {
  const {
    isDarkMode,
    isRtlMode,
    ConfigProvider,
    handleThemeDirection,
    handleThemeMode,
  } = useThemeProvider();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const userDetails = useAccessTokenPayload<{
    is_staff: boolean;
    user_id: number;
    username: string;
  }>('access_token' as string);

  const profileItems: MenuProps['items'] = [
    {
      label: (
        <span
          className="cursor-pointer text-error-main"
          onClick={() => blackListToken(setLoading)}
        >
          logout
        </span>
      ),
      key: '2',
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">Logout ...</div>
    );
  }

  return (
    <ConfigProvider customTheme={customTheme}>
      <Header
        handleThemeMode={handleThemeMode}
        isDarkMode={isDarkMode}
        handleThemeDirection={handleThemeDirection}
        isRtlMode={isRtlMode}
        logoText="MY Dashboard"
        profileMenu={
          <Dropdown menu={{ items: profileItems }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar size="small" src={<IconUser />} />
                <span className=" text-white">{userDetails?.username}</span>
              </Space>
            </a>
          </Dropdown>
        }
        notification={
          <Space className="cursor-pointer">
            <Avatar
              size="small"
              src={<IconBell />}
              onClick={() => router.push('/en/dashboard/notification')}
            />
          </Space>
        }
      />
      <Layout className="flex flex-row">
        <SideBar items={items} />
        <div className="relative flex flex-1 flex-col">
          <div className="border-b">
            <div className="page-title py-6"></div>
          </div>
          <div className="flex flex-1 flex-col px-4 pb-4">{children}</div>
        </div>
      </Layout>
    </ConfigProvider>
  );
}

const items: MenuItemType[] = [
  getItem(
    <Link href="/en/dashboard">Dashboard</Link>,
    'dashboard',
    <IconLayoutDashboard />,
  ),
  getItem(
    <Link href="/en/dashboard/users">Users</Link>,
    'users',
    <IconFolder />,
  ),
];
