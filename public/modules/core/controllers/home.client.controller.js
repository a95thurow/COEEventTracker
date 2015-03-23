'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
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
