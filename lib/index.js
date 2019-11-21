"use strict";

require("@babel/polyfill");

var _package = _interopRequireDefault(require("../package.json"));

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevMiddleware = _interopRequireDefault(require("webpack-dev-middleware"));

var _webpackHotMiddleware = _interopRequireDefault(require("webpack-hot-middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Import dependencies
 */
function register(server, options) {
  // Define variables
  var config = {};
  var compiler; // Require config from path

  if (typeof options === 'string') {
    var configPath = _path["default"].resolve(process.cwd(), options);

    config = require(configPath);
    compiler = new _webpack["default"](config);
  } else {
    config = options;
    compiler = config.compiler;
  } // Create middlewares


  var webpackDevMiddleware = (0, _webpackDevMiddleware["default"])(compiler, config.assets);
  var webpackHotMiddleware = (0, _webpackHotMiddleware["default"])(compiler, config.hot); // Handle webpackDevMiddleware

  server.ext({
    type: 'onRequest',
    method: function method(request, h) {
      var _request$raw, req, res, setupWebpackDevMiddleware;

      return regeneratorRuntime.async(function method$(_context) {
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
              return regeneratorRuntime.awrap(setupWebpackDevMiddleware);

            case 5:
              return _context.abrupt("return", h["continue"]);

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              throw _context.t0;

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 8]]);
    }
  }); // Handle webpackHotMiddleware

  server.ext({
    type: 'onRequest',
    method: function method(request, h) {
      var _request$raw2, req, res, setupWebpackHotMiddleware;

      return regeneratorRuntime.async(function method$(_context2) {
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
              return regeneratorRuntime.awrap(setupWebpackHotMiddleware);

            case 5:
              return _context2.abrupt("return", h["continue"]);

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              throw _context2.t0;

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[1, 8]]);
    }
  }); // Expose compiler

  server.expose({
    compiler: compiler
  });
}

exports.plugin = {
  pkg: _package["default"],
  once: true,
  register: register
};