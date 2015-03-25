'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.checkin = function() { //if a card is swiped, edit down to id only
<<<<<<< HEAD
<<<<<<< HEAD
			var id = document.getElementById('swipeufid').value;
			if (id.length > 8){
				document.getElementById('swipeufid').value = id.substring(4,12);
=======
			var id = document.getElementById("swipeufid").value;
			if (id.length > 8){
				document.getElementById("swipeufid").value = id.substring(4,12);
>>>>>>> origin/sprint-2
=======
			var id = document.getElementById("swipeufid").value;
			if (id.length > 8){
				document.getElementById("swipeufid").value = id.substring(4,12);
>>>>>>> c3c36972240af3ccc9c0be9f87705c43edad0fa6
			}
		};
	}
]);