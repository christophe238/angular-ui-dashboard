define([
    'angular',
    'views/main/home/home',
    'core/services/CommonResolveStateService'
],function(ng,HomeApp,CommonResolveStateService){

    var app = ng.module('HomeApp',[]);

    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when('','/home');
            $urlRouterProvider.when('#','/home');
            $stateProvider
                .state('home', CommonResolveStateService({
                    url: '/home',
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