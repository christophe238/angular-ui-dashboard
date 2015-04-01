define([
    'angular',
    'main/home/HomeApp'
], function(ng,HomeApp){

    HomeApp.controller('HomeController',['$rootScope','$scope','localeService',function($rootScope,$scope,localeService){
        $rootScope.displayToolbar = true;
        $scope.text = localeService.data.main.home;
        $scope.widgetFilter = '';
        $scope.pages = {
        	gauge: {
                searchTerms:['gauge','circular','tachometer','donut','multiple','single','widget'],
                show:true,
        		expanded:false
        	},
        	bar : {
                searchTerms:['gauge','bar','line','vertical','horizontal','widget'],
                show:true,
        		expanded:false
        	},
            donut : {
                searchTerms:['donut','pie','chart','multiple','drilldown','nested','widget'],
                show:true,
                expanded:false
            },
            pie : {
                searchTerms:['pie','chart','multiple','drilldown','nested','widget'],
                show:true,
                expanded:false
            },
            multi : {
                searchTerms:['multi','multiple','widget'],
                show:true,
                expanded:false
            }
        };

        $scope.filterFromSearch = function(){
            if($scope.widgetFilter !== ''){
                var searchTerms = $scope.widgetFilter.toLowerCase().split(' ');
                var result = true;
                _.each($scope.pages,function(page){
                    _.each(searchTerms,function(term){
                        _.each(page.searchTerms,function(key){
                            if(key.search(term) !== -1){
                                result = false;
                            }
                        });
                    });
                    page.show = !result;
                    result = true;
                });
            }
        };

        $scope.$watch('widgetFilter',function(newVal,oldval){
            if(newVal !== oldval){
                $scope.filterFromSearch();
            }
        });
    }]);

});