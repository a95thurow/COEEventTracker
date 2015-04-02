'use strict';

describe('Create event page tests:', function() {
	var name = element(by.id('name'));
	var details = element(by.id('details'));
	var date = element(by.id('datepicker'));
	var time = element(by.id('timepicker'));
	var point = element(by.id('point'));
	var eventURL;

	var enter =  browser.actions().sendKeys(protractor.Key.ENTER);

	beforeEach(function() {
		browser.get('http://localhost:3000/#!/signin');
		element(by.id('username')).sendKeys('jimjohnson');
		element(by.id('password')).sendKeys('jimjohnson');
		enter.perform();

		browser.get('http://localhost:3000/#!/events/create');
	});

	it('should successfully create a new event and redirect', function() {
		name.sendKeys('test')
		details.sendKeys('this is a test');
		date.sendKeys('010100');
		time.sendKeys('12:00am');
		point.sendKeys('0');

		eventURL = browser.getCurrentUrl();

		enter.perform();

		expect(browser.getCurrentUrl()).not.toEqual(eventURL);
	});
});