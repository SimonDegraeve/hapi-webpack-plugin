"use strict";

require("@babel/polyfill");

var _package = _interopRequireDefault(require("../package.json"));

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevMiddleware = _interopRequireDefault(require("webpack-dev-middleware"));

var _webpackHotMiddleware = _interopRequireDefault(require("webpack-hot-middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function register(server, options) {
  // Define variables
  var config = {};
  var compiler; // Require config from path

  if (typeof options === 'string') {
    var configPath = _path.default.resolve(process.cwd(), options);

    config = require(configPath);
    compiler = new _webpack.default(config);
  } else {
    config = options;
    compiler = config.compiler;
  } // Create middlewares


  var webpackDevMiddleware = (0, _webpackDevMiddleware.default)(compiler, config.assets);
  var webpackHotMiddleware = (0, _webpackHotMiddleware.default)(compiler, config.hot); // Handle webpackDevMiddleware

  server.ext({
    type: 'onRequest',
    method: function () {
      var _method = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(request, h) {
        var _request$raw, req, res, setupWebpackDevMiddleware;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _request$raw = request.raw, req = _request$raw.req, res = _request$raw.res;
                _context.prev = 1;
                setupWebpackDevMiddleware = new Promise(function (resolve, reject) {
                  webpackDevMiddleware(req, res, function (error) {
                    if (error) reject(error);
                    resolve();
                  });
                });
                _context.next = 5;
                return setupWebpackDevMiddleware;

              case 5:
                return _context.abrupt("return", h.continue);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                throw _context.t0;

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
      }));

      function method(_x, _x2) {
        return _method.apply(this, arguments);
      }

      return method;
    }()
  }); // Handle webpackHotMiddleware

  server.ext({
    type: 'onRequest',
    method: function () {
      var _method2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(request, h) {
        var _request$raw2, req, res, setupWebpackHotMiddleware;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _request$raw2 = request.raw, req = _request$raw2.req, res = _request$raw2.res;
                _context2.prev = 1;
                setupWebpackHotMiddleware = new Promise(function (resolve, reject) {
                  webpackHotMiddleware(req, res, function (error) {
                    if (error) reject(error);
                    resolve();
                  });
                });
                _context2.next = 5;
                return setupWebpackHotMiddleware;

              case 5:
                return _context2.abrupt("return", h.continue);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                throw _context2.t0;

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 8]]);
      }));

      function method(_x3, _x4) {
        return _method2.apply(this, arguments);
      }

      return method;
    }()
  }); // Expose compiler

  server.expose({
    compiler: compiler
  });
}

exports.plugin = {
  pkg: _package.default,
  once: true,
  register: register
};