define([
    'angular',
    'angular-local-storage'
], function(ng) {
    var app = ng.module('AppLocalStorage', ['LocalStorageModule']);
    return app;
});