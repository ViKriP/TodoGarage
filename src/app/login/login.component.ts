import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent {

  public user : User;
  public loginusrs : any [];

  constructor(private loginService: LoginService, private router: Router) {
  	this.user = new User();
  }

  validateLogin() {
  	if(this.user.username && this.user.password) {
  		this.loginService.validateLogin(this.user).subscribe(result => {
        if(result['status'] === 'success') {

//console.log('result UsrLogIn_Name is ', result['data'][0]['_id']);

//alert("name - "+this.user.name+" username - "+this.user.username+" password - "+ this.user.password);

          localStorage.setItem('loggedInUser', this.user.username);
          localStorage.setItem('loggedInUserId', result['data'][0]['_id']);
          localStorage.setItem('loggedInUserName', result['data'][0]['name']);
          this.router.navigate(['/todo']);
        } else {
          alert('Wrong username password');
        }
      }, error => {
        console.log('error is ', error);
      });
  	} else {
  		alert('enter user name and password');
  	}
  }

	signup(){
		this.router.navigate(['/register']);
	}
  
	LoginUsr() {
  	this.loginService.LoginUsr().subscribe(result => {
  		//console.log('result usr is ', result);
  		this.loginusrs = result['data'];
  	});
		
	}

}
