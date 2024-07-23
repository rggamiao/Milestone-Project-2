import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', overflowX: 'scroll', height: '400px' }}>
      <div style={{ width: '2000px', height: '100%' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
