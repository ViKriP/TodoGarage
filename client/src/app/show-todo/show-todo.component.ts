import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShowTodoService } from './show-todo.service';
import { Post } from '../models/post.model';
import { CommonService, } from '../service/common.service';

@Component({
  selector: 'app-show-todo',
  templateUrl: './show-todo.component.html',
  styleUrls: ['./show-todo.component.css'],
  providers: [ ShowTodoService ]
})
export class ShowTodoComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;

  public posts : any [];
  public post_to_delete;

  constructor(private showTodoService: ShowTodoService, private commonService: CommonService) {
  	
  }

  ngOnInit(){
  	this.getAllPost();

    this.commonService.postAdded_Observable.subscribe(res => {
      this.getAllPost();
    });
  }

  setDelete(post: Post){
    this.post_to_delete = post;
  }

  unsetDelete(){
    this.post_to_delete = null;
  }

  getAllPost(){
  	this.showTodoService.getAllPost().subscribe(result => {
  		console.log('result is ', result);
  		this.posts = result['data'];
  	});
  }

  editPost(post: Post){
    this.commonService.setPostToEdit(post);
  }

  deletePost(){
    this.showTodoService.deletePost(this.post_to_delete._id).subscribe(res => {
      this.getAllPost();
      this.closeBtn.nativeElement.click();
    })
  }

}
