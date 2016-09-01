import recursive from 'recursive-readdir';
import pug from 'pug';

export default (templateDirPath, pathSplit) =>
  new Promise((resolve) => {
    recursive(templateDirPath, (err, files) => {
      const list = {};
      files.forEach((filePath) => {
        let filePathReplaced = filePath.replace(templateDirPath, '');
        filePathReplaced = filePathReplaced.replace(/^\//, '');
        filePathReplaced = filePathReplaced.replace(/\//g, `${pathSplit}`);
        const name = filePathReplaced.replace('.pug', '');
        const html = pug.compileFile(filePath, null);
        list[name] = html();
        list[name] = list[name].replace(/\n/g, '');
      });
      resolve(list);
    });
  });
