const path = require("path");
const nodeExternals = require("webpack-node-externals");
module.exports = {
	mode: "development",

	entry: "./src/index.js",

	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "dist"),
		library: {
			// ! you don't need a name
			// name: "laundryui",
			type: "umd",
			export: "default",
			auxiliaryComment: "this is a auxiliary comment",
			umdNamedDefine: true,
		},
		clean: true,
	},

	module: {
		rules: [
			{
				test: /\.(m?js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader", "ts-loader"],
			},
		],
	},

	resolve: {
		// Require to resolve filetypes such as JSX
		extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
	},
	plugins: [],

	externals: [nodeExternals()],
};
