const models = require('../models.js');
const File = models.File;

const fileController = {};

fileController.createFile = (req, res, next) => {
  // TODO
  const { originalname, filename, path, mimetype} = req.file
  File.create({
    filename: filename,
    filepath: path,
    filetype: mimetype,
    name: originalname
  })
  return next();
}

fileController.deleteFile = (req, res, next) => {
  // TODO
}

fileController.getAllFiles = async (req, res, next) => {
  // TODO
  try {
    console.log('getting files');
    const files = await File.find({}, 'name');
    res.locals.files = files
    return next();
  } catch (err) {
    console.log('getallfiles: ', err);
    return next(err);
  }
  
}
// console.log(err);
//     if (err) return next({ log: 'Error occured in fileController.getAllFiles', err});
//     res.locals.files = files;
//     return next();
module.exports = fileController;