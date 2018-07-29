import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AddTodolistService } from './add-todolist.service';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-add-todolist',
  templateUrl: './add-todolist.component.html',
  styleUrls: ['./add-todolist.component.css'],
  providers: [ AddTodolistService ]
})
export class AddTodolistComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;
  public post : Post;

  constructor(private AddTodolistService: AddTodolistService, private router: Router, private commonService: CommonService) {
  	this.post = new Post();
  }

  ngOnInit(){
    this.commonService.postEdit_Observable.subscribe(res => {
      this.post = this.commonService.post_to_be_edited;
      console.log('post is ', this.post._id);
    });
  }

  addPost() {
  	if(this.post.title && this.post.description){
      if(this.post._id){
        this.AddTodolistService.updatePost(this.post).subscribe(res =>{
          this.closeBtn.nativeElement.click();
          this.commonService.notifyPostAddition();
        });
      } else {
        this.AddTodolistService.addPost(this.post).subscribe(res =>{
          this.closeBtn.nativeElement.click();
          this.commonService.notifyPostAddition();
        });
      }
  	} else {
  		alert('Title and Description required');
  	}
  }

}
