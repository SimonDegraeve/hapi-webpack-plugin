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

  // Handle webpack middlware
  var webpackMiddlewareHandler =  (request, reply) => {
    const {req, res} = request.raw;

    // Handle webpackDevMiddleware
    webpackDevMiddleware(req, res, error => {
      if (error) {
        return reply(error);
      }
      // Handle webpackHotMiddleware
      webpackHotMiddleware(req, res, error => {
        if (error) {
          return reply(error);
        }
        reply.continue();
      });
    });
  };

  // catch all route handler (which respects vhost passed into plugin)
  server.route({ method: '*', path: '/{p*}', handler: webpackMiddlewareHandler });

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
  multiple: true,
  version,

};


/**
 * Export plugin
 */
export default register;

