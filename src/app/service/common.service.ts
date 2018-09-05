import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { Post } from '../models/post.model';
import { Todolist } from '../models/todolist.model';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';

@Injectable()
export class CommonService {

	public postAdded_Observable = new Subject();
	public postEdit_Observable = new Subject();
	public post_to_be_edited;

	public todolistAdded_Observable = new Subject();
	public todolistEdit_Observable = new Subject();
	public todolist_to_be_edited;

	public taskAdded_Observable = new Subject();
	public taskEdit_Observable = new Subject();
	public task_to_be_edited;

	public loginusrAdded_Observable = new Subject();
	public loginusrEdit_Observable = new Subject();
	public loginusr_to_be_edited;

	constructor(){
		this.post_to_be_edited = new Post();
		this.todolist_to_be_edited = new Todolist();
		this.task_to_be_edited = new Task();
		this.loginusr_to_be_edited = new User();
	}

	notifyPostEdit(){
		this.postEdit_Observable.next();
	}

	setPostToEdit(post: Post){
		this.post_to_be_edited = post;
		this.notifyPostEdit();
	}

	notifyPostAddition(){
		this.postAdded_Observable.next();
	}

//--
	notifyTodolistEdit(){
		this.todolistEdit_Observable.next();
	}

	setTodolistToEdit(todolist: Todolist){
		this.todolist_to_be_edited = todolist;
		this.notifyTodolistEdit();
	}

	notifyTodolistAddition(){
		this.todolistAdded_Observable.next();
	}

//--

	notifyTaskEdit(){
		this.taskEdit_Observable.next();
	}

	setTaskToEdit(task: Task){
		this.task_to_be_edited = task;
		this.notifyTaskEdit();
	}

	notifyTaskAddition(){
		this.taskAdded_Observable.next();
	}

//--
	notifyLoginusrEdit(){
		this.loginusrEdit_Observable.next();
	}

	setLoginusrToEdit(loginusr: User){
		this.loginusr_to_be_edited = loginusr;
		this.notifyLoginusrEdit();
	}

	notifyLoginusrAddition(){
		this.loginusrAdded_Observable.next();
	}

//--
}
