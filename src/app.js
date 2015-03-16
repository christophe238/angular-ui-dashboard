define([
    'angular',
    'angular-route',
    'angular-ui-bootstrap',
    'angular-ui-router',
    'ui-dashboard',

    'main/manifest',
    'core/manifest',
    'download/manifest',
    "documentation/manifest"
],function(ng){

    var app = ng.module('app',[
        'ngRoute',
        'ui.router',
        'ui.bootstrap',
        'ui.dashboard',
        'CoreApp',
        'HeaderApp',
        'HomeApp',
        'DownloadApp',
        'DocumentationApp'
    ]);

    ng.element(document).ready(function () {
        ng.bootstrap(document, ['app']);
    });

});