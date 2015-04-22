'use strict';

describe('Create event page tests:', function() {
	var name = element(by.id('name'));
	var details = element(by.id('details'));
	var date = element(by.id('datepicker'));
	var time = element(by.id('time'));
	var point = element(by.id('point'));
	var eventURL;

	var enter =  browser.actions().sendKeys(protractor.Key.ENTER);

	beforeEach(function() {
		
	});

	it('should successfully create a new event and redirect', function() {
		browser.get('http://localhost:3000/#!/events/create');
		
		name.sendKeys('test')
		details.sendKeys('this is a test');
		date.sendKeys('01/01/2015');
		time.sendKeys('1212');
		point.sendKeys('0');

		eventURL = browser.getCurrentUrl();

		enter.perform();

		expect(browser.getCurrentUrl()).not.toEqual(eventURL);
	});
});