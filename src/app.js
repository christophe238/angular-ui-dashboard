define([
    'angular',
    'angular-route',
    'angular-ui-bootstrap',
    'angular-ui-router',

    'main/manifest',
    'core/manifest',
    'gauge/manifest'
],function(ng){

    var app = ng.module('app',[
        'ngRoute',
        'ui.router',
        'ui.bootstrap',
        'CoreApp',
        'HeaderApp',
        'GaugeApp',
        'HomeApp'
    ]);

    ng.element(document).ready(function () {
        ng.bootstrap(document, ['app']);
    });

});