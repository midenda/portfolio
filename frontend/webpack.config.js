const path = require ('path');

module.exports = 
{
  entry: 
  [
    './frontend/src/js/index.js'
  ],

  output: 
  {
    filename: 'index.js',
    path: path.resolve (__dirname, 'public/js'),
    clean: true
  },

  module: 
  {
    rules: 
    [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  resolve:
  {
    alias:
    {
      frontend: path.resolve (__dirname, './')
    }
  },

  mode: 'development'
};