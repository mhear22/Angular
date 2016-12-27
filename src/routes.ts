import { Routes } from '@angular/router';
import { LoginForm } from './Parts/Login/Login';
import { Dashboard } from './Parts/Dashboard/Dashboard';
import { Home } from './Parts/Home/Home';
import { Signup } from './Parts/Signup/Signup';
import { Profile } from './Parts/Profile/Profile';
import { Settings} from './Parts/Settings/Settings';

export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginForm },
	{ path: 'home', component:  Home },
	{ path: 'signup', component: Signup},
	{ path: 'profile', component: Profile },
	{ path: 'settings', component: Settings }
]