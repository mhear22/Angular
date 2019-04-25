import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from './app.component';
import { DialogService } from 'src/Services/DialogService';
import { ImageService } from 'src/Services/ImageService';
import { LoginService } from 'src/Services/LoginService';
import { MatDialogModule, MatCardModule, MatInputModule, MatProgressSpinnerModule, MatSidenavModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatDividerModule, MatButtonToggleModule, MatButtonToggleGroup, MatDatepickerModule, MatNativeDateModule, MatMenuModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgxWebstorageModule } from "ngx-webstorage";
import { RouterModule } from '@angular/router';
import { routes } from 'src/routes';
import { LoginForm } from 'src/Parts/Login/Login';
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
import { ServiceItemDialog } from 'src/Parts/Dialog/ServiceItem/ServiceItem';
import { ServiceDetail } from 'src/Parts/ServiceItems/Detail/Detail';
import { PaymentPlans } from 'src/Parts/PaymentPlans/Plans';
import { UnsubscribeDialog } from 'src/Parts/Dialog/Unsubscribe/Unsubscribe';
import { RequestMileageDialog } from 'src/Parts/Dialog/RequestMileage/requestMileage';
import { Angulartics2Module } from "angulartics2";
import { Angulartics2GoogleGlobalSiteTag } from "angulartics2/gst";
import { environment } from 'src/environments/environment';
import { TermsOfService } from 'src/Parts/TOS/tos';
import { Verified } from 'src/Parts/Verified/Verified';
import { Dashboard } from 'src/Parts/Dashboard/Dashboard';
import { Home } from 'src/Parts/Home/Home';
import { Mechie } from 'src/Parts/Mechie/Mechie';
import { FoldRouter } from 'src/Parts/FoldRouter/FoldRouter';
import { PaymentReminderDialog } from 'src/Parts/Dialog/PaymentReminder/PaymentReminder';
import { MomentFilter } from 'src/Services/MomentFilter';
import { ToFixedFilter } from 'src/Services/toFixedPipe';
import { SetupRepeatDialog } from 'src/Parts/Dialog/SetupRepeat/SetupRepeatDialog';
import { RecieveFeedbackDialog } from 'src/Parts/Dialog/RecieveFeedback/RecieveFeedback';
import { Fitment } from 'src/Parts/Fitment/Fitment';

var keys = Object.keys(Api).filter(x=> { return (x.includes("Service")); }).map(x=> { return Api[x]; });

@NgModule({
	declarations: [
		AppComponent,
		LoginForm,
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
		DeleteCarDialog,
		ServiceItemDialog,
		ServiceDetail,
		PaymentPlans,
		UnsubscribeDialog,
		RequestMileageDialog,
		TermsOfService,
		Verified,
		Dashboard,
		Home,
		Mechie,
		FoldRouter,
		PaymentReminderDialog,
		MomentFilter,
		ToFixedFilter,
		SetupRepeatDialog,
		RecieveFeedbackDialog,
		Fitment
	],
	entryComponents:[
		UploadFileDialog,
		MileageDialog,
		DeleteCarDialog,
		ServiceItemDialog,
		UnsubscribeDialog,
		RequestMileageDialog,
		PaymentReminderDialog,
		SetupRepeatDialog,
		RecieveFeedbackDialog
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		HttpModule,
		FormsModule,
		MatDialogModule,
		MatButtonModule,
		BrowserAnimationsModule,
		NgxWebstorageModule.forRoot({}),
		RouterModule.forRoot(routes),
		FileUploadModule,
		MatCardModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatSidenavModule,
		MatSelectModule,
		NgxChartsModule,
		MatDividerModule,
		MatButtonToggleModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatMenuModule,
		Angulartics2Module.forRoot({
			gst:{
				trackingIds:['UA-90319263-2'],
				anonymizeIp:true
			},
			developerMode:environment.production
		}),
		MatCheckboxModule
	],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy},
		DialogService,
		ImageService,
		LoginService,
		GraphingService,
		{
			provide:Api.API_BASE_URL,
			useValue:(environment.production)?"https://api.mechie.net":"http://localhost:5000"
		},
		{ provide:HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi:true}
	].concat(keys),
	bootstrap: [AppComponent],
})
export class AppModule { }
