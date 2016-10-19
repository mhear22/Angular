import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { LoginService } from './Services/LoginService';
import { AppComponent }  from './components/app';
import { LoginForm } from './components/Login/Login' 

@NgModule({
	imports:		[ BrowserModule, HttpModule ],
	declarations: 	[ AppComponent, LoginForm ],
	providers: 		[ LoginService ],
	bootstrap:		[ AppComponent ]
})
export class AppModule { }
 