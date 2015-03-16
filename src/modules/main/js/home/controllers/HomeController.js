define([
    'angular',
    'main/home/HomeApp'
], function(ng,HomeApp){

    HomeApp.controller('HomeController',['$rootScope','$scope','localeService',function($rootScope,$scope,localeService){
        $rootScope.displayToolbar = true;
        $scope.text = localeService.data.main.home;
        $scope.pages = {
        	gauge: {
        		expanded:false
        	},
        	bar : {
        		expanded:false
        	}
        }
    }]);

});