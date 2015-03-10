define([
    'main/header/HeaderApp'
],function(HeaderApp){

    HeaderApp.controller('HeaderController',['$rootScope','$scope','localeService',function($rootScope, $scope, localeService){
        localeService.resolve().then(function(locale){
            $scope.text = locale.data.main.header;
        });
    }]);
})