(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './formField', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./formField'), require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.formField, global.react);
    global.TextareaField = mod.exports;
  }
})(this, function (exports, _formField, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _formField2 = _interopRequireDefault(_formField);

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var TextareaField = function (_React$Component) {
    _inherits(TextareaField, _React$Component);

    function TextareaField() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, TextareaField);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextareaField.__proto__ || Object.getPrototypeOf(TextareaField)).call.apply(_ref, [this].concat(args))), _this), _this.focus = function () {
        return _this.textarea && _this.textarea.focus();
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TextareaField, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            value = _props.value,
            _onChange = _props.onChange,
            name = _props.name,
            fullName = _props.fullName,
            rows = _props.rows,
            other = _objectWithoutProperties(_props, ['value', 'onChange', 'name', 'fullName', 'rows']);

        // eslint-disable-line no-unused-vars
        return _react2.default.createElement('textarea', _extends({
          autoComplete: 'off',
          autoCorrect: 'off',
          autoCapitalize: 'off',
          spellCheck: 'false'
        }, other, {
          name: fullName,
          rows: rows,
          value: value,
          onChange: function onChange(event) {
            return _onChange(event.target.value);
          },
          ref: function ref(node) {
            _this2.textarea = node;
          } }));
      }
    }]);

    return TextareaField;
  }(_react2.default.Component);

  TextareaField.propTypes = {
    value: _react.PropTypes.string.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    name: _react.PropTypes.string,
    fullName: _react.PropTypes.string,
    rows: _react.PropTypes.number
  };
  exports.default = (0, _formField2.default)()(TextareaField);
});