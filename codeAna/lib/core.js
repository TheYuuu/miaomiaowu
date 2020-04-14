var { getDir}  = require('./readDir');
var { analysisRoot, delAttr}  = require('./analysisRoot');


function getData(filePath) {
  //调用文件遍历方法
  var root = {
    name: '-',
    files: [],
    dirs: []
  };

  getDir(filePath, root);
  root = root.dirs[0];
  let { nodes, edges, fileTypes } = analysisRoot(root);
  delAttr(root);
  
  fileTypes = Array.from(new Set(fileTypes));
  fileTypes.push('dir');
  return { root, nodes, edges, fileTypes};
}

module.exports = {
  getData
}
