import replaceTemplate from './replaceTemplate';
import handleErrors from './handleErrors';

process.on('uncaughtException', handleErrors);

module.exports = (opts) => {
  const defaults = {
    templateDirPath: 'src/pug/templates',
    prefix: '',
    pathSplit: '.',
    extension: false,
  };
  const config = Object.assign(defaults, opts);
  return replaceTemplate(config);
};
