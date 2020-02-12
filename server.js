const express = require('express');

const app = express();

app.use('/slack', require('./routes/slack/slack'));

app.get('/', (req, res) => {
  res.send('Listening from port 3000');
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
