const path = require("path");
const webpackMerge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const WebpackBar = require("webpackbar");

const getModeConfig = (env) => require(`./build-utils/${env.mode}.config`)(env);

module.exports = (env) =>
  webpackMerge(
    {
      mode: env.mode,
      context: path.resolve(__dirname, "src"),
      entry: "./index.js",
      output: {
        path: path.resolve("dist"),
        filename: "[name].bundle.js",
      },
      module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
          { test: /\.(png|jpe?g|gif)$/i, use: [{ loader: "file-loader" }] },
          { test: /\.hbs$/, use: "handlebars-loader" },
          { test: /\.html$/i, use: "html-loader" },
          {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: "url-loader",
                options: { name: "[path]/[name].[ext]", limit: 5000 },
              },
            ],
          },
        ],
      },
      plugins: [
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new ProgressBarPlugin(),
        new WebpackBar(),
      ],
    },
    getModeConfig(env)
  );
