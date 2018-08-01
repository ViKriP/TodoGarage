import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';

import { User } from '../models/user.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

	@ViewChild('addTodolist') addBtnTodolist: ElementRef;
//	@ViewChild('addTask') addBtnTask: ElementRef;

  public user : User;

	constructor(private commonService: CommonService, private router: Router){
  this.user = new User();
		if(!localStorage.getItem('loggedInUser')){
			this.router.navigate(['/']);
		}
		
		this.commonService.todolistEdit_Observable.subscribe(res => {
			this.addBtnTodolist.nativeElement.click();
		});

/*		this.commonService.taskEdit_Observable.subscribe(res => {
			this.addBtnTask.nativeElement.click();
		});
*/
	}

	logout(){
		localStorage.removeItem('loggedInUser');
		this.router.navigate(['/']);
	}
  
 userok() {
  alert( 'loggedInUser ' + this.user._id );
 }


}
