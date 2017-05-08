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
    global.RangeField = mod.exports;
  }
})(this, function (exports, _formField, _propTypes, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RangeFieldRaw = undefined;

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

  var RangeFieldRaw = exports.RangeFieldRaw = function (_React$Component) {
    _inherits(RangeFieldRaw, _React$Component);

    function RangeFieldRaw() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, RangeFieldRaw);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RangeFieldRaw.__proto__ || Object.getPrototypeOf(RangeFieldRaw)).call.apply(_ref, [this].concat(args))), _this), _this.transformValue = function (value) {
        return value * _this.props.multiplier;
      }, _this.transformValueInverse = function (value) {
        return value / _this.props.multiplier;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RangeFieldRaw, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            value = _props.value,
            _onChange = _props.onChange,
            name = _props.name,
            scopedName = _props.scopedName,
            min = _props.min,
            max = _props.max,
            step = _props.step,
            multiplier = _props.multiplier,
            other = _objectWithoutProperties(_props, ['value', 'onChange', 'name', 'scopedName', 'min', 'max', 'step', 'multiplier']);

        // eslint-disable-line no-unused-vars
        return _react2.default.createElement('input', _extends({}, other, {
          name: scopedName,
          type: 'range',
          min: min,
          max: max,
          step: step,
          value: this.transformValue(value),
          onChange: function onChange(event) {
            return _onChange(_this2.transformValueInverse(event.target.value));
          },
          onInput: this.onChange }));
      }
    }]);

    return RangeFieldRaw;
  }(_react2.default.Component);

  RangeFieldRaw.propTypes = {
    value: _propTypes2.default.any.isRequired,
    onChange: _propTypes2.default.func.isRequired,
    name: _propTypes2.default.string,
    scopedName: _propTypes2.default.string,
    min: _propTypes2.default.number.isRequired,
    max: _propTypes2.default.number.isRequired,
    step: _propTypes2.default.number,
    multiplier: _propTypes2.default.number
  };
  RangeFieldRaw.defaultProps = {
    step: 1,
    multiplier: 1
  };
  exports.default = (0, _formField2.default)()(RangeFieldRaw);
});