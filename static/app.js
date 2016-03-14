webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _vue = __webpack_require__(2);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vueRouter = __webpack_require__(4);
	
	var _vueRouter2 = _interopRequireDefault(_vueRouter);
	
	var _vueResource = __webpack_require__(5);
	
	var _vueResource2 = _interopRequireDefault(_vueResource);
	
	var _app = __webpack_require__(29);
	
	var _app2 = _interopRequireDefault(_app);
	
	var _routers = __webpack_require__(41);
	
	var _routers2 = _interopRequireDefault(_routers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.filter('getImagePoster', function (string) {
	  return string ? 'http://123.56.235.156/' + string.split('|')[1] : '';
	});
	
	_vue2.default.config.debug = true;
	_vue2.default.use(_vueRouter2.default);
	_vue2.default.use(_vueResource2.default);
	
	var router = new _vueRouter2.default({
	  // hashbang: true,
	  // history: true,
	  // saveScorllPostion: true,
	});
	
	(0, _routers2.default)(router);
	router.start(_app2.default, '#app');

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Install plugin.
	 */
	
	function install(Vue) {
	
	    var _ = __webpack_require__(6);
	
	    _.config = Vue.config;
	    _.warning = Vue.util.warn;
	    _.nextTick = Vue.util.nextTick;
	
	    Vue.url = __webpack_require__(7);
	    Vue.http = __webpack_require__(13);
	    Vue.resource = __webpack_require__(28);
	    Vue.Promise = __webpack_require__(15);
	
	    Object.defineProperties(Vue.prototype, {
	
	        $url: {
	            get: function () {
	                return _.options(Vue.url, this, this.$options.url);
	            }
	        },
	
	        $http: {
	            get: function () {
	                return _.options(Vue.http, this, this.$options.http);
	            }
	        },
	
	        $resource: {
	            get: function () {
	                return Vue.resource.bind(this);
	            }
	        },
	
	        $promise: {
	            get: function () {
	                return function (executor) {
	                    return new Vue.Promise(executor, this);
	                }.bind(this);
	            }
	        }
	
	    });
	}
	
	if (window.Vue) {
	    Vue.use(install);
	}
	
	module.exports = install;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Utility functions.
	 */
	
	var _ = exports, array = [], console = window.console;
	
	_.warn = function (msg) {
	    if (console && _.warning && (!_.config.silent || _.config.debug)) {
	        console.warn('[VueResource warn]: ' + msg);
	    }
	};
	
	_.error = function (msg) {
	    if (console) {
	        console.error(msg);
	    }
	};
	
	_.trim = function (str) {
	    return str.replace(/^\s*|\s*$/g, '');
	};
	
	_.toLower = function (str) {
	    return str ? str.toLowerCase() : '';
	};
	
	_.isArray = Array.isArray;
	
	_.isString = function (val) {
	    return typeof val === 'string';
	};
	
	_.isFunction = function (val) {
	    return typeof val === 'function';
	};
	
	_.isObject = function (obj) {
	    return obj !== null && typeof obj === 'object';
	};
	
	_.isPlainObject = function (obj) {
	    return _.isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
	};
	
	_.options = function (fn, obj, options) {
	
	    options = options || {};
	
	    if (_.isFunction(options)) {
	        options = options.call(obj);
	    }
	
	    return _.merge(fn.bind({$vm: obj, $options: options}), fn, {$options: options});
	};
	
	_.each = function (obj, iterator) {
	
	    var i, key;
	
	    if (typeof obj.length == 'number') {
	        for (i = 0; i < obj.length; i++) {
	            iterator.call(obj[i], obj[i], i);
	        }
	    } else if (_.isObject(obj)) {
	        for (key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                iterator.call(obj[key], obj[key], key);
	            }
	        }
	    }
	
	    return obj;
	};
	
	_.defaults = function (target, source) {
	
	    for (var key in source) {
	        if (target[key] === undefined) {
	            target[key] = source[key];
	        }
	    }
	
	    return target;
	};
	
	_.extend = function (target) {
	
	    var args = array.slice.call(arguments, 1);
	
	    args.forEach(function (arg) {
	        merge(target, arg);
	    });
	
	    return target;
	};
	
	_.merge = function (target) {
	
	    var args = array.slice.call(arguments, 1);
	
	    args.forEach(function (arg) {
	        merge(target, arg, true);
	    });
	
	    return target;
	};
	
	function merge(target, source, deep) {
	    for (var key in source) {
	        if (deep && (_.isPlainObject(source[key]) || _.isArray(source[key]))) {
	            if (_.isPlainObject(source[key]) && !_.isPlainObject(target[key])) {
	                target[key] = {};
	            }
	            if (_.isArray(source[key]) && !_.isArray(target[key])) {
	                target[key] = [];
	            }
	            merge(target[key], source[key], deep);
	        } else if (source[key] !== undefined) {
	            target[key] = source[key];
	        }
	    }
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Service for URL templating.
	 */
	
	var _ = __webpack_require__(6);
	var ie = document.documentMode;
	var el = document.createElement('a');
	
	function Url(url, params) {
	
	    var options = url, transform;
	
	    if (_.isString(url)) {
	        options = {url: url, params: params};
	    }
	
	    options = _.merge({}, Url.options, this.$options, options);
	
	    Url.transforms.forEach(function (handler) {
	        transform = factory(handler, transform, this.$vm);
	    }, this);
	
	    return transform(options);
	};
	
	/**
	 * Url options.
	 */
	
	Url.options = {
	    url: '',
	    root: null,
	    params: {}
	};
	
	/**
	 * Url transforms.
	 */
	
	Url.transforms = [
	    __webpack_require__(8),
	    __webpack_require__(10),
	    __webpack_require__(11),
	    __webpack_require__(12)
	];
	
	/**
	 * Encodes a Url parameter string.
	 *
	 * @param {Object} obj
	 */
	
	Url.params = function (obj) {
	
	    var params = [], escape = encodeURIComponent;
	
	    params.add = function (key, value) {
	
	        if (_.isFunction(value)) {
	            value = value();
	        }
	
	        if (value === null) {
	            value = '';
	        }
	
	        this.push(escape(key) + '=' + escape(value));
	    };
	
	    serialize(params, obj);
	
	    return params.join('&').replace(/%20/g, '+');
	};
	
	/**
	 * Parse a URL and return its components.
	 *
	 * @param {String} url
	 */
	
	Url.parse = function (url) {
	
	    if (ie) {
	        el.href = url;
	        url = el.href;
	    }
	
	    el.href = url;
	
	    return {
	        href: el.href,
	        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
	        port: el.port,
	        host: el.host,
	        hostname: el.hostname,
	        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
	        search: el.search ? el.search.replace(/^\?/, '') : '',
	        hash: el.hash ? el.hash.replace(/^#/, '') : ''
	    };
	};
	
	function factory(handler, next, vm) {
	    return function (options) {
	        return handler.call(vm, options, next);
	    };
	}
	
	function serialize(params, obj, scope) {
	
	    var array = _.isArray(obj), plain = _.isPlainObject(obj), hash;
	
	    _.each(obj, function (value, key) {
	
	        hash = _.isObject(value) || _.isArray(value);
	
	        if (scope) {
	            key = scope + '[' + (plain || hash ? key : '') + ']';
	        }
	
	        if (!scope && array) {
	            params.add(value.name, value.value);
	        } else if (hash) {
	            serialize(params, value, key);
	        } else {
	            params.add(key, value);
	        }
	    });
	}
	
	module.exports = _.url = Url;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * URL Template (RFC 6570) Transform.
	 */
	
	var UrlTemplate = __webpack_require__(9);
	
	module.exports = function (options) {
	
	    var variables = [], url = UrlTemplate.expand(options.url, options.params, variables);
	
	    variables.forEach(function (key) {
	        delete options.params[key];
	    });
	
	    return url;
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
	 */
	
	exports.expand = function (url, params, variables) {
	
	    var tmpl = this.parse(url), expanded = tmpl.expand(params);
	
	    if (variables) {
	        variables.push.apply(variables, tmpl.vars);
	    }
	
	    return expanded;
	};
	
	exports.parse = function (template) {
	
	    var operators = ['+', '#', '.', '/', ';', '?', '&'], variables = [];
	
	    return {
	        vars: variables,
	        expand: function (context) {
	            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
	                if (expression) {
	
	                    var operator = null, values = [];
	
	                    if (operators.indexOf(expression.charAt(0)) !== -1) {
	                        operator = expression.charAt(0);
	                        expression = expression.substr(1);
	                    }
	
	                    expression.split(/,/g).forEach(function (variable) {
	                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
	                        values.push.apply(values, exports.getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
	                        variables.push(tmp[1]);
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
	                    return exports.encodeReserved(literal);
	                }
	            });
	        }
	    };
	};
	
	exports.getValues = function (context, operator, key, modifier) {
	
	    var value = context[key], result = [];
	
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
	                            tmp.push(encodeURIComponent(k));
	                            tmp.push(this.encodeValue(operator, value[k].toString()));
	                        }
	                    }, this);
	                }
	
	                if (this.isKeyOperator(operator)) {
	                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
	                } else if (tmp.length !== 0) {
	                    result.push(tmp.join(','));
	                }
	            }
	        }
	    } else {
	        if (operator === ';') {
	            result.push(encodeURIComponent(key));
	        } else if (value === '' && (operator === '&' || operator === '?')) {
	            result.push(encodeURIComponent(key) + '=');
	        } else if (value === '') {
	            result.push('');
	        }
	    }
	
	    return result;
	};
	
	exports.isDefined = function (value) {
	    return value !== undefined && value !== null;
	};
	
	exports.isKeyOperator = function (operator) {
	    return operator === ';' || operator === '&' || operator === '?';
	};
	
	exports.encodeValue = function (operator, value, key) {
	
	    value = (operator === '+' || operator === '#') ? this.encodeReserved(value) : encodeURIComponent(value);
	
	    if (key) {
	        return encodeURIComponent(key) + '=' + value;
	    } else {
	        return value;
	    }
	};
	
	exports.encodeReserved = function (str) {
	    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
	        if (!/%[0-9A-Fa-f]/.test(part)) {
	            part = encodeURI(part);
	        }
	        return part;
	    }).join('');
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Legacy Transform.
	 */
	
	var _ = __webpack_require__(6);
	
	module.exports = function (options, next) {
	
	    var variables = [], url = next(options);
	
	    url = url.replace(/(\/?):([a-z]\w*)/gi, function (match, slash, name) {
	
	        _.warn('The `:' + name + '` parameter syntax has been deprecated. Use the `{' + name + '}` syntax instead.');
	
	        if (options.params[name]) {
	            variables.push(name);
	            return slash + encodeUriSegment(options.params[name]);
	        }
	
	        return '';
	    });
	
	    variables.forEach(function (key) {
	        delete options.params[key];
	    });
	
	    return url;
	};
	
	function encodeUriSegment(value) {
	
	    return encodeUriQuery(value, true).
	        replace(/%26/gi, '&').
	        replace(/%3D/gi, '=').
	        replace(/%2B/gi, '+');
	}
	
	function encodeUriQuery(value, spaces) {
	
	    return encodeURIComponent(value).
	        replace(/%40/gi, '@').
	        replace(/%3A/gi, ':').
	        replace(/%24/g, '$').
	        replace(/%2C/gi, ',').
	        replace(/%20/g, (spaces ? '%20' : '+'));
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Query Parameter Transform.
	 */
	
	var _ = __webpack_require__(6);
	
	module.exports = function (options, next) {
	
	    var urlParams = Object.keys(_.url.options.params), query = {}, url = next(options);
	
	   _.each(options.params, function (value, key) {
	        if (urlParams.indexOf(key) === -1) {
	            query[key] = value;
	        }
	    });
	
	    query = _.url.params(query);
	
	    if (query) {
	        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
	    }
	
	    return url;
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Root Prefix Transform.
	 */
	
	var _ = __webpack_require__(6);
	
	module.exports = function (options, next) {
	
	    var url = next(options);
	
	    if (_.isString(options.root) && !url.match(/^(https?:)?\//)) {
	        url = options.root + '/' + url;
	    }
	
	    return url;
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Service for sending network requests.
	 */
	
	var _ = __webpack_require__(6);
	var Client = __webpack_require__(14);
	var Promise = __webpack_require__(15);
	var interceptor = __webpack_require__(18);
	var jsonType = {'Content-Type': 'application/json'};
	
	function Http(url, options) {
	
	    var client = Client, request, promise;
	
	    Http.interceptors.forEach(function (handler) {
	        client = interceptor(handler, this.$vm)(client);
	    }, this);
	
	    options = _.isObject(url) ? url : _.extend({url: url}, options);
	    request = _.merge({}, Http.options, this.$options, options);
	    promise = client(request).bind(this.$vm).then(function (response) {
	
	        return response.ok ? response : Promise.reject(response);
	
	    }, function (response) {
	
	        if (response instanceof Error) {
	            _.error(response);
	        }
	
	        return Promise.reject(response);
	    });
	
	    if (request.success) {
	        promise.success(request.success);
	    }
	
	    if (request.error) {
	        promise.error(request.error);
	    }
	
	    return promise;
	}
	
	Http.options = {
	    method: 'get',
	    data: '',
	    params: {},
	    headers: {},
	    xhr: null,
	    upload: null,
	    jsonp: 'callback',
	    beforeSend: null,
	    crossOrigin: null,
	    emulateHTTP: false,
	    emulateJSON: false,
	    timeout: 0
	};
	
	Http.interceptors = [
	    __webpack_require__(19),
	    __webpack_require__(20),
	    __webpack_require__(21),
	    __webpack_require__(23),
	    __webpack_require__(24),
	    __webpack_require__(25),
	    __webpack_require__(26)
	];
	
	Http.headers = {
	    put: jsonType,
	    post: jsonType,
	    patch: jsonType,
	    delete: jsonType,
	    common: {'Accept': 'application/json, text/plain, */*'},
	    custom: {'X-Requested-With': 'XMLHttpRequest'}
	};
	
	['get', 'put', 'post', 'patch', 'delete', 'jsonp'].forEach(function (method) {
	
	    Http[method] = function (url, data, success, options) {
	
	        if (_.isFunction(data)) {
	            options = success;
	            success = data;
	            data = undefined;
	        }
	
	        if (_.isObject(success)) {
	            options = success;
	            success = undefined;
	        }
	
	        return this(url, _.extend({method: method, data: data, success: success}, options));
	    };
	});
	
	module.exports = _.http = Http;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Base client.
	 */
	
	var _ = __webpack_require__(6);
	var Promise = __webpack_require__(15);
	var xhrClient = __webpack_require__(17);
	
	module.exports = function (request) {
	
	    var response = (request.client || xhrClient)(request);
	
	    return Promise.resolve(response).then(function (response) {
	
	        if (response.headers) {
	
	            var headers = parseHeaders(response.headers);
	
	            response.headers = function (name) {
	
	                if (name) {
	                    return headers[_.toLower(name)];
	                }
	
	                return headers;
	            };
	
	        }
	
	        response.ok = response.status >= 200 && response.status < 300;
	
	        return response;
	    });
	
	};
	
	function parseHeaders(str) {
	
	    var headers = {}, value, name, i;
	
	    if (_.isString(str)) {
	        _.each(str.split('\n'), function (row) {
	
	            i = row.indexOf(':');
	            name = _.trim(_.toLower(row.slice(0, i)));
	            value = _.trim(row.slice(i + 1));
	
	            if (headers[name]) {
	
	                if (_.isArray(headers[name])) {
	                    headers[name].push(value);
	                } else {
	                    headers[name] = [headers[name], value];
	                }
	
	            } else {
	
	                headers[name] = value;
	            }
	
	        });
	    }
	
	    return headers;
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Promise adapter.
	 */
	
	var _ = __webpack_require__(6);
	var PromiseObj = window.Promise || __webpack_require__(16);
	
	function Promise(executor, context) {
	
	    if (executor instanceof PromiseObj) {
	        this.promise = executor;
	    } else {
	        this.promise = new PromiseObj(executor.bind(context));
	    }
	
	    this.context = context;
	}
	
	Promise.all = function (iterable, context) {
	    return new Promise(PromiseObj.all(iterable), context);
	};
	
	Promise.resolve = function (value, context) {
	    return new Promise(PromiseObj.resolve(value), context);
	};
	
	Promise.reject = function (reason, context) {
	    return new Promise(PromiseObj.reject(reason), context);
	};
	
	Promise.race = function (iterable, context) {
	    return new Promise(PromiseObj.race(iterable), context);
	};
	
	var p = Promise.prototype;
	
	p.bind = function (context) {
	    this.context = context;
	    return this;
	};
	
	p.then = function (fulfilled, rejected) {
	
	    if (fulfilled && fulfilled.bind && this.context) {
	        fulfilled = fulfilled.bind(this.context);
	    }
	
	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }
	
	    this.promise = this.promise.then(fulfilled, rejected);
	
	    return this;
	};
	
	p.catch = function (rejected) {
	
	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }
	
	    this.promise = this.promise.catch(rejected);
	
	    return this;
	};
	
	p.finally = function (callback) {
	
	    return this.then(function (value) {
	            callback.call(this);
	            return value;
	        }, function (reason) {
	            callback.call(this);
	            return PromiseObj.reject(reason);
	        }
	    );
	};
	
	p.success = function (callback) {
	
	    _.warn('The `success` method has been deprecated. Use the `then` method instead.');
	
	    return this.then(function (response) {
	        return callback.call(this, response.data, response.status, response) || response;
	    });
	};
	
	p.error = function (callback) {
	
	    _.warn('The `error` method has been deprecated. Use the `catch` method instead.');
	
	    return this.catch(function (response) {
	        return callback.call(this, response.data, response.status, response) || response;
	    });
	};
	
	p.always = function (callback) {
	
	    _.warn('The `always` method has been deprecated. Use the `finally` method instead.');
	
	    var cb = function (response) {
	        return callback.call(this, response.data, response.status, response) || response;
	    };
	
	    return this.then(cb, cb);
	};
	
	module.exports = Promise;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
	 */
	
	var _ = __webpack_require__(6);
	
	var RESOLVED = 0;
	var REJECTED = 1;
	var PENDING  = 2;
	
	function Promise(executor) {
	
	    this.state = PENDING;
	    this.value = undefined;
	    this.deferred = [];
	
	    var promise = this;
	
	    try {
	        executor(function (x) {
	            promise.resolve(x);
	        }, function (r) {
	            promise.reject(r);
	        });
	    } catch (e) {
	        promise.reject(e);
	    }
	}
	
	Promise.reject = function (r) {
	    return new Promise(function (resolve, reject) {
	        reject(r);
	    });
	};
	
	Promise.resolve = function (x) {
	    return new Promise(function (resolve, reject) {
	        resolve(x);
	    });
	};
	
	Promise.all = function all(iterable) {
	    return new Promise(function (resolve, reject) {
	        var count = 0, result = [];
	
	        if (iterable.length === 0) {
	            resolve(result);
	        }
	
	        function resolver(i) {
	            return function (x) {
	                result[i] = x;
	                count += 1;
	
	                if (count === iterable.length) {
	                    resolve(result);
	                }
	            };
	        }
	
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise.resolve(iterable[i]).then(resolver(i), reject);
	        }
	    });
	};
	
	Promise.race = function race(iterable) {
	    return new Promise(function (resolve, reject) {
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise.resolve(iterable[i]).then(resolve, reject);
	        }
	    });
	};
	
	var p = Promise.prototype;
	
	p.resolve = function resolve(x) {
	    var promise = this;
	
	    if (promise.state === PENDING) {
	        if (x === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }
	
	        var called = false;
	
	        try {
	            var then = x && x['then'];
	
	            if (x !== null && typeof x === 'object' && typeof then === 'function') {
	                then.call(x, function (x) {
	                    if (!called) {
	                        promise.resolve(x);
	                    }
	                    called = true;
	
	                }, function (r) {
	                    if (!called) {
	                        promise.reject(r);
	                    }
	                    called = true;
	                });
	                return;
	            }
	        } catch (e) {
	            if (!called) {
	                promise.reject(e);
	            }
	            return;
	        }
	
	        promise.state = RESOLVED;
	        promise.value = x;
	        promise.notify();
	    }
	};
	
	p.reject = function reject(reason) {
	    var promise = this;
	
	    if (promise.state === PENDING) {
	        if (reason === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }
	
	        promise.state = REJECTED;
	        promise.value = reason;
	        promise.notify();
	    }
	};
	
	p.notify = function notify() {
	    var promise = this;
	
	    _.nextTick(function () {
	        if (promise.state !== PENDING) {
	            while (promise.deferred.length) {
	                var deferred = promise.deferred.shift(),
	                    onResolved = deferred[0],
	                    onRejected = deferred[1],
	                    resolve = deferred[2],
	                    reject = deferred[3];
	
	                try {
	                    if (promise.state === RESOLVED) {
	                        if (typeof onResolved === 'function') {
	                            resolve(onResolved.call(undefined, promise.value));
	                        } else {
	                            resolve(promise.value);
	                        }
	                    } else if (promise.state === REJECTED) {
	                        if (typeof onRejected === 'function') {
	                            resolve(onRejected.call(undefined, promise.value));
	                        } else {
	                            reject(promise.value);
	                        }
	                    }
	                } catch (e) {
	                    reject(e);
	                }
	            }
	        }
	    });
	};
	
	p.then = function then(onResolved, onRejected) {
	    var promise = this;
	
	    return new Promise(function (resolve, reject) {
	        promise.deferred.push([onResolved, onRejected, resolve, reject]);
	        promise.notify();
	    });
	};
	
	p.catch = function (onRejected) {
	    return this.then(undefined, onRejected);
	};
	
	module.exports = Promise;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * XMLHttp client.
	 */
	
	var _ = __webpack_require__(6);
	var Promise = __webpack_require__(15);
	
	module.exports = function (request) {
	    return new Promise(function (resolve) {
	
	        var xhr = new XMLHttpRequest(), response = {request: request}, handler;
	
	        request.cancel = function () {
	            xhr.abort();
	        };
	
	        xhr.open(request.method, _.url(request), true);
	
	        handler = function (event) {
	
	            response.data = xhr.responseText;
	            response.status = xhr.status;
	            response.statusText = xhr.statusText;
	            response.headers = xhr.getAllResponseHeaders();
	
	            resolve(response);
	        };
	
	        xhr.timeout = 0;
	        xhr.onload = handler;
	        xhr.onabort = handler;
	        xhr.onerror = handler;
	        xhr.ontimeout = function () {};
	        xhr.onprogress = function () {};
	
	        if (_.isPlainObject(request.xhr)) {
	            _.extend(xhr, request.xhr);
	        }
	
	        if (_.isPlainObject(request.upload)) {
	            _.extend(xhr.upload, request.upload);
	        }
	
	        _.each(request.headers || {}, function (value, header) {
	            xhr.setRequestHeader(header, value);
	        });
	
	        xhr.send(request.data);
	    });
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Interceptor factory.
	 */
	
	var _ = __webpack_require__(6);
	var Promise = __webpack_require__(15);
	
	module.exports = function (handler, vm) {
	
	    return function (client) {
	
	        if (_.isFunction(handler)) {
	            handler = handler.call(vm, Promise);
	        }
	
	        return function (request) {
	
	            if (_.isFunction(handler.request)) {
	                request = handler.request.call(vm, request);
	            }
	
	            return when(request, function (request) {
	                return when(client(request), function (response) {
	
	                    if (_.isFunction(handler.response)) {
	                        response = handler.response.call(vm, response);
	                    }
	
	                    return response;
	                });
	            });
	        };
	    };
	};
	
	function when(value, fulfilled, rejected) {
	
	    var promise = Promise.resolve(value);
	
	    if (arguments.length < 2) {
	        return promise;
	    }
	
	    return promise.then(fulfilled, rejected);
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Before Interceptor.
	 */
	
	var _ = __webpack_require__(6);
	
	module.exports = {
	
	    request: function (request) {
	
	        if (_.isFunction(request.beforeSend)) {
	            request.beforeSend.call(this, request);
	        }
	
	        return request;
	    }
	
	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Timeout Interceptor.
	 */
	
	module.exports = function () {
	
	    var timeout;
	
	    return {
	
	        request: function (request) {
	
	            if (request.timeout) {
	                timeout = setTimeout(function () {
	                    request.cancel();
	                }, request.timeout);
	            }
	
	            return request;
	        },
	
	        response: function (response) {
	
	            clearTimeout(timeout);
	
	            return response;
	        }
	
	    };
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * JSONP Interceptor.
	 */
	
	var jsonpClient = __webpack_require__(22);
	
	module.exports = {
	
	    request: function (request) {
	
	        if (request.method == 'JSONP') {
	            request.client = jsonpClient;
	        }
	
	        return request;
	    }
	
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * JSONP client.
	 */
	
	var _ = __webpack_require__(6);
	var Promise = __webpack_require__(15);
	
	module.exports = function (request) {
	    return new Promise(function (resolve) {
	
	        var callback = '_jsonp' + Math.random().toString(36).substr(2), response = {request: request, data: null}, handler, script;
	
	        request.params[request.jsonp] = callback;
	        request.cancel = function () {
	            handler({type: 'cancel'});
	        };
	
	        script = document.createElement('script');
	        script.src = _.url(request);
	        script.type = 'text/javascript';
	        script.async = true;
	
	        window[callback] = function (data) {
	            response.data = data;
	        };
	
	        handler = function (event) {
	
	            if (event.type === 'load' && response.data !== null) {
	                response.status = 200;
	            } else if (event.type === 'error') {
	                response.status = 404;
	            } else {
	                response.status = 0;
	            }
	
	            resolve(response);
	
	            delete window[callback];
	            document.body.removeChild(script);
	        };
	
	        script.onload = handler;
	        script.onerror = handler;
	
	        document.body.appendChild(script);
	    });
	};


/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * HTTP method override Interceptor.
	 */
	
	module.exports = {
	
	    request: function (request) {
	
	        if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
	            request.headers['X-HTTP-Method-Override'] = request.method;
	            request.method = 'POST';
	        }
	
	        return request;
	    }
	
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Mime Interceptor.
	 */
	
	var _ = __webpack_require__(6);
	
	module.exports = {
	
	    request: function (request) {
	
	        if (request.emulateJSON && _.isPlainObject(request.data)) {
	            request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	            request.data = _.url.params(request.data);
	        }
	
	        if (_.isObject(request.data) && /FormData/i.test(request.data.toString())) {
	            delete request.headers['Content-Type'];
	        }
	
	        if (_.isPlainObject(request.data)) {
	            request.data = JSON.stringify(request.data);
	        }
	
	        return request;
	    },
	
	    response: function (response) {
	
	        try {
	            response.data = JSON.parse(response.data);
	        } catch (e) {}
	
	        return response;
	    }
	
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Header Interceptor.
	 */
	
	var _ = __webpack_require__(6);
	
	module.exports = {
	
	    request: function (request) {
	
	        request.method = request.method.toUpperCase();
	        request.headers = _.extend({}, _.http.headers.common,
	            !request.crossOrigin ? _.http.headers.custom : {},
	            _.http.headers[request.method.toLowerCase()],
	            request.headers
	        );
	
	        if (_.isPlainObject(request.data) && /^(GET|JSONP)$/i.test(request.method)) {
	            _.extend(request.params, request.data);
	            delete request.data;
	        }
	
	        return request;
	    }
	
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * CORS Interceptor.
	 */
	
	var _ = __webpack_require__(6);
	var xdrClient = __webpack_require__(27);
	var xhrCors = 'withCredentials' in new XMLHttpRequest();
	var originUrl = _.url.parse(location.href);
	
	module.exports = {
	
	    request: function (request) {
	
	        if (request.crossOrigin === null) {
	            request.crossOrigin = crossOrigin(request);
	        }
	
	        if (request.crossOrigin) {
	
	            if (!xhrCors) {
	                request.client = xdrClient;
	            }
	
	            request.emulateHTTP = false;
	        }
	
	        return request;
	    }
	
	};
	
	function crossOrigin(request) {
	
	    var requestUrl = _.url.parse(_.url(request));
	
	    return (requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host);
	}


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * XDomain client (Internet Explorer).
	 */
	
	var _ = __webpack_require__(6);
	var Promise = __webpack_require__(15);
	
	module.exports = function (request) {
	    return new Promise(function (resolve) {
	
	        var xdr = new XDomainRequest(), response = {request: request}, handler;
	
	        request.cancel = function () {
	            xdr.abort();
	        };
	
	        xdr.open(request.method, _.url(request), true);
	
	        handler = function (event) {
	
	            response.data = xdr.responseText;
	            response.status = xdr.status;
	            response.statusText = xdr.statusText;
	
	            resolve(response);
	        };
	
	        xdr.timeout = 0;
	        xdr.onload = handler;
	        xdr.onabort = handler;
	        xdr.onerror = handler;
	        xdr.ontimeout = function () {};
	        xdr.onprogress = function () {};
	
	        xdr.send(request.data);
	    });
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Service for interacting with RESTful services.
	 */
	
	var _ = __webpack_require__(6);
	
	function Resource(url, params, actions, options) {
	
	    var self = this, resource = {};
	
	    actions = _.extend({},
	        Resource.actions,
	        actions
	    );
	
	    _.each(actions, function (action, name) {
	
	        action = _.merge({url: url, params: params || {}}, options, action);
	
	        resource[name] = function () {
	            return (self.$http || _.http)(opts(action, arguments));
	        };
	    });
	
	    return resource;
	}
	
	function opts(action, args) {
	
	    var options = _.extend({}, action), params = {}, data, success, error;
	
	    switch (args.length) {
	
	        case 4:
	
	            error = args[3];
	            success = args[2];
	
	        case 3:
	        case 2:
	
	            if (_.isFunction(args[1])) {
	
	                if (_.isFunction(args[0])) {
	
	                    success = args[0];
	                    error = args[1];
	
	                    break;
	                }
	
	                success = args[1];
	                error = args[2];
	
	            } else {
	
	                params = args[0];
	                data = args[1];
	                success = args[2];
	
	                break;
	            }
	
	        case 1:
	
	            if (_.isFunction(args[0])) {
	                success = args[0];
	            } else if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
	                data = args[0];
	            } else {
	                params = args[0];
	            }
	
	            break;
	
	        case 0:
	
	            break;
	
	        default:
	
	            throw 'Expected up to 4 arguments [params, data, success, error], got ' + args.length + ' arguments';
	    }
	
	    options.data = data;
	    options.params = _.extend({}, options.params, params);
	
	    if (success) {
	        options.success = success;
	    }
	
	    if (error) {
	        options.error = error;
	    }
	
	    return options;
	}
	
	Resource.actions = {
	
	    get: {method: 'GET'},
	    save: {method: 'POST'},
	    query: {method: 'GET'},
	    update: {method: 'PUT'},
	    remove: {method: 'DELETE'},
	    delete: {method: 'DELETE'}
	
	};
	
	module.exports = _.resource = Resource;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(30)
	__vue_script__ = __webpack_require__(34)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/app.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(40)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/yule/Code/weishang/client/src/app.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(31);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./app.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./app.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"app.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 32 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if (media) {
			styleElement.setAttribute("media", media);
		}
	
		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _appbar = __webpack_require__(35);
	
	var _appbar2 = _interopRequireDefault(_appbar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
		components: {
			'appbar': _appbar2.default
		}
	};
	// </script>
	/* generated by vue-loader */
	// <template>
	// 	<appbar></appbar>
	// 	<router-view></router-view>
	// </template>
	// <style>
	//
	// </style>
	// <script>

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(36)
	__vue_script__ = __webpack_require__(38)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/appbar.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(39)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/yule/Code/weishang/client/src/components/appbar.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(37);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./appbar.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./appbar.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.header{\n    position: relative;\n    overflow: hidden;\n    display: block;\n    z-index: 250;\n    box-sizing: border-box;\n    height: 44px;\n    left: 0;\n    right: 0;\n background: #155882;\n        border: none;\n        border-bottom: 1px solid #155882;\n        color: white;\n}\n.header h1{\n    text-shadow: none;\n    position: absolute;\n    width: 45%;\n    z-index: 1;\n    height: 44px;\n    font-size: 18px;\n    font-weight: bold;\n    left: 27.5%;\n    color: inherit;\n    padding: 10px 0;\n    text-shadow: rgba(0,0,0,0.8) 0 -1px 0;\n    text-align: center;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow: hidden;\n}\n.myheader{\n    display: block;\n    height: 100%;\n}\n.my-user {\n    position: absolute;\n    right: 10px;\n    top: 10px;\n    font-size: 18px;\n}\n\n\n", "", {"version":3,"sources":["/./src/components/appbar.vue?38ebd0aa"],"names":[],"mappings":";AAWA;IACA,mBAAA;IACA,iBAAA;IACA,eAAA;IACA,aAAA;IAEA,uBAAA;IACA,aAAA;IACA,QAAA;IACA,SAAA;CACA,oBAAA;QACA,aAAA;QACA,iCAAA;QACA,aAAA;CACA;AACA;IACA,kBAAA;IACA,mBAAA;IACA,WAAA;IACA,WAAA;IACA,aAAA;IACA,gBAAA;IACA,kBAAA;IACA,YAAA;IACA,eAAA;IACA,gBAAA;IACA,sCAAA;IACA,mBAAA;IACA,oBAAA;IACA,wBAAA;IACA,iBAAA;CACA;AACA;IACA,eAAA;IACA,aAAA;CACA;AACA;IACA,mBAAA;IACA,YAAA;IACA,UAAA;IACA,gBAAA;CACA","file":"appbar.vue","sourcesContent":["<template>\n<div id=\"header\" class=\"header\">\n\t<header class=\"myheader\">\n\t<a class=\"backButton button\" style=\"visibility: visible;\"></a>\n\t<h1 id=\"pageTitle\">主页</h1>\n\t<a id=\"\" class=\"icon user my-user\"></a>\n\t</header>\n\t</div>\n</template>\n\n<style>\n.header{\n    position: relative;\n    overflow: hidden;\n    display: block;\n    z-index: 250;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    height: 44px;\n    left: 0;\n    right: 0;\n background: #155882;\n        border: none;\n        border-bottom: 1px solid #155882;\n        color: white;\n}\n.header h1{\n    text-shadow: none;\n    position: absolute;\n    width: 45%;\n    z-index: 1;\n    height: 44px;\n    font-size: 18px;\n    font-weight: bold;\n    left: 27.5%;\n    color: inherit;\n    padding: 10px 0;\n    text-shadow: rgba(0,0,0,0.8) 0 -1px 0;\n    text-align: center;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow: hidden;\n}\n.myheader{\n    display: block;\n    height: 100%;\n}\n.my-user {\n    position: absolute;\n    right: 10px;\n    top: 10px;\n    font-size: 18px;\n}\n\n\n</style>\n\n<script>\n\n</script>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 38 */
/***/ function(module, exports) {

	// <template>
	// <div id="header" class="header">
	// 	<header class="myheader">
	// 	<a class="backButton button" style="visibility: visible;"></a>
	// 	<h1 id="pageTitle">主页</h1>
	// 	<a id="" class="icon user my-user"></a>
	// 	</header>
	// 	</div>
	// </template>
	//
	// <style>
	// .header{
	//     position: relative;
	//     overflow: hidden;
	//     display: block;
	//     z-index: 250;
	//     -webkit-box-sizing: border-box;
	//     box-sizing: border-box;
	//     height: 44px;
	//     left: 0;
	//     right: 0;
	//  background: #155882;
	//         border: none;
	//         border-bottom: 1px solid #155882;
	//         color: white;
	// }
	// .header h1{
	//     text-shadow: none;
	//     position: absolute;
	//     width: 45%;
	//     z-index: 1;
	//     height: 44px;
	//     font-size: 18px;
	//     font-weight: bold;
	//     left: 27.5%;
	//     color: inherit;
	//     padding: 10px 0;
	//     text-shadow: rgba(0,0,0,0.8) 0 -1px 0;
	//     text-align: center;
	//     white-space: nowrap;
	//     text-overflow: ellipsis;
	//     overflow: hidden;
	// }
	// .myheader{
	//     display: block;
	//     height: 100%;
	// }
	// .my-user {
	//     position: absolute;
	//     right: 10px;
	//     top: 10px;
	//     font-size: 18px;
	// }
	//
	//
	// </style>
	//
	// <script>

	// </script>

	/* generated by vue-loader */
	"use strict";

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = "\n<div id=\"header\" class=\"header\">\n\t<header class=\"myheader\">\n\t<a class=\"backButton button\" style=\"visibility: visible;\"></a>\n\t<h1 id=\"pageTitle\">主页</h1>\n\t<a id=\"\" class=\"icon user my-user\"></a>\n\t</header>\n\t</div>\n";

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = "\n<appbar></appbar>\n<router-view></router-view>\n";

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (router) {
	  router.map({
	    '/': {
	      name: 'index',
	      component: __webpack_require__(42)
	    },
	    '/login': {
	      name: 'login',
	      component: __webpack_require__(60)
	    },
	    '/me': {
	      name: 'me',
	      component: __webpack_require__(65)
	    },
	    '/p/:id': {
	      name: 'productionShow',
	      component: __webpack_require__(69)
	    },
	    '/success': {
	      name: 'success',
	      component: __webpack_require__(74)
	    },
	    '/success1': {
	      name: 'success',
	      component: __webpack_require__(78)
	    },
	    '/register': {
	      component: __webpack_require__(82)
	    }
	  });
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(43)
	__vue_script__ = __webpack_require__(45)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/views/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(59)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/yule/Code/weishang/client/src/views/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(44);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./index.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./index.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports
	
	
	// module
	exports.push([module.id, "\n#productions .productions li {\n\tpadding: 10px 10px;\n\tborder-bottom: 1px solid #ccc;\n}\n#productions .productions li a {\n\tdisplay: block;\n}\n#productions .productions li a img {\n\tfloat: left;\n\twidth: 50px;\n\theight: 50px;\n}\n#productions .productions li a div {\n\twidth: -webkit-calc(100% - 120px);\n\tdisplay: inline-block;\n\tmargin-left: 10px;\n}\n#productions .productions li a div p {\n\toverflow: hidden;\n  white-space: nowrap;\n\ttext-overflow:ellipsis;\n\tmargin: 0;\n}\n#productions .productions li a > p {\n\tmargin: -10px 0;\n  display: inline-block;\n  line-height: 100px;\n  float: right;\n}\n", "", {"version":3,"sources":["/./src/views/index.vue?4ef26a5c"],"names":[],"mappings":";AAyDA;CACA,mBAAA;CACA,8BAAA;CACA;AACA;CACA,eAAA;CACA;AACA;CACA,YAAA;CACA,YAAA;CACA,aAAA;CACA;AACA;CACA,kCAAA;CACA,sBAAA;CACA,kBAAA;CACA;AACA;CACA,iBAAA;EACA,oBAAA;CACA,uBAAA;CACA,UAAA;CACA;AACA;CACA,gBAAA;EACA,sBAAA;EACA,mBAAA;EACA,aAAA;CACA","file":"index.vue","sourcesContent":["<template>\n<div id=\"productions\">\n\t<ul class=\"productions\">\n\t    <li v-for=\"p in productions\">\n\t    \t<a v-link=\"{ name: 'productionShow', params: { id: p.id }}\">\n\t        <img v-bind:src=\"p.photoIds | getImagePoster\">\n\t        <div>\n\t        \t<p>{{p.name}}</p>\n\t        \t<p>{{p.summary}}</p>\n\t        \t<p>{{p.productType.name}}</p>\n\t        \t<p></p>\n\t        </div>\n\t        <p>{{ p.price }}</p>\n\t      </a>\n\t    </li>\n\t</ul>\n</div>\n</template>\n\n<script>\nimport api from '../api.js'\n\nexport default {\n\tdata () {\n\t\treturn {\n\t\t\tproductions: [],\n\t\t}\n\t},\n\troute: {\n\t\tdata ({ to }) {\n\t\t\treturn api.productions.index()\n\t\t\t\t.then(res => {\n\t\t\t\t\tconsole.log(res);\n\t\t\t\t\treturn {\n\t\t\t\t\t\tproductions: res.rows,\n\t\t\t\t\t// \t// pagination: {\n\t\t\t\t\t// \t// \ttotal: res.count,\n\t\t\t\t\t// \t// \tpage: to.query.page || 1,\n\t\t\t\t\t// \t// \tlimit: to.query.limit || 10,\n\t\t\t\t\t// \t// \turl: to.fullPath,\n\t\t\t\t\t// \t// }\n\t\t\t\t\t}\n\t\t\t\t}, err => {\n\t\t\t\t\tconsole.log(err);\n\t\t\t\t\talert('接口错误');\n\t\t\t\t})\n\t\t}\n\t},\n\tmethods: {\n\t\tproductionShow: function (id) {\n\t\t\talert('msg');\n\t\t}\n\t}\n}\n</script>\n\n<style>\n#productions .productions li {\n\tpadding: 10px 10px;\n\tborder-bottom: 1px solid #ccc;\n}\n#productions .productions li a {\n\tdisplay: block;\n}\n#productions .productions li a img {\n\tfloat: left;\n\twidth: 50px;\n\theight: 50px;\n}\n#productions .productions li a div {\n\twidth: -webkit-calc(100% - 120px);\n\tdisplay: inline-block;\n\tmargin-left: 10px;\n}\n#productions .productions li a div p {\n\toverflow: hidden;\n  white-space: nowrap;\n\ttext-overflow:ellipsis;\n\tmargin: 0;\n}\n#productions .productions li a > p {\n\tmargin: -10px 0;\n  display: inline-block;\n  line-height: 100px;\n  float: right;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _api = __webpack_require__(46);
	
	var _api2 = _interopRequireDefault(_api);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
		data: function data() {
			return {
				productions: []
			};
		},
	
		route: {
			data: function data(_ref) {
				var to = _ref.to;
	
				return _api2.default.productions.index().then(function (res) {
					console.log(res);
					return {
						productions: res.rows
					};
				}, // 	// pagination: {
				// 	// 	total: res.count,
				// 	// 	page: to.query.page || 1,
				// 	// 	limit: to.query.limit || 10,
				// 	// 	url: to.fullPath,
				// 	// }
				function (err) {
					console.log(err);
					alert('接口错误');
				});
			}
		},
		methods: {
			productionShow: function productionShow(id) {
				alert('msg');
			}
		}
	};
	// </script>
	//
	// <style>
	// #productions .productions li {
	// 	padding: 10px 10px;
	// 	border-bottom: 1px solid #ccc;
	// }
	// #productions .productions li a {
	// 	display: block;
	// }
	// #productions .productions li a img {
	// 	float: left;
	// 	width: 50px;
	// 	height: 50px;
	// }
	// #productions .productions li a div {
	// 	width: -webkit-calc(100% - 120px);
	// 	display: inline-block;
	// 	margin-left: 10px;
	// }
	// #productions .productions li a div p {
	// 	overflow: hidden;
	//   white-space: nowrap;
	// 	text-overflow:ellipsis;
	// 	margin: 0;
	// }
	// #productions .productions li a > p {
	// 	margin: -10px 0;
	//   display: inline-block;
	//   line-height: 100px;
	//   float: right;
	// }
	// </style>

	/* generated by vue-loader */
	// <template>
	// <div id="productions">
	// 	<ul class="productions">
	// 	    <li v-for="p in productions">
	// 	    	<a v-link="{ name: 'productionShow', params: { id: p.id }}">
	// 	        <img v-bind:src="p.photoIds | getImagePoster">
	// 	        <div>
	// 	        	<p>{{p.name}}</p>
	// 	        	<p>{{p.summary}}</p>
	// 	        	<p>{{p.productType.name}}</p>
	// 	        	<p></p>
	// 	        </div>
	// 	        <p>{{ p.price }}</p>
	// 	      </a>
	// 	    </li>
	// 	</ul>
	// </div>
	// </template>
	//
	// <script>

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _xhr = __webpack_require__(47);
	
	var _xhr2 = _interopRequireDefault(_xhr);
	
	var _es6Promise = __webpack_require__(55);
	
	var _vue = __webpack_require__(2);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import
	// 常量
	var host = 'http://123.56.235.156/vs';
	var productIndex = host + '/front/product';
	var productShow = host + '/front/product/info';
	var _userPay = host + '/vs/front/pay/userPay';
	var API_USER_REGISTER_URL = host + '/front/user/register';
	var API_SEND_SMS_CODE_URL = host + '/front/user/phoneCode';
	
	_vue2.default.http.options.emulateJSON = true;
	
	exports.default = {
		productions: {
			index: function index() {
				return new _es6Promise.Promise(function (resolve, reject) {
					(0, _xhr2.default)('' + productIndex, function (err, res) {
						if (err) return reject(err);
						resolve(JSON.parse(res.body));
					});
				});
			},
			get: function get(id) {
				return new _es6Promise.Promise(function (resolve, reject) {
					(0, _xhr2.default)(productShow + '?id=' + id, function (err, res) {
						if (err) return reject(err);
						resolve(JSON.parse(res.body));
					});
				});
			}
		},
		pay: {
			userPay: function userPay(out_trade_no) {
				return new _es6Promise.Promise(function (resolve, reject) {
					(0, _xhr2.default)(_userPay + '?out_trade_no=' + out_trade_no, function (err, res) {
						if (err) return reject(err);
						resolve(JSON.parse(res.body));
					});
				});
			}
		},
		user: {
			regsiter: function regsiter(user) {
				return _vue2.default.http.post('' + API_USER_REGISTER_URL, user);
			},
			sendSMSCode: function sendSMSCode(mobile) {
				return _vue2.default.http.get('' + API_SEND_SMS_CODE_URL, { mobile: mobile });
			},
			login: function login() {
				return new _es6Promise.Promise(function (resolve, reject) {
					(0, _xhr2.default)(_userPay + '?out_trade_no=' + out_trade_no, function (err, res) {
						if (err) return reject(err);
						resolve(JSON.parse(res.body));
					});
				});
			},
			info: function info() {
				return new _es6Promise.Promise(function (resolve, reject) {
					(0, _xhr2.default)(_userPay + '?out_trade_no=' + out_trade_no, function (err, res) {
						if (err) return reject(err);
						resolve(JSON.parse(res.body));
					});
				});
			}
		}
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var window = __webpack_require__(48)
	var once = __webpack_require__(49)
	var isFunction = __webpack_require__(50)
	var parseHeaders = __webpack_require__(51)
	var xtend = __webpack_require__(54)
	
	module.exports = createXHR
	createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
	createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest
	
	forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
	    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
	        options = initParams(uri, options, callback)
	        options.method = method.toUpperCase()
	        return _createXHR(options)
	    }
	})
	
	function forEachArray(array, iterator) {
	    for (var i = 0; i < array.length; i++) {
	        iterator(array[i])
	    }
	}
	
	function isEmpty(obj){
	    for(var i in obj){
	        if(obj.hasOwnProperty(i)) return false
	    }
	    return true
	}
	
	function initParams(uri, options, callback) {
	    var params = uri
	
	    if (isFunction(options)) {
	        callback = options
	        if (typeof uri === "string") {
	            params = {uri:uri}
	        }
	    } else {
	        params = xtend(options, {uri: uri})
	    }
	
	    params.callback = callback
	    return params
	}
	
	function createXHR(uri, options, callback) {
	    options = initParams(uri, options, callback)
	    return _createXHR(options)
	}
	
	function _createXHR(options) {
	    var callback = options.callback
	    if(typeof callback === "undefined"){
	        throw new Error("callback argument missing")
	    }
	    callback = once(callback)
	
	    function readystatechange() {
	        if (xhr.readyState === 4) {
	            loadFunc()
	        }
	    }
	
	    function getBody() {
	        // Chrome with requestType=blob throws errors arround when even testing access to responseText
	        var body = undefined
	
	        if (xhr.response) {
	            body = xhr.response
	        } else if (xhr.responseType === "text" || !xhr.responseType) {
	            body = xhr.responseText || xhr.responseXML
	        }
	
	        if (isJson) {
	            try {
	                body = JSON.parse(body)
	            } catch (e) {}
	        }
	
	        return body
	    }
	
	    var failureResponse = {
	                body: undefined,
	                headers: {},
	                statusCode: 0,
	                method: method,
	                url: uri,
	                rawRequest: xhr
	            }
	
	    function errorFunc(evt) {
	        clearTimeout(timeoutTimer)
	        if(!(evt instanceof Error)){
	            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
	        }
	        evt.statusCode = 0
	        callback(evt, failureResponse)
	    }
	
	    // will load the data & process the response in a special response object
	    function loadFunc() {
	        if (aborted) return
	        var status
	        clearTimeout(timeoutTimer)
	        if(options.useXDR && xhr.status===undefined) {
	            //IE8 CORS GET successful response doesn't have a status field, but body is fine
	            status = 200
	        } else {
	            status = (xhr.status === 1223 ? 204 : xhr.status)
	        }
	        var response = failureResponse
	        var err = null
	
	        if (status !== 0){
	            response = {
	                body: getBody(),
	                statusCode: status,
	                method: method,
	                headers: {},
	                url: uri,
	                rawRequest: xhr
	            }
	            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
	                response.headers = parseHeaders(xhr.getAllResponseHeaders())
	            }
	        } else {
	            err = new Error("Internal XMLHttpRequest Error")
	        }
	        callback(err, response, response.body)
	
	    }
	
	    var xhr = options.xhr || null
	
	    if (!xhr) {
	        if (options.cors || options.useXDR) {
	            xhr = new createXHR.XDomainRequest()
	        }else{
	            xhr = new createXHR.XMLHttpRequest()
	        }
	    }
	
	    var key
	    var aborted
	    var uri = xhr.url = options.uri || options.url
	    var method = xhr.method = options.method || "GET"
	    var body = options.body || options.data || null
	    var headers = xhr.headers = options.headers || {}
	    var sync = !!options.sync
	    var isJson = false
	    var timeoutTimer
	
	    if ("json" in options) {
	        isJson = true
	        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
	        if (method !== "GET" && method !== "HEAD") {
	            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
	            body = JSON.stringify(options.json)
	        }
	    }
	
	    xhr.onreadystatechange = readystatechange
	    xhr.onload = loadFunc
	    xhr.onerror = errorFunc
	    // IE9 must have onprogress be set to a unique function.
	    xhr.onprogress = function () {
	        // IE must die
	    }
	    xhr.ontimeout = errorFunc
	    xhr.open(method, uri, !sync, options.username, options.password)
	    //has to be after open
	    if(!sync) {
	        xhr.withCredentials = !!options.withCredentials
	    }
	    // Cannot set timeout with sync request
	    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
	    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
	    if (!sync && options.timeout > 0 ) {
	        timeoutTimer = setTimeout(function(){
	            aborted=true//IE9 may still call readystatechange
	            xhr.abort("timeout")
	            var e = new Error("XMLHttpRequest timeout")
	            e.code = "ETIMEDOUT"
	            errorFunc(e)
	        }, options.timeout )
	    }
	
	    if (xhr.setRequestHeader) {
	        for(key in headers){
	            if(headers.hasOwnProperty(key)){
	                xhr.setRequestHeader(key, headers[key])
	            }
	        }
	    } else if (options.headers && !isEmpty(options.headers)) {
	        throw new Error("Headers cannot be set on an XDomainRequest object")
	    }
	
	    if ("responseType" in options) {
	        xhr.responseType = options.responseType
	    }
	
	    if ("beforeSend" in options &&
	        typeof options.beforeSend === "function"
	    ) {
	        options.beforeSend(xhr)
	    }
	
	    xhr.send(body)
	
	    return xhr
	
	
	}
	
	function noop() {}


/***/ },
/* 48 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {if (typeof window !== "undefined") {
	    module.exports = window;
	} else if (typeof global !== "undefined") {
	    module.exports = global;
	} else if (typeof self !== "undefined"){
	    module.exports = self;
	} else {
	    module.exports = {};
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = once
	
	once.proto = once(function () {
	  Object.defineProperty(Function.prototype, 'once', {
	    value: function () {
	      return once(this)
	    },
	    configurable: true
	  })
	})
	
	function once (fn) {
	  var called = false
	  return function () {
	    if (called) return
	    called = true
	    return fn.apply(this, arguments)
	  }
	}


/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = isFunction
	
	var toString = Object.prototype.toString
	
	function isFunction (fn) {
	  var string = toString.call(fn)
	  return string === '[object Function]' ||
	    (typeof fn === 'function' && string !== '[object RegExp]') ||
	    (typeof window !== 'undefined' &&
	     // IE8 and below
	     (fn === window.setTimeout ||
	      fn === window.alert ||
	      fn === window.confirm ||
	      fn === window.prompt))
	};


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var trim = __webpack_require__(52)
	  , forEach = __webpack_require__(53)
	  , isArray = function(arg) {
	      return Object.prototype.toString.call(arg) === '[object Array]';
	    }
	
	module.exports = function (headers) {
	  if (!headers)
	    return {}
	
	  var result = {}
	
	  forEach(
	      trim(headers).split('\n')
	    , function (row) {
	        var index = row.indexOf(':')
	          , key = trim(row.slice(0, index)).toLowerCase()
	          , value = trim(row.slice(index + 1))
	
	        if (typeof(result[key]) === 'undefined') {
	          result[key] = value
	        } else if (isArray(result[key])) {
	          result[key].push(value)
	        } else {
	          result[key] = [ result[key], value ]
	        }
	      }
	  )
	
	  return result
	}

/***/ },
/* 52 */
/***/ function(module, exports) {

	
	exports = module.exports = trim;
	
	function trim(str){
	  return str.replace(/^\s*|\s*$/g, '');
	}
	
	exports.left = function(str){
	  return str.replace(/^\s*/, '');
	};
	
	exports.right = function(str){
	  return str.replace(/\s*$/, '');
	};


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(50)
	
	module.exports = forEach
	
	var toString = Object.prototype.toString
	var hasOwnProperty = Object.prototype.hasOwnProperty
	
	function forEach(list, iterator, context) {
	    if (!isFunction(iterator)) {
	        throw new TypeError('iterator must be a function')
	    }
	
	    if (arguments.length < 3) {
	        context = this
	    }
	    
	    if (toString.call(list) === '[object Array]')
	        forEachArray(list, iterator, context)
	    else if (typeof list === 'string')
	        forEachString(list, iterator, context)
	    else
	        forEachObject(list, iterator, context)
	}
	
	function forEachArray(array, iterator, context) {
	    for (var i = 0, len = array.length; i < len; i++) {
	        if (hasOwnProperty.call(array, i)) {
	            iterator.call(context, array[i], i, array)
	        }
	    }
	}
	
	function forEachString(string, iterator, context) {
	    for (var i = 0, len = string.length; i < len; i++) {
	        // no such thing as a sparse string.
	        iterator.call(context, string.charAt(i), i, string)
	    }
	}
	
	function forEachObject(object, iterator, context) {
	    for (var k in object) {
	        if (hasOwnProperty.call(object, k)) {
	            iterator.call(context, object[k], k, object)
	        }
	    }
	}


/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = extend
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	function extend() {
	    var target = {}
	
	    for (var i = 0; i < arguments.length; i++) {
	        var source = arguments[i]
	
	        for (var key in source) {
	            if (hasOwnProperty.call(source, key)) {
	                target[key] = source[key]
	            }
	        }
	    }
	
	    return target
	}


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.0.2
	 */
	
	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }
	
	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }
	
	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }
	
	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }
	
	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$toString = {}.toString;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;
	
	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }
	
	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }
	
	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }
	
	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
	
	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';
	
	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }
	
	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }
	
	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });
	
	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }
	
	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }
	
	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }
	
	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];
	
	        callback(arg);
	
	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }
	
	      lib$es6$promise$asap$$len = 0;
	    }
	
	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(57);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }
	
	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }
	
	    function lib$es6$promise$$internal$$noop() {}
	
	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;
	
	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }
	
	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }
	
	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }
	
	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }
	
	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;
	
	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }
	
	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }
	
	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
	      if (maybeThenable.constructor === promise.constructor) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        var then = lib$es6$promise$$internal$$getThen(maybeThenable);
	
	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }
	
	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value);
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }
	
	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }
	
	      lib$es6$promise$$internal$$publish(promise);
	    }
	
	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	
	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;
	
	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }
	
	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;
	
	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }
	
	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;
	
	      parent._onerror = null;
	
	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;
	
	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }
	
	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;
	
	      if (subscribers.length === 0) { return; }
	
	      var child, callback, detail = promise._result;
	
	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];
	
	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }
	
	      promise._subscribers.length = 0;
	    }
	
	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }
	
	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }
	
	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;
	
	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);
	
	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }
	
	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }
	
	      } else {
	        value = detail;
	        succeeded = true;
	      }
	
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }
	
	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }
	
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      var enumerator = this;
	
	      enumerator._instanceConstructor = Constructor;
	      enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);
	
	      if (enumerator._validateInput(input)) {
	        enumerator._input     = input;
	        enumerator.length     = input.length;
	        enumerator._remaining = input.length;
	
	        enumerator._init();
	
	        if (enumerator.length === 0) {
	          lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	        } else {
	          enumerator.length = enumerator.length || 0;
	          enumerator._enumerate();
	          if (enumerator._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError());
	      }
	    }
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function(input) {
	      return lib$es6$promise$utils$$isArray(input);
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._init = function() {
	      this._result = new Array(this.length);
	    };
	
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var enumerator = this;
	
	      var length  = enumerator.length;
	      var promise = enumerator.promise;
	      var input   = enumerator._input;
	
	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        enumerator._eachEntry(input[i], i);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var enumerator = this;
	      var c = enumerator._instanceConstructor;
	
	      if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
	        if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
	          entry._onerror = null;
	          enumerator._settledAt(entry._state, i, entry._result);
	        } else {
	          enumerator._willSettleAt(c.resolve(entry), i);
	        }
	      } else {
	        enumerator._remaining--;
	        enumerator._result[i] = entry;
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var enumerator = this;
	      var promise = enumerator.promise;
	
	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        enumerator._remaining--;
	
	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          enumerator._result[i] = value;
	        }
	      }
	
	      if (enumerator._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, enumerator._result);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;
	
	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	
	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }
	
	      var length = entries.length;
	
	      function onFulfillment(value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }
	
	      function onRejection(reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      }
	
	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }
	
	      return promise;
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }
	
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;
	
	    var lib$es6$promise$promise$$counter = 0;
	
	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }
	
	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }
	
	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
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
	      var promise = new Promise(function(resolve, reject) {
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
	          var xhr = new XMLHttpRequest();
	
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
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this._id = lib$es6$promise$promise$$counter++;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];
	
	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        if (!lib$es6$promise$utils$$isFunction(resolver)) {
	          lib$es6$promise$promise$$needsResolver();
	        }
	
	        if (!(this instanceof lib$es6$promise$promise$$Promise)) {
	          lib$es6$promise$promise$$needsNew();
	        }
	
	        lib$es6$promise$$internal$$initializePromise(this, resolver);
	      }
	    }
	
	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;
	
	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,
	
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
	      var result;
	
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
	      var author, books;
	
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
	      then: function(onFulfillment, onRejection) {
	        var parent = this;
	        var state = parent._state;
	
	        if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
	          return this;
	        }
	
	        var child = new this.constructor(lib$es6$promise$$internal$$noop);
	        var result = parent._result;
	
	        if (state) {
	          var callback = arguments[state - 1];
	          lib$es6$promise$asap$$asap(function(){
	            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
	          });
	        } else {
	          lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	        }
	
	        return child;
	      },
	
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
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;
	
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
	
	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }
	
	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;
	
	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };
	
	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(58)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }
	
	    lib$es6$promise$polyfill$$default();
	}).call(this);
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), (function() { return this; }()), __webpack_require__(56)(module)))

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 57 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = "\n<div id=\"productions\">\n\t<ul class=\"productions\">\n\t    <li v-for=\"p in productions\">\n\t    \t<a v-link=\"{ name: 'productionShow', params: { id: p.id }}\">\n\t        <img v-bind:src=\"p.photoIds | getImagePoster\">\n\t        <div>\n\t        \t<p>{{p.name}}</p>\n\t        \t<p>{{p.summary}}</p>\n\t        \t<p>{{p.productType.name}}</p>\n\t        \t<p></p>\n\t        </div>\n\t        <p>{{ p.price }}</p>\n\t      </a>\n\t    </li>\n\t</ul>\n</div>\n";

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(61)
	__vue_script__ = __webpack_require__(63)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/views/login.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(64)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/yule/Code/weishang/client/src/views/login.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(62);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./login.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./login.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"login.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 63 */
