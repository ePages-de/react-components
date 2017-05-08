(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './formField', './InputField', 'prop-types', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./formField'), require('./InputField'), require('prop-types'), require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.formField, global.InputField, global.propTypes, global.react);
    global.SelectableInputField = mod.exports;
  }
})(this, function (exports, _formField, _InputField, _propTypes, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _formField2 = _interopRequireDefault(_formField);

  var _InputField2 = _interopRequireDefault(_InputField);

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

  var SelectableInputFieldRaw = function (_React$Component) {
    _inherits(SelectableInputFieldRaw, _React$Component);

    function SelectableInputFieldRaw() {
      _classCallCheck(this, SelectableInputFieldRaw);

      return _possibleConstructorReturn(this, (SelectableInputFieldRaw.__proto__ || Object.getPrototypeOf(SelectableInputFieldRaw)).apply(this, arguments));
    }

    _createClass(SelectableInputFieldRaw, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var formValueScope = this.context.formValueScope;

        var _props = this.props,
            value = _props.value,
            onChange = _props.onChange,
            name = _props.name,
            scopedName = _props.scopedName,
            type = _props.type,
            title = _props.title,
            label = _props.label,
            placeholder = _props.placeholder,
            other = _objectWithoutProperties(_props, ['value', 'onChange', 'name', 'scopedName', 'type', 'title', 'label', 'placeholder']);

        var checkboxName = name + 'Selected';
        var scopedCheckboxName = scopedName + 'Selected';

        return _react2.default.createElement(
          'div',
          other,
          _react2.default.createElement(
            'label',
            { title: title },
            _react2.default.createElement('input', {
              name: scopedCheckboxName,
              type: 'checkbox',
              checked: formValueScope.getValue(checkboxName),
              onChange: function onChange(event) {
                formValueScope.setValue(checkboxName, event.target.checked);
                if (event.target.checked) {
                  // give time for the input field to be enabled
                  window.setTimeout(function () {
                    return _this2.inputField.focus();
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

    return SelectableInputFieldRaw;
  }(_react2.default.Component);

  SelectableInputFieldRaw.contextTypes = {
    formValueScope: _propTypes2.default.any.isRequired
  };
  SelectableInputFieldRaw.propTypes = {
    value: _propTypes2.default.any.isRequired,
    onChange: _propTypes2.default.func.isRequired,
    name: _propTypes2.default.string,
    scopedName: _propTypes2.default.string,
    type: _propTypes2.default.string,
    title: _propTypes2.default.string,
    label: _propTypes2.default.string,
    placeholder: _propTypes2.default.string
  };
  SelectableInputFieldRaw.defaultProps = {
    type: 'text'
  };
  exports.default = (0, _formField2.default)()(SelectableInputFieldRaw);
});