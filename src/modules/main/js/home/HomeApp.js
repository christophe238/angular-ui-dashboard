define([
    'angular',
    'core/services/CommonResolveStateService',

    'views/main/home/home'
],function(ng, CommonResolveStateService){

    var app = ng.module('HomeApp',[]);

    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when('','/examples');
            $urlRouterProvider.when('#','/examples');
            $stateProvider
                .state('examples', CommonResolveStateService({
                    url: '/examples',
                    views: {
                        'main-content':{
                            template: TEMPLATES['views/main/home/home'],
                            controller: 'HomeController'
                        }
                    }
                }));
    }]);
    return app;
})