define([
	'angular',
    'core/services/CommonResolveStateService',
    'views/documentation/documentation'
],function(angular,CommonResolveStateService){

	var app = angular.module('DocumentationApp',[]);

	app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('docs', CommonResolveStateService({
                    url: '/docs',
                    views: {
                        'main-content':{
                            template: TEMPLATES['views/documentation/documentation'],
                            controller: 'DocumentationController'
                        }
                    }
                }))
                .state('docs.setup', {
                    url: '/docs#setup',
                    onEnter: function () {}
                });
    }]);
	return app;
});