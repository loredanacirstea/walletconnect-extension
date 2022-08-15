const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/provider.js",
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: { keep_classnames: true, keep_fnames: true },
      }),
    ],
  },
  performance: {
    hints: false,
  },
  output: {
    filename: "provider.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.es.js$/i,
        include: /walletconnect/,
        // include: [
        //   path.resolve(__dirname, "node_modules/@walletconnect/ethereum-provider/dist/index.es"),
        //   path.resolve(__dirname, "node_modules/@walletconnect/sign-client/dist/index.es")
        // ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ]
  } 
};
