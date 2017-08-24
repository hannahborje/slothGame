const path = require('path');

const config = {
  entry: './src/index.js',
   output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};

module.exports = {  
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2016']
                }
            }
        }]
    }
};

module.exports = config;
