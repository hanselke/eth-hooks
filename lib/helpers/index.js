'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../chunk-6CZGM7JT.js');
var react = require('react');

var lazier = (importFactory, importName) => {
  return react.lazy(() => {
    return importFactory().then((module) => ({ default: module[importName] }));
  });
};

exports.lazier = lazier;
//# sourceMappingURL=index.js.map