const merge = require('webpack-merge');
const common = require('./webpack.common');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const purifyCss = require('purifycss-webpack');
const glob = require('glob');
const path = require('path');

module.exports = merge(common,{
    devtool: 'source-map',
    plugins: [
        new cleanWebpackPlugin(['dist']),
        new purifyCss({
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        })
    ]
});