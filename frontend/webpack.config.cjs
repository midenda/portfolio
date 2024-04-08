const path = require ('path');

module.exports = 
{
  entry: 
  {
    index:   'frontend/src/js/index/index.js',
    project: 'frontend/src/js/project/project.js'
  },

  output: 
  {
    filename: '[name].js',
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

  // context: path.resolve (__dirname, './'),

  resolve:
  {
    alias:
    {
      frontend: path.resolve (__dirname, './')
    }
  },

  mode: 'development'
};