(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './BaseField', 'classnames', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./BaseField'), require('classnames'), require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.BaseField, global.classnames, global.react);
    global.SmartInputField = mod.exports;
  }
})(this, function (exports, _BaseField, _classnames3, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SmartInput = undefined;

  var _BaseField2 = _interopRequireDefault(_BaseField);

  var _classnames4 = _interopRequireDefault(_classnames3);

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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

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

  function stopPropagation(event) {
    event.stopPropagation();
  }

  /**
   * Renders a smart input that allows to choose zero or more values (for example a tag list).
   * Values can be deduced from the entered text. Additionally this input allows autocompletion by
   * a user defined suggestion function.
   */

  var SmartInput = exports.SmartInput = function (_React$Component) {
    _inherits(SmartInput, _React$Component);

    function SmartInput() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, SmartInput);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SmartInput.__proto__ || Object.getPrototypeOf(SmartInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        text: '',
        focused: false,
        loading: false,
        suggestions: null,
        activeSuggestionIndex: null
      }, _this.focus = function () {
        if (_this.input) {
          _this.input.focus();
        }
      }, _this.handleChange = function (event) {
        var text = event.target.value;

        // update current entered text in state and update suggestion list
        _this.setState({ text: text });
        _this.getSuggestions(text, _this.props.value);
      }, _this.handleKeyDown = function (event) {
        var _this$props = _this.props,
            value = _this$props.value,
            onChange = _this$props.onChange,
            convertTextToValue = _this$props.convertTextToValue,
            convertSuggestionToValue = _this$props.convertSuggestionToValue,
            strict = _this$props.strict;
        var _this$state = _this.state,
            text = _this$state.text,
            suggestions = _this$state.suggestions,
            activeSuggestionIndex = _this$state.activeSuggestionIndex;


        switch (event.keyCode) {
          // enter
          case 13:
            {
              // a suggestion must be selected or some text must have been entered
              if (typeof activeSuggestionIndex === 'number' || event.target.value) {
                event.preventDefault();

                var nextValue = typeof activeSuggestionIndex === 'number'
                // use value from suggestion
                ? convertSuggestionToValue(suggestions[activeSuggestionIndex])
                // use value from entered text (if non-strict)
                : !strict ? convertTextToValue(event.target.value.trim()) : null;

                if (nextValue) {
                  // update value and reset entered text and suggestion list
                  var newValue = value.concat([nextValue]);
                  onChange(newValue);
                  _this.resetText();
                  _this.getSuggestions('', newValue);
                }
              }
              break;
            }

          // escape
          case 27:
            {
              event.preventDefault();
              _this.resetText();
              break;
            }

          // backspace
          case 8:
            {
              // if text is empty, then drop the last value from the list
              if (text.length === 0 && value.count() > 0) {
                var _newValue = value.slice(0, value.count() - 1);
                onChange(_newValue);
                _this.resetText();
                _this.getSuggestions('', _newValue);
              }
              break;
            }

          // up
          case 38:
            {
              if (suggestions) {
                event.preventDefault();
                _this.selectPreviousSuggestion();
              }
              break;
            }

          // down
          case 40:
            {
              if (suggestions) {
                event.preventDefault();
                _this.selectNextSuggestion();
              }
              break;
            }
        }
      }, _this.handleFocus = function () {
        var value = _this.props.value;
        var text = _this.state.text;


        _this.setState({ focused: true });
        _this.getSuggestions(text, value);
      }, _this.handleBlur = function () {
        _this.setState({ focused: false });
        _this.resetText();
      }, _this.handleMouseDownContainer = function (event) {
        event.preventDefault();

        // input is visually the whole container, even though the actual HTML input is not spanning the whole container,
        // so we trigger focusing the input here
        _this.refs.input.focus();
      }, _this.handleClickValueRemove = function (index) {
        var _this$props2 = _this.props,
            value = _this$props2.value,
            onChange = _this$props2.onChange;


        return function (event) {
          event.preventDefault();
          var newValue = value.slice(0, index).concat(value.slice(index + 1));
          onChange(newValue);
        };
      }, _this.handleClickSuggestion = function (suggestion, index) {
        var self = _this;
        var _this$props3 = _this.props,
            value = _this$props3.value,
            onChange = _this$props3.onChange,
            suggestionDisabled = _this$props3.suggestionDisabled,
            convertSuggestionToValue = _this$props3.convertSuggestionToValue;


        return function () {
          if (!suggestionDisabled(suggestion, index)) {
            var newValue = value.concat([convertSuggestionToValue(suggestion)]);
            onChange(newValue);
            self.resetText();
            self.getSuggestions('', newValue);
          }
        };
      }, _this.resetText = function () {
        _this.setState({
          text: '',
          suggestions: null,
          activeSuggestionIndex: null
        });
      }, _this.getSuggestions = function (text, value) {
        var _this$props4 = _this.props,
            getSuggestions = _this$props4.getSuggestions,
            suggestionDisabled = _this$props4.suggestionDisabled,
            strict = _this$props4.strict;


        if (getSuggestions) {
          _this.setState({ loading: true });
          getSuggestions(text, value).then(function (suggestions) {
            _this.setState({ suggestions: suggestions });

            // if non-strict, then of all non-disabled suggestions pick the first and select it
            var selection = strict && suggestions && suggestions.map(function (suggestion, index) {
              return [suggestion, index];
            }).filter(function (_ref2) {
              var _ref3 = _slicedToArray(_ref2, 2),
                  s = _ref3[0],
                  i = _ref3[1];

              return !suggestionDisabled(s, i);
            })[0];

            _this.selectSuggestion(selection ? selection[1] : null);
          }).catch(function () {
            _this.setState({ loading: false });
          });
        }
      }, _this.selectPreviousSuggestion = function () {
        var _this$props5 = _this.props,
            suggestionDisabled = _this$props5.suggestionDisabled,
            strict = _this$props5.strict;
        var _this$state2 = _this.state,
            suggestions = _this$state2.suggestions,
            activeSuggestionIndex = _this$state2.activeSuggestionIndex;


        if (typeof activeSuggestionIndex === 'number') {
          // of all non-disabled suggestion pick the next after the current
          var selection = suggestions && suggestions.map(function (suggestion, index) {
            return [suggestion, index];
          }).filter(function (_ref4) {
            var _ref5 = _slicedToArray(_ref4, 2),
                s = _ref5[0],
                i = _ref5[1];

            return i < activeSuggestionIndex && !suggestionDisabled(s, i);
          }).reverse()[0];

          if (selection) {
            _this.selectSuggestion(selection[1]);
          } else {
            if (!strict) {
              _this.selectSuggestion(null);
            }
          }
        }
      }, _this.selectNextSuggestion = function () {
        var suggestionDisabled = _this.props.suggestionDisabled;
        var _this$state3 = _this.state,
            suggestions = _this$state3.suggestions,
            activeSuggestionIndex = _this$state3.activeSuggestionIndex;


        if (typeof activeSuggestionIndex === 'number') {
          // of all non-disabled suggestion pick the next before the current
          var selection = suggestions && suggestions.map(function (suggestion, index) {
            return [suggestion, index];
          }).filter(function (_ref6) {
            var _ref7 = _slicedToArray(_ref6, 2),
                s = _ref7[0],
                i = _ref7[1];

            return i > activeSuggestionIndex && !suggestionDisabled(s, i);
          })[0];

          if (selection) {
            _this.selectSuggestion(selection[1]);
          }
        } else {
          var _selection = suggestions && suggestions.map(function (suggestion, index) {
            return [suggestion, index];
          }).filter(function (_ref8) {
            var _ref9 = _slicedToArray(_ref8, 2),
                s = _ref9[0],
                i = _ref9[1];

            return !suggestionDisabled(s, i);
          })[0];

          if (_selection) {
            _this.selectSuggestion(_selection[1]);
          }
        }
      }, _this.selectSuggestion = function (index) {
        _this.setState({ activeSuggestionIndex: index });

        var suggestionsNode = _this.refs.suggestions;
        var suggestionNode = _this.refs['suggestion-' + index];

        if (suggestionsNode && suggestionNode) {
          var r1 = suggestionsNode.getBoundingClientRect();
          var r2 = suggestionNode.getBoundingClientRect();

          // check if there is the need for scrolling down
          if (r1.bottom - 1 < r2.bottom) suggestionsNode.scrollTop += r2.bottom - r1.bottom + 1;

          // check if there is the need for scrolling up
          if (r1.top + 1 > r2.top) suggestionsNode.scrollTop += r2.top - r1.top - 1;
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SmartInput, [{
      key: 'render',
      value: function render() {
        var _classnames,
            _this2 = this;

        var _props = this.props,
            value = _props.value,
            suggestionDisabled = _props.suggestionDisabled,
            autoFocus = _props.autoFocus,
            renderValue = _props.renderValue,
            renderSuggestion = _props.renderSuggestion,
            className = _props.className;
        var _state = this.state,
            text = _state.text,
            focused = _state.focused,
            suggestions = _state.suggestions,
            activeSuggestionIndex = _state.activeSuggestionIndex;

        var suggestionsVisible = suggestions && suggestions.length > 0;

        var styles = typeof className === 'string' ? {
          base: className,
          baseFocused: className + '-focused',
          baseWithSuggestions: className + '-with-suggestions',
          input: className + '-input',
          inputValue: className + '-input-value',
          inputText: className + '-input-tet',
          suggestions: className + '-suggestions',
          suggestion: className + '-suggestion',
          suggestionActive: className + '-suggestion-active',
          suggestionDisabled: className + '-suggestion-disabled'
        } : this.props.className;

        return _react2.default.createElement(
          'div',
          { className: (0, _classnames4.default)(styles.base, (_classnames = {}, _defineProperty(_classnames, styles.baseFocused, focused), _defineProperty(_classnames, styles.baseWithSuggestions, suggestionsVisible), _classnames)), onMouseDown: this.handleMouseDownContainer },
          _react2.default.createElement(
            'div',
            { className: styles.input },
            value.map(function (value, index) {
              return _react2.default.createElement(
                'div',
                { key: index, onMouseDown: stopPropagation, className: styles.inputValue },
                renderValue(value, _this2.handleClickValueRemove(index))
              );
            }),
            _react2.default.createElement('input', {
              type: 'text',
              value: text,
              autoFocus: autoFocus,
              onChange: this.handleChange,
              onKeyDown: this.handleKeyDown,
              onFocus: this.handleFocus,
              onBlur: this.handleBlur,
              onMouseDown: stopPropagation,
              autoComplete: false,
              autoCorrect: false,
              autoCapitalize: false,
              spellCheck: false,
              className: styles.inputText,
              ref: 'input' })
          ),
          suggestionsVisible && _react2.default.createElement(
            'div',
            { className: styles.suggestions, ref: 'suggestions' },
            suggestions.map(function (suggestion, index) {
              var _classnames2;

              return _react2.default.createElement(
                'div',
                {
                  key: index,
                  onClick: _this2.handleClickSuggestion(suggestion, index),
                  className: (0, _classnames4.default)(styles.suggestion, (_classnames2 = {}, _defineProperty(_classnames2, styles.suggestionActive, activeSuggestionIndex === index), _defineProperty(_classnames2, styles.suggestionDisabled, suggestionDisabled(suggestion, index)), _classnames2)),
                  ref: 'suggestion-' + index },
                renderSuggestion(suggestion)
              );
            })
          )
        );
      }
    }]);

    return SmartInput;
  }(_react2.default.Component);

  SmartInput.propTypes = {
    // current value
    value: _react.PropTypes.any.isRequired,
    // value change handler
    onChange: _react.PropTypes.func.isRequired,
    // function to generate suggestion list (must return a promise)
    getSuggestions: _react.PropTypes.func,
    // decision function, whether a given suggestion can be choosen
    suggestionDisabled: _react.PropTypes.func,
    // if non-strict, this function deduces the actual value to add from the entered text
    convertTextToValue: _react.PropTypes.func,
    // this function converts the suggestion to the actual value to add
    convertSuggestionToValue: _react.PropTypes.func,
    // whether one can enter anything or just stuff from the suggestion list
    strict: _react.PropTypes.bool,
    // autoFocus of the underlying HTML input
    autoFocus: _react.PropTypes.bool,
    // how to render a value
    renderValue: _react.PropTypes.func,
    // how to render a suggestion
    renderSuggestion: _react.PropTypes.func,
    className: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.shape({
      base: _react.PropTypes.string.isRequired,
      baseFocused: _react.PropTypes.string.isRequired,
      baseWithSuggestions: _react.PropTypes.string.isRequired,
      input: _react.PropTypes.string.isRequired,
      inputValue: _react.PropTypes.string.isRequired,
      inputText: _react.PropTypes.string.isRequired,
      suggestions: _react.PropTypes.string.isRequired,
      suggestion: _react.PropTypes.string.isRequired,
      suggestionActive: _react.PropTypes.string.isRequired,
      suggestionDisabled: _react.PropTypes.string.isRequired
    })]).isRequired
  };
  SmartInput.defaultProps = {
    suggestionDisabled: function suggestionDisabled(suggestion, index) {
      return false;
    },
    convertTextToValue: function convertTextToValue(text) {
      return text;
    },
    convertSuggestionToValue: function convertSuggestionToValue(suggestion) {
      return suggestion;
    },
    renderValue: function renderValue(value, handleRemove) {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { onClick: handleRemove },
          'X'
        ),
        value.toString()
      );
    },
    renderSuggestion: function renderSuggestion(suggestion) {
      return suggestion.toString();
    },
    strict: false,
    autoFocus: false
  };

  var SmartInputField = function (_React$Component2) {
    _inherits(SmartInputField, _React$Component2);

    function SmartInputField() {
      var _ref10;

      var _temp2, _this3, _ret2;

      _classCallCheck(this, SmartInputField);

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref10 = SmartInputField.__proto__ || Object.getPrototypeOf(SmartInputField)).call.apply(_ref10, [this].concat(args))), _this3), _this3.focus = function () {
        if (_this3.smartInput) {
          _this3.smartInput.focus();
        }
      }, _this3.handleChange = function (newValue) {
        _this3.value = newValue;
      }, _this3.smartInputRef = function (smartInput) {
        _this3.smartInput = smartInput;
      }, _temp2), _possibleConstructorReturn(_this3, _ret2);
    }

    _createClass(SmartInputField, [{
      key: 'render',
      value: function render() {
        var _props2 = this.props,
            name = _props2.name,
            other = _objectWithoutProperties(_props2, ['name']);

        // eslint-disable-line no-unused-vars
        return _react2.default.createElement(SmartInput, _extends({}, other, {
          value: this.value,
          onChange: this.handleChange,
          ref: this.smartInputRef }));
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

    return SmartInputField;
  }(_react2.default.Component);

  SmartInputField.contextTypes = _extends({}, _BaseField2.default.contextTypes);
  SmartInputField.propTypes = _extends({}, _BaseField2.default.propTypes);
  SmartInputField.defaultProps = _extends({}, _BaseField2.default.defaultProps);
  exports.default = SmartInputField;
});