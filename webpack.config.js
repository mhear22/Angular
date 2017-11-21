const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		main: ['./src/main.ts', './src/main.sass'],
		vendor: './vendor.ts'
	},
	output: {
		filename: '[name].js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.webpack.js','.web.js', '.ts', '.js', '.sass']
	},
	module: {
		rules:[
			{ 
				test: /\.ts$/,
				use: 'awesome-typescript-loader'
			},
			{
				test: /\.sass$/,
				use: ExtractTextPlugin.extract(['css-loader','sass-loader'])
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('style.css'),
		new webpack.optimize.CommonsChunkPlugin({name:"vendor", filename:"vendor.js"})
	]
}