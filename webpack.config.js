// webpack.config.js
const path = require( 'path' );

module.exports = {
    context: __dirname,

    entry: './src/core/main.js',

    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'dsadsa.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            }
        ]
    },
    plugins: []
};