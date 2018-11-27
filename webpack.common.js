const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, '/dist/'),
        inline: true,
        port: '8080',
        historyApiFallback: true,
        hot: true
    },
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.(sa|sc|c)ss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /(\.js|\.jsx)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/,
            },
            {
                test: /.(jpg|jpeg|png|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        outputPath: 'images'
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('Powered by lucas'),
        new htmlWebpackPlugin({
            template: path.join(__dirname, '/src/index.html')
        }),
        new webpack.HotModuleReplacementPlugin(),
        require('autoprefixer'),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css',
        })
    ]
}