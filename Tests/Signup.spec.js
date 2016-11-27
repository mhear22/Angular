describe('Signup page behavior', function(){
	it('should launch', function(){
		browser.get('http://localhost:8080/#/signup');
		element(by.name('username')).sendKeys("testUsername");
	});
});