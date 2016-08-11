(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './BaseField', './FormValueScope', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./BaseField'), require('./FormValueScope'), require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.BaseField, global.FormValueScope, global.react);
    global.IteratorField = mod.exports;
  }
})(this, function (exports, _BaseField, _FormValueScope, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _BaseField2 = _interopRequireDefault(_BaseField);

  var _FormValueScope2 = _interopRequireDefault(_FormValueScope);

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

  var IteratorField = function (_React$Component) {
    _inherits(IteratorField, _React$Component);

    function IteratorField() {
      _classCallCheck(this, IteratorField);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(IteratorField).apply(this, arguments));
    }

    _createClass(IteratorField, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var name = _props.name;
        var skip = _props.skip;
        var take = _props.take;
        var children = _props.children;

        var other = _objectWithoutProperties(_props, ['name', 'skip', 'take', 'children']);

        var items = this.value.skip(skip).take(take || this.value.count());

        return _react2.default.createElement(
          _FormValueScope2.default,
          { name: name },
          _react2.default.createElement(
            'div',
            other,
            items.map(function (item, index) {
              return _react2.default.createElement(
                _FormValueScope2.default,
                { key: index + skip, name: index + skip },
                typeof children === 'function' ? children(item, index + skip) : children
              );
            })
          )
        );
      }
    }, {
      key: 'value',
      get: function get() {
        return this.context.formValueScope.getValue(this.props.name);
      }
    }]);

    return IteratorField;
  }(_react2.default.Component);

  IteratorField.contextTypes = _extends({}, _BaseField2.default.contextTypes);
  IteratorField.propTypes = _extends({}, _BaseField2.default.propTypes, {
    skip: _react.PropTypes.number,
    take: _react.PropTypes.number,
    children: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.func]).isRequired
  });
  IteratorField.defaultProps = _extends({}, _BaseField2.default.defaultProps, {
    skip: 0
  });
  exports.default = IteratorField;
});