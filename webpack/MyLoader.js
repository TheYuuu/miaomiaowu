const loaderUtils = require('loader-utils');
const path = require('path');
const parserHtml = require('./lib/parserHtml');
const templateify = require('./lib/templateify')

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);

  const html = source.match(/\<template\>[^]*\<\/template\>/)[0].replace('/n', '');
  const js = source.match(/\<script\>[^]*\<\/script\>/)[0].replace('/n', '').replace('<script>', '').replace('</script>', '');
  const css = source.match(/\<style[^]*\<\/style\>/)[0].replace('/n', '');

  let root = parserHtml(html);
  let newRoot = templateify(parserHtml(html));

  const htmlRelativePath = path.join('t.html');
  this.emitFile(htmlRelativePath, newRoot);

  const cssRelativePath = path.join('t.css');
  this.emitFile(cssRelativePath, css);

  return `export default ${ JSON.stringify(js) }`;
}