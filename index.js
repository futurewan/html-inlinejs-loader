const fs = require('fs');
const UglifyJs = require('uglify-es');
const loaderUtils = require('loader-utils');

module.exports = function(source){
  const { placeholder,path } = loaderUtils.getOptions(this);
  let insertElement = fs.readFileSync(path,'utf-8');
  let callback = this.async();

  insertElement = UglifyJs.minify(insertElement).code;
  source = source.replace(placeholder,`<script>${insertElement}</script>`)
  callback(null,source);
}