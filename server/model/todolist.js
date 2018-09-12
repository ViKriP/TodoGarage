const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const todolistSchema = new Schema({
  name: { type: String, required: true },
  tasks: [],
  user_id: {  type: mongoose.Schema.Types.ObjectId, ref: 'user' }
}, { collection : 'projects' });

const Todolist = mongoose.model('Todolist', todolistSchema);
module.exports = Todolist;
