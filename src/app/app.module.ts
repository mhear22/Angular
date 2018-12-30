import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from './app.component';
import { DialogService } from 'src/Services/DialogService';
import { ImageService } from 'src/Services/ImageService';
import { LoginService } from 'src/Services/LoginService';
import { MatDialogModule, MatCardModule, MatInputModule, MatProgressSpinnerModule, MatSidenavModule, MatSelectModule, MatButtonModule } from '@angular/material';
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
import * as Api from 'src/Services/Api/Api';
import { AddCar } from 'src/Parts/Car/Add/AddCar';
import { ApiInterceptor } from 'src/Services/ApiInterceptor';
import { CarDetail } from 'src/Parts/Car/Detail/Detail';
import { EditCar } from 'src/Parts/Car/Edit/EditCar';
import { MileageDialog } from 'src/Parts/Dialog/Mileage/Mileage';
import { DeleteCarDialog } from 'src/Parts/Dialog/DeleteCar/DeleteCar';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GraphingService } from 'src/Services/GraphingService';

var keys = Object.keys(Api).filter(x=> { return (x.includes("Service")); }).map(x=> { return Api[x]; });

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
		MileageDialog,
		AddCar,
		CarDetail,
		EditCar,
		DeleteCarDialog
	],
	entryComponents:[
		UploadFileDialog,
		MileageDialog,
		DeleteCarDialog
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		HttpModule,
		FormsModule,
		MatDialogModule,
		MatButtonModule,
		BrowserAnimationsModule,
		Ng2Webstorage,
		RouterModule.forRoot(routes),
		FileUploadModule,
		MatCardModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatSidenavModule,
		MatSelectModule,
		NgxChartsModule
	],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy},
		DialogService,
		ImageService,
		LoginService,
		GraphingService,
		{ provide:Api.API_BASE_URL, useValue:"http://localhost:5000" },
		{ provide:HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi:true}
	].concat(keys),
	bootstrap: [AppComponent],
})
export class AppModule { }
