const express = require('express');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.json({ message: 'it works!' });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${8000}`);
});
