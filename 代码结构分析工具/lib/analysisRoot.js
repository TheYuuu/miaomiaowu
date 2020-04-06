var nodes = [];
var edges = [];

function getTarget(name, t) {
  let p = t;
  if (p.fileTpye === 'file') {
    p = p.parent;
  }
  let targetDir = p.children.filter(v => v.name === name);
  let targetFile = p.file.filter(v => v.name === name);
  if (targetDir.length) {
    p = targetDir[0];
  } else if (targetFile.length) {
    p = targetFile[0];
  }
  return p;
}

function findPre(params) {
  let { node, name } = params;
  let p = node;
  if (name) {
    p = getTarget(name, p);
  }
  return p;
}

function findNext(params) {
  let { node, name } = params;
  let t;
  t = getTarget(name, node);

  return t;
}

function findNode(str, node) {
  let t = node;
  let fileReg = /(\.{0,2}\/)([^\/]*)/g;
  let re;
  while ((re = fileReg.exec(str)) !== null) {
    switch(re[1]) {
      case '../':
        t = findPre({ node: t,  name: re[2] });
        break;
      case './':
        t = findNext({ node: t,  name: re[2] });
        break;
      case '/':
        t = findNext({ node: t,  name: re[2] });
        break;
    }
  }
  if(t && t.fileTpye === 'dir') {
    t = t.file.filter(v => v.name === 'index.ts')[0] || null;
  }

  return t ? t.id : null;
}

function handleVals(str) {
  let re = str;
  if(!str) {
    return ['*'];
  }

  if (/^\{\s+(.*)\s+\}$/g.exec(str)) {
    re = /^\{\s+(.*)\s+\}$/g.exec(str)[1];
  }

  re = re.split(' as ')[0].split(',').map(
      item => {
        return item.replace(/\s+/, '');
      });

  return re;
}

function analysisRoot(root) {
  for (let i = 0; i < root.file.length; i++) {
    console.log(root.file[i].id, root.file[i].name);
    nodes.push({
      filedir: root.file[i].filedir,
      name: root.file[i].name,
      id: root.file[i].id
    });

    let dependencies = root.file[i].dependencies;
    for (let j = 0; j < dependencies.length; j++) {
      edges.push({
        source: root.file[i].id,
        target: findNode(dependencies[j].from, root.file[i]),
        values: handleVals(dependencies[j].vals)
      });
    }

    for (let k = 0; k < root.children.length; k++) {
      analysisRoot(root.children[k]);
    }
  }

  return { nodes, edges };
}


module.exports = {
  analysisRoot
}
