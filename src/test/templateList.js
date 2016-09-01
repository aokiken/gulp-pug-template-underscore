import { assert, templateList } from './helper';

describe('templateList', () => {
  it('simple test', (done) => {
    const templateDirPath = 'examples/simple/src/pug/templates';
    const pathSplit = '.';
    const returnObject = {
      foo: '<div id="foo"><%= bar %></div>',
      'nest.foo': '<div id="foo"><%= bar %></div>',
    };
    Promise.all([templateList(templateDirPath, pathSplit)]).then((values) => {
      assert.equal(JSON.stringify(values[0]), JSON.stringify(returnObject));
      done();
    });
  });

  it('simple pathSplit test', (done) => {
    const templateDirPath = 'examples/simple/src/pug/templates';
    const pathSplit = '/';
    const returnObject = {
      foo: '<div id="foo"><%= bar %></div>',
      'nest/foo': '<div id="foo"><%= bar %></div>',
    };
    Promise.all([templateList(templateDirPath, pathSplit)]).then((values) => {
      assert.equal(JSON.stringify(values[0]), JSON.stringify(returnObject));
      done();
    });
  });
});
