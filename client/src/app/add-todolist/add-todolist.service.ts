import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Post } from '../models/post.model';
import { Todolist } from '../models/todolist.model';

@Injectable()
export class AddTodolistService {

	constructor(private http: HttpClient){

	}
	
/*	addPost(post: Post){
		return this.http.post('/api/post/createPost',{
			title : post.title,
			description : post.description
		})
	}

	updatePost(post: Post){
		return this.http.post('/api/post/updatePost',{
			id: post._id,
			title : post.title,
			description : post.description
		})
	}
*/

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
