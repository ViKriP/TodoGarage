const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const taskSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true }
}, { collection : 'tasks' });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
