import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LoginService } from './Services/LoginService';
import { AppComponent }  from './components/app';
import { LoginForm } from './components/Login/Login';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Signup } from './components/Signup/Signup';
import { routes } from './routes';
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import { MenuBar } from './components/Menu/Menu';
import { Profile } from './components/Profile/Profile';
import { Settings } from './components/Settings/Settings';
import { User } from './components/User/User';
import { Ng2Webstorage } from 'ng2-webstorage';

@NgModule({
	imports:		[ BrowserModule, Ng2Webstorage, HttpModule, FormsModule, RouterModule.forRoot(routes), MaterialModule.forRoot() ],
	declarations: 	[ AppComponent, LoginForm, Dashboard, Home, Signup, Header, MenuBar, Profile, Settings, User ],
	providers: 		[{ provide: LocationStrategy, useClass: HashLocationStrategy }],
	bootstrap:		[ AppComponent ]
})
export class AppModule { }
 