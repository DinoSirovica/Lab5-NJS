export class User {
  username: string;
  password: string;
  id?:string;
  name: string;
  email:string;


  constructor(username: string, password: string, name: string, email: string, id?: string) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.email = email;
    if(id != null){
      this.id = id;
    }
  }
}
