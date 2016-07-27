var webpack = require('webpack');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var CompressionWebpackPlugin = require('compression-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// bootstrap 4 questions?
// * https://github.com/shakacode/bootstrap-loader
// * https://github.com/AngularClass/angular2-webpack-starter/wiki/How-to-use-Bootstrap-4-and-Sass-%28and-jQuery%29

module.exports = {
    context: __dirname + "/src",
    entry: ['bootstrap-loader', "./entry.js"],
    output: {
        path: __dirname + "/target",
        filename: "bundle.js"
    },
    devtool: 'eval',
    devServer: {
        port: 9000,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: 'body'
        }),
        new CompressionWebpackPlugin({
            test: /\.js$|\.html$/,
            threshold: 10240
        }),
        new ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            "Tether": 'tether',
            "window.Tether": "tether"
        }),
    ],
    module: {
        loaders: [
            // moment-timezone needs to load a json data file
            { include: /\.json$/, loaders: ["json-loader"] },

            { test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel',
              query: {
                  presets: ['react', 'es2015']
              }
            },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
            // Style configuration done in .bootstraprc
//            { test: /\.scss$/, loaders: ['style', 'css', 'sass'] } // more config done in .bootstraprc
        ]
    }
};
