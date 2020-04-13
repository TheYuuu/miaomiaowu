var fs = require('fs');

function getDependencies(filePath) {
  var data = fs.readFileSync(filePath).toString();
  let impReg = /import\s(.*?)[from]*[\s|.]*?['|"](.*?)['|"]/g;
  let re = [];
  while((results = impReg.exec(data)) !== null) {
    re = re.concat({
      vals: results[1] || '*',
      from: results[2]
    });
  }
  return re;
}

module.exports = {
  getDependencies
}
