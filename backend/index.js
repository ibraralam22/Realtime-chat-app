const express = require('express');
var cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

// main request
app.use('/', async (req, res) => {
  res.send('hello world');
});

//Authenticate
app.post('/authenticate', async (req, res) => {
  const { username } = req.body;
  try {
    const response = await axios.put(
      'http://api.chatengine.io/users/',
      { username: username, secret: username, first_name: username },
      { headers: { 'Private-Key': '80eed36b-af44-4c2c-88b3-ed1d16de6b6b' } }
    );
    return res.send(response.data);
  } catch (e) {
    return res.status(404).json(e.response.data);
  }
});

app.listen(3000, () => {
  console.log(`Server is Running on http://localhost:3000`);
});
