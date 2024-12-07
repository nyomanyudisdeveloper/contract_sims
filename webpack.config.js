const path = require('path');

module.exports = {
  // Entry point: The main file of your application
  entry: './src/index.js',
  node: {
        __dirname: false
  },

  // Output: Where the bundled file will be generated
  output: {
    path: path.resolve(__dirname, 'dist'), // Directory for the output
    filename: 'bundle.js', // Name of the output file
  },
  plugins: [
    new CopyWebpackPlugin({
        patterns: [
            './node_modules/swagger-ui-dist/swagger-ui.css',
            './node_modules/swagger-ui-dist/swagger-ui-bundle.js',
            './node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js',
            './node_modules/swagger-ui-dist/favicon-16x16.png',
            './node_modules/swagger-ui-dist/favicon-32x32.png'
        ]
    })
],

  // Target: Specify the environment (e.g., "node" for Node.js applications)
  target: 'node',

  // Mode: Can be 'development', 'production', or 'none'
  mode: 'development',

  // Module rules: Loaders for transforming different file types
  module: {
    rules: [
      {
        test: /\.js$/, // Transform JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel for transpiling
          options: {
            presets: ['@babel/preset-env'], // Use modern JavaScript features
          },
        },
      },
    ],
  },

  // Resolve: Options for resolving module imports
  resolve: {
    extensions: ['.js', '.json'], // Resolve these file types
  },
};
