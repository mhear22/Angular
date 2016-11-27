describe('demo', function(){
	it('should launch', function(){
		browser.get('http://localhost:8080/#/signup');
		expect(browser.getTitle());
	});
});