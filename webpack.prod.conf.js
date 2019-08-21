const merge = require('webpack-merge')
const base = require('./webpack.base.conf.js')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJsPlugin = require('terser-webpack-plugin')
const OptimiziCss = require('optimize-css-assets-webpack-plugin') 

module.exports = merge(base, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    optimization: {
        minimizer: [
            new TerserJsPlugin(),
            new OptimiziCss()
        ]
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        })
    ]
})