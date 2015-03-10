define([
    'angular',
    'core/services/CommonResolveStateService',
    'angular-ui-router',

    'views/core/page-not-found'
],function(ng,CommonResolveStateService){

    var app = ng.module('CoreRouterApp',['ui.router']);

    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise(function($injector,$location){
                var path = $location.path();
                $location.replace().path('/page-not-found' + path);
            });
            $stateProvider
                .state('page-not-found', CommonResolveStateService({
                    url: '/page-not-found/{page}',
                    views: {
                        'main-content':{
                            template: TEMPLATES['views/core/page-not-found'](),
                            controller: 'PageNotFoundController',
                            resolve:{
                                page: ['$stateParams', function($stateParams){
                                  return $stateParams.page;
                                }]
                            }
                        }
                    }
                }));
    }]);
    return app;
});