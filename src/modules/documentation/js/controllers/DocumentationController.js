define([
	'angular',
	'documentation/DocumentationApp',
],function(angular,DocumentationApp){

	DocumentationApp.controller('DocumentationController',['$scope','localeService','$location','$anchorScroll',function($scope,localeService,$location, $anchorScroll){
		$scope.text = localeService.data.documentation;

		$scope.currentHash = '';

		$scope.gauge = {
			template: '<circular-gauge configuration="YOUR_CONFIGURATION_OBJECT" data="YOUR_2_WAY_BOUND_DATA"></circular-gauge>'			
		};

		$scope.stringify = function(json){
			return JSON.stringify(json,null,4);
		}
		$scope.gotoHash = function(hash){
			$scope.currentHash = hash;
			$location.hash(hash);

			$anchorScroll();
		};
	}]);
});