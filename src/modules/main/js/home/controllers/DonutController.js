define([
	'angular',
	'lodash',
	'main/home/HomeApp'
],function(angular,_,HomeApp){

	HomeApp.controller('DonutController',['$scope','$timeout',function($scope,$timeout){
		$scope.config0 = {};

		$scope.config1 = {
			colors : ['#4864AF','#7891D5','#E3EAFC','#DEDEDE','#EFEFEF']
		};

		$scope.data0 = [400,200,150,180,200];
		$scope.data1 = [124,4987,1900];

		$scope.miniDonutConfiguration = {
			radius : 20,
			strokeWidth : 5
		}		

		$scope.generateRandomArray = function(size){
			var array = []
			for(var i = 0; i < size; i++){
				array.push(Math.floor(Math.random()*1000));
			}
			return array;
		};
		$scope.refreshData = function(){
			$timeout(function(){
				$scope.data0 = $scope.generateRandomArray(5);
				$scope.data1 = $scope.generateRandomArray(3);

				$scope.refreshData();
			},2500);
		};
		$scope.refreshData();
	}]);
});