'use strict';

var URL : {
	domain : 	'localhost:3000',
	URL_site : 	'http://' + domain + '/',

	admin : 			URL_site + '#!/admin',
	admin_attendance : 	URL_site + '#!/studentattendance',
	admin_create : 		URL_site + '#!/admins/create',
	admin_metrics : 	URL_site + '#!/metrics',
	admin_list : 		URL_site + '#!/admins',
	admin_login : 		URL_site + '#!/signin',
	admin_logout : 		URL_site + 'auth/signout',
	admin_passReset : 	URL_site + '#!/password/forgot',
	admin_password : 	URL_site + '#!/settings/password',
	admin_settings : 	URL_site + '#!/settings/profile',

	events : 			URL_site + '#!/events',
	events_create : 	URL_site + '#!/events/create',
	home : 				URL_site + '#!/',
	student_checkin : 	URL_site + '#!/checkin'
};

var TITLE : {
	home : 'COE Event Tracker'
};