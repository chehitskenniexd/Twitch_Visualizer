'use strict';

// initialize and direct webpack creation

var webpack = require('webpack');

module.exports = {
    entry: './Front_End/index.js',
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    }, // end output
    context: __dirname,
    devtool: 'source-map',
    module: {
        loaders: [
            {
            test: /js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        }] // end loaders
    } //end module
};