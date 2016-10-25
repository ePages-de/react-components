(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './BaseField', './CheckboxField', './InputField', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./BaseField'), require('./CheckboxField'), require('./InputField'), require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.BaseField, global.CheckboxField, global.InputField, global.react);
    global.SelectableInput = mod.exports;
  }
})(this, function (exports, _BaseField, _CheckboxField, _InputField, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _BaseField2 = _interopRequireDefault(_BaseField);

  var _CheckboxField2 = _interopRequireDefault(_CheckboxField);

  var _InputField2 = _interopRequireDefault(_InputField);

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

  var SelectableInput = function (_React$Component) {
    _inherits(SelectableInput, _React$Component);

    function SelectableInput() {
      _classCallCheck(this, SelectableInput);

      return _possibleConstructorReturn(this, (SelectableInput.__proto__ || Object.getPrototypeOf(SelectableInput)).apply(this, arguments));
    }

    _createClass(SelectableInput, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            name = _props.name,
            type = _props.type,
            title = _props.title,
            label = _props.label,
            placeholder = _props.placeholder,
            other = _objectWithoutProperties(_props, ['name', 'type', 'title', 'label', 'placeholder']);

        var checkboxName = name + 'Selected';

        return _react2.default.createElement(
          'div',
          other,
          _react2.default.createElement(
            'label',
            {
              title: title
            },
            _react2.default.createElement(_CheckboxField2.default, { name: checkboxName }),
            label
          ),
          _react2.default.createElement(_InputField2.default, {
            name: name,
            type: type,
            placeholder: placeholder,
            ref: function ref(node) {
              _this2.input = node;
            },
            disabled: !this.context.formValueScope.getValue(checkboxName) })
        );
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        this.input.focus();
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

    return SelectableInput;
  }(_react2.default.Component);

  SelectableInput.contextTypes = _extends({}, _BaseField2.default.contextTypes);
  SelectableInput.propTypes = _extends({}, _BaseField2.default.propTypes, {
    type: _react.PropTypes.string,
    title: _react.PropTypes.string,
    label: _react.PropTypes.string,
    placeholder: _react.PropTypes.string
  });
  SelectableInput.defaultProps = _extends({}, _BaseField2.default.defaultProps, {
    type: 'text'
  });
  exports.default = SelectableInput;
});