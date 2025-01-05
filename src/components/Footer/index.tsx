'use client';

import React from 'react';
import { Layout } from 'antd';
import clsx from 'clsx';

const { Footer: AntFooter } = Layout;

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <AntFooter className={clsx('text-center', className)}>
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </AntFooter>
  );
};

export default Footer;
