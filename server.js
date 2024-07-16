// CREATES AN EXPRESS API FROM databasepg.js
const express = require('express');
const cors = require('cors');
const client = require('./dataBaseConnection/databasepg');

const app = express();
const port = 5000;

app.use(cors());

app.get('/api/hand-dominance', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM dominant_hand');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
