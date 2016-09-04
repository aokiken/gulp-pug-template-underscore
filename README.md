gulp-pug-template-underscore
===

[![Build Status](https://travis-ci.org/aokiken/gulp-pug-template-underscore.svg?branch=master)](https://travis-ci.org/aokiken/gulp-pug-template-underscore)

## Overview

指定のディレクトリ配下にあるpugファイルをcompileして、指定のjsファイル内の `/.template\('.*?'\)/g` に該当する要素の場合、replaceする。

このことにより、htmlファイル内に `<script type="text/template"></script>` のような記述がなくなり、htmlファイルの見通しがよくなること、かつpugファイルの再利用性や、共通性を高められるのでは、という狙い。

## Sample Project
* [aokiken/todomvc_backbone](https://github.com/aokiken/todomvc_backbone)
* [aokiken/bookmarker_backbone](https://github.com/aokiken/bookmarker_backbone)

## Sample gulpfile.js
```js
var gulp = require('gulp');
var ptu = require('gulp-pug-template-underscore');

var srcPath = 'src/javascripts/**/*.js';
var destPath = 'dest/javascripts';

gulp.task('default',function(){
  gulp.src(srcPath)
  .pipe(ptu({
    templateDirPath: 'src/pug/templates',
    prefix: '',
    pathSplit: '.',
    extension: false,
  }))
  .pipe(gulp.dest(destPath));
});
```
### options.prefix
#### gulpfile.js

```js
var gulp = require('gulp');
var ptu = require('gulp-pug-template-underscore');

var templateDirPath = 'src/pug/templates';
var srcPath = 'src/javascripts/**/*.js';
var destPath = 'dest/javascripts';

gulp.task('default',function(){
  gulp.src(srcPath)
  .pipe(ptu({
    templateDirPath: templateDirPath,
    prefix: 'ptu-'
  }))
  .pipe(gulp.dest(destPath));
});
```

#### sample.js

```js
// not replace target
_.template($('#foo').html())
_.template('<li><%= title %></li>')

// replace target
_.template('ptu-foo') // replace with compiled foo.pug 
```

### options.pathSplit
```js
var gulp = require('gulp');
var ptu = require('gulp-pug-template-underscore');

var templateDirPath = 'src/pug/templates';
var srcPath = 'src/javascripts/**/*.js';
var destPath = 'dest/javascripts';

gulp.task('default',function(){
  gulp.src(srcPath)
  .pipe(ptu({
    templateDirPath: templateDirPath,
    pathSplit: '/',
  }))
  .pipe(gulp.dest(destPath));
});
```

#### sample.js

```js
// replace target
_.template('nest/foo') // replace with compiled nest/foo.pug 
```

### options.extension
```js
var gulp = require('gulp');
var ptu = require('gulp-pug-template-underscore');

var templateDirPath = 'src/pug/templates';
var srcPath = 'src/javascripts/**/*.js';
var destPath = 'dest/javascripts';

gulp.task('default',function(){
  gulp.src(srcPath)
  .pipe(ptu({
    templateDirPath: templateDirPath,
    extension: true,
  }))
  .pipe(gulp.dest(destPath));
});
```

#### sample.js

```js
// replace target
_.template('foo.pug') // replace with compiled nest/foo.pug 
```

### options example
```js
var gulp = require('gulp');
var ptu = require('gulp-pug-template-underscore');

var templateDirPath = 'src/pug/templates';
var srcPath = 'src/javascripts/**/*.js';
var destPath = 'dest/javascripts';

gulp.task('default',function(){
  gulp.src(srcPath)
  .pipe(ptu({
    templateDirPath: 'src/pug/templates',
    prefix: '',
    pathSplit: '/',
    extension: true,
  }))
  .pipe(gulp.dest(destPath));
});
```

#### sample.js

```js
// replace target
_.template('nest/foo.pug') // replace with compiled nest/foo.pug 
```