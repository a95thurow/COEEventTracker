'use strict';

var assert = require('assert');

var URL_site = 'http://localhost:3000/';
var URL_admin = 'http://localhost:3000/#!/admin';
var URL_admin_create = 'http://localhost:3000/#!/admins/create';
var URL_admin_list = 'http://localhost:3000/#!/admins';
var URL_events = 'http://localhost:3000/#!/events';
var URL_events_create = 'http://localhost:3000/#!/events/create';
var URL_home = 'http://localhost:3000/#!/';
var URL_signin = 'http://localhost:3000/#!/signin';
var URL_user_logout = 'http://localhost:3000/auth/signout';
var URL_usr_password = 'http://localhost:3000/#!/settings/password';
var URL_user_settings = 'http://localhost:3000/#!/settings/profile';

var TITLE_home = 'COE Event Tracker';


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

	describe ('Basic funcitonality:', function() {
		it ('Server connection', function() {
			browser.get('http://localhost:3000/');
			expect(browser.getTitle()).toEqual('COE Event Tracker');
			//assert.equal(browser.getTitle(), 'COE Event Tracker');
			//assert.equal(webdriver.getTitle(), 'COE Event Tracker');
		});
	});
describe ('Website Navigation:', function() {

	describe ('Anonymous User:', function() {

		describe ('Direct URL:', function() {

			it ('Site Redirection', function() {
				browser.get(URL_site);
				expect(browser.getCurrentUrl()).toEqual(URL_home);
				expect(browser.getTitle()).toEqual(TITLE_home);
			})

			it ('Home Page', function() {
				browser.get(URL_home);
				expect(browser.getCurrentUrl()).toEqual(URL_home)
				expect(browser.getTitle()).toEqual(TITLE_home);
			});

			it ('Sign In', function() {
				browser.get(URL_signin);
				expect(browser.getCurrentUrl()).toEqual(URL_signin);
				expect(browser.getTitle()).toEqual(TITLE_home);
			});
		});

		describe ('Link Navigation:', function () {

			describe ('Home Page:', function() {

				beforeEach(function() {
					browser.get(URL_site);
				});

				it ('-> Sign In', function() {
					f_click_signin();
					expect(browser.getCurrentUrl()).toEqual(URL_signin);
				});
			});
		});
	});
});

