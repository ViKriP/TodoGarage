import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';

//import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

	@ViewChild('addPost') addBtn: ElementRef;

  //public user : User;

	constructor(private commonService: CommonService, private router: Router){
  //this.user = new User();
		if(!localStorage.getItem('loggedInUser')){
			this.router.navigate(['/']);
		}
		
		this.commonService.postEdit_Observable.subscribe(res => {
			this.addBtn.nativeElement.click();
		});

	}

	logout(){
		localStorage.removeItem('loggedInUser');
		this.router.navigate(['/']);
	}
  
 userok() {
  alert( 'loggedInUser ' /*+ this.user.username*/ );
 }


}
