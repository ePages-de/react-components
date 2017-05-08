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
    global.ChoiceField = mod.exports;
  }
})(this, function (exports, _formField, _propTypes, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ChoiceFieldRaw = undefined;

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

  var ChoiceFieldRaw = exports.ChoiceFieldRaw = function (_React$Component) {
    _inherits(ChoiceFieldRaw, _React$Component);

    function ChoiceFieldRaw() {
      _classCallCheck(this, ChoiceFieldRaw);

      return _possibleConstructorReturn(this, (ChoiceFieldRaw.__proto__ || Object.getPrototypeOf(ChoiceFieldRaw)).apply(this, arguments));
    }

    _createClass(ChoiceFieldRaw, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            value = _props.value,
            onChange = _props.onChange,
            name = _props.name,
            scopedName = _props.scopedName,
            choices = _props.choices,
            other = _objectWithoutProperties(_props, ['value', 'onChange', 'name', 'scopedName', 'choices']);

        // eslint-disable-line no-unused-vars

        return _react2.default.createElement(
          'div',
          other,
          choices.map(function (choice, index) {
            return _react2.default.createElement(
              'div',
              {
                key: index,
                onClick: function onClick() {
                  return onChange(choice.value);
                },
                'data-active': choice.value === value ? 'yes' : 'no' },
              choice.label
            );
          })
        );
      }
    }]);

    return ChoiceFieldRaw;
  }(_react2.default.Component);

  ChoiceFieldRaw.propTypes = {
    value: _propTypes2.default.any.isRequired,
    onChange: _propTypes2.default.func.isRequired,
    name: _propTypes2.default.string,
    scopedName: _propTypes2.default.string,
    choices: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      value: _propTypes2.default.any.isRequired,
      label: _propTypes2.default.string.isRequired
    })).isRequired
  };
  exports.default = (0, _formField2.default)()(ChoiceFieldRaw);
});