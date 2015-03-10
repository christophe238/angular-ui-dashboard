/*global requirejs*/
requirejs.config({

    baseUrl: 'src',
    
    waitSeconds: 120,

    deps: ['app'],

    //enforceDefine: true,

    wrapShim: true,

    shim: {
        jquery: {
            exports: 'jQuery'
        },
        lodash: {
            exports: '_'
        },
        angular: {
            exports: 'angular',
            deps: ['jquery']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-cookies': {
            deps: ['angular']
        },
        'angular-csp': {
            deps: ['angular']
        },
        'angular-loader': {
            deps: ['angular']
        },
        'angular-local-storage': {
            deps: ['angular']
        },
        'angular-mocks': {
            deps: ['angular']
        },
        'angular-messages': {
            deps: ['angular']
        },
        'angular-resource': {
            deps: ['angular']
        },        
        'angular-route': {
            deps: ['angular']
        },
        'angular-sanitize': {
            deps: ['angular']
        },
        'angular-scenario': {
            deps: ['angular']
        },
        'angular-touch': {
            deps: ['angular']
        },
        'angular-ui-bootstrap': {
            deps: ['angular']
        },
        'angular-ui-router': {
            deps: ['angular']
        },                
        'd3': {
            exports: 'd3'
        },
        polyglot: {
            exports: 'Polyglot'
        }
    }

});
