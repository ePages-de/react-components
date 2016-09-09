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
    global.RadioButtonField = mod.exports;
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

  var RadioButtonField = function (_React$Component) {
    _inherits(RadioButtonField, _React$Component);

    function RadioButtonField() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, RadioButtonField);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RadioButtonField.__proto__ || Object.getPrototypeOf(RadioButtonField)).call.apply(_ref, [this].concat(args))), _this), _this.updateValue = function (event) {
        var button = _this.props.buttons[parseInt(event.target.value)];

        _this.value = button.value;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RadioButtonField, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props;
        var name = _props.name;
        var buttons = _props.buttons;
        var disabled = _props.disabled;
        var parseValue = _props.parseValue;

        var other = _objectWithoutProperties(_props, ['name', 'buttons', 'disabled', 'parseValue']);

        // eslint-disable-line no-unused-vars

        return _react2.default.createElement(
          'div',
          other,
          buttons.map(function (button, ix) {
            return _react2.default.createElement(
              'span',
              { key: button.value },
              _react2.default.createElement('input', {
                id: name + '.' + ix,
                name: _this2.context.formValueScope.name + '.' + name,
                type: 'radio',
                value: ix,
                onChange: _this2.updateValue,
                checked: _this2.value === button.value,
                disabled: disabled }),
              _react2.default.createElement(
                'label',
                { htmlFor: name + '.' + ix },
                button.label
              )
            );
          })
        );
      }
    }, {
      key: 'value',
      get: function get() {
        return this.context.formValueScope.getValue(this.props.name);
      },
      set: function set(newValue) {
        this.context.formValueScope.setValue(this.props.name, newValue);
      }
    }]);

    return RadioButtonField;
  }(_react2.default.Component);

  RadioButtonField.contextTypes = _extends({}, _BaseField2.default.contextTypes);
  RadioButtonField.defaultProps = _extends({}, _BaseField2.default.defaultProps);
  RadioButtonField.propTypes = _extends({}, _BaseField2.default.propTypes, {
    buttons: _react.PropTypes.arrayOf(_react.PropTypes.shape({
      value: _react.PropTypes.any.isRequired,
      label: _react.PropTypes.string.isRequired
    })).isRequired
  });
  exports.default = RadioButtonField;
});