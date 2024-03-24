import dynamic from 'next/dynamic';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { Card, Skeleton, Statistic, Timeline } from 'antd';
import Breadcrump from '@/components/Breadcrump';
import Lists from '../_components/Lists';
import Tables from '../_components/Tables';

const LineChart = dynamic(() => import('../_components/LineChart'), {
  ssr: false,
  loading: () => <Skeleton paragraph={{ rows: 15 }} />,
});
const GaugeChart = dynamic(() => import('../_components/GaugeChart'), {
  ssr: false,
  loading: () => <Skeleton paragraph={{ rows: 15 }} />,
});

export const DashboardView = () => {
  return (
    <>
      <Breadcrump />
      <div
        style={{
          minHeight: 360,
        }}
      >
        <div className="grid grid-cols-1 gap-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card>
              <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
            <Card>
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
            <Card>
              <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
            <Card>
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <div className="col-span-3 max-lg:col-span-full">
              <Card>
                <Tables />
              </Card>
            </div>
            <div className="col-span-2 flex flex-col gap-4 max-lg:col-span-full">
              <Card>
                <div className="size-full overflow-x-auto">
                  <LineChart />
                </div>
              </Card>
              <Card>
                <Statistic
                  className="min-h-[120px]"
                  title="Active"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <div className="col-span-3 max-lg:col-span-full">
              <Card>
                <div className="size-full overflow-x-auto">
                  <GaugeChart />
                </div>
              </Card>
            </div>
            <div className="col-span-2 flex flex-col gap-8">
              <Card>
                <Timeline
                  mode="alternate"
                  items={[
                    {
                      children: 'Create a services site 2015-09-01',
                    },
                    {
                      children: 'Solve initial network problems 2015-09-01',
                      color: 'green',
                    },
                    {
                      dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                      children: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
                    },
                    {
                      color: 'red',
                      children: 'Network problems being solved 2015-09-01',
                    },
                    {
                      children: 'Create a services site 2015-09-01',
                    },
                    {
                      dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                      children: 'Technical testing 2015-09-01',
                    },
                  ]}
                />
              </Card>
              <Card>
                <Lists />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
