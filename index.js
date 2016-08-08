'use strict';
var recursive = require('recursive-readdir');
var fs = require('fs');
var gutil = require('gulp-util');
var pug = require('pug');

module.exports = function (opts) {
  replaceTargetFileData(opts);
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
      files.forEach(function (file) {
        var name = file.replace('/' + templateDirPath.replace(new RegExp('/','g'),'\\/') + '\\/|\\.pug/g', '');
        var html = pug.compileFile(file, null);
        list[name] = html();
      });
      resolve(list);
    });
  });
}

function getTargetFileData(targetFilePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(targetFilePath, 'utf8', function (err, data) {
      resolve(data);
    });
  })
}

function getMatchList(data) {
  return data.match(/_.template\('.*?'\)/g);
}

function replaceTargetFileData(opts) {
  var defaults = {
    templateDirPath: "src/pug/templates",
    targetFilePath: "dest/javascripts/bundle.js"
  };
  var config = extend(opts, defaults);
  Promise.all([getTemplateList(config.templateDirPath), getTargetFileData(config.targetFilePath)]).then(function (values) {
    var list = values[0];
    var data = values[1];
    var result = data;
    var matchList = getMatchList(data);
    matchList.forEach(function (matchItem) {
      var key = matchItem.replace(/_\.template\('|'\)/g, '');
      var val = "_.template('" + list[key] + "')";
      var reg = "_\.template\\('" + key + "'\\)";
      result = result.replace(new RegExp(reg, 'g'), val);
    });
    fs.writeFile(config.targetFilePath, result, 'utf8', function (err) {
      if (err) {
        console.log(err);
      } else {
        gutil.log("gulp-pug-template-underscore: replace done.");
      }
    });
  });
}