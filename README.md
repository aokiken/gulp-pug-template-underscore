gulp-pug-template-underscore
===
## Overview

指定のディレクトリ配下にあるpugファイルをcompileして、指定のjsファイル内の `/_.template\('.*?'\)/g` に該当する要素の場合、replaceする。

このことにより、htmlファイル内に<script type="text/template"></script>のような記述がなくなり、htmlファイルの見通しがよくなること、かつpugファイルの再利用性や、共通性を高められるのでは、という狙い。