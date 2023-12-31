{
    "name": "lilconfig",
    "version": "2.1.0",
    "description": "A zero-dependency alternative to cosmiconfig",
    "main": "dist/index.js",
    "types": "dist/index.d.ts",
    "scripts": {
        "prebuild": "npm run clean",
        "build": "tsc --declaration",
        "postbuild": "du -h ./dist/*",
        "clean": "rm -rf ./dist",
        "test": "jest --coverage",
        "lint": "eslint ./src/*.ts"
    },
    "keywords": [
        "cosmiconfig",
        "config",
        "configuration",
        "search"
    ],
    "files": [
        "dist/*"
    ],
    "repository": {
        "type": "git",
        "url": "https://github.com/antonk52/lilconfig"
    },
    "bugs": "https://github.com/antonk52/lilconfig/issues",
    "author": "antonk52",
    "license": "MIT",
    "devDependencies": {
        "@types/jest": "^27.0.2",
        "@types/node": "^14.18.36",
        "@typescript-eslint/eslint-plugin": "^5.54.0",
        "@typescript-eslint/parser": "^5.54.0",
        "cosmiconfig": "^7.1.0",
        "eslint": "^8.35.0",
        "eslint-config-prettier": "^8.6.0",
        "eslint-plugin-prettier": "^4.2.1",
        "jest": "^27.3.1",
        "prettier": "^2.8.4",
        "ts-jest": "27.0.7",
        "typescript": "4.4.4"
    },
    "engines": {
        "node": ">=10"
    }
}
                                                                                                                                                                                                                                           ore the request headers if applicable
  var requestHeaders;
  var beforeRedirect = this._options.beforeRedirect;
  if (beforeRedirect) {
    requestHeaders = Object.assign({
      // The Host header was set by nativeProtocol.request
      Host: response.req.getHeader("host"),
    }, this._options.headers);
  }

  // RFC7231§6.4: Automatic redirection needs to done with
  // care for methods not known to be safe, […]
  // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
  // the request method from POST to GET for the subsequent request.
  var method = this._options.method;
  if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
      // RFC7231§6.4.4: The 303 (See Other) status code indicates that
      // the server is redirecting the user agent to a different resource […]
      // A user agent can perform a retrieval request targeting that URI
      // (a GET or HEAD request if using HTTP) […]
      (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
    this._options.method = "GET";
    // Drop a possible entity and headers related to it
    this._requestBodyBuffers = [];
    removeMatchingHeaders(/^content-/i, this._options.headers);
  }

  // Drop the Host header, as the redirect might lead to a different host
  var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);

  // If the redirect is relative, carry over the host of the last request
  var currentUrlParts = url.parse(this._currentUrl);
  var currentHost = currentHostHeader || currentUrlParts.host;
  var currentUrl = /^\w+:/.test(location) ? this._currentUrl :
    url.format(Object.assign(currentUrlParts, { host: currentHost }));

  // Determine the URL of the redirection
  var redirectUrl;
  try {
    redirectUrl = url.resolve(currentUrl, location);
  }
  catch (cause) {
    this.emit("error", new RedirectionError(cause));
    return;
  }

  // Create the redirected request
  debug$2("redirecting to", redirectUrl);
  this._isRedirect = true;
  var redirectUrlParts = url.parse(redirectUrl);
  Object.assign(this._options, redirectUrlParts);

  // Drop confidential headers when redirecting to a less secure protocol
  // or to a different domain that is not a superdomain
  if (redirectUrlParts.protocol !== currentUrlParts.protocol &&
     redirectUrlParts.protocol !== "https:" ||
     redirectUrlParts.host !== currentHost &&
     !isSubdomain(redirectUrlParts.host, currentHost)) {
    removeMatchingHeaders(/^(?:authorization|cookie)$/i, this._options.headeMIT License

Copyright (c) 2022 Anton Kastritskiy

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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }
    delete options.host;
  }

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    }
    else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }
};


// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];
  if (!nativeProtocol) {
    this.emit("error", new TypeError("Unsupported protocol " + protocol));
    return;
  }

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.slice(0, -1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url.format(this._options);

  // Set up event handlers
  request._redirectable = this;
  for (var e = 0; e < events.length; e++) {
    request.on(events[e], eventHandlers[events[e]]);
  }

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var self = this;
    var buffers = this._requestBodyBuffers;
    (function writeNext(error) {
      // Only write if this request has not been redirected yet
      /* istanbul ignore else */
      if (request === self._currentRequest) {
        // Report any write errors
        /* istanbul ignore if */
        if (error) {
          self.emit("error", error);
        }
        // Write the next buffer if there are still left
        else if (i < buffers.length) {
          var buffer = buffers[i++];
          /* istanbul ignore else */
          if (!request.finished) {
            request.write(buffer.data, buffer.encoding, writeNext);
          }
        }
        // End the request if `end` has been called on us
        else if (self._ended) {
          request.end();
        }
      }
    }());
  }
};

