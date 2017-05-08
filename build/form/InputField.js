(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './formField', 'prop-types', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./formField'), require('prop-types'), require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.formField, global.propTypes, global.react);
    global.InputField = mod.exports;
  }
})(this, function (exports, _formField, _propTypes, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.InputFieldRaw = undefined;

  var _formField2 = _interopRequireDefault(_formField);

  var _propTypes2 = _interopRequireDefault(_propTypes);

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

  var InputFieldRaw = exports.InputFieldRaw = function (_React$Component) {
    _inherits(InputFieldRaw, _React$Component);

    function InputFieldRaw() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, InputFieldRaw);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InputFieldRaw.__proto__ || Object.getPrototypeOf(InputFieldRaw)).call.apply(_ref, [this].concat(args))), _this), _this.focus = function () {
        return _this.input && _this.input.focus();
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(InputFieldRaw, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            value = _props.value,
            _onChange = _props.onChange,
            name = _props.name,
            scopedName = _props.scopedName,
            type = _props.type,
            other = _objectWithoutProperties(_props, ['value', 'onChange', 'name', 'scopedName', 'type']);

        // eslint-disable-line no-unused-vars
        return _react2.default.createElement('input', _extends({
          autoComplete: 'off',
          autoCorrect: 'off',
          autoCapitalize: 'off',
          spellCheck: 'false'
        }, other, {
          name: scopedName,
          type: type,
          value: value,
          onChange: function onChange(event) {
            return _onChange(event.target.value);
          },
          ref: function ref(node) {
            _this2.input = node;
          } }));
      }
    }]);

    return InputFieldRaw;
  }(_react2.default.Component);

  InputFieldRaw.propTypes = {
    value: _propTypes2.default.string.isRequired,
    onChange: _propTypes2.default.func.isRequired,
    name: _propTypes2.default.string,
    scopedName: _propTypes2.default.string,
    type: _propTypes2.default.string
  };
  InputFieldRaw.defaultProps = {
    type: 'text'
  };
  exports.default = (0, _formField2.default)()(InputFieldRaw);
});