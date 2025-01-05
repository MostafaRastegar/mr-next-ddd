import { Empty, Skeleton } from 'antd';

interface HandleNoDataProps {
  dataLength?: number;
  children: React.ReactNode;
  isPending: boolean;
}
export default function HandleNoData({
  dataLength = 0,
  isPending = false,
  children,
}: HandleNoDataProps) {
  if (isPending) {
    return <Skeleton />;
  }

  if ((dataLength = 0)) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return children;
}
