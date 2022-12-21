import { Component } from '@angular/core';
import {User} from "../user";
import {UserServiceService} from "../services/user-service.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserServiceService, private fb: FormBuilder, private auth: AuthService) {
  }

  authenticated=false;
  authChangeSubscription : Subscription | null = null;
  listOfUsers : User[] = [];
  isLogged = false;
  errorMasage : string = '';
  successMassage : string = '';
  user: User | undefined;
  loginForm : FormGroup =this.fb.group({
    "username": new FormControl('', [Validators.required, Validators.minLength(4)]),
    "password": new FormControl('', [Validators.required])
  }, {updateOn: 'blur'})

  ngOnInit() {
    this.listOfUsers = this.userService.getUserList()

    this.auth.errorMasage
      .subscribe((error : string) => {
        this.errorMasage = error;
      });

    this.auth.successMassage
      .subscribe((success : string) => {
        this.successMassage = success;
      });

    this.authenticated=this.auth.isAuthenticated();

    this.authChangeSubscription=this.auth.authChange
      .subscribe(() => {
        this.authenticated=this.auth.isAuthenticated();
      });

    this.user = this.auth.getUser();
    if(this.user.username) {
      this.isLogged = true
    }
    else this.isLogged = false

    if(this.user && this.isLogged){
      this.auth.login({username: this.user.username, password: this.user.password})
    }
  }

  LogIn(){
    if(this.loginForm.valid){

      this.auth.login(this.loginForm.value);
  }
    else{
      this.errorMasage = 'Invalid username or password';}
  }
}
