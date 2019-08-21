const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base.conf.js')

module.exports = merge(base, {
    mode: 'development',
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, 'build'),
        progress: false
    },
    devtool: 'cheap-module-eval-source-map',
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
                        loader: 'style-loader'
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
    }
})