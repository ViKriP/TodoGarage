import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class RegisterService {

	constructor(private http: HttpClient){

	}

	createRegister(user: User) {
		return this.http.post('/api/user/create',{
			name : user.name,
			username : user.username,
			password : user.password
		})

	}

	
/*	validateLogin(user: User){
		return this.http.post('/api/user/login',{
//			id: user._id,
//			name : user.name,
			username : user.username,
			password : user.password
		})
	}
*/
}
