const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, './src/index.ts'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	devtool: 'inline-source-map',
	mode: 'development',
	module: {
		rules: [
			// All files with a `.ts` or `.tsx` extension will be handled by `ts-loader`.
			{
				test: /\.tsx?$/,
				use: { loader: 'ts-loader' },
				exclude: /node_modules/,
			},
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto',
			  },
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	plugins: [
		new CleanPlugin.CleanWebpackPlugin(),
		// Automatically insert <script src="[name].js"><script> into the page.
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		// Copy the PDF file and PDF.js worker to the output path.
		new CopyWebpackPlugin({
			patterns: [
				{
					from: './src/example.pdf',
					to: './example.pdf',
				},
				{
					from: './node_modules/pdfjs-dist/build/pdf.worker.mjs',
					to: './main.worker.js',
				},
			],
		}),
	],
};