exports.config = {
	framework: 'jasmine',
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['./src/**/*.spec.js'],
	useAllAngular2AppRoots: true,
	capabilities: {
		browserName: 'chrome'
	}
}