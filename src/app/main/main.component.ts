import { Component } from '@angular/core';
import {PostClass} from "../post-class";
import {PostServiceService} from "../services/post-service.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private postService: PostServiceService) {
    this.init()
  }
  listOfPosts : PostClass[] = [];
  init() {
    this.listOfPosts = this.postService.getPostList()
    console.log(this.listOfPosts);
  }


  addComment = false
  comment = ""
  username = ""
  id="";
  isEditing = false
  idToEdit = 0

  new: PostClass = {
    userId: "",
    comment: "",
    timestamp: ""
  }

  addPost() {
    console.log(this.username)
    console.log(this.comment)
    this.new.userId = this.username
    this.new.comment = this.comment
    this.new.timestamp = new Date().toString()
    console.log(this.new)
    this.postService.newPost(this.new)

    this.addComment = false
    this.comment = ""
    this.username = ""
  }

  editPost(id:number, isEditing:boolean) {
    if(isEditing) {
      this.idToEdit = id
    }
    else {
      this.idToEdit = 0
    }
  }

  saveChanges(id:number) {
    this.postService.editPost(this.listOfPosts[id])
    this.idToEdit = 0
  }

  getPostById(id:number){
    return this.listOfPosts[id]
  }

  deletePost(id:number) {
    this.postService.deletePost(this.listOfPosts[id])
    this.listOfPosts.splice(id, 1)
  }

}
