const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const taskSchema = new Schema({
  name: { type: String, required: true },
  status: { type: Boolean, required: true },
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'projects' },
  deadline: { type: Date, default: Date.now }
}, { collection : 'tasks' });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
