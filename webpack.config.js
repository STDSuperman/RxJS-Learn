const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        index: ['webpack-hot-middleware/client?http://localhost:3000', path.resolve(__dirname, 'src/index.ts')]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                use: ['ts-loader', 'tslint-loader']
            }
        ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin(), new HtmlWebpackPlugin({
        title: 'Hello RxJS'
    })],
    resolve: {
        extensions: ['.ts', '.js']
    }
}