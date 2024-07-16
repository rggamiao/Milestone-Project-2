import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ chartData }) {
  return (
    <div className="chart-container" style={{ width: '50%', margin: 'auto', maxWidth: '400px', minWidth: '250px' }}>
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Hand Dominance"
            }
          }
        }}
      />
    </div>
  );
}
export default PieChart;