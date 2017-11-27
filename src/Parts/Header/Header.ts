import { Component, Inject } from '@angular/core';
import { ServiceBase } from '../../Services/ServiceBase';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/LoginService';

@Component({
	selector: 'header-bar',
	template: require('./Header.html'),
	providers: [ LoginService ]
})

export class Header { }
