(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react);
    global.BaseField = mod.exports;
  }
})(this, function (exports, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    contextTypes: {
      formValueScope: _react.PropTypes.object.isRequired
    },
    propTypes: {
      name: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired
    }
  };
});