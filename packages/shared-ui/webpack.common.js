const path = require("path");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { libName } = require("./webpack.settings");

module.exports = () => {
	const miniCssExtractOptions = {
		filename: `${libName}.css`,
		chunkFilename: `[id].${libName}.css`,
	};

	return {
		entry: "./src/index.js",
		target: "node",
		externalsPresets: { node: true },

		output: {
			filename: "index.js",
			path: path.resolve(__dirname, "dist"),
			library: {
				name: libName,
				type: "umd",
				export: "default",
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
						},
						{
							loader: "sass-loader",
							options: { implementation: require("sass") },
						},
					],
				},
			],
		},
		plugins: [new MiniCssExtractPlugin(miniCssExtractOptions)],
		resolve: {
			// Require to resolve filetypes such as JSX
			extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
		},

		externals: [
			nodeExternals({
				additionalModuleDirs: ["./../../node_modules"],
			}),
		],
	};
};