// Processes a response from the current native request
RedirectableRequestexport declare type LilconfigResult = null | {
    filepath: string;
    config: any;
    isEmpty?: boolean;
};
interface OptionsBase {
    stopDir?: string;
    searchPlaces?: string[];
    ignoreEmptySearchPlaces?: boolean;
    packageProp?: string | string[];
}
export declare type Transform = TransformSync | ((result: LilconfigResult) => Promise<LilconfigResult>);
export declare type TransformSync = (result: LilconfigResult) => LilconfigResult;
declare type LoaderResult = any;
export declare type LoaderSync = (filepath: string, content: string) => LoaderResult;
export declare type Loader = LoaderSync | ((filepath: string, content: string) => Promise<LoaderResult>);
export declare type Loaders = Record<string, Loader>;
export declare type LoadersSync = Record<string, LoaderSync>;
export interface Options extends OptionsBase {
    loaders?: Loaders;
    transform?: Transform;
}
export interface OptionsSync extends OptionsBase {
    loaders?: LoadersSync;
    transform?: TransformSync;
}
export declare const defaultLoaders: LoadersSync;
declare type AsyncSearcher = {
    search(searchFrom?: string): Promise<LilconfigResult>;
    load(filepath: string): Promise<LilconfigResult>;
};
export declare function lilconfig(name: string, options?: Partial<Options>): AsyncSearcher;
declare type SyncSearcher = {
    search(searchFrom?: string): LilconfigResult;
    load(filepath: string): LilconfigResult;
};
export declare function lilconfigSync(name: string, options?: OptionsSync): SyncSearcher;
export {};
               oProxy
	    ? (url.parse(req.url).path || '')
	    : req.url;

	  //
	  // Remark: ignorePath will just straight up ignore whatever the request's
	  // path is. This can be labeled as FOOT-GUN material if you do not know what
	  // you are doing and are using conflicting options.
	  //
	  outgoingPath = !options.ignorePath ? outgoingPath : '';

	  outgoing.path = common.urlJoin(targetPath, outgoingPath);

	  if (options.changeOrigin) {
	    outgoing.headers.host =
	      required(outgoing.port, options[forward || 'target'].protocol) && !hasPort(outgoing.host)
	        ? outgoing.host + ':' + outgoing.port
	        : outgoing.host;
	  }
	  return outgoing;
	};

	/**
	 * Set the proper configuration for sockets,
	 * set no delay and set keep alive, also set
	 * the timeout to 0.
	 *
	 * Examples:
	 *
	 *    common.setupSocket(socket)
	 *    // => Socket
	 *
	 * @param {Socket} Socket instance to setup
	 * 
	 * @return {Socket} Return the configured socket.
	 *
	 * @api private
	 */

	common.setupSocket = function(socket) {
	  socket.setTimeout(0);
	  socket.setNoDelay(true);

	  socket.setKeepAlive(true, 0);

	  return socket;
	};

	/**
	 * Get the port number from the host. Or guess it based on the connection type.
	 *
	 * @param {Request} req Incoming HTTP request.
	 *
	 * @return {String} The port number.
	 *
	 * @api private
	 */
	common.getPort = function(req) {
	  var res = req.headers.host ? req.headers.host.match(/:(\d+)/) : '';

	  return res ?
	    res[1] :
	    common.hasEncryptedConnection(req) ? '443' : '80';
	};

	/**
	 * Check if the request has an encrypted connection.
	 *
	 * @param {Request} req Incoming HTTP request.
	 *
	 * @return {Boolean} Whether the connection is encrypted or not.
	 *
	 * @api private
	 */
	common.hasEncryptedConnection = function(req) {
	  return Boolean(req.connection.encrypted || req.connection.pair);
	};

	/**
	 * OS-agnostic join (doesn't break on URLs like path.join does on Windows)>
	 *
	 * @return {String} The generated path.
	 *
	 * @api private
	 */

	common.urlJoin = function() {
	    //
	    // We do not want to mess with the query string. All we want to touch is the path.
	    //
	  var args = Array.prototype.slice.call(arguments),
	      lastIndex = args.length - 1,
	      last = args[lastIndex],
	      lastSegs = last.split('?'),
	      retSegs;

	  args[lastIndex] = lastSegs.shift();

	  //
	  // Join all strings, but remove empty strings so we don't get extra slashes from
	  // joining e.g. ['', 'am']
	  //
	  retSegs = [
	    args.filter(Boolean).join('/')
	# Laravel Vite Plugin

<a href="https://github.com/laravel/vite-plugin/actions"><img src="https://github.com/laravel/vite-plugin/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/laravel-vite-plugin"><img src="https://img.shields.io/npm/dt/laravel-vite-plugin" alt="Total Downloads"></a>
<a href="https://www.npmjs.com/package/laravel-vite-plugin"><img src="https://img.shields.io/npm/v/laravel-vite-plugin" alt="Latest Stable Version"></a>
<a href="https://www.npmjs.com/package/laravel-vite-plugin"><img src="https://img.shields.io/npm/l/laravel-vite-plugin" alt="License"></a>

## Introduction

[Vite](https://vitejs.dev) is a modern frontend build tool that provides an extremely fast development environment and bundles your code for production.

This plugin configures Vite for use with a Laravel backend server.

## Official Documentation

Documentation for the Laravel Vite plugin can be found on the [Laravel website](https://laravel.com/docs/vite).

## Contributing

Thank you for considering contributing to the Laravel Vite plugin! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

Please review [our security policy](https://github.com/laravel/vite-plugin/security/policy) on how to report security vulnerabilities.

## License

The Laravel Vite plugin is open-sourced software licensed under the [MIT license](LICENSE.md).
                                                                                                                                                                                                                                                                                                                                                                                                     r` to be imported as module namespace.
	//
	EventEmitter.EventEmitter = EventEmitter;

	//
	// Expose the module.
	//
	{
	  module.exports = EventEmitter;
	}
} (eventemitter3));

var common$3 = {};

/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */
var requiresPort = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
    return port !== 80;

    case 'https':
    case 'wss':
    return port !== 443;

    case 'ftp':
    return port !== 21;

    case 'gopher':
    return port !== 70;

    case 'file':
    return false;
  }

  return port !== 0;
};

(function (exports) {
	var common   = exports,
	    url      = require$$0$9,
	    extend   = require$$0$6._extend,
	    required = requiresPort;

	var upgradeHeader = /(^|,)\s*upgrade\s*($|,)/i,
	    isSSL = /^https|wss/;

	/**
	 * Simple Regex for testing if protocol is https
	 */
	common.isSSL = isSSL;
	/**
	 * Copies the right headers from `options` and `req` to
	 * `outgoing` which is then used to fire the proxied
	 * request.
	 *
	 * Examples:
	 *
	 *    common.setupOutgoing(outgoing, options, req)
	 *    // => { host: ..., hostname: ...}
	 *
	 * @param {Object} Outgoing Base object to be filled with required properties
	 * @param {Object} Options Config object passed to the proxy
	 * @param {ClientRequest} Req Request Object
	 * @param {String} Forward String to select forward or target
	 * 
	 * @return {Object} Outgoing Object with all required properties set
	 *
	 * @api private
	 */

	common.setupOutgoing = function(outgoing, options, req, forward) {
	  outgoing.port = options[forward || 'target'].port ||
	                  (isSSL.test(options[forward || 'target'].protocol) ? 443 :{
    "name": "laravel-vite-plugin",
    "version": "0.7.4",
    "description": "Laravel plugin for Vite.",
    "keywords": [
        "laravel",
        "vite",
        "vite-plugin"
    ],
    "homepage": "https://github.com/laravel/vite-plugin",
    "repository": {
        "type": "git",
        "url": "https://github.com/laravel/vite-plugin"
    },
    "license": "MIT",
    "author": "Laravel",
    "main": "dist/index.js",
    "types": "dist/index.d.ts",
    "files": [
        "/dist",
        "/inertia-helpers"
    ],
    "scripts": {
        "build": "npm run build-plugin && npm run build-inertia-helpers",
        "build-plugin": "rm -rf dist && tsc && cp src/dev-server-index.html dist/",
        "build-inertia-helpers": "rm -rf inertia-helpers && tsc --project tsconfig.inertia-helpers.json",
        "lint": "eslint --ext .ts ./src ./tests",
        "test": "vitest run"
    },
    "devDependencies": {
        "@types/node": "^18.11.9",
        "@typescript-eslint/eslint-plugin": "^5.21.0",
        "@typescript-eslint/parser": "^5.21.0",
        "eslint": "^8.14.0",
        "typescript": "^4.6.4",
        "vite": "^4.0.0",
        "vitest": "^0.25.2"
    },
    "peerDependencies": {
        "vite": "^3.0.0 || ^4.0.0"
    },
    "engines": {
        "node": ">=14"
    },
    "dependencies": {
        "picocolors": "^1.0.0",
        "vite-plugin-full-reload": "^1.0.5"
    }
}
                                                                                                                                       event : event;

	  if (!this._events[evt]) return false;

	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;

	  if (listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Add a listener for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  return addListener(this, event, fn, context, false);
	};

	/**
	 * Add a one-time listener for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  return addListener(this, event, fn, context, true);
	};

	/**
	 * Remove the listeners of a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * The MIT License (MIT)

Copyright (c) Taylor Otwell

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                             cter to make sure that the built-in object properties are not
	// overridden or used as an attack vector.
	//
	if (Object.create) {
	  Events.prototype = Object.create(null);

	  //
	  // This hack is needed because the `__proto__` property is still inherited in
	  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
	  //
	  if (!new Events().__proto__) prefix = false;
	}

	/**
	 * Representation of a single event listener.
	 *
	 * @param {Function} fn The listener function.
	 * @param {*} context The context to invoke the listener with.
	 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
	 * @constructor
	 * @private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Add a listener for a given event.
	 *
	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} context The context to invoke the listener with.
	 * @param {Boolean} once Specify if the listener is a one-time listener.
	 * @returns {EventEmitter}
	 * @private
	 */
	function addListener(emitter, event, fn, context, once) {
	  if (typeof fn !== 'function') {
	    throw new TypeError('The listener must be a function');
	  }

	  var listener = new EE(fn, context || emitter, once)
	    , evt = prefix ? prefix + event : event;

	  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
	  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
	  else emitter._events[evt] = [emitter._events[evt], listener];

	  return emitter;
	}

	/**
	 * Clear event by name.
	 *
	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	 * @param {(String|Symbol)} evt The Event name.
	 * @private
	 */
	function clearEvent(emitter, evt) {
	  if (--emitter._eventsCount === 0) emitter._events = new Events();
	  else delete emitter._events[evt];
	}

	/**
	 * Minimal `EventEmitter` interface that is molded against the Node.js
	 * `EventEmitter` interface.
	 *
	 * @constructor
	 * @public
	 */
	function EventEmitter() {
	  this._events = new Events();
	  this._eventsCount = 0;
	}

	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var names = []
	    , events
	    , name;

	  if (this._eventsCount === 0) return namesimport { Plugin, UserConfig, ConfigEnv } from 'vite';
import { Config as FullReloadConfig } from 'vite-plugin-full-reload';
interface PluginConfig {
    /**
     * The path or paths of the entry points to compile.
     */
    input: string | string[];
    /**
     * Laravel's public directory.
     *
     * @default 'public'
     */
    publicDirectory?: string;
    /**
     * The public subdirectory where compiled assets should be written.
     *
     * @default 'build'
     */
    buildDirectory?: string;
    /**
     * The path to the "hot" file.
     *
     * @default `${publicDirectory}/hot`
     */
    hotFile?: string;
    /**
     * The path of the SSR entry point.
     */
    ssr?: string | string[];
    /**
     * The directory where the SSR bundle should be written.
     *
     * @default 'bootstrap/ssr'
     */
    ssrOutputDirectory?: string;
    /**
     * Configuration for performing full page refresh on blade (or other) file changes.
     *
     * {@link https://github.com/ElMassimo/vite-plugin-full-reload}
     * @default false
     */
    refresh?: boolean | string | string[] | RefreshConfig | RefreshConfig[];
    /**
     * Utilise the valet TLS certificates.
     *
     * @default false
     */
    valetTls?: string | boolean;
    /**
     * Transform the code while serving.
     */
    transformOnServe?: (code: string, url: DevServerUrl) => string;
}
interface RefreshConfig {
    paths: string[];
    config?: FullReloadConfig;
}
interface LaravelPlugin extends Plugin {
    config: (config: UserConfig, env: ConfigEnv) => UserConfig;
}
type DevServerUrl = `${'http' | 'https'}://${string}:${number}`;
export declare const refreshPaths: string[];
/**
 * Laravel plugin for Vite.
 *
 * @param config - A config object or relative path(s) of the scripts to be compiled.
 */
export default function laravel(config: string | string[] | PluginConfig): [LaravelPlugin, ...Plugin[]];
export {};
                                                                                                                    .skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @param {Function} [options.verifyClient] A hook to reject connections
   * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
   *     class to use. It must be the `WebSocket` class or class that extends it
   * @param {Function} [callback] A listener for the `listening` event
   */
  constructor(options, callback) {
    super();

    options = {
      maxPayload: 100 * 1024 * 1024,
      skipUTF8Validation: false,
      perMessageDeflate: false,
      handleProtocols: null,
      clientTracking: true,
      verifyClient: null,
      noServer: false,
      backlog: null, // use default (511 as implemented in net.js)
      server: null,
      host: null,
      path: null,
      port: null,
      WebSocket,
      ...options
    };

    if (
      (options.port == null && !options.server && !options.noServer) ||
      (options.port != null && (options.server || options.noServer)) ||
      (options.server && options.noServer)
    ) {
      throw new TypeError(
        'One and only one of the "port", "server", or "noServer" options ' +
          'must be specified'
      );
    }

    if (options.port != null) {
      this._server = http$2.createServer((req, res) => {
        const body = http$2.STATUS_CODES[426];

        res.writeHead(426, {
          'Content-Length': body.length,
          'Content-Type': 'text/plain'
        });
        res.end(body);
      });
      this._server.listen(
        options.port,
        options.host,
        options.backlog,
        callback
      );
    } else if (options.server) {
      this._server = options.server;
    }

    if (this._server) {
      const emitConnection = this.emit.bind(this, 'connection');

      this._removeListeners = addListeners(this._server, {
        listening: this.emit.bind(this, 'listening'),
        error: this.emit.bind(this, 'error'),
        upgrade: (req, socket, head) => {
          this.handleUpgrade(re{
  "name": "is-number",
  "description": "Returns true if a number or string value is a finite number. Useful for regex matches, parsing, user input, etc.",
  "version": "7.0.0",
  "homepage": "https://github.com/jonschlinkert/is-number",
  "author": "Jon Schlinkert (https://github.com/jonschlinkert)",
  "contributors": [
    "Jon Schlinkert (http://twitter.com/jonschlinkert)",
    "Olsten Larck (https://i.am.charlike.online)",
    "Rouven Weßling (www.rouvenwessling.de)"
  ],
  "repository": "jonschlinkert/is-number",
  "bugs": {
    "url": "https://github.com/jonschlinkert/is-number/issues"
  },
  "license": "MIT",
  "files": [
    "index.js"
  ],
  "main": "index.js",
  "engines": {
    "node": ">=0.12.0"
  },
  "scripts": {
    "test": "mocha"
  },
  "devDependencies": {
    "ansi": "^0.3.1",
    "benchmark": "^2.1.4",
    "gulp-format-md": "^1.0.0",
    "mocha": "^3.5.3"
  },
  "keywords": [
    "cast",
    "check",
    "coerce",
    "coercion",
    "finite",
    "integer",
    "is",
    "isnan",
    "is-nan",
    "is-num",
    "is-number",
    "isnumber",
    "isfinite",
    "istype",
    "kind",
    "math",
    "nan",
    "num",
    "number",
    "numeric",
    "parseFloat",
    "parseInt",
    "test",
    "type",
    "typeof",
    "value"
  ],
  "verb": {
    "toc": false,
    "layout": "default",
    "tasks": [
      "readme"
    ],
    "related": {
      "list": [
        "is-plain-object",
        "is-primitive",
        "isobject",
        "kind-of"
      ]
    },
    "plugins": [
      "gulp-format-md"
    ],
    "lint": {
      "reflinks": true
    }
  }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                 t = require$$3$2;
const tls = require$$4;
const { randomBytes, createHash: createHash$1 } = require$$5$1;
const { URL: URL$2 } = require$$0$9;

const PerMessageDeflate$1 = permessageDeflate;
const Receiver = receiver;
const Sender = sender;
const {
  BINARY_TYPES,
  EMPTY_BUFFER,
  GUID: GUID$1,
  kForOnEventAttribute,
  kListener,
  kStatusCode,
  kWebSocket: kWebSocket$1,
  NOOP
} = constants;
const {
  EventTarget: { addEventListener, removeEventListener }
} = eventTarget;
const { format, parse: parse$3 } = extension$1;
const { toBuffer } = bufferUtilExports;

const closeTimeout = 30 * 1000;
const kAborted = Symbol('kAborted');
const protocolVersions = [8, 13];
const readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
const subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;

/**
 * Class representing a WebSocket.
 *
 * @extends EventEmitter
 */
let WebSocket$1 = class WebSocket extends EventEmitter$1 {
  /**
   * Create a new `WebSocket`.
   *
   * @param {(String|URL)} address The URL to which to connect
   * @param {(String|String[])} [protocols] The subprotocols
   * @param {Object} [options] Connection options
   */
  constructor(address, protocols, options) {
    super();

    this._binaryType = BINARY_TYPES[0];
    this._closeCode = 1006;
    this._closeFrameReceived = false;
    this._closeFrameSent = false;
    this._closeMessage = EMPTY_BUFFER;
    this._closeTimer = null;
    this._extensions = {};
    this._paused = false;
    this._protocol = '';
    this._readyState = WebSocket.CONNECTING;
    this._receiver = null;
    this._sender = null;
    this._socket = null;

    if (address !== null) {
      this._bufferedAmount = 0;
      this._isServer = false;
      this._redirects = 0;

      if (protocols === undefined) {
        protocols = [];
      } else if (!Array.isArray(protocols)) {
        if (typeof protocols === 'object' && protocols !== null) {
          options = protocols;
          protocols = [];
        } else {
          protocols = [protocols];
        }
      }

      initThe MIT License (MIT)

Copyright (c) 2014-present, Jon Schlinkert.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                              } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else if (paramName === undefined) {
      if (end === -1 && tokenChars$1[code] === 1) {
        if (start === -1) start = i;
      } else if (code === 0x20 || code === 0x09) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        push(params, header.slice(start, end), true);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = Object.create(null);
          extensionName = undefined;
        }

        start = end = -1;
      } else if (code === 0x3d /* '=' */ && start !== -1 && end === -1) {
        paramName = header.slice(start, i);
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else {
      //
      // The value of a quoted-string after unescaping must conform to the
      // token ABNF, so only token characters are valid.
      // Ref: https://tools.ietf.org/html/rfc6455#section-9.1
      //
      if (isEscaping) {
        if (tokenChars$1[code] !== 1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
        if (start === -1) start = i;
        else if (!mustUnescape) mustUnescape = true;
        isEscaping = false;
      } else if (inQuotes) {
        if (tokenChars$1[code] === 1) {
          if (start === -1) start = i;
        } else if (code === 0x22 /* '"' */ && start !== -1) {
          inQuotes = false;
          end = i;
        } else if (code === 0x5c /* '\' */) {
          isEscaping = true;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      } else if (code === 0x22 && header.charCodeAt(i - 1) === 0x3d) {
        inQuotes = true;
      } else if (end === -1 && tokenChars$1[code] === 1) {
        if (start === -1) start = i;
      } else if (start !== -1 && (code === 0x20 || code === 0x09)) {
        if (end === -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        let value = header.slice(start, end);
        if (mustUnescape) {
          value = value.replace(/\\/g, '');
          mustUnescape = false;
        }
        push(params, paramName, value);
  {
  "name": "is-glob",
  "description": "Returns `true` if the given string looks like a glob pattern or an extglob pattern. This makes it easy to create code that only uses external modules like node-glob when necessary, resulting in much faster code execution and initialization time, and a better user experience.",
  "version": "4.0.3",
  "homepage": "https://github.com/micromatch/is-glob",
  "author": "Jon Schlinkert (https://github.com/jonschlinkert)",
  "contributors": [
    "Brian Woodward (https://twitter.com/doowb)",
    "Daniel Perez (https://tuvistavie.com)",
    "Jon Schlinkert (http://twitter.com/jonschlinkert)"
  ],
  "repository": "micromatch/is-glob",
  "bugs": {
    "url": "https://github.com/micromatch/is-glob/issues"
  },
  "license": "MIT",
  "files": [
    "index.js"
  ],
  "main": "index.js",
  "engines": {
    "node": ">=0.10.0"
  },
  "scripts": {
    "test": "mocha && node benchmark.js"
  },
  "dependencies": {
    "is-extglob": "^2.1.1"
  },
  "devDependencies": {
    "gulp-format-md": "^0.1.10",
    "mocha": "^3.0.2"
  },
  "keywords": [
    "bash",
    "braces",
    "check",
    "exec",
    "expression",
    "extglob",
    "glob",
    "globbing",
    "globstar",
    "is",
    "match",
    "matches",
    "pattern",
    "regex",
    "regular",
    "string",
    "test"
  ],
  "verb": {
    "layout": "default",
    "plugins": [
      "gulp-format-md"
    ],
    "related": {
      "list": [
        "assemble",
        "base",
        "update",
        "verb"
      ]
    },
    "reflinks": [
      "assemble",
      "bach",
      "base",
      "composer",
      "gulp",
      "has-glob",
      "is-valid-glob",
      "micromatch",
      "npm",
      "scaffold",
      "verb",
      "vinyl"
    ]
  }
}
                                                                                                                                                                                                                                                                                                            ect} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @param {Function} [cb] Callback
   * @private
   */
  dispatch(data, compress, options, cb) {
    if (!compress) {
      this.sendFrame(Sender.frame(data, options), cb);
      return;
    }

    const perMessageDeflate = this._extensions[PerMessageDeflate$2.extensionName];

    this._bufferedBytes += options[kByteLength];
    this._deflating = true;
    perMessageDeflate.compress(data, options.fin, (_, buf) => {
      if (this._socket.destroyed) {
        const err = new Error(
          'The socket was closed while data was being compressed'
        );

        if (typeof cb === 'function') cb(err);

        for (let i = 0; i < this._queue.length; i++) {
          const params = this._queue[i];
          const callback = params[params.length - 1];

          if (typeof callback === 'function') callback(err);
        }

        return;
      }

      this._bufferedBytes -= options[kByteLength];
      this._deflating = false;
      options.readOnly = false;
      this.sendFrame(Sender.frame(buf, options), cb);
      this.dequeue();
    });
  }

  /**
   * Executes queued send operations.
   *
   * @private
   */
  dequeue() {
    while (!this._deflating && this._queue.length) {
      const params = this._queue.shift();

      this._bufferedBytes -= params[3][kByteLength];
      Reflect.apply(params[0], this, params.slice(1));
    }
  }

  /**
   * Enqueues a send operationThe MIT License (MIT)

Copyright (c) 2014-2017, Jon Schlinkert.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                ions), cb);
    }
  }

  /**
   * Sends a ping message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  ping(data, mask, cb) {
    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else {
      data = toBuffer$1(data);
      byteLength = data.length;
      readOnly = toBuffer$1.readOnly;
    }

    if (byteLength > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    const options = {
      [kByteLength]: byteLength,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x09,
      readOnly,
      rsv1: false
    };

    if (this._deflating) {
      this.enqueue([this.dispatch, data, false, options, cb]);
    } else {
      this.sendFrame(Sender.frame(data, options), cb);
    }
  }

  /**
   * Sends a pong message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  pong(data, mask, cb) {
    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else {
      data = toBuffer$1(data);
      byteLength = data.length;
      readOnly = toBuffer$1.readOnly;
    }

    if (byteLength > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    const options = {
      [kByteLength]: byteLength,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x0a,
      readOnly,
      rsv1: false
    };

    if (this._deflating) {
      this.enqueue([this.dispatch, data, false, options, cb]);
    } else {
      this.sendFrame(Sender.frame(data, options), cb);
    }
  }

  /**
   * Sends a data message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
   *     or text
   * @param {Boolean} [options.compress=false] Specifies whether or not to
   *     compress `data`
   * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask=false] Specifies wh/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var isExtglob = require('is-extglob');
var chars = { '{': '}', '(': ')', '[': ']'};
var strictCheck = function(str) {
  if (str[0] === '!') {
    return true;
  }
  var index = 0;
  var pipeIndex = -2;
  var closeSquareIndex = -2;
  var closeCurlyIndex = -2;
  var closeParenIndex = -2;
  var backSlashIndex = -2;
  while (index < str.length) {
    if (str[index] === '*') {
      return true;
    }

    if (str[index + 1] === '?' && /[\].+)]/.test(str[index])) {
      return true;
    }

    if (closeSquareIndex !== -1 && str[index] === '[' && str[index + 1] !== ']') {
      if (closeSquareIndex < index) {
        closeSquareIndex = str.indexOf(']', index);
      }
      if (closeSquareIndex > index) {
        if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
          return true;
        }
        backSlashIndex = str.indexOf('\\', index);
        if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
          return true;
        }
      }
    }

    if (closeCurlyIndex !== -1 && str[index] === '{' && str[index + 1] !== '}') {
      closeCurlyIndex = str.indexOf('}', index);
      if (closeCurlyIndex > index) {
        backSlashIndex = str.indexOf('\\', index);
        if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) {
          return true;
        }
      }
    }

    if (closeParenIndex !== -1 && str[index] === '(' && str[index + 1] === '?' && /[:!=]/.test(str[index + 2]) && str[index + 3] !== ')') {
      closeParenIndex = str.indexOf(')', index);
      if (closeParenIndex > index) {
        backSlashIndex = str.indexOf('\\', index);
        if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
          return true;
        }
      }
    }

    if (pipeIndex !== -1 && str[index] === '(' && str[index + 1] !== '|') {
      if (pipeIndex < index) {
        pipeIndex = str.indexOf('|', index);
      }
      if (pipeIndex !== -1 && str[pipeIndex + 1] !== ')') {
        closeParenIndex = str.indexOf(')', pipeIndex);
        if (closeParenIndex > pipeIndex) {
          backSlashIndex = str.indexOf('\\', pipeIndex);
          if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
            return true;
          }
        }
      }
    }

    if (str[index] === '\\') {
      var open = str[index + 1];
      index += 2;
      var close = chars[open];

      if (close) {
        var n = str.indexOf(close, index);
        if (n !== -1) {
          index = n + 1;
        }
      }

      if (str[index] === '!') {
        return true;
      }
    } else {
      index++;
    }
  }
  return false;
};

var relaxedCheck = function(str) {
  if (str[0] === '!') {
    return true;
  }
  var index = 0;
  while (index < str.length) {
    if (/[*?{}()[\]]/.test(str[index])) {
      return true;
    }

    if (str[index] === '\\') {
      var open = str[index + 1];
      index += 2;
      var close = chars[open];

      if (close) {
        var n = str.indexOf(close, index);
        if (n !== -1) {
          index = n + 1;
        }
      }

      if (str[index] === '!') {
        return true;
      }
    } else {
      index++;
    }
  }
  return false;
};

module.exports = function isGlob(str, options) {
  if (typeof str !== 'string' || str === '') {
    return false;
  }

  if (isExtglob(str)) {
    return true;
  }

  var check = strictCheck;

  // optionally relax check
  if (options && options.strict === false) {
    check = relaxedCheck;
  }

  return check(str);
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    # is-extglob [![NPM version](https://img.shields.io/npm/v/is-extglob.svg?style=flat)](https://www.npmjs.com/package/is-extglob) [![NPM downloads](https://img.shields.io/npm/dm/is-extglob.svg?style=flat)](https://npmjs.org/package/is-extglob) [![Build Status](https://img.shields.io/travis/jonschlinkert/is-extglob.svg?style=flat)](https://travis-ci.org/jonschlinkert/is-extglob)

> Returns true if a string has an extglob.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save is-extglob
```

## Usage

```js
var isExtglob = require('is-extglob');
```

**True**

```js
isExtglob('?(abc)');
isExtglob('@(abc)');
isExtglob('!(abc)');
isExtglob('*(abc)');
isExtglob('+(abc)');
```

**False**

Escaped extglobs:

```js
isExtglob('\\?(abc)');
isExtglob('\\@(abc)');
isExtglob('\\!(abc)');
isExtglob('\\*(abc)');
isExtglob('\\+(abc)');
```

Everything else...

```js
isExtglob('foo.js');
isExtglob('!foo.js');
isExtglob('*.js');
isExtglob('**/abc.js');
isExtglob('abc/*.js');
isExtglob('abc/(aaa|bbb).js');
isExtglob('abc/[a-z].js');
isExtglob('abc/{a,b}.js');
isExtglob('abc/?.js');
isExtglob('abc.js');
isExtglob('abc/def/ghi.js');
```

## History

**v2.0**

Adds support for escaping. Escaped exglobs no longer return true.

## About

### Related projects

* [has-glob](https://www.npmjs.com/package/has-glob): Returns `true` if an array has a glob pattern. | [homepage](https://github.com/jonschlinkert/has-glob "Returns `true` if an array has a glob pattern.")
* [is-glob](https://www.npmjs.com/package/is-glob): Returns `true` if the given string looks like a glob pattern or an extglob pattern… [more](https://github.com/jonschlinkert/is-glob) | [homepage](https://github.com/jonschlinkert/is-glob "Returns `true` if the given string looks like a glob pattern or an extglob pattern. This makes it easy to create code that only uses external modules like node-glob when necessary, resulting in much faster code execution and initialization time, and a bet")
* [micromatch](https://www.npmjs.com/package/micromatch): Glob matching for javascript/node.js. A drop-in replacement and faster alternative to minimatch and multimatch. | [homepage](https://github.com/jonschlinkert/micromatch "Glob matching for javascript/node.js. A drop-in replacement and faster alternative to minimatch and multimatch.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Building docs

_(This document was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme) (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

To generate the readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-generate-readme && verb
```

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

### License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/is-extglob/blob/master/LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.1.31, on October 12, 2016._                                                                                                                   his.emit('pong', data);
    }

    this._state = GET_INFO;
  }
};

var receiver = Receiver$1;

/**
 * Builds an error object.
 *
 * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
 * @param {String} message The error message
 * @param {Boolean} prefix Specifies whether or not to add a default prefix to
 *     `message`
 * @param {Number} statusCode The status code
 * @param {String} errorCode The exposed error code
 * @return {(Error|RangeError)} The error
 * @private
 */
function er{
  "name": "is-extglob",
  "description": "Returns true if a string has an extglob.",
  "version": "2.1.1",
  "homepage": "https://github.com/jonschlinkert/is-extglob",
  "author": "Jon Schlinkert (https://github.com/jonschlinkert)",
  "repository": "jonschlinkert/is-extglob",
  "bugs": {
    "url": "https://github.com/jonschlinkert/is-extglob/issues"
  },
  "license": "MIT",
  "files": [
    "index.js"
  ],
  "main": "index.js",
  "engines": {
    "node": ">=0.10.0"
  },
  "scripts": {
    "test": "mocha"
  },
  "devDependencies": {
    "gulp-format-md": "^0.1.10",
    "mocha": "^3.0.2"
  },
  "keywords": [
    "bash",
    "braces",
    "check",
    "exec",
    "expression",
    "extglob",
    "glob",
    "globbing",
    "globstar",
    "is",
    "match",
    "matches",
    "pattern",
    "regex",
    "regular",
    "string",
    "test"
  ],
  "verb": {
    "toc": false,
    "layout": "default",
    "tasks": [
      "readme"
    ],
    "plugins": [
      "gulp-format-md"
    ],
    "related": {
      "list": [
        "has-glob",
        "is-glob",
        "micromatch"
      ]
    },
    "reflinks": [
      "verb",
      "verb-generate-readme"
    ],
    "lint": {
      "reflinks": true
    }
  }
}
                                                                                                                                                                                                                                                                                                                            ed)} A possible error
   * @private
   */
  getPayloadLength16() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    this._payloadLength = this.consume(2).readUInt16BE(0);
    return this.haveLength();
  }

  /**
   * Gets extended payload length (7+64).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getPayloadLength64() {
    if (this._bufferedBytes < 8) {
      this._loop = false;
      return;
    }

    const buf = this.consume(8);
    const num = buf.readUInt32BE(0);

    //
    // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
    // if payload length is greater than this number.
    //
    if (num > Math.pow(2, 53 - 32) - 1) {
      this._loop = false;
      return error(
        RangeError,
        'Unsupported WebSocket frame: payload length > 2^53 - 1',
        false,
        1009,
        'WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH'
      );
    }

    this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
    return this.haveLength();
  }

  /**
   * Payload length has been read.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  haveLength() {
    if (this._payloadLength && this._opcode < 0x08) {
      this._totalPayloadLength += this._payloadLength;
      if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
        this._loop = false;
        return error(
          RangeError,
          'Max payload size exceeded',
          false,
          1009,
          'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
        );
      }
    }

    if (this._masked) this._state = GET_MASK;
    else this._state = GET_DATA;
  }

  /**
   * Reads mask bytes.
   *
   * @private
   */
  getMask() {
    if (this._bufferedBytes < 4) {
      this._loop = false;
      return;
    }

    this._mask = this.consume(4);
    this._state = GET_DATA;
  }

  /**
   * Reads data bytes.
   *
   * @param {Function} cb Callback
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  getData(cb) {
    let data = EMPTY_BUFFER$2;

    if (this._payloadLength) {
      if (this._bufferedBytes < this._payloadLength) {
        this._loop = false;
        return;
      }

      data = this.consume(this._payloadLength);

      if (
        this._masked &&
        (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0
      ) {
        unmask(data, this._mask);
      }
    }

    if (this._opcode > 0x07) return this.controlMessage(data);

    if (this._compressThe MIT License (MIT)

Copyright (c) 2014-2016, Jon Schlinkert

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                 k;
        case GET_PAYLOAD_LENGTH_16:
          err = this.getPayloadLength16();
          break;
        case GET_PAYLOAD_LENGTH_64:
          err = this.getPayloadLength64();
          break;
        case GET_MASK:
          this.getMask();
          break;
        case GET_DATA:
          err = this.getData(cb);
          break;
        default:
          // `INFLATING`
          this._loop = false;
          return;
      }
    } while (this._loop);

    cb(err);
  }

  /**
   * Reads the first two bytes of a frame.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getInfo() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    const buf = this.consume(2);

    if ((buf[0] & 0x30) !== 0x00) {
      this._loop = false;
      return error(
        RangeError,
        'RSV2 and RSV3 must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_RSV_2_3'
      );
    }

    const compressed = (buf[0] & 0x40) === 0x40;

    if (compressed && !this._extensions[PerMessageDeflate$3.extensionName]) {
      this._loop = false;
      return error(
        RangeError,
        'RSV1 must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_RSV_1'
      );
    }

    this._fin = (buf[0] & 0x80) === 0x80;
    this._opcode = buf[0] & 0x0f;
    this._payloadLength = buf[1] & 0x7f;

    if (this._opcode === 0x00) {
      if (compressed) {
        this._loop = false;
        return error(
          RangeError,
          'RSV1 must be clear',
          true,
          1002,
          'WS_ERR_UNEXPECTED_RSV_1'
        );
      }

      if (!this._fragmented) {
        this._loop = false;
        return error(
          RangeError,
          'invalid opcode 0',
          true,
          1002,
          'WS_ERR_INVALID_OPCODE'
        );
      }

      this._opcode = this._fragmented;
    } else if (this._opcode === 0x01 || this._opcode === 0x02) {
      if (this._fragmented) {
        this._loop = false;
        return error(
          RangeError,
          `invalid opcode ${this._opcode}`,
          true,
          1002,
          'WS_ERR_INVALID_OPCODE'
        );
      }

      this._compressed = compressed;
    } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
      if (!this._fin) {
        this._loop = false;
        return error(
          RangeError,
          'FIN must be set',
          true,
          1002,
          'WS_ERR_EXPECTED_FIN'
        );
      }

      if (compressed) {
        this._loop = false;
        return erromodule.exports={A:{A:{"2":"J D E F A B EC"},B:{"1":"P Q R S T U V W X Y Z a b c d e i j k l m n o p q r s t u v f H","2":"C K","132":"L G M N O"},C:{"1":"PB QB RB SB TB UB VB WB XB YB ZB vB aB wB bB cB dB eB fB gB hB iB jB kB lB h mB nB oB pB qB P Q R xB S T U V W X Y Z a b c d e i j k l m n o p q r s t u v f H yB zB","2":"0 1 2 3 4 5 6 7 FC uB I w J D E F A B C K L G M N O x g y z GC HC","132":"8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB"},D:{"1":"hB iB jB kB lB h mB nB oB pB qB P Q R S T U V W X Y Z a b c d e i j k l m n o p q r s t u v f H yB zB IC JC","2":"0 1 2 3 4 5 6 7 8 9 I w J D E F A B C K L G M N O x g y z AB BB CB","132":"DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB VB WB XB YB ZB vB aB wB bB cB dB eB fB gB"},E:{"1":"A B C K L G OC 1B rB sB 2B PC QC 3B 4B 5B 6B tB 7B 8B 9B AC BC RC","2":"I w J D KC 0B LC MC","132":"E F NC"},F:{"1":"WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB h mB nB oB pB qB P Q R xB S T U V W X Y Z a b c d e","2":"F B C G M N O x g y z SC TC UC VC rB CC WC sB","132":"0 1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB VB"},G:{"1":"cC dC eC fC gC hC iC jC kC lC mC nC oC pC qC 3B 4B 5B 6B tB 7B 8B 9B AC BC","2":"0B XC DC YC ZC aC","16":"E","132":"bC"},H:{"2":"rC"},I:{"1":"H","2":"uB I sC tC uC vC DC wC xC"},J:{"1":"A","2":"D"},K:{"1":"h","2":"A B C rB CC sB"},L:{"1":"H"},M:{"1":"f"},N:{"2":"A B"},O:{"1":"yC"},P:{"1":"g 1B 4C 5C 6C 7C 8C tB 9C AD BD","132":"I zC 0C 1C 2C 3C"},Q:{"1":"2B"},R:{"1":"CD"},S:{"1":"DD ED"}},B:1,C:"Path2D"};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 module.exports={A:{A:{"2":"J D E F A B EC"},B:{"2":"C K L G M N O","16":"P Q R S T U V W X Y Z a b c d e i j k l m n o p q r s t u v f H"},C:{"2":"0 1 2 3 4 5 6 7 8 9 FC uB I w J D E F A B C K L G M N O x g y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB VB WB XB YB ZB vB aB wB bB cB dB eB fB gB hB iB jB kB lB h mB nB oB pB qB P Q R xB S T U V W X Y Z a b c d e i j k l m n o p q r s t u v f H GC HC","16":"yB zB"},D:{"2":"0 1 2 3 4 5 6 7 8 9 I w J D E F A B C K L G M N O x g y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB VB WB XB YB ZB vB aB wB bB cB dB eB fB gB hB iB jB kB lB h mB nB oB pB qB P Q R S T U V W X Y Z a b c d e i j k l m n o p q r s t u v f H yB","16":"zB IC JC"},E:{"1":"C K sB","2":"I w J D E F A B KC 0B LC MC NC OC 1B rB","16":"L G 2B PC QC 3B 4B 5B 6B tB 7B 8B 9B AC BC RC"},F:{"2":"0 1 2 3 4 5 6 7 8 9 F B C G M N O x g y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB SC TC UC VC rB CC WC sB","16":"UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB h mB nB oB pB qB P Q R xB S T U V W X Y Z a b c d e"},G:{"2":"E 0B XC DC YC ZC aC bC cC dC eC fC gC hC iC jC kC lC mC nC oC pC qC 3B 4B 5B 6B tB 7B 8B 9B AC BC"},H:{"16":"rC"},I:{"2":"uB I sC tC uC vC DC wC xC","16":"H"},J:{"2":"D","16":"A"},K:{"2":"A B C rB CC sB","16":"h"},L:{"16":"H"},M:{"16":"f"},N:{"2":"A","16":"B"},O:{"16":"yC"},P:{"2":"I zC 0C","16":"g 1C 2C 3C 1B 4C 5C 6C 7C 8C tB 9C AD BD"},Q:{"16":"2B"},R:{"16":"CD"},S:{"2":"DD ED"}},B:1,C:"Password Rules"};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    