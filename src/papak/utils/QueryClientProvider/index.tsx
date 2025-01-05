"use client";

import type { PropsWithChildren, ReactNode } from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as QueryClientPro,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import {
  NotificationContextProvider,
  useNotificationContext,
} from "papak/configs/notificationContextProvider";

function QueryClientContextProvider({ children, blacklist }: IProps) {
  const { openNotificationWithIcon } = useNotificationContext();
  const client = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        openNotificationWithIcon("error", "Error", error.message);
        return error;
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        openNotificationWithIcon("error", "Error", error.message);
        return error;
      },
      onSuccess(data, _1, _2, { options: { meta } }) {
        // @ts-ignore
        const requestMethod = data?.config?.method;
        // @ts-ignore
        const requestURL = data?.config?.url;
        const { successMessage } = meta ?? {};

        if (blacklist && blacklist.includes(requestURL)) {
          return null;
        }

        openNotificationWithIcon(
          "success",
          // @ts-ignore
          successMessage?.title || "Successful",
          // @ts-ignore
          successMessage?.msg ||
            // @ts-ignore
            data?.data?.message ||
            // @ts-ignore
            methodMessages?.[requestMethod] ||
            "Job successfully"
        );
      },
    }),
    defaultOptions: {
      queries: { retry: 2 },
    },
  });
  return (
    <QueryClientPro client={client}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientPro>
  );
}

function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <NotificationContextProvider>
      <QueryClientContextProvider>{children}</QueryClientContextProvider>
    </NotificationContextProvider>
  );
}

interface IProps {
  blacklist?: string[];
  children: ReactNode;
}

const methodMessages = {
  put: "Item successfully updated.",
  patch: "Item successfully updated.",
  post: "Item successfully create.",
  delete: "Item successfully remove.",
};

export default QueryClientProvider;
