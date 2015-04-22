'use strict';

var assert = require('assert');

var URL = {
	domain	: 'localhost:3000',
	site 	: 	'http://' + 'localhost:3000' + '/',

	admin : 			'http://localhost:3000/' + '#!/admin',
	admin_attendance : 	'http://localhost:3000/' + '#!/studentattendance',
	admin_create : 		'http://localhost:3000/' + '#!/signup',
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
};

var TITLE = {
	home : 'COE Event Tracker'
};

var f_click_home = function () {
	$('.navbar-brand').click();
};

var f_click_signin = function() {
	var buttons = $$('.ng-scope').all(by.linkText('Sign In'));
	buttons.get(0).click();
};

describe ('Anonymous User Navigation:', function() {

	describe ('Direct URL:', function() {

		beforeEach(function() {
			browser.get(URL.admin_logout);
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
		
		it ('Admin List (blocked)', function() {
			browser.get(URL.admin_list);
			expect(browser.getCurrentUrl()).toEqual(URL.home);
		});

		it ('Attendance (blocked)', function() {
			browser.get(URL.admin_attendance);
			expect(browser.getCurrentUrl()).toEqual(URL.home);
		});
		
		it ('Admin Profile (blocked)', function() {
			browser.get(URL.admin_settings);
			expect(browser.getCurrentUrl()).toEqual(URL.home);
		});
		
		it ('Admin Password (blocked)', function() {
			browser.get(URL.admin_password);
			expect(browser.getCurrentUrl()).toEqual(URL.home);
		});
	});

	describe ('Link Navigation:', function () {

		describe ('Home Page:', function() {

			beforeEach(function() {
				browser.get(URL.home);
			});
			
			it ('-> Home', function() {
				f_click_home();
				expect(browser.getCurrentUrl()).toEqual(URL.home);
			});
			
			it ('-X-> Admin Page', function() {
				expect(element(by.linkText('Admin Page')).isPresent()).toEqual(false);
			});

			it ('-> Sign In', function() {
				f_click_signin();
				expect(browser.getCurrentUrl()).toEqual(URL.admin_login);
			});
		});
		
		describe ('Sign In Page:', function() {
			beforeEach(function() {
				browser.get(URL.admin_login);
			});
			
			it ('-> Home', function() {
				f_click_home();
				expect(browser.getCurrentUrl()).toEqual(URL.home);
			});
			
			it ('-> Sign In', function() {
				f_click_signin();
				expect(browser.getCurrentUrl()).toEqual(URL.admin_login);
			});
			
			it ('-> Forgot Password', function() {
				element(by.linkText('Forgot password?')).click();
				expect(browser.getCurrentUrl()).toEqual(URL.admin_passReset);
			});
		});
	});
});

