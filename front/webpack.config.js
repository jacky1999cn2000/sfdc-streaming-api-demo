const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// set PATHS variable for easy reference later
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

// set HOST and PORT (use environment variable if exist)
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || "8080";

// set BABEL_ENV, which will be read by .babelrc (so 'react-hmre' preset will only be used for npm start)
process.env.BABEL_ENV = process.env.npm_lifecycle_event;

const config = {
    // basic setup for entry, resolve, output
    entry: {
        app: PATHS.app
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    // webpack-dev-server setup
    devtool: 'eval-source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,

        stats: 'errors-only',

        port: PORT,
        host: HOST
    },
    // modules for processing files
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
            loaders: ["style", "css?sourceMap", "sass?sourceMap"],
            include: [PATHS.app]
        }]
    },
    // plugins
    plugins: [
        // HtmlWebpackPlugin plugin + html-webpack-template plugin will generate an index.html for us on the fly
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
        // only add this for webpack-dev-server
        new webpack.HotModuleReplacementPlugin()
    ]
}


module.exports = config;
