const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const RELEASE_PATH = path.join(__dirname, 'release');

module.exports = {
    mode: 'development',
    entry: {
        main: 'src/app/index.tsx',
    },
    output: {
        publicPath: '/',
        filename: '[name].js',
        path: RELEASE_PATH,
    },
    module: {
        rules: [{
                test: /\.s(a|c)ss$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'sass-loader'
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                ],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'ts-loader',
            },
            {
                test: /\.js?$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
            },
            {
                test: /\.svg$/,
                use: [{
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'react-svg-loader',
                        options: {
                            jsx: true
                        }
                    },
                ]
            },
            {
                test: /\.(woff2?|ttf|otf|eot)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: ['file-loader?name=[name].[ext]']
            },
        ],
    },
    node: {
        fs: 'empty',
    },
    resolve: {
        modules: [
            __dirname,
            'node_modules',
        ],
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', 'scss'],
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src/assets')
        }]),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            template: './public/index.html'
        }),
        new webpack.EnvironmentPlugin(['BASE_URL', 'ASSETS_VERSION', 'CDN_URL', 'HOST', 'APP_URL']),
    ],
    devtool: 'source-map',
    externals: [],
    devServer: {
        historyApiFallback: {
            disableDotRule: true
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        hot: true,
        port: 1200,
        contentBase: RELEASE_PATH,
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        },
    },
};
