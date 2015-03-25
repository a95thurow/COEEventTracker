'use strict';

describe ('Protractor sign in tests', function() {
	var enter = browser.actions().sendKeys(protractor.Key.ENTER);
	var username = element(by.id('username'));
	var password = element(by.id('password'));
	var error = element(by.binding('error'));
	var signinURL;

	beforeEach(function() {
		browser.get('http://localhost:3000/#!/signin');
	});

	it('should not redirect upon incorrect login', function() {
		username.clear();
		password.clear();

		username.sendKeys('test');
		password.sendKeys('test');

		signinURL = browser.getCurrentUrl();

		enter.perform();

		expect(browser.getCurrentUrl()).toEqual(signinURL);
	});

	it('should display error message upon incorrect login', function() {
		username.clear();
		password.clear();

		username.sendKeys('test');
		password.sendKeys('test');

		enter.perform();

		expect(error.getText()).toEqual('Unknown user or invalid password');
	});

	it('should say missing credentials if a username field is left blank', function() {
		username.clear();
		password.clear();

		password.sendKeys('test');

		enter.perform();

		expect(error.getText()).toEqual('Missing credentials');
	});

	it('should say missing credentials if a password field is left blank', function() {
		username.clear();
		password.clear();

		username.sendKeys('test');

		enter.perform();

		expect(error.getText()).toEqual('Missing credentials');
	});

	it('should successfully sign in test user and redirect to home page', function() {

		username.clear();
		password.clear();
		
		username.sendKeys('jimjohnson');
		password.sendKeys('jimjohnson');

		signinURL = browser.getCurrentUrl();

		enter.perform();

		expect(browser.getCurrentUrl()).not.toEqual(signinURL);
	});
});
