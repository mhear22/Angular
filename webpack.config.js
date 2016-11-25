var webpack = require('webpack');

module.exports = {
	entry: {
		main: './src/main.ts'
	},
	output: {
		filename: '[name].js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['','.webpack.js','.web.js', '.ts', '.js']
	},
	plugins:[

	],
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