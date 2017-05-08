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
    global.RadioButtonField = mod.exports;
  }
})(this, function (exports, _formField, _propTypes, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RadioButtonFieldRaw = undefined;

  var _formField2 = _interopRequireDefault(_formField);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var RadioButtonFieldRaw = exports.RadioButtonFieldRaw = function (_React$Component) {
    _inherits(RadioButtonFieldRaw, _React$Component);

    function RadioButtonFieldRaw() {
      _classCallCheck(this, RadioButtonFieldRaw);

      return _possibleConstructorReturn(this, (RadioButtonFieldRaw.__proto__ || Object.getPrototypeOf(RadioButtonFieldRaw)).apply(this, arguments));
    }

    _createClass(RadioButtonFieldRaw, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            value = _props.value,
            _onChange = _props.onChange,
            name = _props.name,
            scopedName = _props.scopedName,
            buttons = _props.buttons,
            disabled = _props.disabled,
            other = _objectWithoutProperties(_props, ['value', 'onChange', 'name', 'scopedName', 'buttons', 'disabled']);

        // eslint-disable-line no-unused-vars

        return _react2.default.createElement(
          'div',
          other,
          buttons.map(function (button, index) {
            return _react2.default.createElement(
              'span',
              { key: button.value },
              _react2.default.createElement('input', {
                id: scopedName + '.' + index,
                name: scopedName,
                type: 'radio',
                value: index,
                onChange: function onChange(event) {
                  return _onChange(buttons[parseInt(event.target.value)].value);
                },
                checked: value === button.value,
                disabled: disabled }),
              _react2.default.createElement(
                'label',
                { htmlFor: scopedName + '.' + index },
                button.label
              )
            );
          })
        );
      }
    }]);

    return RadioButtonFieldRaw;
  }(_react2.default.Component);

  RadioButtonFieldRaw.propTypes = {
    value: _propTypes2.default.any.isRequired,
    onChange: _propTypes2.default.func.isRequired,
    name: _propTypes2.default.string,
    scopedName: _propTypes2.default.string,
    buttons: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      value: _propTypes2.default.any.isRequired,
      label: _propTypes2.default.string.isRequired
    })).isRequired,
    disabled: _propTypes2.default.bool
  };
  RadioButtonFieldRaw.defaultProps = {
    disabled: false
  };
  exports.default = (0, _formField2.default)()(RadioButtonFieldRaw);
});