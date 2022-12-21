import { Component } from '@angular/core';
import {User} from "../user";
import {UserServiceService} from "../services/user-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userService: UserServiceService) {
    this.init()
  }
  listOfUsers : User[] = [];
  init() {
    this.listOfUsers = this.userService.getUserList()
    console.log(this.listOfUsers);
  }
  username: string = "";
  password: string = "";
  fail: boolean = false;

  //todo provjera postoji li user i redirect na main page
  LogIn(){
    if(this.listOfUsers.find(user => user.username == this.username) !=null) {
      let temp = this.listOfUsers.find(user => user.username == this.username);
      if(temp != undefined){
        if(temp.password == this.password) {
          alert("Log in successful!");
          console.log("Log in successful!");
        }
        else {
          this.fail = true
        }
      }
      else this.fail = true
    }
    else this.fail = true

    if(this.fail){
      alert("Wrong username or password!");
      console.log("Wrong username or password!");
      this.fail = false;
    }
  }
}
