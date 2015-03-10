define([
    'core/CoreApp',
    'views/core/loading-dots'
],function(CoreApp){

    CoreApp.directive('loadingDots',function(){
        return {
            restrict: 'AE',
            template: TEMPLATES['views/core/loading-dots']()
        };
    });

});