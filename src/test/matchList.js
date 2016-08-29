import { assert, matchList } from './helper';

describe('matchList', () => {
  it('simple test', () => {
    const data = "_.template('nest');";
    const prefix = '';
    const extension = false;
    const returnArray = ['_.template(\'nest\')'];
    assert(matchList(data, prefix, extension), returnArray);
  });
});
