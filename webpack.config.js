var webpack = require('webpack');

module.exports = {
	entry: {
		main: './src/main.ts',
		vendor: './vendor.ts'
	},
	output: {
		filename: '[name].js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['','.webpack.js','.web.js', '.ts', '.js']
	},
	module: {
		loaders:[
			{ 
				test: /\.ts$/,
				loader: 'awesome-typescript-loader'
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin("vendor","vendor.js")
	]
}