/* eslint-disable no-console */
const app = require('./server');
const mongoose = require('./config/database');

const PORT = 8000;

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, () => {
  console.log('Listening...');
});
