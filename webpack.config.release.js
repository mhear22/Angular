const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const clearWebpackPlugin = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	entry: {
		main: ['./src/main.ts', './src/main.sass'],
		vendor: './vendor.ts'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.ts', '.js', '.sass']
	},
	stats: {
		children: false,
		chunks: false,
		modules: false,
		warnings: false
	},
	target: 'node',
	module: {
		rules:[
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
			},
			{
				test: /\.sass$/,
				loader: ExtractTextPlugin.extract(["css-loader","sass-loader"])
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('[name].css', {
			publicPath: '../'
		}),
		new webpack.optimize.CommonsChunkPlugin({name:"vendor", filename:"vendor.js"}),
		new OptimizeCssAssetsPlugin({
			cssProcessorOptions: { discardComments: { removeAll:true } }
		})
	]
}