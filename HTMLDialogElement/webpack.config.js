const path = require('path');
const package = require('./package.json'); // 引入package.json文件

module.exports = {
  mode: 'production', //development
  entry: `./js/${package.name}${package.version}.js`, // 动态设置入口文件
  output: {
    path: path.resolve(__dirname, './js/webpack'),
    filename: `${package.name}.bundle${package.version}.js`, // 动态设置输出文件名
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 使用正则表达式匹配需要转换的文件
        exclude: /node_modules/, // 排除不需要转换的文件
        use: {
          loader: 'babel-loader', // 使用 babel-loader 进行转换
          options: {
            presets: ['@babel/preset-env'], // 使用 @babel/preset-env 进行转换
            // plugins: ['@babel/plugin-transform-modules-commonjs'] // 添加插件配置
          }
        }
      }
    ]
  }
}
