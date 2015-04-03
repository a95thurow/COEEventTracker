'use strict';

// Events controller
angular.module('events').controller('EventsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Events',
	function($scope, $stateParams, $location, Authentication, Events) {
		$scope.authentication = Authentication;
		$scope.checkin = function() { //if a card is swiped, edit down to id only
			var id = document.getElementById("swipeufid").value;
			if (id.length > 8){
				document.getElementById("swipeufid").value = id.substring(4,12);
				$scope.swipeufid = document.getElementById("swipeufid").value;
			}
		};
		// Create new Event
		$scope.create = function() {
			// Create new Event object
			var event = new Events ({
				name: this.name,
				details: this.details,
				date: this.date,
				time: this.time,
				pointValue: this.pointValue,
				studentIDs: this.studentIDs
			});

			// Redirect after save
			event.$save(function(response) {
				$location.path('events/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.details = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Event
		$scope.remove = function(event) {
			if ( event ) { 
				event.$remove();

				for (var i in $scope.events) {
					if ($scope.events [i] === event) {
						$scope.events.splice(i, 1);
					}
				}
			} else {
				$scope.event.$remove(function() {
					$location.path('events');
				});
			}
		};
			$scope.checkin = function() { //if a card is swiped, edit down to id only
			var id = document.getElementById("swipeufid").value;
			if (id.length > 8){
				document.getElementById("swipeufid").value = id.substring(4,12);
				$scope.swipeufid = document.getElementById("swipeufid").value;
				$scope.ids = document.getElementById("swipeufid").value;
			}
		};

		// Update existing Event
		$scope.update = function() {
			var event = $scope.event;
			event.$update(function() {
				$location.path('events/' + event._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		};
		$scope.shouldmargin = function(index, eventy){
			var events = eventy;
				var op = 0;
				console.log(index);
				for (var i = index; i >= 0; i--){
					console.log('made it');
					if(events[i].studentIDs > 5){
						console.log('here');
						op = i;
						console.log((op-index)* -1);
						return op* -1;
					}
				}
				
				
					return index;
		}
		$scope.average = function(){
			  var total = 0;
			  var numevents = 0;
    	for(var i = 0; i < $scope.events.length; i++){
        	var eventi = $scope.events[i];
        	total += (eventi.studentIDs.length);
        	numevents += 1;

    	}
    	return Math.round(total/numevents);
		};
		$scope.removeStudents = function(ufid){
			var event = $scope.event;

			console.log(ufid);
			var index = event.studentIDs.indexOf(ufid);
           
			console.log(ufid);



            if(ufid > -1){
            	event.studentIDs.splice(ufid, 1);
            }

            event.$update(function() {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});


		};

		$scope.addStudents = function(){

			var event = $scope.event;
			event.studentIDs.push({ufid: $scope.ids});
			event.$update(function() {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
				$scope.ids= '';
		};

		// Find a list of Events
		$scope.find = function() {
			$scope.events = Events.query();
		};

		// Find existing Event
		$scope.findOne = function() {
			$scope.event = Events.get({ 
				eventId: $stateParams.eventId
			});
		};
	}
]);