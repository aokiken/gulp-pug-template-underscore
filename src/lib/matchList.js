export default (data, prefix, extension) => {
  const ext = extension ? '.pug' : '';
  const matchListReg = new RegExp(`_.template\\(\'${prefix}.*?${ext}\'\\)`, 'g');
  return data.match(matchListReg);
};
