'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);

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