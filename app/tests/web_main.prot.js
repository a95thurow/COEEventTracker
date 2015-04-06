'use strict';

var assert = require('assert');

var URL = {
	domain	: 'localhost:3000',
	site 	: 	'http://' + 'localhost:3000' + '/',

	admin : 			'http://localhost:3000/' + '#!/admin',
	admin_attendance : 	'http://localhost:3000/' + '#!/studentattendance',
	admin_create : 		'http://localhost:3000/' + '#!/admins/create',
	admin_metrics : 	'http://localhost:3000/' + '#!/metrics',
	admin_list : 		'http://localhost:3000/' + '#!/admins',
	admin_login : 		'http://localhost:3000/' + '#!/signin',
	admin_logout : 		'http://localhost:3000/' + 'auth/signout',
	admin_passReset : 	'http://localhost:3000/' + '#!/password/forgot',
	admin_password : 	'http://localhost:3000/' + '#!/settings/password',
	admin_settings : 	'http://localhost:3000/' + '#!/settings/profile',

	events : 			'http://localhost:3000/' + '#!/events',
	events_create : 	'http://localhost:3000/' + '#!/events/create',
	home : 				'http://localhost:3000/' + '#!/',
	student_checkin : 	'http://localhost:3000/' + '#!/checkin'
};

var TITLE = {
	home : 'COE Event Tracker'
};

var f_homebutton = function () {
	$('.navbar-brand').click();
};

var f_adminbutton = function () {
	var buttons = element(by.css('.ng-scope')).all(by.linkText('Admin Page'));
	buttons.get(0).click();
};

var f_click_signin = function() {
	var buttons = $$('.ng-scope').all(by.linkText('Sign In'));
	buttons.get(0).click();
}

describe ('Website Navigation:', function() {

	describe ('Anonymous User:', function() {

		describe ('Direct URL:', function() {

			beforeEach(function() {
				browser.driver.manage().deleteAllCookies();
				browser.refresh();
			});

			it ('Home Page', function() {
				browser.get(URL.home);
				expect(browser.getCurrentUrl()).toEqual(URL.home);
				expect(browser.getTitle()).toEqual(TITLE.home);
			});

			it ('Sign In', function() {
				browser.get(URL.admin_login);
				expect(browser.getCurrentUrl()).toEqual(URL.admin_login);
				expect(browser.getTitle()).toEqual(TITLE.home);
			});

			it ('Attendance', function() {
				browser.get(URL.admin_attendance);
				expect(browser.getCurrentUrl()).toEqual(URL.home);
			});

			it ('Events', function() {
				browser.get(URL.events);
				expect(browser.getCurrentUrl()).toEqual(URL.events);
			});

			it ('Admin', function() {
				browser.get(URL.admin);
				expect(browser.getCurrentUrl()).toEqual(URL.home);
			});
		});

		describe ('Link Navigation:', function () {

			describe ('Home Page:', function() {

				beforeEach(function() {
					browser.get(URL.home);
				});

				it ('-> Sign In', function() {
					f_click_signin();
					expect(browser.getCurrentUrl()).toEqual(URL.admin_login);
				});
			});
		});
	});
});

