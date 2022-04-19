const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const inProd = !isDev;

const fileName = (ext) =>
    isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;
const loaderJs = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    ];

    if (isDev) {
        loaders.push('eslint-loader');
    }
    return loaders;
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill', './index.js'],
    output: {
        filename: fileName('js'),
        path: path.resolve(__dirname, 'app')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core')
        }
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 3000,
        open: true,
        hot: isDev
    },
    plugins: [
        new HTMLPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: inProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: fileName('css')
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: loaderJs()
            },
            {
                test: /\.(?:|gif|png|jpg|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: `img/${fileName('[ext]')}`
                }
            }
        ]
    }
};
