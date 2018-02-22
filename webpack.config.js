const path = require('path');

module.exports = {
    entry: ['./src/main/webapp/app.js'],
    output: {
        path: path.resolve(__dirname, './src/main/resources/static'),
        publicPath: '/src/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query:
                    {
                        presets:['es2015', 'react']
                    }
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                loader: 'css-loader',
            }
        ]
    }
};