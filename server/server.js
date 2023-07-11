const express = require('express');
const path = require('path');
// const fs = require('fs');
// add cookieparser/bcrypt for authentication

const app = express();
const PORT = 3000;
//TODO: Add/import router files

app.use(express.json());

//TODO: Add express.static handler, ensure it works
app.use(express.static(path.resolve(__dirname, '../client')));

//TODO: router stuff

//TODO: Serve generic file
app.get('/', (req, res) => {
  res.status(200).send(path.resolve(__dirname, './client/index.html'));
});

//TODO: Double check 404 handler
app.use('*', (req, res) => res.status(404).send('This is not the page you\'re looking for...'));

// Error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Begins listening to port 3000
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;