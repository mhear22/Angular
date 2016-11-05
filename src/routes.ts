import { Routes } from '@angular/router';
import { LoginForm } from './components/Login/Login';
import { Dashboard } from './components/Dashboard/Dashboard';

export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginForm },
	{ path: 'home', component: Dashboard },
	{ path: 'home/:Id', component: Dashboard }
]