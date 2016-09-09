(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react);
    global.FormValueScope = mod.exports;
  }
})(this, function (exports, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
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

  var FormValueScope = function (_React$Component) {
    _inherits(FormValueScope, _React$Component);

    function FormValueScope() {
      var _Object$getPrototypeO;

      var _temp, _this, _ret;

      _classCallCheck(this, FormValueScope);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(FormValueScope)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.getValue = function (name) {
        var outerScope = _this.context.formValueScope;
        if (outerScope) {
          var ownName = _this.props.name;
          var value = outerScope.getValue(ownName);
          return value ? value.get(name) : undefined;
        } else {
          return _this.state.value.get(name);
        }
      }, _this.setValue = function (name, value) {
        var outerScope = _this.context.formValueScope;
        if (outerScope) {
          var ownName = _this.props.name;
          return outerScope.setValue(ownName, outerScope.getValue(ownName).set(name, value));
        } else {
          var newValue = _this.state.value.set(name, value);
          _this.setState({ value: newValue });
          return newValue;
        }
      }, _this.getError = function (name) {
        var outerScope = _this.context.formValueScope;
        if (outerScope) {
          var ownName = _this.props.name;
          var error = outerScope.getError(ownName);
          return error ? error.get(name) : undefined;
        } else {
          return _this.state.errors.get(name);
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(FormValueScope, [{
      key: 'render',
      value: function render() {
        return this.props.children;
      }
    }, {
      key: 'getChildContext',
      value: function getChildContext() {
        return {
          formValueScope: this
        };
      }
    }, {
      key: 'name',
      get: function get() {
        var outerScope = this.context.formValueScope;
        var ownName = this.props.name;
        if (outerScope) {
          return outerScope.name + '.' + ownName;
        } else {
          return ownName;
        }
      }
    }]);

    return FormValueScope;
  }(_react2.default.Component);

  FormValueScope.contextTypes = {
    formValueScope: _react.PropTypes.object
  };
  FormValueScope.propTypes = {
    name: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired,
    children: _react.PropTypes.element.isRequired
  };
  FormValueScope.childContextTypes = {
    formValueScope: _react.PropTypes.object
  };
  exports.default = FormValueScope;
});