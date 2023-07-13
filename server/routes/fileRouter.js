const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const fileController = require('../controllers/fileController.js');
const path = require('path');

const router = express.Router();

router.get('/download/:id',
  fileController.downloadFile,
  (req, res) => {
    res.status(200).download(res.locals.file);
  })

router.get('/previewinfo/:id',
  fileController.previewInfo,
  (req, res) => {
    res.status(200).json(res.locals.fileInfo);
  })

router.get('/preview/:id',
  fileController.previewFile,
  (req, res) => {
    res.status(200).sendFile(res.locals.file);
  })

router.get('/myfiles/:id',
  fileController.getPublicFiles,
  fileController.getUserFiles,
  (req, res) => {
    res.status(200).json(res.locals.files);
  })

router.get('/',
  fileController.getPublicFiles,
  (req, res) => {
    res.status(200).json(res.locals.files);
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