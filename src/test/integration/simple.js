import { assert, gulp, fs, replaceTemplate } from './../helper';

const srcPath = 'examples/simple/src/javascripts';
const destPath = 'examples/simple/dest/javascripts';

describe('replaceTemplate', () => {
  it('test foo.js', (done) => {
    gulp.src(`${srcPath}/foo.js`)
      .pipe(replaceTemplate({
        templateDirPath: 'examples/simple/src/pug/templates',
        prefix: '',
        extension: false,
      }))
      .pipe(gulp.dest(destPath))
      .on('end', () => {
        fs.readFile(`${destPath}/foo.js`, (err, data) => {
          if (err) throw err;
          assert.equal(data.toString(), "_.template('<div id=\"foo\"><%= bar %></div>');");
          done();
        });
      });
  });

  it('test prefix-foo.js', (done) => {
    gulp.src(`${srcPath}/prefix-foo.js`)
      .pipe(replaceTemplate({
        templateDirPath: 'examples/simple/src/pug/templates',
        prefix: 'ptu-',
        extension: false,
      }))
      .pipe(gulp.dest(destPath))
      .on('end', () => {
        fs.readFile(`${destPath}/prefix-foo.js`, (err, data) => {
          if (err) throw err;
          assert.equal(data.toString(), "_.template('<div id=\"foo\"><%= bar %></div>');");
          done();
        });
      });
  });

  it('test nest-foo.js', (done) => {
    gulp.src(`${srcPath}/nest-foo.js`)
      .pipe(replaceTemplate({
        templateDirPath: 'examples/simple/src/pug/templates',
        prefix: '',
        extension: false,
      }))
      .pipe(gulp.dest(destPath))
      .on('end', () => {
        fs.readFile(`${destPath}/nest-foo.js`, (err, data) => {
          if (err) throw err;
          assert.equal(data.toString(), "_.template('<div id=\"foo\"><%= bar %></div>');");
          done();
        });
      });
  });

  it('test extension-foo.js', (done) => {
    gulp.src(`${srcPath}/extension-foo.js`)
      .pipe(replaceTemplate({
        templateDirPath: 'examples/simple/src/pug/templates',
        prefix: '',
        extension: true,
      }))
      .pipe(gulp.dest(destPath))
      .on('end', () => {
        fs.readFile(`${destPath}/extension-foo.js`, (err, data) => {
          if (err) throw err;
          assert.equal(data.toString(), "_.template('<div id=\"foo\"><%= bar %></div>');");
          done();
        });
      });
  });

  it('test prefix-nest-foo.js', (done) => {
    gulp.src(`${srcPath}/prefix-nest-foo.js`)
      .pipe(replaceTemplate({
        templateDirPath: 'examples/simple/src/pug/templates',
        prefix: 'ptu-',
        extension: false,
      }))
      .pipe(gulp.dest(destPath))
      .on('end', () => {
        fs.readFile(`${destPath}/prefix-nest-foo.js`, (err, data) => {
          if (err) throw err;
          assert.equal(data.toString(), "_.template('<div id=\"foo\"><%= bar %></div>');");
          done();
        });
      });
  });

  it('test prefix-extension-foo.js', (done) => {
    gulp.src(`${srcPath}/prefix-extension-foo.js`)
      .pipe(replaceTemplate({
        templateDirPath: 'examples/simple/src/pug/templates',
        prefix: 'ptu-',
        extension: true,
      }))
      .pipe(gulp.dest(destPath))
      .on('end', () => {
        fs.readFile(`${destPath}/prefix-extension-foo.js`, (err, data) => {
          if (err) throw err;
          assert.equal(data.toString(), "_.template('<div id=\"foo\"><%= bar %></div>');");
          done();
        });
      });
  });

  it('test prefix-nest-extension-foo.js', (done) => {
    gulp.src(`${srcPath}/prefix-nest-extension-foo.js`)
      .pipe(replaceTemplate({
        templateDirPath: 'examples/simple/src/pug/templates',
        prefix: 'ptu-',
        extension: true,
      }))
      .pipe(gulp.dest(destPath))
      .on('end', () => {
        fs.readFile(`${destPath}/prefix-nest-extension-foo.js`, (err, data) => {
          if (err) throw err;
          assert.equal(data.toString(), "_.template('<div id=\"foo\"><%= bar %></div>');");
          done();
        });
      });
  });

  it('test nest-extension-foo.js', (done) => {
    gulp.src(`${srcPath}/nest-extension-foo.js`)
      .pipe(replaceTemplate({
        templateDirPath: 'examples/simple/src/pug/templates',
        prefix: '',
        extension: true,
      }))
      .pipe(gulp.dest(destPath))
      .on('end', () => {
        fs.readFile(`${destPath}/nest-extension-foo.js`, (err, data) => {
          if (err) throw err;
          assert.equal(data.toString(), "_.template('<div id=\"foo\"><%= bar %></div>');");
          done();
        });
      });
  });
});

