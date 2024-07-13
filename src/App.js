
import Chart from "chart.js/auto"
import { CategoryScale } from "chart.js";
import { useState } from "react";
import PieChart from "./compnents/PieChart";
import { Data } from "./utils/Data"
import './App.css';


const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", 
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", 
  "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", 
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", 
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
  "Wisconsin", "Wyoming"
];

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
        <select>
        {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      <div>
        <p>Map section</p>
      </div>
    </div>
  );
}

export default App;
