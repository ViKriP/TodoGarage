const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const url = 'mongodb://localhost/blogDb';
//const url = 'mongodb://todogarage:todo9garage9@ds229312.mlab.com:29312/todogarage';

//const ObjectID = require('mongodb').ObjectID;

//const ngUniversal = require('@nguniversal/express-engine');

const User = require('./server/model/user');
const Post = require('./server/model/post');
const Todolist = require('./server/model/todolist');
const Task = require('./server/model/task');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));

const path = require('path');
//const http = require('http');

app.use(express.static(path.join(__dirname, '/dist')));

app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 3000;

app.set('port', port);


app.post('/api/user/login', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		User.find({
			//_id: req.body._id,
			//name: req.body.name, 
			username : req.body.username, 
			password : req.body.password
		}, function(err, user){
			if(err) throw err;
			if(user.length === 1){	
				return res.status(200).json({
					status: 'success',
					data: user
				})
			} else {
				return res.status(200).json({
					status: 'fail',
					message: 'Login Failed'
				})
			}
			
		})
	});
})


app.post('/api/user/getUser', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
//		User.find({},[],{ sort: { _id: 1 } },(err, doc) => {
		User.find({},[],{ sort: { _id: 1 } },(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})


app.post('/api/user/create', (req, res) => {
	mongoose.connect(url,{ useNewUrlParser: true }, function(err){
		if(err) throw err;
		const user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		})
		user.save((err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.post('/api/post/createPost', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		const post = new Post({
			title: req.body.title,
			description: req.body.description
		})
		post.save((err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.post('/api/post/updatePost', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		Post.update(
			{_id: req.body.id },
			{ title : req.body.title, description: req.body.description },
			(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.post('/api/post/getAllPost', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		Post.find({},[],{ sort: { _id: -1 } },(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.post('/api/post/deletePost', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		Post.findByIdAndRemove(req.body.id,
			(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

/*function UserNameToId(usrName) {
//	const user = new User({

var findUser = async function (usrName) { 
	var userId = await User.findOne(usrName)

//var userId = findUser({username: usrName});
return 	userId._id
}	
//	})
}*/

app.post('/api/todolist/createTodolist', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		const todolist = new Todolist({
			name: req.body.name,
			user_id: req.body.user_id //UserNameToId(req.body.user_id) //req.body.description
		})
		todolist.save((err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc

			})
		})
	});
})

app.post('/api/todolist/updateTodolist', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		Todolist.update(
			{_id: req.body.id },
			{ name : req.body.name, user_id: req.body.user_id },
			(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.post('/api/todolist/getAllTodolist', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		Todolist.find({user_id: req.body.id},[],{ sort: { _id: -1 } },(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.post('/api/todolist/deleteTodolist', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		Todolist.findByIdAndRemove(req.body.id,
			(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

//---

app.post('/api/task/createTask', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		const task = new Task({
			name: req.body.name,
			status: req.body.status,
			projec_id: req.body.project_id
//			project_id: (req.body.description) new DBRef('tanks', req.body.project_id)}
		})
		task.save((err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc

			})
		})
	});
})

app.post('/api/task/updateTask', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		Task.update(
			{_id: req.body.id },
			{ name : req.body.name, status: req.body.status, projec_id: req.body.project_id /*, project_id: new DBRef('projects', req.body.id)*/ },
			(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.post('/api/task/getAllTask', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		Task.find({},[],{ sort: { _id: -1 } },(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.post('/api/task/getAllTask2', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		Task.find({project_id: req.body.id},[],{ sort: { _id: -1 } },(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.post('/api/task/deleteTask', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		Task.findByIdAndRemove(req.body.id,
			(err, doc) => {
			if(err) throw err;

			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})


//app.listen(3000, () => console.log('TodoLists server running on port 3000!'))

app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode dir %s", this.address().port, app.settings.env, __dirname);
});
