import { Injectable } from '@angular/core';
import {User} from "../user";
import {Observable, Subject} from "rxjs";
import { Router } from '@angular/router';
import {UserServiceService} from "./user-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user : User | null = null;
  authChange : Subject<boolean> = new Subject<boolean>();
  errorMasage : Subject<string> = new Subject<string>();
  successMassage : Subject<string> = new Subject<string>();

  constructor(private userService: UserServiceService, private router : Router) { }

  logout(){
    this.user=null;
    localStorage.removeItem('user');
    this.authChange.next(false);
    this.router.navigate(['/login'])
  }

  login(credentials : {username : string, password: string}){

    let users = this.userService.getUserList();

    new Observable(observer => {
      setTimeout(()=>{
        let u = users.find(u => u.username==credentials.username && u.password==credentials.password);
        observer.next(u);
      });
    }).subscribe( (user : any)=>{

      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.authChange.next(true);
        this.router.navigate(['/']).then(
          () => {
            window.location.reload();
          }
        );
      } else {
        this.errorMasage.next('Invalid username or password');
      }
    });



  }

  getUser():User{
    let u = localStorage.getItem('user');
    if (!this.user && u) this.user=JSON.parse(u);
    return {...this.user} as User;
  }


  isAuthenticated(){
    return this.user!=null;
  }

  register(username : string, password: string, password2:string, email:string, name:string){
    if(password!=password2){
      this.errorMasage.next('Passwords do not match');
      return;
    }
    else{
      let users = this.userService.getUserList();
      let u = users.find(u => u.username==username);
      if(u){
        this.errorMasage.next('Username already exists');
        return;
      }
      else{
        let user = new User(username, password, email, name);
        this.userService.newUser(user);
        this.router.navigate(['/login']);
      }
    }
  }

  endOfFunc = () => {
    setTimeout(() => {window.location.reload()},500)

  }

}
