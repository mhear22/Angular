import { Routes } from '@angular/router';
import { LoginForm } from './components/Login/Login';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Home } from './components/Home/Home';
import { Signup } from './components/Signup/Signup';
import { Profile } from './components/Profile/Profile';
import { Settings} from './components/Settings/Settings';

export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginForm },
	{ path: 'home', component:  Home },
	{ path: 'signup', component: Signup},
	{ path: 'profile', component: Profile },
	{ path: 'settings', component: Settings }
]