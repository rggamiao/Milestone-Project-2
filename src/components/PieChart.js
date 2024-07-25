import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

function PieChart() {
  const [chartData, setChartData] = useState({
    labels: ['Right-handed', 'Left-handed'],
    datasets: [
      {
        label: "Handedness Distribution",
        data: [0, 0],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  const getCSSVariable = (variable) => getComputedStyle(document.documentElement).getPropertyValue(variable).trim();

  const fetchData = async () => {
    try {
      const response = await fetch('https://mp2-backend-production.up.railway.app/api/hand-dominance');
      const data = await response.json();
      console.log(data);
      const rightHanded = data.filter(item => item.choice === 'right').length;
      const leftHanded = data.filter(item => item.choice === 'left').length;

      setChartData({
        labels: ['Right-handed', 'Left-handed'],
        datasets: [
          {
            label: "Handedness Distribution",
            data: [rightHanded, leftHanded],
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1"
            ],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const titleColor = getCSSVariable('--secondary-text-color');
  const legendColor = getCSSVariable('--secondary-text-color');

  return (
    <div className="chart-container" style={{ width: '50%', margin: 'auto', maxWidth: '400px', minWidth: '200px' }}>
      <h2 className="chart-title" style={{ textAlign: "center", color: titleColor }}>Hand Dominance</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Hand Dominance',
              color: titleColor
            },
            legend: {
              labels: {
                color: legendColor,
                font: {
                  size: 14,
                }
              }
            }
          }
        }}
      />
    </div>
  );
}

export default PieChart;