'use strict';

var assert = require('assert');

describe('Protractor front-end, web tests:', function() {
	describe('Basic funcitonality:', function() {
		it ('Server connection', function() {
			browser.get('http://localhost:3000/');
		});
	});
});