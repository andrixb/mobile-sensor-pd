const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

const RELEASE_PATH = path.join(__dirname, 'release');
const CDN_URL = (process.env.CDN_URL) ? process.env.CDN_URL : '';
const ASSETS_VERSION = (process.env.ASSETS_VERSION) ? `${process.env.ASSETS_VERSION}` : '';

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: `${process.env.CDN_URL}/${process.env.ASSETS_VERSION}/`,
        filename: '[name].js',
        path: RELEASE_PATH,
    },
});
