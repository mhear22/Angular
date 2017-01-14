var webpack = require('webpack');

module.exports = {
	entry: {
		main: './src/main.ts',
		vendor: './vendor.ts'
	},
	output: {
		filename: '[name].js'
	},
	resolve: {
		extensions: ['','.webpack.js','.web.js', '.ts', '.js']
	},
	module: {
		loaders:[
			{ 
				test: /\.ts$/,
				loader: 'awesome-typescript-loader'
			},
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				loader: 'babel-loader',
				query: {
					presets: ['es3']
				}
			},
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				loader: 'uglify'
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin("vendor","vendor.js")
	]
}