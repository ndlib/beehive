//app/assets/javascripts/components/__tests__/preprocessor.js
var ReactTools = require('react-tools');
var jsxPattern = /[.]jsx$/;

module.exports = {
  process: function(src, path) {
    if (jsxPattern.test(path)) {
      return ReactTools.transform(src);
    } else {
      return src;
    }
  }
};
