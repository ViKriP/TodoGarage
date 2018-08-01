import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Post } from '../models/post.model';
import { Todolist } from '../models/todolist.model';

@Injectable()
export class AddTodolistService {

	constructor(private http: HttpClient){

	}
	
	addTodolist(todolist: Todolist){
		return this.http.post('/api/todolist/createTodolist',{
			name : todolist.name,
			user_id : todolist.user_id
		})
	}

	updateTodolist(todolist: Todolist){
		return this.http.post('/api/todolist/updateTodolist',{
			id: todolist._id,
			name : todolist.name,
			user_id : todolist.user_id
		})
	}

}
