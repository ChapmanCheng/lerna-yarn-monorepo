const common = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { libName } = require("./var");

module.exports = () => {
	const config = common();

	config.plugins.forEach((plugin) => {
		if (plugin instanceof MiniCssExtractPlugin) {
			plugin.options = {
				...plugin.options,
				filename: `${libName}.min.css`,
				chunkFilename: `[id].${libName}.css`,
			};
		}
	});

	return {
		...config,
		mode: "production",
		optimization: {
			minimizer: [new CssMinimizerPlugin()],
		},
	};
};
