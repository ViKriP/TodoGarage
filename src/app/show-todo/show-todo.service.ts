import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Post } from '../models/post.model';

import { Todolist } from '../models/todolist.model';
import { Task } from '../models/task.model';
//import { User } from '../models/user.model';

@Injectable()
export class ShowTodoService {

	constructor(private http: HttpClient){

	}

	LoginUsr() {
		return this.http.post('/api/user/getUser',{})		
	}
	
	getAllTodolist(id){
		return this.http.post('/api/todolist/getAllTodolist',{id : id})
	}

	deleteTodolist(id){
		return this.http.post('/api/todolist/deleteTodolist',{id : id})
	}

	getAllTask(){
		return this.http.post('/api/task/getAllTask',{})
	}

	getAllTask2(id){
		return this.http.post('/api/task/getAllTask2',{id : id})
	}

	deleteTask(TaskList){
		return this.http.post('/api/task/deleteTask',{
			id : TaskList._id,
			project_id : TaskList.project_id
		})
	}

	addTask(task: Task){
		return this.http.post('/api/task/createTask',{
			name : task.name,
			status : "0",
			project_id: task.project_id,
			deadline: task.deadline,
			order: task.order
		})
	}

	updateTask(task: Task){
		return this.http.post('/api/task/updateTask',{
			id: task._id,
			name : task.name,
			stat : task.status,
			project_id: task.project_id,
			deadline: task.deadline
		})
	}

	dateExpired( prId, tskId ) {
		return this.http.post('/api/task/dateExpired',{
			prId: prId, 
			tskId: tskId
		})
	}

	sortOrdTask( dragTsk, dropTsk ) {
		return this.http.post('/api/task/sortOrdTask',{
			projId: dragTsk.dragData[1],
			dragId: dragTsk.dragData[0]._id,
			dragOrder: dragTsk.dragData[0].order,
			dropId: dropTsk._id,
			dropOrder: dropTsk.order
		})
		
	}
}
