/**
 * Import dependencies
 */
import {version} from '../package.json';
import Path from 'path';
import Webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';


/**
 * Define plugin
 */
function register(server, options, next) {
  // Define variables
  let config = {};
  let compiler;

  // Require config from path
  if (typeof options === 'string') {
    try {
      config = require(Path.resolve(process.cwd(), options));
      compiler = new Webpack(config);
    }
    catch (error) {
      throw new Error(`Configuration not found at ${options}`);
    }
  }
  else {
    config = options;
    compiler = config.compiler;
  }

  // Create middlewares
  const webpackDevMiddleware = WebpackDevMiddleware(compiler, config.assets);
  const webpackHotMiddleware = WebpackHotMiddleware(compiler, config.hot);

  // Handle webpackDevMiddleware
  server.ext('onRequest', (request, reply) => {
    const {req, res} = request.raw;
    webpackDevMiddleware(req, res, error => {
      if (error) {
        return reply(error);
      }
      reply.continue();
    });
  });

  // Handle webpackHotMiddleware
  server.ext('onRequest', (request, reply) => {
    const {req, res} = request.raw;
    webpackHotMiddleware(req, res, error => {
      if (error) {
        return reply(error);
      }
      reply.continue();
    });
  });

  // Expose compiler
  server.expose({compiler});

  // Done
  return next();
}


/**
 * Define plugin attributes
 */
register.attributes = {
  name: 'webpack',
  version
};


/**
 * Export plugin
 */
export default register;

