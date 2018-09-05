import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AddTodolistService } from './add-todolist.service';
//import { Post } from '../models/post.model';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { Todolist } from '../models/todolist.model';

@Component({
  selector: 'app-add-todolist',
  templateUrl: './add-todolist.component.html',
  styleUrls: ['./add-todolist.component.css'],
  providers: [ AddTodolistService ]
})
export class AddTodolistComponent implements OnInit {

  @ViewChild('closeBtnTodolist') closeBtnTodolist: ElementRef;
  public todolist : Todolist;
  public loggedUsr;

  constructor(private AddTodolistService: AddTodolistService, private router: Router, private commonService: CommonService) {
  	this.todolist = new Todolist();
this.loggedUsr = this.loggedUser();
  }

  ngOnInit(){
    this.commonService.todolistEdit_Observable.subscribe(res => {
      this.todolist = this.commonService.todolist_to_be_edited;
      console.log('todolist is ', this.todolist._id);
    });
  }

  addTodolist() {
alert("upd - "+this.todolist.user_id);
  	if(this.todolist.name && this.todolist.user_id){
      if(this.todolist._id){
        this.AddTodolistService.updateTodolist(this.todolist).subscribe(res =>{
          this.closeBtnTodolist.nativeElement.click();
          this.commonService.notifyTodolistAddition();
        });
      } else {
alert("add - "+this.todolist.name);
        this.AddTodolistService.addTodolist(this.todolist).subscribe(res =>{
          this.closeBtnTodolist.nativeElement.click();
          this.commonService.notifyTodolistAddition();
        });
      }
  	} else {
  		alert('Title and Description required');
  	}
  }

	loggedUser(){
		return localStorage.getItem('loggedInUserId'); 
	}
}
