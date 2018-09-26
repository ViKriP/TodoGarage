import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ROUTING } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RootComponent } from './root/root.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ShowPostComponent } from './show-post/show-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { CommonService } from './service/common.service';

import { TodoComponent } from './todo/todo.component';
import { ShowTodoComponent } from './show-todo/show-todo.component';
import { AddTodolistComponent } from './add-todolist/add-todolist.component';
import { AddTaskComponent } from './add-task/add-task.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [
  	RootComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ShowPostComponent,
    AddPostComponent,
    TodoComponent,
    ShowTodoComponent,
    AddTodolistComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ROUTING,
    FormsModule,
    HttpClientModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  providers: [CommonService],
  bootstrap: [RootComponent]
})
export class AppModule { }
