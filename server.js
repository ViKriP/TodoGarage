const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
//const url = 'mongodb://localhost/todogarage';
const url = 'mongodb://todogarage:todo9garage9@ds229312.mlab.com:29312/todogarage';

const ObjectId = require('mongodb').ObjectID;

const User = require('./server/model/user');
const Post = require('./server/model/post');
const Todolist = require('./server/model/todolist');
const Task = require('./server/model/task');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));

const path = require('path');

app.use(express.static(path.join(__dirname, '/dist')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 3000;

app.set('port', port);


app.post('/api/user/login', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		User.find({
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
			user_id: req.body.user_id
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
			{ _id: req.body.id },
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
var ordTsk;

Todolist.findOne({"_id": ObjectId(req.body.project_id)},[], function(err, proj) {
    if (err) throw err;

	if (proj.tasks.length != 0) {
		var ordTskMin = proj.tasks.slice(0);
		ordTskMin.sort(function(a,b) {
			return a.order + b.order; //order + -
		});

		ordTsk = Number(ordTskMin[0].order);
	} else {
		ordTsk = 0;
	}

		Todolist.update(
    			{ "_id": req.body.project_id},
    			{ "$push": 
        			{"tasks": 
            			{
					"_id" : new ObjectId(),
                			"name": req.body.name,
                			"status": "0",
					"deadline": req.body.deadline,
					"order": ++ordTsk
            			}
        			}
    			},

			(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});

}); //finrOne

})


app.post('/api/task/updateTask', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		Todolist.updateOne(
			{
				"_id" : ObjectId(req.body.project_id), 
				"tasks._id" : ObjectId(req.body.id)
			}, 
			{ $set: 
				{
					"tasks.$.name" : req.body.name, 
					"tasks.$.status" : req.body.stat,
					"tasks.$.deadline" : req.body.deadline
				}
			},
			(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.post('/api/task/dateExpired', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		Todolist.updateOne(
			{
				"_id" : ObjectId(req.body.prId), 
				"tasks._id" : ObjectId(req.body.tskId)
			}, 
			{ $set: 
				{
					"tasks.$.status" : "1"
				}
			},
			(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})


app.post('/api/task/sortOrdTask', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;

if ( Number(req.body.dragOrder) > Number(req.body.dropOrder) ){

var ItemStartInc = Number( req.body.dragOrder )-1;

Todolist.find({"_id": ObjectId(req.body.projId)}, function (err, todos){
todos.forEach(function(doc) {
	for ( var i=0; i < doc.tasks.length; i++ ) {
		if ( doc.tasks[i].order <= ItemStartInc  &&  doc.tasks[i].order >= Number(req.body.dropOrder)) {

		var ItemInc = doc.tasks[i].order+1;

		Todolist.update(
			{ "_id": ObjectId(doc._id), "tasks._id": ObjectId(doc.tasks[i]._id) },
			{ "$set": { "tasks.$.order": ItemInc } },
			(err, doc) => {
				if(err) throw err;
			}
		);
		}
	}
//---
	Todolist.update(
		{ "_id": ObjectId(req.body.projId), "tasks._id": ObjectId(req.body.dragId) },
		{ "$set": { "tasks.$.order": Number(req.body.dropOrder) } },
		(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success'
		})}
	);
})
});

} else {
//---
var ItemStartInc = Number(req.body.dragOrder)+1;

Todolist.find({"_id": ObjectId(req.body.projId)}, function (err, todos){
todos.forEach(function(doc) {
	for ( var i=0; i < doc.tasks.length; i++ ) {
		if ( doc.tasks[i].order >= ItemStartInc  &&  doc.tasks[i].order <= Number(req.body.dropOrder)) {

		var ItemInc = doc.tasks[i].order-1;

		Todolist.update(
			{ "_id": ObjectId(doc._id), "tasks._id": ObjectId(doc.tasks[i]._id) },
			{ "$set": { "tasks.$.order": ItemInc } },
			(err, doc) => {
				if(err) throw err;
			}
		);
		}
	}
//---
	Todolist.update(
		{ "_id": ObjectId(req.body.projId), "tasks._id": ObjectId(req.body.dragId) },
		{ "$set": { "tasks.$.order": Number(req.body.dropOrder) } },
		(err, doc) => {
			if(err) throw err;
			return res.status(200).json({

				status: 'success'
		})}
	);
})
});
//---
}

});
})


app.post('/api/task/dateExpired_2', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;
		Todolist.update(
			{
				//"tasks.name" : "A"
				//"tasks.deadline" : { $lt: new Date().toString() } // .toISOString() new ISODate("2018-09-28T08:23:00.000Z") }
			}, 
			{ $set: 
				{
					"tasks.$.status" : 1
				}
			}, {
				multi: true,
				//arrayFilters: [ { "elem.deadline": { $lt: new Date().toString() } } ]
				//arrayFilters: [ { "elem.name": "A" } ]

			},
			(err, doc) => {
			if(err) throw err;

			return res.status(200).json({
				status: 'success',
				data: doc

			})
			}
		)
	});
})

app.post('/api/task/deleteTask', (req, res) => {
	mongoose.connect(url, { useNewUrlParser: true }, function(err){
		if(err) throw err;

		Todolist.update(
    			{ "_id": ObjectId(req.body.project_id) },
			    { "$pull": 
			        {"tasks": 
            			{
					"_id" : ObjectId(req.body.id)
            			}
        			}
    			},
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


//app.listen(3000, () => console.log('TodoLists server running on port 3000!'))

app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode dir %s", this.address().port, app.settings.env, __dirname);
});
