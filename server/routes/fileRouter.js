const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const fileController = require('../controllers/fileController.js');

const router = express.Router();

router.get('/',
  fileController.getAllFiles,
  (req, res) => {
    res.status(200).json(res.locals.files);
  })

router.post('/',
  upload.single('myFile'),
  fileController.createFile,
  (req, res) => {
    res.status(200).json('successful post');
  })
  
router.delete('/:id', (req, res) => {
  console.log(req.params);
  res.status(200).json('successful delete');
})
module.exports = router;