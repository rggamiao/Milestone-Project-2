import React, { useState, useEffect } from 'react';
import Chart from "chart.js/auto"
import { CategoryScale } from "chart.js";
import PieChart from "./components/PieChart.js";
import Map from './Map.js'; // Import the Map
import './App.css';
import 'leaflet/dist/leaflet.css';



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
 // Initializes the charts default state 
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hand-dominance');
        const data = await response.json();
        const { right_hand, left_hand } = data[0];

        setChartData({
          labels: ['Right-handed', 'Left-handed'],
          datasets: [
            {
              label: "Handedness Distribution",
              data: [right_hand, left_hand],
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

    fetchData();
  }, []);

  const [state, setState] = useState('');
  const handleVote = async (choice) => {
    try {
      const response = await fetch('https://mp2-backend-production.up.railway.app/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ choice, state })
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Vote recorded:', data);
      } else {
        console.error('Failed to record vote');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Are you a lefty or a righty ?</h1>
      <div>
        <PieChart chartData={chartData} />
      </div>
      <div>
        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="">Select your state</option>
          <option value="AL">Alabama</option> 
          <option value="AK">Alaska</option> 
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">llinois</option> 
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="CS">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
      
        </select>
      </div>
      <div>
        <button onClick={() => handleVote('left')}>Left</button>
        <button onClick={() => handleVote('right')}>Right</button>
      </div>
      <div>
        <p>Map section</p>
        <Map />
      </div>
    </div>
  );
}

export default App;
