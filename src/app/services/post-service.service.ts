import { Injectable } from '@angular/core';
import {PostClass} from "../post-class";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  public listOfPosts : PostClass[] = [];
  constructor(private http: HttpClient) {}

  getPosts()  {
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
          timestamp: data[i].timestamp
        })
      }
    })
  }

  public getPostList() {
    this.getPosts();
    return this.listOfPosts;
  }

  public newPost(newPost: PostClass) {
    let tempPost : PostClass = {
      comment: newPost.comment, timestamp: newPost.timestamp, userId: newPost.userId

    }
    this.http.post('https://njs-lab5-default-rtdb.europe-west1.firebasedatabase.app/posts.json', tempPost)
      .subscribe((data: any) => {
        console.log(data)
        this.listOfPosts.push(tempPost)
      })
  }

  public editPost(post: PostClass) {
    let tempPost : PostClass = {
      comment: post.comment, timestamp: post.timestamp, userId: post.userId

    }
    this.http.put('https://njs-lab5-default-rtdb.europe-west1.firebasedatabase.app/posts/' + post.id + '.json', tempPost)
      .subscribe((data: any) => {
        console.log(data)
      })
  }

  public deletePost(post: PostClass) {
    this.http.delete('https://njs-lab5-default-rtdb.europe-west1.firebasedatabase.app/posts/' + post.id + '.json').subscribe(
      (data: any) => {
        console.log(data);
      }
    )
  }
}
