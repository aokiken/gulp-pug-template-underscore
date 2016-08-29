import { assert, gulp, fs, replaceTemplate } from './../helper';

describe('replaceTemplate', () => {
  it('simple test', (done) => {
    gulp.src('examples/simple/src/javascripts/foo.js')
      .pipe(replaceTemplate({
        templateDirPath: 'examples/simple/src/pug/templates',
        prefix: '',
        extension: false,
      }))
      .pipe(gulp.dest('examples/simple/dest/javascripts'))
      .on('end', () => {
        fs.readFile('examples/simple/dest/javascripts/foo.js', (err, data) => {
          if (err) throw err;
          assert.equal(data.toString(), "_.template('<div id=\"foo\"><%= bar %></div>');");
          done();
        });
      });
  });
  it('simple-prefix test', (done) => {
    gulp.src('examples/simple/src/javascripts/prefix-foo.js')
      .pipe(replaceTemplate({
        templateDirPath: 'examples/simple/src/pug/templates',
        prefix: 'ptu-',
        extension: false,
      }))
      .pipe(gulp.dest('examples/simple/dest/javascripts'))
      .on('end', () => {
        fs.readFile('examples/simple/dest/javascripts/prefix-foo.js', (err, data) => {
          if (err) throw err;
          assert.equal(data.toString(), "_.template('<div id=\"foo\"><%= bar %></div>');");
          done();
        });
      });
  });
  it('simple-nest test', (done) => {
    gulp.src('examples/simple/src/javascripts/nest-foo.js')
      .pipe(replaceTemplate({
        templateDirPath: 'examples/simple/src/pug/templates',
        prefix: 'ptu-',
        extension: false,
      }))
      .pipe(gulp.dest('examples/simple/dest/javascripts'))
      .on('end', () => {
        fs.readFile('examples/simple/dest/javascripts/nest-foo.js', (err, data) => {
          if (err) throw err;
          assert.equal(data.toString(), "_.template('<div id=\"nest-foo\"><%= bar %></div>');");
          done();
        });
      });
  });
});
