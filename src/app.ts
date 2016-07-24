import { sayHello } from './hello';
import { Component } from '@angular/core';
class Startup{
	public static main(): number{
		console.log(sayHello("Hello world"));
		return 0;
	}
}

Startup.main();