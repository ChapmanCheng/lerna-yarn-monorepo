const config = require("./webpack.common");

module.exports = () => {
	return {
		...config,
		mode: "production",
	};
};
