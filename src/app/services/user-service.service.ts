import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {User} from "../user";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  users: User[] = []
  constructor(private http: HttpClient) {}

  getUsers()  {
    this.http.get('https://njs-lab5-default-rtdb.europe-west1.firebasedatabase.app/users.json').pipe(
      map(
        res => {
          const usersArray = [];
          let key: keyof typeof res;
          for (key in res) {
            usersArray.push({...res[key], id: key})
          }
          return usersArray;
        }
      )
    ).subscribe((data: any) => {
      for(let i = 0; i < data.length; i++) {
        this.users.push({
          id: data[i].id,
          name: data[i].name,
          email: data[i].email,
          password: data[i].password,
          username: data[i].username
        })
      }
    })
  }

  public getUserList() {
    this.getUsers();
    return this.users;
  }

  //todo provjera postoji li user
  public newUser(newUser: User) {
    this.http.post('https://njs-lab5-default-rtdb.europe-west1.firebasedatabase.app/users.json', newUser)
      .subscribe(() => {
        this.users.push(newUser)
      })
  }

  //todo izbrisati ako je nepotrebno
  /*public editUser(user: User) {
    this.http.put('https://njs-lab5-default-rtdb.europe-west1.firebasedatabase.app/users' + user.id + '.json', user)
      .subscribe((data: any) => {
        console.log(data)
      })
  }
  public deleteUser(user: User) {
    this.http.delete('https://njs-lab5-default-rtdb.europe-west1.firebasedatabase.app/users' + user.id + '.json').subscribe(
      (data: any) => {
        console.log(data);
      }
    )
  }*/
}
