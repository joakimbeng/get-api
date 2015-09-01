'use strict';
var functionParams = require('function-params');
var kindOf = require('kindof');

module.exports = function getApi(mod, opts) {
	opts = opts || {};
	var api = {
		methods: [],
		properties: []
	};
	if (typeof mod === 'function') {
		api.methods.push(fnToData(mod.name || opts.main || '__MAIN_EXPORT__', mod));
	}
	Object.keys(mod).forEach(function (name) {
		if (typeof mod[name] === 'function') {
			api.methods.push(fnToData(name, mod[name]));
		} else {
			api.properties.push(propToData(name, mod[name]));
		}
	});
	return api;
};

function fnToData(name, fn) {
	return {name: name, params: getParamsForMethod(fn), content: fn.toString()};
}

function propToData(name, prop) {
	return {name: name, type: kindOf(prop), value: prop};
}

function getParamsForMethod(method) {
	var params = functionParams(method);
	if (params.length !== method.length) {
		if (params.length < method.length) {
			for (var i = params.length; i < method.length; i++) {
				params.push('param' + i);
			}
		} else if (params.length > method.length) {
			params = params.slice(0, method.length);
		}
	}
	return params;
}
