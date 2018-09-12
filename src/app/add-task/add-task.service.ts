import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Post } from '../models/post.model';

import { Task } from '../models/task.model';

@Injectable()
export class AddTaskService {

	constructor(private http: HttpClient){

	}
	
	addTask(task: Task){
//alert("ok");
		return this.http.post('/api/task/createTask',{
			name : task.name,
			status : task.status,
			//project_id: task.project_id
		})
	}

	updateTask(task: Task){
//alert("upd - "+task.name);
		return this.http.post('/api/task/updateTask',{
			id: task._id,
			name : task.name,
			status : task.status,
			//project_id: task._id
		})
	}

}
