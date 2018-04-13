const ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: './src/main.js',
     
    output: {
       filename: './dist/bundle.js',
    },
     
    devServer: {
       inline: true,
       port: 9999
    },
    devtool: "eval-source-map", 
    devServer: {
        compress: true, // enable gzip compression
    }, 
    module: {
       loaders: [
          {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
          },
          {
            test: /\.js$/,
            use: ["source-map-loader"],
            enforce: "pre"
          },
          {
             test: /\.scss$/,
             use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
              })
             
          },
          {
            test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: './dist/fonts/',    // fonts will go
                }
            }]
          }
       ]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
 }
 
 module.exports = config;

 //loaders: ['style-loader', 'css-loader', 'sass-loader']