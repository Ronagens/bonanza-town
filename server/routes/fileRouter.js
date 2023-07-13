const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const fileController = require('../controllers/fileController.js');
const path = require('path');

const router = express.Router();

router.get('/',
  fileController.getAllFiles,
  (req, res) => {
    res.status(200).json(res.locals.files);
  })

router.get('/download/:id',
  fileController.downloadFile,
  (req, res) => {
    res.status(200).download(res.locals.file);
  })

router.get('/preview/:id',
  fileController.previewFile,
  (req, res) => {
    res.status(200).sendFile(res.locals.file);
  })

router.get('/previewinfo/:id',
  fileController.previewInfo,
  (req, res) => {
    res.status(200).json(res.locals.fileInfo);
  })

router.post('/',
  upload.single('myFile'),
  fileController.createFile,
  (req, res) => {
    res.status(200).json('successful post');
  })
  
router.delete('/:id',
  fileController.deleteFile,
  (req, res) => {
  res.status(200).json(res.locals.deletedFile);
  })
module.exports = router;