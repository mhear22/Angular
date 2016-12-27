import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LoginService } from './Services/LoginService';
import { AppComponent }  from './parts/app';
import { LoginForm } from './parts/Login/Login';
import { Dashboard } from './parts/Dashboard/Dashboard';
import { Header } from './parts/Header/Header';
import { Home } from './parts/Home/Home';
import { Signup } from './parts/Signup/Signup';
import { routes } from './routes';
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import { MenuBar } from './parts/Menu/Menu';
import { Profile } from './parts/Profile/Profile';
import { Settings } from './parts/Settings/Settings';
import { User } from './parts/User/User';
import { Ng2Webstorage } from 'ng2-webstorage';

@NgModule({
	imports:		[ BrowserModule, Ng2Webstorage, HttpModule, FormsModule, RouterModule.forRoot(routes), MaterialModule.forRoot() ],
	declarations: 	[ AppComponent, LoginForm, Dashboard, Home, Signup, Header, MenuBar, Profile, Settings, User ],
	providers: 		[{ provide: LocationStrategy, useClass: HashLocationStrategy }],
	bootstrap:		[ AppComponent ]
})
export class AppModule { }
 