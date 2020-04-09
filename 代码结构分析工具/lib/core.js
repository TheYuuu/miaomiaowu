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
  let { nodes, edges } = analysisRoot(root);
  delAttr(root);
  return { root, nodes, edges};
}

module.exports = {
  getData
}
