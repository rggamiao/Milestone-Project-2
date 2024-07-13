import Chart from "chart.js/auto"
import { CategoryScale } from "chart.js";
import { useState } from "react";
import PieChart from "./compnents/PieChart";
import { Data } from "./utils/Data"
import './App.css';

Chart.register(CategoryScale);

function App() {
  const [chartData, setChartData] = useState({
    labels: ['Right-handed', 'Left-handed'],
    datasets: [
      {
        label: "Handedness Distribution",
        data: [Data.rightHanded, Data.leftHanded],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  return (
    <div className="App">
      <h1>Are you a lefty or a righty ?</h1>
      <div>
        <PieChart chartData={chartData} />
      </div>
      <div>
        <button>Left</button>
        <button>Right</button>
      </div>
      <div>
        <p>Fun facts</p>
      </div>
    </div>
  );
}

export default App;
