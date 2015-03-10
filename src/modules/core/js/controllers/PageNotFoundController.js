define([
    'core/app/CoreRouterApp'
],function(CoreRouterApp){

    CoreRouterApp.controller('PageNotFoundController',['$rootScope','$scope','localeService','page',function($rootScope,$scope,localeService,page){

        $rootScope.displayToolbar = false;
        $scope.text  = localeService.data.core.pageNotFound;
        $scope.text.pageMessage = localeService.translate('core.pageNotFound.pageMessage',null,{page:page});
    }]);
});