(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(31);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(32);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */
function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = __webpack_require__(23);
  Object.keys(env).forEach(function (key) {
    createDebug[key] = env[key];
  });
  /**
  * Active `debug` instances.
  */

  createDebug.instances = [];
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    var hash = 0;

    for (var i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    var prevTime;

    function debug() {
      // Disabled?
      if (!debug.enabled) {
        return;
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var self = debug; // Set `diff` timestamp

      var curr = Number(new Date());
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match;
        }

        index++;
        var formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          var val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      var logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);
    return debug;
  }

  function destroy() {
    var index = createDebug.instances.indexOf(this);

    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    }

    return false;
  }

  function extend(namespace, delimiter) {
    return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      var instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }
  /**
  * Disable debug output.
  *
  * @api public
  */


  function disable() {
    createDebug.enable('');
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */


  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    var i;
    var len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */


  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

module.exports = setup;



/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const os = __webpack_require__(25);
const hasFlag = __webpack_require__(26);

const env = process.env;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false')) {
	forceColor = false;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = true;
}
if ('FORCE_COLOR' in env) {
	forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === false) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor !== true) {
		return 0;
	}

	const min = forceColor ? 1 : 0;

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	if (env.TERM === 'dumb') {
		return min;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

module.exports = hasUnicode;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */
function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = __webpack_require__(61);
  Object.keys(env).forEach(function (key) {
    createDebug[key] = env[key];
  });
  /**
  * Active `debug` instances.
  */

  createDebug.instances = [];
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    var hash = 0;

    for (var i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    var prevTime;

    function debug() {
      // Disabled?
      if (!debug.enabled) {
        return;
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var self = debug; // Set `diff` timestamp

      var curr = Number(new Date());
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match;
        }

        index++;
        var formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          var val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      var logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);
    return debug;
  }

  function destroy() {
    var index = createDebug.instances.indexOf(this);

    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    }

    return false;
  }

  function extend(namespace, delimiter) {
    return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      var instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }
  /**
  * Disable debug output.
  *
  * @api public
  */


  function disable() {
    createDebug.enable('');
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */


  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    var i;
    var len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */


  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

module.exports = setup;



/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var githubapi = __webpack_require__(11),
    async = __webpack_require__(66),
    https = __webpack_require__(3);

exports.handler = function (event, context, callback) {
  var _JSON$parse = JSON.parse(event.body),
      cap = _JSON$parse.caption,
      url = _JSON$parse.url,
      image = _JSON$parse.image,
      key = _JSON$parse.key;

  var _process$env = process.env,
      user = _process$env.IG_GIT_USER,
      token = _process$env.IG_GIT_TOKEN,
      repo = _process$env.IG_GIT_REPO,
      IG_SECRET_KEY = _process$env.IG_SECRET_KEY;

  var caption = cap || '';

  if (key !== IG_SECRET_KEY) return callback(null, { statusCode: 401, body: 'Incorrect key supplied' });
  if (!image || !url) return callback(null, { statusCode: 400, body: 'Params not supplied' });

  var time = Date.now();
  var date = new Date();
  var github = new githubapi({ version: '3.0.0' });
  github.authenticate({
    type: 'token',
    username: user,
    token: token
  });

  async.waterfall([function scrape_image_from_instagram(callback) {
    var imageSplit = image.split('/');
    var imageURL = 'https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s1080x1080/e15/' + imageSplit[imageSplit.length - 1];
    var imageData = '';
    https.get(imageURL, function (resp) {
      resp.setEncoding('base64');
      resp.on('data', function (data) {
        imageData += data;
      });
      resp.on('end', function () {
        return callback(null, imageData);
      });
    }).on('error', function (e) {
      return new Error('Error scraping image: ' + e.message);
    });
  }, function upload_image_blob(image, callback) {
    github.gitdata.createBlob({
      owner: user,
      repo: repo,
      content: image,
      encoding: 'base64'
    }, function (err, data) {
      if (err) return new Error(err);
      callback(null, data.data.sha);
    });
  }, function get_branch_reference(image, callback) {
    github.gitdata.getReference({
      owner: user,
      user: user,
      repo: repo,
      ref: 'heads/master'
    }, function (err, data) {
      if (err) return new Error(err);

      callback(null, { image: image, commit: data.data.object.sha });
    });
  },

  // Create a tree ready to commit
  function create_tree(result, callback) {
    var content = '---\ntitle: Instagram - ' + date.toString() + '\nthinks/categories:\n- instagram\ndate: ' + date.toISOString().slice(0, -14) + '\nimage: images/blog/' + time + '.jpg\noriginalURL: ' + url + '\n---\n\n' + caption;

    var files = [{
      path: 'site/static/images/blog/' + time + '.jpg',
      mode: '100644',
      type: 'blob',
      sha: result.image
    }, {
      path: 'site/content/thinks/' + time + '.md',
      mode: '100644',
      type: 'blob',
      content: content
    }];

    github.gitdata.createTree({
      owner: user,
      user: user,
      repo: repo,
      tree: files,
      base_tree: result.commit
    }, function (err, data) {
      if (err) return new Error(err);

      result.tree = data.data.sha;
      callback(null, result);
    });
  }, function commit_the_files(result, callback) {
    github.gitdata.createCommit({
      owner: user,
      user: user,
      repo: repo,
      message: 'New instagram image: ' + date.toString(),
      tree: result.tree,
      parents: [result.commit]
    }, function (err, data) {
      if (err) return new Error(err);

      result.new = data.data.sha;
      callback(null, result);
    });
  }, function update_git_reference(result, callback) {
    github.gitdata.updateReference({
      owner: user,
      user: user,
      repo: repo,
      ref: 'heads/master',
      sha: result.new,
      force: true
    }, function (err, data) {
      if (err) return new Error(err);

      callback(null);
    });
  }], function (err, result) {
    if (err) return callback(null, { statusCode: 400, body: err.message });else return callback(null, { statusCode: 200, body: 'Image imported' });
  });
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var HttpsProxyAgent = __webpack_require__(12)
var getProxyForUrl = __webpack_require__(27).getProxyForUrl
var isStream = __webpack_require__(28)
var toCamelCase = __webpack_require__(29)
var urlTemplate = __webpack_require__(57)

var error = __webpack_require__(58)
var Url = __webpack_require__(1)

var debug = __webpack_require__(59)('node-github')

var ROUTES = __webpack_require__(63)
var DEFINITIONS = __webpack_require__(64)

/** section: github
 * class Client
 *
 *  Copyright 2012 Cloud9 IDE, Inc.
 *
 *  This product includes software developed by
 *  Cloud9 IDE, Inc (http://c9.io).
 *
 *  Author: Mike de Boer <mike@c9.io>
 *
 *  Upon instantiation of the [[Client]] class, the routes.json file is loaded
 *  and parsed for the API HTTP endpoints. For each HTTP endpoint to the
 *  HTTP server, a method is generated which accepts a Javascript Object
 *  with parameters and an optional callback to be invoked when the API request
 *  returns from the server or when the parameters could not be validated.
 *
 *  When an HTTP endpoint is processed and a method is generated as described
 *  above, [[Client]] also sets up parameter validation with the rules as
 *  defined in the routes.json.
 *
 *  These definitions are parsed and methods are created that the client can call
 *  to make an HTTP request to the server.
 *
 *  For example, the endpoint `gists/get-from-user` will be exposed as a member
 *  on the [[Client]] object and may be invoked with
 *
 *      client.getFromUser({
 *          "user": "bob"
 *      }, function(err, ret) {
 *          // do something with the result here.
 *      });
 *
 *      // or to fetch a specfic page:
 *      client.getFromUser({
 *          "user": "bob",
 *          "page": 2,
 *          "per_page": 100
 *      }, function(err, ret) {
 *          // do something with the result here.
 *      });
 *
 *  All the parameters as specified in the Object that is passed to the function
 *  as first argument, will be validated according to the rules in the `params`
 *  block of the route definition.
 *  Thus, in the case of the `user` parameter, according to the definition in
 *  the `params` block, it's a variable that first needs to be looked up in the
 *  `params` block of `definitions.json`. Params
 *  that start with a `$` sign will be substituted with the param with the same
 *  name from the `params` section of `definitions.json`.
 *  There we see that it is a required parameter (needs to hold a value). In other
 *  words, if the validation requirements are not met, an HTTP error is passed as
 *  first argument of the callback.
 *
 *  Implementation Notes: the `method` is NOT case sensitive, whereas `url` is.
 *  The `url` parameter also supports denoting parameters inside it as follows:
 *
 *      "get-from-user": {
 *          "url": "/users/:owner/gists",
 *          "method": "GET"
 *          ...
 *      }
 **/
var Client = module.exports = function (config) {
  if (!(this instanceof Client)) {
    return new Client(config)
  }

  config = config || {}
  config.headers = config.headers || {}
  this.config = config

  if ('followRedirects' in config) {
    console.warn('DEPRECATED: followRedirects option is no longer supported. All redirects are followed correctly')
  }

  if ('Promise' in config) {
    console.warn('DEPRECATED: Promise option is no longer supported. The native Promise API is used')
  }

  var pathPrefix = ''
    // Check if a prefix is passed in the config and strip any leading or trailing slashes from it.
  if (typeof config.pathPrefix === 'string') {
    pathPrefix = '/' + config.pathPrefix.replace(/(^[/]+|[/]+$)/g, '')
    this.config.pathPrefix = pathPrefix
  }

    // store mapping of accept header to preview api endpoints
  var mediaHash = DEFINITIONS.acceptTree
  var mediaTypes = {}

  for (var accept in mediaHash) {
    for (var route in mediaHash[accept]) {
      mediaTypes[mediaHash[accept][route]] = accept
    }
  }

  this.acceptUrls = mediaTypes

  this.setupRoutes()
};

(function () {
    /**
     *  Client#setupRoutes() -> null
     *
     *  Configures the routes as defined in routes.json.
     *
     *  [[Client#setupRoutes]] is invoked by the constructor, takes the
     *  contents of the JSON document that contains the definitions of all the
     *  available API routes and iterates over them.
     *
     *  It first recurses through each definition block until it reaches an API
     *  endpoint. It knows that an endpoint is found when the `url` and `param`
     *  definitions are found as a direct member of a definition block.
     *  Then the availability of an implementation by the API is checked; if it's
     *  not present, this means that a portion of the API as defined in the routes.json
     *  file is not implemented properly, thus an exception is thrown.
     *  After this check, a method is attached to the [[Client]] instance
     *  and becomes available for use. Inside this method, the parameter validation
     *  and typecasting is done, according to the definition of the parameters in
     *  the `params` block, upon invocation.
     *
     *  This mechanism ensures that the handlers ALWAYS receive normalized data
     *  that is of the correct format and type. JSON parameters are parsed, Strings
     *  are trimmed, Numbers and Floats are casted and checked for NaN after that.
     *
     *  Note: Query escaping for usage with SQL products is something that can be
     *  implemented additionally by adding an additional parameter type.
     **/
  this.setupRoutes = function () {
    var self = this
    this.requestHeaders = DEFINITIONS['request-headers'].map(function (header) {
      return header.toLowerCase()
    })
    this.responseHeaders = DEFINITIONS['response-headers'].map(function (header) {
      return header.toLowerCase()
    })

    function parseParams (msg, paramsStruct) {
      var params = Object.keys(paramsStruct)
      var paramName, def, value, type
      for (var i = 0, l = params.length; i < l; ++i) {
        paramName = params[i]
        if (paramName.charAt(0) === '$') {
          paramName = paramName.substr(1)
          if (!DEFINITIONS.params[paramName]) {
            throw new error.BadRequest("Invalid variable parameter name substitution; param '" +
                            paramName + "' not found in definitions.json")
          } else {
            def = paramsStruct[paramName] = DEFINITIONS.params[paramName]
            delete paramsStruct['$' + paramName]
          }
        } else {
          def = paramsStruct[paramName]
        }

        value = msg[paramName]
        if (typeof value !== 'boolean' && !value) {
                    // we don't need validation for undefined parameter values
                    // that are not required.
          if (!def.required ||
                        (def['allow-empty'] && value === '') ||
                        (def['allow-null'] && value === null)) {
            continue
          }
          throw new error.BadRequest("Empty value for parameter '" +
                        paramName + "': " + value)
        }

                // validate the value and type of parameter:
        if (def.validation) {
          if (!new RegExp(def.validation).test(value)) {
            throw new error.BadRequest("Invalid value for parameter '" +
                            paramName + "': " + value)
          }
        }

        type = def.type.toLowerCase()

        if (type === 'number') {
          value = parseInt(value, 10)

          if (isNaN(value)) {
            throw new error.BadRequest("Invalid value for parameter '" +
                              paramName + "': " + msg[paramName] + ' is NaN')
          }
        } else if (type === 'json') {
          if (typeof value === 'string') {
            try {
              value = JSON.parse(value)
            } catch (ex) {
              throw new error.BadRequest("JSON parse error of value for parameter '" +
                                  paramName + "': " + value)
            }
          }
        } else if (type === 'date') {
          value = new Date(value)
        }

        msg[paramName] = value
      }
    }

    function prepareApi (struct, baseType) {
      if (!baseType) {
        baseType = ''
      }
      Object.keys(struct).forEach(function (routePart) {
        var block = struct[routePart]
        var messageType = baseType + '/' + routePart
        if (block.url && block.params) {
                    // we ended up at an API definition part!
          var parts = messageType.split('/')
          var section = toCamelCase(parts[1].toLowerCase())
          parts.splice(0, 2)
          var funcName = toCamelCase(parts.join('-'))

          if (!self[section]) {
            self[section] = {}
          }

          self[section][funcName] = function (msg, callback) {
            if (block.deprecated) {
              const caller = (new Error()).stack.split('\n')[2]
              console.warn('DEPRECATED: ' + block.deprecated)
              console.warn(caller)
            }

            try {
              parseParams(msg, block.params)
            } catch (ex) {
                            // when the message was sent to the client, we can
                            // reply with the error directly.
              self.sendError(ex, block, msg, callback)
              debug('fatal:', ex.message)

              if (typeof callback !== 'function') {
                return Promise.reject(ex)
              }

                            // on error, there's no need to continue.
              return
            }

            if (callback) {
              return self.handler(msg, JSON.parse(JSON.stringify(block)), callback)
            }

            return new Promise(function (resolve, reject) {
              var cb = function (err, obj) {
                if (err) {
                  reject(err)
                } else {
                  resolve(obj)
                }
              }
              self.handler(msg, JSON.parse(JSON.stringify(block)), cb)
            })
          }
        } else {
                    // recurse into this block next:
          prepareApi(block, messageType)
        }
      })
    }

    prepareApi(ROUTES)
  }

    /**
     *  Client#authenticate(options) -> null
     *      - options (Object): Object containing the authentication type and credentials
     *          - type (String): One of the following: `basic`, `oauth`, `token`, or `integration`
     *          - username (String): Github username
     *          - password (String): Password to your account
     *          - token (String): oauth/jwt token
     *
     *  Set an authentication method to have access to protected resources.
     *
     *  ##### Example
     *
     *      // basic
     *      github.authenticate({
     *          type: "basic",
     *          username: "mikedeboertest",
     *          password: "test1324"
     *      });
     *
     *      // oauth
     *      github.authenticate({
     *          type: "oauth",
     *          token: "e5a4a27487c26e571892846366de023349321a73"
     *      });
     *
     *      // oauth key/secret
     *      github.authenticate({
     *          type: "oauth",
     *          key: "clientID",
     *          secret: "clientSecret"
     *      });
     *
     *      // user token
     *      github.authenticate({
     *          type: "token",
     *          token: "userToken",
     *      });
     *
     *      // integration (jwt)
     *      github.authenticate({
     *          type: "integration",
     *          token: "jwt",
     *      });
     **/
  this.authenticate = function (options) {
    if (!options) {
      this.auth = false
      return
    }
    if (!options.type || 'basic|oauth|client|token|integration'.indexOf(options.type) === -1) {
      throw new Error("Invalid authentication type, must be 'basic', 'integration', 'oauth', or 'client'")
    }
    if (options.type === 'basic' && (!options.username || !options.password)) {
      throw new Error('Basic authentication requires both a username and password to be set')
    }
    if (options.type === 'oauth') {
      if (!options.token && !(options.key && options.secret)) {
        throw new Error('OAuth2 authentication requires a token or key & secret to be set')
      }
    }
    if ((options.type === 'token' || options.type === 'integration') && !options.token) {
      throw new Error('Token authentication requires a token to be set')
    }

    this.auth = options
  }

  function getPageLinks (link) {
    link = link.link || link.meta.link || ''

    var links = {}

        // link format:
        // '<https://api.github.com/users/aseemk/followers?page=2>; rel="next", <https://api.github.com/users/aseemk/followers?page=2>; rel="last"'
    link.replace(/<([^>]*)>;\s*rel="([\w]*)"/g, function (m, uri, type) {
      links[type] = uri
    })

    return links
  }

    /**
     *  Client#hasNextPage(link) -> null
     *      - link (Object): response of a request
     *
     *  Check if a request result contains a link to the next page
     **/
  this.hasNextPage = function (link) {
    return getPageLinks(link).next
  }

    /**
     *  Client#hasPreviousPage(link) -> null
     *      - link (Object): response of a request
     *
     *  Check if a request result contains a link to the previous page
     **/
  this.hasPreviousPage = function (link) {
    return getPageLinks(link).prev
  }

    /**
     *  Client#hasLastPage(link) -> null
     *      - link (Object): response of a request
     *
     *  Check if a request result contains a link to the last page
     **/
  this.hasLastPage = function (link) {
    return getPageLinks(link).last
  }

    /**
     *  Client#hasFirstPage(link) -> null
     *      - link (Object): response of a request
     *
     *  Check if a request result contains a link to the first page
     **/
  this.hasFirstPage = function (link) {
    return getPageLinks(link).first
  }

  function getPage (link, which, headers, callback) {
    if (typeof headers === 'function') {
      callback = headers
      headers = null
    }
    headers = applyAcceptHeader(link, headers)

    var self = this
    var url = getPageLinks(link)[which]
    if (!url) {
      var urlErr = new error.NotFound('No ' + which + ' page found')
      if (callback) {
        return callback(urlErr)
      }
      return Promise.reject(urlErr)
    }

    var parsedUrl = Url.parse(url, true)

    var msg = Object.create(parsedUrl.query)
    msg.headers = headers

    var block = {
      url: parsedUrl.pathname,
      method: 'GET',
      params: parsedUrl.query
    }

    if (callback) {
      return self.handler(msg, JSON.parse(JSON.stringify(block)), callback)
    }

    return new Promise(function (resolve, reject) {
      var cb = function (err, obj) {
        if (err) {
          reject(err)
        } else {
          resolve(obj)
        }
      }
      self.handler(msg, JSON.parse(JSON.stringify(block)), cb)
    })
  }

    /**
     *  Client#getNextPage(link, callback) -> null
     *      - link (Object): response of a request
     *      - headers (Object): Optional. Key/ value pair of request headers to pass along with the HTTP request.
     *      - callback (Function): function to call when the request is finished with an error as first argument and result data as second argument.
     *
     *  Get the next page, based on the contents of the `Link` header
     **/
  this.getNextPage = function (link, headers, callback) {
    return getPage.call(this, link, 'next', headers, callback)
  }

    /**
     *  Client#getPreviousPage(link, callback) -> null
     *      - link (Object): response of a request
     *      - headers (Object): Optional. Key/ value pair of request headers to pass along with the HTTP request.
     *      - callback (Function): function to call when the request is finished with an error as first argument and result data as second argument.
     *
     *  Get the previous page, based on the contents of the `Link` header
     **/
  this.getPreviousPage = function (link, headers, callback) {
    return getPage.call(this, link, 'prev', headers, callback)
  }

    /**
     *  Client#getLastPage(link, callback) -> null
     *      - link (Object): response of a request
     *      - headers (Object): Optional. Key/ value pair of request headers to pass along with the HTTP request.
     *      - callback (Function): function to call when the request is finished with an error as first argument and result data as second argument.
     *
     *  Get the last page, based on the contents of the `Link` header
     **/
  this.getLastPage = function (link, headers, callback) {
    return getPage.call(this, link, 'last', headers, callback)
  }

    /**
     *  Client#getFirstPage(link, callback) -> null
     *      - link (Object): response of a request
     *      - headers (Object): Optional. Key/ value pair of request headers to pass along with the HTTP request.
     *      - callback (Function): function to call when the request is finished with an error as first argument and result data as second argument.
     *
     *  Get the first page, based on the contents of the `Link` header
     **/
  this.getFirstPage = function (link, headers, callback) {
    return getPage.call(this, link, 'first', headers, callback)
  }

  function applyAcceptHeader (res, headers) {
    var previous = res.meta && res.meta['x-github-media-type']
    if (!previous || (headers && headers.accept)) {
      return headers
    }
    headers = headers || {}
    headers.accept = 'application/vnd.' + previous.replace('; format=', '+')
    return headers
  }

  function getRequestFormat (hasBody, block) {
    if (hasBody) {
      return block.requestFormat || DEFINITIONS.constants.requestFormat
    }
    return 'query'
  }

  function getQueryAndUrl (msg, def, format, config) {
    var url = def.url

    if (msg.url) {
      url = Url.parse(urlTemplate.parse(msg.url).expand(msg), true)

      return {
        url: url.path,
        host: url.host
      }
    }

    if (config.pathPrefix && url.indexOf(config.pathPrefix) !== 0) {
      url = config.pathPrefix + def.url
    }

    var ret = {}

    Object.keys(def.params).forEach(function (paramName) {
      paramName = paramName.replace(/^[$]+/, '')
      if (!(paramName in msg)) {
        return
      }

      var isUrlParam = url.indexOf(':' + paramName) !== -1
      var valFormat = isUrlParam || format !== 'json' ? 'query' : format
      var val
      if (valFormat === 'json') {
        val = msg[paramName]
      } else {
        if (def.params[paramName] && def.params[paramName].combined) {
          // Check if this is a combined (search) string.
          val = msg[paramName].split(/[\s\t\r\n]*\+[\s\t\r\n]*/)
            .map(function (part) {
              return encodeURIComponent(part)
            })
            .join('+')
        } else {
          // the ref param is a path so we don't want to [fully] encode it but we do want to encode the # if there is one
          // (see https://github.com/mikedeboer/node-github/issues/499#issuecomment-280093040)
          if (paramName === 'ref') {
            val = msg[paramName].replace(/#/g, '%23')
          } else {
            val = encodeURIComponent(msg[paramName])
          }
        }
      }

      if (isUrlParam) {
        url = url.replace(':' + paramName, val)
      } else {
        if (format === 'json' && def.params[paramName].sendValueAsBody) {
          ret.query = val
        } else if (format === 'json') {
          if (!ret.query) {
            ret.query = {}
          }
          ret.query[paramName] = val
        } else if (format !== 'raw') {
          if (!ret.query) {
            ret.query = []
          }
          ret.query.push(paramName + '=' + val)
        }
      }
    })
    ret.url = url

    return ret
  }

    /**
     *  Client#httpSend(msg, block, callback) -> null
     *      - msg (Object): parameters to send as the request body
     *      - block (Object): parameter definition from the `routes.json` file that
     *          contains validation rules
     *      - callback (Function): function to be called when the request returns.
     *          If the the request returns with an error, the error is passed to
     *          the callback as its first argument (NodeJS-style).
     *
     *  Send an HTTP request to the server and pass the result to a callback.
     **/
  this.httpSend = function (msg, block, callback) {
    var self = this
    var method = block.method.toLowerCase()
    var hasFileBody = block.hasFileBody
    var hasBody = typeof (msg.body) !== 'undefined' || 'head|get|delete'.indexOf(method) === -1
    var format = getRequestFormat.call(this, hasBody, block)
    var protocol = this.config.protocol || DEFINITIONS.constants.protocol
    var port = this.config.port || (protocol === 'https' ? 443 : 80)
    var host = this.config.host || DEFINITIONS.constants.host

    var queryAndUrl = getQueryAndUrl(msg, block, format, self.config)
    var query = queryAndUrl.query
    var url = queryAndUrl.url
    var path = url
    if (!hasBody && query && query.length) {
      path += '?' + query.join('&')
    }

    var proxyUrl
    var agent

    // proxy options will be removed: https://github.com/octokit/node-github/issues/656
    /* istanbul ignore if */
    if (this.config.proxy !== undefined) {
      proxyUrl = this.config.proxy
    } else {
      proxyUrl = getProxyForUrl(url)
    }

    // proxy options will be removed: https://github.com/octokit/node-github/issues/656
    /* istanbul ignore if */
    if (proxyUrl) {
      agent = new HttpsProxyAgent(proxyUrl)
    }

    var ca = this.config.ca

    var headers = {}

    if (hasFileBody) {
      headers['content-length'] = msg.contentLength
      headers['content-type'] = msg.contentType
      delete msg.contentLength
      delete msg.contentType
    } else if (hasBody) {
      if (format === 'raw') {
        query = msg.data
      } else {
        query = JSON.stringify(query)
      }
      headers['content-length'] = Buffer.byteLength(query || '', 'utf8')
      headers['content-type'] = format === 'raw'
                ? 'text/plain; charset=utf-8'
                : 'application/json; charset=utf-8'
    }

    if (this.auth) {
      var basic
      switch (this.auth.type) {
        case 'oauth':
          if (this.auth.token) {
            path += (path.indexOf('?') === -1 ? '?' : '&') +
                            'access_token=' + encodeURIComponent(this.auth.token)
          } else {
            path += (path.indexOf('?') === -1 ? '?' : '&') +
                            'client_id=' + encodeURIComponent(this.auth.key) +
                            '&client_secret=' + encodeURIComponent(this.auth.secret)
          }
          break
        case 'token':
          headers['Authorization'] = 'token ' + this.auth.token
          break
        case 'integration':
          headers['Authorization'] = 'Bearer ' + this.auth.token
          headers['accept'] = 'application/vnd.github.machine-man-preview+json'
          break
        case 'basic':
          basic = Buffer.from(this.auth.username + ':' + this.auth.password, 'ascii').toString('base64')
          headers['Authorization'] = 'Basic ' + basic
          break
      }
    }

    function callCallback (err, result) {
      if (callback) {
        var cb = callback
        callback = undefined
        cb(err, result)
      }
    }

    function addCustomHeaders (customHeaders) {
      Object.keys(customHeaders).forEach(function (header) {
        var headerLC = header.toLowerCase()
        if (self.requestHeaders.indexOf(headerLC) === -1) {
          return
        }
        headers[headerLC] = customHeaders[header]
      })
    }

    addCustomHeaders(Object.assign(msg.headers || {}, this.config.headers))

    if (!headers['user-agent']) {
      headers['user-agent'] = 'NodeJS HTTP Client'
    }

    if (!('accept' in headers)) {
      headers['accept'] = this.acceptUrls[block.url] || this.config.requestMedia || DEFINITIONS.constants.requestMedia
    }

    headers.host = queryAndUrl.host || host

    var options = {
      agent: agent,
      host: headers.host,
      port: port,
      path: path,
      method: method,
      headers: headers,
      ca: ca,
      family: this.config.family,
      rejectUnauthorized: this.config.rejectUnauthorized
    }

    debug('REQUEST:', options)

    function httpSendRequest () {
      var reqModule = protocol === 'http' ? __webpack_require__(65) : __webpack_require__(3)

      var req = reqModule.request(options, function (res) {
        debug('STATUS: ' + res.statusCode)
        debug('HEADERS: ' + JSON.stringify(res.headers))

        res.setEncoding('utf8')
        var data = ''
        res.on('data', function (chunk) {
          data += chunk
        })
        /* istanbul ignore next */
        res.on('error', function (err) {
          callCallback(err)
        })
        res.on('end', function () {
          if (res.statusCode !== 304 && res.statusCode >= 301 && res.statusCode <= 307) {
            options.path = Url.parse(res.headers.location, true).path
            httpSendRequest()
            return
          }

          if (res.statusCode === 304 || res.statusCode >= 400 || res.statusCode < 10) {
            callCallback(new error.HttpError(data, res.statusCode, res.headers))
          } else {
            res.data = data
            callCallback(null, res)
          }
        })
      })

      var timeout = (block.timeout !== undefined) ? block.timeout : self.config.timeout

      if (timeout) {
        req.setTimeout(timeout)
      }

      req.on('error', function (e) {
        debug('problem with request: ' + e.message)
        callCallback(e.message)
      })

      req.on('timeout', function () {
        debug('problem with request: timed out')
        req.abort()
        callCallback(new error.GatewayTimeout('Request timeout'))
      })

            // write data to request body
      if (hasBody && query && query.length) {
        debug('REQUEST BODY: ' + query + '\n')
        req.write(query + '\n')
      }

      if (hasFileBody) {
        if (isStream(msg.file)) {
          return msg.file.pipe(req)
        }

        req.write(Buffer.from(msg.file))
      }

      req.end()
    };

    httpSendRequest()
  }

  this.sendError = function (err, block, msg, callback) {
    debug('error:', err, block, msg)

    if (typeof err === 'string') {
      err = new error.InternalServerError(err)
    }
    if (callback && typeof (callback) === 'function') {
      callback(err)
    }
  }

  this.handler = function (msg, block, callback) {
    var self = this
    this.httpSend(msg, block, function (err, res) {
      if (err) {
        return self.sendError(err, msg, null, callback)
      }

      var data = res.data

      var contentType = res.headers['content-type']
      if (contentType && contentType.indexOf('application/json') !== -1) {
        data = res.data && JSON.parse(res.data)
      }
      var ret = {
        data: data,
        meta: {}
      }

      self.responseHeaders.forEach(function (header) {
        if (res.headers[header]) {
          ret.meta[header] = res.headers[header]
        }
      })

      callback(null, ret)
    })
  }
}).call(Client.prototype)


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var net = __webpack_require__(13);
var tls = __webpack_require__(14);
var url = __webpack_require__(1);
var Agent = __webpack_require__(15);
var inherits = __webpack_require__(0).inherits;
var debug = __webpack_require__(21)('https-proxy-agent');

/**
 * Module exports.
 */

module.exports = HttpsProxyAgent;

/**
 * The `HttpsProxyAgent` implements an HTTP Agent subclass that connects to the
 * specified "HTTP(s) proxy server" in order to proxy HTTPS requests.
 *
 * @api public
 */

function HttpsProxyAgent(opts) {
  if (!(this instanceof HttpsProxyAgent)) return new HttpsProxyAgent(opts);
  if ('string' == typeof opts) opts = url.parse(opts);
  if (!opts)
    throw new Error(
      'an HTTP(S) proxy server `host` and `port` must be specified!'
    );
  debug('creating new HttpsProxyAgent instance: %o', opts);
  Agent.call(this, opts);

  var proxy = Object.assign({}, opts);

  // if `true`, then connect to the proxy server over TLS. defaults to `false`.
  this.secureProxy = proxy.protocol ? /^https:?$/i.test(proxy.protocol) : false;

  // prefer `hostname` over `host`, and set the `port` if needed
  proxy.host = proxy.hostname || proxy.host;
  proxy.port = +proxy.port || (this.secureProxy ? 443 : 80);

  // ALPN is supported by Node.js >= v5.
  // attempt to negotiate http/1.1 for proxy servers that support http/2
  if (this.secureProxy && !('ALPNProtocols' in proxy)) {
    proxy.ALPNProtocols = ['http 1.1']
  }

  if (proxy.host && proxy.path) {
    // if both a `host` and `path` are specified then it's most likely the
    // result of a `url.parse()` call... we need to remove the `path` portion so
    // that `net.connect()` doesn't attempt to open that as a unix socket file.
    delete proxy.path;
    delete proxy.pathname;
  }

  this.proxy = proxy;
  this.defaultPort = 443;
}
inherits(HttpsProxyAgent, Agent);

/**
 * Called when the node-core HTTP client library is creating a new HTTP request.
 *
 * @api public
 */

HttpsProxyAgent.prototype.callback = function connect(req, opts, fn) {
  var proxy = this.proxy;

  // create a socket connection to the proxy server
  var socket;
  if (this.secureProxy) {
    socket = tls.connect(proxy);
  } else {
    socket = net.connect(proxy);
  }

  // we need to buffer any HTTP traffic that happens with the proxy before we get
  // the CONNECT response, so that if the response is anything other than an "200"
  // response code, then we can re-play the "data" events on the socket once the
  // HTTP parser is hooked up...
  var buffers = [];
  var buffersLength = 0;

  function read() {
    var b = socket.read();
    if (b) ondata(b);
    else socket.once('readable', read);
  }

  function cleanup() {
    socket.removeListener('data', ondata);
    socket.removeListener('end', onend);
    socket.removeListener('error', onerror);
    socket.removeListener('close', onclose);
    socket.removeListener('readable', read);
  }

  function onclose(err) {
    debug('onclose had error %o', err);
  }

  function onend() {
    debug('onend');
  }

  function onerror(err) {
    cleanup();
    fn(err);
  }

  function ondata(b) {
    buffers.push(b);
    buffersLength += b.length;
    var buffered = Buffer.concat(buffers, buffersLength);
    var str = buffered.toString('ascii');

    if (!~str.indexOf('\r\n\r\n')) {
      // keep buffering
      debug('have not received end of HTTP headers yet...');
      if (socket.read) {
        read();
      } else {
        socket.once('data', ondata);
      }
      return;
    }

    var firstLine = str.substring(0, str.indexOf('\r\n'));
    var statusCode = +firstLine.split(' ')[1];
    debug('got proxy server response: %o', firstLine);

    if (200 == statusCode) {
      // 200 Connected status code!
      var sock = socket;

      // nullify the buffered data since we won't be needing it
      buffers = buffered = null;

      if (opts.secureEndpoint) {
        // since the proxy is connecting to an SSL server, we have
        // to upgrade this socket connection to an SSL connection
        debug(
          'upgrading proxy-connected socket to TLS connection: %o',
          opts.host
        );
        opts.socket = socket;
        opts.servername = opts.servername || opts.host;
        opts.host = null;
        opts.hostname = null;
        opts.port = null;
        sock = tls.connect(opts);
      }

      cleanup();
      fn(null, sock);
    } else {
      // some other status code that's not 200... need to re-play the HTTP header
      // "data" events onto the socket once the HTTP machinery is attached so that
      // the user can parse and handle the error status code
      cleanup();

      // save a reference to the concat'd Buffer for the `onsocket` callback
      buffers = buffered;

      // need to wait for the "socket" event to re-play the "data" events
      req.once('socket', onsocket);
      fn(null, socket);
    }
  }

  function onsocket(socket) {
    // replay the "buffers" Buffer onto the `socket`, since at this point
    // the HTTP module machinery has been hooked up for the user
    if ('function' == typeof socket.ondata) {
      // node <= v0.11.3, the `ondata` function is set on the socket
      socket.ondata(buffers, 0, buffers.length);
    } else if (socket.listeners('data').length > 0) {
      // node > v0.11.3, the "data" event is listened for directly
      socket.emit('data', buffers);
    } else {
      // never?
      throw new Error('should not happen...');
    }

    // nullify the cached Buffer instance
    buffers = null;
  }

  socket.on('error', onerror);
  socket.on('close', onclose);
  socket.on('end', onend);

  if (socket.read) {
    read();
  } else {
    socket.once('data', ondata);
  }

  var hostname = opts.host + ':' + opts.port;
  var msg = 'CONNECT ' + hostname + ' HTTP/1.1\r\n';

  var headers = Object.assign({}, proxy.headers);
  if (proxy.auth) {
    headers['Proxy-Authorization'] =
      'Basic ' + Buffer.from(proxy.auth).toString('base64');
  }

  // the Host header should only include the port
  // number when it is a non-standard port
  var host = opts.host;
  if (!isDefaultPort(opts.port, opts.secureEndpoint)) {
    host += ':' + opts.port;
  }
  headers['Host'] = host;

  headers['Connection'] = 'close';
  Object.keys(headers).forEach(function(name) {
    msg += name + ': ' + headers[name] + '\r\n';
  });

  socket.write(msg + '\r\n');
};

function isDefaultPort(port, secure) {
  return Boolean((!secure && port === 80) || (secure && port === 443));
}


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("tls");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(16);
const inherits = __webpack_require__(0).inherits;
const promisify = __webpack_require__(17);
const EventEmitter = __webpack_require__(20).EventEmitter;

module.exports = Agent;

function isAgent(v) {
  return v && typeof v.addRequest === 'function';
}

/**
 * Base `http.Agent` implementation.
 * No pooling/keep-alive is implemented by default.
 *
 * @param {Function} callback
 * @api public
 */
function Agent(callback, _opts) {
  if (!(this instanceof Agent)) {
    return new Agent(callback, _opts);
  }

  EventEmitter.call(this);

  // The callback gets promisified if it has 3 parameters
  // (i.e. it has a callback function) lazily
  this._promisifiedCallback = false;

  let opts = _opts;
  if ('function' === typeof callback) {
    this.callback = callback;
  } else if (callback) {
    opts = callback;
  }

  // timeout for the socket to be returned from the callback
  this.timeout = (opts && opts.timeout) || null;

  this.options = opts;
}
inherits(Agent, EventEmitter);

/**
 * Override this function in your subclass!
 */
Agent.prototype.callback = function callback(req, opts) {
  throw new Error(
    '"agent-base" has no default implementation, you must subclass and override `callback()`'
  );
};

/**
 * Called by node-core's "_http_client.js" module when creating
 * a new HTTP request with this Agent instance.
 *
 * @api public
 */
Agent.prototype.addRequest = function addRequest(req, _opts) {
  const ownOpts = Object.assign({}, _opts);

  // Set default `host` for HTTP to localhost
  if (null == ownOpts.host) {
    ownOpts.host = 'localhost';
  }

  // Set default `port` for HTTP if none was explicitly specified
  if (null == ownOpts.port) {
    ownOpts.port = ownOpts.secureEndpoint ? 443 : 80;
  }

  const opts = Object.assign({}, this.options, ownOpts);

  if (opts.host && opts.path) {
    // If both a `host` and `path` are specified then it's most likely the
    // result of a `url.parse()` call... we need to remove the `path` portion so
    // that `net.connect()` doesn't attempt to open that as a unix socket file.
    delete opts.path;
  }

  delete opts.agent;
  delete opts.hostname;
  delete opts._defaultAgent;
  delete opts.defaultPort;
  delete opts.createConnection;

  // Hint to use "Connection: close"
  // XXX: non-documented `http` module API :(
  req._last = true;
  req.shouldKeepAlive = false;

  // Create the `stream.Duplex` instance
  let timeout;
  let timedOut = false;
  const timeoutMs = this.timeout;
  const freeSocket = this.freeSocket;

  function onerror(err) {
    if (req._hadError) return;
    req.emit('error', err);
    // For Safety. Some additional errors might fire later on
    // and we need to make sure we don't double-fire the error event.
    req._hadError = true;
  }

  function ontimeout() {
    timeout = null;
    timedOut = true;
    const err = new Error(
      'A "socket" was not created for HTTP request before ' + timeoutMs + 'ms'
    );
    err.code = 'ETIMEOUT';
    onerror(err);
  }

  function callbackError(err) {
    if (timedOut) return;
    if (timeout != null) {
      clearTimeout(timeout);
      timeout = null;
    }
    onerror(err);
  }

  function onsocket(socket) {
    if (timedOut) return;
    if (timeout != null) {
      clearTimeout(timeout);
      timeout = null;
    }
    if (isAgent(socket)) {
      // `socket` is actually an http.Agent instance, so relinquish
      // responsibility for this `req` to the Agent from here on
      socket.addRequest(req, opts);
    } else if (socket) {
      function onfree() {
        freeSocket(socket, opts);
      }
      socket.on('free', onfree);
      req.onSocket(socket);
    } else {
      const err = new Error(
        'no Duplex stream was returned to agent-base for `' + req.method + ' ' + req.path + '`'
      );
      onerror(err);
    }
  }

  if (!this._promisifiedCallback && this.callback.length >= 3) {
    // Legacy callback function - convert to a Promise
    this.callback = promisify(this.callback, this);
    this._promisifiedCallback = true;
  }

  if (timeoutMs > 0) {
    timeout = setTimeout(ontimeout, timeoutMs);
  }

  try {
    Promise.resolve(this.callback(req, opts)).then(onsocket, callbackError);
  } catch (err) {
    Promise.reject(err).catch(callbackError);
  }
};

Agent.prototype.freeSocket = function freeSocket(socket, opts) {
  // TODO reuse sockets
  socket.destroy();
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const url = __webpack_require__(1);
const https = __webpack_require__(3);

/**
 * This currently needs to be applied to all Node.js versions
 * in order to determine if the `req` is an HTTP or HTTPS request.
 *
 * There is currently no PR attempting to move this property upstream.
 */
https.request = (function(request) {
  return function(_options, cb) {
    let options;
    if (typeof _options === 'string') {
      options = url.parse(_options);
    } else {
      options = Object.assign({}, _options);
    }
    if (null == options.port) {
      options.port = 443;
    }
    options.secureEndpoint = true;
    return request.call(https, options, cb);
  };
})(https.request);

/**
 * This is needed for Node.js >= 9.0.0 to make sure `https.get()` uses the
 * patched `https.request()`.
 *
 * Ref: https://github.com/nodejs/node/commit/5118f31
 */
https.get = function(options, cb) {
  const req = https.request(options, cb);
  req.end();
  return req;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global module, require */
module.exports = function () {

    "use strict";

    // Get a promise object. This may be native, or it may be polyfilled

    var ES6Promise = __webpack_require__(18);

    /**
     * thatLooksLikeAPromiseToMe()
     *
     * Duck-types a promise.
     *
     * @param {object} o
     * @return {bool} True if this resembles a promise
     */
    function thatLooksLikeAPromiseToMe(o) {
        return o && typeof o.then === "function" && typeof o.catch === "function";
    }

    /**
     * promisify()
     *
     * Transforms callback-based function -- func(arg1, arg2 .. argN, callback) -- into
     * an ES6-compatible Promise. Promisify provides a default callback of the form (error, result)
     * and rejects when `error` is truthy. You can also supply settings object as the second argument.
     *
     * @param {function} original - The function to promisify
     * @param {object} settings - Settings object
     * @param {object} settings.thisArg - A `this` context to use. If not set, assume `settings` _is_ `thisArg`
     * @param {bool} settings.multiArgs - Should multiple arguments be returned as an array?
     * @return {function} A promisified version of `original`
     */
    return function promisify(original, settings) {

        return function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var returnMultipleArguments = settings && settings.multiArgs;

            var target = void 0;
            if (settings && settings.thisArg) {
                target = settings.thisArg;
            } else if (settings) {
                target = settings;
            }

            // Return the promisified function
            return new ES6Promise(function (resolve, reject) {

                // Append the callback bound to the context
                args.push(function callback(err) {

                    if (err) {
                        return reject(err);
                    }

                    for (var _len2 = arguments.length, values = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                        values[_key2 - 1] = arguments[_key2];
                    }

                    if (false === !!returnMultipleArguments) {
                        return resolve(values[0]);
                    }

                    resolve(values);
                });

                // Call the function
                var response = original.apply(target, args);

                // If it looks like original already returns a promise,
                // then just resolve with that promise. Hopefully, the callback function we added will just be ignored.
                if (thatLooksLikeAPromiseToMe(response)) {
                    resolve(response);
                }
            });
        };
    };
}();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global self, window, module, global, require */
module.exports = function () {

    "use strict";

    var globalObject = void 0;

    function isFunction(x) {
        return typeof x === "function";
    }

    // Seek the global object
    if (global !== undefined) {
        globalObject = global;
    } else if (window !== undefined && window.document) {
        globalObject = window;
    } else {
        globalObject = self;
    }

    // Test for any native promise implementation, and if that
    // implementation appears to conform to the specificaton.
    // This code mostly nicked from the es6-promise module polyfill
    // and then fooled with.
    var hasPromiseSupport = function () {

        // No promise object at all, and it's a non-starter
        if (!globalObject.hasOwnProperty("Promise")) {
            return false;
        }

        // There is a Promise object. Does it conform to the spec?
        var P = globalObject.Promise;

        // Some of these methods are missing from
        // Firefox/Chrome experimental implementations
        if (!P.hasOwnProperty("resolve") || !P.hasOwnProperty("reject")) {
            return false;
        }

        if (!P.hasOwnProperty("all") || !P.hasOwnProperty("race")) {
            return false;
        }

        // Older version of the spec had a resolver object
        // as the arg rather than a function
        return function () {

            var resolve = void 0;

            var p = new globalObject.Promise(function (r) {
                resolve = r;
            });

            if (p) {
                return isFunction(resolve);
            }

            return false;
        }();
    }();

    // Export the native Promise implementation if it
    // looks like it matches the spec
    if (hasPromiseSupport) {
        return globalObject.Promise;
    }

    //  Otherwise, return the es6-promise polyfill by @jaffathecake.
    return __webpack_require__(19).Promise;
}();

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.5+7f2b526d
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var TRY_CATCH_ERROR = { error: null };

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    TRY_CATCH_ERROR.error = error;
    return TRY_CATCH_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === TRY_CATCH_ERROR) {
      reject(promise, TRY_CATCH_ERROR.error);
      TRY_CATCH_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = void 0,
      failed = void 0;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (failed) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */
if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
  module.exports = __webpack_require__(22);
} else {
  module.exports = __webpack_require__(24);
}



/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
// eslint-disable-next-line complexity

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if (match === '%%') {
      return;
    }

    index++;

    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */


function log() {
  var _console;

  // This hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  var r;

  try {
    r = exports.storage.getItem('debug');
  } catch (error) {} // Swallow
  // XXX (@Qix-) should we be logging these?
  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */


function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

module.exports = __webpack_require__(5)(exports);
var formatters = module.exports.formatters;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};



/***/ }),
/* 23 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */
var tty = __webpack_require__(6);

var util = __webpack_require__(0);
/**
 * This is the Node.js implementation of `debug()`.
 */


exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
  // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
  // eslint-disable-next-line import/no-extraneous-dependencies
  var supportsColor = __webpack_require__(7);

  if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
    exports.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
  }
} catch (error) {} // Swallow - we only care if `supports-color` is available; it doesn't have to be.

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */


exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // Camel-case
  var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function (_, k) {
    return k.toUpperCase();
  }); // Coerce string value into JS value

  var val = process.env[key];

  if (/^(yes|on|true|enabled)$/i.test(val)) {
    val = true;
  } else if (/^(no|off|false|disabled)$/i.test(val)) {
    val = false;
  } else if (val === 'null') {
    val = null;
  } else {
    val = Number(val);
  }

  obj[prop] = val;
  return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  var name = this.namespace,
      useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = "\x1B[3" + (c < 8 ? c : '8;5;' + c);
    var prefix = "  ".concat(colorCode, ";1m").concat(name, " \x1B[0m");
    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + "\x1B[0m");
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  }

  return new Date().toISOString() + ' ';
}
/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */


function log() {
  return process.stderr.write(util.format.apply(util, arguments) + '\n');
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  if (namespaces) {
    process.env.DEBUG = namespaces;
  } else {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */


function init(debug) {
  debug.inspectOpts = {};
  var keys = Object.keys(exports.inspectOpts);

  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

module.exports = __webpack_require__(5)(exports);
var formatters = module.exports.formatters;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts).replace(/\s*\n\s*/g, ' ');
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */


formatters.O = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};



/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseUrl = __webpack_require__(1).parse;

var DEFAULT_PORTS = {
  ftp: 21,
  gopher: 70,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443,
};

var stringEndsWith = String.prototype.endsWith || function(s) {
  return s.length <= this.length &&
    this.indexOf(s, this.length - s.length) !== -1;
};

/**
 * @param {string|object} url - The URL, or the result from url.parse.
 * @return {string} The URL of the proxy that should handle the request to the
 *  given URL. If no proxy is set, this will be an empty string.
 */
function getProxyForUrl(url) {
  var parsedUrl = typeof url === 'string' ? parseUrl(url) : url || {};
  var proto = parsedUrl.protocol;
  var hostname = parsedUrl.host;
  var port = parsedUrl.port;
  if (typeof hostname !== 'string' || !hostname || typeof proto !== 'string') {
    return '';  // Don't proxy URLs without a valid scheme or host.
  }

  proto = proto.split(':', 1)[0];
  // Stripping ports in this way instead of using parsedUrl.hostname to make
  // sure that the brackets around IPv6 addresses are kept.
  hostname = hostname.replace(/:\d*$/, '');
  port = parseInt(port) || DEFAULT_PORTS[proto] || 0;
  if (!shouldProxy(hostname, port)) {
    return '';  // Don't proxy URLs that match NO_PROXY.
  }

  var proxy = getEnv(proto + '_proxy') || getEnv('all_proxy');
  if (proxy && proxy.indexOf('://') === -1) {
    // Missing scheme in proxy, default to the requested URL's scheme.
    proxy = proto + '://' + proxy;
  }
  return proxy;
}

/**
 * Determines whether a given URL should be proxied.
 *
 * @param {string} hostname - The host name of the URL.
 * @param {number} port - The effective port of the URL.
 * @returns {boolean} Whether the given URL should be proxied.
 * @private
 */
function shouldProxy(hostname, port) {
  var NO_PROXY = getEnv('no_proxy').toLowerCase();
  if (!NO_PROXY) {
    return true;  // Always proxy if NO_PROXY is not set.
  }
  if (NO_PROXY === '*') {
    return false;  // Never proxy if wildcard is set.
  }

  return NO_PROXY.split(/[,\s]/).every(function(proxy) {
    if (!proxy) {
      return true;  // Skip zero-length hosts.
    }
    var parsedProxy = proxy.match(/^(.+):(\d+)$/);
    var parsedProxyHostname = parsedProxy ? parsedProxy[1] : proxy;
    var parsedProxyPort = parsedProxy ? parseInt(parsedProxy[2]) : 0;
    if (parsedProxyPort && parsedProxyPort !== port) {
      return true;  // Skip if ports don't match.
    }

    if (!/^[.*]/.test(parsedProxyHostname)) {
      // No wildcards, so stop proxying if there is an exact match.
      return hostname !== parsedProxyHostname;
    }

    if (parsedProxyHostname.charAt(0) === '*') {
      // Remove leading wildcard.
      parsedProxyHostname = parsedProxyHostname.slice(1);
    }
    // Stop proxying if the hostname ends with the no_proxy host.
    return !stringEndsWith.call(hostname, parsedProxyHostname);
  });
}

/**
 * Get the value for an environment variable.
 *
 * @param {string} key - The name of the environment variable.
 * @return {string} The value of the environment variable.
 * @private
 */
function getEnv(key) {
  return process.env[key.toLowerCase()] || process.env[key.toUpperCase()] || '';
}

exports.getProxyForUrl = getProxyForUrl;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isStream = module.exports = function (stream) {
	return stream !== null && typeof stream === 'object' && typeof stream.pipe === 'function';
};

isStream.writable = function (stream) {
	return isStream(stream) && stream.writable !== false && typeof stream._write === 'function' && typeof stream._writableState === 'object';
};

isStream.readable = function (stream) {
	return isStream(stream) && stream.readable !== false && typeof stream._read === 'function' && typeof stream._readableState === 'object';
};

isStream.duplex = function (stream) {
	return isStream.writable(stream) && isStream.readable(stream);
};

isStream.transform = function (stream) {
	return isStream.duplex(stream) && typeof stream._transform === 'function' && typeof stream._transformState === 'object';
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var capitalize = __webpack_require__(30),
    createCompounder = __webpack_require__(48);

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * _.camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * _.camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * _.camelCase('__FOO_BAR__');
 * // => 'fooBar'
 */
var camelCase = createCompounder(function(result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize(word) : word);
});

module.exports = camelCase;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var toString = __webpack_require__(2),
    upperFirst = __webpack_require__(41);

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */
function capitalize(string) {
  return upperFirst(toString(string).toLowerCase());
}

module.exports = capitalize;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(4),
    arrayMap = __webpack_require__(34),
    isArray = __webpack_require__(35),
    isSymbol = __webpack_require__(36);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(33);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(37),
    isObjectLike = __webpack_require__(40);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(4),
    getRawTag = __webpack_require__(38),
    objectToString = __webpack_require__(39);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(4);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 39 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var createCaseFirst = __webpack_require__(42);

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst = createCaseFirst('toUpperCase');

module.exports = upperFirst;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var castSlice = __webpack_require__(43),
    hasUnicode = __webpack_require__(8),
    stringToArray = __webpack_require__(45),
    toString = __webpack_require__(2);

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);

    var strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

module.exports = createCaseFirst;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var baseSlice = __webpack_require__(44);

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

module.exports = castSlice;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var asciiToArray = __webpack_require__(46),
    hasUnicode = __webpack_require__(8),
    unicodeToArray = __webpack_require__(47);

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

module.exports = stringToArray;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

module.exports = asciiToArray;


/***/ }),
/* 47 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

module.exports = unicodeToArray;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var arrayReduce = __webpack_require__(49),
    deburr = __webpack_require__(50),
    words = __webpack_require__(53);

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]";

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

module.exports = createCompounder;


/***/ }),
/* 49 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var deburrLetter = __webpack_require__(51),
    toString = __webpack_require__(2);

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;

/** Used to compose unicode capture groups. */
var rsCombo = '[' + rsComboRange + ']';

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

module.exports = deburr;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var basePropertyOf = __webpack_require__(52);

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 's'
};

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

module.exports = deburrLetter;


/***/ }),
/* 52 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

module.exports = basePropertyOf;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var asciiWords = __webpack_require__(54),
    hasUnicodeWord = __webpack_require__(55),
    toString = __webpack_require__(2),
    unicodeWords = __webpack_require__(56);

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

module.exports = words;


/***/ }),
/* 54 */
/***/ (function(module, exports) {

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

module.exports = asciiWords;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

module.exports = hasUnicodeWord;


/***/ }),
/* 56 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]",
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
    rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
  rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
  rsUpper + '+' + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

module.exports = unicodeWords;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

(function (root, factory) {
    if (true) {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.urltemplate = factory();
    }
}(this, function () {
  /**
   * @constructor
   */
  function UrlTemplate() {
  }

  /**
   * @private
   * @param {string} str
   * @return {string}
   */
  UrlTemplate.prototype.encodeReserved = function (str) {
    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
      if (!/%[0-9A-Fa-f]/.test(part)) {
        part = encodeURI(part).replace(/%5B/g, '[').replace(/%5D/g, ']');
      }
      return part;
    }).join('');
  };

  /**
   * @private
   * @param {string} str
   * @return {string}
   */
  UrlTemplate.prototype.encodeUnreserved = function (str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
  }

  /**
   * @private
   * @param {string} operator
   * @param {string} value
   * @param {string} key
   * @return {string}
   */
  UrlTemplate.prototype.encodeValue = function (operator, value, key) {
    value = (operator === '+' || operator === '#') ? this.encodeReserved(value) : this.encodeUnreserved(value);

    if (key) {
      return this.encodeUnreserved(key) + '=' + value;
    } else {
      return value;
    }
  };

  /**
   * @private
   * @param {*} value
   * @return {boolean}
   */
  UrlTemplate.prototype.isDefined = function (value) {
    return value !== undefined && value !== null;
  };

  /**
   * @private
   * @param {string}
   * @return {boolean}
   */
  UrlTemplate.prototype.isKeyOperator = function (operator) {
    return operator === ';' || operator === '&' || operator === '?';
  };

  /**
   * @private
   * @param {Object} context
   * @param {string} operator
   * @param {string} key
   * @param {string} modifier
   */
  UrlTemplate.prototype.getValues = function (context, operator, key, modifier) {
    var value = context[key],
        result = [];

    if (this.isDefined(value) && value !== '') {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        value = value.toString();

        if (modifier && modifier !== '*') {
          value = value.substring(0, parseInt(modifier, 10));
        }

        result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));
      } else {
        if (modifier === '*') {
          if (Array.isArray(value)) {
            value.filter(this.isDefined).forEach(function (value) {
              result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));
            }, this);
          } else {
            Object.keys(value).forEach(function (k) {
              if (this.isDefined(value[k])) {
                result.push(this.encodeValue(operator, value[k], k));
              }
            }, this);
          }
        } else {
          var tmp = [];

          if (Array.isArray(value)) {
            value.filter(this.isDefined).forEach(function (value) {
              tmp.push(this.encodeValue(operator, value));
            }, this);
          } else {
            Object.keys(value).forEach(function (k) {
              if (this.isDefined(value[k])) {
                tmp.push(this.encodeUnreserved(k));
                tmp.push(this.encodeValue(operator, value[k].toString()));
              }
            }, this);
          }

          if (this.isKeyOperator(operator)) {
            result.push(this.encodeUnreserved(key) + '=' + tmp.join(','));
          } else if (tmp.length !== 0) {
            result.push(tmp.join(','));
          }
        }
      }
    } else {
      if (operator === ';') {
        if (this.isDefined(value)) {
          result.push(this.encodeUnreserved(key));
        }
      } else if (value === '' && (operator === '&' || operator === '?')) {
        result.push(this.encodeUnreserved(key) + '=');
      } else if (value === '') {
        result.push('');
      }
    }
    return result;
  };

  /**
   * @param {string} template
   * @return {function(Object):string}
   */
  UrlTemplate.prototype.parse = function (template) {
    var that = this;
    var operators = ['+', '#', '.', '/', ';', '?', '&'];

    return {
      expand: function (context) {
        return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
          if (expression) {
            var operator = null,
                values = [];

            if (operators.indexOf(expression.charAt(0)) !== -1) {
              operator = expression.charAt(0);
              expression = expression.substr(1);
            }

            expression.split(/,/g).forEach(function (variable) {
              var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
              values.push.apply(values, that.getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
            });

            if (operator && operator !== '+') {
              var separator = ',';

              if (operator === '?') {
                separator = '&';
              } else if (operator !== '#') {
                separator = operator;
              }
              return (values.length !== 0 ? operator : '') + values.join(separator);
            } else {
              return values.join(',');
            }
          } else {
            return that.encodeReserved(literal);
          }
        });
      }
    };
  };

  return new UrlTemplate();
}));


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

/** section: github
 * class HttpError
 *
 *  Copyright 2012 Cloud9 IDE, Inc.
 *
 *  This product includes software developed by
 *  Cloud9 IDE, Inc (http://c9.io).
 *
 *  Author: Mike de Boer <mike@c9.io>
 **/

var Util = __webpack_require__(0)

exports.HttpError = function (message, code, headers) {
  Error.call(this, message)
  this.message = message
  this.code = code
  this.status = statusCodes[code]
  this.headers = headers
}
Util.inherits(exports.HttpError, Error);

(function () {
    /**
     *  HttpError#toString() -> String
     *
     *  Returns the stringified version of the error (i.e. the message).
     **/
  this.toString = function () {
    return this.message
  }

    /**
     *  HttpError#toJSON() -> Object
     *
     *  Returns a JSON object representation of the error.
     **/
  this.toJSON = function () {
    return {
      code: this.code,
      status: this.status,
      message: this.message
    }
  }
}).call(exports.HttpError.prototype)

var statusCodes = {
  304: 'Not Modified', // See PR #673 (https://github.com/octokit/node-github/pull/673)
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Request Entity Too Large',
  414: 'Request-URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Requested Range Not Satisfiable',
  417: 'Expectation Failed',
  420: 'Enhance Your Calm',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  425: 'Unordered Collection',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  444: 'No Response',
  449: 'Retry With',
  499: 'Client Closed Request',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  508: 'Loop Detected',
  509: 'Bandwidth Limit Exceeded',
  510: 'Not Extended',
  511: 'Network Authentication Required'
}

for (var status in statusCodes) {
  var defaultMsg = statusCodes[status]

  var error = (function (defaultMsg, status) {
    return function (msg) {
      this.defaultMessage = defaultMsg
      exports.HttpError.call(this, msg, status)

      if (status >= 500) { Error.captureStackTrace(this, arguments.callee) } // eslint-disable-line
    }
  })(defaultMsg, status)

  Util.inherits(error, exports.HttpError)

  var className = defaultMsg.replace(/\s/g, '')
  exports[className] = error
  exports[status] = error
}


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */
if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
  module.exports = __webpack_require__(60);
} else {
  module.exports = __webpack_require__(62);
}



/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
// eslint-disable-next-line complexity

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if (match === '%%') {
      return;
    }

    index++;

    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */


function log() {
  var _console;

  // This hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  var r;

  try {
    r = exports.storage.getItem('debug');
  } catch (error) {} // Swallow
  // XXX (@Qix-) should we be logging these?
  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */


function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

module.exports = __webpack_require__(9)(exports);
var formatters = module.exports.formatters;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};



/***/ }),
/* 61 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */
var tty = __webpack_require__(6);

var util = __webpack_require__(0);
/**
 * This is the Node.js implementation of `debug()`.
 */


exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
  // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
  // eslint-disable-next-line import/no-extraneous-dependencies
  var supportsColor = __webpack_require__(7);

  if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
    exports.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
  }
} catch (error) {} // Swallow - we only care if `supports-color` is available; it doesn't have to be.

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */


exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // Camel-case
  var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function (_, k) {
    return k.toUpperCase();
  }); // Coerce string value into JS value

  var val = process.env[key];

  if (/^(yes|on|true|enabled)$/i.test(val)) {
    val = true;
  } else if (/^(no|off|false|disabled)$/i.test(val)) {
    val = false;
  } else if (val === 'null') {
    val = null;
  } else {
    val = Number(val);
  }

  obj[prop] = val;
  return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  var name = this.namespace,
      useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = "\x1B[3" + (c < 8 ? c : '8;5;' + c);
    var prefix = "  ".concat(colorCode, ";1m").concat(name, " \x1B[0m");
    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + "\x1B[0m");
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  }

  return new Date().toISOString() + ' ';
}
/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */


function log() {
  return process.stderr.write(util.format.apply(util, arguments) + '\n');
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  if (namespaces) {
    process.env.DEBUG = namespaces;
  } else {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */


function init(debug) {
  debug.inspectOpts = {};
  var keys = Object.keys(exports.inspectOpts);

  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

module.exports = __webpack_require__(9)(exports);
var formatters = module.exports.formatters;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts).replace(/\s*\n\s*/g, ' ');
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */


formatters.O = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};



/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = {"authorization":{"get-grants":{"url":"/applications/grants","method":"GET","params":{"$page":null,"$per_page":null},"description":"List your grants."},"get-grant":{"url":"/applications/grants/:id","method":"GET","params":{"$id":null,"$page":null,"$per_page":null},"description":"Get a single grant."},"delete-grant":{"url":"/applications/grants/:id","method":"DELETE","params":{"$id":null},"description":"Delete a grant."},"get-all":{"url":"/authorizations","method":"GET","params":{"$page":null,"$per_page":null},"description":"List your authorizations."},"get":{"url":"/authorizations/:id","method":"GET","params":{"$id":null},"description":"Get a single authorization."},"create":{"url":"/authorizations","method":"POST","params":{"$scopes":null,"$note":null,"$note_url":null,"$client_id":null,"client_secret":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The 40 character OAuth app client secret for which to create the token."},"$fingerprint":null},"description":"Create a new authorization."},"get-or-create-authorization-for-app":{"url":"/authorizations/clients/:client_id","method":"PUT","params":{"$client_id":null,"client_secret":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The 40 character OAuth app client secret associated with the client ID specified in the URL."},"$scopes":null,"$note":null,"$note_url":null,"$fingerprint":null},"description":"Get or create an authorization for a specific app."},"get-or-create-authorization-for-app-and-fingerprint":{"url":"/authorizations/clients/:client_id/:fingerprint","method":"PUT","params":{"$client_id":null,"$fingerprint":null,"client_secret":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The 40 character OAuth app client secret associated with the client ID specified in the URL."},"$scopes":null,"$note":null,"$note_url":null},"description":"Get or create an authorization for a specific app and fingerprint."},"update":{"url":"/authorizations/:id","method":"PATCH","params":{"$id":null,"$scopes":null,"add_scopes":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"A list of scopes to add to this authorization."},"remove_scopes":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"A list of scopes to remove from this authorization."},"$note":null,"$note_url":null,"$fingerprint":null},"description":"Update an existing authorization."},"delete":{"url":"/authorizations/:id","method":"DELETE","params":{"$id":null},"description":"Delete an authorization."},"check":{"url":"/applications/:client_id/tokens/:access_token","method":"GET","params":{"$client_id":null,"$access_token":null},"description":"Check an authorization"},"reset":{"url":"/applications/:client_id/tokens/:access_token","method":"POST","params":{"$client_id":null,"$access_token":null},"description":"Reset an authorization"},"revoke":{"url":"/applications/:client_id/tokens/:access_token","method":"DELETE","params":{"$client_id":null,"$access_token":null},"description":"Revoke an authorization for an application"},"revoke-grant":{"url":"/applications/:client_id/grants/:access_token","method":"DELETE","params":{"$client_id":null,"$access_token":null},"description":"Revoke a grant for an application"}},"activity":{"get-events":{"url":"/events","method":"GET","params":{"$page":null,"$per_page":null},"description":"List public events"},"get-events-for-repo":{"url":"/repos/:owner/:repo/events","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"List repository events"},"get-events-for-repo-issues":{"url":"/repos/:owner/:repo/issues/events","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"List issue events for a repository"},"get-events-for-repo-network":{"url":"/networks/:owner/:repo/events","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"List public events for a network of repositories"},"get-events-for-org":{"url":"/orgs/:org/events","method":"GET","params":{"$org":null,"$page":null,"$per_page":null},"description":"List public events for an organization"},"get-events-received":{"url":"/users/:username/received_events","method":"GET","params":{"$username":null,"$page":null,"$per_page":null},"description":"List events that a user has received"},"get-events-received-public":{"url":"/users/:username/received_events/public","method":"GET","params":{"$username":null,"$page":null,"$per_page":null},"description":"List public events that a user has received"},"get-events-for-user":{"url":"/users/:username/events","method":"GET","params":{"$username":null,"$page":null,"$per_page":null},"description":"List events performed by a user"},"get-events-for-user-public":{"url":"/users/:username/events/public","method":"GET","params":{"$username":null,"$page":null,"$per_page":null},"description":"List public events performed by a user"},"get-events-for-user-org":{"url":"/users/:username/events/orgs/:org","method":"GET","params":{"$username":null,"$org":null,"$page":null,"$per_page":null},"description":"List events for a user's organization"},"get-feeds":{"url":"/feeds","method":"GET","params":{},"description":"Get all feeds available for the authenticated user."},"get-notifications":{"url":"/notifications","method":"GET","params":{"all":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"If true, show notifications marked as read. Default: false","default":"false"},"participating":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"If true, only shows notifications in which the user is directly participating or mentioned. Default: false","default":"false"},"$since":null,"before":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Only show notifications updated before the given time. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ."}},"description":"Get all notifications for the current user, grouped by repository."},"get-notifications-for-user":{"url":"/repos/:owner/:repo/notifications","method":"GET","params":{"$owner":null,"$repo":null,"all":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"If true, show notifications marked as read. Default: false","default":"false"},"participating":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"If true, only shows notifications in which the user is directly participating or mentioned. Default: false","default":"false"},"$since":null,"before":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Only show notifications updated before the given time. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ."}},"description":"Get all notifications for the given user."},"mark-notifications-as-read":{"url":"/notifications","method":"PUT","params":{"last_read_at":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Describes the last point that notifications were checked. Anything updated since this time will not be updated. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. Default: Time.now","default":"Time.now"}},"description":"Mark notifications as read for authenticated user."},"mark-notifications-as-read-for-repo":{"url":"/repos/:owner/:repo/notifications","method":"PUT","params":{"$owner":null,"$repo":null,"last_read_at":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Describes the last point that notifications were checked. Anything updated since this time will not be updated. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. Default: Time.now","default":"Time.now"}},"description":"Mark notifications in a repo as read."},"get-notification-thread":{"url":"/notifications/threads/:id","method":"GET","params":{"$id":null},"description":"View a single notification thread."},"mark-notification-thread-as-read":{"url":"/notifications/threads/:id","method":"PATCH","params":{"$id":null},"description":"Mark a notification thread as read."},"check-notification-thread-subscription":{"url":"/notifications/threads/:id/subscription","method":"GET","params":{"$id":null},"description":"Check to see if the current user is subscribed to a thread."},"set-notification-thread-subscription":{"url":"/notifications/threads/:id/subscription","method":"PUT","params":{"$id":null,"subscribed":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Determines if notifications should be received from this thread"},"ignored":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Determines if all notifications should be blocked from this thread"}},"description":"This lets you subscribe or unsubscribe from a conversation. Unsubscribing from a conversation mutes all future notifications (until you comment or get @mentioned once more)."},"delete-notification-thread-subscription":{"url":"/notifications/threads/:id/subscription","method":"DELETE","params":{"$id":null},"description":"Delete a notification thread subscription."},"get-stargazers-for-repo":{"url":"/repos/:owner/:repo/stargazers","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"List Stargazers"},"get-starred-repos-for-user":{"url":"/users/:username/starred","method":"GET","params":{"$username":null,"sort":{"type":"String","required":false,"validation":"^(created|updated)$","invalidmsg":"created or updated (when it was last pushed to); default: created.","description":"","enum":["created","updated"],"default":"created"},"$direction":null,"$page":null,"$per_page":null},"description":"List repositories being starred by a user"},"get-starred-repos":{"url":"/user/starred","method":"GET","params":{"sort":{"type":"String","required":false,"validation":"^(created|updated)$","invalidmsg":"created or updated (when it was last pushed to); default: created.","description":"","enum":["created","updated"],"default":"created"},"$direction":null,"$page":null,"$per_page":null},"description":"List repositories being starred by the authenticated user"},"check-starring-repo":{"url":"/user/starred/:owner/:repo","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"Check if you are starring a repository"},"star-repo":{"url":"/user/starred/:owner/:repo","method":"PUT","params":{"$owner":null,"$repo":null},"description":"Star a repository"},"unstar-repo":{"url":"/user/starred/:owner/:repo","method":"DELETE","params":{"$owner":null,"$repo":null},"description":"Unstar a repository"},"get-watchers-for-repo":{"url":"/repos/:owner/:repo/subscribers","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"Get watchers for repository."},"get-watched-repos-for-user":{"url":"/users/:username/subscriptions","method":"GET","params":{"$username":null,"$page":null,"$per_page":null},"description":"List repositories being watched by a user."},"get-watched-repos":{"url":"/user/subscriptions","method":"GET","params":{"$page":null,"$per_page":null},"description":"List repositories being watched by the authenticated user."},"get-repo-subscription":{"url":"/repos/:owner/:repo/subscription","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"Get a Repository Subscription."},"set-repo-subscription":{"url":"/repos/:owner/:repo/subscription","method":"PUT","params":{"$owner":null,"$repo":null,"subscribed":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Determines if notifications should be received from this repository."},"ignored":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Determines if all notifications should be blocked from this repository."}},"description":"Set a Repository Subscription"},"unwatch-repo":{"url":"/repos/:owner/:repo/subscription","method":"DELETE","params":{"$owner":null,"$repo":null},"description":"Unwatch a repository."}},"gists":{"get-for-user":{"url":"/users/:username/gists","method":"GET","params":{"$username":null,"$since":null,"$page":null,"$per_page":null},"description":"List a user's gists"},"get-all":{"url":"/gists","method":"GET","params":{"$since":null,"$page":null,"$per_page":null},"description":"List the authenticated user's gists or if called anonymously, this will return all public gists"},"get-public":{"url":"/gists/public","method":"GET","params":{"$since":null},"description":"List all public gists"},"get-starred":{"url":"/gists/starred","method":"GET","params":{"$since":null},"description":"List the authenticated user's starred gists"},"get":{"url":"/gists/:id","method":"GET","params":{"$id":null},"description":"Get a single gist"},"get-revision":{"url":"/gists/:id/:sha","method":"GET","params":{"$id":null,"$sha":null},"description":"Get a specific revision of a gist"},"create":{"url":"/gists","method":"POST","params":{"$files":null,"$description":null,"public":{"type":"Boolean","required":true,"validation":"","invalidmsg":"","description":""}},"description":"Create a gist"},"edit":{"url":"/gists/:id","method":"PATCH","params":{"$id":null,"$description":null,"$files":null,"content":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Updated file contents."},"filename":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"New name for this file."}},"description":"Edit a gist"},"get-commits":{"url":"/gists/:id/commits","method":"GET","params":{"$id":null},"description":"List gist commits"},"star":{"url":"/gists/:id/star","method":"PUT","params":{"$id":null},"description":"Star a gist"},"unstar":{"url":"/gists/:id/star","method":"DELETE","params":{"$id":null},"description":"Unstar a gist"},"check-star":{"url":"/gists/:id/star","method":"GET","params":{"$id":null},"description":"Check if a gist is starred"},"fork":{"url":"/gists/:id/forks","method":"POST","params":{"$id":null},"description":"Fork a gist"},"get-forks":{"url":"/gists/:id/forks","method":"GET","params":{"$id":null,"$page":null,"$per_page":null},"description":"List gist forks"},"delete":{"url":"/gists/:id","method":"DELETE","params":{"$id":null},"description":"Delete a gist"},"get-comments":{"url":"/gists/:gist_id/comments","method":"GET","params":{"$gist_id":null},"description":"List comments on a gist"},"get-comment":{"url":"/gists/:gist_id/comments/:id","method":"GET","params":{"$gist_id":null,"$id":null},"description":"Get a single comment"},"create-comment":{"url":"/gists/:gist_id/comments","method":"POST","params":{"$gist_id":null,"$body":null},"description":"Create a comment"},"edit-comment":{"url":"/gists/:gist_id/comments/:id","method":"PATCH","params":{"$gist_id":null,"$id":null,"$body":null},"description":"Edit a comment"},"delete-comment":{"url":"/gists/:gist_id/comments/:id","method":"DELETE","params":{"$gist_id":null,"$id":null},"description":"Delete a comment"}},"gitdata":{"get-blob":{"url":"/repos/:owner/:repo/git/blobs/:sha","method":"GET","params":{"$owner":null,"$repo":null,"$sha":null,"$page":null,"$per_page":null},"description":"Get a Blob"},"create-blob":{"url":"/repos/:owner/:repo/git/blobs","method":"POST","params":{"$owner":null,"$repo":null,"content":{"type":"String","required":true,"allow-empty":true,"validation":"","invalidmsg":"","description":""},"encoding":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""}},"description":"Create a Blob"},"get-commit":{"url":"/repos/:owner/:repo/git/commits/:sha","method":"GET","params":{"$owner":null,"$repo":null,"$sha":null},"description":"Get a Commit"},"create-commit":{"url":"/repos/:owner/:repo/git/commits","method":"POST","params":{"$owner":null,"$repo":null,"message":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"String of the commit message"},"tree":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"String of the SHA of the tree object this commit points to"},"parents":{"type":"Array","required":true,"validation":"","invalidmsg":"","description":"Array of the SHAs of the commits that were the parents of this commit. If omitted or empty, the commit will be written as a root commit. For a single parent, an array of one SHA should be provided, for a merge commit, an array of more than one should be provided."},"author":{"type":"Json","required":false,"validation":"","invalidmsg":"","description":""},"committer":{"type":"Json","required":false,"validation":"","invalidmsg":"","description":""}},"description":"Create a Commit"},"get-commit-signature-verification":{"url":"/repos/:owner/:repo/git/commits/:sha","method":"GET","params":{"$owner":null,"$repo":null,"$sha":null},"description":"Get a Commit Signature Verification. (In preview period. See README.)"},"get-reference":{"url":"/repos/:owner/:repo/git/refs/:ref","method":"GET","params":{"$owner":null,"$repo":null,"$ref":null},"description":"Get a Reference"},"get-references":{"url":"/repos/:owner/:repo/git/refs","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"Get all References"},"get-tags":{"url":"/repos/:owner/:repo/git/refs/tags","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"Get all tag References"},"create-reference":{"url":"/repos/:owner/:repo/git/refs","method":"POST","params":{"$owner":null,"$repo":null,"ref":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The name of the fully qualified reference (ie: refs/heads/master). If it doesn't start with 'refs' and have at least two slashes, it will be rejected. NOTE: After creating the reference, on calling (get|update|delete)Reference, drop the leading 'refs/' when providing the 'ref' param."},"$sha":null},"description":"Create a Reference"},"update-reference":{"url":"/repos/:owner/:repo/git/refs/:ref","method":"PATCH","params":{"$owner":null,"$repo":null,"$ref":null,"$sha":null,"force":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Boolean indicating whether to force the update or to make sure the update is a fast-forward update. The default is false, so leaving this out or setting it to false will make sure you’re not overwriting work.","default":"false"}},"description":"Update a Reference"},"delete-reference":{"url":"/repos/:owner/:repo/git/refs/:ref","method":"DELETE","params":{"$owner":null,"$repo":null,"$ref":null},"description":"Delete a Reference"},"get-tag":{"url":"/repos/:owner/:repo/git/tags/:sha","method":"GET","params":{"$owner":null,"$repo":null,"$sha":null},"description":"Get a Tag"},"create-tag":{"url":"/repos/:owner/:repo/git/tags","method":"POST","params":{"$owner":null,"$repo":null,"tag":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"String of the tag"},"message":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"String of the tag message"},"object":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"String of the SHA of the git object this is tagging"},"type":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"String of the type of the object we’re tagging. Normally this is a commit but it can also be a tree or a blob."},"tagger":{"type":"Json","required":true,"validation":"","invalidmsg":"","description":"JSON object that contains the following keys: `name` - String of the name of the author of the tag, `email` - String of the email of the author of the tag, `date` - Timestamp of when this object was tagged"}},"description":"Create a Tag Object"},"get-tag-signature-verification":{"url":"/repos/:owner/:repo/git/tags/:sha","method":"GET","params":{"$owner":null,"$repo":null,"$sha":null},"description":"Get a Tag Signature Verification. (In preview period. See README.)"},"get-tree":{"url":"/repos/:owner/:repo/git/trees/:sha","method":"GET","params":{"$owner":null,"$repo":null,"$sha":null,"recursive":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":""}},"description":"Get a Tree"},"create-tree":{"url":"/repos/:owner/:repo/git/trees","method":"POST","params":{"$owner":null,"$repo":null,"tree":{"type":"Json","required":true,"validation":"","invalidmsg":"","description":"Array of Hash objects (of path, mode, type and sha) specifying a tree structure"},"base_tree":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"String of the SHA1 of the tree you want to update with new data"}},"description":"Create a Tree"}},"integrations":{"get-installations":{"url":"/app/installations","method":"GET","params":{"$page":null,"$per_page":null},"deprecated":"`integrations` has been renamed to `apps`","description":"List the app's installations. (In preview period. See README.)"},"create-installation-token":{"url":"/installations/:installation_id/access_tokens","method":"POST","params":{"$installation_id":null,"user_id":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The id of the user for whom the app is acting on behalf of."}},"deprecated":"`integrations` has been renamed to `apps`","description":"Create a new installation token. (In preview period. See README.)"},"get-installation-repositories":{"url":"/installation/repositories","method":"GET","params":{"user_id":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The integer ID of a user, to filter results to repositories that are visible to both the installation and the given user."}},"deprecated":"`integrations` has been renamed to `apps`","description":"List repositories that are accessible to the authenticated installation. (In preview period. See README.)"},"add-repo-to-installation":{"url":"/installations/:installation_id/repositories/:repository_id","method":"PUT","params":{"$installation_id":null,"$repository_id":null},"deprecated":"`integrations` has been renamed to `apps`","description":"Add a single repository to an installation. (In preview period. See README.)"},"remove-repo-from-installation":{"url":"/installations/:installation_id/repositories/:repository_id","method":"DELETE","params":{"$installation_id":null,"$repository_id":null},"deprecated":"`integrations` has been renamed to `apps`","description":"Remove a single repository from an installation. (In preview period. See README.)"}},"apps":{"get-for-slug":{"url":"/apps/:app_slug","method":"GET","params":{"app_slug":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The URL-friendly name of your GitHub App. You can find this on the settings page for your GitHub App (e.g., https://github.com/settings/apps/:app_slug)."}},"description":"Get a single GitHub App. (In preview period. See README.)"},"get":{"url":"/app","method":"GET","params":{},"description":"Get the authenticated GitHub App. (In preview period. See README.)"},"get-installations":{"url":"/app/installations","method":"GET","params":{"$page":null,"$per_page":null},"description":"List the app's installations. (In preview period. See README.)"},"get-installation":{"url":"/app/installations/:installation_id","method":"GET","params":{"$installation_id":null},"description":"Get a single installation. (In preview period. See README.)"},"create-installation-token":{"url":"/installations/:installation_id/access_tokens","method":"POST","params":{"$installation_id":null,"user_id":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The id of the user for whom the app is acting on behalf of."}},"description":"Create a new installation token. (In preview period. See README.)"},"get-installation-repositories":{"url":"/installation/repositories","method":"GET","params":{"user_id":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The integer ID of a user, to filter results to repositories that are visible to both the installation and the given user."}},"description":"List repositories that are accessible to the authenticated installation. (In preview period. See README.)"},"add-repo-to-installation":{"url":"/installations/:installation_id/repositories/:repository_id","method":"PUT","params":{"$installation_id":null,"$repository_id":null},"description":"Add a single repository to an installation. (In preview period. See README.)"},"remove-repo-from-installation":{"url":"/installations/:installation_id/repositories/:repository_id","method":"DELETE","params":{"$installation_id":null,"$repository_id":null},"description":"Remove a single repository from an installation. (In preview period. See README.)"},"get-marketplace-listing-plans":{"url":"/marketplace_listing/plans","method":"GET","params":{"$page":null,"$per_page":null},"description":"List all plans for your Marketplace listing. (In preview period. See README.)"},"get-marketplace-listing-stubbed-plans":{"url":"/marketplace_listing/stubbed/plans","method":"GET","params":{"$page":null,"$per_page":null},"description":"List all stubbed plans for your Marketplace listing. (In preview period. See README.)"},"get-marketplace-listing-plan-accounts":{"url":"/marketplace_listing/plans/:id/accounts","method":"GET","params":{"$id":null,"$page":null,"$per_page":null},"description":"List all GitHub accounts (user or organization) on a specific plan. (In preview period. See README.)"},"get-marketplace-listing-stubbed-plan-accounts":{"url":"/marketplace_listing/stubbed/plans/:id/accounts","method":"GET","params":{"$id":null,"$page":null,"$per_page":null},"description":"List all GitHub accounts (user or organization) on a specific stubbed plan. (In preview period. See README.)"},"check-marketplace-listing-account":{"url":"/marketplace_listing/accounts/:id","method":"GET","params":{"$id":null},"description":"Check if a GitHub account is associated with any Marketplace listing. (In preview period. See README.)"},"check-marketplace-listing-stubbed-account":{"url":"/marketplace_listing/stubbed/accounts/:id","method":"GET","params":{"$id":null},"description":"Check if a stubbed GitHub account is associated with any Marketplace listing. (In preview period. See README.)"}},"issues":{"get-all":{"url":"/issues","method":"GET","params":{"filter":{"type":"String","required":false,"validation":"^(all|assigned|created|mentioned|subscribed)$","invalidmsg":"","description":"","enum":["all","assigned","created","mentioned","subscribed"]},"state":{"type":"String","required":false,"validation":"^(open|closed|all)$","invalidmsg":"open, closed, all, default: open","description":"open, closed, or all","enum":["open","closed","all"],"default":"open"},"labels":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"String list of comma separated Label names. Example: bug,ui,@high"},"sort":{"type":"String","required":false,"validation":"^(created|updated|comments)$","invalidmsg":"created, updated, comments, default: created.","description":"","enum":["created","updated","comments"],"default":"created"},"$direction":null,"$since":null,"$page":null,"$per_page":null},"description":"List all issues across all the authenticated user's visible repositories including owned repositories, member repositories, and organization repositories"},"get-for-user":{"url":"/user/issues","method":"GET","params":{"filter":{"type":"String","required":false,"validation":"^(all|assigned|created|mentioned|subscribed)$","invalidmsg":"","description":"","enum":["all","assigned","created","mentioned","subscribed"]},"state":{"type":"String","required":false,"validation":"^(open|closed|all)$","invalidmsg":"open, closed, all, default: open","description":"open, closed, or all","enum":["open","closed","all"],"default":"open"},"labels":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"String list of comma separated Label names. Example: bug,ui,@high"},"sort":{"type":"String","required":false,"validation":"^(created|updated|comments)$","invalidmsg":"created, updated, comments, default: created.","description":"","enum":["created","updated","comments"],"default":"created"},"$direction":null,"$since":null,"$page":null,"$per_page":null},"description":"List all issues across owned and member repositories for the authenticated user"},"get-for-org":{"url":"/orgs/:org/issues","method":"GET","params":{"$org":null,"filter":{"type":"String","required":false,"validation":"^(all|assigned|created|mentioned|subscribed)$","invalidmsg":"","description":"","enum":["all","assigned","created","mentioned","subscribed"]},"state":{"type":"String","required":false,"validation":"^(open|closed|all)$","invalidmsg":"open, closed, all, default: open","description":"open, closed, or all","enum":["open","closed","all"],"default":"open"},"labels":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"String list of comma separated Label names. Example: bug,ui,@high"},"sort":{"type":"String","required":false,"validation":"^(created|updated|comments)$","invalidmsg":"created, updated, comments, default: created.","description":"","enum":["created","updated","comments"],"default":"created"},"$direction":null,"$since":null,"$page":null,"$per_page":null},"description":"List all issues for a given organization for the authenticated user"},"get-for-repo":{"url":"/repos/:owner/:repo/issues","method":"GET","params":{"$owner":null,"$repo":null,"milestone":{"type":"String","required":false,"validation":"^([0-9]+|none|\\*)$","invalidmsg":"","description":""},"state":{"type":"String","required":false,"validation":"^(open|closed|all)$","invalidmsg":"open, closed, all, default: open","description":"open, closed, or all","enum":["open","closed","all"],"default":"open"},"assignee":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"String User login, `none` for Issues with no assigned User. `*` for Issues with any assigned User."},"creator":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The user that created the issue."},"mentioned":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"String User login."},"labels":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"String list of comma separated Label names. Example: bug,ui,@high"},"sort":{"type":"String","required":false,"validation":"^(created|updated|comments)$","invalidmsg":"created, updated, comments, default: created.","description":"","enum":["created","updated","comments"],"default":"created"},"$direction":null,"$since":null,"$page":null,"$per_page":null},"description":"List issues for a repository"},"get":{"url":"/repos/:owner/:repo/issues/:number","method":"GET","params":{"$owner":null,"$repo":null,"$number":null},"description":"Get a single issue"},"create":{"url":"/repos/:owner/:repo/issues","method":"POST","params":{"$owner":null,"$repo":null,"title":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"body":{"type":"String","required":false,"validation":"","invalidmsg":"","description":""},"assignee":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Login for the user that this issue should be assigned to."},"milestone":{"type":"Number","required":false,"validation":"^[0-9]+$","invalidmsg":"","description":"Milestone to associate this issue with."},"labels":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"Array of strings - Labels to associate with this issue."},"$assignees":null},"description":"Create an issue"},"edit":{"url":"/repos/:owner/:repo/issues/:number","method":"PATCH","params":{"$owner":null,"$repo":null,"$number":null,"title":{"type":"String","required":false,"validation":"","invalidmsg":"","description":""},"body":{"type":"String","required":false,"validation":"","invalidmsg":"","description":""},"assignee":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Login for the user that this issue should be assigned to."},"state":{"type":"String","required":false,"validation":"^(open|closed)$","invalidmsg":"open, closed, default: open","description":"open or closed","enum":["open","closed"],"default":"open"},"milestone":{"type":"Number","required":false,"validation":"^[0-9]+$","invalidmsg":"","description":"Milestone to associate this issue with."},"labels":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"Array of strings - Labels to associate with this issue."},"$assignees":null},"description":"Edit an issue"},"lock":{"url":"/repos/:owner/:repo/issues/:number/lock","method":"PUT","params":{"$owner":null,"$repo":null,"$number":null},"description":"Users with push access can lock an issue's conversation."},"unlock":{"url":"/repos/:owner/:repo/issues/:number/lock","method":"DELETE","params":{"$owner":null,"$repo":null,"$number":null},"description":"Users with push access can unlock an issue's conversation."},"get-assignees":{"url":"/repos/:owner/:repo/assignees","method":"GET","params":{"$owner":null,"$repo":null},"description":"List assignees"},"check-assignee":{"url":"/repos/:owner/:repo/assignees/:assignee","method":"GET","params":{"$owner":null,"$repo":null,"assignee":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"Login for the user that this issue should be assigned to."}},"description":"Check assignee"},"add-assignees-to-issue":{"url":"/repos/:owner/:repo/issues/:number/assignees","method":"POST","params":{"$owner":null,"$repo":null,"$number":null,"assignees":{"type":"Array","required":true,"validation":"","invalidmsg":"","description":"Logins for the users that should be added to the issue."}},"description":"Add assignees to an issue."},"remove-assignees-from-issue":{"url":"/repos/:owner/:repo/issues/:number/assignees","method":"DELETE","params":{"$owner":null,"$repo":null,"$number":null,"body":{"type":"Json","sendValueAsBody":true,"required":true,"validation":"","invalidmsg":"","description":""}},"description":"Remove assignees from an issue."},"get-comments":{"url":"/repos/:owner/:repo/issues/:number/comments","method":"GET","params":{"$owner":null,"$repo":null,"$number":null,"$since":null,"$page":null,"$per_page":null},"description":"List comments on an issue"},"get-comments-for-repo":{"url":"/repos/:owner/:repo/issues/comments","method":"GET","params":{"$owner":null,"$repo":null,"sort":{"type":"String","required":false,"validation":"^(created|updated)$","invalidmsg":"created, updated, default: created.","description":"","enum":["created","updated"],"default":"created"},"$direction":null,"$since":null,"$page":null,"$per_page":null},"description":"List comments in a repository"},"get-comment":{"url":"/repos/:owner/:repo/issues/comments/:id","method":"GET","params":{"$owner":null,"$repo":null,"$id":null},"description":"Get a single comment"},"create-comment":{"url":"/repos/:owner/:repo/issues/:number/comments","method":"POST","params":{"$owner":null,"$repo":null,"$number":null,"$body":null},"description":"Create a comment"},"edit-comment":{"url":"/repos/:owner/:repo/issues/comments/:id","method":"PATCH","params":{"$owner":null,"$repo":null,"$id":null,"$body":null},"description":"Edit a comment"},"delete-comment":{"url":"/repos/:owner/:repo/issues/comments/:id","method":"DELETE","params":{"$owner":null,"$repo":null,"$id":null},"description":"Delete a comment"},"get-events":{"url":"/repos/:owner/:repo/issues/:issue_number/events","method":"GET","params":{"$owner":null,"$repo":null,"$issue_number":null,"$page":null,"$per_page":null},"description":"List events for an issue"},"get-events-for-repo":{"url":"/repos/:owner/:repo/issues/events","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"List events for a repository"},"get-event":{"url":"/repos/:owner/:repo/issues/events/:id","method":"GET","params":{"$owner":null,"$repo":null,"$id":null},"description":"Get a single event"},"get-labels":{"url":"/repos/:owner/:repo/labels","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"List all labels for this repository"},"get-label":{"url":"/repos/:owner/:repo/labels/:name","method":"GET","params":{"$owner":null,"$repo":null,"$name":null},"description":"Get a single label"},"create-label":{"url":"/repos/:owner/:repo/labels","method":"POST","params":{"$owner":null,"$repo":null,"$name":null,"$color":null},"description":"Create a label"},"update-label":{"url":"/repos/:owner/:repo/labels/:oldname","method":"PATCH","params":{"$owner":null,"$repo":null,"oldname":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The old name of the label."},"name":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The new name of the label."},"$color":null},"description":"Update a label"},"delete-label":{"url":"/repos/:owner/:repo/labels/:name","method":"DELETE","params":{"$owner":null,"$repo":null,"$name":null},"description":"Delete a label"},"get-issue-labels":{"url":"/repos/:owner/:repo/issues/:number/labels","method":"GET","params":{"$owner":null,"$repo":null,"$number":null},"description":"List labels on an issue"},"add-labels":{"url":"/repos/:owner/:repo/issues/:number/labels","method":"POST","params":{"$owner":null,"$repo":null,"$number":null,"labels":{"type":"Array","sendValueAsBody":true,"required":true,"validation":"","invalidmsg":"","description":""}},"description":"Add labels to an issue"},"remove-label":{"url":"/repos/:owner/:repo/issues/:number/labels/:name","method":"DELETE","params":{"$owner":null,"$repo":null,"$number":null,"name":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""}},"description":"Remove a label from an issue"},"replace-all-labels":{"url":"/repos/:owner/:repo/issues/:number/labels","method":"PUT","params":{"$owner":null,"$repo":null,"$number":null,"labels":{"type":"Array","sendValueAsBody":true,"required":true,"validation":"","invalidmsg":"","description":"Sending an empty array ([]) will remove all Labels from the Issue."}},"description":"Replace all labels for an issue"},"remove-all-labels":{"url":"/repos/:owner/:repo/issues/:number/labels","method":"DELETE","params":{"$owner":null,"$repo":null,"$number":null},"description":"Remove all labels from an issue"},"get-milestone-labels":{"url":"/repos/:owner/:repo/milestones/:number/labels","method":"GET","params":{"$owner":null,"$repo":null,"$number":null},"description":"Get labels for every issue in a milestone"},"get-milestones":{"url":"/repos/:owner/:repo/milestones","method":"GET","params":{"$owner":null,"$repo":null,"$state":null,"sort":{"type":"String","required":false,"validation":"^(due_on|completeness)$","invalidmsg":"due_on, completeness, default: due_on","description":"due_on, completeness, default: due_on","enum":["due_on","completeness"],"default":"due_on"},"direction":{"type":"String","required":false,"validation":"^(asc|desc)$","invalidmsg":"asc or desc, default: asc.","description":"","enum":["asc","desc"],"default":"asc"},"$page":null,"$per_page":null},"description":"List milestones for a repository"},"get-milestone":{"url":"/repos/:owner/:repo/milestones/:number","method":"GET","params":{"$owner":null,"$repo":null,"$number":null},"description":"Get a single milestone"},"create-milestone":{"url":"/repos/:owner/:repo/milestones","method":"POST","params":{"$owner":null,"$repo":null,"title":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"$state":null,"$description":null,"due_on":{"type":"Date","required":false,"validation":"","invalidmsg":"Timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ","description":"Timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ"}},"description":"Create a milestone"},"update-milestone":{"url":"/repos/:owner/:repo/milestones/:number","method":"PATCH","params":{"$owner":null,"$repo":null,"$number":null,"title":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"$state":null,"$description":null,"due_on":{"type":"Date","required":false,"validation":"","invalidmsg":"Timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ","description":"Timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ"}},"description":"Update a milestone"},"delete-milestone":{"url":"/repos/:owner/:repo/milestones/:number","method":"DELETE","params":{"$owner":null,"$repo":null,"$number":null},"description":"Delete a milestone"},"get-events-timeline":{"url":"/repos/:owner/:repo/issues/:issue_number/timeline","method":"GET","params":{"$owner":null,"$repo":null,"$issue_number":null,"$page":null,"$per_page":null},"description":"List events for an issue. (In preview period. See README.)"}},"migrations":{"start-migration":{"url":"/orgs/:org/migrations","method":"POST","params":{"$org":null,"repositories":{"type":"Array","required":true,"validation":"","invalidmsg":"","description":"A list of arrays indicating which repositories should be migrated."},"lock_repositories":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Indicates whether repositories should be locked (to prevent manipulation) while migrating data. Default: false.","default":"false"},"exclude_attachments":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Indicates whether attachments should be excluded from the migration (to reduce migration archive file size). Default: false.","default":"false"}},"description":"Start a migration. (In preview period. See README.)"},"get-migrations":{"url":"/orgs/:org/migrations","method":"GET","params":{"$org":null,"$page":null,"$per_page":null},"description":"Get a list of migrations. (In preview period. See README.)"},"get-migration-status":{"url":"/orgs/:org/migrations/:id","method":"GET","params":{"$org":null,"$id":null},"description":"Get the status of a migration. (In preview period. See README.)"},"get-migration-archive-link":{"url":"/orgs/:org/migrations/:id/archive","method":"GET","params":{"$org":null,"$id":null},"description":"Get the URL to a migration archive. (In preview period. See README.)"},"delete-migration-archive":{"url":"/orgs/:org/migrations/:id/archive","method":"DELETE","params":{"$org":null,"$id":null},"description":"Delete a migration archive. (In preview period. See README.)"},"unlock-repo-locked-for-migration":{"url":"/orgs/:org/migrations/:id/repos/:repo_name/lock","method":"DELETE","params":{"$org":null,"$id":null,"repo_name":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""}},"description":"Unlock a repository that was locked for migration. (In preview period. See README.)"},"start-import":{"url":"/repos/:owner/:repo/import","method":"PUT","params":{"$owner":null,"$repo":null,"vcs_url":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The URL of the originating repository."},"vcs":{"type":"String","required":false,"validation":"^(subversion|git|mercurial|tfvc)$","invalidmsg":"subversion, git, mercurial, tfvc","description":"The originating VCS type. Please be aware that without this parameter, the import job will take additional time to detect the VCS type before beginning the import. This detection step will be reflected in the response.","enum":["subversion","git","mercurial","tfvc"]},"vcs_username":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"If authentication is required, the username to provide to vcs_url."},"vcs_password":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"If authentication is required, the password to provide to vcs_url."},"tfvc_project":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"For a tfvc import, the name of the project that is being imported."}},"description":"Start an import. (In preview period. See README.)"},"get-import-progress":{"url":"/repos/:owner/:repo/import","method":"GET","params":{"$owner":null,"$repo":null},"description":"Get import progress. (In preview period. See README.)"},"update-import":{"url":"/repos/:owner/:repo/import","method":"PATCH","params":{"$owner":null,"$repo":null},"vcs_username":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The username to provide to the originating repository."},"vcs_password":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The password to provide to the originating repository."},"description":"Update existing import. (In preview period. See README.)"},"get-import-commit-authors":{"url":"/repos/:owner/:repo/import/authors","method":"GET","params":{"$owner":null,"$repo":null,"since":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Only authors found after this id are returned. Provide the highest author ID you've seen so far. New authors may be added to the list at any point while the importer is performing the raw step."}},"description":"Get import commit authors. (In preview period. See README.)"},"map-import-commit-author":{"url":"/repos/:owner/:repo/import/authors/:author_id","method":"PATCH","params":{"$owner":null,"$repo":null,"author_id":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The commit author id."},"email":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The new Git author email."},"name":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The new Git author name."}},"description":"Map a commit author. (In preview period. See README.)"},"set-import-lfs-preference":{"url":"/:owner/:name/import/lfs","method":"PATCH","params":{"$owner":null,"$name":null,"use_lfs":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"Can be one of `opt_in` (large files will be stored using Git LFS) or `opt_out` (large files will be removed during the import)."}},"description":"Set import LFS preference. (In preview period. See README.)"},"get-large-import-files":{"url":"/:owner/:name/import/large_files","method":"GET","params":{"$owner":null,"$name":null},"description":"List files larger than 100MB found during the import. (In preview period. See README.)"},"cancel-import":{"url":"/repos/:owner/:repo/import","method":"DELETE","params":{"$owner":null,"$repo":null},"description":"Cancel an import. (In preview period. See README.)"}},"misc":{"get-codes-of-conduct":{"url":"/codes_of_conduct","method":"GET","params":{},"description":"List all codes of conduct. (In preview period. See README.)"},"get-code-of-conduct":{"url":"/codes_of_conduct/:key","method":"GET","params":{"key":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"Ex: contributor_covenant"}},"description":"Get an code of conduct. (In preview period. See README.)"},"get-repo-code-of-conduct":{"url":"/repos/:owner/:repo/community/code_of_conduct","method":"GET","params":{"$owner":null,"$repo":null},"description":"Get the contents of a repository's code of conduct. (In preview period. See README.)"},"get-emojis":{"url":"/emojis","method":"GET","params":{},"description":"Lists all the emojis available to use on GitHub."},"get-gitignore-templates":{"url":"/gitignore/templates","method":"GET","params":{},"description":"Lists available gitignore templates"},"get-gitignore-template":{"url":"/gitignore/templates/:name","method":"GET","params":{"name":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The name of the .gitignore template to get e.g. 'C'"}},"description":"Get a single gitignore template"},"get-licenses":{"url":"/licenses","method":"GET","params":{},"description":"List all licenses. (In preview period. See README.)"},"get-license":{"url":"/licenses/:license","method":"GET","params":{"license":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"Ex: /licenses/mit"}},"description":"Get an individual license. (In preview period. See README.)"},"get-repo-license":{"url":"/repos/:owner/:repo/license","method":"GET","params":{"$owner":null,"$repo":null},"description":"Get the contents of a repository's license. (In preview period. See README.)"},"render-markdown":{"url":"/markdown","method":"POST","params":{"text":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The Markdown text to render"},"mode":{"type":"String","required":false,"validation":"^(markdown|gfm)$","invalidmsg":"","description":"The rendering mode, `markdown` to render a document as plain Markdown, just like README files are rendered. `gfm` to render a document as user-content, e.g. like user comments or issues are rendered. In GFM mode, hard line breaks are always taken into account, and issue and user mentions are linked accordingly.","enum":["markdown","gfm"],"default":"markdown"},"context":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The repository context. Only taken into account when rendering as `gfm`"}},"description":"Render an arbitrary Markdown document"},"render-markdown-raw":{"url":"/markdown/raw","method":"POST","requestFormat":"raw","params":{"$data":null},"description":"Render a Markdown document in raw mode"},"get-meta":{"url":"/meta","method":"GET","params":{},"description":"This endpoint provides information about GitHub.com, the service. Or, if you access this endpoint on your organization's GitHub Enterprise installation, this endpoint provides information about that installation."},"get-rate-limit":{"url":"/rate_limit","method":"GET","params":{},"description":"Get your current rate limit status"}},"orgs":{"get-all":{"url":"/organizations","method":"GET","params":{"since":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The integer ID of the last Organization that you've seen."},"$page":null,"$per_page":null},"description":"List all organizations"},"get-for-user":{"url":"/users/:username/orgs","method":"GET","params":{"$username":null,"$page":null,"$per_page":null},"description":"List public organization memberships for the specified user."},"get":{"url":"/orgs/:org","method":"GET","params":{"$org":null,"$page":null,"$per_page":null},"description":"Get an organization"},"update":{"url":"/orgs/:org","method":"PATCH","params":{"$org":null,"billing_email":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Billing email address. This address is not publicized."},"company":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The company name."},"email":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The publicly visible email address."},"location":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The location."},"name":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The shorthand name of the company."},"description":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The description of the company."},"default_repository_permission":{"type":"String","required":false,"validation":"^(read|write|admin|none)$","invalidmsg":"read, write, admin, none, default: read","description":"Default permission level members have for organization repositories.","enum":["read","write","admin","none"],"default":"read"},"members_can_create_repositories":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Toggles ability of non-admin organization members to create repositories.","default":true}},"description":"Edit an organization"},"get-members":{"url":"/orgs/:org/members","method":"GET","params":{"$org":null,"filter":{"type":"String","required":false,"validation":"^(all|2fa_disabled)$","invalidmsg":"all, 2fa_disabled, default: all","description":"Filter members returned in the list.","enum":["all","2fa_disabled"],"default":"all"},"role":{"type":"String","required":false,"validation":"^(all|admin|member)$","invalidmsg":"all, admin, member, default: all","description":"Filter members returned by their role.","enum":["all","admin","member"],"default":"all"},"$page":null,"$per_page":null},"description":"Members list"},"check-membership":{"url":"/orgs/:org/members/:username","method":"GET","params":{"$org":null,"$username":null},"description":"Check membership"},"remove-member":{"url":"/orgs/:org/members/:username","method":"DELETE","params":{"$org":null,"$username":null},"description":"Remove a member"},"get-public-members":{"url":"/orgs/:org/public_members","method":"GET","params":{"$org":null},"description":"Public members list"},"check-public-membership":{"url":"/orgs/:org/public_members/:username","method":"GET","params":{"$org":null,"$username":null},"description":"Check public membership"},"publicize-membership":{"url":"/orgs/:org/public_members/:username","method":"PUT","params":{"$org":null,"$username":null},"description":"Publicize a user's membership"},"conceal-membership":{"url":"/orgs/:org/public_members/:username","method":"DELETE","params":{"$org":null,"$username":null},"description":"Conceal a user's membership"},"get-org-membership":{"url":"/orgs/:org/memberships/:username","method":"GET","params":{"$org":null,"$username":null},"description":"Get organization membership"},"add-org-membership":{"url":"/orgs/:org/memberships/:username","method":"PUT","params":{"$org":null,"$username":null,"role":{"type":"String","required":true,"validation":"^(admin|member)$","invalidmsg":"admin, member","description":"The role to give the user in the organization.","enum":["admin","member"],"default":"member"}},"description":"Add or update organization membership"},"remove-org-membership":{"url":"/orgs/:org/memberships/:username","method":"DELETE","params":{"$org":null,"$username":null},"description":"Remove organization membership"},"get-pending-org-invites":{"url":"/orgs/:org/invitations","method":"GET","params":{"$org":null},"description":"List pending organization invites."},"get-outside-collaborators":{"url":"/orgs/:org/outside_collaborators","method":"GET","params":{"$org":null,"filter":{"type":"String","required":false,"validation":"^(all|2fa_disabled)$","invalidmsg":"all, 2fa_disabled, default: all","description":"Filter the list of outside collaborators.","enum":["all","2fa_disabled"],"default":"all"},"$page":null,"$per_page":null},"description":"List all users who are outside collaborators of an organization."},"remove-outside-collaborator":{"url":"/orgs/:org/outside_collaborators/:username","method":"DELETE","params":{"$org":null,"$username":null},"description":"Remove outside collaborator."},"convert-member-to-outside-collaborator":{"url":"/orgs/:org/outside_collaborators/:username","method":"PUT","params":{"$org":null,"$username":null},"description":"Convert member to outside collaborator."},"get-teams":{"url":"/orgs/:org/teams","method":"GET","params":{"$org":null,"$page":null,"$per_page":null},"description":"List teams"},"get-team":{"url":"/teams/:id","method":"GET","params":{"$id":null},"description":"Get team"},"create-team":{"url":"/orgs/:org/teams","method":"POST","params":{"$org":null,"$name":null,"description":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The description of the team."},"maintainers":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"The logins of organization members to add as maintainers of the team."},"repo_names":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"The full name (e.g., \"organization-name/repository-name\") of repositories to add the team to."},"$privacy":null,"parent_team_id":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The ID of a team to set as the parent team."}},"description":"Create team"},"edit-team":{"url":"/teams/:id","method":"PATCH","params":{"$id":null,"$name":null,"description":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The description of the team."},"$privacy":null,"parent_team_id":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The ID of a team to set as the parent team."}},"description":"Edit team"},"delete-team":{"url":"/teams/:id","method":"DELETE","params":{"$id":null},"description":"Delete team"},"get-team-members":{"url":"/teams/:id/members","method":"GET","params":{"$id":null,"role":{"type":"String","required":false,"validation":"^(member|maintainer|all)$","invalidmsg":"member, maintainer, all, default: all","description":"Filters members returned by their role in the team.","enum":["member","maintainer","all"],"default":"all"},"$page":null,"$per_page":null},"description":"List team members"},"get-child-teams":{"url":"/teams/:id/teams","method":"GET","params":{"$id":null,"$page":null,"$per_page":null},"description":"List child teams"},"get-team-membership":{"url":"/teams/:id/memberships/:username","method":"GET","params":{"$id":null,"$username":null},"description":"Get team membership"},"add-team-membership":{"url":"/teams/:id/memberships/:username","method":"PUT","params":{"$id":null,"$username":null,"role":{"type":"String","required":false,"validation":"^(member|maintainer)$","invalidmsg":"member, maintainer, default: member","description":"The role that this user should have in the team.","enum":["member","maintainer"],"default":"member"}},"description":"Add team membership"},"remove-team-membership":{"url":"/teams/:id/memberships/:username","method":"DELETE","params":{"$id":null,"$username":null},"description":"Remove team membership"},"get-team-repos":{"url":"/teams/:id/repos","method":"GET","params":{"$id":null,"$page":null,"$per_page":null},"description":"Get team repos"},"get-pending-team-invites":{"url":"/teams/:id/invitations","method":"GET","params":{"$id":null,"$page":null,"$per_page":null},"description":"List pending team invitations."},"check-team-repo":{"url":"/teams/:id/repos/:owner/:repo","method":"GET","params":{"$id":null,"$owner":null,"$repo":null},"description":"Check if a team manages a repository"},"add-team-repo":{"url":"/teams/:id/repos/:org/:repo","method":"PUT","params":{"$id":null,"$org":null,"$repo":null,"permission":{"type":"String","required":false,"validation":"^(pull|push|admin)$","invalidmsg":"","description":"`pull` - team members can pull, but not push or administer this repository, `push` - team members can pull and push, but not administer this repository, `admin` - team members can pull, push and administer this repository.","enum":["pull","push","admin"]}},"description":"Add team repository"},"delete-team-repo":{"url":"/teams/:id/repos/:owner/:repo","method":"DELETE","params":{"$id":null,"$owner":null,"$repo":null},"description":"Remove team repository"},"get-hooks":{"url":"/orgs/:org/hooks","method":"GET","params":{"$org":null,"$page":null,"$per_page":null},"description":"List hooks"},"get-hook":{"url":"/orgs/:org/hooks/:id","method":"GET","params":{"$org":null,"$id":null},"description":"Get single hook"},"create-hook":{"url":"/orgs/:org/hooks","method":"POST","params":{"$org":null,"name":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"Must be passed as \"web\"."},"config":{"type":"Json","required":true,"validation":"","invalidmsg":"","description":"Key/value pairs to provide settings for this webhook"},"events":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"Determines what events the hook is triggered for. Default: [\"push\"].","default":"[\"push\"]"},"active":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Determines whether the hook is actually triggered on pushes."}},"description":"Create a hook"},"edit-hook":{"url":"/orgs/:org/hooks/:id","method":"PATCH","params":{"$org":null,"$id":null,"config":{"type":"Json","required":true,"validation":"","invalidmsg":"","description":"Key/value pairs to provide settings for this webhook"},"events":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"Determines what events the hook is triggered for. Default: [\"push\"].","default":"[\"push\"]"},"active":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Determines whether the hook is actually triggered on pushes."}},"description":"Edit a hook"},"ping-hook":{"url":"/orgs/:org/hooks/:id/pings","method":"POST","params":{"$org":null,"$id":null},"description":"Ping a hook"},"delete-hook":{"url":"/orgs/:org/hooks/:id","method":"DELETE","params":{"$org":null,"$id":null},"description":"Delete a hook"},"get-blocked-users":{"url":"/orgs/:org/blocks","method":"GET","params":{"$org":null,"$page":null,"$per_page":null},"description":"List blocked users. (In preview period. See README.)"},"check-blocked-user":{"url":"/orgs/:org/blocks/:username","method":"GET","params":{"$org":null,"$username":null},"description":"Check whether you've blocked a user. (In preview period. See README.)"},"block-user":{"url":"/orgs/:org/blocks/:username","method":"PUT","params":{"$org":null,"$username":null},"description":"Block a user. (In preview period. See README.)"},"unblock-user":{"url":"/orgs/:org/blocks/:username","method":"DELETE","params":{"$org":null,"$username":null},"description":"Unblock a user. (In preview period. See README.)"}},"projects":{"get-repo-projects":{"url":"/repos/:owner/:repo/projects","method":"GET","params":{"$owner":null,"$repo":null,"$state":null},"description":"List repository projects. (In preview period. See README.)"},"get-org-projects":{"url":"/orgs/:org/projects","method":"GET","params":{"$org":null,"$state":null},"description":"List organization projects. (In preview period. See README.)"},"get-project":{"url":"/projects/:id","method":"GET","params":{"$id":null},"description":"Get a project. (In preview period. See README.)"},"create-repo-project":{"url":"/repos/:owner/:repo/projects","method":"POST","params":{"$owner":null,"$repo":null,"$name":null,"body":{"type":"String","required":false,"validation":"","invalidmsg":"","description":""}},"description":"Create a repository project. (In preview period. See README.)"},"create-org-project":{"url":"/orgs/:org/projects","method":"POST","params":{"$org":null,"$name":null,"body":{"type":"String","required":false,"validation":"","invalidmsg":"","description":""}},"description":"Create an organization project. (In preview period. See README.)"},"update-project":{"url":"/projects/:id","method":"PATCH","params":{"$id":null,"$name":null,"body":{"type":"String","required":false,"validation":"","invalidmsg":"","description":""},"$state":null},"description":"Update a project. (In preview period. See README.)"},"delete-project":{"url":"/projects/:id","method":"DELETE","params":{"$id":null},"description":"Delete a project. (In preview period. See README.)"},"get-project-cards":{"url":"/projects/columns/:column_id/cards","method":"GET","params":{"$column_id":null},"description":"List project cards. (In preview period. See README.)"},"get-project-card":{"url":"/projects/columns/cards/:id","method":"GET","params":{"$id":null},"description":"Get project card. (In preview period. See README.)"},"create-project-card":{"url":"/projects/columns/:column_id/cards","method":"POST","params":{"$column_id":null,"note":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The note of the card."},"content_id":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The id of the Issue or Pull Request to associate with this card."},"content_type":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The type of content to associate with this card. Can be either 'Issue' or 'PullRequest'."}},"description":"Create a project card. (In preview period. See README.)"},"update-project-card":{"url":"/projects/columns/cards/:id","method":"PATCH","params":{"$id":null,"note":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The note of the card."}},"description":"Update a project card. (In preview period. See README.)"},"delete-project-card":{"url":"/projects/columns/cards/:id","method":"DELETE","params":{"$id":null},"description":"Delete a project card. (In preview period. See README.)"},"move-project-card":{"url":"/projects/columns/cards/:id/moves","method":"POST","params":{"$id":null,"position":{"type":"String","required":true,"validation":"^(top|bottom|after:\\d+)$","invalidmsg":"","description":"Can be one of top, bottom, or after:<card-id>, where <card-id> is the id value of a card in the same project."},"column_id":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The id value of a column in the same project."}},"description":"Move a project card. (In preview period. See README.)"},"get-project-columns":{"url":"/projects/:project_id/columns","method":"GET","params":{"$project_id":null},"description":"List project columns. (In preview period. See README.)"},"get-project-column":{"url":"/projects/columns/:id","method":"GET","params":{"$id":null},"description":"Get a project column. (In preview period. See README.)"},"create-project-column":{"url":"/projects/:project_id/columns","method":"POST","params":{"$project_id":null,"$name":null},"description":"Create a project column. (In preview period. See README.)"},"update-project-column":{"url":"/projects/columns/:id","method":"PATCH","params":{"$id":null,"$name":null},"description":"Update a project column. (In preview period. See README.)"},"delete-project-column":{"url":"/projects/columns/:id","method":"DELETE","params":{"$id":null},"description":"Delete a project column. (In preview period. See README.)"},"move-project-column":{"url":"/projects/columns/:id/moves","method":"POST","params":{"$id":null,"position":{"type":"String","required":true,"validation":"^(first|last|after:\\d+)$","invalidmsg":"","description":"Can be one of first, last, or after:<column-id>, where <column-id> is the id value of a column in the same project."}},"description":"Move a project column. (In preview period. See README.)"}},"pull-requests":{"get-all":{"url":"/repos/:owner/:repo/pulls","method":"GET","params":{"$owner":null,"$repo":null,"$state":null,"head":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Filter pulls by head user and branch name in the format of user:ref-name. Example: github:new-script-format."},"base":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Filter pulls by base branch name. Example: gh-pages."},"sort":{"type":"String","required":false,"validation":"^(created|updated|popularity|long-running)$","invalidmsg":"Possible values are: `created`, `updated`, `popularity`, `long-running`, Default: `created`","description":"Possible values are: `created`, `updated`, `popularity`, `long-running`, Default: `created`","enum":["created","updated","popularity","long-running"],"default":"created"},"$direction":null,"$page":null,"$per_page":null},"description":"List pull requests"},"get":{"url":"/repos/:owner/:repo/pulls/:number","method":"GET","params":{"$owner":null,"$repo":null,"$number":null},"description":"Get a single pull request"},"create":{"url":"/repos/:owner/:repo/pulls","method":"POST","params":{"$owner":null,"$repo":null,"title":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The title of the pull request."},"$head":null,"$base":null,"body":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The contents of the pull request."},"maintainer_can_modify":{"type":"Boolean","required":false,"default":"true","description":"Indicates whether maintainers can modify the pull request."}},"description":"Create a pull request"},"create-from-issue":{"url":"/repos/:owner/:repo/pulls","method":"POST","params":{"$owner":null,"$repo":null,"issue":{"type":"Number","required":true,"validation":"^[0-9]+$","invalidmsg":"","description":"The issue number in this repository to turn into a Pull Request."},"$head":null,"$base":null},"description":"Create a pull request from an existing issue"},"update":{"url":"/repos/:owner/:repo/pulls/:number","method":"PATCH","params":{"$owner":null,"$repo":null,"$number":null,"title":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The title of the pull request."},"body":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The contents of the pull request."},"state":{"type":"String","required":false,"validation":"^(open|closed)$","invalidmsg":"open, closed","description":"open or closed","enum":["open","closed"]},"base":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The branch (or git ref) you want your changes pulled into. This should be an existing branch on the current repository. You cannot submit a pull request to one repo that requests a merge to a base of another repo."},"maintainer_can_modify":{"type":"Boolean","required":false,"default":"true","description":"Indicates whether maintainers can modify the pull request."}},"description":"Update a pull request"},"get-commits":{"url":"/repos/:owner/:repo/pulls/:number/commits","method":"GET","params":{"$owner":null,"$repo":null,"$number":null,"$page":null,"$per_page":null},"description":"List commits on a pull request"},"get-files":{"url":"/repos/:owner/:repo/pulls/:number/files","method":"GET","params":{"$owner":null,"$repo":null,"$number":null,"$page":null,"$per_page":null},"description":"List pull requests files"},"check-merged":{"url":"/repos/:owner/:repo/pulls/:number/merge","method":"GET","params":{"$owner":null,"$repo":null,"$number":null,"$page":null,"$per_page":null},"description":"Get if a pull request has been merged"},"merge":{"url":"/repos/:owner/:repo/pulls/:number/merge","method":"PUT","params":{"$owner":null,"$repo":null,"$number":null,"commit_title":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Title for the automatic commit message. (In preview period. See README.)"},"commit_message":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Extra detail to append to automatic commit message."},"sha":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"SHA that pull request head must match to allow merge"},"merge_method":{"type":"String","required":false,"validation":"^(merge|squash|rebase)$","invalidmsg":"Possible values are: `merge`, `squash`, `rebase` Default: `merge`","description":"Merge method to use. Possible values are `merge`, `squash`, or `rebase`. (In preview period. See README.)","enum":["merge","squash","rebase"],"default":"merge"}},"description":"Merge a pull request (Merge Button)"},"get-reviews":{"url":"/repos/:owner/:repo/pulls/:number/reviews","method":"GET","params":{"$owner":null,"$repo":null,"$number":null,"$page":null,"$per_page":null},"description":"List reviews on a pull request."},"get-review":{"url":"/repos/:owner/:repo/pulls/:number/reviews/:id","method":"GET","params":{"$owner":null,"$repo":null,"$number":null,"$id":null},"description":"Get a single pull request review."},"delete-pending-review":{"url":"/repos/:owner/:repo/pulls/:number/reviews/:id","method":"DELETE","params":{"$owner":null,"$repo":null,"$number":null,"$id":null},"description":"Delete a pending pull request review."},"get-review-comments":{"url":"/repos/:owner/:repo/pulls/:number/reviews/:id/comments","method":"GET","params":{"$owner":null,"$repo":null,"$number":null,"$id":null,"$page":null,"$per_page":null},"description":"Get comments for a pull request review."},"create-review":{"url":"/repos/:owner/:repo/pulls/:number/reviews","method":"POST","params":{"$owner":null,"$repo":null,"$number":null,"commit_id":{"type":"String","required":false,"validation":"","invalidmsg":"Sha of the commit to comment on.","description":"Sha of the commit to comment on."},"body":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The body text of the pull request review."},"event":{"type":"String","required":false,"validation":"^(APPROVE|REQUEST_CHANGES|COMMENT|PENDING)$","invalidmsg":"Possible values are: `APPROVE`, `REQUEST_CHANGES`, `COMMENT`, `PENDING`. Default: `PENDING`","description":"The event to perform on the review upon submission, can be one of APPROVE, REQUEST_CHANGES, or COMMENT. If left blank, the review will be in the PENDING state.","enum":["APPROVE","REQUEST_CHANGES","COMMENT","PENDING"],"default":"PENDING"},"comments":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"An array of draft review comment objects. Draft review comments must include a `path`, `position`, and `body`."}},"description":"Create a pull request review."},"submit-review":{"url":"/repos/:owner/:repo/pulls/:number/reviews/:id/events","method":"POST","params":{"$owner":null,"$repo":null,"$number":null,"$id":null,"body":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The body text of the pull request review."},"event":{"type":"String","required":false,"validation":"^(APPROVE|REQUEST_CHANGES|COMMENT|PENDING)$","invalidmsg":"Possible values are: `APPROVE`, `REQUEST_CHANGES`, `COMMENT`, `PENDING`. Default: `PENDING`","description":"The event to perform on the review upon submission, can be one of APPROVE, REQUEST_CHANGES, or COMMENT. If left blank, the review will be in the PENDING state.","enum":["APPROVE","REQUEST_CHANGES","COMMENT","PENDING"],"default":"PENDING"}},"description":"Submit a pull request review."},"dismiss-review":{"url":"/repos/:owner/:repo/pulls/:number/reviews/:id/dismissals","method":"PUT","params":{"$owner":null,"$repo":null,"$number":null,"$id":null,"message":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The message for the pull request review dismissal."},"$page":null,"$per_page":null},"description":"Dismiss a pull request review."},"get-comments":{"url":"/repos/:owner/:repo/pulls/:number/comments","method":"GET","params":{"$owner":null,"$repo":null,"$number":null,"$page":null,"$per_page":null},"description":"List comments on a pull request"},"get-comments-for-repo":{"url":"/repos/:owner/:repo/pulls/comments","method":"GET","params":{"$owner":null,"$repo":null,"sort":{"type":"String","required":false,"validation":"^(created|updated)$","invalidmsg":"Possible values are: `created`, `updated`, Default: `created`","description":"Possible values are: `created`, `updated`, Default: `created`","enum":["created","updated"],"default":"created"},"$direction":null,"$since":null,"$page":null,"$per_page":null},"description":"List comments in a repository"},"get-comment":{"url":"/repos/:owner/:repo/pulls/comments/:id","method":"GET","params":{"$owner":null,"$repo":null,"$id":null},"description":"Get a single comment"},"create-comment":{"url":"/repos/:owner/:repo/pulls/:number/comments","method":"POST","params":{"$owner":null,"$repo":null,"$number":null,"$body":null,"$commit_id":null,"$path":null,"$position":null},"description":"Create a comment"},"create-comment-reply":{"url":"/repos/:owner/:repo/pulls/:number/comments","method":"POST","params":{"$owner":null,"$repo":null,"$number":null,"$body":null,"in_reply_to":{"type":"Number","required":true,"validation":"","invalidmsg":"","description":"The comment id to reply to."}},"description":"Reply to existing pull request comment"},"edit-comment":{"url":"/repos/:owner/:repo/pulls/comments/:id","method":"PATCH","params":{"$owner":null,"$repo":null,"$id":null,"$body":null},"description":"Edit a comment"},"delete-comment":{"url":"/repos/:owner/:repo/pulls/comments/:id","method":"DELETE","params":{"$owner":null,"$repo":null,"$id":null},"description":"Delete a comment"},"get-review-requests":{"url":"/repos/:owner/:repo/pulls/:number/requested_reviewers","method":"GET","params":{"$owner":null,"$repo":null,"$number":null,"$page":null,"$per_page":null},"description":"List review requests. (In preview period. See README.)"},"create-review-request":{"url":"/repos/:owner/:repo/pulls/:number/requested_reviewers","method":"POST","params":{"$owner":null,"$repo":null,"$number":null,"reviewers":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"An array of user logins that will be requested."},"team_reviewers":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"An array of team slugs that will be requested."}},"description":"Create a review request. (In preview period. See README.)"},"delete-review-request":{"url":"/repos/:owner/:repo/pulls/:number/requested_reviewers","method":"DELETE","params":{"$owner":null,"$repo":null,"$number":null,"reviewers":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"An array of user logins that will be requested."},"team_reviewers":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"An array of team slugs that will be requested."}},"description":"Delete a review request. (In preview period. See README.)"}},"reactions":{"get-for-commit-comment":{"url":"/repos/:owner/:repo/comments/:id/reactions","method":"GET","params":{"$owner":null,"$repo":null,"$id":null,"content":{"type":"String","required":false,"validation":"^(\\+1|-1|laugh|confused|heart|hooray)$","invalidmsg":"Possible values: `+1`, `-1`, `laugh`, `confused`, `heart`, `hooray`.","description":"Indicates which type of reaction to return.","enum":["+1","-1","laugh","confused","heart","hooray"]}},"description":"List reactions for a commit comment. (In preview period. See README.)"},"create-for-commit-comment":{"url":"/repos/:owner/:repo/comments/:id/reactions","method":"POST","params":{"$owner":null,"$repo":null,"$id":null,"content":{"type":"String","required":true,"validation":"^(\\+1|-1|laugh|confused|heart|hooray)$","invalidmsg":"Possible values: `+1`, `-1`, `laugh`, `confused`, `heart`, `hooray`.","description":"The reaction type.","enum":["+1","-1","laugh","confused","heart","hooray"]}},"description":"Create reaction for a commit comment. (In preview period. See README.)"},"get-for-issue":{"url":"/repos/:owner/:repo/issues/:number/reactions","method":"GET","params":{"$owner":null,"$repo":null,"$number":null,"content":{"type":"String","required":false,"validation":"^(\\+1|-1|laugh|confused|heart|hooray)$","invalidmsg":"Possible values: `+1`, `-1`, `laugh`, `confused`, `heart`, `hooray`.","description":"Indicates which type of reaction to return.","enum":["+1","-1","laugh","confused","heart","hooray"]}},"description":"List reactions for an issue. (In preview period. See README.)"},"create-for-issue":{"url":"/repos/:owner/:repo/issues/:number/reactions","method":"POST","params":{"$owner":null,"$repo":null,"$number":null,"content":{"type":"String","required":true,"validation":"^(\\+1|-1|laugh|confused|heart|hooray)$","invalidmsg":"Possible values: `+1`, `-1`, `laugh`, `confused`, `heart`, `hooray`.","description":"The reaction type.","enum":["+1","-1","laugh","confused","heart","hooray"]}},"description":"Create reaction for an issue. (In preview period. See README.)"},"get-for-issue-comment":{"url":"/repos/:owner/:repo/issues/comments/:id/reactions","method":"GET","params":{"$owner":null,"$repo":null,"$id":null,"content":{"type":"String","required":false,"validation":"^(\\+1|-1|laugh|confused|heart|hooray)$","invalidmsg":"Possible values: `+1`, `-1`, `laugh`, `confused`, `heart`, `hooray`.","description":"Indicates which type of reaction to return.","enum":["+1","-1","laugh","confused","heart","hooray"]}},"description":"List reactions for an issue comment. (In preview period. See README.)"},"create-for-issue-comment":{"url":"/repos/:owner/:repo/issues/comments/:id/reactions","method":"POST","params":{"$owner":null,"$repo":null,"$id":null,"content":{"type":"String","required":true,"validation":"^(\\+1|-1|laugh|confused|heart|hooray)$","invalidmsg":"Possible values: `+1`, `-1`, `laugh`, `confused`, `heart`, `hooray`.","description":"The reaction type.","enum":["+1","-1","laugh","confused","heart","hooray"]}},"description":"Create reaction for an issue comment. (In preview period. See README.)"},"get-for-pull-request-review-comment":{"url":"/repos/:owner/:repo/pulls/comments/:id/reactions","method":"GET","params":{"$owner":null,"$repo":null,"$id":null,"content":{"type":"String","required":false,"validation":"^(\\+1|-1|laugh|confused|heart|hooray)$","invalidmsg":"Possible values: `+1`, `-1`, `laugh`, `confused`, `heart`, `hooray`.","description":"Indicates which type of reaction to return.","enum":["+1","-1","laugh","confused","heart","hooray"]}},"description":"List reactions for a pull request review comment. (In preview period. See README.)"},"create-for-pull-request-review-comment":{"url":"/repos/:owner/:repo/pulls/comments/:id/reactions","method":"POST","params":{"$owner":null,"$repo":null,"$id":null,"content":{"type":"String","required":true,"validation":"^(\\+1|-1|laugh|confused|heart|hooray)$","invalidmsg":"Possible values: `+1`, `-1`, `laugh`, `confused`, `heart`, `hooray`.","description":"The reaction type.","enum":["+1","-1","laugh","confused","heart","hooray"]}},"description":"Create reaction for a pull request review comment. (In preview period. See README.)"},"delete":{"url":"/reactions/:id","method":"DELETE","params":{"$id":null},"description":"Delete a reaction. (In preview period. See README.)"}},"repos":{"get-all":{"url":"/user/repos","method":"GET","params":{"visibility":{"type":"String","required":false,"validation":"^(all|public|private)$","invalidmsg":"Possible values: `all`, `public`, `private`, Default: `all`.","description":"Can be one of `all`, `public`, or `private`. Default: `all`.","enum":["all","public","private"],"default":"all"},"affiliation":{"type":"String","required":false,"validation":"","invalidmsg":"Possible values: `owner`, `collaborator`, `organization_member`, Default: `owner,collaborator,organization_member`.","description":"Comma-separated list of values. Can include: `owner`, `collaborator`, `organization_member`.","default":"owner,collaborator,organization_member"},"type":{"type":"String","required":false,"validation":"^(all|owner|public|private|member)$","invalidmsg":"Possible values: `all`, `owner`, `public`, `private`, `member`. Default: `all`.","description":"Possible values: `all`, `owner`, `public`, `private`, `member`. Default: `all`.","enum":["all","owner","public","private","member"],"default":"all"},"sort":{"type":"String","required":false,"validation":"^(created|updated|pushed|full_name)$","invalidmsg":"Possible values: `created`, `updated`, `pushed`, `full_name`. Default: `full_name`.","description":"Possible values: `created`, `updated`, `pushed`, `full_name`. Default: `full_name`.","enum":["created","updated","pushed","full_name"],"default":"full_name"},"$direction":null,"$page":null,"$per_page":null},"description":"List your repositories"},"get-for-user":{"url":"/users/:username/repos","method":"GET","params":{"$username":null,"type":{"type":"String","required":false,"validation":"^(all|owner|member)$","invalidmsg":"Possible values: `all`, `owner`, `member`. Default: `owner`.","description":"Possible values: `all`, `owner`, `member`. Default: `owner`.","enum":["all","owner","member"],"default":"owner"},"sort":{"type":"String","required":false,"validation":"^(created|updated|pushed|full_name)$","invalidmsg":"Possible values: `created`, `updated`, `pushed`, `full_name`. Default: `full_name`.","description":"Possible values: `created`, `updated`, `pushed`, `full_name`. Default: `full_name`.","enum":["created","updated","pushed","full_name"],"default":"full_name"},"$direction":null,"$page":null,"$per_page":null},"description":"List public repositories for the specified user."},"get-for-org":{"url":"/orgs/:org/repos","method":"GET","params":{"$org":null,"type":{"type":"String","required":false,"validation":"^(all|public|private|forks|sources|member)$","invalidmsg":"Possible values: `all`, `public`, `private`, `forks`, `sources`, `member`. Default: `all`.","description":"Possible values: `all`, `public`, `private`, `forks`, `sources`, `member`. Default: `all`.","enum":["all","public","private","forks","sources","member"],"default":"all"},"$page":null,"$per_page":null},"description":"List repositories for the specified org."},"get-public":{"url":"/repositories","method":"GET","params":{"since":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The integer ID of the last Repository that you've seen."},"$page":null,"$per_page":null},"description":"List all public repositories"},"create":{"url":"/user/repos","method":"POST","params":{"$name":null,"$description":null,"$homepage":null,"$private":null,"$has_issues":null,"$has_projects":null,"$has_wiki":null,"team_id":{"type":"Number","required":false,"validation":"^[0-9]+$","invalidmsg":"","description":"The id of the team that will be granted access to this repository. This is only valid when creating a repository in an organization."},"$auto_init":null,"$gitignore_template":null,"$license_template":null,"allow_squash_merge":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Either true to allow squash-merging pull requests, or false to prevent squash-merging. Default: true. (In preview period. See README.)","default":"true"},"allow_merge_commit":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Either true to allow merging pull requests with a merge commit, or false to prevent merging pull requests with merge commits. Default: true. (In preview period. See README.)","default":"true"},"allow_rebase_merge":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Either true to allow rebase-merging pull requests, or false to prevent rebase-merging. Default: true. (In preview period. See README.)","default":"true"}},"description":"Create a new repository for the authenticated user."},"create-for-org":{"url":"/orgs/:org/repos","method":"POST","params":{"$org":null,"$name":null,"$description":null,"$homepage":null,"$private":null,"$has_issues":null,"$has_projects":null,"$has_wiki":null,"team_id":{"type":"Number","required":false,"validation":"^[0-9]+$","invalidmsg":"","description":"The id of the team that will be granted access to this repository. This is only valid when creating a repository in an organization."},"$auto_init":null,"$gitignore_template":null,"$license_template":null,"allow_squash_merge":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Either true to allow squash-merging pull requests, or false to prevent squash-merging. Default: true. (In preview period. See README.)","default":"true"},"allow_merge_commit":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Either true to allow merging pull requests with a merge commit, or false to prevent merging pull requests with merge commits. Default: true. (In preview period. See README.)","default":"true"},"allow_rebase_merge":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Either true to allow rebase-merging pull requests, or false to prevent rebase-merging. Default: true. (In preview period. See README.)","default":"true"}},"description":"Create a new repository for an organization."},"get":{"url":"/repos/:owner/:repo","method":"GET","params":{"$owner":null,"$repo":null},"description":"Get a repo for a user."},"get-by-id":{"url":"/repositories/:id","method":"GET","params":{"$id":null},"description":"Get a single repo by id."},"edit":{"url":"/repos/:owner/:repo","method":"PATCH","params":{"$owner":null,"$repo":null,"$name":null,"$description":null,"$homepage":null,"$private":null,"$has_issues":null,"$has_projects":null,"$has_wiki":null,"$default_branch":null,"allow_squash_merge":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Either true to allow squash-merging pull requests, or false to prevent squash-merging. Default: true. (In preview period. See README.)","default":"true"},"allow_merge_commit":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Either true to allow merging pull requests with a merge commit, or false to prevent merging pull requests with merge commits. Default: true. (In preview period. See README.)","default":"true"},"allow_rebase_merge":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Either true to allow rebase-merging pull requests, or false to prevent rebase-merging. Default: true. (In preview period. See README.)","default":"true"}},"description":"Update a repo."},"get-topics":{"url":"/repos/:owner/:repo/topics","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"List all topics for a repository. (In preview period. See README.)"},"replace-topics":{"url":"/repos/:owner/:repo/topics","method":"PUT","params":{"$owner":null,"$repo":null,"names":{"type":"Array","required":true,"validation":"","invalidmsg":"","description":"An array of topics to add to the repository. Pass one or more topics to replace the set of existing topics. Send an empty array ([]) to clear all topics from the repository."}},"description":"Replace all topics for a repository. (In preview period. See README.)"},"get-contributors":{"url":"/repos/:owner/:repo/contributors","method":"GET","params":{"$owner":null,"$repo":null,"anon":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Set to 1 or true to include anonymous contributors in results."},"$page":null,"$per_page":null},"description":"Get contributors for the specified repository."},"get-languages":{"url":"/repos/:owner/:repo/languages","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"Get languages for the specified repository."},"get-teams":{"url":"/repos/:owner/:repo/teams","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"Get teams for the specified repository."},"get-tags":{"url":"/repos/:owner/:repo/tags","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"Get tags for the specified repository."},"delete":{"url":"/repos/:owner/:repo","method":"DELETE","params":{"$owner":null,"$repo":null},"description":"Delete a repository."},"get-branches":{"url":"/repos/:owner/:repo/branches","method":"GET","params":{"$owner":null,"$repo":null,"protected":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Set to true to only return protected branches"},"$page":null,"$per_page":null},"description":"List branches."},"get-branch":{"url":"/repos/:owner/:repo/branches/:branch","method":"GET","params":{"$owner":null,"$repo":null,"$branch":null,"$page":null,"$per_page":null},"description":"Get branch."},"get-branch-protection":{"url":"/repos/:owner/:repo/branches/:branch/protection","method":"GET","params":{"$owner":null,"$repo":null,"$branch":null,"$page":null,"$per_page":null},"description":"Get branch protection."},"update-branch-protection":{"url":"/repos/:owner/:repo/branches/:branch/protection","method":"PUT","params":{"$owner":null,"$repo":null,"$branch":null,"required_status_checks":{"type":"Json","required":true,"allow-null":true,"validation":"","invalidmsg":"","description":"JSON object that contains the following keys: `include_admins` - Enforce required status checks for repository administrators, `strict` - Require branches to be up to date before merging, `contexts` - The list of status checks to require in order to merge into this branch. This object can have the value of `null` for disabled."},"required_pull_request_reviews":{"type":"Json","required":true,"allow-null":true,"validation":"","invalidmsg":"","description":"JSON object that contains the following keys: `include_admins` - Enforce required status checks for repository administrators."},"dismissal_restrictions":{"type":"Json","required":false,"allow-null":true,"validation":"","invalidmsg":"","description":"JSON object that contains the following keys: `users` - The list of user logins with dismissal access, `teams` - The list of team slugs with dismissal access. This object can have the value of `null` for disabled."},"restrictions":{"type":"Json","required":true,"allow-null":true,"validation":"","invalidmsg":"","description":"JSON object that contains the following keys: `users` - The list of user logins with push access, `teams` - The list of team slugs with push access. This object can have the value of `null` for disabled."},"enforce_admins":{"type":"Boolean","required":true,"allow-null":false,"validation":"","invalidmsg":"","description":"Enforces required status checks for repository administrators."},"$page":null,"$per_page":null},"description":"Update branch protection."},"remove-branch-protection":{"url":"/repos/:owner/:repo/branches/:branch/protection","method":"DELETE","params":{"$owner":null,"$repo":null,"$branch":null,"$page":null,"$per_page":null},"description":"Remove branch protection."},"get-protected-branch-required-status-checks":{"url":"/repos/:owner/:repo/branches/:branch/protection/required_status_checks","method":"GET","params":{"$owner":null,"$repo":null,"$branch":null,"$page":null,"$per_page":null},"description":"Get required status checks of protected branch."},"update-protected-branch-required-status-checks":{"url":"/repos/:owner/:repo/branches/:branch/protection/required_status_checks","method":"PATCH","params":{"$owner":null,"$repo":null,"$branch":null,"strict":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Require branches to be up to date before merging."},"contexts":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"The list of status checks to require in order to merge into this branch."}},"description":"Update required status checks of protected branch."},"remove-protected-branch-required-status-checks":{"url":"/repos/:owner/:repo/branches/:branch/protection/required_status_checks","method":"DELETE","params":{"$owner":null,"$repo":null,"$branch":null},"description":"Remove required status checks of protected branch."},"get-protected-branch-required-status-checks-contexts":{"url":"/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts","method":"GET","params":{"$owner":null,"$repo":null,"$branch":null,"$page":null,"$per_page":null},"description":"List required status checks contexts of protected branch."},"replace-protected-branch-required-status-checks-contexts":{"url":"/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts","method":"PUT","params":{"$owner":null,"$repo":null,"$branch":null,"contexts":{"type":"Array","sendValueAsBody":true,"required":true,"validation":"","invalidmsg":"","description":"An array of protected branch required status checks contexts (e.g. continuous-integration/jenkins)."}},"description":"Replace required status checks contexts of protected branch."},"add-protected-branch-required-status-checks-contexts":{"url":"/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts","method":"POST","params":{"$owner":null,"$repo":null,"$branch":null,"contexts":{"type":"Array","sendValueAsBody":true,"required":true,"validation":"","invalidmsg":"","description":"An array of protected branch required status checks contexts (e.g. continuous-integration/jenkins)."}},"description":"Add required status checks contexts of protected branch."},"remove-protected-branch-required-status-checks-contexts":{"url":"/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts","method":"DELETE","params":{"$owner":null,"$repo":null,"$branch":null,"contexts":{"type":"Array","sendValueAsBody":true,"required":true,"validation":"","invalidmsg":"","description":"An array of protected branch required status checks contexts (e.g. continuous-integration/jenkins)."}},"description":"Remove required status checks contexts of protected branch."},"get-protected-branch-pull-request-review-enforcement":{"url":"/repos/:owner/:repo/branches/:branch/protection/required_pull_request_reviews","method":"GET","params":{"$owner":null,"$repo":null,"$branch":null,"$page":null,"$per_page":null},"description":"Get pull request review enforcement of protected branch."},"update-protected-branch-pull-request-review-enforcement":{"url":"/repos/:owner/:repo/branches/:branch/protection/required_pull_request_reviews","method":"PATCH","params":{"$owner":null,"$repo":null,"$branch":null,"dismissal_restrictions":{"type":"Json","required":false,"allow-null":true,"validation":"","invalidmsg":"","description":"JSON object that contains the following keys: `users` - The list of user logins with dismissal access, `teams` - The list of team slugs with dismissal access. This object can have the value of `null` for disabled."},"dismiss_stale_reviews":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Dismiss approved reviews automatically when a new commit is pushed."},"require_code_owner_reviews":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Blocks merge until code owners have reviewed."}},"description":"Update pull request review enforcement of protected branch."},"remove-protected-branch-pull-request-review-enforcement":{"url":"/repos/:owner/:repo/branches/:branch/protection/required_pull_request_reviews","method":"DELETE","params":{"$owner":null,"$repo":null,"$branch":null},"description":"Remove pull request review enforcement of protected branch."},"get-protected-branch-admin-enforcement":{"url":"/repos/:owner/:repo/branches/:branch/protection/enforce_admins","method":"GET","params":{"$owner":null,"$repo":null,"$branch":null,"$page":null,"$per_page":null},"description":"Get admin enforcement of protected branch."},"add-protected-branch-admin-enforcement":{"url":"/repos/:owner/:repo/branches/:branch/protection/enforce_admins","method":"POST","params":{"$owner":null,"$repo":null,"$branch":null,"$page":null,"$per_page":null},"description":"Add admin enforcement of protected branch."},"remove-protected-branch-admin-enforcement":{"url":"/repos/:owner/:repo/branches/:branch/protection/enforce_admins","method":"DELETE","params":{"$owner":null,"$repo":null,"$branch":null,"$page":null,"$per_page":null},"description":"Remove admin enforcement of protected branch."},"get-protected-branch-restrictions":{"url":"/repos/:owner/:repo/branches/:branch/protection/restrictions","method":"GET","params":{"$owner":null,"$repo":null,"$branch":null,"$page":null,"$per_page":null},"description":"Get restrictions of protected branch."},"remove-protected-branch-restrictions":{"url":"/repos/:owner/:repo/branches/:branch/protection/restrictions","method":"DELETE","params":{"$owner":null,"$repo":null,"$branch":null},"description":"Remove restrictions of protected branch."},"get-protected-branch-team-restrictions":{"url":"/repos/:owner/:repo/branches/:branch/protection/restrictions/teams","method":"GET","params":{"$owner":null,"$repo":null,"$branch":null,"$page":null,"$per_page":null},"description":"List team restrictions of protected branch."},"replace-protected-branch-team-restrictions":{"url":"/repos/:owner/:repo/branches/:branch/protection/restrictions/teams","method":"PUT","params":{"$owner":null,"$repo":null,"$branch":null,"teams":{"type":"Array","sendValueAsBody":true,"required":true,"validation":"","invalidmsg":"","description":"An array of team slugs (e.g. justice-league)."}},"description":"Replace team restrictions of protected branch."},"add-protected-branch-team-restrictions":{"url":"/repos/:owner/:repo/branches/:branch/protection/restrictions/teams","method":"POST","params":{"$owner":null,"$repo":null,"$branch":null,"teams":{"type":"Array","sendValueAsBody":true,"required":true,"validation":"","invalidmsg":"","description":"An array of team slugs (e.g. justice-league)."}},"description":"Add team restrictions of protected branch."},"remove-protected-branch-team-restrictions":{"url":"/repos/:owner/:repo/branches/:branch/protection/restrictions/teams","method":"DELETE","params":{"$owner":null,"$repo":null,"$branch":null,"teams":{"type":"Array","sendValueAsBody":true,"required":true,"validation":"","invalidmsg":"","description":"An array of team slugs (e.g. justice-league)."}},"description":"Remove team restrictions of protected branch."},"get-protected-branch-user-restrictions":{"url":"/repos/:owner/:repo/branches/:branch/protection/restrictions/users","method":"GET","params":{"$owner":null,"$repo":null,"$branch":null,"$page":null,"$per_page":null},"description":"List user restrictions of protected branch."},"replace-protected-branch-user-restrictions":{"url":"/repos/:owner/:repo/branches/:branch/protection/restrictions/users","method":"PUT","params":{"$owner":null,"$repo":null,"$branch":null,"users":{"type":"Array","sendValueAsBody":true,"required":true,"validation":"","invalidmsg":"","description":"An array of team slugs (e.g. justice-league)."}},"description":"Replace user restrictions of protected branch."},"add-protected-branch-user-restrictions":{"url":"/repos/:owner/:repo/branches/:branch/protection/restrictions/users","method":"POST","params":{"$owner":null,"$repo":null,"$branch":null,"users":{"type":"Array","sendValueAsBody":true,"required":true,"validation":"","invalidmsg":"","description":"An array of team slugs (e.g. justice-league)."}},"description":"Add user restrictions of protected branch."},"remove-protected-branch-user-restrictions":{"url":"/repos/:owner/:repo/branches/:branch/protection/restrictions/users","method":"DELETE","params":{"$owner":null,"$repo":null,"$branch":null,"users":{"type":"Array","sendValueAsBody":true,"required":true,"validation":"","invalidmsg":"","description":"An array of team slugs (e.g. justice-league)."}},"description":"Remove user restrictions of protected branch."},"get-collaborators":{"url":"/repos/:owner/:repo/collaborators","method":"GET","params":{"$owner":null,"$repo":null,"affiliation":{"type":"String","required":false,"validation":"^(outside|all|direct)$","invalidmsg":"outside, all, direct, default: all","description":"Filter collaborators returned by their affiliation.","enum":["outside","all","direct"],"default":"all"},"$page":null,"$per_page":null},"description":"List collaborators"},"check-collaborator":{"url":"/repos/:owner/:repo/collaborators/:username","method":"GET","params":{"$owner":null,"$repo":null,"$username":null},"description":"Check if user is a collaborator."},"review-user-permission-level":{"url":"/repos/:owner/:repo/collaborators/:username/permission","method":"GET","params":{"$owner":null,"$repo":null,"$username":null},"description":"Review a user's permission level."},"add-collaborator":{"url":"/repos/:owner/:repo/collaborators/:username","method":"PUT","params":{"$owner":null,"$repo":null,"$username":null,"permission":{"type":"String","required":false,"validation":"^(pull|push|admin)$","invalidmsg":"","description":"`pull` - can pull, but not push to or administer this repository, `push` - can pull and push, but not administer this repository, `admin` - can pull, push and administer this repository.","enum":["pull","push","admin"],"default":"push"}},"description":"Add user as a collaborator"},"remove-collaborator":{"url":"/repos/:owner/:repo/collaborators/:username","method":"DELETE","params":{"$owner":null,"$repo":null,"$username":null},"description":"Remove user as a collaborator."},"get-all-commit-comments":{"url":"/repos/:owner/:repo/comments","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"List commit comments for a repository."},"get-commit-comments":{"url":"/repos/:owner/:repo/commits/:ref/comments","method":"GET","params":{"$owner":null,"$repo":null,"ref":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"$page":null,"$per_page":null},"description":"List comments for a single commit."},"create-commit-comment":{"url":"/repos/:owner/:repo/commits/:sha/comments","method":"POST","params":{"$owner":null,"$repo":null,"$sha":null,"$body":null,"path":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Relative path of the file to comment on."},"position":{"type":"Number","required":false,"validation":"","invalidmsg":"","description":"Line index in the diff to comment on."}},"description":"Create a commit comment."},"get-commit-comment":{"url":"/repos/:owner/:repo/comments/:id","method":"GET","params":{"$owner":null,"$repo":null,"$id":null},"description":"Get a single commit comment."},"update-commit-comment":{"url":"/repos/:owner/:repo/comments/:id","method":"PATCH","params":{"$owner":null,"$repo":null,"$id":null,"$body":null},"description":"Update a commit comment."},"delete-commit-comment":{"url":"/repos/:owner/:repo/comments/:id","method":"DELETE","params":{"$owner":null,"$repo":null,"$id":null},"description":"Delete a commit comment."},"get-community-profile-metrics":{"url":"/repos/:owner/:name/community/profile","method":"GET","params":{"$owner":null,"$name":null},"description":"Retrieve community profile metrics."},"get-commits":{"url":"/repos/:owner/:repo/commits","method":"GET","params":{"$owner":null,"$repo":null,"sha":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Sha or branch to start listing commits from."},"path":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Only commits containing this file path will be returned."},"author":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"GitHub login or email address by which to filter by commit author."},"$since":null,"$until":null,"$page":null,"$per_page":null},"description":"List commits on a repository."},"get-commit":{"url":"/repos/:owner/:repo/commits/:sha","method":"GET","params":{"$owner":null,"$repo":null,"$sha":null},"description":"Get a single commit."},"get-sha-of-commit-ref":{"url":"/repos/:owner/:repo/commits/:ref","method":"GET","params":{"$owner":null,"$repo":null,"$ref":null},"description":"Get the SHA-1 of a commit reference."},"compare-commits":{"url":"/repos/:owner/:repo/compare/:base...:head","method":"GET","params":{"$owner":null,"$repo":null,"$base":null,"$head":null},"description":"Compare two commits."},"get-readme":{"url":"/repos/:owner/:repo/readme","method":"GET","params":{"$owner":null,"$repo":null,"ref":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The name of the commit/branch/tag. Default: the repository’s default branch (usually master)"}},"description":"Get the README for the given repository."},"get-content":{"url":"/repos/:owner/:repo/contents/:path","method":"GET","params":{"$owner":null,"$repo":null,"path":{"type":"String","required":true,"allow-empty":true,"validation":"","invalidmsg":"","description":"The content path."},"ref":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The String name of the Commit/Branch/Tag. Defaults to master."}},"description":"Get the contents of a file or directory in a repository."},"create-file":{"url":"/repos/:owner/:repo/contents/:path","method":"PUT","params":{"$owner":null,"$repo":null,"path":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The content path."},"message":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The commit message."},"content":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The new file content, Base64 encoded."},"branch":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The branch name. If not provided, uses the repository’s default branch (usually master)."},"committer":{"type":"Json","required":false,"validation":"","invalidmsg":"","description":""},"author":{"type":"Json","required":false,"validation":"","invalidmsg":"","description":""}},"description":"Create a new file in the given repository."},"update-file":{"url":"/repos/:owner/:repo/contents/:path","method":"PUT","params":{"$owner":null,"$repo":null,"path":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The content path."},"message":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The commit message."},"content":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The updated file content, Base64 encoded."},"sha":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The blob SHA of the file being replaced."},"branch":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The branch name. If not provided, uses the repository’s default branch (usually master)."},"committer":{"type":"Json","required":false,"validation":"","invalidmsg":"","description":""},"author":{"type":"Json","required":false,"validation":"","invalidmsg":"","description":""}},"description":"Update a file."},"delete-file":{"url":"/repos/:owner/:repo/contents/:path","method":"DELETE","params":{"$owner":null,"$repo":null,"path":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The content path."},"message":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The commit message."},"sha":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The blob SHA of the file being removed."},"branch":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The branch name. If not provided, uses the repository’s default branch (usually master)."},"committer":{"type":"Json","required":false,"validation":"","invalidmsg":"","description":""},"author":{"type":"Json","required":false,"validation":"","invalidmsg":"","description":""}},"description":"Delete a file."},"get-archive-link":{"url":"/repos/:owner/:repo/:archive_format/:ref","method":"GET","params":{"$owner":null,"$repo":null,"archive_format":{"type":"String","required":true,"validation":"^(tarball|zipball)$","invalidmsg":"Either tarball or zipball, Default: tarball.","description":"Either tarball or zipball, Deafult: tarball.","enum":["tarball","zipball"],"default":"tarball"},"ref":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"A valid Git reference. Default: the repository’s default branch (usually master)."}},"description":"Get archive link."},"get-deploy-keys":{"url":"/repos/:owner/:repo/keys","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"List deploy keys."},"get-deploy-key":{"url":"/repos/:owner/:repo/keys/:id","method":"GET","params":{"$owner":null,"$repo":null,"$id":null},"description":"Get a deploy key."},"add-deploy-key":{"url":"/repos/:owner/:repo/keys","method":"POST","params":{"$owner":null,"$repo":null,"$title":null,"$key":null,"read_only":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"If true, the key will only be able to read repository contents. Otherwise, the key will be able to read and write."}},"description":"Add a new deploy key."},"delete-deploy-key":{"url":"/repos/:owner/:repo/keys/:id","method":"DELETE","params":{"$owner":null,"$repo":null,"$id":null},"description":"Remove a deploy key."},"get-deployments":{"url":"/repos/:owner/:repo/deployments","method":"GET","params":{"$owner":null,"$repo":null,"sha":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The short or long sha that was recorded at creation time. Default: none.","default":"none"},"ref":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The name of the ref. This can be a branch, tag, or sha. Default: none.","default":"none"},"task":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The name of the task for the deployment. e.g. deploy or deploy:migrations. Default: none.","default":"none"},"environment":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The name of the environment that was deployed to. e.g. staging or production. Default: none.","default":"none"},"$page":null,"$per_page":null},"description":"List deployments."},"get-deployment":{"url":"/repos/:owner/:repo/deployments/:deployment_id","method":"GET","params":{"$owner":null,"$repo":null,"deployment_id":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The deployment id."}},"description":"Get a single Deployment. (In preview period. See README.)"},"create-deployment":{"url":"/repos/:owner/:repo/deployments","method":"POST","params":{"$owner":null,"$repo":null,"ref":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The ref to deploy. This can be a branch, tag, or sha."},"task":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The named task to execute. e.g. deploy or deploy:migrations. Default: deploy","default":"deploy"},"auto_merge":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Optional parameter to merge the default branch into the requested ref if it is behind the default branch. Default: true","default":"true"},"required_contexts":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"Optional array of status contexts verified against commit status checks. If this parameter is omitted from the parameters then all unique contexts will be verified before a deployment is created. To bypass checking entirely pass an empty array. Defaults to all unique contexts."},"payload":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Optional JSON payload with extra information about the deployment. Default: \"\"","default":"\"\""},"environment":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The name of the environment that was deployed to. e.g. staging or production. Default: none.","default":"none"},"description":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Optional short description. Default: \"\"","default":"\"\""},"transient_environment":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Specifies if the given environment is specific to the deployment and will no longer exist at some point in the future. Default: false. (In preview period. See README.)","default":false},"production_environment":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Specifies if the given environment is a one that end-users directly interact with. Default: true when environment is `production` and false otherwise. (In preview period. See README.)"}},"description":"Create a deployment. (In preview period. See README.)"},"get-deployment-statuses":{"url":"/repos/:owner/:repo/deployments/:id/statuses","method":"GET","params":{"$owner":null,"$repo":null,"$id":null},"description":"List deployment statuses. (In preview period. See README.)"},"get-deployment-status":{"url":"/repos/:owner/:repo/deployments/:id/statuses/:status_id","method":"GET","params":{"$owner":null,"$repo":null,"id":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The Deployment ID to list the statuses from."},"status_id":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The Deployment Status ID."}},"description":"List deployment statuses. (In preview period. See README.)"},"create-deployment-status":{"url":"/repos/:owner/:repo/deployments/:id/statuses","method":"POST","params":{"$owner":null,"$repo":null,"$id":null,"state":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The state of the status. Can be one of pending, success, error, or failure."},"target_url":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The target URL to associate with this status. This URL should contain output to keep the user updated while the task is running or serve as historical information for what happened in the deployment. Default: \"\"","default":"\"\""},"log_url":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Functionally equivalent to target_url. Default: \"\". (In preview period. See README.)","default":"\"\""},"description":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"A short description of the status. Default: \"\"","default":"\"\""},"environment_url":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"URL for accessing the deployment environment. Default: \"\". (In preview period. See README.)","default":"\"\""},"auto_inactive":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"When true the new `inactive` status is added to all other non-transient, non-production environment deployments with the same repository and environment name as the created status's deployment. Default: true. (In preview period. See README.)","default":true}},"description":"Create a deployment status. (In preview period. See README.)"},"get-downloads":{"url":"/repos/:owner/:repo/downloads","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"List downloads for a repository."},"get-download":{"url":"/repos/:owner/:repo/downloads/:id","method":"GET","params":{"$owner":null,"$repo":null,"$id":null},"description":"Get a single download."},"delete-download":{"url":"/repos/:owner/:repo/downloads/:id","method":"DELETE","params":{"$owner":null,"$repo":null,"$id":null},"description":"Delete a download."},"get-forks":{"url":"/repos/:owner/:repo/forks","method":"GET","params":{"$owner":null,"$repo":null,"sort":{"type":"String","required":false,"validation":"^(newest|oldest|stargazers)$","invalidmsg":"Possible values: `newest`, `oldest`, `stargazers`, default: `newest`.","description":"Possible values: `newest`, `oldest`, `stargazers`, default: `newest`.","enum":["newest","oldest","stargazers"],"default":"newest"},"$page":null,"$per_page":null},"description":"List forks."},"fork":{"url":"/repos/:owner/:repo/forks","method":"POST","params":{"$owner":null,"$repo":null,"organization":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Optional parameter to specify the organization name if forking into an organization."}},"description":"Create a fork."},"get-invites":{"url":"/repos/:owner/:repo/invitations","method":"GET","params":{"$owner":null,"$repo":null},"description":"List invitations for a repository."},"delete-invite":{"url":"/repos/:owner/:repo/invitations/:invitation_id","method":"DELETE","params":{"$owner":null,"$repo":null,"$invitation_id":null},"description":"Delete a repository invitation."},"update-invite":{"url":"/repos/:owner/:repo/invitations/:invitation_id","method":"PATCH","params":{"$owner":null,"$repo":null,"$invitation_id":null,"permissions":{"type":"String","required":false,"validation":"^(read|write|admin)$","invalidmsg":"Read, write, or admin.","description":"The permissions that the associated user will have on the repository.","enum":["read","write","admin"]}},"description":"Update a repository invitation."},"merge":{"url":"/repos/:owner/:repo/merges","method":"POST","params":{"$owner":null,"$repo":null,"$base":null,"$head":null,"commit_message":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Commit message to use for the merge commit. If omitted, a default message will be used."}},"description":"Perform a merge."},"get-pages":{"url":"/repos/:owner/:repo/pages","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"Get information about a Pages site. (In preview period. See README.)"},"request-page-build":{"url":"/repos/:owner/:repo/pages/builds","method":"POST","params":{"$owner":null,"$repo":null},"description":"Request a page build. (In preview period. See README.)"},"get-pages-builds":{"url":"/repos/:owner/:repo/pages/builds","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"List Pages builds. (In preview period. See README.)"},"get-latest-pages-build":{"url":"/repos/:owner/:repo/pages/builds/latest","method":"GET","params":{"$owner":null,"$repo":null},"description":"Get latest Pages build. (In preview period. See README.)"},"get-pages-build":{"url":"/repos/:owner/:repo/pages/builds/:id","method":"GET","params":{"$owner":null,"$repo":null,"$id":null},"description":"Get a specific Pages build. (In preview period. See README.)"},"get-releases":{"url":"/repos/:owner/:repo/releases","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"List releases for a repository."},"get-release":{"url":"/repos/:owner/:repo/releases/:id","method":"GET","params":{"$owner":null,"$repo":null,"$id":null},"description":"Get a single release."},"get-latest-release":{"url":"/repos/:owner/:repo/releases/latest","method":"GET","params":{"$owner":null,"$repo":null},"description":"Get the latest release."},"get-release-by-tag":{"url":"/repos/:owner/:repo/releases/tags/:tag","method":"GET","params":{"$owner":null,"$repo":null,"tag":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"String of the tag"}},"description":"Get a release by tag name."},"create-release":{"url":"/repos/:owner/:repo/releases","method":"POST","params":{"$owner":null,"$repo":null,"tag_name":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"String of the tag"},"target_commitish":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Specifies the commitish value that determines where the Git tag is created from. Can be any branch or commit SHA. Unused if the Git tag already exists. Default: the repository's default branch (usually master)."},"name":{"type":"String","required":false,"validation":"","invalidmsg":"","description":""},"body":{"type":"String","required":false,"validation":"","invalidmsg":"","description":""},"draft":{"type":"Boolean","validation":"","invalidmsg":"","description":"true to create a draft (unpublished) release, false to create a published one. Default: false","default":"false"},"prerelease":{"type":"Boolean","validation":"","invalidmsg":"","description":"true to identify the release as a prerelease. false to identify the release as a full release. Default: false","default":"false"}},"description":"Create a release."},"edit-release":{"url":"/repos/:owner/:repo/releases/:id","method":"PATCH","params":{"$owner":null,"$repo":null,"$id":null,"tag_name":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"String of the tag"},"target_commitish":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Specifies the commitish value that determines where the Git tag is created from. Can be any branch or commit SHA. Unused if the Git tag already exists. Default: the repository's default branch (usually master)."},"name":{"type":"String","required":false,"validation":"","invalidmsg":"","description":""},"body":{"type":"String","required":false,"validation":"","invalidmsg":"","description":""},"draft":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"true to create a draft (unpublished) release, false to create a published one. Default: false","default":"false"},"prerelease":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"true to identify the release as a prerelease. false to identify the release as a full release. Default: false","default":"false"}},"description":"Edit a release."},"delete-release":{"url":"/repos/:owner/:repo/releases/:id","method":"DELETE","params":{"$owner":null,"$repo":null,"$id":null},"description":"Delete a release"},"get-assets":{"url":"/repos/:owner/:repo/releases/:id/assets","method":"GET","params":{"$owner":null,"$repo":null,"$id":null},"description":"List assets for a release."},"upload-asset":{"url":"/:url","method":"POST","hasFileBody":true,"headers":{"Content-Type":":contentType","Content-Length":":contentLength"},"timeout":0,"params":{"$url":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"This endpoint makes use of a Hypermedia relation (https://developer.github.com/v3/#hypermedia) to determine which URL to access. This endpoint is provided by a URI template in the release's API response (https://developer.github.com/v3/repos/releases/#get-a-single-release). You need to use an HTTP client which supports SNI (https://en.wikipedia.org/wiki/Server_Name_Indication) to make calls to this endpoint."},"file":{"type":"Object","required":true,"validation":"","invalidmsg":"","description":"A file read stream, a String or a Buffer."},"$contentType":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The content type of the asset. This should be set in the Header. Example: 'application/zip'. For a list of acceptable types, refer this list of media types (https://www.iana.org/assignments/media-types/media-types.xhtml)"},"$contentLength":{"type":"Number","required":true,"validation":"","invalidmsg":"","description":"File size in bytes."},"name":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The file name of the asset. This should be set in a URI query parameter."},"label":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"An alternate short description of the asset. Used in place of the filename. This should be set in a URI query parameter."}},"description":"Upload a release asset."},"get-asset":{"url":"/repos/:owner/:repo/releases/assets/:id","method":"GET","params":{"$owner":null,"$repo":null,"$id":null},"description":"Get a single release asset."},"edit-asset":{"url":"/repos/:owner/:repo/releases/assets/:id","method":"PATCH","params":{"$owner":null,"$repo":null,"$id":null,"$name":null,"label":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"An alternate short description of the asset. Used in place of the filename."}},"description":"Edit a release asset."},"delete-asset":{"url":"/repos/:owner/:repo/releases/assets/:id","method":"DELETE","params":{"$owner":null,"$repo":null,"$id":null},"description":"Delete a release asset."},"get-stats-contributors":{"url":"/repos/:owner/:repo/stats/contributors","method":"GET","params":{"$owner":null,"$repo":null},"description":"Get contributors list with additions, deletions, and commit counts."},"get-stats-commit-activity":{"url":"/repos/:owner/:repo/stats/commit_activity","method":"GET","params":{"$owner":null,"$repo":null},"description":"Get the last year of commit activity data."},"get-stats-code-frequency":{"url":"/repos/:owner/:repo/stats/code_frequency","method":"GET","params":{"$owner":null,"$repo":null},"description":"Get the number of additions and deletions per week."},"get-stats-participation":{"url":"/repos/:owner/:repo/stats/participation","method":"GET","params":{"$owner":null,"$repo":null},"description":"Get the weekly commit count for the repository owner and everyone else."},"get-stats-punch-card":{"url":"/repos/:owner/:repo/stats/punch_card","method":"GET","params":{"$owner":null,"$repo":null},"description":"Get the number of commits per hour in each day."},"create-status":{"url":"/repos/:owner/:repo/statuses/:sha","method":"POST","params":{"$owner":null,"$repo":null,"$sha":null,"state":{"type":"String","required":true,"validation":"^(pending|success|error|failure)$","invalidmsg":"","description":"State of the status - can be one of pending, success, error, or failure.","enum":["pending","success","error","failure"]},"target_url":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Target url to associate with this status. This URL will be linked from the GitHub UI to allow users to easily see the ‘source’ of the Status."},"description":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Short description of the status."},"context":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"A string label to differentiate this status from the status of other systems."}},"description":"Create a status."},"get-statuses":{"url":"/repos/:owner/:repo/commits/:ref/statuses","method":"GET","params":{"$owner":null,"$repo":null,"ref":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"Ref to list the statuses from. It can be a SHA, a branch name, or a tag name."},"$page":null,"$per_page":null},"description":"List statuses for a specfic ref."},"get-combined-status-for-ref":{"url":"/repos/:owner/:repo/commits/:ref/status","method":"GET","params":{"$owner":null,"$repo":null,"ref":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"Ref to fetch the status for. It can be a SHA, a branch name, or a tag name."},"$page":null,"$per_page":null},"description":"Get the combined status for a specific ref."},"get-referrers":{"url":"/repos/:owner/:repo/traffic/popular/referrers","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"Get the top 10 referrers over the last 14 days."},"get-paths":{"url":"/repos/:owner/:repo/traffic/popular/paths","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"Get the top 10 popular contents over the last 14 days."},"get-views":{"url":"/repos/:owner/:repo/traffic/views","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"Get the total number of views and breakdown per day or week for the last 14 days."},"get-clones":{"url":"/repos/:owner/:repo/traffic/clones","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"Get the total number of clones and breakdown per day or week for the last 14 days."},"get-hooks":{"url":"/repos/:owner/:repo/hooks","method":"GET","params":{"$owner":null,"$repo":null,"$page":null,"$per_page":null},"description":"List hooks."},"get-hook":{"url":"/repos/:owner/:repo/hooks/:id","method":"GET","params":{"$owner":null,"$repo":null,"$id":null},"description":"Get single hook."},"create-hook":{"url":"/repos/:owner/:repo/hooks","method":"POST","params":{"$owner":null,"$repo":null,"$name":null,"config":{"type":"Json","required":true,"validation":"","invalidmsg":"","description":"A Hash containing key/value pairs to provide settings for this hook. These settings vary between the services and are defined in the github-services repo. Booleans are stored internally as `1` for true, and `0` for false. Any JSON true/false values will be converted automatically."},"events":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"Determines what events the hook is triggered for. Default: `['push']`.","default":"[\"push\"]"},"active":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Determines whether the hook is actually triggered on pushes."}},"description":"Create a hook."},"edit-hook":{"url":"/repos/:owner/:repo/hooks/:id","method":"PATCH","params":{"$owner":null,"$repo":null,"$id":null,"$name":null,"config":{"type":"Json","required":true,"validation":"","invalidmsg":"","description":"A Hash containing key/value pairs to provide settings for this hook. Modifying this will replace the entire config object. These settings vary between the services and are defined in the github-services repo. Booleans are stored internally as `1` for true, and `0` for false. Any JSON true/false values will be converted automatically."},"events":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"Determines what events the hook is triggered for. This replaces the entire array of events. Default: `['push']`.","default":"[\"push\"]"},"add_events":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"Determines a list of events to be added to the list of events that the Hook triggers for."},"remove_events":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"Determines a list of events to be removed from the list of events that the Hook triggers for."},"active":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Determines whether the hook is actually triggered on pushes."}},"description":"Edit a hook."},"test-hook":{"url":"/repos/:owner/:repo/hooks/:id/tests","method":"POST","params":{"$owner":null,"$repo":null,"$id":null},"description":"Test a [push] hook."},"ping-hook":{"url":"/repos/:owner/:repo/hooks/:id/pings","method":"POST","params":{"$owner":null,"$repo":null,"$id":null},"description":"Ping a hook."},"delete-hook":{"url":"/repos/:owner/:repo/hooks/:id","method":"DELETE","params":{"$owner":null,"$repo":null,"$id":null},"description":"Deleate a hook."}},"search":{"repos":{"url":"/search/repositories","method":"GET","params":{"$q":null,"sort":{"type":"String","required":false,"validation":"^(stars|forks|updated)$","invalidmsg":"One of stars, forks, or updated. Default: results are sorted by best match.","description":"stars, forks, or updated","enum":["stars","forks","updated"]},"$order":null,"$page":null,"$per_page":null},"description":"Search repositories."},"code":{"url":"/search/code","method":"GET","params":{"$q":null,"sort":{"type":"String","required":false,"validation":"^indexed$","invalidmsg":"indexed only","description":"The sort field. Can only be indexed, which indicates how recently a file has been indexed by the GitHub search infrastructure. Default: results are sorted by best match.","enum":["indexed"]},"$order":null,"$page":null,"$per_page":null},"description":"Search code."},"commits":{"url":"/search/commits","method":"GET","params":{"$q":null,"sort":{"type":"String","required":false,"validation":"^(author-date|committer-date)$","invalidmsg":"author-date or committer-date","description":"The sort field. Can be author-date or committer-date. Default: best match.","enum":["author-date","committer-date"]},"$order":null,"$page":null,"$per_page":null},"description":"Search commits. (In preview period. See README.)"},"issues":{"url":"/search/issues","method":"GET","params":{"$q":null,"sort":{"type":"String","required":false,"validation":"^(comments|created|updated)$","invalidmsg":"comments, created, or updated","description":"The sort field. Can be comments, created, or updated. Default: results are sorted by best match.","enum":["comments","created","updated"]},"$order":null,"$page":null,"$per_page":null},"description":"Search issues."},"users":{"url":"/search/users","method":"GET","params":{"$q":null,"sort":{"type":"String","required":false,"validation":"^(followers|repositories|joined)$","invalidmsg":"Can be followers, repositories, or joined. Default: results are sorted by best match.","description":"The sort field. Can be followers, repositories, or joined. Default: results are sorted by best match.","enum":["followers","repositories","joined"]},"$order":null,"$page":null,"$per_page":null},"description":"Search users."},"email":{"url":"/legacy/user/email/:email","method":"GET","params":{"email":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The email address"}},"description":"Search against public email addresses."}},"users":{"get-for-user":{"url":"/users/:username","method":"GET","params":{"$username":null},"description":"Get a single user"},"get-by-id":{"url":"/user/:id","method":"GET","params":{"$id":null},"description":"Get a single user by GitHub ID"},"get":{"url":"/user","method":"GET","params":{},"description":"Get the authenticated user"},"update":{"url":"/user","method":"PATCH","params":{"name":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The new name of the user"},"email":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Publicly visible email address."},"blog":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The new blog URL of the user."},"company":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The new company of the user."},"location":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The new location of the user."},"hireable":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"The new hiring availability of the user."},"bio":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The new short biography of the user."}},"description":"Update the authenticated user"},"get-all":{"url":"/users","method":"GET","params":{"since":{"type":"Number","required":false,"validation":"","description":"The integer ID of the last User that you’ve seen."}},"description":"Get all users"},"get-orgs":{"url":"/user/orgs","method":"GET","params":{"$page":null,"$per_page":null},"description":"List organizations for the authenticated user."},"get-org-memberships":{"url":"/user/memberships/orgs","method":"GET","params":{"state":{"type":"String","required":false,"validation":"^(active|pending)$","invalidmsg":"active, pending","description":"Indicates the state of the memberships to return. Can be either active or pending. If not specified, both active and pending memberships are returned.","enum":["active","pending"]}},"description":"List your organization memberships"},"get-org-membership":{"url":"/user/memberships/orgs/:org","method":"GET","params":{"$org":null},"description":"Get your organization membership"},"edit-org-membership":{"url":"/user/memberships/orgs/:org","method":"PATCH","params":{"$org":null,"state":{"type":"String","required":true,"validation":"^(active)$","invalidmsg":"active","description":"The state that the membership should be in. Only \"active\" will be accepted.","enum":["active"]}},"description":"Edit your organization membership."},"get-teams":{"url":"/user/teams","method":"GET","params":{"$page":null,"$per_page":null},"description":"Get your teams."},"get-emails":{"url":"/user/emails","method":"GET","params":{"$page":null,"$per_page":null},"description":"List email addresses for a user."},"get-public-emails":{"url":"/user/public_emails","method":"GET","params":{"$page":null,"$per_page":null},"description":"List public email addresses for a user."},"add-emails":{"url":"/user/emails","method":"POST","params":{"emails":{"type":"Array","sendValueAsBody":true,"required":true,"validation":"","invalidmsg":"","description":"You can post a single email address or an array of addresses."}},"description":"Add email address(es)."},"delete-emails":{"url":"/user/emails","method":"DELETE","params":{"emails":{"type":"Array","sendValueAsBody":true,"required":true,"validation":"","invalidmsg":"","description":"You can post a single email address or an array of addresses."}},"description":"Delete email address(es)."},"toggle-primary-email-visibility":{"url":"/user/email/visibility","method":"PATCH","params":{},"description":"Toggle primary email visibility."},"get-followers-for-user":{"url":"/users/:username/followers","method":"GET","params":{"$username":null,"$page":null,"$per_page":null},"description":"List a user's followers"},"get-followers":{"url":"/user/followers","method":"GET","params":{"$page":null,"$per_page":null},"description":"List the authenticated user's followers"},"get-following-for-user":{"url":"/users/:username/following","method":"GET","params":{"$username":null,"$page":null,"$per_page":null},"description":"List who a user is following"},"get-following":{"url":"/user/following","method":"GET","params":{"$page":null,"$per_page":null},"description":"List who the authenticated user is following"},"check-following":{"url":"/user/following/:username","method":"GET","params":{"$username":null},"description":"Check if you are following a user"},"check-if-one-followers-other":{"url":"/users/:username/following/:target_user","method":"GET","params":{"$username":null,"target_user":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""}},"description":"Check if one user follows another"},"follow-user":{"url":"/user/following/:username","method":"PUT","params":{"$username":null},"description":"Follow a user"},"unfollow-user":{"url":"/user/following/:username","method":"DELETE","params":{"$username":null},"description":"Unfollow a user"},"get-keys-for-user":{"url":"/users/:username/keys","method":"GET","params":{"$username":null,"$page":null,"$per_page":null},"description":"List public keys for a user"},"get-keys":{"url":"/user/keys","method":"GET","params":{"$page":null,"$per_page":null},"description":"List your public keys"},"get-key":{"url":"/user/keys/:id","method":"GET","params":{"$id":null},"description":"Get a single public key"},"create-key":{"url":"/user/keys","method":"POST","params":{"$title":null,"$key":null},"description":"Create a public key"},"delete-key":{"url":"/user/keys/:id","method":"DELETE","params":{"$id":null},"description":"Delete a public key"},"get-gpg-keys-for-user":{"url":"/users/:username/gpg_keys","method":"GET","params":{"$username":null,"$page":null,"$per_page":null},"description":"Lists the GPG keys for a user. This information is accessible by anyone. (In preview period. See README.)"},"get-gpg-keys":{"url":"/user/gpg_keys","method":"GET","params":{"$page":null,"$per_page":null},"description":"List your GPG keys. (In preview period. See README.)"},"get-gpg-key":{"url":"/user/gpg_keys/:id","method":"GET","params":{"$id":null},"description":"Get a single GPG key. (In preview period. See README.)"},"create-gpg-key":{"url":"/user/gpg_keys","method":"POST","params":{"armored_public_key":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"GPG key contents"}},"description":"Create a GPG key. (In preview period. See README.)"},"delete-gpg-key":{"url":"/user/gpg_keys/:id","method":"DELETE","params":{"$id":null},"description":"Delete a GPG key. (In preview period. See README.)"},"promote":{"url":"/users/:username/site_admin","method":"PUT","params":{"$username":null},"description":"Promote an ordinary user to a site administrator"},"demote":{"url":"/users/:username/site_admin","method":"DELETE","params":{"$username":null},"description":"Demote a site administrator to an ordinary user"},"suspend":{"url":"/users/:username/suspended","method":"PUT","params":{"$username":null},"description":"Suspend a user"},"unsuspend":{"url":"/users/:username/suspended","method":"DELETE","params":{"$username":null},"description":"Unsuspend a user"},"get-blocked-users":{"url":"/user/blocks","method":"GET","params":{},"description":"List blocked users. (In preview period. See README.)"},"check-blocked-user":{"url":"/user/blocks/:username","method":"GET","params":{"$username":null},"description":"Check whether you've blocked a user. (In preview period. See README.)"},"block-user":{"url":"/user/blocks/:username","method":"PUT","params":{"$username":null},"description":"Block a user. (In preview period. See README.)"},"unblock-user":{"url":"/user/blocks/:username","method":"DELETE","params":{"$username":null},"description":"Unblock a user. (In preview period. See README.)"},"get-repo-invites":{"url":"/user/repository_invitations","method":"GET","params":{},"description":"List a user's repository invitations."},"accept-repo-invite":{"url":"/user/repository_invitations/:invitation_id","method":"PATCH","params":{"$invitation_id":null},"description":"Accept a repository invitation."},"decline-repo-invite":{"url":"/user/repository_invitations/:invitation_id","method":"DELETE","params":{"$invitation_id":null},"description":"Decline a repository invitation."},"get-installations":{"url":"/user/installations","method":"GET","params":{"$page":null,"$per_page":null},"description":"List installations. (In preview period. See README.)"},"get-installation-repos":{"url":"/user/installations/:installation_id/repositories","method":"GET","params":{"$installation_id":null,"$page":null,"$per_page":null},"description":"List repositories accessible to the user for an installation. (In preview period. See README.)"},"add-repo-to-installation":{"url":"/user/installations/:installation_id/repositories/:repository_id","method":"PUT","params":{"$installation_id":null,"$repository_id":null},"description":"Add a single repository to an installation. (In preview period. See README.)"},"remove-repo-from-installation":{"url":"/user/installations/:installation_id/repositories/:repository_id","method":"DELETE","params":{"$installation_id":null,"$repository_id":null},"description":"Remove a single repository from an installation. (In preview period. See README.)"},"get-marketplace-purchases":{"url":"/user/marketplace_purchases","method":"GET","params":{"$page":null,"$per_page":null},"description":"Get a user's Marketplace purchases. (In preview period. See README.)"},"get-marketplace-stubbed-purchases":{"url":"/user/marketplace_purchases/stubbed","method":"GET","params":{"$page":null,"$per_page":null},"description":"Get a user's stubbed Marketplace purchases. (In preview period. See README.)"}},"enterprise":{"stats":{"url":"/enterprise/stats/:type","method":"GET","params":{"type":{"type":"String","required":true,"validation":"^(issues|hooks|milestones|orgs|comments|pages|users|gists|pulls|repos|all)$","invalidmsg":"Possible values: issues, hooks, milestones, orgs, comments, pages, users, gists, pulls, repos, all.","description":"Possible values: issues, hooks, milestones, orgs, comments, pages, users, gists, pulls, repos, all.","enum":["issues","hooks","milestones","orgs","comments","pages","users","gists","pulls","repos","all"]}},"description":"Get statistics."},"update-ldap-for-user":{"url":"/admin/ldap/users/:username/mapping","method":"PATCH","params":{"$username":null,"ldap_dn":{"type":"String","required":true,"validation":"","invalidmsg":"Invalid DN","description":"LDAP DN for user"}},"description":"Update LDAP mapping for a user."},"sync-ldap-for-user":{"url":"/admin/ldap/users/:username/sync","method":"POST","params":{"$username":null},"description":"Sync LDAP mapping for a user."},"update-ldap-for-team":{"url":"/admin/ldap/teams/:team_id/mapping","method":"PATCH","params":{"team_id":{"type":"Number","required":true,"validation":"^[0-9]+$","invalidmsg":"","description":""},"ldap_dn":{"type":"String","required":true,"validation":"","invalidmsg":"Invalid DN","description":"LDAP DN for user"}},"description":"Update LDAP mapping for a team."},"sync-ldap-for-team":{"url":"/admin/ldap/teams/:team_id/sync","method":"POST","params":{"team_id":{"type":"Number","required":true,"validation":"^[0-9]+$","invalidmsg":"","description":""}},"description":"Sync LDAP mapping for a team."},"get-license":{"url":"/enterprise/settings/license","method":"GET","params":{},"description":"Get license information"},"get-pre-receive-environment":{"url":"/admin/pre-receive-environments/:id","method":"GET","params":{"$id":null},"description":"Get a single pre-receive environment. (In preview period. See README.)"},"get-pre-receive-environments":{"url":"/admin/pre_receive_environments","method":"GET","params":{},"description":"List pre-receive environments. (In preview period. See README.)"},"create-pre-receive-environment":{"url":"/admin/pre_receive_environments","method":"POST","params":{"name":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The new pre-receive environment's name."},"image_url":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"URL from which to download a tarball of this environment."}},"description":"Create a pre-receive environment. (In preview period. See README.)"},"edit-pre-receive-environment":{"url":"/admin/pre_receive_environments/:id","method":"PATCH","params":{"$id":null,"name":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"This pre-receive environment's new name."},"image_url":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"URL from which to download a tarball of this environment."}},"description":"Create a pre-receive environment. (In preview period. See README.)"},"delete-pre-receive-environment":{"url":"/admin/pre_receive_environments/:id","method":"DELETE","params":{"$id":null},"description":"Delete a pre-receive environment. (In preview period. See README.)"},"get-pre-receive-environment-download-status":{"url":"/admin/pre-receive-environments/:id/downloads/latest","method":"GET","params":{"$id":null},"description":"Get a pre-receive environment's download status. (In preview period. See README.)"},"trigger-pre-receive-environment-download":{"url":"/admin/pre_receive_environments/:id/downloads","method":"POST","params":{"$id":null},"description":"Trigger a pre-receive environment download. (In preview period. See README.)"},"get-pre-receive-hook":{"url":"/admin/pre-receive-hooks/:id","method":"GET","params":{"$id":null},"description":"Get a single pre-receive hook. (In preview period. See README.)"},"get-pre-receive-hooks":{"url":"/admin/pre-receive-hooks","method":"GET","params":{},"description":"List pre-receive hooks. (In preview period. See README.)"},"create-pre-receive-hook":{"url":"/admin/pre-receive-hooks","method":"POST","params":{"name":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The name of the hook."},"script":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The script that the hook runs."},"script_repository":{"type":"Json","required":true,"validation":"","invalidmsg":"","description":"The GitHub repository where the script is kept."},"environment":{"type":"Json","required":true,"validation":"","invalidmsg":"","description":"The pre-receive environment where the script is executed."},"enforcement":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The state of enforcement for this hook. default: disabled","default":"disabled"},"allow_downstream_configuration":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"Whether enforcement can be overridden at the org or repo level. default: false","default":"false"}},"description":"Create a pre-receive hook. (In preview period. See README.)"},"edit-pre-receive-hook":{"url":"/admin/pre_receive_hooks/:id","method":"PATCH","params":{"$id":null,"hook":{"type":"Json","sendValueAsBody":true,"required":true,"validation":"","invalidmsg":"","description":"JSON object that contains pre-receive hook info."}},"description":"Edit a pre-receive hook. (In preview period. See README.)"},"delete-pre-receive-hook":{"url":"/admin/pre_receive_hooks/:id","method":"DELETE","params":{"$id":null},"description":"Delete a pre-receive hook. (In preview period. See README.)"},"queue-indexing-job":{"url":"/staff/indexing_jobs","method":"POST","params":{"target":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"A string representing the item to index."}},"description":"Queue an indexing job"},"create-org":{"url":"/admin/organizations","method":"POST","params":{"login":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The organization's username."},"admin":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The login of the user who will manage this organization."},"profile_name":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The organization's display name."}},"description":"Create an organization"}}}

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = {"constants":{"name":"Github","description":"A Node.JS module, which provides an object oriented wrapper for the GitHub v3 API.","protocol":"https","host":"api.github.com","port":443,"documentation":"https://developer.github.com/v3","dateFormat":"YYYY-MM-DDTHH:MM:SSZ","requestFormat":"json","requestMedia":"application/vnd.github.v3+json"},"response-headers":["X-RateLimit-Limit","X-RateLimit-Remaining","X-RateLimit-Reset","X-Oauth-Scopes","X-Poll-Interval","X-GitHub-Request-Id","X-GitHub-Media-Type","X-GitHub-SSO","Retry-After","Link","Location","Last-Modified","Etag","Status"],"request-headers":["Authorization","If-Modified-Since","If-None-Match","Cookie","User-Agent","Accept","X-GitHub-OTP"],"params":{"files":{"type":"Json","required":true,"validation":"","invalidmsg":"","description":"Files that make up this gist. The key of which should be a required string filename and the value another required hash with parameters: 'content'"},"owner":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"username":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"org":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"repo":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"branch":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"sha":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"description":{"type":"String","required":false,"validation":"","invalidmsg":"","description":""},"id":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"gist_id":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"Id (SHA1 hash) of the gist."},"installation_id":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"repository_id":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"commit_id":{"type":"String","required":true,"validation":"","invalidmsg":"Sha of the commit to comment on.","description":"Sha of the commit to comment on."},"client_id":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"The 20 character OAuth app client key for which to create the token."},"column_id":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"project_id":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"repo_id":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"invitation_id":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"ref":{"type":"String","required":true,"allow-empty":true,"validation":"","invalidmsg":"","description":"String of the name of the fully qualified reference (ie: heads/master). If it doesn’t have at least one slash, it will be rejected."},"number":{"type":"Number","required":true,"validation":"^[0-9]+$","invalidmsg":"","description":""},"issue_number":{"type":"Number","required":true,"validation":"^[0-9]+$","invalidmsg":"","description":""},"name":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"direction":{"type":"String","required":false,"validation":"^(asc|desc)$","invalidmsg":"asc or desc, default: desc.","description":"","enum":["asc","desc"],"default":"desc"},"since":{"type":"Date","required":false,"validation":"","invalidmsg":"","description":"Timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ"},"until":{"type":"Date","required":false,"validation":"","invalidmsg":"","description":"Timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ"},"state":{"type":"String","required":false,"validation":"^(open|closed|all)$","invalidmsg":"open, closed, all, default: open","description":"","enum":["open","closed","all"],"default":"open"},"color":{"type":"String","required":true,"validation":"","invalidmsg":"6 character hex code, without a leading #.","description":"6 character hex code, without a leading #."},"base":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The branch (or git ref) you want your changes pulled into. This should be an existing branch on the current repository. You cannot submit a pull request to one repo that requests a merge to a base of another repo."},"head":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The branch (or git ref) where your changes are implemented."},"path":{"type":"String","required":true,"validation":"","invalidmsg":"Relative path of the file to comment on.","description":"Relative path of the file to comment on."},"position":{"type":"Number","required":true,"validation":"","invalidmsg":"Column index in the diff to comment on.","description":"Column index in the diff to comment on."},"body":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"homepage":{"type":"String","required":false,"validation":"","invalidmsg":"","description":""},"private":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"True to create a private repository, false to create a public one. Creating private repositories requires a paid GitHub account. Default is false.","default":"false"},"has_issues":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"True to enable issues for this repository, false to disable them. Default is true.","default":"true"},"has_projects":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"True to enable projects for this repository, false to disable them. Default is true.","default":"true"},"has_wiki":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"True to enable the wiki for this repository, false to disable it. Default is true.","default":"true"},"has_downloads":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"True to enable downloads for this repository, false to disable them. Default is true.","default":"true"},"default_branch":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Updates the default branch for this repository."},"title":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"key":{"type":"String","required":true,"validation":"","invalidmsg":"","description":""},"page":{"type":"Number","required":false,"validation":"^[0-9]+$","invalidmsg":"","description":"Page number of the results to fetch."},"per_page":{"type":"Number","required":false,"validation":"^[0-9]+$","invalidmsg":"","description":"A custom page size up to 100. Default is 30.","default":"30"},"scopes":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"A list of scopes that this authorization is in."},"note":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"A note to remind you what the OAuth token is for."},"note_url":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"A URL to remind you what app the OAuth token is for."},"auto_init":{"type":"Boolean","required":false,"validation":"","invalidmsg":"","description":"True to create an initial commit with empty README. Default is false","default":"false"},"gitignore_template":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Desired language or platform .gitignore template to apply. Ignored if auto_init parameter is not provided."},"license_template":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"Desired LICENSE template to apply. Use the name of the template without the extension. For example, \"mit\" or \"mozilla\"."},"order":{"type":"String","required":false,"validation":"^(asc|desc)$","invalidmsg":"The sort order if sort parameter is provided. One of asc or desc. Default: desc","description":"asc or desc","enum":["asc","desc"],"default":"desc"},"q":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"Search Term","combined":true},"data":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"Raw data to send as the body of the request"},"privacy":{"type":"String","required":false,"validation":"^(secret|closed)$","invalidmsg":"secret, closed, default: secret","description":"The level of privacy this team should have.","enum":["secret","closed"],"default":"secret"},"fingerprint":{"type":"String","required":false,"validation":"","invalidmsg":"","description":"A unique string to distinguish an authorization from others created for the same client ID and user."},"access_token":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"OAuth token"},"assignees":{"type":"Array","required":false,"validation":"","invalidmsg":"","description":"Logins for Users to assign to this issue. NOTE: Only users with push access can set assignees for new issues. Assignees are silently dropped otherwise."},"url":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"Dynamic URL for release asset uploads returned by the release’s API response."},"contentType":{"type":"String","required":true,"validation":"","invalidmsg":"","description":"The content type of a release asset upload."},"contentLength":{"type":"Number","required":true,"validation":"","invalidmsg":"","description":"Size of release asset upload in bytes."}},"acceptTree":{"application/vnd.github.giant-sentry-fist-preview+json":["/orgs/:org/blocks","/orgs/:org/blocks/:username","/user/blocks","/user/blocks/:username"],"application/vnd.github.scarlet-witch-preview+json":["/codes_of_conduct","/codes_of_conduct/:key","/repos/:owner/:repo","/repos/:owner/:repo/community/code_of_conduct"],"application/vnd.github.cloak-preview+json":["/search/commits"],"application/vnd.github.black-panther-preview+json":["/repos/:owner/:name/community/profile"],"application/vnd.github.ant-man-preview+json":["/repos/:owner/:repo/deployments","/repos/:owner/:repo/deployments/:id/statuses"],"application/vnd.github.cryptographer-preview":["/users/:username/gpg_keys","/user/gpg_keys","/user/gpg_keys/:id","/repos/:owner/:repo/commits/:sha"],"application/vnd.github.barred-rock-preview":["/repos/:owner/:repo/import/authors","/repos/:owner/:repo/import/authors/:author_id","/:owner/:name/import/lfs","/:owner/:name/import/large_files","/repos/:owner/:repo/import"],"application/vnd.github.machine-man-preview":["/app/installations","/installations/:installation_id/access_tokens","/installation/repositories","/installations/:installation_id/repositories/:repository_id","/apps/:app_slug","/app/installations/:installation_id","/user/installations","/user/installations/:installation_id/repositories/:repository_id"],"application/vnd.github.drax-preview+json":["/licenses","/licenses/:license","/repos/:owner/:repo","/repos/:owner/:repo/license"],"application/vnd.github.valkyrie-preview+json":["/marketplace_listing/plans","/marketplace_listing/stubbed/plans","/marketplace_listing/plans/:id/accounts","/marketplace_listing/stubbed/plans/:id/accounts","/marketplace_listing/accounts/:id","/marketplace_listing/stubbed/accounts/:id","/user/marketplace_purchases","/user/marketplace_purchases/stubbed"],"application/vnd.github.wyandotte-preview+json":["/orgs/:org/migrations","/orgs/:org/migrations/:id","/orgs/:org/migrations/:id/archive","/orgs/:org/migrations/:id/repos/:repo_name/lock"],"application/vnd.github.hellcat-preview+json":["/orgs/:org/teams","/teams/:id","/teams/:id/teams","/teams/:id/members","/teams/:id/memberships/:username","/teams/:id/repos","/teams/:id/repos/:owner/:repo","/teams/:id/repos/:org/:repo","/user/teams"],"application/vnd.github.mister-fantastic-preview+json":["/repos/:owner/:repo/pages","/repos/:owner/:repo/pages/builds","/repos/:owner/:repo/pages/builds/latest","/repos/:owner/:repo/pages/builds/:id"],"application/vnd.github.eye-scream-preview":["/admin/pre-receive-environments/:id","/admin/pre_receive_environments","/admin/pre-receive-environments/:id/downloads/latest","/admin/pre_receive_environments/:id/downloads","/admin/pre-receive-hooks/:id","/admin/pre-receive-hooks"],"application/vnd.github.inertia-preview+json":["/repos/:owner/:repo/projects","/orgs/:org/projects","/projects/:id","/projects/columns/:column_id/cards","/projects/columns/cards/:id","/projects/columns/cards/:id/moves","/projects/:project_id/columns","/projects/columns/:id","/projects/columns/:id/moves"],"application/vnd.github.polaris-preview":["/repos/:owner/:repo/pulls/:number/merge"],"application/vnd.github.squirrel-girl-preview":["/issues","/user/issues","/orgs/:org/issues","/repos/:owner/:repo/issues","/repos/:owner/:repo/issues/:number","/repos/:owner/:repo/comments/:id/reactions","/repos/:owner/:repo/issues/comments","/repos/:owner/:repo/issues/comments/:id","/repos/:owner/:repo/issues/:number/comments","/repos/:owner/:repo/issues/:number/reactions","/repos/:owner/:repo/issues/comments/:id/reactions","/repos/:owner/:repo/pulls/comments/:id/reactions","/reactions/:id","/repos/:owner/:repo/pulls/:number/comments","/repos/:owner/:repo/pulls/comments","/repos/:owner/:repo/pulls/comments/:id"],"application/vnd.github.thor-preview+json":["/repos/:owner/:repo/pulls/:number/requested_reviewers"],"application/vnd.github.v3.star+json":["/repos/:owner/:repo/stargazers","/users/:username/starred","/user/starred"],"application/vnd.github.mockingbird-preview":["/repos/:owner/:repo/issues/:issue_number/timeline"],"application/vnd.github.mercy-preview+json":["/repos/:owner/:repo/topics","/search/repositories"]}}

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function (global, factory) {
   true ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.async = global.async || {})));
}(this, (function (exports) { 'use strict';

function slice(arrayLike, start) {
    start = start|0;
    var newLen = Math.max(arrayLike.length - start, 0);
    var newArr = Array(newLen);
    for(var idx = 0; idx < newLen; idx++)  {
        newArr[idx] = arrayLike[start + idx];
    }
    return newArr;
}

/**
 * Creates a continuation function with some arguments already applied.
 *
 * Useful as a shorthand when combined with other control flow functions. Any
 * arguments passed to the returned function are added to the arguments
 * originally passed to apply.
 *
 * @name apply
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {Function} fn - The function you want to eventually apply all
 * arguments to. Invokes with (arguments...).
 * @param {...*} arguments... - Any number of arguments to automatically apply
 * when the continuation is called.
 * @returns {Function} the partially-applied function
 * @example
 *
 * // using apply
 * async.parallel([
 *     async.apply(fs.writeFile, 'testfile1', 'test1'),
 *     async.apply(fs.writeFile, 'testfile2', 'test2')
 * ]);
 *
 *
 * // the same process without using apply
 * async.parallel([
 *     function(callback) {
 *         fs.writeFile('testfile1', 'test1', callback);
 *     },
 *     function(callback) {
 *         fs.writeFile('testfile2', 'test2', callback);
 *     }
 * ]);
 *
 * // It's possible to pass any number of additional arguments when calling the
 * // continuation:
 *
 * node> var fn = async.apply(sys.puts, 'one');
 * node> fn('two', 'three');
 * one
 * two
 * three
 */
var apply = function(fn/*, ...args*/) {
    var args = slice(arguments, 1);
    return function(/*callArgs*/) {
        var callArgs = slice(arguments);
        return fn.apply(null, args.concat(callArgs));
    };
};

var initialParams = function (fn) {
    return function (/*...args, callback*/) {
        var args = slice(arguments);
        var callback = args.pop();
        fn.call(this, args, callback);
    };
};

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var hasSetImmediate = typeof setImmediate === 'function' && setImmediate;
var hasNextTick = typeof process === 'object' && typeof process.nextTick === 'function';

function fallback(fn) {
    setTimeout(fn, 0);
}

function wrap(defer) {
    return function (fn/*, ...args*/) {
        var args = slice(arguments, 1);
        defer(function () {
            fn.apply(null, args);
        });
    };
}

var _defer;

if (hasSetImmediate) {
    _defer = setImmediate;
} else if (hasNextTick) {
    _defer = process.nextTick;
} else {
    _defer = fallback;
}

var setImmediate$1 = wrap(_defer);

/**
 * Take a sync function and make it async, passing its return value to a
 * callback. This is useful for plugging sync functions into a waterfall,
 * series, or other async functions. Any arguments passed to the generated
 * function will be passed to the wrapped function (except for the final
 * callback argument). Errors thrown will be passed to the callback.
 *
 * If the function passed to `asyncify` returns a Promise, that promises's
 * resolved/rejected state will be used to call the callback, rather than simply
 * the synchronous return value.
 *
 * This also means you can asyncify ES2017 `async` functions.
 *
 * @name asyncify
 * @static
 * @memberOf module:Utils
 * @method
 * @alias wrapSync
 * @category Util
 * @param {Function} func - The synchronous function, or Promise-returning
 * function to convert to an {@link AsyncFunction}.
 * @returns {AsyncFunction} An asynchronous wrapper of the `func`. To be
 * invoked with `(args..., callback)`.
 * @example
 *
 * // passing a regular synchronous function
 * async.waterfall([
 *     async.apply(fs.readFile, filename, "utf8"),
 *     async.asyncify(JSON.parse),
 *     function (data, next) {
 *         // data is the result of parsing the text.
 *         // If there was a parsing error, it would have been caught.
 *     }
 * ], callback);
 *
 * // passing a function returning a promise
 * async.waterfall([
 *     async.apply(fs.readFile, filename, "utf8"),
 *     async.asyncify(function (contents) {
 *         return db.model.create(contents);
 *     }),
 *     function (model, next) {
 *         // `model` is the instantiated model object.
 *         // If there was an error, this function would be skipped.
 *     }
 * ], callback);
 *
 * // es2017 example, though `asyncify` is not needed if your JS environment
 * // supports async functions out of the box
 * var q = async.queue(async.asyncify(async function(file) {
 *     var intermediateStep = await processFile(file);
 *     return await somePromise(intermediateStep)
 * }));
 *
 * q.push(files);
 */
function asyncify(func) {
    return initialParams(function (args, callback) {
        var result;
        try {
            result = func.apply(this, args);
        } catch (e) {
            return callback(e);
        }
        // if result is Promise object
        if (isObject(result) && typeof result.then === 'function') {
            result.then(function(value) {
                invokeCallback(callback, null, value);
            }, function(err) {
                invokeCallback(callback, err.message ? err : new Error(err));
            });
        } else {
            callback(null, result);
        }
    });
}

function invokeCallback(callback, error, value) {
    try {
        callback(error, value);
    } catch (e) {
        setImmediate$1(rethrow, e);
    }
}

function rethrow(error) {
    throw error;
}

var supportsSymbol = typeof Symbol === 'function';

function isAsync(fn) {
    return supportsSymbol && fn[Symbol.toStringTag] === 'AsyncFunction';
}

function wrapAsync(asyncFn) {
    return isAsync(asyncFn) ? asyncify(asyncFn) : asyncFn;
}

function applyEach$1(eachfn) {
    return function(fns/*, ...args*/) {
        var args = slice(arguments, 1);
        var go = initialParams(function(args, callback) {
            var that = this;
            return eachfn(fns, function (fn, cb) {
                wrapAsync(fn).apply(that, args.concat(cb));
            }, callback);
        });
        if (args.length) {
            return go.apply(this, args);
        }
        else {
            return go;
        }
    };
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol$1 = root.Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]';
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

// A temporary value used to identify if the loop should be broken.
// See #1064, #1293
var breakLoop = {};

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

function once(fn) {
    return function () {
        if (fn === null) return;
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}

var iteratorSymbol = typeof Symbol === 'function' && Symbol.iterator;

var getIterator = function (coll) {
    return iteratorSymbol && coll[iteratorSymbol] && coll[iteratorSymbol]();
};

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$2.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]';
var arrayTag = '[object Array]';
var boolTag = '[object Boolean]';
var dateTag = '[object Date]';
var errorTag = '[object Error]';
var funcTag$1 = '[object Function]';
var mapTag = '[object Map]';
var numberTag = '[object Number]';
var objectTag = '[object Object]';
var regexpTag = '[object RegExp]';
var setTag = '[object Set]';
var stringTag = '[object String]';
var weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]';
var dataViewTag = '[object DataView]';
var float32Tag = '[object Float32Array]';
var float64Tag = '[object Float64Array]';
var int8Tag = '[object Int8Array]';
var int16Tag = '[object Int16Array]';
var int32Tag = '[object Int32Array]';
var uint8Tag = '[object Uint8Array]';
var uint8ClampedTag = '[object Uint8ClampedArray]';
var uint16Tag = '[object Uint16Array]';
var uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/** Detect free variable `exports`. */
var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports$1 && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$1.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

  return value === proto;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$3.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

function createArrayIterator(coll) {
    var i = -1;
    var len = coll.length;
    return function next() {
        return ++i < len ? {value: coll[i], key: i} : null;
    }
}

function createES2015Iterator(iterator) {
    var i = -1;
    return function next() {
        var item = iterator.next();
        if (item.done)
            return null;
        i++;
        return {value: item.value, key: i};
    }
}

function createObjectIterator(obj) {
    var okeys = keys(obj);
    var i = -1;
    var len = okeys.length;
    return function next() {
        var key = okeys[++i];
        return i < len ? {value: obj[key], key: key} : null;
    };
}

function iterator(coll) {
    if (isArrayLike(coll)) {
        return createArrayIterator(coll);
    }

    var iterator = getIterator(coll);
    return iterator ? createES2015Iterator(iterator) : createObjectIterator(coll);
}

function onlyOnce(fn) {
    return function() {
        if (fn === null) throw new Error("Callback was already called.");
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}

function _eachOfLimit(limit) {
    return function (obj, iteratee, callback) {
        callback = once(callback || noop);
        if (limit <= 0 || !obj) {
            return callback(null);
        }
        var nextElem = iterator(obj);
        var done = false;
        var running = 0;
        var looping = false;

        function iterateeCallback(err, value) {
            running -= 1;
            if (err) {
                done = true;
                callback(err);
            }
            else if (value === breakLoop || (done && running <= 0)) {
                done = true;
                return callback(null);
            }
            else if (!looping) {
                replenish();
            }
        }

        function replenish () {
            looping = true;
            while (running < limit && !done) {
                var elem = nextElem();
                if (elem === null) {
                    done = true;
                    if (running <= 0) {
                        callback(null);
                    }
                    return;
                }
                running += 1;
                iteratee(elem.value, elem.key, onlyOnce(iterateeCallback));
            }
            looping = false;
        }

        replenish();
    };
}

/**
 * The same as [`eachOf`]{@link module:Collections.eachOf} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name eachOfLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.eachOf]{@link module:Collections.eachOf}
 * @alias forEachOfLimit
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async function to apply to each
 * item in `coll`. The `key` is the item's key, or index in the case of an
 * array.
 * Invoked with (item, key, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 */
function eachOfLimit(coll, limit, iteratee, callback) {
    _eachOfLimit(limit)(coll, wrapAsync(iteratee), callback);
}

function doLimit(fn, limit) {
    return function (iterable, iteratee, callback) {
        return fn(iterable, limit, iteratee, callback);
    };
}

// eachOf implementation optimized for array-likes
function eachOfArrayLike(coll, iteratee, callback) {
    callback = once(callback || noop);
    var index = 0,
        completed = 0,
        length = coll.length;
    if (length === 0) {
        callback(null);
    }

    function iteratorCallback(err, value) {
        if (err) {
            callback(err);
        } else if ((++completed === length) || value === breakLoop) {
            callback(null);
        }
    }

    for (; index < length; index++) {
        iteratee(coll[index], index, onlyOnce(iteratorCallback));
    }
}

// a generic version of eachOf which can handle array, object, and iterator cases.
var eachOfGeneric = doLimit(eachOfLimit, Infinity);

/**
 * Like [`each`]{@link module:Collections.each}, except that it passes the key (or index) as the second argument
 * to the iteratee.
 *
 * @name eachOf
 * @static
 * @memberOf module:Collections
 * @method
 * @alias forEachOf
 * @category Collection
 * @see [async.each]{@link module:Collections.each}
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each
 * item in `coll`.
 * The `key` is the item's key, or index in the case of an array.
 * Invoked with (item, key, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @example
 *
 * var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
 * var configs = {};
 *
 * async.forEachOf(obj, function (value, key, callback) {
 *     fs.readFile(__dirname + value, "utf8", function (err, data) {
 *         if (err) return callback(err);
 *         try {
 *             configs[key] = JSON.parse(data);
 *         } catch (e) {
 *             return callback(e);
 *         }
 *         callback();
 *     });
 * }, function (err) {
 *     if (err) console.error(err.message);
 *     // configs is now a map of JSON data
 *     doSomethingWith(configs);
 * });
 */
var eachOf = function(coll, iteratee, callback) {
    var eachOfImplementation = isArrayLike(coll) ? eachOfArrayLike : eachOfGeneric;
    eachOfImplementation(coll, wrapAsync(iteratee), callback);
};

function doParallel(fn) {
    return function (obj, iteratee, callback) {
        return fn(eachOf, obj, wrapAsync(iteratee), callback);
    };
}

function _asyncMap(eachfn, arr, iteratee, callback) {
    callback = callback || noop;
    arr = arr || [];
    var results = [];
    var counter = 0;
    var _iteratee = wrapAsync(iteratee);

    eachfn(arr, function (value, _, callback) {
        var index = counter++;
        _iteratee(value, function (err, v) {
            results[index] = v;
            callback(err);
        });
    }, function (err) {
        callback(err, results);
    });
}

/**
 * Produces a new collection of values by mapping each value in `coll` through
 * the `iteratee` function. The `iteratee` is called with an item from `coll`
 * and a callback for when it has finished processing. Each of these callback
 * takes 2 arguments: an `error`, and the transformed item from `coll`. If
 * `iteratee` passes an error to its callback, the main `callback` (for the
 * `map` function) is immediately called with the error.
 *
 * Note, that since this function applies the `iteratee` to each item in
 * parallel, there is no guarantee that the `iteratee` functions will complete
 * in order. However, the results array will be in the same order as the
 * original `coll`.
 *
 * If `map` is passed an Object, the results will be an Array.  The results
 * will roughly be in the order of the original Objects' keys (but this can
 * vary across JavaScript engines).
 *
 * @name map
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with the transformed item.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Results is an Array of the
 * transformed items from the `coll`. Invoked with (err, results).
 * @example
 *
 * async.map(['file1','file2','file3'], fs.stat, function(err, results) {
 *     // results is now an array of stats for each file
 * });
 */
var map = doParallel(_asyncMap);

/**
 * Applies the provided arguments to each function in the array, calling
 * `callback` after all functions have completed. If you only provide the first
 * argument, `fns`, then it will return a function which lets you pass in the
 * arguments as if it were a single function call. If more arguments are
 * provided, `callback` is required while `args` is still optional.
 *
 * @name applyEach
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array|Iterable|Object} fns - A collection of {@link AsyncFunction}s
 * to all call with the same arguments
 * @param {...*} [args] - any number of separate arguments to pass to the
 * function.
 * @param {Function} [callback] - the final argument should be the callback,
 * called when all functions have completed processing.
 * @returns {Function} - If only the first argument, `fns`, is provided, it will
 * return a function which lets you pass in the arguments as if it were a single
 * function call. The signature is `(..args, callback)`. If invoked with any
 * arguments, `callback` is required.
 * @example
 *
 * async.applyEach([enableSearch, updateSchema], 'bucket', callback);
 *
 * // partial application example:
 * async.each(
 *     buckets,
 *     async.applyEach([enableSearch, updateSchema]),
 *     callback
 * );
 */
var applyEach = applyEach$1(map);

function doParallelLimit(fn) {
    return function (obj, limit, iteratee, callback) {
        return fn(_eachOfLimit(limit), obj, wrapAsync(iteratee), callback);
    };
}

/**
 * The same as [`map`]{@link module:Collections.map} but runs a maximum of `limit` async operations at a time.
 *
 * @name mapLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.map]{@link module:Collections.map}
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with the transformed item.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Results is an array of the
 * transformed items from the `coll`. Invoked with (err, results).
 */
var mapLimit = doParallelLimit(_asyncMap);

/**
 * The same as [`map`]{@link module:Collections.map} but runs only a single async operation at a time.
 *
 * @name mapSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.map]{@link module:Collections.map}
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with the transformed item.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Results is an array of the
 * transformed items from the `coll`. Invoked with (err, results).
 */
var mapSeries = doLimit(mapLimit, 1);

/**
 * The same as [`applyEach`]{@link module:ControlFlow.applyEach} but runs only a single async operation at a time.
 *
 * @name applyEachSeries
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.applyEach]{@link module:ControlFlow.applyEach}
 * @category Control Flow
 * @param {Array|Iterable|Object} fns - A collection of {@link AsyncFunction}s to all
 * call with the same arguments
 * @param {...*} [args] - any number of separate arguments to pass to the
 * function.
 * @param {Function} [callback] - the final argument should be the callback,
 * called when all functions have completed processing.
 * @returns {Function} - If only the first argument is provided, it will return
 * a function which lets you pass in the arguments as if it were a single
 * function call.
 */
var applyEachSeries = applyEach$1(mapSeries);

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

/**
 * Determines the best order for running the {@link AsyncFunction}s in `tasks`, based on
 * their requirements. Each function can optionally depend on other functions
 * being completed first, and each function is run as soon as its requirements
 * are satisfied.
 *
 * If any of the {@link AsyncFunction}s pass an error to their callback, the `auto` sequence
 * will stop. Further tasks will not execute (so any other functions depending
 * on it will not run), and the main `callback` is immediately called with the
 * error.
 *
 * {@link AsyncFunction}s also receive an object containing the results of functions which
 * have completed so far as the first argument, if they have dependencies. If a
 * task function has no dependencies, it will only be passed a callback.
 *
 * @name auto
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Object} tasks - An object. Each of its properties is either a
 * function or an array of requirements, with the {@link AsyncFunction} itself the last item
 * in the array. The object's key of a property serves as the name of the task
 * defined by that property, i.e. can be used when specifying requirements for
 * other tasks. The function receives one or two arguments:
 * * a `results` object, containing the results of the previously executed
 *   functions, only passed if the task has any dependencies,
 * * a `callback(err, result)` function, which must be called when finished,
 *   passing an `error` (which can be `null`) and the result of the function's
 *   execution.
 * @param {number} [concurrency=Infinity] - An optional `integer` for
 * determining the maximum number of tasks that can be run in parallel. By
 * default, as many as possible.
 * @param {Function} [callback] - An optional callback which is called when all
 * the tasks have been completed. It receives the `err` argument if any `tasks`
 * pass an error to their callback. Results are always returned; however, if an
 * error occurs, no further `tasks` will be performed, and the results object
 * will only contain partial results. Invoked with (err, results).
 * @returns undefined
 * @example
 *
 * async.auto({
 *     // this function will just be passed a callback
 *     readData: async.apply(fs.readFile, 'data.txt', 'utf-8'),
 *     showData: ['readData', function(results, cb) {
 *         // results.readData is the file's contents
 *         // ...
 *     }]
 * }, callback);
 *
 * async.auto({
 *     get_data: function(callback) {
 *         console.log('in get_data');
 *         // async code to get some data
 *         callback(null, 'data', 'converted to array');
 *     },
 *     make_folder: function(callback) {
 *         console.log('in make_folder');
 *         // async code to create a directory to store a file in
 *         // this is run at the same time as getting the data
 *         callback(null, 'folder');
 *     },
 *     write_file: ['get_data', 'make_folder', function(results, callback) {
 *         console.log('in write_file', JSON.stringify(results));
 *         // once there is some data and the directory exists,
 *         // write the data to a file in the directory
 *         callback(null, 'filename');
 *     }],
 *     email_link: ['write_file', function(results, callback) {
 *         console.log('in email_link', JSON.stringify(results));
 *         // once the file is written let's email a link to it...
 *         // results.write_file contains the filename returned by write_file.
 *         callback(null, {'file':results.write_file, 'email':'user@example.com'});
 *     }]
 * }, function(err, results) {
 *     console.log('err = ', err);
 *     console.log('results = ', results);
 * });
 */
var auto = function (tasks, concurrency, callback) {
    if (typeof concurrency === 'function') {
        // concurrency is optional, shift the args.
        callback = concurrency;
        concurrency = null;
    }
    callback = once(callback || noop);
    var keys$$1 = keys(tasks);
    var numTasks = keys$$1.length;
    if (!numTasks) {
        return callback(null);
    }
    if (!concurrency) {
        concurrency = numTasks;
    }

    var results = {};
    var runningTasks = 0;
    var hasError = false;

    var listeners = Object.create(null);

    var readyTasks = [];

    // for cycle detection:
    var readyToCheck = []; // tasks that have been identified as reachable
    // without the possibility of returning to an ancestor task
    var uncheckedDependencies = {};

    baseForOwn(tasks, function (task, key) {
        if (!isArray(task)) {
            // no dependencies
            enqueueTask(key, [task]);
            readyToCheck.push(key);
            return;
        }

        var dependencies = task.slice(0, task.length - 1);
        var remainingDependencies = dependencies.length;
        if (remainingDependencies === 0) {
            enqueueTask(key, task);
            readyToCheck.push(key);
            return;
        }
        uncheckedDependencies[key] = remainingDependencies;

        arrayEach(dependencies, function (dependencyName) {
            if (!tasks[dependencyName]) {
                throw new Error('async.auto task `' + key +
                    '` has a non-existent dependency `' +
                    dependencyName + '` in ' +
                    dependencies.join(', '));
            }
            addListener(dependencyName, function () {
                remainingDependencies--;
                if (remainingDependencies === 0) {
                    enqueueTask(key, task);
                }
            });
        });
    });

    checkForDeadlocks();
    processQueue();

    function enqueueTask(key, task) {
        readyTasks.push(function () {
            runTask(key, task);
        });
    }

    function processQueue() {
        if (readyTasks.length === 0 && runningTasks === 0) {
            return callback(null, results);
        }
        while(readyTasks.length && runningTasks < concurrency) {
            var run = readyTasks.shift();
            run();
        }

    }

    function addListener(taskName, fn) {
        var taskListeners = listeners[taskName];
        if (!taskListeners) {
            taskListeners = listeners[taskName] = [];
        }

        taskListeners.push(fn);
    }

    function taskComplete(taskName) {
        var taskListeners = listeners[taskName] || [];
        arrayEach(taskListeners, function (fn) {
            fn();
        });
        processQueue();
    }


    function runTask(key, task) {
        if (hasError) return;

        var taskCallback = onlyOnce(function(err, result) {
            runningTasks--;
            if (arguments.length > 2) {
                result = slice(arguments, 1);
            }
            if (err) {
                var safeResults = {};
                baseForOwn(results, function(val, rkey) {
                    safeResults[rkey] = val;
                });
                safeResults[key] = result;
                hasError = true;
                listeners = Object.create(null);

                callback(err, safeResults);
            } else {
                results[key] = result;
                taskComplete(key);
            }
        });

        runningTasks++;
        var taskFn = wrapAsync(task[task.length - 1]);
        if (task.length > 1) {
            taskFn(results, taskCallback);
        } else {
            taskFn(taskCallback);
        }
    }

    function checkForDeadlocks() {
        // Kahn's algorithm
        // https://en.wikipedia.org/wiki/Topological_sorting#Kahn.27s_algorithm
        // http://connalle.blogspot.com/2013/10/topological-sortingkahn-algorithm.html
        var currentTask;
        var counter = 0;
        while (readyToCheck.length) {
            currentTask = readyToCheck.pop();
            counter++;
            arrayEach(getDependents(currentTask), function (dependent) {
                if (--uncheckedDependencies[dependent] === 0) {
                    readyToCheck.push(dependent);
                }
            });
        }

        if (counter !== numTasks) {
            throw new Error(
                'async.auto cannot execute tasks due to a recursive dependency'
            );
        }
    }

    function getDependents(taskName) {
        var result = [];
        baseForOwn(tasks, function (task, key) {
            if (isArray(task) && baseIndexOf(task, taskName, 0) >= 0) {
                result.push(key);
            }
        });
        return result;
    }
};

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined;
var symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the last unmatched string symbol.
 */
function charsEndIndex(strSymbols, chrSymbols) {
  var index = strSymbols.length;

  while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}

/**
 * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the first unmatched string symbol.
 */
function charsStartIndex(strSymbols, chrSymbols) {
  var index = -1,
      length = strSymbols.length;

  while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff';
var rsComboMarksRange = '\\u0300-\\u036f';
var reComboHalfMarksRange = '\\ufe20-\\ufe2f';
var rsComboSymbolsRange = '\\u20d0-\\u20ff';
var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
var rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

/** Used to compose unicode character classes. */
var rsAstralRange$1 = '\\ud800-\\udfff';
var rsComboMarksRange$1 = '\\u0300-\\u036f';
var reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f';
var rsComboSymbolsRange$1 = '\\u20d0-\\u20ff';
var rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
var rsVarRange$1 = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange$1 + ']';
var rsCombo = '[' + rsComboRange$1 + ']';
var rsFitz = '\\ud83c[\\udffb-\\udfff]';
var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
var rsNonAstral = '[^' + rsAstralRange$1 + ']';
var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
var rsZWJ$1 = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?';
var rsOptVar = '[' + rsVarRange$1 + ']?';
var rsOptJoin = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trim('  abc  ');
 * // => 'abc'
 *
 * _.trim('-_-abc-_-', '_-');
 * // => 'abc'
 *
 * _.map(['  foo  ', '  bar  '], _.trim);
 * // => ['foo', 'bar']
 */
function trim(string, chars, guard) {
  string = toString(string);
  if (string && (guard || chars === undefined)) {
    return string.replace(reTrim, '');
  }
  if (!string || !(chars = baseToString(chars))) {
    return string;
  }
  var strSymbols = stringToArray(string),
      chrSymbols = stringToArray(chars),
      start = charsStartIndex(strSymbols, chrSymbols),
      end = charsEndIndex(strSymbols, chrSymbols) + 1;

  return castSlice(strSymbols, start, end).join('');
}

var FN_ARGS = /^(?:async\s+)?(function)?\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /(=.+)?(\s*)$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

function parseParams(func) {
    func = func.toString().replace(STRIP_COMMENTS, '');
    func = func.match(FN_ARGS)[2].replace(' ', '');
    func = func ? func.split(FN_ARG_SPLIT) : [];
    func = func.map(function (arg){
        return trim(arg.replace(FN_ARG, ''));
    });
    return func;
}

/**
 * A dependency-injected version of the [async.auto]{@link module:ControlFlow.auto} function. Dependent
 * tasks are specified as parameters to the function, after the usual callback
 * parameter, with the parameter names matching the names of the tasks it
 * depends on. This can provide even more readable task graphs which can be
 * easier to maintain.
 *
 * If a final callback is specified, the task results are similarly injected,
 * specified as named parameters after the initial error parameter.
 *
 * The autoInject function is purely syntactic sugar and its semantics are
 * otherwise equivalent to [async.auto]{@link module:ControlFlow.auto}.
 *
 * @name autoInject
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.auto]{@link module:ControlFlow.auto}
 * @category Control Flow
 * @param {Object} tasks - An object, each of whose properties is an {@link AsyncFunction} of
 * the form 'func([dependencies...], callback). The object's key of a property
 * serves as the name of the task defined by that property, i.e. can be used
 * when specifying requirements for other tasks.
 * * The `callback` parameter is a `callback(err, result)` which must be called
 *   when finished, passing an `error` (which can be `null`) and the result of
 *   the function's execution. The remaining parameters name other tasks on
 *   which the task is dependent, and the results from those tasks are the
 *   arguments of those parameters.
 * @param {Function} [callback] - An optional callback which is called when all
 * the tasks have been completed. It receives the `err` argument if any `tasks`
 * pass an error to their callback, and a `results` object with any completed
 * task results, similar to `auto`.
 * @example
 *
 * //  The example from `auto` can be rewritten as follows:
 * async.autoInject({
 *     get_data: function(callback) {
 *         // async code to get some data
 *         callback(null, 'data', 'converted to array');
 *     },
 *     make_folder: function(callback) {
 *         // async code to create a directory to store a file in
 *         // this is run at the same time as getting the data
 *         callback(null, 'folder');
 *     },
 *     write_file: function(get_data, make_folder, callback) {
 *         // once there is some data and the directory exists,
 *         // write the data to a file in the directory
 *         callback(null, 'filename');
 *     },
 *     email_link: function(write_file, callback) {
 *         // once the file is written let's email a link to it...
 *         // write_file contains the filename returned by write_file.
 *         callback(null, {'file':write_file, 'email':'user@example.com'});
 *     }
 * }, function(err, results) {
 *     console.log('err = ', err);
 *     console.log('email_link = ', results.email_link);
 * });
 *
 * // If you are using a JS minifier that mangles parameter names, `autoInject`
 * // will not work with plain functions, since the parameter names will be
 * // collapsed to a single letter identifier.  To work around this, you can
 * // explicitly specify the names of the parameters your task function needs
 * // in an array, similar to Angular.js dependency injection.
 *
 * // This still has an advantage over plain `auto`, since the results a task
 * // depends on are still spread into arguments.
 * async.autoInject({
 *     //...
 *     write_file: ['get_data', 'make_folder', function(get_data, make_folder, callback) {
 *         callback(null, 'filename');
 *     }],
 *     email_link: ['write_file', function(write_file, callback) {
 *         callback(null, {'file':write_file, 'email':'user@example.com'});
 *     }]
 *     //...
 * }, function(err, results) {
 *     console.log('err = ', err);
 *     console.log('email_link = ', results.email_link);
 * });
 */
function autoInject(tasks, callback) {
    var newTasks = {};

    baseForOwn(tasks, function (taskFn, key) {
        var params;
        var fnIsAsync = isAsync(taskFn);
        var hasNoDeps =
            (!fnIsAsync && taskFn.length === 1) ||
            (fnIsAsync && taskFn.length === 0);

        if (isArray(taskFn)) {
            params = taskFn.slice(0, -1);
            taskFn = taskFn[taskFn.length - 1];

            newTasks[key] = params.concat(params.length > 0 ? newTask : taskFn);
        } else if (hasNoDeps) {
            // no dependencies, use the function as-is
            newTasks[key] = taskFn;
        } else {
            params = parseParams(taskFn);
            if (taskFn.length === 0 && !fnIsAsync && params.length === 0) {
                throw new Error("autoInject task functions require explicit parameters.");
            }

            // remove callback param
            if (!fnIsAsync) params.pop();

            newTasks[key] = params.concat(newTask);
        }

        function newTask(results, taskCb) {
            var newArgs = arrayMap(params, function (name) {
                return results[name];
            });
            newArgs.push(taskCb);
            wrapAsync(taskFn).apply(null, newArgs);
        }
    });

    auto(newTasks, callback);
}

// Simple doubly linked list (https://en.wikipedia.org/wiki/Doubly_linked_list) implementation
// used for queues. This implementation assumes that the node provided by the user can be modified
// to adjust the next and last properties. We implement only the minimal functionality
// for queue support.
function DLL() {
    this.head = this.tail = null;
    this.length = 0;
}

function setInitial(dll, node) {
    dll.length = 1;
    dll.head = dll.tail = node;
}

DLL.prototype.removeLink = function(node) {
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;
    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;

    node.prev = node.next = null;
    this.length -= 1;
    return node;
};

DLL.prototype.empty = function () {
    while(this.head) this.shift();
    return this;
};

DLL.prototype.insertAfter = function(node, newNode) {
    newNode.prev = node;
    newNode.next = node.next;
    if (node.next) node.next.prev = newNode;
    else this.tail = newNode;
    node.next = newNode;
    this.length += 1;
};

DLL.prototype.insertBefore = function(node, newNode) {
    newNode.prev = node.prev;
    newNode.next = node;
    if (node.prev) node.prev.next = newNode;
    else this.head = newNode;
    node.prev = newNode;
    this.length += 1;
};

DLL.prototype.unshift = function(node) {
    if (this.head) this.insertBefore(this.head, node);
    else setInitial(this, node);
};

DLL.prototype.push = function(node) {
    if (this.tail) this.insertAfter(this.tail, node);
    else setInitial(this, node);
};

DLL.prototype.shift = function() {
    return this.head && this.removeLink(this.head);
};

DLL.prototype.pop = function() {
    return this.tail && this.removeLink(this.tail);
};

DLL.prototype.toArray = function () {
    var arr = Array(this.length);
    var curr = this.head;
    for(var idx = 0; idx < this.length; idx++) {
        arr[idx] = curr.data;
        curr = curr.next;
    }
    return arr;
};

DLL.prototype.remove = function (testFn) {
    var curr = this.head;
    while(!!curr) {
        var next = curr.next;
        if (testFn(curr)) {
            this.removeLink(curr);
        }
        curr = next;
    }
    return this;
};

function queue(worker, concurrency, payload) {
    if (concurrency == null) {
        concurrency = 1;
    }
    else if(concurrency === 0) {
        throw new Error('Concurrency must not be zero');
    }

    var _worker = wrapAsync(worker);
    var numRunning = 0;
    var workersList = [];

    var processingScheduled = false;
    function _insert(data, insertAtFront, callback) {
        if (callback != null && typeof callback !== 'function') {
            throw new Error('task callback must be a function');
        }
        q.started = true;
        if (!isArray(data)) {
            data = [data];
        }
        if (data.length === 0 && q.idle()) {
            // call drain immediately if there are no tasks
            return setImmediate$1(function() {
                q.drain();
            });
        }

        for (var i = 0, l = data.length; i < l; i++) {
            var item = {
                data: data[i],
                callback: callback || noop
            };

            if (insertAtFront) {
                q._tasks.unshift(item);
            } else {
                q._tasks.push(item);
            }
        }

        if (!processingScheduled) {
            processingScheduled = true;
            setImmediate$1(function() {
                processingScheduled = false;
                q.process();
            });
        }
    }

    function _next(tasks) {
        return function(err){
            numRunning -= 1;

            for (var i = 0, l = tasks.length; i < l; i++) {
                var task = tasks[i];

                var index = baseIndexOf(workersList, task, 0);
                if (index === 0) {
                    workersList.shift();
                } else if (index > 0) {
                    workersList.splice(index, 1);
                }

                task.callback.apply(task, arguments);

                if (err != null) {
                    q.error(err, task.data);
                }
            }

            if (numRunning <= (q.concurrency - q.buffer) ) {
                q.unsaturated();
            }

            if (q.idle()) {
                q.drain();
            }
            q.process();
        };
    }

    var isProcessing = false;
    var q = {
        _tasks: new DLL(),
        concurrency: concurrency,
        payload: payload,
        saturated: noop,
        unsaturated:noop,
        buffer: concurrency / 4,
        empty: noop,
        drain: noop,
        error: noop,
        started: false,
        paused: false,
        push: function (data, callback) {
            _insert(data, false, callback);
        },
        kill: function () {
            q.drain = noop;
            q._tasks.empty();
        },
        unshift: function (data, callback) {
            _insert(data, true, callback);
        },
        remove: function (testFn) {
            q._tasks.remove(testFn);
        },
        process: function () {
            // Avoid trying to start too many processing operations. This can occur
            // when callbacks resolve synchronously (#1267).
            if (isProcessing) {
                return;
            }
            isProcessing = true;
            while(!q.paused && numRunning < q.concurrency && q._tasks.length){
                var tasks = [], data = [];
                var l = q._tasks.length;
                if (q.payload) l = Math.min(l, q.payload);
                for (var i = 0; i < l; i++) {
                    var node = q._tasks.shift();
                    tasks.push(node);
                    workersList.push(node);
                    data.push(node.data);
                }

                numRunning += 1;

                if (q._tasks.length === 0) {
                    q.empty();
                }

                if (numRunning === q.concurrency) {
                    q.saturated();
                }

                var cb = onlyOnce(_next(tasks));
                _worker(data, cb);
            }
            isProcessing = false;
        },
        length: function () {
            return q._tasks.length;
        },
        running: function () {
            return numRunning;
        },
        workersList: function () {
            return workersList;
        },
        idle: function() {
            return q._tasks.length + numRunning === 0;
        },
        pause: function () {
            q.paused = true;
        },
        resume: function () {
            if (q.paused === false) { return; }
            q.paused = false;
            setImmediate$1(q.process);
        }
    };
    return q;
}

/**
 * A cargo of tasks for the worker function to complete. Cargo inherits all of
 * the same methods and event callbacks as [`queue`]{@link module:ControlFlow.queue}.
 * @typedef {Object} CargoObject
 * @memberOf module:ControlFlow
 * @property {Function} length - A function returning the number of items
 * waiting to be processed. Invoke like `cargo.length()`.
 * @property {number} payload - An `integer` for determining how many tasks
 * should be process per round. This property can be changed after a `cargo` is
 * created to alter the payload on-the-fly.
 * @property {Function} push - Adds `task` to the `queue`. The callback is
 * called once the `worker` has finished processing the task. Instead of a
 * single task, an array of `tasks` can be submitted. The respective callback is
 * used for every task in the list. Invoke like `cargo.push(task, [callback])`.
 * @property {Function} saturated - A callback that is called when the
 * `queue.length()` hits the concurrency and further tasks will be queued.
 * @property {Function} empty - A callback that is called when the last item
 * from the `queue` is given to a `worker`.
 * @property {Function} drain - A callback that is called when the last item
 * from the `queue` has returned from the `worker`.
 * @property {Function} idle - a function returning false if there are items
 * waiting or being processed, or true if not. Invoke like `cargo.idle()`.
 * @property {Function} pause - a function that pauses the processing of tasks
 * until `resume()` is called. Invoke like `cargo.pause()`.
 * @property {Function} resume - a function that resumes the processing of
 * queued tasks when the queue is paused. Invoke like `cargo.resume()`.
 * @property {Function} kill - a function that removes the `drain` callback and
 * empties remaining tasks from the queue forcing it to go idle. Invoke like `cargo.kill()`.
 */

/**
 * Creates a `cargo` object with the specified payload. Tasks added to the
 * cargo will be processed altogether (up to the `payload` limit). If the
 * `worker` is in progress, the task is queued until it becomes available. Once
 * the `worker` has completed some tasks, each callback of those tasks is
 * called. Check out [these](https://camo.githubusercontent.com/6bbd36f4cf5b35a0f11a96dcd2e97711ffc2fb37/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130382f62626330636662302d356632392d313165322d393734662d3333393763363464633835382e676966) [animations](https://camo.githubusercontent.com/f4810e00e1c5f5f8addbe3e9f49064fd5d102699/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130312f38346339323036362d356632392d313165322d383134662d3964336430323431336266642e676966)
 * for how `cargo` and `queue` work.
 *
 * While [`queue`]{@link module:ControlFlow.queue} passes only one task to one of a group of workers
 * at a time, cargo passes an array of tasks to a single worker, repeating
 * when the worker is finished.
 *
 * @name cargo
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.queue]{@link module:ControlFlow.queue}
 * @category Control Flow
 * @param {AsyncFunction} worker - An asynchronous function for processing an array
 * of queued tasks. Invoked with `(tasks, callback)`.
 * @param {number} [payload=Infinity] - An optional `integer` for determining
 * how many tasks should be processed per round; if omitted, the default is
 * unlimited.
 * @returns {module:ControlFlow.CargoObject} A cargo object to manage the tasks. Callbacks can
 * attached as certain properties to listen for specific events during the
 * lifecycle of the cargo and inner queue.
 * @example
 *
 * // create a cargo object with payload 2
 * var cargo = async.cargo(function(tasks, callback) {
 *     for (var i=0; i<tasks.length; i++) {
 *         console.log('hello ' + tasks[i].name);
 *     }
 *     callback();
 * }, 2);
 *
 * // add some items
 * cargo.push({name: 'foo'}, function(err) {
 *     console.log('finished processing foo');
 * });
 * cargo.push({name: 'bar'}, function(err) {
 *     console.log('finished processing bar');
 * });
 * cargo.push({name: 'baz'}, function(err) {
 *     console.log('finished processing baz');
 * });
 */
function cargo(worker, payload) {
    return queue(worker, 1, payload);
}

/**
 * The same as [`eachOf`]{@link module:Collections.eachOf} but runs only a single async operation at a time.
 *
 * @name eachOfSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.eachOf]{@link module:Collections.eachOf}
 * @alias forEachOfSeries
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * Invoked with (item, key, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Invoked with (err).
 */
var eachOfSeries = doLimit(eachOfLimit, 1);

/**
 * Reduces `coll` into a single value using an async `iteratee` to return each
 * successive step. `memo` is the initial state of the reduction. This function
 * only operates in series.
 *
 * For performance reasons, it may make sense to split a call to this function
 * into a parallel map, and then use the normal `Array.prototype.reduce` on the
 * results. This function is for situations where each step in the reduction
 * needs to be async; if you can get the data before reducing it, then it's
 * probably a good idea to do so.
 *
 * @name reduce
 * @static
 * @memberOf module:Collections
 * @method
 * @alias inject
 * @alias foldl
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {*} memo - The initial state of the reduction.
 * @param {AsyncFunction} iteratee - A function applied to each item in the
 * array to produce the next step in the reduction.
 * The `iteratee` should complete with the next state of the reduction.
 * If the iteratee complete with an error, the reduction is stopped and the
 * main `callback` is immediately called with the error.
 * Invoked with (memo, item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result is the reduced value. Invoked with
 * (err, result).
 * @example
 *
 * async.reduce([1,2,3], 0, function(memo, item, callback) {
 *     // pointless async:
 *     process.nextTick(function() {
 *         callback(null, memo + item)
 *     });
 * }, function(err, result) {
 *     // result is now equal to the last value of memo, which is 6
 * });
 */
function reduce(coll, memo, iteratee, callback) {
    callback = once(callback || noop);
    var _iteratee = wrapAsync(iteratee);
    eachOfSeries(coll, function(x, i, callback) {
        _iteratee(memo, x, function(err, v) {
            memo = v;
            callback(err);
        });
    }, function(err) {
        callback(err, memo);
    });
}

/**
 * Version of the compose function that is more natural to read. Each function
 * consumes the return value of the previous function. It is the equivalent of
 * [compose]{@link module:ControlFlow.compose} with the arguments reversed.
 *
 * Each function is executed with the `this` binding of the composed function.
 *
 * @name seq
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.compose]{@link module:ControlFlow.compose}
 * @category Control Flow
 * @param {...AsyncFunction} functions - the asynchronous functions to compose
 * @returns {Function} a function that composes the `functions` in order
 * @example
 *
 * // Requires lodash (or underscore), express3 and dresende's orm2.
 * // Part of an app, that fetches cats of the logged user.
 * // This example uses `seq` function to avoid overnesting and error
 * // handling clutter.
 * app.get('/cats', function(request, response) {
 *     var User = request.models.User;
 *     async.seq(
 *         _.bind(User.get, User),  // 'User.get' has signature (id, callback(err, data))
 *         function(user, fn) {
 *             user.getCats(fn);      // 'getCats' has signature (callback(err, data))
 *         }
 *     )(req.session.user_id, function (err, cats) {
 *         if (err) {
 *             console.error(err);
 *             response.json({ status: 'error', message: err.message });
 *         } else {
 *             response.json({ status: 'ok', message: 'Cats found', data: cats });
 *         }
 *     });
 * });
 */
function seq(/*...functions*/) {
    var _functions = arrayMap(arguments, wrapAsync);
    return function(/*...args*/) {
        var args = slice(arguments);
        var that = this;

        var cb = args[args.length - 1];
        if (typeof cb == 'function') {
            args.pop();
        } else {
            cb = noop;
        }

        reduce(_functions, args, function(newargs, fn, cb) {
            fn.apply(that, newargs.concat(function(err/*, ...nextargs*/) {
                var nextargs = slice(arguments, 1);
                cb(err, nextargs);
            }));
        },
        function(err, results) {
            cb.apply(that, [err].concat(results));
        });
    };
}

/**
 * Creates a function which is a composition of the passed asynchronous
 * functions. Each function consumes the return value of the function that
 * follows. Composing functions `f()`, `g()`, and `h()` would produce the result
 * of `f(g(h()))`, only this version uses callbacks to obtain the return values.
 *
 * Each function is executed with the `this` binding of the composed function.
 *
 * @name compose
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {...AsyncFunction} functions - the asynchronous functions to compose
 * @returns {Function} an asynchronous function that is the composed
 * asynchronous `functions`
 * @example
 *
 * function add1(n, callback) {
 *     setTimeout(function () {
 *         callback(null, n + 1);
 *     }, 10);
 * }
 *
 * function mul3(n, callback) {
 *     setTimeout(function () {
 *         callback(null, n * 3);
 *     }, 10);
 * }
 *
 * var add1mul3 = async.compose(mul3, add1);
 * add1mul3(4, function (err, result) {
 *     // result now equals 15
 * });
 */
var compose = function(/*...args*/) {
    return seq.apply(null, slice(arguments).reverse());
};

var _concat = Array.prototype.concat;

/**
 * The same as [`concat`]{@link module:Collections.concat} but runs a maximum of `limit` async operations at a time.
 *
 * @name concatLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.concat]{@link module:Collections.concat}
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - A function to apply to each item in `coll`,
 * which should use an array as its result. Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished, or an error occurs. Results is an array
 * containing the concatenated results of the `iteratee` function. Invoked with
 * (err, results).
 */
var concatLimit = function(coll, limit, iteratee, callback) {
    callback = callback || noop;
    var _iteratee = wrapAsync(iteratee);
    mapLimit(coll, limit, function(val, callback) {
        _iteratee(val, function(err /*, ...args*/) {
            if (err) return callback(err);
            return callback(null, slice(arguments, 1));
        });
    }, function(err, mapResults) {
        var result = [];
        for (var i = 0; i < mapResults.length; i++) {
            if (mapResults[i]) {
                result = _concat.apply(result, mapResults[i]);
            }
        }

        return callback(err, result);
    });
};

/**
 * Applies `iteratee` to each item in `coll`, concatenating the results. Returns
 * the concatenated list. The `iteratee`s are called in parallel, and the
 * results are concatenated as they return. There is no guarantee that the
 * results array will be returned in the original order of `coll` passed to the
 * `iteratee` function.
 *
 * @name concat
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each item in `coll`,
 * which should use an array as its result. Invoked with (item, callback).
 * @param {Function} [callback(err)] - A callback which is called after all the
 * `iteratee` functions have finished, or an error occurs. Results is an array
 * containing the concatenated results of the `iteratee` function. Invoked with
 * (err, results).
 * @example
 *
 * async.concat(['dir1','dir2','dir3'], fs.readdir, function(err, files) {
 *     // files is now a list of filenames that exist in the 3 directories
 * });
 */
var concat = doLimit(concatLimit, Infinity);

/**
 * The same as [`concat`]{@link module:Collections.concat} but runs only a single async operation at a time.
 *
 * @name concatSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.concat]{@link module:Collections.concat}
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each item in `coll`.
 * The iteratee should complete with an array an array of results.
 * Invoked with (item, callback).
 * @param {Function} [callback(err)] - A callback which is called after all the
 * `iteratee` functions have finished, or an error occurs. Results is an array
 * containing the concatenated results of the `iteratee` function. Invoked with
 * (err, results).
 */
var concatSeries = doLimit(concatLimit, 1);

/**
 * Returns a function that when called, calls-back with the values provided.
 * Useful as the first function in a [`waterfall`]{@link module:ControlFlow.waterfall}, or for plugging values in to
 * [`auto`]{@link module:ControlFlow.auto}.
 *
 * @name constant
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {...*} arguments... - Any number of arguments to automatically invoke
 * callback with.
 * @returns {AsyncFunction} Returns a function that when invoked, automatically
 * invokes the callback with the previous given arguments.
 * @example
 *
 * async.waterfall([
 *     async.constant(42),
 *     function (value, next) {
 *         // value === 42
 *     },
 *     //...
 * ], callback);
 *
 * async.waterfall([
 *     async.constant(filename, "utf8"),
 *     fs.readFile,
 *     function (fileData, next) {
 *         //...
 *     }
 *     //...
 * ], callback);
 *
 * async.auto({
 *     hostname: async.constant("https://server.net/"),
 *     port: findFreePort,
 *     launchServer: ["hostname", "port", function (options, cb) {
 *         startServer(options, cb);
 *     }],
 *     //...
 * }, callback);
 */
var constant = function(/*...values*/) {
    var values = slice(arguments);
    var args = [null].concat(values);
    return function (/*...ignoredArgs, callback*/) {
        var callback = arguments[arguments.length - 1];
        return callback.apply(this, args);
    };
};

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

function _createTester(check, getResult) {
    return function(eachfn, arr, iteratee, cb) {
        cb = cb || noop;
        var testPassed = false;
        var testResult;
        eachfn(arr, function(value, _, callback) {
            iteratee(value, function(err, result) {
                if (err) {
                    callback(err);
                } else if (check(result) && !testResult) {
                    testPassed = true;
                    testResult = getResult(true, value);
                    callback(null, breakLoop);
                } else {
                    callback();
                }
            });
        }, function(err) {
            if (err) {
                cb(err);
            } else {
                cb(null, testPassed ? testResult : getResult(false));
            }
        });
    };
}

function _findGetResult(v, x) {
    return x;
}

/**
 * Returns the first value in `coll` that passes an async truth test. The
 * `iteratee` is applied in parallel, meaning the first iteratee to return
 * `true` will fire the detect `callback` with that result. That means the
 * result might not be the first item in the original `coll` (in terms of order)
 * that passes the test.

 * If order within the original `coll` is important, then look at
 * [`detectSeries`]{@link module:Collections.detectSeries}.
 *
 * @name detect
 * @static
 * @memberOf module:Collections
 * @method
 * @alias find
 * @category Collections
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
 * The iteratee must complete with a boolean value as its result.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the `iteratee` functions have finished.
 * Result will be the first item in the array that passes the truth test
 * (iteratee) or the value `undefined` if none passed. Invoked with
 * (err, result).
 * @example
 *
 * async.detect(['file1','file2','file3'], function(filePath, callback) {
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, result) {
 *     // result now equals the first file in the list that exists
 * });
 */
var detect = doParallel(_createTester(identity, _findGetResult));

/**
 * The same as [`detect`]{@link module:Collections.detect} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name detectLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.detect]{@link module:Collections.detect}
 * @alias findLimit
 * @category Collections
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
 * The iteratee must complete with a boolean value as its result.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the `iteratee` functions have finished.
 * Result will be the first item in the array that passes the truth test
 * (iteratee) or the value `undefined` if none passed. Invoked with
 * (err, result).
 */
var detectLimit = doParallelLimit(_createTester(identity, _findGetResult));

/**
 * The same as [`detect`]{@link module:Collections.detect} but runs only a single async operation at a time.
 *
 * @name detectSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.detect]{@link module:Collections.detect}
 * @alias findSeries
 * @category Collections
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
 * The iteratee must complete with a boolean value as its result.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the `iteratee` functions have finished.
 * Result will be the first item in the array that passes the truth test
 * (iteratee) or the value `undefined` if none passed. Invoked with
 * (err, result).
 */
var detectSeries = doLimit(detectLimit, 1);

function consoleFunc(name) {
    return function (fn/*, ...args*/) {
        var args = slice(arguments, 1);
        args.push(function (err/*, ...args*/) {
            var args = slice(arguments, 1);
            if (typeof console === 'object') {
                if (err) {
                    if (console.error) {
                        console.error(err);
                    }
                } else if (console[name]) {
                    arrayEach(args, function (x) {
                        console[name](x);
                    });
                }
            }
        });
        wrapAsync(fn).apply(null, args);
    };
}

/**
 * Logs the result of an [`async` function]{@link AsyncFunction} to the
 * `console` using `console.dir` to display the properties of the resulting object.
 * Only works in Node.js or in browsers that support `console.dir` and
 * `console.error` (such as FF and Chrome).
 * If multiple arguments are returned from the async function,
 * `console.dir` is called on each argument in order.
 *
 * @name dir
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} function - The function you want to eventually apply
 * all arguments to.
 * @param {...*} arguments... - Any number of arguments to apply to the function.
 * @example
 *
 * // in a module
 * var hello = function(name, callback) {
 *     setTimeout(function() {
 *         callback(null, {hello: name});
 *     }, 1000);
 * };
 *
 * // in the node repl
 * node> async.dir(hello, 'world');
 * {hello: 'world'}
 */
var dir = consoleFunc('dir');

/**
 * The post-check version of [`during`]{@link module:ControlFlow.during}. To reflect the difference in
 * the order of operations, the arguments `test` and `fn` are switched.
 *
 * Also a version of [`doWhilst`]{@link module:ControlFlow.doWhilst} with asynchronous `test` function.
 * @name doDuring
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.during]{@link module:ControlFlow.during}
 * @category Control Flow
 * @param {AsyncFunction} fn - An async function which is called each time
 * `test` passes. Invoked with (callback).
 * @param {AsyncFunction} test - asynchronous truth test to perform before each
 * execution of `fn`. Invoked with (...args, callback), where `...args` are the
 * non-error args from the previous callback of `fn`.
 * @param {Function} [callback] - A callback which is called after the test
 * function has failed and repeated execution of `fn` has stopped. `callback`
 * will be passed an error if one occurred, otherwise `null`.
 */
function doDuring(fn, test, callback) {
    callback = onlyOnce(callback || noop);
    var _fn = wrapAsync(fn);
    var _test = wrapAsync(test);

    function next(err/*, ...args*/) {
        if (err) return callback(err);
        var args = slice(arguments, 1);
        args.push(check);
        _test.apply(this, args);
    }

    function check(err, truth) {
        if (err) return callback(err);
        if (!truth) return callback(null);
        _fn(next);
    }

    check(null, true);

}

/**
 * The post-check version of [`whilst`]{@link module:ControlFlow.whilst}. To reflect the difference in
 * the order of operations, the arguments `test` and `iteratee` are switched.
 *
 * `doWhilst` is to `whilst` as `do while` is to `while` in plain JavaScript.
 *
 * @name doWhilst
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.whilst]{@link module:ControlFlow.whilst}
 * @category Control Flow
 * @param {AsyncFunction} iteratee - A function which is called each time `test`
 * passes. Invoked with (callback).
 * @param {Function} test - synchronous truth test to perform after each
 * execution of `iteratee`. Invoked with any non-error callback results of
 * `iteratee`.
 * @param {Function} [callback] - A callback which is called after the test
 * function has failed and repeated execution of `iteratee` has stopped.
 * `callback` will be passed an error and any arguments passed to the final
 * `iteratee`'s callback. Invoked with (err, [results]);
 */
function doWhilst(iteratee, test, callback) {
    callback = onlyOnce(callback || noop);
    var _iteratee = wrapAsync(iteratee);
    var next = function(err/*, ...args*/) {
        if (err) return callback(err);
        var args = slice(arguments, 1);
        if (test.apply(this, args)) return _iteratee(next);
        callback.apply(null, [null].concat(args));
    };
    _iteratee(next);
}

/**
 * Like ['doWhilst']{@link module:ControlFlow.doWhilst}, except the `test` is inverted. Note the
 * argument ordering differs from `until`.
 *
 * @name doUntil
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.doWhilst]{@link module:ControlFlow.doWhilst}
 * @category Control Flow
 * @param {AsyncFunction} iteratee - An async function which is called each time
 * `test` fails. Invoked with (callback).
 * @param {Function} test - synchronous truth test to perform after each
 * execution of `iteratee`. Invoked with any non-error callback results of
 * `iteratee`.
 * @param {Function} [callback] - A callback which is called after the test
 * function has passed and repeated execution of `iteratee` has stopped. `callback`
 * will be passed an error and any arguments passed to the final `iteratee`'s
 * callback. Invoked with (err, [results]);
 */
function doUntil(iteratee, test, callback) {
    doWhilst(iteratee, function() {
        return !test.apply(this, arguments);
    }, callback);
}

/**
 * Like [`whilst`]{@link module:ControlFlow.whilst}, except the `test` is an asynchronous function that
 * is passed a callback in the form of `function (err, truth)`. If error is
 * passed to `test` or `fn`, the main callback is immediately called with the
 * value of the error.
 *
 * @name during
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.whilst]{@link module:ControlFlow.whilst}
 * @category Control Flow
 * @param {AsyncFunction} test - asynchronous truth test to perform before each
 * execution of `fn`. Invoked with (callback).
 * @param {AsyncFunction} fn - An async function which is called each time
 * `test` passes. Invoked with (callback).
 * @param {Function} [callback] - A callback which is called after the test
 * function has failed and repeated execution of `fn` has stopped. `callback`
 * will be passed an error, if one occurred, otherwise `null`.
 * @example
 *
 * var count = 0;
 *
 * async.during(
 *     function (callback) {
 *         return callback(null, count < 5);
 *     },
 *     function (callback) {
 *         count++;
 *         setTimeout(callback, 1000);
 *     },
 *     function (err) {
 *         // 5 seconds have passed
 *     }
 * );
 */
function during(test, fn, callback) {
    callback = onlyOnce(callback || noop);
    var _fn = wrapAsync(fn);
    var _test = wrapAsync(test);

    function next(err) {
        if (err) return callback(err);
        _test(check);
    }

    function check(err, truth) {
        if (err) return callback(err);
        if (!truth) return callback(null);
        _fn(next);
    }

    _test(check);
}

function _withoutIndex(iteratee) {
    return function (value, index, callback) {
        return iteratee(value, callback);
    };
}

/**
 * Applies the function `iteratee` to each item in `coll`, in parallel.
 * The `iteratee` is called with an item from the list, and a callback for when
 * it has finished. If the `iteratee` passes an error to its `callback`, the
 * main `callback` (for the `each` function) is immediately called with the
 * error.
 *
 * Note, that since this function applies `iteratee` to each item in parallel,
 * there is no guarantee that the iteratee functions will complete in order.
 *
 * @name each
 * @static
 * @memberOf module:Collections
 * @method
 * @alias forEach
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to
 * each item in `coll`. Invoked with (item, callback).
 * The array index is not passed to the iteratee.
 * If you need the index, use `eachOf`.
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @example
 *
 * // assuming openFiles is an array of file names and saveFile is a function
 * // to save the modified contents of that file:
 *
 * async.each(openFiles, saveFile, function(err){
 *   // if any of the saves produced an error, err would equal that error
 * });
 *
 * // assuming openFiles is an array of file names
 * async.each(openFiles, function(file, callback) {
 *
 *     // Perform operation on file here.
 *     console.log('Processing file ' + file);
 *
 *     if( file.length > 32 ) {
 *       console.log('This file name is too long');
 *       callback('File name too long');
 *     } else {
 *       // Do work to process file here
 *       console.log('File processed');
 *       callback();
 *     }
 * }, function(err) {
 *     // if any of the file processing produced an error, err would equal that error
 *     if( err ) {
 *       // One of the iterations produced an error.
 *       // All processing will now stop.
 *       console.log('A file failed to process');
 *     } else {
 *       console.log('All files have been processed successfully');
 *     }
 * });
 */
function eachLimit(coll, iteratee, callback) {
    eachOf(coll, _withoutIndex(wrapAsync(iteratee)), callback);
}

/**
 * The same as [`each`]{@link module:Collections.each} but runs a maximum of `limit` async operations at a time.
 *
 * @name eachLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.each]{@link module:Collections.each}
 * @alias forEachLimit
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The array index is not passed to the iteratee.
 * If you need the index, use `eachOfLimit`.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 */
function eachLimit$1(coll, limit, iteratee, callback) {
    _eachOfLimit(limit)(coll, _withoutIndex(wrapAsync(iteratee)), callback);
}

/**
 * The same as [`each`]{@link module:Collections.each} but runs only a single async operation at a time.
 *
 * @name eachSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.each]{@link module:Collections.each}
 * @alias forEachSeries
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each
 * item in `coll`.
 * The array index is not passed to the iteratee.
 * If you need the index, use `eachOfSeries`.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 */
var eachSeries = doLimit(eachLimit$1, 1);

/**
 * Wrap an async function and ensure it calls its callback on a later tick of
 * the event loop.  If the function already calls its callback on a next tick,
 * no extra deferral is added. This is useful for preventing stack overflows
 * (`RangeError: Maximum call stack size exceeded`) and generally keeping
 * [Zalgo](http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony)
 * contained. ES2017 `async` functions are returned as-is -- they are immune
 * to Zalgo's corrupting influences, as they always resolve on a later tick.
 *
 * @name ensureAsync
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} fn - an async function, one that expects a node-style
 * callback as its last argument.
 * @returns {AsyncFunction} Returns a wrapped function with the exact same call
 * signature as the function passed in.
 * @example
 *
 * function sometimesAsync(arg, callback) {
 *     if (cache[arg]) {
 *         return callback(null, cache[arg]); // this would be synchronous!!
 *     } else {
 *         doSomeIO(arg, callback); // this IO would be asynchronous
 *     }
 * }
 *
 * // this has a risk of stack overflows if many results are cached in a row
 * async.mapSeries(args, sometimesAsync, done);
 *
 * // this will defer sometimesAsync's callback if necessary,
 * // preventing stack overflows
 * async.mapSeries(args, async.ensureAsync(sometimesAsync), done);
 */
function ensureAsync(fn) {
    if (isAsync(fn)) return fn;
    return initialParams(function (args, callback) {
        var sync = true;
        args.push(function () {
            var innerArgs = arguments;
            if (sync) {
                setImmediate$1(function () {
                    callback.apply(null, innerArgs);
                });
            } else {
                callback.apply(null, innerArgs);
            }
        });
        fn.apply(this, args);
        sync = false;
    });
}

function notId(v) {
    return !v;
}

/**
 * Returns `true` if every element in `coll` satisfies an async test. If any
 * iteratee call returns `false`, the main `callback` is immediately called.
 *
 * @name every
 * @static
 * @memberOf module:Collections
 * @method
 * @alias all
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collection in parallel.
 * The iteratee must complete with a boolean result value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result will be either `true` or `false`
 * depending on the values of the async tests. Invoked with (err, result).
 * @example
 *
 * async.every(['file1','file2','file3'], function(filePath, callback) {
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, result) {
 *     // if result is true then every file exists
 * });
 */
var every = doParallel(_createTester(notId, notId));

/**
 * The same as [`every`]{@link module:Collections.every} but runs a maximum of `limit` async operations at a time.
 *
 * @name everyLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.every]{@link module:Collections.every}
 * @alias allLimit
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collection in parallel.
 * The iteratee must complete with a boolean result value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result will be either `true` or `false`
 * depending on the values of the async tests. Invoked with (err, result).
 */
var everyLimit = doParallelLimit(_createTester(notId, notId));

/**
 * The same as [`every`]{@link module:Collections.every} but runs only a single async operation at a time.
 *
 * @name everySeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.every]{@link module:Collections.every}
 * @alias allSeries
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collection in series.
 * The iteratee must complete with a boolean result value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result will be either `true` or `false`
 * depending on the values of the async tests. Invoked with (err, result).
 */
var everySeries = doLimit(everyLimit, 1);

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

function filterArray(eachfn, arr, iteratee, callback) {
    var truthValues = new Array(arr.length);
    eachfn(arr, function (x, index, callback) {
        iteratee(x, function (err, v) {
            truthValues[index] = !!v;
            callback(err);
        });
    }, function (err) {
        if (err) return callback(err);
        var results = [];
        for (var i = 0; i < arr.length; i++) {
            if (truthValues[i]) results.push(arr[i]);
        }
        callback(null, results);
    });
}

function filterGeneric(eachfn, coll, iteratee, callback) {
    var results = [];
    eachfn(coll, function (x, index, callback) {
        iteratee(x, function (err, v) {
            if (err) {
                callback(err);
            } else {
                if (v) {
                    results.push({index: index, value: x});
                }
                callback();
            }
        });
    }, function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null, arrayMap(results.sort(function (a, b) {
                return a.index - b.index;
            }), baseProperty('value')));
        }
    });
}

function _filter(eachfn, coll, iteratee, callback) {
    var filter = isArrayLike(coll) ? filterArray : filterGeneric;
    filter(eachfn, coll, wrapAsync(iteratee), callback || noop);
}

/**
 * Returns a new array of all the values in `coll` which pass an async truth
 * test. This operation is performed in parallel, but the results array will be
 * in the same order as the original.
 *
 * @name filter
 * @static
 * @memberOf module:Collections
 * @method
 * @alias select
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {Function} iteratee - A truth test to apply to each item in `coll`.
 * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
 * with a boolean argument once it has completed. Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 * @example
 *
 * async.filter(['file1','file2','file3'], function(filePath, callback) {
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, results) {
 *     // results now equals an array of the existing files
 * });
 */
var filter = doParallel(_filter);

/**
 * The same as [`filter`]{@link module:Collections.filter} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name filterLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.filter]{@link module:Collections.filter}
 * @alias selectLimit
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {Function} iteratee - A truth test to apply to each item in `coll`.
 * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
 * with a boolean argument once it has completed. Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 */
var filterLimit = doParallelLimit(_filter);

/**
 * The same as [`filter`]{@link module:Collections.filter} but runs only a single async operation at a time.
 *
 * @name filterSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.filter]{@link module:Collections.filter}
 * @alias selectSeries
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {Function} iteratee - A truth test to apply to each item in `coll`.
 * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
 * with a boolean argument once it has completed. Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results)
 */
var filterSeries = doLimit(filterLimit, 1);

/**
 * Calls the asynchronous function `fn` with a callback parameter that allows it
 * to call itself again, in series, indefinitely.

 * If an error is passed to the callback then `errback` is called with the
 * error, and execution stops, otherwise it will never be called.
 *
 * @name forever
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {AsyncFunction} fn - an async function to call repeatedly.
 * Invoked with (next).
 * @param {Function} [errback] - when `fn` passes an error to it's callback,
 * this function will be called, and execution stops. Invoked with (err).
 * @example
 *
 * async.forever(
 *     function(next) {
 *         // next is suitable for passing to things that need a callback(err [, whatever]);
 *         // it will result in this function being called again.
 *     },
 *     function(err) {
 *         // if next is called with a value in its first parameter, it will appear
 *         // in here as 'err', and execution will stop.
 *     }
 * );
 */
function forever(fn, errback) {
    var done = onlyOnce(errback || noop);
    var task = wrapAsync(ensureAsync(fn));

    function next(err) {
        if (err) return done(err);
        task(next);
    }
    next();
}

/**
 * The same as [`groupBy`]{@link module:Collections.groupBy} but runs a maximum of `limit` async operations at a time.
 *
 * @name groupByLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.groupBy]{@link module:Collections.groupBy}
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with a `key` to group the value under.
 * Invoked with (value, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Result is an `Object` whoses
 * properties are arrays of values which returned the corresponding key.
 */
var groupByLimit = function(coll, limit, iteratee, callback) {
    callback = callback || noop;
    var _iteratee = wrapAsync(iteratee);
    mapLimit(coll, limit, function(val, callback) {
        _iteratee(val, function(err, key) {
            if (err) return callback(err);
            return callback(null, {key: key, val: val});
        });
    }, function(err, mapResults) {
        var result = {};
        // from MDN, handle object having an `hasOwnProperty` prop
        var hasOwnProperty = Object.prototype.hasOwnProperty;

        for (var i = 0; i < mapResults.length; i++) {
            if (mapResults[i]) {
                var key = mapResults[i].key;
                var val = mapResults[i].val;

                if (hasOwnProperty.call(result, key)) {
                    result[key].push(val);
                } else {
                    result[key] = [val];
                }
            }
        }

        return callback(err, result);
    });
};

/**
 * Returns a new object, where each value corresponds to an array of items, from
 * `coll`, that returned the corresponding key. That is, the keys of the object
 * correspond to the values passed to the `iteratee` callback.
 *
 * Note: Since this function applies the `iteratee` to each item in parallel,
 * there is no guarantee that the `iteratee` functions will complete in order.
 * However, the values for each key in the `result` will be in the same order as
 * the original `coll`. For Objects, the values will roughly be in the order of
 * the original Objects' keys (but this can vary across JavaScript engines).
 *
 * @name groupBy
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with a `key` to group the value under.
 * Invoked with (value, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Result is an `Object` whoses
 * properties are arrays of values which returned the corresponding key.
 * @example
 *
 * async.groupBy(['userId1', 'userId2', 'userId3'], function(userId, callback) {
 *     db.findById(userId, function(err, user) {
 *         if (err) return callback(err);
 *         return callback(null, user.age);
 *     });
 * }, function(err, result) {
 *     // result is object containing the userIds grouped by age
 *     // e.g. { 30: ['userId1', 'userId3'], 42: ['userId2']};
 * });
 */
var groupBy = doLimit(groupByLimit, Infinity);

/**
 * The same as [`groupBy`]{@link module:Collections.groupBy} but runs only a single async operation at a time.
 *
 * @name groupBySeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.groupBy]{@link module:Collections.groupBy}
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with a `key` to group the value under.
 * Invoked with (value, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Result is an `Object` whoses
 * properties are arrays of values which returned the corresponding key.
 */
var groupBySeries = doLimit(groupByLimit, 1);

/**
 * Logs the result of an `async` function to the `console`. Only works in
 * Node.js or in browsers that support `console.log` and `console.error` (such
 * as FF and Chrome). If multiple arguments are returned from the async
 * function, `console.log` is called on each argument in order.
 *
 * @name log
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} function - The function you want to eventually apply
 * all arguments to.
 * @param {...*} arguments... - Any number of arguments to apply to the function.
 * @example
 *
 * // in a module
 * var hello = function(name, callback) {
 *     setTimeout(function() {
 *         callback(null, 'hello ' + name);
 *     }, 1000);
 * };
 *
 * // in the node repl
 * node> async.log(hello, 'world');
 * 'hello world'
 */
var log = consoleFunc('log');

/**
 * The same as [`mapValues`]{@link module:Collections.mapValues} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name mapValuesLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.mapValues]{@link module:Collections.mapValues}
 * @category Collection
 * @param {Object} obj - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - A function to apply to each value and key
 * in `coll`.
 * The iteratee should complete with the transformed value as its result.
 * Invoked with (value, key, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. `result` is a new object consisting
 * of each key from `obj`, with each transformed value on the right-hand side.
 * Invoked with (err, result).
 */
function mapValuesLimit(obj, limit, iteratee, callback) {
    callback = once(callback || noop);
    var newObj = {};
    var _iteratee = wrapAsync(iteratee);
    eachOfLimit(obj, limit, function(val, key, next) {
        _iteratee(val, key, function (err, result) {
            if (err) return next(err);
            newObj[key] = result;
            next();
        });
    }, function (err) {
        callback(err, newObj);
    });
}

/**
 * A relative of [`map`]{@link module:Collections.map}, designed for use with objects.
 *
 * Produces a new Object by mapping each value of `obj` through the `iteratee`
 * function. The `iteratee` is called each `value` and `key` from `obj` and a
 * callback for when it has finished processing. Each of these callbacks takes
 * two arguments: an `error`, and the transformed item from `obj`. If `iteratee`
 * passes an error to its callback, the main `callback` (for the `mapValues`
 * function) is immediately called with the error.
 *
 * Note, the order of the keys in the result is not guaranteed.  The keys will
 * be roughly in the order they complete, (but this is very engine-specific)
 *
 * @name mapValues
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Object} obj - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each value and key
 * in `coll`.
 * The iteratee should complete with the transformed value as its result.
 * Invoked with (value, key, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. `result` is a new object consisting
 * of each key from `obj`, with each transformed value on the right-hand side.
 * Invoked with (err, result).
 * @example
 *
 * async.mapValues({
 *     f1: 'file1',
 *     f2: 'file2',
 *     f3: 'file3'
 * }, function (file, key, callback) {
 *   fs.stat(file, callback);
 * }, function(err, result) {
 *     // result is now a map of stats for each file, e.g.
 *     // {
 *     //     f1: [stats for file1],
 *     //     f2: [stats for file2],
 *     //     f3: [stats for file3]
 *     // }
 * });
 */

var mapValues = doLimit(mapValuesLimit, Infinity);

/**
 * The same as [`mapValues`]{@link module:Collections.mapValues} but runs only a single async operation at a time.
 *
 * @name mapValuesSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.mapValues]{@link module:Collections.mapValues}
 * @category Collection
 * @param {Object} obj - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each value and key
 * in `coll`.
 * The iteratee should complete with the transformed value as its result.
 * Invoked with (value, key, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. `result` is a new object consisting
 * of each key from `obj`, with each transformed value on the right-hand side.
 * Invoked with (err, result).
 */
var mapValuesSeries = doLimit(mapValuesLimit, 1);

function has(obj, key) {
    return key in obj;
}

/**
 * Caches the results of an async function. When creating a hash to store
 * function results against, the callback is omitted from the hash and an
 * optional hash function can be used.
 *
 * If no hash function is specified, the first argument is used as a hash key,
 * which may work reasonably if it is a string or a data type that converts to a
 * distinct string. Note that objects and arrays will not behave reasonably.
 * Neither will cases where the other arguments are significant. In such cases,
 * specify your own hash function.
 *
 * The cache of results is exposed as the `memo` property of the function
 * returned by `memoize`.
 *
 * @name memoize
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} fn - The async function to proxy and cache results from.
 * @param {Function} hasher - An optional function for generating a custom hash
 * for storing results. It has all the arguments applied to it apart from the
 * callback, and must be synchronous.
 * @returns {AsyncFunction} a memoized version of `fn`
 * @example
 *
 * var slow_fn = function(name, callback) {
 *     // do something
 *     callback(null, result);
 * };
 * var fn = async.memoize(slow_fn);
 *
 * // fn can now be used as if it were slow_fn
 * fn('some name', function() {
 *     // callback
 * });
 */
function memoize(fn, hasher) {
    var memo = Object.create(null);
    var queues = Object.create(null);
    hasher = hasher || identity;
    var _fn = wrapAsync(fn);
    var memoized = initialParams(function memoized(args, callback) {
        var key = hasher.apply(null, args);
        if (has(memo, key)) {
            setImmediate$1(function() {
                callback.apply(null, memo[key]);
            });
        } else if (has(queues, key)) {
            queues[key].push(callback);
        } else {
            queues[key] = [callback];
            _fn.apply(null, args.concat(function(/*args*/) {
                var args = slice(arguments);
                memo[key] = args;
                var q = queues[key];
                delete queues[key];
                for (var i = 0, l = q.length; i < l; i++) {
                    q[i].apply(null, args);
                }
            }));
        }
    });
    memoized.memo = memo;
    memoized.unmemoized = fn;
    return memoized;
}

/**
 * Calls `callback` on a later loop around the event loop. In Node.js this just
 * calls `process.nextTick`.  In the browser it will use `setImmediate` if
 * available, otherwise `setTimeout(callback, 0)`, which means other higher
 * priority events may precede the execution of `callback`.
 *
 * This is used internally for browser-compatibility purposes.
 *
 * @name nextTick
 * @static
 * @memberOf module:Utils
 * @method
 * @see [async.setImmediate]{@link module:Utils.setImmediate}
 * @category Util
 * @param {Function} callback - The function to call on a later loop around
 * the event loop. Invoked with (args...).
 * @param {...*} args... - any number of additional arguments to pass to the
 * callback on the next tick.
 * @example
 *
 * var call_order = [];
 * async.nextTick(function() {
 *     call_order.push('two');
 *     // call_order now equals ['one','two']
 * });
 * call_order.push('one');
 *
 * async.setImmediate(function (a, b, c) {
 *     // a, b, and c equal 1, 2, and 3
 * }, 1, 2, 3);
 */
var _defer$1;

if (hasNextTick) {
    _defer$1 = process.nextTick;
} else if (hasSetImmediate) {
    _defer$1 = setImmediate;
} else {
    _defer$1 = fallback;
}

var nextTick = wrap(_defer$1);

function _parallel(eachfn, tasks, callback) {
    callback = callback || noop;
    var results = isArrayLike(tasks) ? [] : {};

    eachfn(tasks, function (task, key, callback) {
        wrapAsync(task)(function (err, result) {
            if (arguments.length > 2) {
                result = slice(arguments, 1);
            }
            results[key] = result;
            callback(err);
        });
    }, function (err) {
        callback(err, results);
    });
}

/**
 * Run the `tasks` collection of functions in parallel, without waiting until
 * the previous function has completed. If any of the functions pass an error to
 * its callback, the main `callback` is immediately called with the value of the
 * error. Once the `tasks` have completed, the results are passed to the final
 * `callback` as an array.
 *
 * **Note:** `parallel` is about kicking-off I/O tasks in parallel, not about
 * parallel execution of code.  If your tasks do not use any timers or perform
 * any I/O, they will actually be executed in series.  Any synchronous setup
 * sections for each task will happen one after the other.  JavaScript remains
 * single-threaded.
 *
 * **Hint:** Use [`reflect`]{@link module:Utils.reflect} to continue the
 * execution of other tasks when a task fails.
 *
 * It is also possible to use an object instead of an array. Each property will
 * be run as a function and the results will be passed to the final `callback`
 * as an object instead of an array. This can be a more readable way of handling
 * results from {@link async.parallel}.
 *
 * @name parallel
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array|Iterable|Object} tasks - A collection of
 * [async functions]{@link AsyncFunction} to run.
 * Each async function can complete with any number of optional `result` values.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed successfully. This function gets a results array
 * (or object) containing all the result arguments passed to the task callbacks.
 * Invoked with (err, results).
 *
 * @example
 * async.parallel([
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'two');
 *         }, 100);
 *     }
 * ],
 * // optional callback
 * function(err, results) {
 *     // the results array will equal ['one','two'] even though
 *     // the second function had a shorter timeout.
 * });
 *
 * // an example using an object instead of an array
 * async.parallel({
 *     one: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 1);
 *         }, 200);
 *     },
 *     two: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 2);
 *         }, 100);
 *     }
 * }, function(err, results) {
 *     // results is now equals to: {one: 1, two: 2}
 * });
 */
function parallelLimit(tasks, callback) {
    _parallel(eachOf, tasks, callback);
}

/**
 * The same as [`parallel`]{@link module:ControlFlow.parallel} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name parallelLimit
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.parallel]{@link module:ControlFlow.parallel}
 * @category Control Flow
 * @param {Array|Iterable|Object} tasks - A collection of
 * [async functions]{@link AsyncFunction} to run.
 * Each async function can complete with any number of optional `result` values.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed successfully. This function gets a results array
 * (or object) containing all the result arguments passed to the task callbacks.
 * Invoked with (err, results).
 */
function parallelLimit$1(tasks, limit, callback) {
    _parallel(_eachOfLimit(limit), tasks, callback);
}

/**
 * A queue of tasks for the worker function to complete.
 * @typedef {Object} QueueObject
 * @memberOf module:ControlFlow
 * @property {Function} length - a function returning the number of items
 * waiting to be processed. Invoke with `queue.length()`.
 * @property {boolean} started - a boolean indicating whether or not any
 * items have been pushed and processed by the queue.
 * @property {Function} running - a function returning the number of items
 * currently being processed. Invoke with `queue.running()`.
 * @property {Function} workersList - a function returning the array of items
 * currently being processed. Invoke with `queue.workersList()`.
 * @property {Function} idle - a function returning false if there are items
 * waiting or being processed, or true if not. Invoke with `queue.idle()`.
 * @property {number} concurrency - an integer for determining how many `worker`
 * functions should be run in parallel. This property can be changed after a
 * `queue` is created to alter the concurrency on-the-fly.
 * @property {Function} push - add a new task to the `queue`. Calls `callback`
 * once the `worker` has finished processing the task. Instead of a single task,
 * a `tasks` array can be submitted. The respective callback is used for every
 * task in the list. Invoke with `queue.push(task, [callback])`,
 * @property {Function} unshift - add a new task to the front of the `queue`.
 * Invoke with `queue.unshift(task, [callback])`.
 * @property {Function} remove - remove items from the queue that match a test
 * function.  The test function will be passed an object with a `data` property,
 * and a `priority` property, if this is a
 * [priorityQueue]{@link module:ControlFlow.priorityQueue} object.
 * Invoked with `queue.remove(testFn)`, where `testFn` is of the form
 * `function ({data, priority}) {}` and returns a Boolean.
 * @property {Function} saturated - a callback that is called when the number of
 * running workers hits the `concurrency` limit, and further tasks will be
 * queued.
 * @property {Function} unsaturated - a callback that is called when the number
 * of running workers is less than the `concurrency` & `buffer` limits, and
 * further tasks will not be queued.
 * @property {number} buffer - A minimum threshold buffer in order to say that
 * the `queue` is `unsaturated`.
 * @property {Function} empty - a callback that is called when the last item
 * from the `queue` is given to a `worker`.
 * @property {Function} drain - a callback that is called when the last item
 * from the `queue` has returned from the `worker`.
 * @property {Function} error - a callback that is called when a task errors.
 * Has the signature `function(error, task)`.
 * @property {boolean} paused - a boolean for determining whether the queue is
 * in a paused state.
 * @property {Function} pause - a function that pauses the processing of tasks
 * until `resume()` is called. Invoke with `queue.pause()`.
 * @property {Function} resume - a function that resumes the processing of
 * queued tasks when the queue is paused. Invoke with `queue.resume()`.
 * @property {Function} kill - a function that removes the `drain` callback and
 * empties remaining tasks from the queue forcing it to go idle. No more tasks
 * should be pushed to the queue after calling this function. Invoke with `queue.kill()`.
 */

/**
 * Creates a `queue` object with the specified `concurrency`. Tasks added to the
 * `queue` are processed in parallel (up to the `concurrency` limit). If all
 * `worker`s are in progress, the task is queued until one becomes available.
 * Once a `worker` completes a `task`, that `task`'s callback is called.
 *
 * @name queue
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {AsyncFunction} worker - An async function for processing a queued task.
 * If you want to handle errors from an individual task, pass a callback to
 * `q.push()`. Invoked with (task, callback).
 * @param {number} [concurrency=1] - An `integer` for determining how many
 * `worker` functions should be run in parallel.  If omitted, the concurrency
 * defaults to `1`.  If the concurrency is `0`, an error is thrown.
 * @returns {module:ControlFlow.QueueObject} A queue object to manage the tasks. Callbacks can
 * attached as certain properties to listen for specific events during the
 * lifecycle of the queue.
 * @example
 *
 * // create a queue object with concurrency 2
 * var q = async.queue(function(task, callback) {
 *     console.log('hello ' + task.name);
 *     callback();
 * }, 2);
 *
 * // assign a callback
 * q.drain = function() {
 *     console.log('all items have been processed');
 * };
 *
 * // add some items to the queue
 * q.push({name: 'foo'}, function(err) {
 *     console.log('finished processing foo');
 * });
 * q.push({name: 'bar'}, function (err) {
 *     console.log('finished processing bar');
 * });
 *
 * // add some items to the queue (batch-wise)
 * q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
 *     console.log('finished processing item');
 * });
 *
 * // add some items to the front of the queue
 * q.unshift({name: 'bar'}, function (err) {
 *     console.log('finished processing bar');
 * });
 */
var queue$1 = function (worker, concurrency) {
    var _worker = wrapAsync(worker);
    return queue(function (items, cb) {
        _worker(items[0], cb);
    }, concurrency, 1);
};

/**
 * The same as [async.queue]{@link module:ControlFlow.queue} only tasks are assigned a priority and
 * completed in ascending priority order.
 *
 * @name priorityQueue
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.queue]{@link module:ControlFlow.queue}
 * @category Control Flow
 * @param {AsyncFunction} worker - An async function for processing a queued task.
 * If you want to handle errors from an individual task, pass a callback to
 * `q.push()`.
 * Invoked with (task, callback).
 * @param {number} concurrency - An `integer` for determining how many `worker`
 * functions should be run in parallel.  If omitted, the concurrency defaults to
 * `1`.  If the concurrency is `0`, an error is thrown.
 * @returns {module:ControlFlow.QueueObject} A priorityQueue object to manage the tasks. There are two
 * differences between `queue` and `priorityQueue` objects:
 * * `push(task, priority, [callback])` - `priority` should be a number. If an
 *   array of `tasks` is given, all tasks will be assigned the same priority.
 * * The `unshift` method was removed.
 */
var priorityQueue = function(worker, concurrency) {
    // Start with a normal queue
    var q = queue$1(worker, concurrency);

    // Override push to accept second parameter representing priority
    q.push = function(data, priority, callback) {
        if (callback == null) callback = noop;
        if (typeof callback !== 'function') {
            throw new Error('task callback must be a function');
        }
        q.started = true;
        if (!isArray(data)) {
            data = [data];
        }
        if (data.length === 0) {
            // call drain immediately if there are no tasks
            return setImmediate$1(function() {
                q.drain();
            });
        }

        priority = priority || 0;
        var nextNode = q._tasks.head;
        while (nextNode && priority >= nextNode.priority) {
            nextNode = nextNode.next;
        }

        for (var i = 0, l = data.length; i < l; i++) {
            var item = {
                data: data[i],
                priority: priority,
                callback: callback
            };

            if (nextNode) {
                q._tasks.insertBefore(nextNode, item);
            } else {
                q._tasks.push(item);
            }
        }
        setImmediate$1(q.process);
    };

    // Remove unshift function
    delete q.unshift;

    return q;
};

/**
 * Runs the `tasks` array of functions in parallel, without waiting until the
 * previous function has completed. Once any of the `tasks` complete or pass an
 * error to its callback, the main `callback` is immediately called. It's
 * equivalent to `Promise.race()`.
 *
 * @name race
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array} tasks - An array containing [async functions]{@link AsyncFunction}
 * to run. Each function can complete with an optional `result` value.
 * @param {Function} callback - A callback to run once any of the functions have
 * completed. This function gets an error or result from the first function that
 * completed. Invoked with (err, result).
 * @returns undefined
 * @example
 *
 * async.race([
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'two');
 *         }, 100);
 *     }
 * ],
 * // main callback
 * function(err, result) {
 *     // the result will be equal to 'two' as it finishes earlier
 * });
 */
function race(tasks, callback) {
    callback = once(callback || noop);
    if (!isArray(tasks)) return callback(new TypeError('First argument to race must be an array of functions'));
    if (!tasks.length) return callback();
    for (var i = 0, l = tasks.length; i < l; i++) {
        wrapAsync(tasks[i])(callback);
    }
}

/**
 * Same as [`reduce`]{@link module:Collections.reduce}, only operates on `array` in reverse order.
 *
 * @name reduceRight
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.reduce]{@link module:Collections.reduce}
 * @alias foldr
 * @category Collection
 * @param {Array} array - A collection to iterate over.
 * @param {*} memo - The initial state of the reduction.
 * @param {AsyncFunction} iteratee - A function applied to each item in the
 * array to produce the next step in the reduction.
 * The `iteratee` should complete with the next state of the reduction.
 * If the iteratee complete with an error, the reduction is stopped and the
 * main `callback` is immediately called with the error.
 * Invoked with (memo, item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result is the reduced value. Invoked with
 * (err, result).
 */
function reduceRight (array, memo, iteratee, callback) {
    var reversed = slice(array).reverse();
    reduce(reversed, memo, iteratee, callback);
}

/**
 * Wraps the async function in another function that always completes with a
 * result object, even when it errors.
 *
 * The result object has either the property `error` or `value`.
 *
 * @name reflect
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} fn - The async function you want to wrap
 * @returns {Function} - A function that always passes null to it's callback as
 * the error. The second argument to the callback will be an `object` with
 * either an `error` or a `value` property.
 * @example
 *
 * async.parallel([
 *     async.reflect(function(callback) {
 *         // do some stuff ...
 *         callback(null, 'one');
 *     }),
 *     async.reflect(function(callback) {
 *         // do some more stuff but error ...
 *         callback('bad stuff happened');
 *     }),
 *     async.reflect(function(callback) {
 *         // do some more stuff ...
 *         callback(null, 'two');
 *     })
 * ],
 * // optional callback
 * function(err, results) {
 *     // values
 *     // results[0].value = 'one'
 *     // results[1].error = 'bad stuff happened'
 *     // results[2].value = 'two'
 * });
 */
function reflect(fn) {
    var _fn = wrapAsync(fn);
    return initialParams(function reflectOn(args, reflectCallback) {
        args.push(function callback(error, cbArg) {
            if (error) {
                reflectCallback(null, { error: error });
            } else {
                var value;
                if (arguments.length <= 2) {
                    value = cbArg;
                } else {
                    value = slice(arguments, 1);
                }
                reflectCallback(null, { value: value });
            }
        });

        return _fn.apply(this, args);
    });
}

/**
 * A helper function that wraps an array or an object of functions with `reflect`.
 *
 * @name reflectAll
 * @static
 * @memberOf module:Utils
 * @method
 * @see [async.reflect]{@link module:Utils.reflect}
 * @category Util
 * @param {Array|Object|Iterable} tasks - The collection of
 * [async functions]{@link AsyncFunction} to wrap in `async.reflect`.
 * @returns {Array} Returns an array of async functions, each wrapped in
 * `async.reflect`
 * @example
 *
 * let tasks = [
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     function(callback) {
 *         // do some more stuff but error ...
 *         callback(new Error('bad stuff happened'));
 *     },
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'two');
 *         }, 100);
 *     }
 * ];
 *
 * async.parallel(async.reflectAll(tasks),
 * // optional callback
 * function(err, results) {
 *     // values
 *     // results[0].value = 'one'
 *     // results[1].error = Error('bad stuff happened')
 *     // results[2].value = 'two'
 * });
 *
 * // an example using an object instead of an array
 * let tasks = {
 *     one: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     two: function(callback) {
 *         callback('two');
 *     },
 *     three: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'three');
 *         }, 100);
 *     }
 * };
 *
 * async.parallel(async.reflectAll(tasks),
 * // optional callback
 * function(err, results) {
 *     // values
 *     // results.one.value = 'one'
 *     // results.two.error = 'two'
 *     // results.three.value = 'three'
 * });
 */
function reflectAll(tasks) {
    var results;
    if (isArray(tasks)) {
        results = arrayMap(tasks, reflect);
    } else {
        results = {};
        baseForOwn(tasks, function(task, key) {
            results[key] = reflect.call(this, task);
        });
    }
    return results;
}

function reject$1(eachfn, arr, iteratee, callback) {
    _filter(eachfn, arr, function(value, cb) {
        iteratee(value, function(err, v) {
            cb(err, !v);
        });
    }, callback);
}

/**
 * The opposite of [`filter`]{@link module:Collections.filter}. Removes values that pass an `async` truth test.
 *
 * @name reject
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.filter]{@link module:Collections.filter}
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {Function} iteratee - An async truth test to apply to each item in
 * `coll`.
 * The should complete with a boolean value as its `result`.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 * @example
 *
 * async.reject(['file1','file2','file3'], function(filePath, callback) {
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, results) {
 *     // results now equals an array of missing files
 *     createFiles(results);
 * });
 */
var reject = doParallel(reject$1);

/**
 * The same as [`reject`]{@link module:Collections.reject} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name rejectLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.reject]{@link module:Collections.reject}
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {Function} iteratee - An async truth test to apply to each item in
 * `coll`.
 * The should complete with a boolean value as its `result`.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 */
var rejectLimit = doParallelLimit(reject$1);

/**
 * The same as [`reject`]{@link module:Collections.reject} but runs only a single async operation at a time.
 *
 * @name rejectSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.reject]{@link module:Collections.reject}
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {Function} iteratee - An async truth test to apply to each item in
 * `coll`.
 * The should complete with a boolean value as its `result`.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 */
var rejectSeries = doLimit(rejectLimit, 1);

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant$1(value) {
  return function() {
    return value;
  };
}

/**
 * Attempts to get a successful response from `task` no more than `times` times
 * before returning an error. If the task is successful, the `callback` will be
 * passed the result of the successful task. If all attempts fail, the callback
 * will be passed the error and result (if any) of the final attempt.
 *
 * @name retry
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @see [async.retryable]{@link module:ControlFlow.retryable}
 * @param {Object|number} [opts = {times: 5, interval: 0}| 5] - Can be either an
 * object with `times` and `interval` or a number.
 * * `times` - The number of attempts to make before giving up.  The default
 *   is `5`.
 * * `interval` - The time to wait between retries, in milliseconds.  The
 *   default is `0`. The interval may also be specified as a function of the
 *   retry count (see example).
 * * `errorFilter` - An optional synchronous function that is invoked on
 *   erroneous result. If it returns `true` the retry attempts will continue;
 *   if the function returns `false` the retry flow is aborted with the current
 *   attempt's error and result being returned to the final callback.
 *   Invoked with (err).
 * * If `opts` is a number, the number specifies the number of times to retry,
 *   with the default interval of `0`.
 * @param {AsyncFunction} task - An async function to retry.
 * Invoked with (callback).
 * @param {Function} [callback] - An optional callback which is called when the
 * task has succeeded, or after the final failed attempt. It receives the `err`
 * and `result` arguments of the last attempt at completing the `task`. Invoked
 * with (err, results).
 *
 * @example
 *
 * // The `retry` function can be used as a stand-alone control flow by passing
 * // a callback, as shown below:
 *
 * // try calling apiMethod 3 times
 * async.retry(3, apiMethod, function(err, result) {
 *     // do something with the result
 * });
 *
 * // try calling apiMethod 3 times, waiting 200 ms between each retry
 * async.retry({times: 3, interval: 200}, apiMethod, function(err, result) {
 *     // do something with the result
 * });
 *
 * // try calling apiMethod 10 times with exponential backoff
 * // (i.e. intervals of 100, 200, 400, 800, 1600, ... milliseconds)
 * async.retry({
 *   times: 10,
 *   interval: function(retryCount) {
 *     return 50 * Math.pow(2, retryCount);
 *   }
 * }, apiMethod, function(err, result) {
 *     // do something with the result
 * });
 *
 * // try calling apiMethod the default 5 times no delay between each retry
 * async.retry(apiMethod, function(err, result) {
 *     // do something with the result
 * });
 *
 * // try calling apiMethod only when error condition satisfies, all other
 * // errors will abort the retry control flow and return to final callback
 * async.retry({
 *   errorFilter: function(err) {
 *     return err.message === 'Temporary error'; // only retry on a specific error
 *   }
 * }, apiMethod, function(err, result) {
 *     // do something with the result
 * });
 *
 * // to retry individual methods that are not as reliable within other
 * // control flow functions, use the `retryable` wrapper:
 * async.auto({
 *     users: api.getUsers.bind(api),
 *     payments: async.retryable(3, api.getPayments.bind(api))
 * }, function(err, results) {
 *     // do something with the results
 * });
 *
 */
function retry(opts, task, callback) {
    var DEFAULT_TIMES = 5;
    var DEFAULT_INTERVAL = 0;

    var options = {
        times: DEFAULT_TIMES,
        intervalFunc: constant$1(DEFAULT_INTERVAL)
    };

    function parseTimes(acc, t) {
        if (typeof t === 'object') {
            acc.times = +t.times || DEFAULT_TIMES;

            acc.intervalFunc = typeof t.interval === 'function' ?
                t.interval :
                constant$1(+t.interval || DEFAULT_INTERVAL);

            acc.errorFilter = t.errorFilter;
        } else if (typeof t === 'number' || typeof t === 'string') {
            acc.times = +t || DEFAULT_TIMES;
        } else {
            throw new Error("Invalid arguments for async.retry");
        }
    }

    if (arguments.length < 3 && typeof opts === 'function') {
        callback = task || noop;
        task = opts;
    } else {
        parseTimes(options, opts);
        callback = callback || noop;
    }

    if (typeof task !== 'function') {
        throw new Error("Invalid arguments for async.retry");
    }

    var _task = wrapAsync(task);

    var attempt = 1;
    function retryAttempt() {
        _task(function(err) {
            if (err && attempt++ < options.times &&
                (typeof options.errorFilter != 'function' ||
                    options.errorFilter(err))) {
                setTimeout(retryAttempt, options.intervalFunc(attempt));
            } else {
                callback.apply(null, arguments);
            }
        });
    }

    retryAttempt();
}

/**
 * A close relative of [`retry`]{@link module:ControlFlow.retry}.  This method
 * wraps a task and makes it retryable, rather than immediately calling it
 * with retries.
 *
 * @name retryable
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.retry]{@link module:ControlFlow.retry}
 * @category Control Flow
 * @param {Object|number} [opts = {times: 5, interval: 0}| 5] - optional
 * options, exactly the same as from `retry`
 * @param {AsyncFunction} task - the asynchronous function to wrap.
 * This function will be passed any arguments passed to the returned wrapper.
 * Invoked with (...args, callback).
 * @returns {AsyncFunction} The wrapped function, which when invoked, will
 * retry on an error, based on the parameters specified in `opts`.
 * This function will accept the same parameters as `task`.
 * @example
 *
 * async.auto({
 *     dep1: async.retryable(3, getFromFlakyService),
 *     process: ["dep1", async.retryable(3, function (results, cb) {
 *         maybeProcessData(results.dep1, cb);
 *     })]
 * }, callback);
 */
var retryable = function (opts, task) {
    if (!task) {
        task = opts;
        opts = null;
    }
    var _task = wrapAsync(task);
    return initialParams(function (args, callback) {
        function taskFn(cb) {
            _task.apply(null, args.concat(cb));
        }

        if (opts) retry(opts, taskFn, callback);
        else retry(taskFn, callback);

    });
};

/**
 * Run the functions in the `tasks` collection in series, each one running once
 * the previous function has completed. If any functions in the series pass an
 * error to its callback, no more functions are run, and `callback` is
 * immediately called with the value of the error. Otherwise, `callback`
 * receives an array of results when `tasks` have completed.
 *
 * It is also possible to use an object instead of an array. Each property will
 * be run as a function, and the results will be passed to the final `callback`
 * as an object instead of an array. This can be a more readable way of handling
 *  results from {@link async.series}.
 *
 * **Note** that while many implementations preserve the order of object
 * properties, the [ECMAScript Language Specification](http://www.ecma-international.org/ecma-262/5.1/#sec-8.6)
 * explicitly states that
 *
 * > The mechanics and order of enumerating the properties is not specified.
 *
 * So if you rely on the order in which your series of functions are executed,
 * and want this to work on all platforms, consider using an array.
 *
 * @name series
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array|Iterable|Object} tasks - A collection containing
 * [async functions]{@link AsyncFunction} to run in series.
 * Each function can complete with any number of optional `result` values.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed. This function gets a results array (or object)
 * containing all the result arguments passed to the `task` callbacks. Invoked
 * with (err, result).
 * @example
 * async.series([
 *     function(callback) {
 *         // do some stuff ...
 *         callback(null, 'one');
 *     },
 *     function(callback) {
 *         // do some more stuff ...
 *         callback(null, 'two');
 *     }
 * ],
 * // optional callback
 * function(err, results) {
 *     // results is now equal to ['one', 'two']
 * });
 *
 * async.series({
 *     one: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 1);
 *         }, 200);
 *     },
 *     two: function(callback){
 *         setTimeout(function() {
 *             callback(null, 2);
 *         }, 100);
 *     }
 * }, function(err, results) {
 *     // results is now equal to: {one: 1, two: 2}
 * });
 */
function series(tasks, callback) {
    _parallel(eachOfSeries, tasks, callback);
}

/**
 * Returns `true` if at least one element in the `coll` satisfies an async test.
 * If any iteratee call returns `true`, the main `callback` is immediately
 * called.
 *
 * @name some
 * @static
 * @memberOf module:Collections
 * @method
 * @alias any
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collections in parallel.
 * The iteratee should complete with a boolean `result` value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the iteratee functions have finished.
 * Result will be either `true` or `false` depending on the values of the async
 * tests. Invoked with (err, result).
 * @example
 *
 * async.some(['file1','file2','file3'], function(filePath, callback) {
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, result) {
 *     // if result is true then at least one of the files exists
 * });
 */
var some = doParallel(_createTester(Boolean, identity));

/**
 * The same as [`some`]{@link module:Collections.some} but runs a maximum of `limit` async operations at a time.
 *
 * @name someLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.some]{@link module:Collections.some}
 * @alias anyLimit
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collections in parallel.
 * The iteratee should complete with a boolean `result` value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the iteratee functions have finished.
 * Result will be either `true` or `false` depending on the values of the async
 * tests. Invoked with (err, result).
 */
var someLimit = doParallelLimit(_createTester(Boolean, identity));

/**
 * The same as [`some`]{@link module:Collections.some} but runs only a single async operation at a time.
 *
 * @name someSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.some]{@link module:Collections.some}
 * @alias anySeries
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collections in series.
 * The iteratee should complete with a boolean `result` value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the iteratee functions have finished.
 * Result will be either `true` or `false` depending on the values of the async
 * tests. Invoked with (err, result).
 */
var someSeries = doLimit(someLimit, 1);

/**
 * Sorts a list by the results of running each `coll` value through an async
 * `iteratee`.
 *
 * @name sortBy
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with a value to use as the sort criteria as
 * its `result`.
 * Invoked with (item, callback).
 * @param {Function} callback - A callback which is called after all the
 * `iteratee` functions have finished, or an error occurs. Results is the items
 * from the original `coll` sorted by the values returned by the `iteratee`
 * calls. Invoked with (err, results).
 * @example
 *
 * async.sortBy(['file1','file2','file3'], function(file, callback) {
 *     fs.stat(file, function(err, stats) {
 *         callback(err, stats.mtime);
 *     });
 * }, function(err, results) {
 *     // results is now the original array of files sorted by
 *     // modified date
 * });
 *
 * // By modifying the callback parameter the
 * // sorting order can be influenced:
 *
 * // ascending order
 * async.sortBy([1,9,3,5], function(x, callback) {
 *     callback(null, x);
 * }, function(err,result) {
 *     // result callback
 * });
 *
 * // descending order
 * async.sortBy([1,9,3,5], function(x, callback) {
 *     callback(null, x*-1);    //<- x*-1 instead of x, turns the order around
 * }, function(err,result) {
 *     // result callback
 * });
 */
function sortBy (coll, iteratee, callback) {
    var _iteratee = wrapAsync(iteratee);
    map(coll, function (x, callback) {
        _iteratee(x, function (err, criteria) {
            if (err) return callback(err);
            callback(null, {value: x, criteria: criteria});
        });
    }, function (err, results) {
        if (err) return callback(err);
        callback(null, arrayMap(results.sort(comparator), baseProperty('value')));
    });

    function comparator(left, right) {
        var a = left.criteria, b = right.criteria;
        return a < b ? -1 : a > b ? 1 : 0;
    }
}

/**
 * Sets a time limit on an asynchronous function. If the function does not call
 * its callback within the specified milliseconds, it will be called with a
 * timeout error. The code property for the error object will be `'ETIMEDOUT'`.
 *
 * @name timeout
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} asyncFn - The async function to limit in time.
 * @param {number} milliseconds - The specified time limit.
 * @param {*} [info] - Any variable you want attached (`string`, `object`, etc)
 * to timeout Error for more information..
 * @returns {AsyncFunction} Returns a wrapped function that can be used with any
 * of the control flow functions.
 * Invoke this function with the same parameters as you would `asyncFunc`.
 * @example
 *
 * function myFunction(foo, callback) {
 *     doAsyncTask(foo, function(err, data) {
 *         // handle errors
 *         if (err) return callback(err);
 *
 *         // do some stuff ...
 *
 *         // return processed data
 *         return callback(null, data);
 *     });
 * }
 *
 * var wrapped = async.timeout(myFunction, 1000);
 *
 * // call `wrapped` as you would `myFunction`
 * wrapped({ bar: 'bar' }, function(err, data) {
 *     // if `myFunction` takes < 1000 ms to execute, `err`
 *     // and `data` will have their expected values
 *
 *     // else `err` will be an Error with the code 'ETIMEDOUT'
 * });
 */
function timeout(asyncFn, milliseconds, info) {
    var fn = wrapAsync(asyncFn);

    return initialParams(function (args, callback) {
        var timedOut = false;
        var timer;

        function timeoutCallback() {
            var name = asyncFn.name || 'anonymous';
            var error  = new Error('Callback function "' + name + '" timed out.');
            error.code = 'ETIMEDOUT';
            if (info) {
                error.info = info;
            }
            timedOut = true;
            callback(error);
        }

        args.push(function () {
            if (!timedOut) {
                callback.apply(null, arguments);
                clearTimeout(timer);
            }
        });

        // setup timer and call original function
        timer = setTimeout(timeoutCallback, milliseconds);
        fn.apply(null, args);
    });
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil;
var nativeMax = Math.max;

/**
 * The base implementation of `_.range` and `_.rangeRight` which doesn't
 * coerce arguments.
 *
 * @private
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @param {number} step The value to increment or decrement by.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the range of numbers.
 */
function baseRange(start, end, step, fromRight) {
  var index = -1,
      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
      result = Array(length);

  while (length--) {
    result[fromRight ? length : ++index] = start;
    start += step;
  }
  return result;
}

/**
 * The same as [times]{@link module:ControlFlow.times} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name timesLimit
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.times]{@link module:ControlFlow.times}
 * @category Control Flow
 * @param {number} count - The number of times to run the function.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - The async function to call `n` times.
 * Invoked with the iteration index and a callback: (n, next).
 * @param {Function} callback - see [async.map]{@link module:Collections.map}.
 */
function timeLimit(count, limit, iteratee, callback) {
    var _iteratee = wrapAsync(iteratee);
    mapLimit(baseRange(0, count, 1), limit, _iteratee, callback);
}

/**
 * Calls the `iteratee` function `n` times, and accumulates results in the same
 * manner you would use with [map]{@link module:Collections.map}.
 *
 * @name times
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.map]{@link module:Collections.map}
 * @category Control Flow
 * @param {number} n - The number of times to run the function.
 * @param {AsyncFunction} iteratee - The async function to call `n` times.
 * Invoked with the iteration index and a callback: (n, next).
 * @param {Function} callback - see {@link module:Collections.map}.
 * @example
 *
 * // Pretend this is some complicated async factory
 * var createUser = function(id, callback) {
 *     callback(null, {
 *         id: 'user' + id
 *     });
 * };
 *
 * // generate 5 users
 * async.times(5, function(n, next) {
 *     createUser(n, function(err, user) {
 *         next(err, user);
 *     });
 * }, function(err, users) {
 *     // we should now have 5 users
 * });
 */
var times = doLimit(timeLimit, Infinity);

/**
 * The same as [times]{@link module:ControlFlow.times} but runs only a single async operation at a time.
 *
 * @name timesSeries
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.times]{@link module:ControlFlow.times}
 * @category Control Flow
 * @param {number} n - The number of times to run the function.
 * @param {AsyncFunction} iteratee - The async function to call `n` times.
 * Invoked with the iteration index and a callback: (n, next).
 * @param {Function} callback - see {@link module:Collections.map}.
 */
var timesSeries = doLimit(timeLimit, 1);

/**
 * A relative of `reduce`.  Takes an Object or Array, and iterates over each
 * element in series, each step potentially mutating an `accumulator` value.
 * The type of the accumulator defaults to the type of collection passed in.
 *
 * @name transform
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {*} [accumulator] - The initial state of the transform.  If omitted,
 * it will default to an empty Object or Array, depending on the type of `coll`
 * @param {AsyncFunction} iteratee - A function applied to each item in the
 * collection that potentially modifies the accumulator.
 * Invoked with (accumulator, item, key, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result is the transformed accumulator.
 * Invoked with (err, result).
 * @example
 *
 * async.transform([1,2,3], function(acc, item, index, callback) {
 *     // pointless async:
 *     process.nextTick(function() {
 *         acc.push(item * 2)
 *         callback(null)
 *     });
 * }, function(err, result) {
 *     // result is now equal to [2, 4, 6]
 * });
 *
 * @example
 *
 * async.transform({a: 1, b: 2, c: 3}, function (obj, val, key, callback) {
 *     setImmediate(function () {
 *         obj[key] = val * 2;
 *         callback();
 *     })
 * }, function (err, result) {
 *     // result is equal to {a: 2, b: 4, c: 6}
 * })
 */
function transform (coll, accumulator, iteratee, callback) {
    if (arguments.length <= 3) {
        callback = iteratee;
        iteratee = accumulator;
        accumulator = isArray(coll) ? [] : {};
    }
    callback = once(callback || noop);
    var _iteratee = wrapAsync(iteratee);

    eachOf(coll, function(v, k, cb) {
        _iteratee(accumulator, v, k, cb);
    }, function(err) {
        callback(err, accumulator);
    });
}

/**
 * It runs each task in series but stops whenever any of the functions were
 * successful. If one of the tasks were successful, the `callback` will be
 * passed the result of the successful task. If all tasks fail, the callback
 * will be passed the error and result (if any) of the final attempt.
 *
 * @name tryEach
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array|Iterable|Object} tasks - A collection containing functions to
 * run, each function is passed a `callback(err, result)` it must call on
 * completion with an error `err` (which can be `null`) and an optional `result`
 * value.
 * @param {Function} [callback] - An optional callback which is called when one
 * of the tasks has succeeded, or all have failed. It receives the `err` and
 * `result` arguments of the last attempt at completing the `task`. Invoked with
 * (err, results).
 * @example
 * async.tryEach([
 *     function getDataFromFirstWebsite(callback) {
 *         // Try getting the data from the first website
 *         callback(err, data);
 *     },
 *     function getDataFromSecondWebsite(callback) {
 *         // First website failed,
 *         // Try getting the data from the backup website
 *         callback(err, data);
 *     }
 * ],
 * // optional callback
 * function(err, results) {
 *     Now do something with the data.
 * });
 *
 */
function tryEach(tasks, callback) {
    var error = null;
    var result;
    callback = callback || noop;
    eachSeries(tasks, function(task, callback) {
        wrapAsync(task)(function (err, res/*, ...args*/) {
            if (arguments.length > 2) {
                result = slice(arguments, 1);
            } else {
                result = res;
            }
            error = err;
            callback(!err);
        });
    }, function () {
        callback(error, result);
    });
}

/**
 * Undoes a [memoize]{@link module:Utils.memoize}d function, reverting it to the original,
 * unmemoized form. Handy for testing.
 *
 * @name unmemoize
 * @static
 * @memberOf module:Utils
 * @method
 * @see [async.memoize]{@link module:Utils.memoize}
 * @category Util
 * @param {AsyncFunction} fn - the memoized function
 * @returns {AsyncFunction} a function that calls the original unmemoized function
 */
function unmemoize(fn) {
    return function () {
        return (fn.unmemoized || fn).apply(null, arguments);
    };
}

/**
 * Repeatedly call `iteratee`, while `test` returns `true`. Calls `callback` when
 * stopped, or an error occurs.
 *
 * @name whilst
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Function} test - synchronous truth test to perform before each
 * execution of `iteratee`. Invoked with ().
 * @param {AsyncFunction} iteratee - An async function which is called each time
 * `test` passes. Invoked with (callback).
 * @param {Function} [callback] - A callback which is called after the test
 * function has failed and repeated execution of `iteratee` has stopped. `callback`
 * will be passed an error and any arguments passed to the final `iteratee`'s
 * callback. Invoked with (err, [results]);
 * @returns undefined
 * @example
 *
 * var count = 0;
 * async.whilst(
 *     function() { return count < 5; },
 *     function(callback) {
 *         count++;
 *         setTimeout(function() {
 *             callback(null, count);
 *         }, 1000);
 *     },
 *     function (err, n) {
 *         // 5 seconds have passed, n = 5
 *     }
 * );
 */
function whilst(test, iteratee, callback) {
    callback = onlyOnce(callback || noop);
    var _iteratee = wrapAsync(iteratee);
    if (!test()) return callback(null);
    var next = function(err/*, ...args*/) {
        if (err) return callback(err);
        if (test()) return _iteratee(next);
        var args = slice(arguments, 1);
        callback.apply(null, [null].concat(args));
    };
    _iteratee(next);
}

/**
 * Repeatedly call `iteratee` until `test` returns `true`. Calls `callback` when
 * stopped, or an error occurs. `callback` will be passed an error and any
 * arguments passed to the final `iteratee`'s callback.
 *
 * The inverse of [whilst]{@link module:ControlFlow.whilst}.
 *
 * @name until
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.whilst]{@link module:ControlFlow.whilst}
 * @category Control Flow
 * @param {Function} test - synchronous truth test to perform before each
 * execution of `iteratee`. Invoked with ().
 * @param {AsyncFunction} iteratee - An async function which is called each time
 * `test` fails. Invoked with (callback).
 * @param {Function} [callback] - A callback which is called after the test
 * function has passed and repeated execution of `iteratee` has stopped. `callback`
 * will be passed an error and any arguments passed to the final `iteratee`'s
 * callback. Invoked with (err, [results]);
 */
function until(test, iteratee, callback) {
    whilst(function() {
        return !test.apply(this, arguments);
    }, iteratee, callback);
}

/**
 * Runs the `tasks` array of functions in series, each passing their results to
 * the next in the array. However, if any of the `tasks` pass an error to their
 * own callback, the next function is not executed, and the main `callback` is
 * immediately called with the error.
 *
 * @name waterfall
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array} tasks - An array of [async functions]{@link AsyncFunction}
 * to run.
 * Each function should complete with any number of `result` values.
 * The `result` values will be passed as arguments, in order, to the next task.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed. This will be passed the results of the last task's
 * callback. Invoked with (err, [results]).
 * @returns undefined
 * @example
 *
 * async.waterfall([
 *     function(callback) {
 *         callback(null, 'one', 'two');
 *     },
 *     function(arg1, arg2, callback) {
 *         // arg1 now equals 'one' and arg2 now equals 'two'
 *         callback(null, 'three');
 *     },
 *     function(arg1, callback) {
 *         // arg1 now equals 'three'
 *         callback(null, 'done');
 *     }
 * ], function (err, result) {
 *     // result now equals 'done'
 * });
 *
 * // Or, with named functions:
 * async.waterfall([
 *     myFirstFunction,
 *     mySecondFunction,
 *     myLastFunction,
 * ], function (err, result) {
 *     // result now equals 'done'
 * });
 * function myFirstFunction(callback) {
 *     callback(null, 'one', 'two');
 * }
 * function mySecondFunction(arg1, arg2, callback) {
 *     // arg1 now equals 'one' and arg2 now equals 'two'
 *     callback(null, 'three');
 * }
 * function myLastFunction(arg1, callback) {
 *     // arg1 now equals 'three'
 *     callback(null, 'done');
 * }
 */
var waterfall = function(tasks, callback) {
    callback = once(callback || noop);
    if (!isArray(tasks)) return callback(new Error('First argument to waterfall must be an array of functions'));
    if (!tasks.length) return callback();
    var taskIndex = 0;

    function nextTask(args) {
        var task = wrapAsync(tasks[taskIndex++]);
        args.push(onlyOnce(next));
        task.apply(null, args);
    }

    function next(err/*, ...args*/) {
        if (err || taskIndex === tasks.length) {
            return callback.apply(null, arguments);
        }
        nextTask(slice(arguments, 1));
    }

    nextTask([]);
};

/**
 * An "async function" in the context of Async is an asynchronous function with
 * a variable number of parameters, with the final parameter being a callback.
 * (`function (arg1, arg2, ..., callback) {}`)
 * The final callback is of the form `callback(err, results...)`, which must be
 * called once the function is completed.  The callback should be called with a
 * Error as its first argument to signal that an error occurred.
 * Otherwise, if no error occurred, it should be called with `null` as the first
 * argument, and any additional `result` arguments that may apply, to signal
 * successful completion.
 * The callback must be called exactly once, ideally on a later tick of the
 * JavaScript event loop.
 *
 * This type of function is also referred to as a "Node-style async function",
 * or a "continuation passing-style function" (CPS). Most of the methods of this
 * library are themselves CPS/Node-style async functions, or functions that
 * return CPS/Node-style async functions.
 *
 * Wherever we accept a Node-style async function, we also directly accept an
 * [ES2017 `async` function]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function}.
 * In this case, the `async` function will not be passed a final callback
 * argument, and any thrown error will be used as the `err` argument of the
 * implicit callback, and the return value will be used as the `result` value.
 * (i.e. a `rejected` of the returned Promise becomes the `err` callback
 * argument, and a `resolved` value becomes the `result`.)
 *
 * Note, due to JavaScript limitations, we can only detect native `async`
 * functions and not transpilied implementations.
 * Your environment must have `async`/`await` support for this to work.
 * (e.g. Node > v7.6, or a recent version of a modern browser).
 * If you are using `async` functions through a transpiler (e.g. Babel), you
 * must still wrap the function with [asyncify]{@link module:Utils.asyncify},
 * because the `async function` will be compiled to an ordinary function that
 * returns a promise.
 *
 * @typedef {Function} AsyncFunction
 * @static
 */

/**
 * Async is a utility module which provides straight-forward, powerful functions
 * for working with asynchronous JavaScript. Although originally designed for
 * use with [Node.js](http://nodejs.org) and installable via
 * `npm install --save async`, it can also be used directly in the browser.
 * @module async
 * @see AsyncFunction
 */


/**
 * A collection of `async` functions for manipulating collections, such as
 * arrays and objects.
 * @module Collections
 */

/**
 * A collection of `async` functions for controlling the flow through a script.
 * @module ControlFlow
 */

/**
 * A collection of `async` utility functions.
 * @module Utils
 */

var index = {
    apply: apply,
    applyEach: applyEach,
    applyEachSeries: applyEachSeries,
    asyncify: asyncify,
    auto: auto,
    autoInject: autoInject,
    cargo: cargo,
    compose: compose,
    concat: concat,
    concatLimit: concatLimit,
    concatSeries: concatSeries,
    constant: constant,
    detect: detect,
    detectLimit: detectLimit,
    detectSeries: detectSeries,
    dir: dir,
    doDuring: doDuring,
    doUntil: doUntil,
    doWhilst: doWhilst,
    during: during,
    each: eachLimit,
    eachLimit: eachLimit$1,
    eachOf: eachOf,
    eachOfLimit: eachOfLimit,
    eachOfSeries: eachOfSeries,
    eachSeries: eachSeries,
    ensureAsync: ensureAsync,
    every: every,
    everyLimit: everyLimit,
    everySeries: everySeries,
    filter: filter,
    filterLimit: filterLimit,
    filterSeries: filterSeries,
    forever: forever,
    groupBy: groupBy,
    groupByLimit: groupByLimit,
    groupBySeries: groupBySeries,
    log: log,
    map: map,
    mapLimit: mapLimit,
    mapSeries: mapSeries,
    mapValues: mapValues,
    mapValuesLimit: mapValuesLimit,
    mapValuesSeries: mapValuesSeries,
    memoize: memoize,
    nextTick: nextTick,
    parallel: parallelLimit,
    parallelLimit: parallelLimit$1,
    priorityQueue: priorityQueue,
    queue: queue$1,
    race: race,
    reduce: reduce,
    reduceRight: reduceRight,
    reflect: reflect,
    reflectAll: reflectAll,
    reject: reject,
    rejectLimit: rejectLimit,
    rejectSeries: rejectSeries,
    retry: retry,
    retryable: retryable,
    seq: seq,
    series: series,
    setImmediate: setImmediate$1,
    some: some,
    someLimit: someLimit,
    someSeries: someSeries,
    sortBy: sortBy,
    timeout: timeout,
    times: times,
    timesLimit: timeLimit,
    timesSeries: timesSeries,
    transform: transform,
    tryEach: tryEach,
    unmemoize: unmemoize,
    until: until,
    waterfall: waterfall,
    whilst: whilst,

    // aliases
    all: every,
    allLimit: everyLimit,
    allSeries: everySeries,
    any: some,
    anyLimit: someLimit,
    anySeries: someSeries,
    find: detect,
    findLimit: detectLimit,
    findSeries: detectSeries,
    forEach: eachLimit,
    forEachSeries: eachSeries,
    forEachLimit: eachLimit$1,
    forEachOf: eachOf,
    forEachOfSeries: eachOfSeries,
    forEachOfLimit: eachOfLimit,
    inject: reduce,
    foldl: reduce,
    foldr: reduceRight,
    select: filter,
    selectLimit: filterLimit,
    selectSeries: filterSeries,
    wrapSync: asyncify
};

exports['default'] = index;
exports.apply = apply;
exports.applyEach = applyEach;
exports.applyEachSeries = applyEachSeries;
exports.asyncify = asyncify;
exports.auto = auto;
exports.autoInject = autoInject;
exports.cargo = cargo;
exports.compose = compose;
exports.concat = concat;
exports.concatLimit = concatLimit;
exports.concatSeries = concatSeries;
exports.constant = constant;
exports.detect = detect;
exports.detectLimit = detectLimit;
exports.detectSeries = detectSeries;
exports.dir = dir;
exports.doDuring = doDuring;
exports.doUntil = doUntil;
exports.doWhilst = doWhilst;
exports.during = during;
exports.each = eachLimit;
exports.eachLimit = eachLimit$1;
exports.eachOf = eachOf;
exports.eachOfLimit = eachOfLimit;
exports.eachOfSeries = eachOfSeries;
exports.eachSeries = eachSeries;
exports.ensureAsync = ensureAsync;
exports.every = every;
exports.everyLimit = everyLimit;
exports.everySeries = everySeries;
exports.filter = filter;
exports.filterLimit = filterLimit;
exports.filterSeries = filterSeries;
exports.forever = forever;
exports.groupBy = groupBy;
exports.groupByLimit = groupByLimit;
exports.groupBySeries = groupBySeries;
exports.log = log;
exports.map = map;
exports.mapLimit = mapLimit;
exports.mapSeries = mapSeries;
exports.mapValues = mapValues;
exports.mapValuesLimit = mapValuesLimit;
exports.mapValuesSeries = mapValuesSeries;
exports.memoize = memoize;
exports.nextTick = nextTick;
exports.parallel = parallelLimit;
exports.parallelLimit = parallelLimit$1;
exports.priorityQueue = priorityQueue;
exports.queue = queue$1;
exports.race = race;
exports.reduce = reduce;
exports.reduceRight = reduceRight;
exports.reflect = reflect;
exports.reflectAll = reflectAll;
exports.reject = reject;
exports.rejectLimit = rejectLimit;
exports.rejectSeries = rejectSeries;
exports.retry = retry;
exports.retryable = retryable;
exports.seq = seq;
exports.series = series;
exports.setImmediate = setImmediate$1;
exports.some = some;
exports.someLimit = someLimit;
exports.someSeries = someSeries;
exports.sortBy = sortBy;
exports.timeout = timeout;
exports.times = times;
exports.timesLimit = timeLimit;
exports.timesSeries = timesSeries;
exports.transform = transform;
exports.tryEach = tryEach;
exports.unmemoize = unmemoize;
exports.until = until;
exports.waterfall = waterfall;
exports.whilst = whilst;
exports.all = every;
exports.allLimit = everyLimit;
exports.allSeries = everySeries;
exports.any = some;
exports.anyLimit = someLimit;
exports.anySeries = someSeries;
exports.find = detect;
exports.findLimit = detectLimit;
exports.findSeries = detectSeries;
exports.forEach = eachLimit;
exports.forEachSeries = eachSeries;
exports.forEachLimit = eachLimit$1;
exports.forEachOf = eachOf;
exports.forEachOfSeries = eachOfSeries;
exports.forEachOfLimit = eachOfLimit;
exports.inject = reduce;
exports.foldl = reduce;
exports.foldr = reduceRight;
exports.select = filter;
exports.selectLimit = filterLimit;
exports.selectSeries = filterSeries;
exports.wrapSync = asyncify;

Object.defineProperty(exports, '__esModule', { value: true });

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(67)(module)))

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ])));