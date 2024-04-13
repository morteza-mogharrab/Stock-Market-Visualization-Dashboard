import React from 'react';
import { Pie } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const PieChart = ({ data }) => {
  const chartData = {
    labels: ['Total Liabilities', 'Revenue', 'Total Assets'],
    datasets: [{
      data: [
        data?.totalLiabilities,
        data?.revenue,
        data?.totalAssets
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  };

  return (
    <div style={{  height: 260 ,display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Pie
        data={chartData}
        options={{
          title: {
            display: true,
            text: 'Financial Data',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'bottom'
          }
        }}
      />
    </div>
  );
};

export default PieChart;
