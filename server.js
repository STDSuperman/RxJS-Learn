const express = require('express');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const path = require('path')

const app = express();
const compiler = webpack(webpackConfig);

// app.use(express.static(path.resolve(__dirname)));
app.use(express.static(path.resolve(__dirname, './build')));

app.use(WebpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        chunks: false,
        colors: true
    }
}));

app.use(WebpackHotMiddleware(compiler))


app.listen(3000);