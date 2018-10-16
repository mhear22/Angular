import { Routes } from '@angular/router';
import { Home } from './parts/Home/Home';
import { Settings } from './parts/Settings/Settings';
import { Profile } from './parts/Profile/Profile';
import { Signup } from './parts/Signup/Signup';
import { LoginForm } from './parts/Login/Login';

export const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'login', component: LoginForm },
	{ path: 'home', component:  Home },
	{ path: 'signup', component: Signup },
	{ path: 'profile', component: Profile },
	{ path: 'settings', component: Settings }
]