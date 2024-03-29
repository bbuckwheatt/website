const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // entry point, assuming main file is located at src/index.tsx
  output: {
    publicPath: '/', // Specify the base path for all the assets within your application.
    path: path.join(__dirname, '/dist'), // Output directory
    filename: 'bundle.js', // Output file
    publicPath: '/', // Specify the base path for all the assets within your application.
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'], // Resolve these file types
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Use babel-loader for ts and tsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'], // Use these Babel presets
          },
        },
      },
      {
        test: /\.css$/, // Use style-loader and css-loader for CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i, // Regex to match image files
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images', // Where to put images
              name: '[name].[ext]', // Keep the original file name and extension
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Path to HTML file
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 8000, // specify the port here
    historyApiFallback: true,
  },
};
