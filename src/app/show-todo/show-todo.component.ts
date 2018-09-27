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

  //@ViewChild('addTask') addBtnTask: ElementRef;

  public todolists : any [];
  public todolist_to_delete;

  public tasks : any [];
  public task_to_delete;

  public loginusrs : any [];

  public task : Task;
  //public TaskCheck;

  public min = new Date();


  constructor(private showTodoService: ShowTodoService, private commonService: CommonService) {
  	
		/*this.commonService.taskEdit_Observable.subscribe(res => {
			this.addBtnTask.nativeElement.click();
		});*/
  		
		this.task = new Task();
  }

  ngOnInit(){
//  	this.getAllTask();
  	this.getAllTodolist();
	this.LoginUsr();

    this.commonService.todolistAdded_Observable.subscribe(res => {
      this.getAllTodolist();
    });
    /*this.commonService.taskAdded_Observable.subscribe(res => {
      this.getAllTask();
    });*/
    this.commonService.taskEdit_Observable.subscribe(res => {
      this.task = this.commonService.task_to_be_edited;
      //console.log('task is ngOnInit - ok - ', this.task.name);
    });
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
  		//console.log('result todolist is ', result);
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
  		this.loginusrs = result['data'];
  	});
		
	}

//----
  setDeleteTask(task: Task, proj_id){
	task.project_id = proj_id;
    this.task_to_delete = task;
  }

  unsetDeleteTask(){
    this.task_to_delete = null;
  }

  getAllTask(){
  	this.showTodoService.getAllTask().subscribe(result => {
  		this.tasks = result['data'];
  	});
  }

  getAllTask2(proj_id){
  	this.showTodoService.getAllTask2(proj_id).subscribe(result => {
  		this.tasks = result['data'];
  	});
  }

  editTask(task: Task, proj_id){
	task.project_id = proj_id;
	this.commonService.setTaskToEdit(task);
  }

  editTaskCheck(checked, task: Task, proj_id){
    if(checked){
	task.status = "1";
	this.editTask(task, proj_id);
this.updTaskCheck();
    }else{
	task.status = "0";
	this.editTask(task, proj_id)
this.updTaskCheck();
    }
  }

  updTaskCheck(){
	if(this.task._id){
		this.showTodoService.updateTask(this.task).subscribe(res =>{
			//this.closeBtnTask.nativeElement.click();
			this.commonService.notifyTodolistAddition();
		});
	} else {
		alert('Name required');
	}

  }

  deleteTask(){
    this.showTodoService.deleteTask(this.task_to_delete).subscribe(res => {
	this.getAllTodolist();
	//console.log('Task_DEL - ', res)
      this.closeBtnTask.nativeElement.click();
    })
  }

  addTask(TodoListId, TskName, TaskDeadline) {

try {
		var DateT = new Date(TaskDeadline);
	
		if(TskName && DateT){

		this.task.name = TskName; 
		this.task.project_id = TodoListId; 
		this.task.deadline = DateT.toISOString();

			this.showTodoService.addTask(this.task).subscribe(res =>{
				this.closeBtnTask.nativeElement.click();
				this.commonService.notifyTodolistAddition();
			});
		} else {
			alert('Name or Deadline -Task- required');
		}
} catch (e) {
  alert( "В данных допущена ошибка\n"+ e.name +": "+ e.message);
}

  }

  DateTask(DateTxt) {
	var dt = new Date(DateTxt);
        var options = {  day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
	return dt.toLocaleString('uk-UA', options); //{ timeZone: 'UTC' }
  }

  DateExpired( task: Task, proj_id){ 

	var dNow = new Date();
	var dTsk = new Date(task.deadline);	

	if (dNow > dTsk){
		//this.editTaskCheck(true, task, proj_id);
		//return task.name;
		//return task._id +" | "+ task.name +" | "+ proj_id;
		//alert('Ok '+tskId);
	} else {
		//return false;
	}
  }

}
