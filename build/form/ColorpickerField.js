(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'color', './formField', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('color'), require('./formField'), require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.color, global.formField, global.react);
    global.ColorpickerField = mod.exports;
  }
})(this, function (exports, _color, _formField, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ColorpickerFieldRaw = undefined;

  var _color2 = _interopRequireDefault(_color);

  var _formField2 = _interopRequireDefault(_formField);

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

  var Coordinator = function (_PureComponent) {
    _inherits(Coordinator, _PureComponent);

    function Coordinator() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Coordinator);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Coordinator.__proto__ || Object.getPrototypeOf(Coordinator)).call.apply(_ref, [this].concat(args))), _this), _this.handleCoordChange = function (_ref2) {
        var clientX = _ref2.clientX,
            clientY = _ref2.clientY;
        var _this$props = _this.props,
            onChange = _this$props.onChange,
            width = _this$props.width,
            height = _this$props.height;

        var _this$node$getBoundin = _this.node.getBoundingClientRect(),
            top = _this$node$getBoundin.top,
            left = _this$node$getBoundin.left;

        // cap [0, 1]
        var rx = Math.max(0, Math.min((clientX - left) / width, 1));
        var ry = Math.max(0, Math.min((clientY - top) / height, 1));

        // `x` and `y` values relative to the node's `width` and `height` {[0,1] [0,1]}
        onChange([rx, ry]);
      }, _this.handleMouseDown = function (e) {
        _this.handleCoordChange(e);

        window.addEventListener('mousemove', _this.handleCoordChange);
        window.addEventListener('mouseup', _this.handleMouseUp);
      }, _this.handleMouseUp = function () {
        _this.unbindEventListeners();
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Coordinator, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.unbindEventListeners();
      }
    }, {
      key: 'unbindEventListeners',
      value: function unbindEventListeners() {
        window.removeEventListener('mousemove', this.handleCoordChange);
        window.removeEventListener('mouseup', this.handleMouseUp);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            coords = _props.coords,
            children = _props.children,
            width = _props.width,
            height = _props.height,
            style = _props.style,
            className = _props.className;

        var _coords = _slicedToArray(coords, 2),
            rx = _coords[0],
            ry = _coords[1];

        var x = rx * width;
        var y = ry * height;

        return _react2.default.createElement('div', {
          className: className,
          style: _extends({}, style || {}, { width: width, height: height }),
          ref: function ref(node) {
            _this2.node = node;
          },
          onMouseDown: this.handleMouseDown,
          onTouchMove: this.handleCoordChange,
          onTouchStart: this.handleCoordChange,
          children: children({ x: x, y: y, rx: rx, ry: ry, width: width, height: height })
        });
      }
    }]);

    return Coordinator;
  }(_react.PureComponent);

  Coordinator.propTypes = {
    coords: _react.PropTypes.array.isRequired,
    width: _react.PropTypes.number.isRequired,
    height: _react.PropTypes.number.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    children: _react.PropTypes.func.isRequired,
    style: _react.PropTypes.object,
    className: _react.PropTypes.string
  };

  var ColorpickerFieldRaw = exports.ColorpickerFieldRaw = function (_Component) {
    _inherits(ColorpickerFieldRaw, _Component);

    function ColorpickerFieldRaw() {
      var _ref3;

      var _temp2, _this3, _ret2;

      _classCallCheck(this, ColorpickerFieldRaw);

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref3 = ColorpickerFieldRaw.__proto__ || Object.getPrototypeOf(ColorpickerFieldRaw)).call.apply(_ref3, [this].concat(args))), _this3), _this3.state = {
        intermediateHexInput: null
      }, _this3.changeColor = function (color) {
        _this3.setState({ intermediateHexInput: color.hex() });

        _this3.props.onChange(color.hsl().string());
      }, _this3.handleSvChange = function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            x = _ref5[0],
            y = _ref5[1];

        _this3.changeColor(_this3.color.saturationv(x * 100).value(100 - y * 100));
      }, _this3.handleHueChange = function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            _x = _ref7[0],
            y = _ref7[1];

        _this3.changeColor(_this3.color.hue(y * 360));
      }, _temp2), _possibleConstructorReturn(_this3, _ret2);
    }

    _createClass(ColorpickerFieldRaw, [{
      key: 'render',
      value: function render() {
        var _this4 = this;

        var _props2 = this.props,
            className = _props2.className,
            _props2$dimensions = _props2.dimensions,
            width = _props2$dimensions.width,
            height = _props2$dimensions.height,
            hueWidth = _props2$dimensions.hueWidth,
            spacing = _props2$dimensions.spacing;
        var intermediateHexInput = this.state.intermediateHexInput;

        var _color$object = this.color.object(),
            h = _color$object.h,
            s = _color$object.s,
            v = _color$object.v;

        var styles = typeof className === 'string' ? {
          base: className,
          baseSaturationValue: className + '-saturation-value-canvas',
          baseHue: className + '-hue',
          baseHexInput: className + '-hex-input',
          saturation: className + '-saturation',
          value: className + '-value',
          marker: 'marker'
        } : this.props.className;

        var hueColor = this.color.saturationv(100).value(100).hex();
        var gradient = function gradient(direction, color) {
          return 'linear-gradient(' + direction + ', transparent 0%, ' + color + ' 100%)';
        };

        var hexColorString = intermediateHexInput === null ? this.color.hex() : intermediateHexInput;

        return _react2.default.createElement(
          'div',
          {
            className: styles.base },
          _react2.default.createElement(
            Coordinator,
            {
              onChange: this.handleSvChange,
              className: styles.baseSaturationValue,
              width: width - (hueWidth + spacing),
              height: height,
              coords: [s / 100, v / 100] },
            function (_ref8) {
              var x = _ref8.x,
                  y = _ref8.y,
                  height = _ref8.height;
              return [_react2.default.createElement('div', {
                key: 's',
                className: styles.saturation,
                style: { background: gradient('to right', hueColor) } }), _react2.default.createElement('div', {
                key: 'v',
                className: styles.value,
                style: { background: gradient('to bottom', '#000') } }), _react2.default.createElement('div', {
                key: 'marker',
                className: styles.marker,
                style: { left: Math.round(x), top: Math.round(height - y) } })];
            }
          ),
          _react2.default.createElement(
            Coordinator,
            {
              onChange: this.handleHueChange,
              className: styles.baseHue,
              coords: [0, h / 360],
              width: hueWidth,
              height: height,
              style: { background: 'linear-gradient(to bottom,\n              #ff0000 0%,\n              #ffff00 20%,\n              #00ff00 35%,\n              #00ffff 50%,\n              #0000ff 65%,\n              #ff00ff 80%,\n              #ff0000 100%)'
              } },
            function (_ref9) {
              var y = _ref9.y;
              return _react2.default.createElement('div', { className: styles.marker, style: { top: Math.round(y) } });
            }
          ),
          _react2.default.createElement('input', {
            className: styles.baseHexInput,
            type: 'text',
            value: hexColorString,
            onChange: function onChange(e) {
              var value = e.target.value;


              _this4.setState({ intermediateHexInput: value });

              try {
                _this4.props.onChange((0, _color2.default)(value).hsl().string());
              } catch (e) {}
            } })
        );
      }
    }, {
      key: 'color',
      get: function get() {
        return (0, _color2.default)(this.props.value).hsv();
      }

      // eslint-disable-next-line no-unused-vars

    }]);

    return ColorpickerFieldRaw;
  }(_react.Component);

  ColorpickerFieldRaw.propTypes = {
    value: _react.PropTypes.string.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    className: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.shape({
      base: _react.PropTypes.string.isRequired,
      baseSaturationValue: _react.PropTypes.string.isRequired,
      baseHue: _react.PropTypes.string.isRequired,
      saturation: _react.PropTypes.string.isRequired,
      value: _react.PropTypes.string.isRequired,
      marker: _react.PropTypes.string.isRequired,
      baseHexInput: _react.PropTypes.string.isRequired
    })]).isRequired,
    dimensions: _react.PropTypes.shape({
      width: _react.PropTypes.number,
      height: _react.PropTypes.number,
      hueWidth: _react.PropTypes.number,
      spacing: _react.PropTypes.number
    }),
    name: _react.PropTypes.string,
    scopedName: _react.PropTypes.string
  };
  ColorpickerFieldRaw.defaultProps = {
    dimensions: {
      width: 300,
      height: 300,
      hueWidth: 20,
      spacing: 5
    }
  };
  exports.default = (0, _formField2.default)()(ColorpickerFieldRaw);
});