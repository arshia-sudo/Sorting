"use strict";

exports.__esModule = true;

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var helpers = {};
exports.default = helpers;


helpers.typeof = (0, _babelTemplate2.default)("\n  (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\")\n    ? function (obj) { return typeof obj; }\n    : function (obj) {\n        return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype\n          ? \"symbol\"\n          : typeof obj;\n      };\n");

helpers.jsx = (0, _babelTemplate2.default)("\n  (function () {\n    var REACT_ELEMENT_TYPE = (typeof Symbol === \"function\" && Symbol.for && Symbol.for(\"react.element\")) || 0xeac7;\n\n    return function createRawReactElement (type, props, key, children) {\n      var defaultProps = type && type.defaultProps;\n      var childrenLength = arguments.length - 3;\n\n      if (!props && childrenLength !== 0) {\n        // If we're going to assign props.children, we create a new object now\n        // to avoid mutating defaultProps.\n        props = {};\n      }\n      if (props && defaultProps) {\n        for (var propName in defaultProps) {\n          if (props[propName] === void 0) {\n            props[propName] = defaultProps[propName];\n          }\n        }\n      } else if (!props) {\n        props = defaultProps || {};\n      }\n\n      if (childrenLength === 1) {\n        props.children = children;\n      } else if (childrenLength > 1) {\n        var childArray = Array(childrenLength);\n        for (var i = 0; i < childrenLength; i++) {\n          childArray[i] = arguments[i + 3];\n        }\n        props.children = childArray;\n      }\n\n      return {\n        $$typeof: REACT_ELEMENT_TYPE,\n        type: type,\n        key: key === undefined ? null : '' + key,\n        ref: null,\n        props: props,\n        _owner: null,\n      };\n    };\n\n  })()\n");

helpers.asyncIterator = (0, _babelTemplate2.default)("\n  (function (iterable) {\n    if (typeof Symbol === \"function\") {\n      if (Symbol.asyncIterator) {\n        var method = iterable[Symbol.asyncIterator];\n        if (method != null) return method.call(iterable);\n      }\n      if (Symbol.iterator) {\n        return iterable[Symbol.iterator]();\n      }\n    }\n    throw new TypeError(\"Object is not async iterable\");\n  })\n");

helpers.asyncGenerator = (0, _babelTemplate2.default)("\n  (function () {\n    function AwaitValue(value) {\n      this.value = value;\n    }\n\n    function AsyncGenerator(gen) {\n      var front, back;\n\n      function send(key, arg) {\n        return new Promise(function (resolve, reject) {\n          var request = {\n            key: key,\n            arg: arg,\n            resolve: resolve,\n            reject: reject,\n            next: null\n          };\n\n          if (back) {\n            back = back.next = request;\n          } else {\n            front = back = request;\n            resume(key, arg);\n          }\n        });\n      }\n\n      function resume(key, arg) {\n        try {\n          var result = gen[key](arg)\n          var value = result.value;\n          if (value instanceof AwaitValue) {\n            Promise.resolve(value.value).then(\n              function (arg) { resume(\"next\", arg); },\n              function (arg) { resume(\"throw\", arg); });\n          } else {\n            settle(result.done ? \"return\" : \"normal\", result.value);\n          }\n        } catch (err) {\n          settle(\"throw\", err);\n        }\n      }\n\n      function settle(type, value) {\n        switch (type) {\n          case \"return\":\n            front.resolve({ value: value, done: true });\n            break;\n          case \"throw\":\n            front.reject(value);\n            break;\n          default:\n            front.resolve({ value: value, done: false });\n            break;\n        }\n\n        front = front.next;\n        if (front) {\n          resume(front.key, front.arg);\n        } else {\n          back = null;\n        }\n      }\n\n      this._invoke = send;\n\n      // Hide \"return\" method if generator return is not supported\n      if (typeof gen.return !== \"function\") {\n        this.return = undefined;\n      }\n    }\n\n    if (typeof Symbol === \"function\" && Symbol.asyncIterator) {\n      AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; };\n    }\n\n    AsyncGenerator.prototype.next = function (arg) { return this._invoke(\"next\", arg); };\n    AsyncGenerator.prototype.throw = function (arg) { return this._invoke(\"throw\", arg); };\n    AsyncGenerator.prototype.return = function (arg) { return this._invoke(\"return\", arg); };\n\n    return {\n      wrap: function (fn) {\n        return function () {\n          return new AsyncGenerator(fn.apply(this, arguments));\n        };\n      },\n      await: function (value) {\n        return new AwaitValue(value);\n      }\n    };\n\n  })()\n");

