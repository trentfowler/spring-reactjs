const path = require('path');

module.exports = {
    entry: ['./src/main/js/app.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                query:
                    {
                        presets:['react']
                    }
            }
        ]
    }
};