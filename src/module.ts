import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LoginService } from './Services/LoginService';
import { AppComponent }  from './Parts/app';
import { LoginForm } from './Parts/Login/Login';
import { Dashboard } from './Parts/Dashboard/Dashboard';
import { Header } from './Parts/Header/Header';
import { Home } from './Parts/Home/Home';
import { Signup } from './Parts/Signup/Signup';
import { routes } from './routes';
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import { MenuBar } from './Parts/Menu/Menu';
import { Profile } from './Parts/Profile/Profile';
import { Settings } from './Parts/Settings/Settings';
import { User } from './Parts/User/User';
import { Ng2Webstorage } from 'ng2-webstorage';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

@NgModule({
	imports: [ 
		BrowserModule, 
		Ng2Webstorage, 
		HttpModule, 
		FormsModule, 
		RouterModule.forRoot(routes), 
		MaterialModule.forRoot(), 
		Angulartics2Module.forRoot([Angulartics2GoogleAnalytics])
	],
	declarations: 	[ AppComponent, LoginForm, Dashboard, Home, Signup, Header, MenuBar, Profile, Settings, User ],
	providers: 		[{ provide: LocationStrategy, useClass: HashLocationStrategy }],
	bootstrap:		[ AppComponent ]
})
export class AppModule { }