helpers.asyncGeneratorDelegate = (0, _babelTemplate2.default)("\n  (function (inner, awaitWrap) {\n    var iter = {}, waiting = false;\n\n    function pump(key, value) {\n      waiting = true;\n      value = new Promise(function (resolve) { resolve(inner[key](value)); });\n      return { done: false, value: awaitWrap(value) };\n    };\n\n    if (typeof Symbol === \"function\" && Symbol.iterator) {\n      iter[Symbol.iterator] = function () { return this; };\n    }\n\n    iter.next = function (value) {\n      if (waiting) {\n        waiting = false;\n        return value;\n      }\n      return pump(\"next\", value);\n    };\n\n    if (typeof inner.throw === \"function\") {\n      iter.throw = function (value) {\n        if (waiting) {\n          waiting = false;\n          throw value;\n        }\n        return pump(\"throw\", value);\n      };\n    }\n\n    if (typeof inner.return === \"function\") {\n      iter.return = function (value) {\n        return pump(\"return\", value);\n      };\n    }\n\n    return iter;\n  })\n");

helpers.asyncToGenerator = (0, _babelTemplate2.default)("\n  (function (fn) {\n    return function () {\n      var gen = fn.apply(this, arguments);\n      return new Promise(function (resolve, reject) {\n        function step(key, arg) {\n          try {\n            var info = gen[key](arg);\n            var value = info.value;\n          } catch (error) {\n            reject(error);\n            return;\n          }\n\n          if (info.done) {\n            resolve(value);\n          } else {\n            return Promise.resolve(value).then(function (value) {\n              step(\"next\", value);\n            }, function (err) {\n              step(\"throw\", err);\n            });\n          }\n        }\n\n        return step(\"next\");\n      });\n    };\n  })\n");

helpers.classCallCheck = (0, _babelTemplate2.default)("\n  (function (instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n      throw new TypeError(\"Cannot call a class as a function\");\n    }\n  });\n");

helpers.createClass = (0, _babelTemplate2.default)("\n  (function() {\n    function defineProperties(target, props) {\n      for (var i = 0; i < props.length; i ++) {\n        var descriptor = props[i];\n        descriptor.enumerable = descriptor.enumerable || false;\n        descriptor.configurable = true;\n        if (\"value\" in descriptor) descriptor.writable = true;\n        Object.defineProperty(target, descriptor.key, descriptor);\n      }\n    }\n\n    return function (Constructor, protoProps, staticProps) {\n      if (protoProps) defineProperties(Constructor.prototype, protoProps);\n      if (staticProps) defineProperties(Constructor, staticProps);\n      return Constructor;\n    };\n  })()\n");

helpers.defineEnumerableProperties = (0, _babelTemplate2.default)("\n  (function (obj, descs) {\n    for (var key in descs) {\n      var desc = descs[key];\n      desc.configurable = desc.enumerable = true;\n      if (\"value\" in desc) desc.writable = true;\n      Object.defineProperty(obj, key, desc);\n    }\n    return obj;\n  })\n");

helpers.defaults = (0, _babelTemplate2.default)("\n  (function (obj, defaults) {\n    var keys = Object.getOwnPropertyNames(defaults);\n    for (var i = 0; i < keys.length; i++) {\n      var key = keys[i];\n      var value = Object.getOwnPropertyDescriptor(defaults, key);\n      if (value && value.configurable && obj[key] === undefined) {\n        Object.defineProperty(obj, key, value);\n      }\n    }\n    return obj;\n  })\n");

