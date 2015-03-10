define([
    'angular'
],function(ng){

    var app = ng.module('CoreApp',[
        'AppLocalStorage',
        'CoreRouterApp',
        'LocaleApp'
    ]);

    return app;
});