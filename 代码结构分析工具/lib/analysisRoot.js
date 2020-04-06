var nodes = [];
var edges = [];

function handleDep() {

}

function findNode(str, node) {
  let impReg = /(\.\.\/)/g;
  let re = str.match(impReg);
  let t = node;
  while(re) {
    t = t.parent;
  }
}

function handleVals(str) {

}

function analysisRoot(root) {
  for (let i = 0; i < root.file.length; i++) {
    nodes.push({
      name: root.file[i].name,
      id: root.file[i].id
    });

    let dependencies = root.file[i].dependencies;
    for (let j = 0; j < dependencies.length; j++) {
      edges.push({
        source: root.file[i].id,
        target: findNode(dependencies[j].from).id,
        values: handleVals(dependencies[j].vals)
      }); 
    }
  }
}

module.exports = {
  analysisRoot
}
