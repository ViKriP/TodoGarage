import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Post } from '../models/post.model';

import { Task } from '../models/task.model';

@Injectable()
export class AddTaskService {

	constructor(private http: HttpClient){

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

}
