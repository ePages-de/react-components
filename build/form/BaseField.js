'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

exports.default = {
  contextTypes: {
    formValueScope: _react.PropTypes.object.isRequired
  },
  propTypes: {
    name: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired
  }
};