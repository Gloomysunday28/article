// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"decorate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var util = {
  proxy: function proxy(e, fn) {
    if (e.button === 0) {
      fn && fn(e);
    } else alert('请使用鼠标左键');
  }
};
var _default = util;
exports.default = _default;
},{}],"Sketchpad.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _decorate = _interopRequireDefault(require("./decorate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sketchpad =
/*#__PURE__*/
function () {
  function Sketchpad() {
    _classCallCheck(this, Sketchpad);

    this.canvas = document.getElementsByTagName('canvas')[0];
    this.offsetX = this.canvas.getBoundingClientRect().left;
    this.offsetY = this.canvas.getBoundingClientRect().top;
    this.ctx = this.canvas.getContext('2d'); // 拿起画笔

    this.width = this.canvas.getAttribute('width');
    this.height = this.canvas.getAttribute('height');
    this.excute = []; // 撤销操作

    this.recover = []; // 恢复操作

    this.initSket();
  }

  _createClass(Sketchpad, [{
    key: "initSket",
    value: function initSket() {
      var _this = this;

      this.canvas.onmousedown = function (e) {
        _decorate.default.proxy(e, function (e) {
          _this.ctx.beginPath();

          switch (_this.type) {
            case 'pencil':
              _this.lineConnect(e);

              break;

            case 'erea':
              _this.clearSket(e);

              break;

            default:
              break;
          }

          _this.canvas.onmouseup = function (e) {
            var _this$ctx;

            var img = new Image();
            img.src = _this.canvas.toDataURL();

            _this.excute.push({
              params: [img, 0, 0, _this.width, _this.height]
            });

            (_this$ctx = _this.ctx).drawImage.apply(_this$ctx, [img, 0, 0, _this.width, _this.height]);
          };

          window.onmouseup = function (e) {
            _this.canvas.onmousemove = null;

            _this.ctx.closePath();
          };
        });
      };
    }
  }]);

  return Sketchpad;
}();

exports.default = Sketchpad;
},{"./decorate":"decorate.js"}],"Pencil.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Sketchpad2 = _interopRequireDefault(require("./Sketchpad"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Pencil =
/*#__PURE__*/
function (_Sketchpad) {
  _inherits(Pencil, _Sketchpad);

  function Pencil() {
    var _this;

    _classCallCheck(this, Pencil);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Pencil).call(this));
    _this.type = 'pencil';

    _get(_getPrototypeOf(Pencil.prototype), "initSket", _assertThisInitialized(_this)).call(_assertThisInitialized(_this));

    return _this;
  }

  _createClass(Pencil, [{
    key: "changeColor",
    value: function changeColor(color) {
      this.color = color;
    }
  }, {
    key: "lineConnect",
    value: function lineConnect(e) {
      var _this2 = this;

      // this.ctx.save()
      this.ctx.moveTo(e.clientX - this.offsetX, e.clientY - this.offsetY);

      this.canvas.onmousemove = function (e) {
        _this2.ctx.lineTo(e.clientX - _this2.offsetX, e.clientY - _this2.offsetY);

        _this2.ctx.lineWidth = 3;
        _this2.ctx.strokeStyle = _this2.color;

        _this2.ctx.stroke();
      };
    }
  }]);

  return Pencil;
}(_Sketchpad2.default);

var pencil = new Pencil();
var _default = pencil;
exports.default = _default;
},{"./Sketchpad":"Sketchpad.js"}],"Erea.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Sketchpad2 = _interopRequireDefault(require("./Sketchpad"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Erea =
/*#__PURE__*/
function (_Sketchpad) {
  _inherits(Erea, _Sketchpad);

  function Erea() {
    var _this;

    _classCallCheck(this, Erea);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Erea).call(this));
    _this.type = 'erea';

    _get(_getPrototypeOf(Erea.prototype), "initSket", _assertThisInitialized(_this)).call(_assertThisInitialized(_this));

    return _this;
  }

  _createClass(Erea, [{
    key: "clearSket",
    value: function clearSket(e) {
      var _this2 = this;

      this.ctx.strokeStyle = '#000'; // this.ctx.strokeRect(e.clientX - this.offsetX - 10, e.clientY - this.offsetY - 10, 20, 20)

      this.canvas.onmousemove = function (e) {
        var x = e.clientX - _this2.offsetX - 10;
        var y = e.clientY - _this2.offsetY - 10; // this.ctx.save()
        // this.ctx.beginPath()
        // this.ctx.strokeRect(e.clientX - this.offsetX - 10, e.clientY - this.offsetY - 10, 20, 20)
        // this.ctx.arc(x,y,20,0,2*Math.PI);
        // this.ctx.clip()
        // this.ctx.clearRect(0,0,this.width,this.height);
        // this.ctx.restore();
        // this.ctx.restore()
        // this.ctx.strokeRect(x, y, 20, 20)

        _this2.ctx.clearRect(x, y, 20, 20); // this.ctx.save()

      };
    }
  }]);

  return Erea;
}(_Sketchpad2.default);

var erea = new Erea();
var _default = erea;
exports.default = _default;
},{"./Sketchpad":"Sketchpad.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _Pencil = _interopRequireDefault(require("./Pencil"));

var _Erea = _interopRequireDefault(require("./Erea"));

var _decorate = _interopRequireDefault(require("./decorate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// import Animation from './Animate'
var tools = document.getElementsByTagName('ul')[0];
var erea = document.getElementsByClassName('c-erea')[1];
var back = document.getElementsByClassName('c-return')[0];
var recover = document.getElementsByClassName('c-recover')[0];

_Pencil.default.initSket(); // Animation.initCircle()
// 画笔


tools.onclick = function (e) {
  var _this = this;

  _decorate.default.proxy(e, function (e) {
    _Pencil.default.initSket();

    Array.from(_this.children, function (el) {
      el.classList.remove('c-tool-active');
    });
    e.target.classList.add('c-tool-active');
    var color = e.target.style.background;

    _Pencil.default.changeColor(color);
  });
}; // 橡皮擦


erea.onclick = function () {
  _decorate.default.proxy(e, function (e) {
    _Erea.default.initSket();
  });
}; // 撤销


back.onclick = function () {
  _Pencil.default.ctx.clearRect(0, 0, _Pencil.default.width, _Pencil.default.height);

  if (_Pencil.default.excute.length) {
    _Pencil.default.recover.push(_Pencil.default.excute.pop());

    if (_Pencil.default.excute.length) {
      var _Pencil$ctx;

      (_Pencil$ctx = _Pencil.default.ctx).drawImage.apply(_Pencil$ctx, _toConsumableArray(_Pencil.default.excute[_Pencil.default.excute.length - 1].params));
    }
  }
}; // 恢复


recover.onclick = function () {
  var cover = _Pencil.default.recover.pop();

  if (cover) {
    var _Pencil$ctx2;

    _Pencil.default.excute.push(cover);

    _Pencil.default.ctx.clearRect(0, 0, _Pencil.default.width, _Pencil.default.height);

    (_Pencil$ctx2 = _Pencil.default.ctx).drawImage.apply(_Pencil$ctx2, _toConsumableArray(cover.params));
  }
};
},{"./Pencil":"Pencil.js","./Erea":"Erea.js","./decorate":"decorate.js"}],"C:/Program Files/nodejs/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60812" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Program Files/nodejs/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/画板.e31bb0bc.js.map