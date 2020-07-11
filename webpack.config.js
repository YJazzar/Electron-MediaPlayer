// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = [
    {
        mode: 'development',
        entry: './src/core/main.ts',
        target: 'electron-main',
        module: {
            rules: [{
                test: /\.ts$/,
                include: /src/,
                use: [{loader: 'ts-loader'}]
            }]
        },
        output: {
            path: __dirname + '/dist/core',
            filename: 'main.js'
        },
        resolve: {
            alias: {
                'libs': path.resolve(__dirname, 'src/libs'),
                'core': path.resolve(__dirname, 'src/core'),
                'app': path.resolve(__dirname, 'app/app')
            },
            extensions: ['.tsx', '.ts', '.js']
        },
        node: {
            __filename: true,
            __dirname: true
        }
    },
    {
        mode: 'development',
        entry: './src/app/react.tsx',
        target: 'electron-renderer',
        devtool: 'source-map',
        module: {
            rules: [{
                test: /\.ts(x?)$/,
                include: /src/,
                use: [{loader: 'ts-loader'}]
            }]
        },
        output: {
            path: __dirname + '/dist/app',
            filename: 'react.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/app/index.html'
            })
        ],
        node: {
            __filename: true,
            __dirname: true
        }
    }
];