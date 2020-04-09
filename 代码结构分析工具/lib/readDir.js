var fs = require('fs');
var path = require('path');
var { getDependencies } = require('./getDependencies');
// const depcruise = require('dependency-cruiser').cruise;

var id = 0;
function getDir(filePath, Vnode) {
  var files = fs.readdirSync(filePath);
  files.forEach(function (filename) {
    var filedir = path.join(filePath, filename);
    var stats = fs.statSync(filedir);

    var isFile = stats.isFile(); //是文件
    var isDir = stats.isDirectory(); //是文件夹
    if (isFile && filename !== ".DS_Store") {
      Vnode.files.push({
        fileTpye: 'file',
        filedir: filedir,
        parent: Vnode,
        name: filename,
        id: String(id++),
        dependencies: getDependencies(filedir)
      });
    }
    if (isDir) {
      let TNode = {
        fileTpye: 'dir',
        filedir: filedir,
        parent: Vnode,
        name: filename,
        files: [],
        dirs: [],
        id: String(id++)
      };
      Vnode.dirs.push(TNode);
      getDir(filedir, TNode);
    }
  });
}

module.exports = {
  getDir
}
