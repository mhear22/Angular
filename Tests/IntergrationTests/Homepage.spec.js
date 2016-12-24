describe('Home page behavior', function(){
	it('should launch', function(){
		browser.get('http://localhost:8080/#/login');
		element(by.name('username')).sendKeys("testUsername");
		element(by.name('password')).sendKeys("testUsername");
	});
});