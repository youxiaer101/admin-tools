
> 暂时不使用,若需要根据环境变量打包不同配置文件时再使用

**build-resources.js**
  1. 修改文件编译时拷贝逻辑, 拷贝对应的文件到`public`文件夹

**vue.config.js**
  1. 引入: `const resourcesPlugin = require('./build/build-resources.js')`
  1. chainWebpack中加入: `config.plugin('resource').use(resourcesPlugin).tap(args => args)`