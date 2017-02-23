import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { MdDialog } from '@angular/material';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
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
import { UploadFileDialog } from './Parts/Dialog/Upload/Upload';
import { Hamburger } from './Parts/HamburgerMenu/Hamburger';
import { Ng2Webstorage } from 'ng2-webstorage';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { FileSelectDirective } from 'ng2-file-upload';
import { DialogService } from './Services/DialogService';

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
	declarations: [
		AppComponent,
		LoginForm,
		Dashboard,
		Home,
		Signup,
		Header,
		MenuBar,
		Profile,
		Settings,
		Hamburger,
		UploadFileDialog,
		FileSelectDirective,
	],
	entryComponents: [
		UploadFileDialog
	],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		MdDialog,
		DialogService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }