
const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
var JavaScriptObfuscator = require('webpack-obfuscator');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    resolve: {
      extensions: [
        '.js',
        '.jsx',
        '.css',
      ],
    },
    module: {
      rules: [{
        test: /\.js$|\.jsx$/,
        include: /src/,
        use: 'babel-loader',
        exclude: /node_modules/,
  
      },
      {
        test: /\.scss$|\.css$/,
        include: /src/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS
        ],
      },
    {
        test: /\.html$/,
        include: /src/,
        use: 'html-loader',
    },
    {
      test: /node_modules.+js$/,
      loader: require.resolve("ify-loader"),
    },
  
  ]
},
    plugins: [htmlPlugin,
      new Dotenv({
      path: './src/.env',
    })
    // , new JavaScriptObfuscator ({
    //   rotateUnicodeArray: true
    // })
   ],
  //  target: 'node',
    node: {
      fs: 'empty'
    },
    devtool: 'inline-source-map'
}

