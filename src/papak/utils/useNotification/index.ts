import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

export type OpenNotificationWithIcon = (
  type: NotificationType,
  message: React.ReactNode,
  description?: React.ReactNode
) => void;

export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: React.ReactNode,
    description: React.ReactNode
  ) => {
    api[type]({
      message,
      description,
    });
  };

  return { openNotificationWithIcon, contextHolder };
};
