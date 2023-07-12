const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  files: [{ type: Object }]
})

const User = mongoose.model('user', userSchema);

const fileSchema = new Schema({
  owner_id: { type: Schema.Types.ObjectId, ref: 'user' },
  shared_ids: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  filetype: { type: String, required: true},
  name: { type: String, required: true }
})

const File = mongoose.model('file', fileSchema)

module.exports = { User, File };