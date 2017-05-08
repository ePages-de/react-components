(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'prop-types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('prop-types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.propTypes);
    global.BaseField = mod.exports;
  }
})(this, function (exports, _propTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    contextTypes: {
      formValueScope: _propTypes2.default.object.isRequired
    },
    propTypes: {
      name: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
    }
  };
});