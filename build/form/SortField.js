(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './formField', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./formField'), require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.formField, global.react);
    global.SortField = mod.exports;
  }
})(this, function (exports, _formField, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

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

  function swap(items, oldIndex, newIndex) {
    return items.set(oldIndex, items.get(newIndex)).set(newIndex, items.get(oldIndex));
  }

  var SortField = function (_React$Component) {
    _inherits(SortField, _React$Component);

    function SortField() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, SortField);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SortField.__proto__ || Object.getPrototypeOf(SortField)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        dragIndex: null,
        dropIndex: null
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SortField, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var self = this;

        var _props = this.props,
            value = _props.value,
            onChange = _props.onChange,
            name = _props.name,
            fullName = _props.fullName,
            children = _props.children,
            onReorder = _props.onReorder,
            validate = _props.validate,
            disabled = _props.disabled,
            orientation = _props.orientation,
            itemSize = _props.itemSize,
            crossAxisItemSize = _props.crossAxisItemSize,
            itemCount = _props.itemCount,
            itemSpacing = _props.itemSpacing,
            other = _objectWithoutProperties(_props, ['value', 'onChange', 'name', 'fullName', 'children', 'onReorder', 'validate', 'disabled', 'orientation', 'itemSize', 'crossAxisItemSize', 'itemCount', 'itemSpacing']);

        // eslint-disable-line no-unused-vars
        var dimension = orientation === 'horizontal' ? { width: itemSize * itemCount + itemSpacing * (itemCount - 1), height: crossAxisItemSize } : { height: itemSize * itemCount + itemSpacing * (itemCount - 1), width: crossAxisItemSize };

        return _react2.default.createElement(
          'div',
          _extends({}, other, { style: _extends({ position: 'relative' }, dimension) }),
          value.map(function (item, index) {
            var itemWithDndInfo = item.set('__isSource', _this2.state.dragIndex === index).set('__isTarget', _this2.state.dropIndex === index).set('__isDragging', _this2.state.dragIndex !== null).set('__isDisabled', disabled(item, index, value));
            var itemPosition = orientation === 'horizontal' ? { left: index * (itemSize + itemSpacing), top: 0 } : { top: index * (itemSize + itemSpacing), left: 0 };
            var itemDimension = orientation === 'horizontal' ? { width: itemSize, height: crossAxisItemSize } : { height: itemSize, width: crossAxisItemSize };

            return _react2.default.createElement(
              'div',
              {
                key: index,
                draggable: true,
                style: _extends({ position: 'absolute' }, itemPosition, itemDimension),
                onDragStart: function onDragStart(event) {
                  if (!itemWithDndInfo.get('__isDisabled')) {
                    if (event.dataTransfer) event.dataTransfer.setData('Url', '#');
                    self.setState({ dragIndex: index });
                  } else {
                    event.preventDefault();
                  }
                },
                onDragEnd: function onDragEnd() {
                  self.setState({ dragIndex: null });
                },
                onDragEnter: function onDragEnter() {
                  if (self.state.dragIndex !== null && self.state.dragIndex !== index && validate(swap(value, self.state.dragIndex, index))) {
                    self.setState({ dropIndex: index });
                  }
                },
                onDragOver: function onDragOver(event) {
                  if (!itemWithDndInfo.get('__isDisabled') && self.state.dragIndex !== null && self.state.dragIndex !== index && validate(swap(value, self.state.dragIndex, index))) {
                    event.preventDefault();
                  }
                },
                onDragLeave: function onDragLeave() {
                  if (self.state.dropIndex === index) {
                    self.setState({ dropIndex: null });
                  }
                },
                onDrop: function onDrop(event) {
                  event.preventDefault();
                  self.setState({ dragIndex: null, dropIndex: null });
                  self.props.onReorder(self.state.dragIndex, index);
                  onChange(swap(value, self.state.dragIndex, index));
                } },
              _this2.props.children(itemWithDndInfo, index, value)
            );
          })
        );
      }
    }]);

    return SortField;
  }(_react2.default.Component);

  SortField.propTypes = {
    value: _react.PropTypes.any.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    name: _react.PropTypes.string,
    fullName: _react.PropTypes.string,
    children: _react.PropTypes.func.isRequired,
    onReorder: _react.PropTypes.func,
    validate: _react.PropTypes.func,
    disabled: _react.PropTypes.func,
    orientation: _react.PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    itemSize: _react.PropTypes.number.isRequired,
    crossAxisItemSize: _react.PropTypes.number.isRequired,
    itemSpacing: _react.PropTypes.number,
    itemCount: _react.PropTypes.number.isRequired
  };
  SortField.defaultProps = {
    onReorder: function onReorder() {
      return null;
    },
    validate: function validate() {
      return true;
    },
    disabled: function disabled() {
      return false;
    },
    itemSpacing: 0
  };
  exports.default = (0, _formField2.default)()(SortField);
});