const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

const METADATA = {
    title: 'gql-app',
    baseUrl: '/',
    isDevServer: true
};

module.exports = {
    entry: './client/index.js',

    output: {
        path: '/',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            }
        ]
    },

    devServer: {
        contentBase: './client',
        noInfo: true,
        hot: true,
        inline: true,
        compress: true,
        disableHostCheck: true,
        historyApiFallback: true,
        port: port,
        host: host
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'client/index.html',
            title: METADATA.title,
            metadata: METADATA
        }),
        new Dotenv({
            path: './.env', // Path to .env file (this is the default)
            safe: false, // load .env.example (defaults to "false" which does not use dotenv-safe)
            systemvars: true,
            silent: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new DashboardPlugin()
    ]
};
