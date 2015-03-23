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

	it('should not redirect upon incorrect login AND should display error message', function() {
		username.clear();
		password.clear();

		username.sendKeys('test');
		password.sendKeys('test');

		signinURL = browser.getCurrentUrl();

		enter.perform();

		expect(browser.getCurrentUrl()).toEqual(signinURL);
		expect(error.getText()).toEqual('Unknown user or invalid password');
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