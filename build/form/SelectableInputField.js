(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './formField', './InputField', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./formField'), require('./InputField'), require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.formField, global.InputField, global.react);
    global.SelectableInputField = mod.exports;
  }
})(this, function (exports, _formField, _InputField, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _formField2 = _interopRequireDefault(_formField);

  var _InputField2 = _interopRequireDefault(_InputField);

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

  var SelectableInputField = function (_React$Component) {
    _inherits(SelectableInputField, _React$Component);

    function SelectableInputField() {
      _classCallCheck(this, SelectableInputField);

      return _possibleConstructorReturn(this, (SelectableInputField.__proto__ || Object.getPrototypeOf(SelectableInputField)).apply(this, arguments));
    }

    _createClass(SelectableInputField, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var formValueScope = this.context.formValueScope;

        var _props = this.props,
            value = _props.value,
            onChange = _props.onChange,
            name = _props.name,
            fullName = _props.fullName,
            type = _props.type,
            title = _props.title,
            label = _props.label,
            placeholder = _props.placeholder,
            other = _objectWithoutProperties(_props, ['value', 'onChange', 'name', 'fullName', 'type', 'title', 'label', 'placeholder']);

        // eslint-disable-line no-unused-vars
        var checkboxName = name + 'Selected';
        var checkboxFullName = fullName + 'Selected';

        return _react2.default.createElement(
          'div',
          other,
          _react2.default.createElement(
            'label',
            { title: title },
            _react2.default.createElement('input', {
              name: checkboxFullName,
              type: 'checkbox',
              checked: formValueScope.getValue(checkboxName),
              onChange: function onChange(event) {
                formValueScope.setValue(checkboxName, event.target.checked);
                if (event.target.checked) {
                  // give time for the input field to be enabled
                  window.setTimeout(function () {
                    return _this2.inputField && _this2.inputField.focus();
                  }, 0);
                }
              } }),
            label
          ),
          _react2.default.createElement(_InputField2.default, {
            name: name,
            type: type,
            placeholder: placeholder,
            disabled: !this.context.formValueScope.getValue(checkboxName),
            ref: function ref(component) {
              _this2.inputField = component;
            } })
        );
      }
    }]);

    return SelectableInputField;
  }(_react2.default.Component);

  SelectableInputField.contextTypes = {
    formValueScope: _react.PropTypes.any.isRequired
  };
  SelectableInputField.propTypes = {
    value: _react.PropTypes.any.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    name: _react.PropTypes.string,
    fullName: _react.PropTypes.string,
    type: _react.PropTypes.string,
    title: _react.PropTypes.string,
    label: _react.PropTypes.string,
    placeholder: _react.PropTypes.string
  };
  SelectableInputField.defaultProps = {
    type: 'text'
  };
  exports.default = (0, _formField2.default)()(SelectableInputField);
});