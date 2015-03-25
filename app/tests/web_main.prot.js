'use strict';

var assert = require('assert');

var f_homebutton = function () {
	$('.navbar-brand').click();
};

var f_adminbutton = function () {
	var buttons = element(by.css('.ng-scope')).all(by.linkText('Admin Page'));
	buttons.get(0).click();
};

describe ('Protractor front-end, web tests:', function() {

	describe ('Basic funcitonality:', function() {
		it ('Server connection', function() {
			browser.get('http://localhost:3000/');
			expect(browser.getTitle()).toEqual('COE Event Tracker');
			//assert.equal(browser.getTitle(), 'COE Event Tracker');
			//assert.equal(webdriver.getTitle(), 'COE Event Tracker');
		});
	});

	describe ('Page Testing:', function() {

		beforeEach(function() {
			browser.get('http://localhost:3000/');
		});

		it ('Main Page:', function() {
			f_homebutton();
		});

		it ('Admin Page', function() {
			f_homebutton();
			f_adminbutton();
		});
	});
});

