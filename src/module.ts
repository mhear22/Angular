import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent }  from './Parts/app';
import { LoginForm } from './Parts/Login/Login';
import { Dashboard } from './Parts/Dashboard/Dashboard';
import { Header } from './Parts/Header/Header';
import { Home } from './Parts/Home/Home';
import { Signup } from './Parts/Signup/Signup';
import { routes } from './routes';
import { FormsModule } from "@angular/forms";
import { MenuBar } from './Parts/Menu/Menu';
import { Profile } from './Parts/Profile/Profile';
import { Settings } from './Parts/Settings/Settings';
import { UploadFileDialog } from './Parts/Dialog/Upload/Upload';
import { Hamburger } from './Parts/HamburgerMenu/Hamburger';
import { Ng2Webstorage } from 'ng2-webstorage';
import { Angulartics2Module } from 'angulartics2';
import { FileSelectDirective } from 'ng2-file-upload';
import { DialogService } from './Services/DialogService';
import { ImageService } from './Services/ImageService';

@NgModule({
	imports: [ 
		BrowserModule, 
		//Ng2Webstorage, 
		HttpModule, 
		FormsModule, 
		RouterModule.forRoot(routes),
		//MatDialogModule,
		
		//Angulartics2Module.forRoot([])
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
		MatDialog,
		DialogService,
		ImageService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }