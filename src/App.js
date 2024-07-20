import React, { useState, useEffect } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "./components/PieChart";
import HandednessMap from "./components/HandednessMap";
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import './App.css';
import { Toggle } from "./components/toggle";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const states = [
  { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" }, { code: "AZ", name: "Arizona" }, { code: "AR", name: "Arkansas" }, { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" }, { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" }, { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" }, { code: "ID", name: "Idaho" }, { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" }, { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" }, { code: "KY", name: "Kentucky" }, { code: "LA", name: "Louisiana" }, { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" }, { code: "MI", name: "Michigan" }, { code: "MN", name: "Minnesota" }, { code: "MS", name: "Mississippi" }, { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" }, { code: "NE", name: "Nebraska" }, { code: "NV", name: "Nevada" }, { code: "NH", name: "New Hampshire" }, { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" }, { code: "NC", name: "North Carolina" }, { code: "ND", name: "North Dakota" }, { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" }, { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" }, { code: "RI", name: "Rhode Island" }, { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" }, { code: "TN", name: "Tennessee" }, { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" }, { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" }, { code: "WA", name: "Washington" }, { code: "WV", name: "West Virginia" }, { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" }
];

Chart.register(CategoryScale);

function App() {
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

  const [stateCode, setStateCode] = useState(''); // Track selected state code
  const [email, setEmail] = useState(''); // Track email input

  const fetchData = async () => {
    try {
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

  const handleVote = async (choice) => {
    console.log('Vote button clicked:', choice, stateCode);
    if (!stateCode) {
      console.error('No state selected');
      toast.error('Please select a state.');
      return;
    }
    if (!email) {
      console.error('Email is required');
      toast.error('Email is required.');
      return;
    }

    try {
      const response = await fetch('https://mp2-backend-production.up.railway.app/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ choice, state: stateCode, email })
      });
      if (response.ok) {
        console.log('Vote recorded');
        fetchData(); // Fetch the updated data and update the chart and map
        toast.success('Vote recorded successfully!');
      } else if (response.status === 409) {
        console.error('Email already exists');
        toast.error('This email has already voted.');
      } else {
        console.error('Failed to record vote');
        toast.error('Failed to record vote.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const [isDark, setIsDark] = useState(false);

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Toggle 
        isChecked={isDark}
        handleChange={() => setIsDark(!isDark)}
        label={isDark ? "Light Mode" : "Dark Mode"}
      />
      <h1 className="title">Are you a lefty or a righty ?</h1>
      <Accordion className="accordion">
        <Accordion.Item className="accordion-item" eventKey="0">
          <Accordion.Header>Dominant Hand Chart</Accordion.Header>
          <Accordion.Body>
            <PieChart chartData={chartData} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className="accordion-items" eventKey="1">
          <Accordion.Header className='accordion-title'>Map</Accordion.Header>
          <Accordion.Body>
            <HandednessMap onStateClick={setStateCode} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="selectorArea">
        <div>
          <Form.Select size="lg" aria-label="Default select example" value={stateCode} onChange={(e) => setStateCode(e.target.value)}>
            <option value="">Select your state</option>
            {states.map((state, index) => (
              <option key={index} value={state.code}>{state.name}</option>
            ))}
          </Form.Select>
        </div>
        <div>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="buttons">
          <Button onClick={() => handleVote('left')} size="lg">Left Handed?</Button>
          <Button onClick={() => handleVote('right')} size="lg">Right Handed?</Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
