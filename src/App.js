import React, { useState, useEffect, useCallback } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "./components/PieChart";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import './App.css';
import { Toggle } from "./components/toggle";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { stateFacts } from './stateFacts';

Chart.register(CategoryScale);

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

  const [stateCode, setStateCode] = useState('');
  const [email, setEmail] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [overallCounts, setOverallCounts] = useState({ right: 0, left: 0 });
  const [showFacts, setShowFacts] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('https://mp2-backend-production.up.railway.app/api/hand-dominance');
      const data = await response.json();
      console.log("Fetched data:", data);
      // Calculate overall counts
      const overallRight = data.filter(item => item.choice === 'right').length;
      const overallLeft = data.filter(item => item.choice === 'left').length;
      setOverallCounts({ right: overallRight, left: overallLeft });
      setChartData({
        labels: ['Right-handed', 'Left-handed'],
        datasets: [
          {
            label: "Handedness Distribution",
            data: [overallRight, overallLeft],
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
      toast.error('Failed to fetch handedness data.');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleVote = async (choice) => {
    if (!stateCode) {
      toast.error('Please select a state.');
      return;
    }
    if (!email) {
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
        toast.success('Vote recorded successfully!');
        await fetchData(); // Fetch updated data after successful vote
        setShowFacts(true);
      } else if (response.status === 409) {
        toast.error('This email has already voted.');
      } else {
        toast.error('Failed to record vote.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const getStateFlag = (stateCode) => {
    try {
      return require(`./assets/State Flags/${stateCode.toLowerCase()}.png`);
    } catch (error) {
      console.error(`Error loading flag for ${stateCode}:`, error);
      return null;
    }
  };

  const getStateFacts = (stateCode) => {
    const facts = stateFacts[stateCode];
    return facts ? Object.values(facts) : ['No facts available for this state.'];
  };

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Toggle 
        isChecked={isDark}
        handleChange={() => setIsDark(!isDark)}
        label={isDark ? "Light Mode" : "Dark Mode"}
      />
      <h1 className="title">Are you a lefty or a righty?</h1>
      <Accordion className="accordion">
        <Accordion.Item className="accordion-item" eventKey="0">
          <Accordion.Header>Dominant Hand Chart</Accordion.Header>
          <Accordion.Body>
            <PieChart chartData={chartData} />
            <p>Right-handed: {overallCounts.right}</p>
            <p>Left-handed: {overallCounts.left}</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className="accordion-items" eventKey="1">
          <Accordion.Header className='accordion-title'>State Facts</Accordion.Header>
          <Accordion.Body>
            {!showFacts && <p>Enter your state and email below</p>}
            {showFacts && stateCode && (
              <div>
                <h2>{stateCode}</h2>
                <img src={getStateFlag(stateCode)} alt={`${stateCode} flag`} style={{ width: '100px', height: 'auto', marginBottom: '10px' }} />
                <ol style={{ textAlign: 'left' }}>
                  {getStateFacts(stateCode).map((fact, index) => (
                    <li key={index}>{fact}</li>
                  ))}
                </ol>
                
              </div>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="selectorArea">
        <div>
          <Form.Select 
            size="lg" 
            aria-label="Select your state" 
            value={stateCode} 
            onChange={(e) => setStateCode(e.target.value)}
          >
            <option value="">Select your state</option>
            {states.map((state) => (
              <option key={state.code} value={state.code}>{state.name}</option>
            ))}
          </Form.Select>
        </div>
        <div>
          <Form.Control
            className="email-form"
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
