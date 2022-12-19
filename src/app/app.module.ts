import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppRoutingModuleModule } from './app-routing-module.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
