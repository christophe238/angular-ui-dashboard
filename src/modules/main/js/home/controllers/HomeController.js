define([
    'angular',
    'main/home/HomeApp'
], function(ng,HomeApp){

    HomeApp.controller('HomeController',['$rootScope','$scope','localeService',function($rootScope,$scope,localeService){
        $rootScope.displayToolbar = true;
        $scope.text = localeService.data.main.home;
        $scope.pages = {
        	gauge: {
                searchTerms:'',
                show:true,
        		expanded:false
        	},
        	bar : {
                searchTerms:'',
                show:true,
        		expanded:false
        	},
            donut : {
                searchTerms:'',
                show:true,
                expanded:false
            },
            pie : {
                searchTerms:'',
                show:true,
                expanded:false
            }
        }
    }]);

});