'use strict';

describe ('Protractor sign in tests', function() {
	beforeEach(function() {
		browser.get('http://localhost:3000/#!/signin');
	});

	it('should successfully sign in test user', function() {
		
		element(by.name('username')).sendKeys('jimjohnson');

		element(by.name('password')).sendKeys('jimjohnson');


	});
});