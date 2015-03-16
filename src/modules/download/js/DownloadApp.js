define([
	'angular',
	'core/services/CommonResolveStateService',

	'views/download/download'
],function(angular, CommonResolveStateService){

	var app = angular.module('DownloadApp',[]);

	app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('downloads', CommonResolveStateService({
                    url: '/downloads',
                    views: {
                        'main-content':{
                            template: TEMPLATES['views/download/download'],
                            controller: 'DownloadController'
                        }
                    }
                }));
    }]);
	return app;
});