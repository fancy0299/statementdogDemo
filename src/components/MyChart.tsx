'use client'

import ReactECharts from 'echarts-for-react';

interface Props {
  columns: string[];
  revenue: string[];
  growth: string[];
}
export default function MyChart(props: Props) {
  const { columns, revenue, growth } = props;
  const option = {
    title: {
      text: '月度营收 + 同比增长率',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['营收', '同比增长率'],
    },
    xAxis: {
      type: 'category',
      data: columns,
    },
    yAxis: [
      {
        type: 'value',
        name: '营收（千元）',
      },
      {
        type: 'value',
        name: '同比增长率（%）',
      },
    ],
    series: [
      {
        name: '营收',
        type: 'bar',
        data: revenue,
        itemStyle: { color: 'orange' },
      },
      {
        name: '同比增长率',
        type: 'line',
        yAxisIndex: 1, // 👈 使用第二个 y 轴
        data: growth, // 缺值用空字符串或 null
        itemStyle: { color: '#ff5722' },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
}