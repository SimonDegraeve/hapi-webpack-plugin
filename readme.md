# hapi-webpack-plugin

[![Maintenance Status][status-image]][status-url] [![Dependency Status][deps-image]][deps-url] [![NPM version][npm-image]][npm-url]


[Webpack](http://webpack.github.io) middleware for [Hapi](https://github.com/hapijs/hapi). Supports HMR.

## Installation

```js
npm install hapi-webpack-plugin
```

## Usage

See [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) and [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) for all available options.

You can use the plugin in two ways.


**1) With object as options**
```js
/**
 * file: index.js
 */

/**
 * Import dependencies
 */
import {Server} from 'hapi';
import Webpack from 'webpack';
import WebpackPlugin from 'hapi-webpack-plugin';

/**
 * Create server
 */
const server = new Server();
server.connection({port: 3000});

/**
 * Define constants
 */
const compiler = new Webpack({
  // webpack configuration
  entry: 'app.js'
});

const assets = {
  // webpack-dev-middleware options
  // See https://github.com/webpack/webpack-dev-middleware
}

const hot = {
  // webpack-hot-middleware options
  // See https://github.com/glenjamin/webpack-hot-middleware
}

/**
 * Register plugin and start server
 */
server.register({
  register: WebpackPlugin,
  options: {compiler, assets, hot}
},
error => {
  if (error) {
    return console.error(error);
  }
  server.start(() => console.log('Server running at:', server.info.uri));
});
```

**2) With path as options**
```js
/**
 * file: index.js
 */

/**
 * Import dependencies
 */
import {Server} from 'hapi';
import WebpackPlugin from 'hapi-webpack-plugin';


/**
 * Create server
 */
const server = new Server();
server.connection({port: 3000});

/**
 * Register plugin and start server
 */
server.register({
  register: WebpackPlugin,
  options: './webpack.config.js'
},
error => {
  if (error) {
    return console.error(error);
  }
  server.start(() => console.log('Server running at:', server.info.uri));
});
```
```js
/**
 * file: webpack.config.js
 */

/**
 * Export webpack configuration
 */
export default {
  entry: 'app.js',

  // webpack-dev-middleware options
  // See https://github.com/webpack/webpack-dev-middleware
  assets: {},

  // webpack-hot-middleware options
  // See https://github.com/glenjamin/webpack-hot-middleware
  hot: {}
};
```

## Licence

The MIT License (MIT)

Copyright (c) 2015 Simon Degraeve

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[npm-url]: https://npmjs.org/package/hapi-webpack-plugin
[npm-image]: http://img.shields.io/npm/v/hapi-webpack-plugin.svg?style=flat-square

[deps-url]: https://david-dm.org/SimonDegraeve/hapi-webpack-plugin
[deps-image]: https://img.shields.io/david/SimonDegraeve/hapi-webpack-plugin.svg?style=flat-square

[status-url]: https://github.com/SimonDegraeve/hapi-webpack-plugin/pulse
[status-image]: http://img.shields.io/badge/status-maintained-brightgreen.svg?style=flat-square
