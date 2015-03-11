define([
    'angular',
    'main/home/HomeApp'
], function(ng,HomeApp){

    HomeApp.controller('HomeController',['$rootScope','$scope','$timeout','localeService',function($rootScope,$scope,$timeout,localeService){
        $rootScope.displayToolbar = true;
        $scope.text = localeService.data.main.home;
        $scope.pages = {
        	gauge: {
        		expanded:true
        	},
        	bar : {
        		expanded:false
        	}
        }
    }]);

});