module.exports = {
    module: {
        rules: [{
            test: /\.css$/,
            exclude: /\.module\.css$/,
            use: [{ loader: 'style-loader' }]
        }, {
            test: /\.module\.css$/,
            use: [{ loader: 'style-loader' }, {
                loader:'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[path][name]__[local]--[hash:base64:5]'                    
                }
            }]
        }]
    },
  }