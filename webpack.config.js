// @ts-nocheck
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;

module.exports = {
    mode: process.env.NODE_ENV === 'production'?'production':'development',
    watch: process.env.NODE_ENV !== 'production',
    entry: {
        'view': './lib/view/main.ts',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        library: 'WebClientView',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|woff|ttf)$/,
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    /* devServer: {
        historyApiFallback: true,
        noInfo: true
    }, */
    /* performance: {
        hints: false
    }, */
    devtool: '#eval-source-map',
    plugins: [
        new VueLoaderPlugin(),
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        /* new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }) */
    ])
}
