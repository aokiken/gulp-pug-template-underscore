gulp-pug-template-underscore
===
## Overview

指定のディレクトリ配下にあるpugファイルをcompileして、指定のjsファイル内の `/_.template\('.*?'\)/g` に該当する要素の場合、replaceする。

このことにより、htmlファイル内に `<script type="text/template"></script>` のような記述がなくなり、htmlファイルの見通しがよくなること、かつpugファイルの再利用性や、共通性を高められるのでは、という狙い。

## Sample gulpfile.js

    var gulp = require('gulp');
    var ptu = require('gulp-pug-template-underscore');

    var templateDirPath = 'src/pug/templates';
    var srcPath = 'src/javascripts/**/*.js';
    var destPath = 'dest/javascripts';

    gulp.task('default',function(){
      gulp.src(srcPath)
      .pipe(ptu({templateDirPath: templateDirPath}))
      .pipe(gulp.dest(destPath));
    });
    
## Sample Project

[aokiken/todomvc_backbone](https://github.com/aokiken/todomvc_backbone)

[Backbone.js • TodoMVC](https://aokiken.github.io/todomvc_backbone/)