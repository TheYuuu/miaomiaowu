var fs = require('fs');
var path = require('path');
var { getDir}  = require('./lib/readDir');
var { analysisRoot}  = require('./lib/analysisRoot');
const dirTree = require("directory-tree");

const tree = dirTree("./data");
console.log(tree);debugger;

//解析需要遍历的文件夹，我这以E盘根目录为例
var filePath = path.resolve('./data');

//调用文件遍历方法
var root = {
  name: '-',
  file: [],
  children: []
};

getDir(filePath, root);
root = root.children[0];

console.log(root);debugger;

let { nodes, edges } = analysisRoot(root);

console.log(nodes, edges);debugger;

