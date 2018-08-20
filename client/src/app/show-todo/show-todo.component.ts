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

  constructor(private showTodoService: ShowTodoService, private commonService: CommonService) {
  	
		this.commonService.taskEdit_Observable.subscribe(res => {
			this.addBtnTask.nativeElement.click();
		});

  }

  ngOnInit(){
  	this.getAllTask();
  	this.getAllTodolist();

    this.commonService.todolistAdded_Observable.subscribe(res => {
      this.getAllTodolist();
    });
    this.commonService.taskAdded_Observable.subscribe(res => {
      this.getAllTask();
    });
  }

  setDeleteTodolist(todolist: Todolist){
    this.todolist_to_delete = todolist;
  }

  unsetDeleteTodolist(){
    this.todolist_to_delete = null;
  }

  getAllTodolist(){
  	this.showTodoService.getAllTodolist().subscribe(result => {
  		console.log('result is ', result);
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
  setDeleteTask(task: Task){
    this.task_to_delete = task;
  }

  unsetDeleteTask(){
    this.task_to_delete = null;
  }

  getAllTask(){
  	this.showTodoService.getAllTask().subscribe(result => {
  		console.log('result is ', result);
  		this.tasks = result['data'];
  	});
  }

  editTask(task: Task){
    this.commonService.setTaskToEdit(task);
  }

  deleteTask(){
    this.showTodoService.deleteTask(this.task_to_delete._id).subscribe(res => {
      this.getAllTask();
      this.closeBtnTask.nativeElement.click();
    })
  }


}