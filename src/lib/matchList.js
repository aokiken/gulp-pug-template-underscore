export default (data, prefix, extension) => {
  const ext = extension ? '.pug' : '';
  const matchListReg = new RegExp(`.template\\(\'${prefix}.*?${ext}\'\\)`, 'g');
  return data.match(matchListReg);
};
