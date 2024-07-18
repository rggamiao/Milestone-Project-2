import React, { useState, useEffect } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "./components/PieChart.js";
import Map from './Map.js'; // Import the Map
import './App.css';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';

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
  // Initializes the chart's default state 
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

  const fetchData = async () => {
    try {
      console.log('Fetching data...');
      const response = await fetch('https://mp2-backend-production.up.railway.app/api/hand-dominance');
      const data = await response.json();
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
  }, []);

  const [state, setState] = useState('');
  const handleVote = async (choice) => {
    console.log('Vote button clicked:', choice, state);
    if (!state) {
      console.error('No state selected');
      return;
    }

    try {
      const response = await fetch('https://mp2-backend-production.up.railway.app/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ choice, state })
      });
      if (response.ok) {
        console.log('Vote recorded');
        // Fetch the updated data and update the chart
        fetchData();
      } else {
        console.error('Failed to record vote');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Are you a lefty or a righty?</h1>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Pie Chart</Accordion.Header>
          <Accordion.Body>
            <PieChart chartData={chartData} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Map</Accordion.Header>
          <Accordion.Body>
            <Map />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="selectorArea">
        <div>
          <Form.Select size="lg" aria-label="Default select example" value={state} onChange={(e) => setState(e.target.value)}>
            <option value="">Select your state</option>
            {states.map((stateName, index) => (
              <option key={index} value={stateName}>{stateName}</option>
            ))}
          </Form.Select>
        </div>
        <div>
          <Button onClick={() => handleVote('left')} variant="outline-primary" size="lg">Left</Button>
          <Button onClick={() => handleVote('right')} variant="outline-success" size="lg">Right</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
