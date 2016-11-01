(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './formField', './FormValueScope', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./formField'), require('./FormValueScope'), require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.formField, global.FormValueScope, global.react);
    global.IteratorField = mod.exports;
  }
})(this, function (exports, _formField, _FormValueScope, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _formField2 = _interopRequireDefault(_formField);

  var _FormValueScope2 = _interopRequireDefault(_FormValueScope);

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

  var IteratorFieldRaw = function (_React$Component) {
    _inherits(IteratorFieldRaw, _React$Component);

    function IteratorFieldRaw() {
      _classCallCheck(this, IteratorFieldRaw);

      return _possibleConstructorReturn(this, (IteratorFieldRaw.__proto__ || Object.getPrototypeOf(IteratorFieldRaw)).apply(this, arguments));
    }

    _createClass(IteratorFieldRaw, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            value = _props.value,
            onChange = _props.onChange,
            name = _props.name,
            fullName = _props.fullName,
            skip = _props.skip,
            take = _props.take,
            children = _props.children,
            other = _objectWithoutProperties(_props, ['value', 'onChange', 'name', 'fullName', 'skip', 'take', 'children']);

        // eslint-disable-line no-unused-vars
        var items = value.skip(skip).take(take || value.count());

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
    }]);

    return IteratorFieldRaw;
  }(_react2.default.Component);

  IteratorFieldRaw.propTypes = {
    // TODO: ImmutablePropTypes.list
    value: _react.PropTypes.any.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    name: _react.PropTypes.string,
    fullName: _react.PropTypes.string,
    skip: _react.PropTypes.number,
    take: _react.PropTypes.number,
    children: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.func]).isRequired
  };
  IteratorFieldRaw.defaultProps = {
    skip: 0
  };
  exports.default = (0, _formField2.default)()(IteratorFieldRaw);
});