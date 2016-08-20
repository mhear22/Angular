import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginService } from './Services/LoginService';
import { AppComponent }  from './components/app';
import { LoginForm } from './components/Login/Login' 

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, LoginForm ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
 