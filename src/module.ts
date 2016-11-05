import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { LoginService } from './Services/LoginService';
import { AppComponent }  from './components/app';
import { LoginForm } from './components/Login/Login';
import { routes } from './routes';

@NgModule({
	imports:		[ BrowserModule, HttpModule, RouterModule.forRoot(routes) ],
	declarations: 	[ AppComponent, LoginForm ],
	providers: 		[ LoginService ],
	bootstrap:		[ AppComponent ]
})
export class AppModule { }
 