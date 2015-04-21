'use strict';

var assert = require('assert');

var URL = {
	home : 				'http://localhost:3000/' + '#!/',
};

var TITLE = 'COE Event Tracker';

var f_click_event = function() {
	var events = element(by.binding('event.name'));
	//if (events.count() > 0) {
	events.click();
	//}
	//browser.executeScript('arguments[0].click()', events);
};

describe ('Home Page:', function() {
	beforeEach (function() {
		browser.get(URL.home);
	});
	
	it ('Click event', function() {
		browser.sleep(3000);
		f_click_event();
		expect(browser.getCurrentUrl()).not.toEqual(URL.home);
	});
});

