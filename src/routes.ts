import { Routes } from '@angular/router';
import { LoginForm } from './components/Login/Login';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Home } from './components/Home/Home';
import { Signup } from './components/Signup/Signup'; 

export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginForm },
	{ path: 'home', component:  Home },
	{ path: 'signup', component: Signup}
	//{ path: 'home/:Id', component: Dashboard }
]