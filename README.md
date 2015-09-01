# get-api

[![Build status][travis-image]][travis-url] [![NPM version][npm-image]][npm-url] [![js-xo-style][codestyle-image]][codestyle-url]

> Get API information from a module

## Installation

Install `get-api` using [npm](https://www.npmjs.com/):

```bash
npm install --save get-api
```

## Usage

### Module usage

```javascript
var getApi = require('get-api');

var mod = require('path-to-a-module');

getApi(mod);
/**
 * {
 *   methods: [...],
 *   properties: [...]
 * }
 */
```

See [the tests](test/test.js) for examples.

## API

### `getApi(mod [, opts])`

| Name | Type | Description |
|------|------|-------------|
| mod | `Mixed` | The module to get API for |
| opts | `Object` | Options |

Returns: `Object`, see [the tests](test/test.js) for examples.

#### options.main

Type: `String`  
Default: `"__MAIN_EXPORT__"`

If provided it's used as a name fallback in case there is a main exported function without a name, i.e:

```javascript
module.exports = function () {};
```

## License

MIT

[npm-url]: https://npmjs.org/package/get-api
[npm-image]: https://badge.fury.io/js/get-api.svg
[travis-url]: https://travis-ci.org/joakimbeng/get-api
[travis-image]: https://travis-ci.org/joakimbeng/get-api.svg?branch=master
[codestyle-url]: https://github.com/sindresorhus/xo
[codestyle-image]: https://img.shields.io/badge/code%20style-xo-brightgreen.svg?style=flat
