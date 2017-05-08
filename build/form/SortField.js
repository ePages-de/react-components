(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './formField', 'prop-types', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./formField'), require('prop-types'), require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.formField, global.propTypes, global.react);
    global.SortField = mod.exports;
  }
})(this, function (exports, _formField, _propTypes, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SortFieldRaw = undefined;

  var _formField2 = _interopRequireDefault(_formField);

  var _propTypes2 = _interopRequireDefault(_propTypes);

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

  var SortFieldRaw = exports.SortFieldRaw = function (_React$Component) {
    _inherits(SortFieldRaw, _React$Component);

    function SortFieldRaw() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, SortFieldRaw);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SortFieldRaw.__proto__ || Object.getPrototypeOf(SortFieldRaw)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        dragIndex: null,
        dropIndex: null
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SortFieldRaw, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            value = _props.value,
            onChange = _props.onChange,
            name = _props.name,
            scopedName = _props.scopedName,
            children = _props.children,
            onReorder = _props.onReorder,
            validate = _props.validate,
            disabled = _props.disabled,
            orientation = _props.orientation,
            itemSize = _props.itemSize,
            crossAxisItemSize = _props.crossAxisItemSize,
            itemCount = _props.itemCount,
            itemSpacing = _props.itemSpacing,
            other = _objectWithoutProperties(_props, ['value', 'onChange', 'name', 'scopedName', 'children', 'onReorder', 'validate', 'disabled', 'orientation', 'itemSize', 'crossAxisItemSize', 'itemCount', 'itemSpacing']);

        var _state = this.state,
            dragIndex = _state.dragIndex,
            dropIndex = _state.dropIndex;

        var dimension = orientation === 'horizontal' ? { width: itemSize * itemCount + itemSpacing * (itemCount - 1), height: crossAxisItemSize } : { height: itemSize * itemCount + itemSpacing * (itemCount - 1), width: crossAxisItemSize };

        return _react2.default.createElement(
          'div',
          _extends({}, other, { style: _extends({ position: 'relative' }, dimension) }),
          value.map(function (item, index) {
            var itemWithDndInfo = item.set('__isSource', dragIndex === index).set('__isTarget', dropIndex === index).set('__isDragging', dragIndex !== null).set('__isDisabled', disabled(item, index, value));
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
                    _this2.setState({ dragIndex: index });
                  } else {
                    event.preventDefault();
                  }
                },
                onDragEnd: function onDragEnd() {
                  _this2.setState({ dragIndex: null });
                },
                onDragEnter: function onDragEnter() {
                  if (dragIndex !== null && dragIndex !== index && validate(swap(value, dragIndex, index))) {
                    _this2.setState({ dropIndex: index });
                  }
                },
                onDragOver: function onDragOver(event) {
                  if (!itemWithDndInfo.get('__isDisabled') && dragIndex !== null && dragIndex !== index && validate(swap(value, dragIndex, index))) {
                    event.preventDefault();
                  }
                },
                onDragLeave: function onDragLeave() {
                  if (dropIndex === index) {
                    _this2.setState({ dropIndex: null });
                  }
                },
                onDrop: function onDrop(event) {
                  event.preventDefault();
                  _this2.setState({ dragIndex: null, dropIndex: null });
                  _this2.props.onReorder(dragIndex, index);
                  onChange(swap(value, dragIndex, index));
                } },
              children(itemWithDndInfo, index, value)
            );
          })
        );
      }
    }]);

    return SortFieldRaw;
  }(_react2.default.Component);

  SortFieldRaw.propTypes = {
    value: _propTypes2.default.any.isRequired,
    onChange: _propTypes2.default.func.isRequired,
    name: _propTypes2.default.string,
    scopedName: _propTypes2.default.string,
    children: _propTypes2.default.func.isRequired,
    onReorder: _propTypes2.default.func,
    validate: _propTypes2.default.func,
    disabled: _propTypes2.default.func,
    orientation: _propTypes2.default.oneOf(['horizontal', 'vertical']).isRequired,
    itemSize: _propTypes2.default.number.isRequired,
    crossAxisItemSize: _propTypes2.default.number.isRequired,
    itemSpacing: _propTypes2.default.number,
    itemCount: _propTypes2.default.number.isRequired
  };
  SortFieldRaw.defaultProps = {
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
  exports.default = (0, _formField2.default)()(SortFieldRaw);
});