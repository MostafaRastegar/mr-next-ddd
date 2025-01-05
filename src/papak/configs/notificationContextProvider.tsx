"use client";

import { createContext, useContext } from "react";
import {
  type OpenNotificationWithIcon,
  useNotification,
} from "papak/utils/useNotification";

export const NotificationContext = createContext(
  {} as { openNotificationWithIcon: OpenNotificationWithIcon }
);

export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { contextHolder, openNotificationWithIcon } = useNotification();
  return (
    <NotificationContext.Provider value={{ openNotificationWithIcon }}>
      <>
        {contextHolder}
        {children}
      </>
    </NotificationContext.Provider>
  );
};