helpers.defineProperty = (0, _babelTemplate2.default)("\n  (function (obj, key, value) {\n    // Shortcircuit the slow defineProperty path when possible.\n    // We are trying to avoid issues where setters defined on the\n    // prototype cause side effects under the fast path of simple\n    // assignment. By checking for existence of the property with\n    // the in operator, we can optimize most of this overhead away.\n    if (key in obj) {\n      Object.defineProperty(obj, key, {\n        value: value,\n        enumerable: true,\n        configurable: true,\n        writable: true\n      });\n    } else {\n      obj[key] = value;\n    }\n    return obj;\n  });\n");

helpers.extends = (0, _babelTemplate2.default)("\n  Object.assign || (function (target) {\n    for (var i = 1; i < arguments.length; i++) {\n      var source = arguments[i];\n      for (var key in source) {\n        if (Object.prototype.hasOwnProperty.call(source, key)) {\n          target[key] = source[key];\n        }\n      }\n    }\n    return target;\n  })\n");

helpers.get = (0, _babelTemplate2.default)("\n  (function get(object, property, receiver) {\n    if (object === null) object = Function.prototype;\n\n    var desc = Object.getOwnPropertyDescriptor(object, property);\n\n    if (desc === undefined) {\n      var parent = Object.getPrototypeOf(object);\n\n      if (parent === null) {\n        return undefined;\n      } else {\n        return get(parent, property, receiver);\n      }\n    } else if (\"value\" in desc) {\n      return desc.value;\n    } else {\n      var getter = desc.get;\n\n      if (getter === undefined) {\n        return undefined;\n      }\n\n      return getter.call(receiver);\n    }\n  });\n");

helpers.inherits = (0, _babelTemplate2.default)("\n  (function (subClass, superClass) {\n    if (typeof superClass !== \"function\" && superClass !== null) {\n      throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass);\n    }\n    subClass.prototype = Object.create(superClass && superClass.prototype, {\n      constructor: {\n        value: subClass,\n        enumerable: false,\n        writable: true,\n        configurable: true\n      }\n    });\n    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n  })\n");

helpers.instanceof = (0, _babelTemplate2.default)("\n  (function (left, right) {\n    if (right != null && typeof Symbol !== \"undefined\" && right[Symbol.hasInstance]) {\n      return right[Symbol.hasInstance](left);\n    } else {\n      return left instanceof right;\n    }\n  });\n");

helpers.interopRequireDefault = (0, _babelTemplate2.default)("\n  (function (obj) {\n    return obj && obj.__esModule ? obj : { default: obj };\n  })\n");

helpers.interopRequireWildcard = (0, _babelTemplate2.default)("\n  (function (obj) {\n    if (obj && obj.__esModule) {\n      return obj;\n    } else {\n      var newObj = {};\n      if (obj != null) {\n        for (var key in obj) {\n          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];\n        }\n      }\n      newObj.default = obj;\n      return newObj;\n    }\n  })\n");

helpers.newArrowCheck = (0, _babelTemplate2.default)("\n  (function (innerThis, boundThis) {\n    if (innerThis !== boundThis) {\n      throw new TypeError(\"Cannot instantiate an arrow function\");\n    }\n  });\n");

helpers.objectDestructuringEmpty = (0, _babelTemplate2.default)("\n  (function (obj) {\n    if (obj == null) throw new TypeError(\"Cannot destructure undefined\");\n  });\n");

helpers.objectWithoutProperties = (0, _babelTemplate2.default)("\n  (function (obj, keys) {\n    var target = {};\n    for (var i in obj) {\n      if (keys.indexOf(i) >= 0) continue;\n      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;\n      target[i] = obj[i];\n    }\n    return target;\n  })\n");

helpers.possibleConstructorReturn = (0, _babelTemplate2.default)("\n  (function (self, call) {\n    if (!self) {\n      throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n    }\n    return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self;\n  });\n");

