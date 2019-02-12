import { Routes } from '@angular/router';
import { Settings } from './Parts/Settings/Settings';
import { Profile } from './Parts/Profile/Profile';
import { Signup } from './Parts/Signup/Signup';
import { LoginForm } from './Parts/Login/Login';
import { AddCar } from './Parts/Car/Add/AddCar';
import { CarDetail } from './Parts/Car/Detail/Detail';
import { EditCar } from './Parts/Car/Edit/EditCar';
import { ServiceDetail } from './Parts/ServiceItems/Detail/Detail';
import { PaymentPlans } from './Parts/PaymentPlans/Plans';
import { TermsOfService } from './Parts/TOS/tos';
import { Verified } from './Parts/Verified/Verified';
import { Dashboard } from './Parts/Dashboard/Dashboard';
import { Home } from './Parts/Home/Home';
import { Mechie } from './Parts/Mechie/Mechie';
import { FoldRouter } from './Parts/FoldRouter/FoldRouter';

export const routes: Routes = [
	{ path:'', component: Mechie },
	{
		path:'',
		component: FoldRouter,
		children:[
			{ path: 'login', component: LoginForm },
			{ path: 'login', component: LoginForm },
			{ path: 'home', component:  Dashboard },
			{ path: 'signup', component: Signup },
			{ path: 'profile', component: Profile },
			{ path: 'settings', component: Settings },
			{ path: 'add-car', component:AddCar },
			{ path: 'car/:Id', component:CarDetail },
			{ path: 'car/:Id/edit', component:EditCar },
			{ path: 'car/:Id/part/:PartId', component: ServiceDetail },
			{ path: 'plans', component:PaymentPlans },
			{ path: 'terms-of-service', component: TermsOfService },
			{ path: 'verified', component: Verified },
		]
	},
	
]