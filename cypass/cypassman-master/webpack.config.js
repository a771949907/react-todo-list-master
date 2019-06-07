var 
    path                = require('path'),
    HtmlWebpackPlugin   = require('html-webpack-plugin'),
    CopyWebpackPlugin   = require('copy-webpack-plugin'),
    ExtractTextPlugin   = require('extract-text-webpack-plugin'),
    WriteFilePlugin     = require('write-file-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: {
        background: './app.js',
        popup: './popup.js',
        inject: './inject/inject.js'
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'js/[name].bundle.js',
    },
    externals: {
        'ramda': 'R'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
            { 
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },
    resolve:{
        extensions: ['.js', '.jsx', '.css']
    },
    plugins: [
        // Move sources
        new CopyWebpackPlugin([
            {from:'./resources/templates/manifest.tmpl.json', to: 'manifest.json'},
        ]),
        // Move Css
        new ExtractTextPlugin("css/[name].bundle.css"),
        // Gen Html
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: './resources/templates/popup.tmpl.html',
            chunks: ['popup'],
            title:''
        }),
        new WriteFilePlugin()
    ]
};