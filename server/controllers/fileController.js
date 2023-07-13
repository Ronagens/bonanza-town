const models = require('../models.js');
const File = models.File;
const path = require('path');
const fs = require('fs');

const fileController = {};

fileController.createFile = async (req, res, next) => {
  const { originalname, filename, path, mimetype } = req.file
  const { userId } = req.body;
  try {
    await File.create({
      owner_id: userId || null,
      filename: filename,
      filepath: path,
      filetype: mimetype,
      name: originalname
    })
    return next();
  }
  catch (err) {
    console.log('Error in fileController.createFile: ', err);
    return next({ log: 'Error in fileController.createFile', err});
  }
}

fileController.downloadFile = async (req, res, next) => {
  try {
    const file = await File.findOne({ _id: req.params.id });
    res.locals.file = path.resolve(__dirname, '../../' + file.filepath);
    return next();
  } catch (err) {
    console.log('Error in fileController.downloadFile: ', err);
    return next({ log: 'Error in fileController.downloadFile', err});
  }
}

fileController.previewFile = async (req, res, next) => {
  try {
    const file = await File.findOne({ _id: req.params.id });
    res.locals.file = path.resolve(__dirname, '../../' + file.filepath);
    return next();
  } catch (err) {
    console.log('Error in fileController.previewFile: ', err);
    return next({ log: 'Error in fileController.previewFile', err});
  }
}

fileController.previewInfo = async (req, res, next) => {
  try {
    const file = await File.findOne({ _id: req.params.id });
    res.locals.fileInfo = { name: file.name, type: file.filetype }
    return next();
  } catch (err) {
    console.log('Error in fileController.previewFile: ', err);
    return next({ log: 'Error in fileController.previewFile', err});
  }
}

fileController.deleteFile = async (req, res, next) => {
  try {
    const deletedFile = await File.findOneAndDelete({ _id: req.params.id })
    res.locals.deletedFile = deletedFile.name;

    await fs.unlink(path.resolve(__dirname, '../../' + deletedFile.filepath), (err) => {
      if (err) console.log(err);
    });

    return next();
  }
  catch (err) {
    console.log('Error in fileController.deleteFile: ', err);
    return next({ log: 'Error in fileController.deleteFile', err});
  }
}

fileController.getPublicFiles = async (req, res, next) => {
  try {
    const files = await File.find({ owner_id: null }, 'name');
    res.locals.files = files
    return next();
  } catch (err) {
    console.log('Error in fileController.getAllFiles: ', err);
    return next({ log: 'Error in fileController.getAllFiles', err});
  }
}

fileController.getUserFiles = async (req, res, next) => {
  const { id } = req.params;
  try {
    const files = await File.find({ owner_id: id }, 'name');
    res.locals.files = res.locals.files.concat(files);
    return next();
  } catch (err) {
    console.log('Error in fileController.getAllFiles: ', err);
    return next({ log: 'Error in fileController.getAllFiles', err});
  }
}

module.exports = fileController;