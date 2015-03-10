define([
    'angular',
    'core/app/AppLocalStorage'
], function(ng) {
    var app = ng.module('LocaleApp', ['AppLocalStorage']);
    return app;
});