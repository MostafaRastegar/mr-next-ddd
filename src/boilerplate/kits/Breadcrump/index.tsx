'use client';

import { Breadcrumb as BreadcrumbAntd } from 'antd';

const { Item } = BreadcrumbAntd;

const Breadcrump = () => {
  return (
    <BreadcrumbAntd style={{ margin: '16px 0' }}>
      <Item>User</Item>
      <Item>Bill</Item>
    </BreadcrumbAntd>
  );
};

export default Breadcrump;
