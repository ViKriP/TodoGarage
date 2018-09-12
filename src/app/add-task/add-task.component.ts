import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AddTaskService } from './add-task.service';
//import { Post } from '../models/post.model';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';

import { Task } from '../models/task.model';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [ AddTaskService ]
})
export class AddTaskComponent implements OnInit {

  @ViewChild('closeBtnTask') closeBtnTask: ElementRef;
  public task : Task;

  constructor(private addTaskService: AddTaskService, private router: Router, private commonService: CommonService) {
  	this.task = new Task();
  }

  ngOnInit(){
    this.commonService.taskEdit_Observable.subscribe(res => {
      this.task = this.commonService.task_to_be_edited;
      //console.log('task is ', this.task._id);
    });
  }

  addTask() {
//console.log('addTask result is ', this.task.name);
	if(this.task.name && this.task.status){
		if(this.task._id){
		//alert("upd - "+this.task.name);
			this.addTaskService.updateTask(this.task).subscribe(res =>{
				this.closeBtnTask.nativeElement.click();
				this.commonService.notifyTaskAddition();
			});
		} else {
		//alert("add - "+this.task.name);
			this.addTaskService.addTask(this.task).subscribe(res =>{
				this.closeBtnTask.nativeElement.click();
				this.commonService.notifyTaskAddition();
			});
		}
	} else {
		alert('Name required');
	}
  }

}
