const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const { networkInterfaces } = require('os');

const path = require("path");

const rootPath = path.join(__dirname, ".");
const resolve = (...parts) => path.resolve(rootPath, ...parts);

const aliases = (() =>
{
	const aliasPaths = require("./tsconfig.json").compilerOptions.paths;

	let a = {};
	for (let alias in aliasPaths)
	{
		let p = aliasPaths[alias][0];
		if (p)
			a[alias.replace("/*", "")] = "./" + p.replace("/*", "");
	}
	return a;
})();

const getHost = () =>
{
	const nets = networkInterfaces();
	for (const o of nets["Wi-Fi"])
	{
		if (o.family === "IPv4")
			return o.address;
	}
	return "127.0.0.1";
}


const config = {
	mode: "development",
	entry: {
		app: resolve("app/index.tsx"),
	},
	stats: "minimal",
	target: "web",
	name: "client",
	devtool: "cheap-module-source-map",
	output: {
		path: resolve("build"),
		filename: "js/[name].bundle.js",
		chunkFilename: `js/chunks/[id].chunk.js`,
		publicPath: "/"
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
		alias: aliases
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `css/[name].bundle.css`,
			chunkFilename: `css/[id].chunk.css`,
			ignoreOrder: false
		}),
		new CopyPlugin([{ from: resolve("static"), to: resolve("build") }]),
		new HtmlPlugin({
			filename: "index.html",
			template: "index.html",
		}),
	],
	context: rootPath,
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /(node_modules|build)/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
						presets: [
							"@babel/preset-env",
							"@babel/preset-react",
							"@babel/preset-typescript"
						],
						plugins: [
							["babel-plugin-module-resolver", {
								root: rootPath,
								alias: aliases
							}],
							["@babel/plugin-transform-runtime",
								{
									"regenerator": true
								}
							],
							["@babel/plugin-proposal-decorators", { "legacy": true }],
							["@babel/plugin-proposal-class-properties", { "loose": true }],
							"@babel/plugin-proposal-object-rest-spread",
							"@babel/plugin-syntax-dynamic-import",
						]
					}
				}
			},
			{
				test: /\.js$/,
				use: ["source-map-loader"],
				enforce: "pre"
			},
			{
				test: /\.s?(c|a)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader",
				],
				exclude: /node_modules/
			},
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/i,
				use: {
					loader: "url-loader",
					options: {
						fallback: "file-loader",
						limit: 40000,
						name: "images/[name].[ext]",
					},
				},
			}
		]
	},
	optimization: {
		runtimeChunk: {
			name: "runtime"
		},
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				default: false,
				vendors: false,
				vendor: {
					chunks: "all",
					test: /node_modules/,
					priority: 20,
					name: "vendor",
				},
				common: {
					name: 'common',
					chunks: 'async',
					priority: 10,
					reuseExistingChunk: true,
					enforce: true
				}
			}
		}
	},
	devServer: {
		contentBase: resolve('static'),
		publicPath: '/',
		host: getHost(),
		disableHostCheck: true,
	}
};

module.exports = config;
