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
	
	getAllTodolist(){
		return this.http.post('/api/todolist/getAllTodolist',{})
	}

	deleteTodolist(id){
		return this.http.post('/api/todolist/deleteTodolist',{id : id})
	}

	getAllTask(){
		return this.http.post('/api/task/getAllTask',{})
	}

	deleteTask(id){
		return this.http.post('/api/task/deleteTask',{id : id})
	}

}
