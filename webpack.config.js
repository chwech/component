var path = require('path');
var autoprefixer = require('autoprefixer');//自动添加浏览器前缀插件
var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
  //启用source-map方便调试
  devtool: 'eval-source-map',
  //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
  entry: APP_PATH,
  //输出的文件名 合并以后的js会命名为bundle.js
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  //本地服务器
  devServer: {
    historyApiFallback: true,
    //实时刷新
    hot: true,
    inline: true,
    progress: true
  },
  module: {
    loaders:[
      {
        //test一个需要匹配文件的正则
        test: /\.css$/,
        //css-loader会遍历css文件，找到所有的url(...)并且处理。style-loader会把所有的样式插入到你页面的一个style tag中。
        //loaders的处理顺序是从右到左的，这里就是先运行css-loader然后是style-loader.
        //?sourceMap 开启css sourceMap
        loaders: ['style', 'css?sourceMap', 'postcss'],
        include: APP_PATH
      },
      //babel-loader
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: APP_PATH,
        query: {
          presets: ['es2015']
        }
      }  
    ]
  },
  //自动添加浏览器前缀
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  //HtmlwebpackPlugin自动生成一个html文件
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Hello World app'
    })
  ]
};