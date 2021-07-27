const path = require("path");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
	const sourceMap = process.env.NODE_ENV === "development" ? true : false;

	// ! still not working perfectly

	return {
		mode: "development",
		entry: "./src/index.js",

		output: {
			filename: "index.js",
			path: path.resolve(__dirname, "dist"),
			library: {
				name: "shared-ui",
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
				{
					test: /\.s?[a|c]ss$/i,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: { esModule: false },
						},
						{
							loader: "css-loader",
							options: { sourceMap },
						},
						{
							loader: "sass-loader",
							options: {
								sourceMap,
								implementation: require("sass"),
							},
						},
					],
				},
			],
		},
		plugins: [new MiniCssExtractPlugin({ filename: "[name].css" })],
		resolve: {
			// Require to resolve filetypes such as JSX
			extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
		},

		externals: [nodeExternals()],
	};
};
