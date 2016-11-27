describe('demo', function(){
	it('should launch', function(){
		browser.get('http://localhost:8080/#/login');
		expect(browser.getTitle());
	});
});