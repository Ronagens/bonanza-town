const models = require('../models.js');
const File = models.File;
const path = require('path');
const fs = require('fs');

const fileController = {};

fileController.createFile = async (req, res, next) => {
  const { originalname, filename, path, mimetype} = req.file
  try {
    await File.create({
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

fileController.deleteFile = async (req, res, next) => {
  try {
    const deletedFile = await File.findOneAndDelete({ _id: req.params.id })
    res.locals.deletedFile = deletedFile.name;

    await fs.unlink(path.resolve(__dirname, '../../' + deletedFile.filepath), (err) => {
      if (err) console.log(err);
      console.log('deleted');
    });

    console.log('Deleted: ', deletedFile);
    return next();
  }
  catch (err) {
    console.log('Error in fileController.deleteFile: ', err);
    return next({ log: 'Error in fileController.deleteFile', err});
  }
}

fileController.getAllFiles = async (req, res, next) => {
  try {
    const files = await File.find({}, 'name');
    res.locals.files = files
    return next();
  } catch (err) {
    console.log('Error in fileController.getAllFiles: ', err);
    return next({ log: 'Error in fileController.getAllFiles', err});
  }
}

module.exports = fileController;