helpers.selfGlobal = (0, _babelTemplate2.default)("\n  typeof global === \"undefined\" ? self : global\n");

helpers.set = (0, _babelTemplate2.default)("\n  (function set(object, property, value, receiver) {\n    var desc = Object.getOwnPropertyDescriptor(object, property);\n\n    if (desc === undefined) {\n      var parent = Object.getPrototypeOf(object);\n\n      if (parent !== null) {\n        set(parent, property, value, receiver);\n      }\n    } else if (\"value\" in desc && desc.writable) {\n      desc.value = value;\n    } else {\n      var setter = desc.set;\n\n      if (setter !== undefined) {\n        setter.call(receiver, value);\n      }\n    }\n\n    return value;\n  });\n");

helpers.slicedToArray = (0, _babelTemplate2.default)("\n  (function () {\n    // Broken out into a separate function to avoid deoptimizations due to the try/catch for the\n    // array iterator case.\n    function sliceIterator(arr, i) {\n      // this is an expanded form of `for...of` that properly supports abrupt completions of\n      // iterators etc. variable names have been minimised to reduce the size of this massive\n      // helper. sometimes spec compliancy is annoying :(\n      //\n      // _n = _iteratorNormalCompletion\n      // _d = _didIteratorError\n      // _e = _iteratorError\n      // _i = _iterator\n      // _s = _step\n\n      var _arr = [];\n      var _n = true;\n      var _d = false;\n      var _e = undefined;\n      try {\n        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {\n          _arr.push(_s.value);\n          if (i && _arr.length === i) break;\n        }\n      } catch (err) {\n        _d = true;\n        _e = err;\n      } finally {\n        try {\n          if (!_n && _i[\"return\"]) _i[\"return\"]();\n        } finally {\n          if (_d) throw _e;\n        }\n      }\n      return _arr;\n    }\n\n    return function (arr, i) {\n      if (Array.isArray(arr)) {\n        return arr;\n      } else if (Symbol.iterator in Object(arr)) {\n        return sliceIterator(arr, i);\n      } else {\n        throw new TypeError(\"Invalid attempt to destructure non-iterable instance\");\n      }\n    };\n  })();\n");

helpers.slicedToArrayLoose = (0, _babelTemplate2.default)("\n  (function (arr, i) {\n    if (Array.isArray(arr)) {\n      return arr;\n    } else if (Symbol.iterator in Object(arr)) {\n      var _arr = [];\n      for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {\n        _arr.push(_step.value);\n        if (i && _arr.length === i) break;\n      }\n      return _arr;\n    } else {\n      throw new TypeError(\"Invalid attempt to destructure non-iterable instance\");\n    }\n  });\n");

helpers.taggedTemplateLiteral = (0, _babelTemplate2.default)("\n  (function (strings, raw) {\n    return Object.freeze(Object.defineProperties(strings, {\n        raw: { value: Object.freeze(raw) }\n    }));\n  });\n");

helpers.taggedTemplateLiteralLoose = (0, _babelTemplate2.default)("\n  (function (strings, raw) {\n    strings.raw = raw;\n    return strings;\n  });\n");

helpers.temporalRef = (0, _babelTemplate2.default)("\n  (function (val, name, undef) {\n    if (val === undef) {\n      throw new ReferenceError(name + \" is not defined - temporal dead zone\");\n    } else {\n      return val;\n    }\n  })\n");

helpers.temporalUndefined = (0, _babelTemplate2.default)("\n  ({})\n");

helpers.toArray = (0, _babelTemplate2.default)("\n  (function (arr) {\n    return Array.isArray(arr) ? arr : Array.from(arr);\n  });\n");

helpers.toConsumableArray = (0, _babelTemplate2.default)("\n  (function (arr) {\n    if (Array.isArray(arr)) {\n      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];\n      return arr2;\n    } else {\n      return Array.from(arr);\n    }\n  });\n");
module.exports = exports["default"];