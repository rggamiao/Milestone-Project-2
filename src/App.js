import React, { useState} from 'react';
import Chart from "chart.js/auto"
import { CategoryScale } from "chart.js";
import PieChart from "./components/PieChart.js";
import Map from './Map.js'; // Import the Map
import './App.css';
import 'leaflet/dist/leaflet.css';
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
      <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Pie Chart</Accordion.Header>
        <Accordion.Body>
      
        <PieChart />
      
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
