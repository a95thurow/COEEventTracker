'use strict';

// Events controller
angular.module('events').controller('EventsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Events',
	function($scope, $stateParams, $location, Authentication, Events) {
		$scope.authentication = Authentication;
		var coolList = [];
		var REX_UF = /^;200(\d{8})01200[\d]*\?[\n\r]?$/;
		var REX_SF = /^%25501(\d{9}) \w*\?[\n\r]*$/;
		var REX_INVAL = /[^\d\s/\*\-\+\.]/;
		var REX_ONUM = /(\d)/;

		/**
		 * Alex Stewart
		 * Function to parse incoming strings into valid IDs
		 */
		$scope.parseToID = function(string) {

			// validate string existence and type
			if (string === null || typeof string != 'string') { return null; }
			
			// parse from UFID card string
			var id;
			id = REX_UF.exec(string, 'm');
			if (null !== id && 'undefined' !== typeof id[1]) {
				return id[1];
			}
			
			// parse from SFID card string
			id = REX_SF.exec(string, 'm');
			if (null !== id && 'undefined' !== typeof id[1]) {
				return id[1];
			}

			// otherwise, assume we are working with an manual entry
			// throw it out immediately, if it contains invalid characters
			id = REX_INVAL.exec(string);
			if (null !== id && id.length > 0) {
				return null;
			}
			
			// otherwise, pull out all of the digits
			id = string.match(/(\d)/g);
			if (null !== id && (id.length === 8 || id.length === 9)) {
				var ret = '';
				for (var i = 0; i < id.length; i++) {
					ret += id[i];
				}
				return ret;
			}
			
			// throw it out, still, if you don't pull out 8 OR 9 digits
			return null;
		};
		$scope.checkin = function() { //if a card is swiped, edit down to id only
			var id = parseToID(document.getElementById("swipeufid").value);
			if (id.length != 0){
				document.getElementById("swipeufid").value = id;
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
		// Deposed version
			/*$scope.checkin = function() { //if a card is swiped, edit down to id only
			var id = document.getElementById("swipeufid").value;
			if (id.length > 8){
				document.getElementById("swipeufid").value = id.substring(4,12);
				document.getElementById("swipeufid").value = document.getElementById("swipeufid").value.substring(0,4) + "-" + document.getElementById("swipeufid").value.substring(4,12);
				$scope.swipeufid = document.getElementById("swipeufid").value;
				$scope.ids = document.getElementById("swipeufid").value;
				if($scope.inList() == false){
				$scope.addStudents();
				}
			}
		};*/

		// Update existing Event
		$scope.update = function() {
			var event = $scope.event;
			event.$update(function() {
				$location.path('events/' + event._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		};
		$scope.timeCheck = function() {
			/*
				var currentdate = new Date(); 
			var datetime =  (currentdate.getMonth()+1)  + "/"
                + currentdate.getDate()  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":";
             if(currentdate.getMinutes() < 10)
			*/
			var time = $scope.timie;
			console.log(time);
		};
		$scope.isAdmin = function(){
			if ($scope.authentication.user.roles){
				if($scope.authentication.user.roles.indexOf("admin") > -1){
					return true;
				}
			}
			return false;
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
		$scope.eventDisplay = function(){
			var evs = [];
			for(var i = 0; i < $scope.events.length; i++){
        	var eventi = $scope.events[i];
        	if(eventi.studentIDs.length != 0){
        		evs.push($scope.events[i]);
        	}

    	}
    		return evs;
		};
			$scope.calendar = function(){
           var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var calendar = $('#calendar').fullCalendar({
                editable: false,
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                });
        };
                

  		$scope.dateMin = function(){

  			$( "#datepicker" ).datepicker({ minDate: 0 });
  		};
  		
	$scope.futureevents = function(){
		 var array = new Array();
		 var events = $scope.events;
		 var rightnow = new Date();
		 var number = events.length;
		 for(var i = 0; i < number; ++i){
		 	var a = Date.parse(events[i].date);
		 	
		 	var b = Date.parse(rightnow);
		 	
		 	if(a >= b){
		 		array.push(events[i]);
		 		
		 	}
		    
		 }
		 console.log(array);
		 return array;

	};
		$scope.average = function(){
			  var total = 0;
			  var numevents = 0;
    	for(var i = 0; i < $scope.events.length; i++){
        	var eventi = $scope.events[i];
        	if(eventi.studentIDs.length != 0){
        	total += (eventi.studentIDs.length);

        	numevents += 1;
        	}

    	}
    	return Math.round(total/numevents);
		};
		
		$scope.max = function() {
			var max = 0;
			for (var i = 0; i < $scope.events.length; i++) {
				var att = $scope.events[i].studentIDs.length;
				if (att > max) {
					max = att;
				}
			}
			return max;
		};
		
		$scope.percOfMax = function(att, max) {
			return att/max*100;
		};
		
		$scope.removeStudents = function(ufid){
			var event = $scope.event;

			console.log(ufid);
			var index = event.studentIDs.indexOf(ufid);
           console.log(index);
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
			if($scope.inList() == true){
				$scope.ids= '';
				return null;
			}
			event.studentIDs.push({ufid: $scope.ids, time: $scope.getTime(), peerFirst: $scope.authentication.user.firstName, peerLast: $scope.authentication.user.lastName});
			event.$update(function() {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
				$scope.ids= '';
		};
		$scope.inList = function(){
				var event = $scope.event;
			for(var i = 0; i < event.studentIDs.length; ++i){
				if ($scope.ids == event.studentIDs[i].ufid){
					return true;
				}
			}
			return false;
		};
		$scope.inListTwo = function(list, el){
				var event = list;
			for(var i = 0; i < event.length; ++i){
				if (el == event[i].ufid){
					return i;
				}
			}
			return -1;
		};
		$scope.listPoints = function(){
			var events = $scope.events;
			var pointies = [];
			for(var i = 0; i < events.length; ++i){
				var ev = events[i];
				for(var j = 0; j < ev.studentIDs.length; ++j){
					if($scope.inListTwo(pointies,ev.studentIDs[j].ufid) < 0){
						pointies.push({ufid: ev.studentIDs[j].ufid, points: ev.pointValue});
					}
					else{
						pointies[$scope.inListTwo(pointies,ev.studentIDs[j].ufid)].points += ev.pointValue;
					}
				}
			}
			pointies = pointies.sort(function(a, b) {return b.points - a.points});
			coolList = pointies;
			return pointies;
		};
		//Found and modified this for our site
		$scope.mode = function(){
		var Happenings = $scope.events;
		var maxEl = 0;
		var modeMap = {};
		var maxCount = 1;
		for(var i = 0; i < Happenings.length; ++i){
			var array = Happenings[i].studentIDs;
			if(i == 0){
		    maxEl = array[0];
			}	
		    for(var j = 0; j < array.length; j++)
		    {
		    	var el = array[j];
		    	if(modeMap[el] == null)
		    		modeMap[el] = 1;
		    	else
		    		modeMap[el]++;	
		    	if(modeMap[el] > maxCount)
		    	{
		    		maxEl = el;
		    		maxCount = modeMap[el];
		    	}
		    }
		    
		
		}
		return maxEl.ufid;
	};

	$scope.getInfo = function(){
		var stu = $scope.searchy;
		var Happenings = $scope.events;
		var points = 0;
		for(var i = 0; i < Happenings.length; i++){
			var array = Happenings[i].studentIDs;
		    for(var j = 0; j < array.length; j++)
		    {
		    	if(stu === array[j].ufid){
		    		if(Happenings[i].pointValue > 0){
		    		j = array.length;
		    		points += Happenings[i].pointValue;	
		    		}
		    	}
			}
		    
		}
		    
		
		
		return points;
	};

		$scope.getTime = function(){
			var currentdate = new Date(); 
			var datetime =  (currentdate.getMonth()+1)  + "/"
                + currentdate.getDate()  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":";
             if(currentdate.getMinutes() < 10){
  	           datetime = datetime + "0" + currentdate.getMinutes();

                }
                else{
                	datetime = datetime + currentdate.getMinutes();
        		}
              return datetime;
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