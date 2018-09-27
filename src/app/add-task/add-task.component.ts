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
  //public TskStatChecked;
  //public TskStatActive;

    //public dateTime: Date;
    //public selectedMoment = new Date();

  constructor(private addTaskService: AddTaskService, private router: Router, private commonService: CommonService) {
  	this.task = new Task();
  }

  ngOnInit(){
    this.commonService.taskEdit_Observable.subscribe(res => {
      this.task = this.commonService.task_to_be_edited;
    });
  }

  updTask() {
	if(this.task._id && this.task.deadline){
		this.addTaskService.updateTask(this.task).subscribe(res =>{
			this.closeBtnTask.nativeElement.click();
			this.commonService.notifyTodolistAddition();
		});
	} else {
		alert('Name or Deadline -Task- required');
	}
  }

}
