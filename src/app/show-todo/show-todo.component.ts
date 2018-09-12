import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShowTodoService } from './show-todo.service';
//import { Post } from '../models/post.model';
import { CommonService, } from '../service/common.service';

import { Todolist } from '../models/todolist.model';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-show-todo',
  templateUrl: './show-todo.component.html',
  styleUrls: ['./show-todo.component.css'],
  providers: [ ShowTodoService ]
})
export class ShowTodoComponent implements OnInit {

  @ViewChild('closeBtnTodolist') closeBtnTodolist: ElementRef;
  @ViewChild('closeBtnTask') closeBtnTask: ElementRef;

  @ViewChild('addTask') addBtnTask: ElementRef;

  public todolists : any [];
  public todolist_to_delete;

  public tasks : any [];
  public task_to_delete;

  public loginusrs : any [];
  //public task_to_delete;

  public task : Task;

  constructor(private showTodoService: ShowTodoService, private commonService: CommonService) {
  	
		this.commonService.taskEdit_Observable.subscribe(res => {
			this.addBtnTask.nativeElement.click();
		});
  		
		this.task = new Task();
  }

  ngOnInit(){
//  	this.getAllTask();
  	this.getAllTodolist();
	this.LoginUsr();

    this.commonService.todolistAdded_Observable.subscribe(res => {
      this.getAllTodolist();
    });
/*    this.commonService.taskAdded_Observable.subscribe(res => {
      this.getAllTask();
    });*/
    this.commonService.loginusrAdded_Observable.subscribe(res => {
      this.LoginUsr();
    });
  }

  setDeleteTodolist(todolist: Todolist){
    this.todolist_to_delete = todolist;
  }

  unsetDeleteTodolist(){
    this.todolist_to_delete = null;
  }

  getAllTodolist(){
  	this.showTodoService.getAllTodolist(localStorage.getItem('loggedInUserId')).subscribe(result => {
  		console.log('result todolist is ', result);
  		this.todolists = result['data'];
  	});
  }

  editTodolist(todolist: Todolist){
    this.commonService.setTodolistToEdit(todolist);
  }

  deleteTodolist(){
    this.showTodoService.deleteTodolist(this.todolist_to_delete._id).subscribe(res => {
      this.getAllTodolist();
      this.closeBtnTodolist.nativeElement.click();
    })
  }

//----
	LoginUsr(){
  	this.showTodoService.LoginUsr().subscribe(result => {
  		//console.log('result usr is ', result);
  		this.loginusrs = result['data'];
  	});
		
	}

//----
  setDeleteTask(task: Task){
    this.task_to_delete = task;
  }

  unsetDeleteTask(){
    this.task_to_delete = null;
  }

  getAllTask(){
  	this.showTodoService.getAllTask().subscribe(result => {
  		//console.log('result is ', result);
  		this.tasks = result['data'];
  	});
  }

  getAllTask2(proj_id){
  		//console.log('result is ', proj_id);
  	this.showTodoService.getAllTask2(proj_id).subscribe(result => {
  		//console.log('result is ', result);
  		this.tasks = result['data'];
  	});
  }

  editTask(task: Task){
    this.commonService.setTaskToEdit(task);
  }

  deleteTask(){
    this.showTodoService.deleteTask(this.task_to_delete._id).subscribe(res => {
////      this.getAllTask();
      this.closeBtnTask.nativeElement.click();
    })
  }

 /* addTask(){
	console.log('addTask result is ', task.name);
 }*/
  addTask() {
console.log('addTask result is ', this.task._id);
		if(this.task.name){
			this.addTaskService.addTask(this.task).subscribe(res =>{
				this.closeBtnTask.nativeElement.click();
				this.commonService.notifyTaskAddition();
			});
	} else {
		alert('Name -Task- required');
	}

/*	if(this.task.name && this.task.status){
		if(this.task._id){
			this.addTaskService.updateTask(this.task).subscribe(res =>{
				//this.closeBtnTask.nativeElement.click();
				//this.commonService.notifyTaskAddition();
			});
		} else {
			this.addTaskService.addTask(this.task).subscribe(res =>{
				this.closeBtnTask.nativeElement.click();
				this.commonService.notifyTaskAddition();
			});
		}
	} else {
		alert('Name required');
	}*/
  }

}
