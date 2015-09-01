'use strict';
var test = require('ava');
var getApi = require('../src');

test('no named main export', function (assert) {
	var mod = function () {};
	var api = getApi(mod);
	assert.is(api.methods.length, 1, 'one method should exist');
	assert.is(api.methods[0].name, '__MAIN_EXPORT__', 'with fallback name');
	assert.is(api.methods[0].params.length, 0, 'and no params');
	assert.end();
});

test('no named main export with options', function (assert) {
	var mod = function () {};
	var api = getApi(mod, {main: 'myModule'});
	assert.is(api.methods.length, 1, 'one method should exist');
	assert.is(api.methods[0].name, 'myModule', 'with options.main as name');
	assert.end();
});

test('named main export', function (assert) {
	var mod = function aModule() {};
	var api = getApi(mod);
	assert.is(api.methods.length, 1, 'one method should exist');
	assert.is(api.methods[0].name, 'aModule', 'with correct name');
	assert.is(api.methods[0].params.length, 0, 'and no params');
	assert.end();
});

test('named main export with options', function (assert) {
	var mod = function aModule() {};
	var api = getApi(mod, {main: 'myModule'});
	assert.is(api.methods.length, 1, 'one method should exist');
	assert.is(api.methods[0].name, 'aModule', 'with correct name despite options.main');
	assert.end();
});

test('no api', function (assert) {
	var mod = {};
	var api = getApi(mod);
	assert.is(api.methods.length, 0, 'no methods should exist');
	assert.end();
});

test('no main export', function (assert) {
	var mod = {
		fun1: function (a) {
			return a;
		}
	};
	var api = getApi(mod);
	assert.is(api.methods.length, 1, 'one method should exist');
	assert.is(api.methods[0].name, 'fun1', 'with correct name');
	assert.same(api.methods[0].params, ['a'], 'and params');
	assert.end();
});

test('both main export and other', function (assert) {
	var mod = function main() {};
	mod.fun1 = function (a) {
		return a;
	};
	var api = getApi(mod);
	assert.is(api.methods.length, 2, 'two methods should exist');
	assert.is(api.methods[0].name, 'main', 'with correct main');
	assert.is(api.methods[1].name, 'fun1', 'correct sub');
	assert.same(api.methods[0].params, [], 'main params');
	assert.same(api.methods[1].params, ['a'], 'and sub params');
	assert.end();
});

test('module exporting other than functions', function (assert) {
	var mod = function main() {};
	mod.num = 1;
	mod.bool = true;
	mod.str = 'hi';
	mod.re = /re/;
	mod.arr = [];
	var api = getApi(mod);
	assert.is(api.methods.length, 1, 'one method should exist');
	assert.is(api.methods[0].name, 'main', 'with correct name');
	assert.is(api.properties.length, 5, 'five properties should exists');
	var expectedProps = [
		{name: 'num', type: 'number', value: 1},
		{name: 'bool', type: 'boolean', value: true},
		{name: 'str', type: 'string', value: 'hi'},
		{name: 're', type: 'regexp', value: /re/},
		{name: 'arr', type: 'array', value: []}
	];
	assert.same(api.properties, expectedProps, 'with correct data');
	assert.end();
});
