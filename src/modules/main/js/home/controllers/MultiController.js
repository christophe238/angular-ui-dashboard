define([
	'angular',
	'main/home/HomeApp'
],function(ng,HomeApp){

	HomeApp.controller('MultiController',['$scope','$timeout',function($scope,$timeout){
		$scope.gaugeConf = {
			type: 'circular-gauge'			
		};
		$scope.donutConf = {
			type: 'donut'
		};
		$scope.pieConf = {
			type: 'pie-chart'
		};

		$scope.gaugeData = 0;
		$scope.donutData = [100,200,300];
		$scope.pieData = [100,200,300];

		$scope.multi = {
			expanded : true,
			code : {
				expanded : false
			}
		};

		$scope.miniConfiguration = [];
		$scope.configurations = [$scope.gaugeConf,$scope.donutConf,$scope.pieConf];
		$scope.data = [$scope.gaugeData,$scope.donutData,$scope.pieData];

		$scope.generateRandomArray = function(size){
            var array = []
            for(var i = 0; i < size; i++){
                array.push(Math.floor(Math.random()*300));
            }
            return array;
        };

		$scope.updateData = function(){
            $timeout(function(){
                $scope.gaugeData = Math.floor(Math.random()*100);
                $scope.donutData = $scope.generateRandomArray(3);
                $scope.pieData = $scope.generateRandomArray(3);
                $scope.data = [$scope.gaugeData,$scope.donutData,$scope.pieData];
                $scope.updateData();
            },2500);
        };

        $scope.updateData();
 	}]);
});