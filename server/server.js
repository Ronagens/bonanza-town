const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
// add cookieparser/bcrypt for authentication

const fileRouter = require(path.resolve(__dirname, 'routes/fileRouter.js'));
const userRouter = require(path.resolve(__dirname, 'routes/userRouter.js'));

const app = express();
const PORT = 3000;

const mongoURI = process.env.NODE_ENV === 'development' ? 'mongodb://localhost/solodevdb' : 'mongodb://localhost/solobuilddb';
mongoose.connect(mongoURI);

//TODO: Add/import router files

app.use(express.json());
app.use(express.urlencoded())

//TODO: Add express.static handler, ensure it works
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../dist')));
}
else {
  app.use(express.static(path.resolve(__dirname, '../client')));
}


//TODO: router stuff
app.use('/file', fileRouter);

app.use('/user', userRouter);




//TODO: Serve generic file
app.get('/', (req, res) => {
  res.status(200).send(path.resolve(__dirname, './client/index.html'));
});

//TODO: Double check 404 handler
app.use('*', (req, res) => res.status(404).send('Nothings exists here :O'));

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