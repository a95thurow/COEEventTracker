'use strict';

describe ('Administration Sign In:', function() {
	var enter = browser.actions().sendKeys(protractor.Key.ENTER);
	var username = element(by.id('username'));
	var password = element(by.id('password'));
	var error = element(by.binding('error'));
	var signinURL;// = browser.getCurrentUrl();

	beforeEach(function() {
		browser.get('http://localhost:3000/#!/signin');
	});

	describe('No Credentials:', function() {
		username.clear();
		password.clear();

		enter.perform();

		it ('Page does not redirect.', function() {
			expect(browser.getCurrentUrl()).toEqual(signinURL);
		});

		it ('Displays no credentials error.', function() {
			expect(error.getText()).toEqual('Missing credentials');
		});
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