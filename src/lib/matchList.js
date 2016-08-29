export default (data, prefix) => {
  const matchListReg = new RegExp(`_.template\\(\'${prefix}.*?\'\\)`, 'g');
  return data.match(matchListReg);
};
