const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { libName } = require("./var");

module.exports = () => {
	const miniCssExtractOptions = {
		filename: `${libName}.css`,
		chunkFilename: `[id].${libName}.css`,
	};

	return {
		entry: {
			index: "./src/index.js",
			components: "./src/components/",
			enum: "./src/enum/",
		},
		target: "node",
		externalsPresets: { node: true },

		output: {
			filename: (pathData) => {
				if (pathData.chunk.name === "index") return "[name].js";
				else return "[name]/index.js";
			},
			path: path.resolve(__dirname, "..", "dist"),
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

		externals: {
			react: "react",
		},
	};
};
