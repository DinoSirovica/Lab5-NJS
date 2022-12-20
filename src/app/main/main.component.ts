import { Component } from '@angular/core';
import {PostClass} from "../post-class";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  // listOfPosts: { id:number; username: string; comment: string; isEditing:boolean, date: Date}[] = [
  //   {
  //     id:1, username: "test1", comment:"comment1", isEditing:false, date: new Date()
  //   },
  //   {
  //     id:2, username: "test1", comment:"comment1", isEditing:false, date: new Date()
  //   }
  // ];

  listOfPosts : PostClass[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://njs-lab5-default-rtdb.europe-west1.firebasedatabase.app/posts.json').pipe(
      map(
        res => {
          console.log(res)
          const postsArray = [];
          let key: keyof typeof res;
          for (key in res) {
            postsArray.push({...res[key], id: key})
          }
          return postsArray;
        }
      )
    ).subscribe((data: any) => {
      console.log(data)
      for(let i = 0; i < data.length; i++) {
        this.listOfPosts.push({
          id: data[i].id,
          userId: data[i].userId,
          comment: data[i].comment,
          isEditing: false,
          date: data[i].timestamp
        })
      }
    })
  }

  addComment = false
  comment = ""
  username = ""
  id="";
  isEditing = false
  idToEdit = "0"

  addPost() {
    console.log(this.username)
    console.log(this.comment)
    this.listOfPosts.push({id: this.id, userId: this.username, comment: this.comment, isEditing: false, date: new Date().toString()})
    this.addComment = false
    this.comment = ""
    this.username = ""
  }

  editPost(id:string, isEditing:boolean) {
    if(isEditing) {
      this.idToEdit = id
    }
    else {
      this.idToEdit = "0"
    }
    this.listOfPosts.map((post) => {
      if (post.id === id) {
        post.isEditing = !post.isEditing;
      }
    })
  }

  getPostById(id:string){
    return this.listOfPosts.find(e => e.id==id)
  }

  deletePost(id:string) {
    this.listOfPosts = this.listOfPosts.filter((post) => post.id !== id)
  }
}
