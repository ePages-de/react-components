(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'hoist-non-react-statics', 'prop-types', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('hoist-non-react-statics'), require('prop-types'), require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.hoistNonReactStatics, global.propTypes, global.react);
    global.withClassName = mod.exports;
  }
})(this, function (exports, _hoistNonReactStatics, _propTypes, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = withClassName;

  var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

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

  function withClassName(className) {
    var hoistedMethods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    return function (Component) {
      var WithClassName = function (_React$Component) {
        _inherits(WithClassName, _React$Component);

        function WithClassName() {
          var _ref;

          var _temp, _this, _ret;

          _classCallCheck(this, WithClassName);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WithClassName.__proto__ || Object.getPrototypeOf(WithClassName)).call.apply(_ref, [this].concat(args))), _this), _this.hoistMethods = function (wrappedComponent) {
            wrappedComponent && hoistedMethods.forEach(function (methodName) {
              _this[methodName] = wrappedComponent[methodName];
            });
          }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(WithClassName, [{
          key: 'render',
          value: function render() {
            var _props = this.props,
                additionalClassName = _props.className,
                other = _objectWithoutProperties(_props, ['className']);

            return _react2.default.createElement(Component, _extends({}, other, {
              className: additionalClassName ? className + ' ' + additionalClassName : className,
              ref: this.hoistMethods }));
          }
        }]);

        return WithClassName;
      }(_react2.default.Component);

      WithClassName.displayName = 'WithClassName(' + (Component.displayName || Component.name || 'Component') + ')';
      WithClassName.propTypes = {
        className: _propTypes2.default.string
      };


      return (0, _hoistNonReactStatics2.default)(WithClassName, Component);
    };
  }
});