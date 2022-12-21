import { Component } from '@angular/core';
import {User} from "../user";
import {UserServiceService} from "../services/user-service.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private userService: UserServiceService, private fb: FormBuilder, private auth: AuthService) {
  }
  listOfUsers : User[] = [];
  authenticated=false;
  authChangeSubscription : Subscription | null = null;
  errorMasage : string = '';
  successMassage : string = '';
  user: User | undefined;

  regForm : FormGroup =this.fb.group({
    "username": new FormControl('', [Validators.required, Validators.minLength(4)]),
    "pass": new FormControl('', [Validators.required]),
    "passR": new FormControl('', [Validators.required]),
    "email": new FormControl('', [Validators.required, Validators.email]),
    "name": new FormControl('', [Validators.required])
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
  }


  makeNewUser() {
    if (this.regForm.valid) {
        let temp = this.regForm.value;
        this.auth.register(temp.username, temp.pass, temp.passR, temp.email, temp.name);
    }
    else {
      this.errorMasage = 'Please make sure all fields are filled in correctly';
    }
  }


}
