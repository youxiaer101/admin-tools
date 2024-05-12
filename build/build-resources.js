/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const sep = path.sep

function ResourcesPlugin (options) {
  this.options = options || {}
}

ResourcesPlugin.prototype.apply = function (compiler) {
  compiler.plugin('afterPlugins', function (params) {
    // 根据不同编译环境拷贝不同的文件
    const files = [];
    switch (process.env.VUE_NODE_ENV) {
      case 'prd':
        files.push({ Src: 'build/nginx.conf', Target: 'public/nginx.conf' });
        files.push({ Src: 'build/Dockerfile', Target: 'public/Dockerfile' });
        break;
      case 'staging':
        files.push({ Src: 'build/nginx.conf', Target: 'public/nginx.conf' });
        files.push({ Src: 'build/Dockerfile', Target: 'public/Dockerfile' });
        break;
      case 'dev':
      default:
        files.push({ Src: 'build/nginx.conf', Target: 'public/nginx.conf' });
        files.push({ Src: 'build/Dockerfile', Target: 'public/Dockerfile' });
        break;
    }
    
    copyFilesToPublish(params, files);
  })
}

function copyFilesToPublish(params, files) {
  if (!files || !files.length) return
  files.forEach(f => {
    const srcFile = path.join(params.context, sep + '/' + f.Src);
    fs.readFile(srcFile, (err, data) => {
      if (!err && data) {
        fs.writeFile(path.join(params.context, sep + f.Target), data, (err) => {
          console.log()
          console.log('------------------------------------------------------------------')
          console.log(`-- (${f.Src}) => (${f.Target}) copy completed.`)
          if (err) {
            console.log(err);
          }
          console.log('------------------------------------------------------------------')
        })
      }
    });
  });
}

module.exports = ResourcesPlugin
