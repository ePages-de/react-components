(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './withClassName', './form/BaseField', './form/FormValueScope', './form/Form', './form/CheckboxField', './form/DropDownField', './form/ErrorMessage', './form/InputField', './form/IteratorField', './form/RadioButtonField', './form/RangeField', './form/SortField', './form/TextareaField', './form/ChoiceField'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./withClassName'), require('./form/BaseField'), require('./form/FormValueScope'), require('./form/Form'), require('./form/CheckboxField'), require('./form/DropDownField'), require('./form/ErrorMessage'), require('./form/InputField'), require('./form/IteratorField'), require('./form/RadioButtonField'), require('./form/RangeField'), require('./form/SortField'), require('./form/TextareaField'), require('./form/ChoiceField'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.withClassName, global.BaseField, global.FormValueScope, global.Form, global.CheckboxField, global.DropDownField, global.ErrorMessage, global.InputField, global.IteratorField, global.RadioButtonField, global.RangeField, global.SortField, global.TextareaField, global.ChoiceField);
    global.index = mod.exports;
  }
})(this, function (exports, _withClassName, _BaseField, _FormValueScope, _Form, _CheckboxField, _DropDownField, _ErrorMessage, _InputField, _IteratorField, _RadioButtonField, _RangeField, _SortField, _TextareaField, _ChoiceField) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'withClassName', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_withClassName).default;
    }
  });
  Object.defineProperty(exports, 'BaseField', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_BaseField).default;
    }
  });
  Object.defineProperty(exports, 'FormValueScope', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_FormValueScope).default;
    }
  });
  Object.defineProperty(exports, 'Form', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_Form).default;
    }
  });
  Object.defineProperty(exports, 'CheckboxField', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_CheckboxField).default;
    }
  });
  Object.defineProperty(exports, 'DropDownField', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_DropDownField).default;
    }
  });
  Object.defineProperty(exports, 'ErrorMessage', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_ErrorMessage).default;
    }
  });
  Object.defineProperty(exports, 'InputField', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_InputField).default;
    }
  });
  Object.defineProperty(exports, 'IteratorField', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_IteratorField).default;
    }
  });
  Object.defineProperty(exports, 'RadioButtonField', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_RadioButtonField).default;
    }
  });
  Object.defineProperty(exports, 'RangeField', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_RangeField).default;
    }
  });
  Object.defineProperty(exports, 'SortField', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_SortField).default;
    }
  });
  Object.defineProperty(exports, 'TextareaField', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_TextareaField).default;
    }
  });
  Object.defineProperty(exports, 'ChoiceField', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_ChoiceField).default;
    }
  });

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});