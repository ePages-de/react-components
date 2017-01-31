(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './withClassName', './form/BaseField', './form/Form', './form/formField', './form/FormValueScope', './form/CheckboxField', './form/DropDownField', './form/ErrorMessage', './form/InputField', './form/IteratorField', './form/RadioButtonField', './form/RangeField', './form/SortField', './form/TextareaField', './form/ChoiceField', './form/SelectableInputField', './form/SmartInputField', './form/ColorpickerField'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./withClassName'), require('./form/BaseField'), require('./form/Form'), require('./form/formField'), require('./form/FormValueScope'), require('./form/CheckboxField'), require('./form/DropDownField'), require('./form/ErrorMessage'), require('./form/InputField'), require('./form/IteratorField'), require('./form/RadioButtonField'), require('./form/RangeField'), require('./form/SortField'), require('./form/TextareaField'), require('./form/ChoiceField'), require('./form/SelectableInputField'), require('./form/SmartInputField'), require('./form/ColorpickerField'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.withClassName, global.BaseField, global.Form, global.formField, global.FormValueScope, global.CheckboxField, global.DropDownField, global.ErrorMessage, global.InputField, global.IteratorField, global.RadioButtonField, global.RangeField, global.SortField, global.TextareaField, global.ChoiceField, global.SelectableInputField, global.SmartInputField, global.ColorpickerField);
    global.index = mod.exports;
  }
})(this, function (exports, _withClassName, _BaseField, _Form, _formField, _FormValueScope, _CheckboxField, _DropDownField, _ErrorMessage, _InputField, _IteratorField, _RadioButtonField, _RangeField, _SortField, _TextareaField, _ChoiceField, _SelectableInputField, _SmartInputField, _ColorpickerField) {
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
  Object.defineProperty(exports, 'Form', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_Form).default;
    }
  });
  Object.defineProperty(exports, 'formField', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_formField).default;
    }
  });
  Object.defineProperty(exports, 'FormValueScope', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_FormValueScope).default;
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
  Object.defineProperty(exports, 'SelectableInputField', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_SelectableInputField).default;
    }
  });
  Object.defineProperty(exports, 'SmartInputField', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_SmartInputField).default;
    }
  });
  Object.defineProperty(exports, 'ColorpickerField', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_ColorpickerField).default;
    }
  });

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});