import { Component, Inject } from '@angular/core';
import { ServiceBase } from '../../Services/ServiceBase';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/LoginService';

@Component({
	selector: 'header-bar',
	templateUrl: './Parts/Header/Header.html',
	providers: [ LoginService ]
})

export class Header { }
