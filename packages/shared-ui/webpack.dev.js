const config = require("./webpack.common");

module.exports = () => {
	const [, cssRule] = config.module.rules;
	const [, cssLoader, sassLoader] = cssRule.use;

	const sourceMap = true;
	cssLoader.options = { ...cssLoader.options, sourceMap };
	sassLoader.options = { ...sassLoader.options, sourceMap };

	return {
		...config,
		mode: "development",
	};
};
