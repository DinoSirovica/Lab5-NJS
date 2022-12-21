import { Component } from '@angular/core';
import {User} from "../user";
import {UserServiceService} from "../services/user-service.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private userService: UserServiceService) {
    this.init()
  }
  listOfUsers : User[] = [];
  init() {
    this.listOfUsers = this.userService.getUserList()
  }

  name: string = "";
  username: string = "";
  email: string = "";
  pass: string = "";
  passR: string = "";
  newUser: User = new User("","","","");

  makeNewUser() {
    if(this.name == "" || this.email== "" || this.pass == "" || this.passR == "" || this.username == "") {
      alert("Please fill out all fields!");
    }
    else if(this.pass != this.passR){
      alert("Passwords don't match!");
    }
    else if(this.listOfUsers.find(user => user.username == this.username) != null) {
      alert("Username already exists!");
    }
    else if(this.listOfUsers.find(user => user.email == this.email) != null) {
      alert("Email already exists!");
    }
    else {
      this.newUser.name = this.name;
      this.newUser.email = this.email;
      this.newUser.password = this.pass;
      this.newUser.username = this.username;
      this.userService.newUser(this.newUser);
    }
    console.log(this.listOfUsers)
  }


}
