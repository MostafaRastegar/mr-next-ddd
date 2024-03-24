'use client';

import React, { useContext } from 'react';
import { Column } from '@ant-design/plots';
import { ThemeContext } from '@/boilerplate/contexts/Theme';

const GaugeChart = () => {
  const themeContextConsumer = useContext(ThemeContext);

  const data = [
    {
      action: 'one',
      pv: 50000,
    },
    {
      action: 'two',
      pv: 35000,
    },
    {
      action: 'three',
      pv: 25000,
    },
    {
      action: 'four',
      pv: 15000,
    },
    {
      action: 'five',
      pv: 8500,
    },
  ];
  const config = {
    theme: themeContextConsumer,
    data,
    xField: 'action',
    yField: 'pv',
    conversionTag: {},
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  return <Column {...config} />;
};
export default GaugeChart;
