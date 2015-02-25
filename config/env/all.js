'use strict';

module.exports = {
	app: {
		title: 'test1',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css',
				'public/lib/angular-bootstrap-calendar/src/css/calendar.css',
				'public/lib/angular-bootstrap-calendar/docs/styles/main.css'


			],
			js: [
							'//cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js',

			    '//ajax.googleapis.com/ajax/libs/angularjs/1.3.5/angular.min.js',

				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/angular-bootstrap-calendar/src/app.js',

				'public/lib/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js',
				'public/lib/angular-bootstrap-calendar/src/services/calendarhelper.js',
				'public/lib/angular-bootstrap-calendar/src/directives/mwlcalendar.js',
				'public/lib/angular-bootstrap-calendar/src/directives/mwlcalendarday.js',
				'public/lib/angular-bootstrap-calendar/src/directives/mwlcalendarweek.js',
				'public/lib/angular-bootstrap-calendar/src/directives/mwlcalendarmonth.js',
				'public/lib/angular-bootstrap-calendar/src/directives/mwlcalendaryear.js',
				'public/lib/angular-bootstrap-calendar/src/services/moment.js',
				'public/lib/angular-bootstrap-calendar/src/services/calendarhelper.js',
				'public/lib/angular-bootstrap-calendar/src/filters/truncateEventTitle.js',
				'public/lib/angular-bootstrap-calendar/docs/scripts/controllers/main.js',
				'//cdn.jsdelivr.net/angular.bootstrap/0.12.0/ui-bootstrap-tpls.min.js',
				'public/lib/angular-bootstrap-calendar/src/filters/truncateEventTitle.js'




			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/core/*.js',
			'public/modules/users/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};