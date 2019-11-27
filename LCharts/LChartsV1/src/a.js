// a.js
let obj = {}
setTimeout(function () { obj = undefined }, 1000)
module.exports = obj
