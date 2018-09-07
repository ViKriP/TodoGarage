import { Component } from '@angular/core';
import { RegisterService } from './register.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ RegisterService ]
})
export class RegisterComponent {

  public user : User;

  constructor(private registerService: RegisterService, private router: Router) {
  	this.user = new User();
  }

createRegister() {
  	if(this.user.username && this.user.password) {
  		this.registerService.createRegister(this.user).subscribe(result => {
        if(result['status'] === 'success') {
          this.router.navigate(['/']);
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

}
