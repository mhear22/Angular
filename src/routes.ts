import { Routes } from '@angular/router';
import { LoginForm } from './components/Login/Login';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Home } from './components/Home/Home';

export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginForm },
	{ path: 'home', component:  Home }
	//{ path: 'home/:Id', component: Dashboard }
]