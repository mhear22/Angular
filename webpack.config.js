const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const clearWebpackPlugin = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {
		main: ['./src/main.ts', './src/main.sass'],
		vendor: './vendor.ts'
	},
	output: {
		filename: './dist/[name].js'
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
			},
			{
				use:'html-loader'
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('style.css'),
		new webpack.optimize.CommonsChunkPlugin({name:"vendor", filename:"vendor.js"}),
		new clearWebpackPlugin([
			'dist'
		]),
		new htmlWebpackPlugin("./src/index.html")
	]
}