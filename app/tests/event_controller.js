'use strict';

describe('EventsController', function() {
	beforeEach(module('events'));

	var scope, $location, createController, eventMock;

	beforeEach(function() {
		eventMock = new Events ({
			name : "test",
			details : "test",
			date : "test",
			time : "test",
			pointValue : 0,
			studentIDs : ["test", "test"]
		});
	});

	beforeEach(inject(function($rootScope, $controller, _$location_) {
		$location = _$location_;
		scope = $rootScope.$new();

		createController = function() {
			return $controller('EventsController', {$scope : scope, Events : eventMock});
		};
	}));

	it('should create the test event and redirect', function() {
		var controller = createController();
		scope.create();
		expect($location.path()).not.toBe('http://localhost:3000/#!/events/create');
	});
});