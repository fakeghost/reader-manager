var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app/index.js');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
	entry: {
		index : "./app/index.js"
	},
	devServer: {
		contentBase : "./build",
		historyApiFallback: true,
    	hot: true,
    	inline: true,
    	progress: true,
    	port: 4000,
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.css$/,
				loaders: ['style', 'css'],
				include: ROOT_PATH
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url?limit=10000'
			}
		]
	},
	output: {
		path: "./build",
		filename: '[name].js'
	},
	resolve: {
		modules: ['node_modules', 'styles', 'static', 'src', 'ueditor', 'css', 'img', 'js']
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new HtmlwebpackPlugin({
			filename : "home.html",
			template : "./index.html"
		}),
		new webpack.HotModuleReplacementPlugin(),
	]
};


