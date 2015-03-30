'use strict';

var assert = require('assert');

var URL_domain = 'localhost:3000';
var URL_site = 'http://' + URL_domain + '/';

var URL_admin = URL_site + '#!/admin';
var URL_admin_attendance = URL_site + '#!/studentattendance';
var URL_admin_create = URL_site + '#!/admins/create';
var URL_admin_metrics = URL_site + '#!/metrics';
var URL_admin_list = URL_site + '#!/admins';
var URL_admin_login = URL_site + '#!/signin';
var URL_admin_logout = URL_site + 'auth/signout';
var URL_admin_passReset = URL_site + '#!/password/forgot';
var URL_admin_password = URL_site + '#!/settings/password';
var URL_admin_settings = URL_site + '#!/settings/profile';

var URL_events = URL_site + '#!/events';
var URL_events_create = URL_site + '#!/events/create';
var URL_home = URL_site + '#!/';
var URL_student_checkin = URL_site + '#!/checkin';

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

