const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ModuleFederationPlugin} = require('module-federation-plugin');

module.exports = {
    entry:  'src/index.tsx',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
     },
     resolve: {
        extensions: ['.ts', '.tsx', ',js']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html'}),
        new ModuleFederationPlugin({
            name: 'mainApp',
            filename: 'remoteEntry.js',
            remotes: {},
          }),
    ],
    devServer: {
        hot: true,
        port: 3000,
        open: true
    }
}