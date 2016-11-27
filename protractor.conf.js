exports.config = {
	framework: 'jasmine',
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['./Tests/**/*.spec.js'],
	useAllAngular2AppRoots: true,
	capabilities: {
		maxInstances: 5,
		shardTestFiles: true,
		browserName: 'chrome'
	}
}