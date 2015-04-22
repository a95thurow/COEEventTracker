'use strict';

describe ('Administrator Sign In:', function() {
	var enter = browser.actions().sendKeys(protractor.Key.ENTER);
	var username = element(by.id('username'));
	var password = element(by.id('password'));
	var error = element(by.binding('error'));
	var URL_signin = 'http://localhost:3000/#!/signin';
	var URL_signout = 'http://localhost:3000/auth/signout';
	var user_invalid = 'test';
	var user_valid = 'administrator';
	var pass_invalid = 'test';
	var pass_valid = 'administrator';

	beforeEach(function() {
		browser.get(URL_signout);
		browser.get(URL_signin);
	});

	it ('Valid Only:', function() {
		username.clear();
		password.clear();

		username.sendKeys(user_valid);

		enter.perform();

		// No page redirect
		expect(browser.getCurrentUrl()).toEqual(URL_signin);
		// Proper error message
		expect(error.getText()).toEqual('Missing credentials');
	});

	it ('Valid Password Only:', function() {
		username.clear();
		password.clear();

		password.sendKeys(pass_valid);

		enter.perform();

		// No page redirect
		expect(browser.getCurrentUrl()).toEqual(URL_signin);
		// Proper error message
		expect(error.getText()).toEqual('Missing credentials');
	});

	it('Invalid Username and Password', function() {
		username.clear();
		password.clear();

		username.sendKeys(user_invalid);
		password.sendKeys(pass_invalid);

		enter.perform();

		expect(browser.getCurrentUrl()).toEqual(URL_signin);
		expect(error.getText()).toEqual('Unknown user or invalid password');
	});

	it('Valid Username and Password', function() {

		username.clear();
		password.clear();
		
		username.sendKeys(user_valid);
		password.sendKeys(pass_valid);

		enter.perform();

		expect(browser.getCurrentUrl()).not.toEqual(URL_signin);
	});
});