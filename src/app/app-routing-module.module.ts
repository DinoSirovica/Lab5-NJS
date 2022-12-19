import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  { path: '', component: MainComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegistrationComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModuleModule { }
