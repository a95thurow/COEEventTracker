'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
<<<<<<< HEAD
    	$scope.posts = [
    	{title: 'Event one!', Details: 'These are awesome details'},
    	{title: 'Event two!', Details: 'Awesome Details 2'}
    	];
    	$scope.addevent = function(){
    		  posts.create({
    				title: $scope.title,
    				Details: $scope.Details,
 			  });
    		$scope.title = '';
    		$scope.Details = '';
    	}
	}
]);
<<<<<<< HEAD
=======

id1 = {
	studentID: '1234-5678'
};

id2 = {
	studentID: '8765-4321'
};
id3 = {
	studentID: '3847-3839'
};

var studentList = [id1,id2,id3];
$scope.studentList = studentList;
>>>>>>> origin/sprint-2
=======
        $scope.find = function() {
            $scope.events = Events.query();
        };

	}
]);
>>>>>>> 22e8ecb8172439689806405d1fb24763fc218988
