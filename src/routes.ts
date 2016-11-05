import { Routes } from '@angular/router'
import { LoginForm } from './components/Login/Login'

export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginForm }
]