import { assert, templateList } from './helper';

describe('templateList', () => {
  it('simple test', (done) => {
    const templateDirPath = 'examples/simple/src/pug/templates';
    const returnObject = {
      foo: '<div id="foo"><%= bar %></div>',
      'nest.bar': '<div id="nest-foo"><%= bar %></div>',
    };
    Promise.all([templateList(templateDirPath)]).then((values) => {
      assert.equal(JSON.stringify(values[0]), JSON.stringify(returnObject));
      done();
    });
  });
});
