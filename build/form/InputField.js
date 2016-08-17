(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './BaseField', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./BaseField'), require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.BaseField, global.react);
    global.InputField = mod.exports;
  }
})(this, function (exports, _BaseField, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _BaseField2 = _interopRequireDefault(_BaseField);

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

  var InputField = function (_React$Component) {
    _inherits(InputField, _React$Component);

    function InputField() {
      var _Object$getPrototypeO;

      var _temp, _this, _ret;

      _classCallCheck(this, InputField);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(InputField)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.focus = function () {
        _this.refs.input.focus();
      }, _this.onChange = function (event) {
        _this.value = event.target.value;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(InputField, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var name = _props.name;
        var type = _props.type;

        var other = _objectWithoutProperties(_props, ['name', 'type']);

        return _react2.default.createElement('input', _extends({
          autoComplete: 'off',
          autoCorrect: 'off',
          autoCapitalize: 'off',
          spellCheck: 'false'
        }, other, {
          name: this.context.formValueScope.name + '.' + name,
          type: type,
          value: this.value,
          onChange: this.onChange,
          ref: 'input' }));
      }
    }, {
      key: 'value',
      get: function get() {
        // fall back to empty string to keep it a controlled component
        return this.context.formValueScope.getValue(this.props.name) || '';
      },
      set: function set(newValue) {
        this.context.formValueScope.setValue(this.props.name, newValue);
      }
    }]);

    return InputField;
  }(_react2.default.Component);

  InputField.contextTypes = _extends({}, _BaseField2.default.contextTypes);
  InputField.propTypes = _extends({}, _BaseField2.default.propTypes, {
    type: _react.PropTypes.string
  });
  InputField.defaultProps = _extends({}, _BaseField2.default.defaultProps, {
    type: 'text'
  });
  exports.default = InputField;
});