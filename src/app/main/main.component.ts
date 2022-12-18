import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  listOfPosts: { id:number; username: string; comment: string; isEditing:boolean, date: Date}[] = [
    {
      id:1, username: "test1", comment:"comment1", isEditing:false, date: new Date()
    },
    {
      id:2, username: "test1", comment:"comment1", isEditing:false, date: new Date()
    }
  ];

  constructor() {}
  addComment = false
  comment = ""
  username = ""
  id=3;
  isEditing = false
  idToEdit = 0

  addPost() {
    this.id++;
    console.log(this.username)
    console.log(this.comment)
    this.listOfPosts.push({id: this.id, username: this.username, comment: this.comment, isEditing: false, date: new Date()})
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
    this.listOfPosts.map((post) => {
      if (post.id === id) {
        post.isEditing = !post.isEditing;
      }
    })
  }

  getPostById(id:number){
    return this.listOfPosts.find(e => e.id==id)
  }

  deletePost(id:number) {
    this.listOfPosts = this.listOfPosts.filter((post) => post.id !== id)
  }
}
