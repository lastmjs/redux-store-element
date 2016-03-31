module.exports = {
    entry: {
        'redux-store': './src/redux-store.ts'
    },
    output: {
        path: './dist',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'babel-loader?presets[]=es2015,presets[]=stage-3!ts',
                exclude: [ /node_modules/ ]
            }
        ]
    }
};
