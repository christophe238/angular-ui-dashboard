define([
	'angular',
	'lodash',
	'main/home/HomeApp'
],function(angular,_,HomeApp){

	HomeApp.controller('PieChartController',['$scope','$timeout',function($scope,$timeout){
		$scope.config0 = {
			sort : 'ascending',
			slice : {
				click : function(d){
					console.log('Slice clicked : '+JSON.stringify(d));
					$scope.data0 = $scope.generateRandomArray(5);
					$scope.$apply();
					console.log('Data refreshed');
				}
			}
		};

		$scope.config1 = {
			colors : ['#4864AF','#7891D5','#E3EAFC','#DEDEDE','#EFEFEF']
		};

		$scope.data0 = [400,200,150,180,200];
		$scope.data1 = [124,4987,1900];

		$scope.miniPieConfiguration = {
			width : 50,
			height : 50, 
			radius : 20,
			border : {
				strokeWidth : 1
			},
			legend : {
				display : false
			},
			slice : {
				hover : {
					apply : false
				}
			}
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
		//$scope.refreshData();
	}]);
});