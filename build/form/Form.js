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
})(this, function (exports, _FormValueScope2, _immutable, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _FormValueScope3 = _interopRequireDefault(_FormValueScope2);

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

  var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

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

  var Form = function (_FormValueScope) {
    _inherits(Form, _FormValueScope);

    function Form(props) {
      _classCallCheck(this, Form);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Form).call(this));

      _this.state = {
        value: props.prepare(props.value),
        errors: new _immutable2.default.Map()
      };

      _this.onSubmit = _this.onSubmit.bind(_this);
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
      key: 'setValue',
      value: function setValue(name, value) {
        var newValue1 = _get(Object.getPrototypeOf(Form.prototype), 'setValue', this).call(this, name, value);
        var newValue2 = this.props.onChange(newValue1);

        // validate while typing - second parameter (isOnSubmit) set to false
        var errors = this.props.validate(newValue2 || newValue1, false);
        this.setState({
          errors: containsError(errors) ? errors : new _immutable2.default.Map(),
          value: newValue2 || newValue1
        });
      }
    }, {
      key: 'submit',
      value: function submit() {
        this.onSubmit({ preventDefault: function preventDefault() {} });
      }
    }, {
      key: 'onSubmit',
      value: function onSubmit(event) {
        event.preventDefault();

        var errors = this.props.validate(this.state.value);

        if (containsError(errors)) {
          this.setState({ errors: errors });
        } else {
          this.setState({ errors: new _immutable2.default.Map() });
          this.props.onSubmit(this.props.normalize(this.state.value));
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props;
        var name = _props.name;
        var value = _props.value;
        var onSubmit = _props.onSubmit;
        var onChange = _props.onChange;
        var prepare = _props.prepare;
        var validate = _props.validate;
        var normalize = _props.normalize;
        var children = _props.children;

        var other = _objectWithoutProperties(_props, ['name', 'value', 'onSubmit', 'onChange', 'prepare', 'validate', 'normalize', 'children']);

        // eslint-disable-line no-unused-vars
        return _react2.default.createElement(
          'form',
          _extends({}, other, { name: name, onSubmit: this.onSubmit, autoComplete: 'off' }),
          typeof children === 'function' ? children(this.state.value) : children
        );
      }
    }]);

    return Form;
  }(_FormValueScope3.default);

  Form.propTypes = _extends({}, _FormValueScope3.default.propTypes, {
    value: _react.PropTypes.any,
    onSubmit: _react.PropTypes.func,
    onChange: _react.PropTypes.func,
    prepare: _react.PropTypes.func,
    validate: _react.PropTypes.func,
    normalize: _react.PropTypes.func,
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
    }
  };
  exports.default = Form;
});