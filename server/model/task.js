const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const taskSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  project_id: [{  type: Schema.ObjectId, ref: 'projects' }]
}, { collection : 'tasks' });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
