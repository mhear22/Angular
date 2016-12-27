var webpack = require('webpack');

module.exports = {
	entry: {
		main: './src/main.ts'
	},
	output: {
		filename: 'bundle.js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['','.webpack.js','.web.js', '.ts', '.js']
	},
	module: {
		loaders:[
			{ 
				test: /\.ts$/,
				loaders:[
					'awesome-typescript-loader'
				]
			}
		]
	}
}