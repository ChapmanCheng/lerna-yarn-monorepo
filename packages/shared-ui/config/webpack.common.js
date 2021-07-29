const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const writeEntries = require("./helper/writeEntries");
const regex = require("./helper/regex");

module.exports = () => {
  const libName = process.env.npm_package_name;

  const miniCssExtractOptions = {
    filename: `${libName}.css`,
    chunkFilename: `[id].${libName}.css`,
  };

  return {
    // entry: { index: "./src/index.js" }, // ! deprecated, see below
    entry: () => {
      let rootPath = path.resolve(__dirname, "../");
      let srcPath = path.resolve(rootPath, "src");

      return writeEntries(srcPath, {});
    },

    target: "node",
    externalsPresets: { node: true },

    output: {
      filename: (pathData) => {
        if (pathData.chunk.name.endsWith("index")) return "[name].js";
        return "[name]/index.js";
      },
      path: path.resolve(__dirname, "..", "dist"),
      library: {
        name: libName,
        type: "umd",
        umdNamedDefine: true,
      },
      clean: true,
    },
    module: {
      rules: [
        {
          test: regex.js,
          exclude: /node_modules/,
          use: [
            "babel-loader",
            {
              loader: "ts-loader",
              options: { configFile: path.resolve("config", "tsconfig.json") },
            },
          ],
        },
        {
          test: regex.css,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: "css-loader" },
            {
              loader: "sass-loader",
              options: { implementation: require("sass") },
            },
          ],
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin(miniCssExtractOptions)],
    resolve: { extensions: [".js", ".ts", ".jsx", ".tsx", ".json"] }, // Require to resolve filetypes such as JSX

    externals: {
      react: "react",
    },

    // * settings base on https://github.com/webpack-contrib/mini-css-extract-plugin#extracting-all-css-in-a-single-file
    optimization: {
      splitChunks: {
        cacheGroups: {
          default: false,
          styles: {
            name: "styles",
            type: "css/mini-extract",
            chunks: "all",
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
    },
  };
};
