'use strict';

describe ('Administration Sign In:', function() {
	var enter = browser.actions().sendKeys(protractor.Key.ENTER);
	var username = element(by.id('username'));
	var password = element(by.id('password'));
	var error = element(by.binding('error'));
	var URL_signin = 'http://localhost:3000/#!/signin';
	var user_invalid = 'test';
	var user_valid = 'jimjohnson';
	var pass_invalid = 'test';
	var pass_valid = 'jimjohnson';

	beforeEach(function() {
		browser.get(URL_signin);
	});

	it ('No Credentials:', function() {
		username.clear();
		password.clear();

		enter.perform();
		browser.sleep(1000);

		// No page redirect
		expect(browser.getCurrentUrl()).toEqual(URL_signin);
		// Proper error message
		expect(error.getText()).toEqual('Missing credentials');
	});

	it ('Invalid Username Only:', function() {
		username.clear();
		password.clear();

		username.sendKeys(user_invalid);

		enter.perform();
		browser.sleep(1000);

		expect(browser.getCurrentUrl()).toEqual(URL_signin);
	});

	it('should display error message upon incorrect login', function() {
		username.clear();
		password.clear();

		username.sendKeys('test');
		password.sendKeys('test');

		enter.perform();
		browser.sleep(1000);		

		expect(error.getText()).toEqual('Unknown user or invalid password');
	});

	it('should say missing credentials if a username field is left blank', function() {
		username.clear();
		password.clear();

		password.sendKeys('test');

		enter.perform();
		browser.sleep(1000);

		expect(error.getText()).toEqual('Missing credentials');
	});

	it('should say missing credentials if a password field is left blank', function() {
		username.clear();
		password.clear();

		username.sendKeys('test');

		enter.perform();
		browser.sleep(1000);

		expect(error.getText()).toEqual('Missing credentials');
	});

	it('should successfully sign in test user and redirect to home page', function() {
		// No page redirect
		expect(browser.getCurrentUrl()).toEqual(URL_signin);
		// Proper error message
		expect(error.getText()).toEqual('Missing credentials');
	});

	it ('Invalid Password Only:', function() {
		username.clear();
		password.clear();

		password.sendKeys(pass_invalid);

		enter.perform();
		browser.sleep(1000);

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
		browser.sleep(1000);

		expect(browser.getCurrentUrl()).toEqual(URL_signin);
		expect(error.getText()).toEqual('Unknown user or invalid password');
	});

	it('Valid Username and Password', function() {

		username.clear();
		password.clear();
		
		username.sendKeys(user_valid);
		password.sendKeys(pass_valid);

		enter.perform();
		browser.sleep(1000);

		expect(browser.getCurrentUrl()).not.toEqual(URL_signin);
	});
});
