import through from 'through2';
import templateList from './templateList';
import matchList from './matchList';

export default (config) =>
  through.obj((file, encoding, callback) => {
    Promise.all([templateList(config.templateDirPath, config.pathSplit)]).then((values) => {
      const list = values[0];
      const _matchList = matchList(String(file.contents), config.prefix, config.extension);
      let result = String(file.contents);
      if (_matchList) {
        _matchList.forEach((matchItem) => {
          const ext = config.extension ? '.pug' : '';
          const matchItemReg = new RegExp(`.template\\('${config.prefix}|${ext}'\\)`, 'g');
          const key = matchItem.replace(matchItemReg, '');
          const val = `.template('${list[key]}')`;
          const resultReg = new RegExp(`.template\\('${config.prefix}${key}.*?${ext}'\\)`, 'g');
          result = result.replace(resultReg, val);
        });
      }
      file.contents = new Buffer(result);
      callback(null, file);
    });
  }, (callback) =>
    callback()
  );
