describe('Signup page behavior', function(){
	fit('should launch', function(){
		browser.get('http://localhost:8080/#/signup');
		element(by.name('username')).sendKeys("username");
		element(by.name('pass')).sendKeys("1234test");
		element(by.name('email')).sendKeys("test@email");
		element(by.name('submit')).click();
	});
});