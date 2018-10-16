import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { ContentService } from 'src/services/ContentService';
import { DialogService } from 'src/services/DialogService';
import { ImageService } from 'src/services/ImageService';
import { LoginService } from 'src/services/LoginService';
import { MatDialogModule, MatCardModule, MatInputModule, MatSpinner, MatProgressSpinnerModule, MatSidenavModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { Ng2Webstorage } from "ngx-webstorage";
import { RouterModule } from '@angular/router';
import { routes } from 'src/routes';
import { LoginForm } from 'src/parts/Login/Login';
import { Dashboard } from 'src/parts/Dashboard/Dashboard';
import { Home } from 'src/parts/Home/Home';
import { Signup } from 'src/parts/Signup/Signup';
import { Header } from 'src/parts/Header/Header';
import { MenuBar } from 'src/parts/Menu/Menu';
import { Profile } from 'src/parts/Profile/Profile';
import { Settings } from 'src/parts/Settings/Settings';
import { Hamburger } from 'src/parts/HamburgerMenu/Hamburger';
import { UploadFileDialog } from 'src/Parts/Dialog/Upload/Upload';
import { FileSelectDirective } from 'ng2-file-upload';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
		FileSelectDirective,
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
		
		MatCardModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatSidenavModule
	],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy},
		ContentService,
		DialogService,
		ImageService,
		LoginService
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
