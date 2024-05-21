// webpack.config.js
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: [
    "./src/client/index.jsx",
    "webpack-hot-middleware/client?reload=true",
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