/***/ function(module, exports) {

	// <template>
	// 	<p>This is login!</p>
	// </template>
	// <style>
	//
	// </style>
	// <script>

	// </script>
	/* generated by vue-loader */
	"use strict";

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = "\n<p>This is login!</p>\n";

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(66)
	__vue_template__ = __webpack_require__(68)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/yule/Code/weishang/client/src/views/me.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(67);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./me.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./me.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports
	
	
	// module
	exports.push([module.id, "\n#me {background: black;}\n", "", {"version":3,"sources":["/./src/views/me.vue?3bd8e882"],"names":[],"mappings":";AAOA,KAAA,kBAAA,CAAA","file":"me.vue","sourcesContent":["<template>\n\t<div id=\"me\">\n\t我的个人中心\n\t</div>\n</template>\n\n<style>\n#me {background: black;}\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = "\n<div id=\"me\">\n我的个人中心\n</div>\n";

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(70)
	__vue_script__ = __webpack_require__(72)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/views/productionShow.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(73)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/yule/Code/weishang/client/src/views/productionShow.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(71);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./productionShow.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./productionShow.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports
	
	
	// module
	exports.push([module.id, "\n#productionShow img { width: 100%; }\n#productionShow h1 {font-size: 20px;}\n#productionShow .intro {}\na.btn { display: block;width: 100%;background: blue;color: white;height: 40px;line-height: 40px;text-align: center;font-size: 20px;letter-spacing: .5em;position: fixed; bottom: 0px;}\nform {\n\tposition: fixed;\n\tbottom: 40px;\n\tbackground: white;\n\twidth: 100%;\n}\n", "", {"version":3,"sources":["/./src/views/productionShow.vue?abea3c46"],"names":[],"mappings":";AAiGA,sBAAA,YAAA,EAAA;AACA,oBAAA,gBAAA,CAAA;AACA,yBAAA;AACA,QAAA,eAAA,YAAA,iBAAA,aAAA,aAAA,kBAAA,mBAAA,gBAAA,qBAAA,gBAAA,CAAA,YAAA,CAAA;AACA;CACA,gBAAA;CACA,aAAA;CACA,kBAAA;CACA,YAAA;CACA","file":"productionShow.vue","sourcesContent":["<template>\n  <div id=\"productionShow\">\n\t\t<img v-bind:src=\"production.photoIds | getImagePoster\">\n\t\t<h1>{{production.name}}</h1>\n\t\t<p class=\"addrs\"></p>\n\t\t<p class=\"intro\">{{production.summary}}</p>\n\t\t<a class=\"btn\" @click=\"buy()\" v-if=\"state.buy && !state.pay\">购买</a>\n\t\t<a class=\"btn\" @click=\"pay()\" v-if=\"state.pay\">支付</a>\n  </div>\n\n<form class=\"buyFrom\" v-if=\"state.pay\">\n\t<div>\n\t\t<label for=\"\">购买数量</label>\n\t\t<input type=\"number\" placeholder=\"购买数量\">\n\t</div>\n\t<div>\n\t\t<label for=\"\">收货人地址</label>\n\t\t<input type=\"text\" placeholder=\"收货人地址\">\n\t</div>\n\t<div>\n\t\t<label for=\"\">收货人联系电话</label>\n\t\t<input type=\"text\" placeholder=\"收货人联系电话\">\n\t</div>\n\t<div>\n\t\t<label for=\"\">收货地址</label>\n\t\t<input type=\"text\" placeholder=\"收货地址\">\n\t</div>\n</form>\n  </template>\n  \n<script>\nimport api from '../api.js'\n\nexport default {\n\tdata () {\n\t\treturn {\n\t\t\tproduction: {},\n\t\t\tstate: {\n\t\t\t\tbuy: true,\n\t\t\t\tpay: false\n\t\t\t}\n\t\t}\n\t},\n\troute: {\n\t\tdata ({ to : { params: { id }}}) {\n\t\t\treturn api.productions.get(id)\n\t\t\t\t.then(res => {\n\t\t\t\t\tconsole.log(res);\n\t\t\t\t\treturn {\n\t\t\t\t\t\tproduction: res,\n\t\t\t\t\t}\n\t\t\t\t}, err => {\n\t\t\t\t\tconsole.log(err);\n\t\t\t\t\talert('接口错误');\n\t\t\t\t})\n\t\t}\n\t},\n\tmethods: {\n\t\tbuy: function () {\n\t\t\tthis.state.pay = true;\n\t\t},\n\t\tpay: function () {\n\t\t\tapi.pay.userPay('7f9a2222627343dc8217ee4aed392a2a')\n\t\t\t\t.then(res => {\n\t\t\t\t\tBC.click({\n\t\t\t\t\t\tout_trade_no: res.out_trade_no,\n\t\t\t\t\t\ttitle: res.title,\n\t\t\t\t\t\tamount: res.amount,\n\t\t\t\t\t\tsign: res.sign,\n\t\t\t\t\t\treturn_url:\"http://www.baidu.com\",\n\t\t\t\t\t\tdebug:true,\n\t\t\t\t\t\toptional:{\n\t\t\t\t\t\t\ttype:'USER_PAY',\n\t\t\t\t\t\t\tout_trade_no:res.out_trade_no\n\t\t\t\t\t\t},\n\t\t\t\t\t\tinstant_channel:\"ali\",\n\t\t\t\t\t\tneed_ali_guide:\"true\"\n\t\t\t\t\t\t\n\t\t\t\t\t}, {\n\t\t\t\t\t\tdataError:function(msg){\n\t\t\t\t\t\t\tconsole.log(msg);\n\t\t\t\t\t\t},wxJsapiFinish:function(msg){\n\t\t\t\t\t\t\talert(msg);\n\t\t\t\t\t\t},wxJsapiSuccess:function(msg){\n\t\t\t\t\t\t\talert(msg);\n\t\t\t\t\t\t},wxJsapiFail:function(msg){\n\t\t\t\t\t\t\talert(msg);\n\t\t\t\t\t\t}\n\t\t\t\t\t});\n\t\t\t\t})\n\t\t}\n\t}\n}\n\n</script>\n\n<style>\n#productionShow img { width: 100%; }\n#productionShow h1 {font-size: 20px;}\n#productionShow .intro {}\na.btn { display: block;width: 100%;background: blue;color: white;height: 40px;line-height: 40px;text-align: center;font-size: 20px;letter-spacing: .5em;position: fixed; bottom: 0px;}\nform {\n\tposition: fixed;\n\tbottom: 40px;\n\tbackground: white;\n\twidth: 100%;\n}\n</style> "],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _api = __webpack_require__(46);
	
	var _api2 = _interopRequireDefault(_api);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
		data: function data() {
			return {
				production: {},
				state: {
					buy: true,
					pay: false
				}
			};
		},
	
		route: {
			data: function data(_ref) {
				var id = _ref.to.params.id;
	
				return _api2.default.productions.get(id).then(function (res) {
					console.log(res);
					return {
						production: res
					};
				}, function (err) {
					console.log(err);
					alert('接口错误');
				});
			}
		},
		methods: {
			buy: function buy() {
				this.state.pay = true;
			},
			pay: function pay() {
				_api2.default.pay.userPay('7f9a2222627343dc8217ee4aed392a2a').then(function (res) {
					BC.click({
						out_trade_no: res.out_trade_no,
						title: res.title,
						amount: res.amount,
						sign: res.sign,
						return_url: "http://www.baidu.com",
						debug: true,
						optional: {
							type: 'USER_PAY',
							out_trade_no: res.out_trade_no
						},
						instant_channel: "ali",
						need_ali_guide: "true"
	
					}, {
						dataError: function dataError(msg) {
							console.log(msg);
						}, wxJsapiFinish: function wxJsapiFinish(msg) {
							alert(msg);
						}, wxJsapiSuccess: function wxJsapiSuccess(msg) {
							alert(msg);
						}, wxJsapiFail: function wxJsapiFail(msg) {
							alert(msg);
						}
					});
				});
			}
		}
	};

	// </script>
	//
	// <style>
	// #productionShow img { width: 100%; }
	// #productionShow h1 {font-size: 20px;}
	// #productionShow .intro {}
	// a.btn { display: block;width: 100%;background: blue;color: white;height: 40px;line-height: 40px;text-align: center;font-size: 20px;letter-spacing: .5em;position: fixed; bottom: 0px;}
	// form {
	// 	position: fixed;
	// 	bottom: 40px;
	// 	background: white;
	// 	width: 100%;
	// }
	// </style>
	/* generated by vue-loader */
	// <template>
	//   <div id="productionShow">
	// 		<img v-bind:src="production.photoIds | getImagePoster">
	// 		<h1>{{production.name}}</h1>
	// 		<p class="addrs"></p>
	// 		<p class="intro">{{production.summary}}</p>
	// 		<a class="btn" @click="buy()" v-if="state.buy && !state.pay">购买</a>
	// 		<a class="btn" @click="pay()" v-if="state.pay">支付</a>
	//   </div>
	//
	// <form class="buyFrom" v-if="state.pay">
	// 	<div>
	// 		<label for="">购买数量</label>
	// 		<input type="number" placeholder="购买数量">
	// 	</div>
	// 	<div>
	// 		<label for="">收货人地址</label>
	// 		<input type="text" placeholder="收货人地址">
	// 	</div>
	// 	<div>
	// 		<label for="">收货人联系电话</label>
	// 		<input type="text" placeholder="收货人联系电话">
	// 	</div>
	// 	<div>
	// 		<label for="">收货地址</label>
	// 		<input type="text" placeholder="收货地址">
	// 	</div>
	// </form>
	//   </template>
	//
	// <script>

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = "\n  <div id=\"productionShow\">\n\t\t<img v-bind:src=\"production.photoIds | getImagePoster\">\n\t\t<h1>{{production.name}}</h1>\n\t\t<p class=\"addrs\"></p>\n\t\t<p class=\"intro\">{{production.summary}}</p>\n\t\t<a class=\"btn\" @click=\"buy()\" v-if=\"state.buy && !state.pay\">购买</a>\n\t\t<a class=\"btn\" @click=\"pay()\" v-if=\"state.pay\">支付</a>\n  </div>\n\n<form class=\"buyFrom\" v-if=\"state.pay\">\n\t<div>\n\t\t<label for=\"\">购买数量</label>\n\t\t<input type=\"number\" placeholder=\"购买数量\">\n\t</div>\n\t<div>\n\t\t<label for=\"\">收货人地址</label>\n\t\t<input type=\"text\" placeholder=\"收货人地址\">\n\t</div>\n\t<div>\n\t\t<label for=\"\">收货人联系电话</label>\n\t\t<input type=\"text\" placeholder=\"收货人联系电话\">\n\t</div>\n\t<div>\n\t\t<label for=\"\">收货地址</label>\n\t\t<input type=\"text\" placeholder=\"收货地址\">\n\t</div>\n</form>\n  ";

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(75)
	__vue_template__ = __webpack_require__(77)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/yule/Code/weishang/client/src/views/authorized-success.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(76);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./authorized-success.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./authorized-success.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.success-pannel{\n    text-align:center;\n    width:100%;\n}\n.success-icon{\n    width:80px;\n    height:80px;\n    display:inline-block;\n}\n.success-icon img{\n    width:100%;\n    height:auto;\n}\n.success-tag{\n    font-size:20px;\n    color:#42B445;\n    text-align: center;\n    margin-top:5px;\n}\n.success-tag2{\n    font-size:12px;\n            color:#A1A1A1;\n            text-align: center;\n            margin-top:10px;\n}\n.success-tag3{\n        font-size:15px;\n                color:#5C5BF4;\n                text-align: center;\n                margin-top:50px;\n    }\n .company-info{\n    position:absolute;\n    bottom:10px;\n }\n", "", {"version":3,"sources":["/./src/views/authorized-success.vue?fbe84732"],"names":[],"mappings":";AAoBA;IACA,kBAAA;IACA,WAAA;CACA;AACA;IACA,WAAA;IACA,YAAA;IACA,qBAAA;CACA;AACA;IACA,WAAA;IACA,YAAA;CACA;AACA;IACA,eAAA;IACA,cAAA;IACA,mBAAA;IACA,eAAA;CACA;AACA;IACA,eAAA;YACA,cAAA;YACA,mBAAA;YACA,gBAAA;CACA;AACA;QACA,eAAA;gBACA,cAAA;gBACA,mBAAA;gBACA,gBAAA;KACA;CACA;IACA,kBAAA;IACA,YAAA;EACA","file":"authorized-success.vue","sourcesContent":["<!--认证成功-->\r\n\r\n<template>\r\n    <div class='viewport'>\r\n        <div class='container'>\r\n            <div class='floor-item margin-t'>\r\n                <div class='success-pannel'><span class=\"success-icon\"><img src='/src/assets/i/success-icon.png' /></span></div>\r\n                <div class=\"success-tag\">认证成功</div>\r\n                <div class=\"success-tag2\">您已完成认证</div>\r\n                <a href='#'><div class=\"success-tag3\">>>>前往首页<<<</div></a>\r\n            </div>\r\n            <div class='floor-item company-info'>\r\n                <div class=\"success-tag2\">产品名称或公司</div>\r\n                <div class=\"success-tag2\">@copyright</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n<style>\r\n    .success-pannel{\r\n        text-align:center;\r\n        width:100%;\r\n    }\r\n    .success-icon{\r\n        width:80px;\r\n        height:80px;\r\n        display:inline-block;\r\n    }\r\n    .success-icon img{\r\n        width:100%;\r\n        height:auto;\r\n    }\r\n    .success-tag{\r\n        font-size:20px;\r\n        color:#42B445;\r\n        text-align: center;\r\n        margin-top:5px;\r\n    }\r\n    .success-tag2{\r\n        font-size:12px;\r\n                color:#A1A1A1;\r\n                text-align: center;\r\n                margin-top:10px;\r\n    }\r\n    .success-tag3{\r\n            font-size:15px;\r\n                    color:#5C5BF4;\r\n                    text-align: center;\r\n                    margin-top:50px;\r\n        }\r\n     .company-info{\r\n        position:absolute;\r\n        bottom:10px;\r\n     }\r\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = "\n<div class='viewport'>\n    <div class='container'>\n        <div class='floor-item margin-t'>\n            <div class='success-pannel'><span class=\"success-icon\"><img src='/src/assets/i/success-icon.png' /></span></div>\n            <div class=\"success-tag\">认证成功</div>\n            <div class=\"success-tag2\">您已完成认证</div>\n            <a href='#'><div class=\"success-tag3\">>>>前往首页<<<</div></a>\n        </div>\n        <div class='floor-item company-info'>\n            <div class=\"success-tag2\">产品名称或公司</div>\n            <div class=\"success-tag2\">@copyright</div>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(79)
	__vue_template__ = __webpack_require__(81)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/yule/Code/weishang/client/src/views/register-success.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(80);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./register-success.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./register-success.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.success-pannel{\n    text-align:center;\n    width:100%;\n}\n.success-icon{\n    width:80px;\n    height:80px;\n    display:inline-block;\n}\n.success-icon img{\n    width:100%;\n    height:auto;\n}\n.success-tag{\n    font-size:20px;\n    color:#42B445;\n    text-align: center;\n    margin-top:5px;\n}\n.success-tag2{\n    font-size:12px;\n            color:#A1A1A1;\n            text-align: center;\n            margin-top:10px;\n}\n.success-tag2 .authorized-change{\n    font-size:18px;\n    color:#F1730D;\n}\n.success-tag3{\n        font-size:15px;\n                color:#5C5BF4;\n                text-align: center;\n                margin-top:50px;\n    }\n .success-tag4{\n             font-size:15px;\n                     color:#5C5BF4;\n                     text-align: center;\n                     margin-top:10px;\n         }\n .company-info{\n    position:absolute;\n    bottom:10px;\n }\n\n  .info {\n     height: 180px;\n     text-align: center;\n     position: relative;\n     border-bottom: solid 1px #B0B0B0;\n     margin: 0;\n }\n .register-pannel .info-container{\n\n width: 125px;\n\n height: 125px;\n\n text-align: center;\n\n position: absolute;\n\n top: 50%;\n\n margin-top: -66px;\n\n left: 50%;\n\n margin-left: -66px;\n\n border: solid 10px #EDEDED;\n\n border-radius: 3px;\n\n vertical-align: middle;\n }\n .register-pannel .tuijian-pic{\n     display: inline-block;\n     width: 44px;\n     height: 44px;\n     overflow: hidden;\n     margin-top: 5px;\n }\n .register-pannel .tuijian-pic img{\n     max-width: 100%;\n     max-height: 100%;\n }\n .register-pannel .tuijian-info {\n     display: inline-block;\n     font-size: 15px;\n     color: #636363;\n     margin-top: -4px;\n }\n .register-pannel span.tuijian-info{\n     display: inline-block;\n }\n .register-pannel .tuijian-info .name{\n     font-size: 17px;\n     color: #313131;\n }\n", "", {"version":3,"sources":["/./src/views/register-success.vue?c81b1f00"],"names":[],"mappings":";AAgCA;IACA,kBAAA;IACA,WAAA;CACA;AACA;IACA,WAAA;IACA,YAAA;IACA,qBAAA;CACA;AACA;IACA,WAAA;IACA,YAAA;CACA;AACA;IACA,eAAA;IACA,cAAA;IACA,mBAAA;IACA,eAAA;CACA;AACA;IACA,eAAA;YACA,cAAA;YACA,mBAAA;YACA,gBAAA;CACA;AACA;IACA,eAAA;IACA,cAAA;CACA;AACA;QACA,eAAA;gBACA,cAAA;gBACA,mBAAA;gBACA,gBAAA;KACA;CACA;aACA,eAAA;qBACA,cAAA;qBACA,mBAAA;qBACA,gBAAA;UACA;CACA;IACA,kBAAA;IACA,YAAA;EACA;;EAEA;KACA,cAAA;KACA,mBAAA;KACA,mBAAA;KACA,iCAAA;KACA,UAAA;EACA;CACA;;CAEA,aAAA;;CAEA,cAAA;;CAEA,mBAAA;;CAEA,mBAAA;;CAEA,SAAA;;CAEA,kBAAA;;CAEA,UAAA;;CAEA,mBAAA;;CAEA,2BAAA;;CAEA,mBAAA;;CAEA,uBAAA;EACA;CACA;KACA,sBAAA;KACA,YAAA;KACA,aAAA;KACA,iBAAA;KACA,gBAAA;EACA;CACA;KACA,gBAAA;KACA,iBAAA;EACA;CACA;KACA,sBAAA;KACA,gBAAA;KACA,eAAA;KACA,iBAAA;EACA;CACA;KACA,sBAAA;EACA;CACA;KACA,gBAAA;KACA,eAAA;EACA","file":"register-success.vue","sourcesContent":["<!--认证成功-->\n\n<template>\n    <div class='viewport'>\n        <div class='container'>\n            <div class='floor-item margin-t'>\n                <div class='success-pannel'><span class=\"success-icon\"><img src='/src/assets/i/success-icon.png' /></span></div>\n                <div class=\"success-tag\">注册成功</div>\n                <div class=\"success-tag2\">您的账户处于未认证状态无法使用系统查价购买等功能。</div>\n                <a href='#'><div class=\"success-tag3\">>>>点击前往认证平台完成认证<<<</div></a>\n                <div class=\"success-tag2\">认证费:<span class=\"authorized-change\">￥100</span></div>\n\n                 <div class=\"info\">\n                            <div class=\"info-container\">\n                                <span class=\"tuijian-pic\"><img src=\"/src/assets/i/role.png\"></span>\n                                <span class=\"tuijian-info\">\n                                    <span>推荐人</span>\n                                    <span class=\"name\">李老大</span>\n                                </span>\n                            </div>\n                        </div>\n            </div>\n            <div class='floor-item company-info'>\n                <div class=\"success-tag2\">产品名称或公司</div>\n                <div class=\"success-tag2\">@copyright</div>\n                <a href='#'><div class=\"success-tag4\">>>>跳过认证<<<</div></a>\n            </div>\n        </div>\n    </div>\n</template>\n\n<style>\n    .success-pannel{\n        text-align:center;\n        width:100%;\n    }\n    .success-icon{\n        width:80px;\n        height:80px;\n        display:inline-block;\n    }\n    .success-icon img{\n        width:100%;\n        height:auto;\n    }\n    .success-tag{\n        font-size:20px;\n        color:#42B445;\n        text-align: center;\n        margin-top:5px;\n    }\n    .success-tag2{\n        font-size:12px;\n                color:#A1A1A1;\n                text-align: center;\n                margin-top:10px;\n    }\n    .success-tag2 .authorized-change{\n        font-size:18px;\n        color:#F1730D;\n    }\n    .success-tag3{\n            font-size:15px;\n                    color:#5C5BF4;\n                    text-align: center;\n                    margin-top:50px;\n        }\n     .success-tag4{\n                 font-size:15px;\n                         color:#5C5BF4;\n                         text-align: center;\n                         margin-top:10px;\n             }\n     .company-info{\n        position:absolute;\n        bottom:10px;\n     }\n\n      .info {\n         height: 180px;\n         text-align: center;\n         position: relative;\n         border-bottom: solid 1px #B0B0B0;\n         margin: 0;\n     }\n     .register-pannel .info-container{\n\n     width: 125px;\n\n     height: 125px;\n\n     text-align: center;\n\n     position: absolute;\n\n     top: 50%;\n\n     margin-top: -66px;\n\n     left: 50%;\n\n     margin-left: -66px;\n\n     border: solid 10px #EDEDED;\n\n     border-radius: 3px;\n\n     vertical-align: middle;\n     }\n     .register-pannel .tuijian-pic{\n         display: inline-block;\n         width: 44px;\n         height: 44px;\n         overflow: hidden;\n         margin-top: 5px;\n     }\n     .register-pannel .tuijian-pic img{\n         max-width: 100%;\n         max-height: 100%;\n     }\n     .register-pannel .tuijian-info {\n         display: inline-block;\n         font-size: 15px;\n         color: #636363;\n         margin-top: -4px;\n     }\n     .register-pannel span.tuijian-info{\n         display: inline-block;\n     }\n     .register-pannel .tuijian-info .name{\n         font-size: 17px;\n         color: #313131;\n     }\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = "\n<div class='viewport'>\n    <div class='container'>\n        <div class='floor-item margin-t'>\n            <div class='success-pannel'><span class=\"success-icon\"><img src='/src/assets/i/success-icon.png' /></span></div>\n            <div class=\"success-tag\">注册成功</div>\n            <div class=\"success-tag2\">您的账户处于未认证状态无法使用系统查价购买等功能。</div>\n            <a href='#'><div class=\"success-tag3\">>>>点击前往认证平台完成认证<<<</div></a>\n            <div class=\"success-tag2\">认证费:<span class=\"authorized-change\">￥100</span></div>\n\n             <div class=\"info\">\n                        <div class=\"info-container\">\n                            <span class=\"tuijian-pic\"><img src=\"/src/assets/i/role.png\"></span>\n                            <span class=\"tuijian-info\">\n                                <span>推荐人</span>\n                                <span class=\"name\">李老大</span>\n                            </span>\n                        </div>\n                    </div>\n        </div>\n        <div class='floor-item company-info'>\n            <div class=\"success-tag2\">产品名称或公司</div>\n            <div class=\"success-tag2\">@copyright</div>\n            <a href='#'><div class=\"success-tag4\">>>>跳过认证<<<</div></a>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(83)
	__vue_script__ = __webpack_require__(85)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/views/register.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(86)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/yule/Code/weishang/client/src/views/register.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(84);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./register.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./register.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports
	
	
	// module
	exports.push([module.id, "\r\n.register-pannel .input-item{\r\n    margin: 30px 15px;\r\n    height: 40px;\r\n    line-height: 40px;\r\n}\r\n.register-pannel .input-item input{\r\n    height: 100%;\r\n    width:100%;\r\n    border-radius:5px;\r\n    border:solid 1px #AAAAAA;\r\n}\r\n.register-pannel .input-item .code-input{\r\n    width: 63%!important;\r\n    display: inline-block;\r\n}\r\n\r\n.register-pannel .code-btn{\r\n    margin-left:10px;\r\n    position:absolute;\r\n\r\n}\r\n.register-pannel .submit-btn{\r\n    width: 100%;\r\n    padding:0;\r\n}\r\n.register-pannel .info{\r\n    height: 180px;\r\n    text-align: center;\r\n    position: relative;\r\n    border-bottom: solid 1px #B0B0B0;\r\n    margin: 0;\r\n}\r\n.register-pannel .info-container{\r\n\r\nwidth: 125px;\r\n\r\nheight: 125px;\r\n\r\ntext-align: center;\r\n\r\nposition: absolute;\r\n\r\ntop: 50%;\r\n\r\nmargin-top: -66px;\r\n\r\nleft: 50%;\r\n\r\nmargin-left: -66px;\r\n\r\nborder: solid 10px #EDEDED;\r\n\r\nborder-radius: 3px;\r\n\r\nvertical-align: middle;\r\n}\r\n.register-pannel .tuijian-pic{\r\n    display: inline-block;\r\n    width: 44px;\r\n    height: 44px;\r\n    overflow: hidden;\r\n    margin-top: 5px;\r\n}\r\n.register-pannel .tuijian-pic img{\r\n    max-width: 100%;\r\n    max-height: 100%;\r\n}\r\n.register-pannel .tuijian-info {\r\n    display: inline-block;\r\n    font-size: 15px;\r\n    color: #636363;\r\n    margin-top: -4px;\r\n}\r\n.register-pannel span.tuijian-info{\r\n    display: inline-block;\r\n}\r\n.register-pannel .tuijian-info .name{\r\n    font-size: 17px;\r\n    color: #313131;\r\n}\r\n", "", {"version":3,"sources":["/./src/views/register.vue?6994396c"],"names":[],"mappings":";AAmFA;IACA,kBAAA;IACA,aAAA;IACA,kBAAA;CACA;AACA;IACA,aAAA;IACA,WAAA;IACA,kBAAA;IACA,yBAAA;CACA;AACA;IACA,qBAAA;IACA,sBAAA;CACA;;AAEA;IACA,iBAAA;IACA,kBAAA;;CAEA;AACA;IACA,YAAA;IACA,UAAA;CACA;AACA;IACA,cAAA;IACA,mBAAA;IACA,mBAAA;IACA,iCAAA;IACA,UAAA;CACA;AACA;;AAEA,aAAA;;AAEA,cAAA;;AAEA,mBAAA;;AAEA,mBAAA;;AAEA,SAAA;;AAEA,kBAAA;;AAEA,UAAA;;AAEA,mBAAA;;AAEA,2BAAA;;AAEA,mBAAA;;AAEA,uBAAA;CACA;AACA;IACA,sBAAA;IACA,YAAA;IACA,aAAA;IACA,iBAAA;IACA,gBAAA;CACA;AACA;IACA,gBAAA;IACA,iBAAA;CACA;AACA;IACA,sBAAA;IACA,gBAAA;IACA,eAAA;IACA,iBAAA;CACA;AACA;IACA,sBAAA;CACA;AACA;IACA,gBAAA;IACA,eAAA;CACA","file":"register.vue","sourcesContent":["<template>\r\n<div>\r\n    <div class=\"container register-pannel\">\r\n        <div class=\"input-item\">\r\n            <input v-model=\"user.mobile\" type=\"tel\" maxlength=\"11\" minlength=\"11\" placeholder=\"请输入您的手机号码\" id=\"phoneNumber\" />\r\n        </div>\r\n        <div class=\"input-item\">\r\n            <input v-model=\"user.code\" type=\"text\" placeholder=\"请输入验证码\" id=\"checkCode\" class=\"code-input\" />\r\n            <span class=\"btn code-btn\" id=\"getCode\" disabled=\"true\" @click=\"sendSMSVerify()\">获取验证码</span>\r\n        </div>\r\n        <div class=\"input-item\">\r\n            <input v-model=\"user.password\" type=\"password\" placeholder=\"请输入您的密码\"/>\r\n        </div>\r\n        <div class=\"input-item\">\r\n            <input v-model=\"user.tjr\" type=\"password\" placeholder=\"请再次输入您的密码\"/>\r\n        </div>\r\n        <div class=\"input-item info\">\r\n            <div class=\"info-container\">\r\n                <span class=\"tuijian-pic\"><img src=\"/src/assets/i/role.png\"></span>\r\n                <span class=\"tuijian-info\">\r\n                    <span>推荐人</span>\r\n                    <span class=\"name\">李老大</span>\r\n                </span>\r\n            </div>\r\n        </div>\r\n        <div class=\"input-item\">\r\n           <span class=\"btn submit-btn\" @click=\"login()\">注册</span>\r\n        </div>\r\n    </div>\r\n</div>\r\n</template>\r\n\r\n<script>\r\nimport api from '../api.js'\r\n\r\nexport default {\r\n    data () {\r\n        return {\r\n            user: {},\r\n        }\r\n    },\r\n    route: {\r\n        data ({ to }) {\r\n            // return api.user.regsiter()\r\n            //     .then(res => {\r\n            //         console.log(this.user);\r\n            //         return {\r\n            //             productions: res.rows,\r\n            //         }\r\n            //     }, err => {\r\n            //         console.log(err);\r\n            //         alert('接口错误');\r\n            //     })\r\n        }\r\n    },\r\n    methods: {\r\n        sendSMSVerify: function () {\r\n            console.log('obj');\r\n            if(!this.user.mobile) return;\r\n            api.user.sendSMSCode(this.user.mobile)\r\n                .then( res => {\r\n                    console.log(res);\r\n                }, error => {\r\n\r\n                })\r\n        },\r\n        login: function () {\r\n            console.log(this.user);\r\n            api.user.regsiter(this.user)\r\n                .then(res => {\r\n                    return {\r\n                        productions: res.rows,\r\n                    }\r\n                }, err => {\r\n                    console.log(err);\r\n                    alert('接口错误');\r\n                })\r\n        }\r\n    }\r\n}\r\n</script>\r\n\r\n<style>\r\n.register-pannel .input-item{\r\n    margin: 30px 15px;\r\n    height: 40px;\r\n    line-height: 40px;\r\n}\r\n.register-pannel .input-item input{\r\n    height: 100%;\r\n    width:100%;\r\n    border-radius:5px;\r\n    border:solid 1px #AAAAAA;\r\n}\r\n.register-pannel .input-item .code-input{\r\n    width: 63%!important;\r\n    display: inline-block;\r\n}\r\n\r\n.register-pannel .code-btn{\r\n    margin-left:10px;\r\n    position:absolute;\r\n\r\n}\r\n.register-pannel .submit-btn{\r\n    width: 100%;\r\n    padding:0;\r\n}\r\n.register-pannel .info{\r\n    height: 180px;\r\n    text-align: center;\r\n    position: relative;\r\n    border-bottom: solid 1px #B0B0B0;\r\n    margin: 0;\r\n}\r\n.register-pannel .info-container{\r\n\r\nwidth: 125px;\r\n\r\nheight: 125px;\r\n\r\ntext-align: center;\r\n\r\nposition: absolute;\r\n\r\ntop: 50%;\r\n\r\nmargin-top: -66px;\r\n\r\nleft: 50%;\r\n\r\nmargin-left: -66px;\r\n\r\nborder: solid 10px #EDEDED;\r\n\r\nborder-radius: 3px;\r\n\r\nvertical-align: middle;\r\n}\r\n.register-pannel .tuijian-pic{\r\n    display: inline-block;\r\n    width: 44px;\r\n    height: 44px;\r\n    overflow: hidden;\r\n    margin-top: 5px;\r\n}\r\n.register-pannel .tuijian-pic img{\r\n    max-width: 100%;\r\n    max-height: 100%;\r\n}\r\n.register-pannel .tuijian-info {\r\n    display: inline-block;\r\n    font-size: 15px;\r\n    color: #636363;\r\n    margin-top: -4px;\r\n}\r\n.register-pannel span.tuijian-info{\r\n    display: inline-block;\r\n}\r\n.register-pannel .tuijian-info .name{\r\n    font-size: 17px;\r\n    color: #313131;\r\n}\r\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _api = __webpack_require__(46);
	
	var _api2 = _interopRequireDefault(_api);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    data: function data() {
	        return {
	            user: {}
	        };
	    },
	
	    route: {
	        data: function data(_ref) {
	            // return api.user.regsiter()
	            //     .then(res => {
	            //         console.log(this.user);
	            //         return {
	            //             productions: res.rows,
	            //         }
	            //     }, err => {
	            //         console.log(err);
	            //         alert('接口错误');
	            //     })
	
	            var to = _ref.to;
	        }
	    },
	    methods: {
	        sendSMSVerify: function sendSMSVerify() {
	            console.log('obj');
	            if (!this.user.mobile) return;
	            _api2.default.user.sendSMSCode(this.user.mobile).then(function (res) {
	                console.log(res);
	            }, function (error) {});
	        },
	        login: function login() {
	            console.log(this.user);
	            _api2.default.user.regsiter(this.user).then(function (res) {
	                return {
	                    productions: res.rows
	                };
	            }, function (err) {
	                console.log(err);
	                alert('接口错误');
	            });
	        }
	    }
	};
	// </script>
	//
	// <style>
	// .register-pannel .input-item{
	//     margin: 30px 15px;
	//     height: 40px;
	//     line-height: 40px;
	// }
	// .register-pannel .input-item input{
	//     height: 100%;
	//     width:100%;
	//     border-radius:5px;
	//     border:solid 1px #AAAAAA;
	// }
	// .register-pannel .input-item .code-input{
	//     width: 63%!important;
	//     display: inline-block;
	// }
	//
	// .register-pannel .code-btn{
	//     margin-left:10px;
	//     position:absolute;
	//
	// }
	// .register-pannel .submit-btn{
	//     width: 100%;
	//     padding:0;
	// }
	// .register-pannel .info{
	//     height: 180px;
	//     text-align: center;
	//     position: relative;
	//     border-bottom: solid 1px #B0B0B0;
	//     margin: 0;
	// }
	// .register-pannel .info-container{
	//
	// width: 125px;
	//
	// height: 125px;
	//
	// text-align: center;
	//
	// position: absolute;
	//
	// top: 50%;
	//
	// margin-top: -66px;
	//
	// left: 50%;
	//
	// margin-left: -66px;
	//
	// border: solid 10px #EDEDED;
	//
	// border-radius: 3px;
	//
	// vertical-align: middle;
	// }
	// .register-pannel .tuijian-pic{
	//     display: inline-block;
	//     width: 44px;
	//     height: 44px;
	//     overflow: hidden;
	//     margin-top: 5px;
	// }
	// .register-pannel .tuijian-pic img{
	//     max-width: 100%;
	//     max-height: 100%;
	// }
	// .register-pannel .tuijian-info {
	//     display: inline-block;
	//     font-size: 15px;
	//     color: #636363;
	//     margin-top: -4px;
	// }
	// .register-pannel span.tuijian-info{
	//     display: inline-block;
	// }
	// .register-pannel .tuijian-info .name{
	//     font-size: 17px;
	//     color: #313131;
	// }
	// </style>
	/* generated by vue-loader */
	// <template>
	// <div>
	//     <div class="container register-pannel">
	//         <div class="input-item">
	//             <input v-model="user.mobile" type="tel" maxlength="11" minlength="11" placeholder="请输入您的手机号码" id="phoneNumber" />
	//         </div>
	//         <div class="input-item">
	//             <input v-model="user.code" type="text" placeholder="请输入验证码" id="checkCode" class="code-input" />
	//             <span class="btn code-btn" id="getCode" disabled="true" @click="sendSMSVerify()">获取验证码</span>
	//         </div>
	//         <div class="input-item">
	//             <input v-model="user.password" type="password" placeholder="请输入您的密码"/>
	//         </div>
	//         <div class="input-item">
	//             <input v-model="user.tjr" type="password" placeholder="请再次输入您的密码"/>
	//         </div>
	//         <div class="input-item info">
	//             <div class="info-container">
	//                 <span class="tuijian-pic"><img src="/src/assets/i/role.png"></span>
	//                 <span class="tuijian-info">
	//                     <span>推荐人</span>
	//                     <span class="name">李老大</span>
	//                 </span>
	//             </div>
	//         </div>
	//         <div class="input-item">
	//            <span class="btn submit-btn" @click="login()">注册</span>
	//         </div>
	//     </div>
	// </div>
	// </template>
	//
	// <script>

/***/ },
/* 86 */
/***/ function(module, exports) {

	module.exports = "\r\n<div>\r\n    <div class=\"container register-pannel\">\r\n        <div class=\"input-item\">\r\n            <input v-model=\"user.mobile\" type=\"tel\" maxlength=\"11\" minlength=\"11\" placeholder=\"请输入您的手机号码\" id=\"phoneNumber\" />\r\n        </div>\r\n        <div class=\"input-item\">\r\n            <input v-model=\"user.code\" type=\"text\" placeholder=\"请输入验证码\" id=\"checkCode\" class=\"code-input\" />\r\n            <span class=\"btn code-btn\" id=\"getCode\" disabled=\"true\" @click=\"sendSMSVerify()\">获取验证码</span>\r\n        </div>\r\n        <div class=\"input-item\">\r\n            <input v-model=\"user.password\" type=\"password\" placeholder=\"请输入您的密码\"/>\r\n        </div>\r\n        <div class=\"input-item\">\r\n            <input v-model=\"user.tjr\" type=\"password\" placeholder=\"请再次输入您的密码\"/>\r\n        </div>\r\n        <div class=\"input-item info\">\r\n            <div class=\"info-container\">\r\n                <span class=\"tuijian-pic\"><img src=\"/src/assets/i/role.png\"></span>\r\n                <span class=\"tuijian-info\">\r\n                    <span>推荐人</span>\r\n                    <span class=\"name\">李老大</span>\r\n                </span>\r\n            </div>\r\n        </div>\r\n        <div class=\"input-item\">\r\n           <span class=\"btn submit-btn\" @click=\"login()\">注册</span>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ }
]);
//# sourceMappingURL=app.js.map