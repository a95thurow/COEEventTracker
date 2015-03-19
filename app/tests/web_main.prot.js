'use strict';

//var assert = require('assert');

var f_homebutton = function () {
	$('.navbar-brand').click();
}

describe ('Protractor front-end, web tests:', function() {
	describe ('Basic funcitonality:', function() {
		it ('Server connection', function() {
			browser.get('http://localhost:3000/');
			expect(browser.getTitle()).toEqual('COE Event Tracker');
		});
	});

	it ('Main Page:', function() {
		f_homebutton();
	});
});

