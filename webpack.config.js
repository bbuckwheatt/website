const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // Your entry point, assuming your main file is located at src/index.tsx
  output: {
    path: path.join(__dirname, '/dist'), // Output directory
    filename: 'bundle.js', // Output file
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Path to your HTML file
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 3000, // You can specify the port here
    historyApiFallback: true, // Add this line
  },
};
