import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LoginService } from './Services/LoginService';
import { AppComponent }  from './components/app';
import { LoginForm } from './components/Login/Login';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Home } from './components/Home/Home';
import { Signup } from './components/Signup/Signup';
import { routes } from './routes';

@NgModule({
	imports:		[ BrowserModule, HttpModule, RouterModule.forRoot(routes) ],
	declarations: 	[ AppComponent, LoginForm, Dashboard, Home, Signup ],
	providers: 		[{ provide: LocationStrategy, useClass: HashLocationStrategy }],
	bootstrap:		[ AppComponent ]
})
export class AppModule { }
 