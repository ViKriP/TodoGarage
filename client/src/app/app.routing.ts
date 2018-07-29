import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './add-post/add-post.component';

import { TodoComponent } from './todo/todo.component';
import { AddTodolistComponent } from './add-todolist/add-todolist.component';

export const AppRoutes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'todo', component: TodoComponent }
	//{ path: 'home', component: HomeComponent }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
