'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home

		$scope.signup = function() {
			if($scope.select == "admin"){
			$scope.credentials.roles = ['admin'];
			}
			
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// And redirect to the index page

				$location.path('/#!/admin');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
		$scope.signin = function() {
			if ($scope.authentication.user) $location.path('/');
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);