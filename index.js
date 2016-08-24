'use strict';
var recursive = require('recursive-readdir');
var pug = require('pug');
var through = require('through2');
var cache = {};

process.on('uncaughtException', function (err) {
  console.log(err);
});

module.exports = function (opts) {
  var defaults = {
    templateDirPath: 'src/pug/templates',
    prefix: ''
  };
  var config = extend(defaults, opts);
  return through.obj(function (file, encoding, callback) {
    Promise.all([getTemplateList(config.templateDirPath), String(file.contents)]).then(function (values) {
      var list = values[0];
      var data = values[1];
      var result = data;
      var matchList = getMatchList(data, config.prefix);
      if (matchList) {
        matchList.forEach(function (matchItem) {
          var matchItemReg = new RegExp("_.template\\('" + config.prefix + "|'\\)", "g");
          var key = matchItem.replace(matchItemReg, '');
          var val = "_.template('" + list[key] + "')";
          var resultReg = new RegExp("_.template\\('" + config.prefix + key + ".*?'\\)", "g");
          result = result.replace(resultReg, val);
        });
      }
      file.contents = new Buffer(result);
      callback(null, file);
    });
  }, function (callback) {
    callback();
  });
};

function extend(a, b) {
  for (var key in b)
    if (b.hasOwnProperty(key))
      a[key] = b[key];
  return a;
}

function getTemplateList(templateDirPath) {
  return new Promise(function (resolve, reject) {
    recursive(templateDirPath, function (err, files) {
      var list = {};
      files.forEach(function (filePath) {
        var filePathReplaced = filePath.replace(templateDirPath, '');
        filePathReplaced = filePathReplaced.replace(/^\//, '');
        filePathReplaced = filePathReplaced.replace(/\//g, '.');
        var name = filePathReplaced.replace('.pug', '');
        var html = pug.compileFile(filePath, null);
        list[name] = html();
      });
      resolve(list);
    });
  });
}

function getMatchList(data, prefix) {
  var matchListReg = new RegExp("_.template\\('" + prefix + ".*?'\\)", "g");
  return data.match(matchListReg);
}