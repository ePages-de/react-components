(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './FormValueScope', 'immutable', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./FormValueScope'), require('immutable'), require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.FormValueScope, global.immutable, global.react);
    global.Form = mod.exports;
  }
})(this, function (exports, _FormValueScope, _immutable, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _FormValueScope2 = _interopRequireDefault(_FormValueScope);

  var _immutable2 = _interopRequireDefault(_immutable);

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
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

  function containsError(errors) {
    if (!errors) {
      return false;
    } else if (_immutable2.default.Iterable.isIterable(errors)) {
      return errors.reduce(function (res, item) {
        if (res) {
          return true;
        } else if (!item) {
          return false;
        } else if (typeof item === 'string') {
          return true;
        } else {
          return containsError(item);
        }
      }, false);
    } else {
      throw new Error();
    }
  }

  function parseName(name) {
    // only split string names by dots, but keep non string names (for example number names
    // like in IteratorField) as they are
    return typeof name === 'string' ? name.split(/\./g) : [name];
  }

  // kind of inherits from FormValueScope
  // make sure to mirror changes in FormValueScope here

  var Form = function (_React$Component) {
    _inherits(Form, _React$Component);

    _createClass(Form, [{
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

    function Form(props) {
      _classCallCheck(this, Form);

      var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this));

      _this.getValue = function (name) {
        var outerScope = _this.context.formValueScope;
        if (outerScope) {
          var ownName = _this.props.name;
          var value = outerScope.getValue(ownName);

          if (name !== undefined && name !== null) {
            return value ? value.getIn(parseName(name)) : undefined;
          } else {
            return value;
          }
        } else {
          if (name !== undefined && name !== null) {
            return _this.state.value.getIn(parseName(name));
          } else {
            return _this.state.value;
          }
        }
      };

      _this.setValue = function (name, value) {
        var newValue1 = name !== undefined && name !== null ? _this.state.value.setIn(parseName(name), value) : value;
        var newValue2 = _this.props.onChange(newValue1);

        var errors = _this.props.validate(newValue2 || newValue1, _this.state.triedToSubmit);
        _this.setState({
          errors: containsError(errors) ? errors : new _immutable2.default.Map(),
          value: newValue2 || newValue1
        });
      };

      _this.getError = function (name) {
        var outerScope = _this.context.formValueScope;
        if (outerScope) {
          var ownName = _this.props.name;
          var error = outerScope.getError(ownName);
          return error ? error.get(name) : undefined;
        } else {
          return _this.state.errors.get(name);
        }
      };

      _this.submit = function () {
        return _this.onSubmit({ preventDefault: function preventDefault() {} });
      };

      _this.onSubmit = function (event) {
        event.preventDefault();

        if (!_this.props.disabled) {
          var errors = _this.props.validate(_this.state.value, true);

          if (containsError(errors)) {
            _this.setState({ errors: errors, triedToSubmit: true });
          } else {
            _this.setState({ errors: new _immutable2.default.Map() });
            _this.props.onSubmit(_this.props.normalize(_this.state.value));
          }
        }
      };

      _this.state = {
        value: props.prepare(props.value),
        errors: new _immutable2.default.Map(),
        triedToSubmit: false
      };
      return _this;
    }

    _createClass(Form, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
          this.setState({ value: nextProps.prepare(nextProps.value) });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            name = _props.name,
            value = _props.value,
            onSubmit = _props.onSubmit,
            onChange = _props.onChange,
            prepare = _props.prepare,
            validate = _props.validate,
            normalize = _props.normalize,
            disabled = _props.disabled,
            children = _props.children,
            other = _objectWithoutProperties(_props, ['name', 'value', 'onSubmit', 'onChange', 'prepare', 'validate', 'normalize', 'disabled', 'children']);

        // eslint-disable-line no-unused-vars
        return _react2.default.createElement(
          'form',
          _extends({ autoComplete: 'off' }, other, { name: name, onSubmit: this.onSubmit }),
          typeof children === 'function' ? children(this.state.value) : children
        );
      }
    }, {
      key: 'getChildContext',
      value: function getChildContext() {
        return {
          formValueScope: this
        };
      }
    }]);

    return Form;
  }(_react2.default.Component);

  Form.propTypes = _extends({}, _FormValueScope2.default.propTypes, {
    value: _react.PropTypes.any,
    onSubmit: _react.PropTypes.func,
    onChange: _react.PropTypes.func,
    prepare: _react.PropTypes.func,
    validate: _react.PropTypes.func,
    normalize: _react.PropTypes.func,
    disabled: _react.PropTypes.bool,
    children: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.func]).isRequired
  });
  Form.defaultProps = {
    value: new _immutable2.default.Map(),
    onSubmit: function onSubmit() {
      return null;
    },
    onChange: function onChange() {
      return null;
    },
    prepare: function prepare(value) {
      return value;
    },
    validate: function validate() {
      return null;
    },
    normalize: function normalize(value) {
      return value;
    },
    disabled: false
  };
  Form.childContextTypes = {
    formValueScope: _react.PropTypes.object
  };
  exports.default = Form;
});