import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { ContentService } from 'src/Services/ContentService';
import { DialogService } from 'src/Services/DialogService';
import { ImageService } from 'src/Services/ImageService';
import { LoginService } from 'src/Services/LoginService';
import { MatDialogModule, MatCardModule, MatInputModule, MatProgressSpinnerModule, MatSidenavModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { Ng2Webstorage } from "ngx-webstorage";
import { RouterModule } from '@angular/router';
import { routes } from 'src/routes';
import { LoginForm } from 'src/Parts/Login/Login';
import { Dashboard } from 'src/Parts/Dashboard/Dashboard';
import { Home } from 'src/Parts/Home/Home';
import { Signup } from 'src/Parts/Signup/Signup';
import { Header } from 'src/Parts/Header/Header';
import { MenuBar } from 'src/Parts/Menu/Menu';
import { Profile } from 'src/Parts/Profile/Profile';
import { Settings } from 'src/Parts/Settings/Settings';
import { Hamburger } from 'src/Parts/HamburgerMenu/Hamburger';
import { UploadFileDialog } from 'src/Parts/Dialog/Upload/Upload';
import { FileUploadModule } from 'ng2-file-upload';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestService } from '../Services/TestService';
import * as Api from 'src/Services/Api/Api';
import { AddCar } from 'src/Parts/AddCar/AddCar';


var keys = Object.keys(Api).filter(x=> { return (x.includes("Client")); }).map(x=> { return Api[x]; });

@NgModule({
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
		AddCar
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		HttpModule,
		FormsModule,
		MatDialogModule,
		BrowserAnimationsModule,
		Ng2Webstorage,
		RouterModule.forRoot(routes),
		FileUploadModule,
		MatCardModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatSidenavModule,
	],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy},
		ContentService,
		DialogService,
		ImageService,
		LoginService,
		TestService,
		{ provide:Api.API_BASE_URL, useValue:"http://localhost:5000" }
	].concat(keys),
	bootstrap: [AppComponent],
})
export class AppModule { }
