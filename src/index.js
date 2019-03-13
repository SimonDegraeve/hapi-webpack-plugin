/**
 * Import dependencies
 */
import '@babel/polyfill';
import Pack from '../package.json';
import Path from 'path';
import Webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

function register(server, options) {

  // Define variables
  let config = {};
  let compiler;

  // Require config from path
  if (typeof options === 'string') {
    const configPath = Path.resolve(process.cwd(), options);
    config = require(configPath);
    compiler = new Webpack(config);
  }
  else {
    config = options;
    compiler = config.compiler;
  }

  // Create middlewares
  const webpackDevMiddleware = WebpackDevMiddleware(compiler, config.assets);
  const webpackHotMiddleware = WebpackHotMiddleware(compiler, config.hot);

  // Handle webpackDevMiddleware
  server.ext({
    type: 'onRequest',
    method: async (request, h) => {
      const { req, res } = request.raw;
      try {
        let setupWebpackDevMiddleware = new Promise((resolve, reject) => {
          webpackDevMiddleware(req, res, error => {
            if(error) reject(error);
            resolve();
          });
        });

        await setupWebpackDevMiddleware;
        return h.continue;
      }
      catch (err) {
        throw err;
      }
    }
  });

  // Handle webpackHotMiddleware
  server.ext({
    type: 'onRequest',
    method: async (request, h) => {
      const { req, res } = request.raw;
      try {
        let setupWebpackHotMiddleware = new Promise((resolve, reject) => {
          webpackHotMiddleware(req, res, error => {
            if(error) reject(error);
            resolve();
          });
        });

        await setupWebpackHotMiddleware;
        return h.continue;
      }
      catch (err) {
        throw err;
      }
    }
  });

  // Expose compiler
  server.expose({ compiler });
}

exports.plugin = {
  pkg: Pack,
  once: true,
  register
};
