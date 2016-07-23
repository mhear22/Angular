import { sayHello } from './hello';

class Startup{
	public static main(): number{
		console.log(sayHello("hello world"));
		return 0;
	}
}

Startup.main();