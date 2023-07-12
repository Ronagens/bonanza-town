const express = require('express');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const mongoose = require('mongoose');
// add cookieparser/bcrypt for authentication

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
app.post('/file',
  upload.single('myFile'),
  (req, res) => {
  // Add filename, path, and original name to a database?
  console.log('Uploaded file: ', req.file.originalname);
  res.status(200).send('Hey that uploaded');
})

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