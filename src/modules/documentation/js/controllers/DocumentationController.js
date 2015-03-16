define([
	'angular',
	'documentation/DocumentationApp',
],function(angular,DocumentationApp){

	DocumentationApp.controller('DocumentationController',['$scope','localeService','$location','$anchorScroll',function($scope,localeService,$location, $anchorScroll){
		$scope.text = localeService.data.documentation;

		$scope.currentHash = '';

		$scope.gotoHash = function(hash){
			$scope.currentHash = hash;
			$location.hash(hash);

			$anchorScroll();
		};
	}]);
});