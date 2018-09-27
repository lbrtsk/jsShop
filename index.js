/* eslint-disable no-console */
const schedule = require('node-schedule');

const app = require('./server');
const mongoose = require('./config/database');
const reports = require('./reports/reports');

const PORT = 8000;

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

schedule.scheduleJob({ hour: 8 }, reports.sendReportAboutYesterday);

app.listen(PORT, () => {
  console.log('Listening...');
});
