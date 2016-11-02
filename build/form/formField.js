(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './BaseField', 'hoist-non-react-statics', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./BaseField'), require('hoist-non-react-statics'), require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.BaseField, global.hoistNonReactStatics, global.react);
    global.formField = mod.exports;
  }
})(this, function (exports, _BaseField, _hoistNonReactStatics, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = formField;

  var _BaseField2 = _interopRequireDefault(_BaseField);

  var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

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

  function formField() {
    return function (Component) {
      var FormField = function (_React$Component) {
        _inherits(FormField, _React$Component);

        function FormField() {
          var _ref;

          var _temp, _this, _ret;

          _classCallCheck(this, FormField);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormField.__proto__ || Object.getPrototypeOf(FormField)).call.apply(_ref, [this].concat(args))), _this), _this.hoistMethods = function (wrappedComponent) {
            wrappedComponent && ['focus'].forEach(function (methodName) {
              _this[methodName] = wrappedComponent[methodName];
            });
          }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(FormField, [{
          key: 'render',
          value: function render() {
            var formValueScope = this.context.formValueScope;

            var _props = this.props,
                name = _props.name,
                other = _objectWithoutProperties(_props, ['name']);

            return _react2.default.createElement(Component, _extends({}, other, {
              value: formValueScope.getValue(name),
              onChange: function onChange(newValue) {
                return formValueScope.setValue(name, newValue);
              },
              name: name,
              scopedName: formValueScope.name + '.' + name,
              ref: this.hoistMethods }));
          }
        }]);

        return FormField;
      }(_react2.default.Component);

      FormField.displayName = 'FormField(' + (Component.displayName || Component.name || 'Component') + ')';
      FormField.contextTypes = _extends({}, _BaseField2.default.contextTypes);
      FormField.propTypes = _extends({}, _BaseField2.default.propTypes);
      FormField.defaultProps = _extends({}, _BaseField2.default.defaultProps);


      return (0, _hoistNonReactStatics2.default)(FormField, Component);
    };
  }
});