const common = require("./webpack.common");

module.exports = () => {
	const config = common();

	return {
		...config,
		mode: "production",
	};
};
