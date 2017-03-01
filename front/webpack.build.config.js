const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

// will use this later for packaging all modules into a separate vendor.js file
const pkg = require('./package.json');

// set BABEL_ENV, which will be read by .babelrc
process.env.BABEL_ENV = process.env.npm_lifecycle_event;

const config = {
    // we now have two entry names - app (will by default start from index.js under root folder) and vendor (all the dependencies modules)
    entry: {
        app: PATHS.app,
        vendor: Object.keys(pkg.dependencies).filter(function(v) {
            return true;
        })
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: '[name].[chunkhash].js',
        chunkFilename: '[chunkhash].js'
    },
    module: {
        loaders: [{
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.jsx?$/,
            loaders: ['babel?cacheDirectory'],
            include: PATHS.app
        }, {
            test: /\.scss$/,
            include: [PATHS.app],
            loader: ExtractTextPlugin.extract("style", ["css?sourceMap", "postcss", "sass?sourceMap&outputStyle=expanded"])
        }]
    },
    // used to add prefix in css automatically
    postcss: [
        require('autoprefixer')
    ],
    plugins: [
        new HtmlWebpackPlugin({
            template: 'node_modules/html-webpack-template/index.ejs',
            title: 'sfdc-streaming-api app',
            appMountId: 'app',
            inject: false,
            scripts: [
                // 'https://code.jquery.com/jquery-2.2.0.min.js',
                // 'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.2.4/foundation.min.js'
            ],
            links: [
                'https://fonts.googleapis.com/css?family=Roboto|Ravi+Prakash|Indie+Flower',
                'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'
            ],
        }),
        // this will clear contents in build folder every time before creating new ones
        new CleanPlugin([PATHS.build]),

        // this will create a separate .css file (compared with inline css in dev mode)
        // and will be injected to build folder's index.html automatically
        new ExtractTextPlugin('[name].[chunkhash].css'),

        // this will separate code into app.js and vendor.js (manifest.js is used by app.js to find vendor.js)
        // and will be injected to build folder's index.html automatically
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),

        // this will do some optimization
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),

        // this will uglify js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}

module.exports = config;
