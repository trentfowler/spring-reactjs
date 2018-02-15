const path = require('path');

module.exports = {
    entry: ['./src/main/webapp/app.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
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
            }
        ]
    }
};