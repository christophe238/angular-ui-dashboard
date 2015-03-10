define([
    'angular',
    'main/home/HomeApp'
], function(ng,HomeApp){

    HomeApp.controller('HomeController',['$rootScope','$scope','$timeout','localeService',function($rootScope,$scope,$timeout,localeService){
        $rootScope.displayToolbar = true;
        $scope.text = localeService.data.main.home;

        $scope.formatLabel = function(value){
			return value;
        };

        $scope.gaugeConfiguration = {
        	max : 100,
        	history : 1,
        	radius : 90,
        	startAngle : -160,
        	endAngle : 160,
        	strokeWidth : 20,
        	label : {
        		format : $scope.formatLabel
        	}
        };

        $scope.data = 0;

        $timeout(function(){
        	$scope.data = 20;
        },2000);

        $timeout(function(){
        	$scope.data = 40;
        },3000);

        $timeout(function(){
        	$scope.data = 60;
        },4000);

        $timeout(function(){
        	$scope.data = 80;
        },5000);
    }]);

});