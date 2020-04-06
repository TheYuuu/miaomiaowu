var fs = require('fs');
var path = require('path');
var { getDependencies } = require('./getDependencies');
var nodes = [];
var edges = [];

var id = 0;

function getDir(filePath, Vnode) {
  var files = fs.readdirSync(filePath);
  files.forEach(function (filename) {
    var filedir = path.join(filePath, filename);
    var stats = fs.statSync(filedir);

    var isFile = stats.isFile(); //是文件
    var isDir = stats.isDirectory(); //是文件夹
    if (isFile && filename !== ".DS_Store") {
      Vnode.file.push({
        filedir: filedir,
        parent: Vnode,
        name: filename,
        id: id++,
        dependencies: getDependencies(filedir)
      });
    }
    if (isDir) {
      let TNode = {
        filedir: filedir,
        parent: Vnode,
        name: filename,
        file: [],
        children: []
      };
      Vnode.children.push(TNode);
      getDir(filedir, TNode);
    }
  });
}

module.exports = {
  getDir
}
