var path = require('path');

module.exports = function(grunt) {
    var buildDir = require('../buildDir.js')();
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    var version = require('../version.js')();
    function getPathWithLibFrom(version,type){
        return {
            "main":"modules/main/js",
            "core":"modules/core/js",
            "documentation":"modules/documentation/js",
            "download":"modules/download/js",
            "angular": "lib/angular",
            "angular-animate": "lib/angular-animate",
            "angular-cookies": "lib/angular-cookies",
            "angular-csp": "lib/angular-csp",
            "angular-loader": "lib/angular-loader",
            "angular-local-storage": "lib/angular-local-storage",
            "angular-messages": "lib/angular-messages",
            "angular-mocks": "lib/angular-mocks",
            "angular-resource": "lib/angular-resource",
            "angular-route": "lib/angular-route",
            "angular-sanitize": "lib/angular-sanitize",
            "angular-scenario": "lib/angular-scenario",
            "angular-touch": "lib/angular-touch",
            "angular-ui-bootstrap": "lib/ui-bootstrap-tpls-0.12.1",
            "angular-ui-router": "lib/angular-ui-router",
            "ui-dashboard": path.resolve('dist',version,'ui-dashboard'+type),
            "jade": "lib/jade",
            "jquery": "lib/jquery-2.1.3",
            "lodash": "lib/lodash",
            "polyglot": "lib/polyglot",
            "views": path.resolve('..',buildDir, 'tmp','views')
        };
    }

    var src = 'src';
    var target = path.join('target', 'build', 'webapp');
    var pathToConfig = path.join('src', 'config', 'require.config.js');

    optimizeOptions = grunt.option('build-requirejs-optimize') || 'none';

    var libBuildPaths = {
        "ui-dashboard":"modules/ui-dashboard",
        "common":"modules/ui-dashboard/common/js",
        "gauge":"modules/ui-dashboard/gauge/js",
        "donut-piechart":"modules/ui-dashboard/donut-piechart/js",
        "d3": "lib/d3",
        "angular": "lib/angular",
    };
    var libExcludeShallowFiles = [
        'ui-dashboard/js/manifest',
        'common/manifest',
        'donut-piechart/manifest',
        'gauge/manifest',
        'build-lib-init'
    ];
    grunt.config('requirejs', {
        dev: {
            options: {
                name: 'app',
                optimize: 'none',
                baseUrl: 'src',
                paths: getPathWithLibFrom(version,''),
                mainConfigFile: 'src/config/require.config.js',
                out: 'target/build/webapp/app.js',
                include: ['lib/require.js','config/require.config.js']
            }
        },
        production: {
            options: {
                name: 'app',
                optimize: 'uglify2',
                preserveLicenseComments: false,
                baseUrl: 'src',
                paths: getPathWithLibFrom('.latest','.min'),
                mainConfigFile: 'src/config/require.config.js',
                out: 'target/build/webapp/app.js',
                include: ['lib/require.js','config/require.config.js']
            }
        },
        'ui-dashboard-dev': {
            options: {
                name: 'build-lib-init',
                optimize: 'none',
                baseUrl: 'src',
                paths: libBuildPaths,
                preserveLicenseComments: true,
                logLevel : 1,
                keepAmdefine: true,
                skipModuleInsertion: true,
                exclude : [
                    'angular'
                ],
                excludeShallow: libExcludeShallowFiles,
                wrap : {
                    startFile : [
                        'LICENSE'
                    ]
                },
                out: 'dist/dev/ui-dashboard.js'
            }
        },
        'ui-dashboard': {
            options: {
                name: 'build-lib-init',
                optimize: 'none',
                baseUrl: 'src',
                paths: libBuildPaths,
                preserveLicenseComments: true,
                logLevel : 1,
                keepAmdefine: true,
                skipModuleInsertion: true,
                exclude : [
                    'angular'
                ],
                excludeShallow: libExcludeShallowFiles,
                wrap : {
                    startFile : [
                        'LICENSE'
                    ]
                },
                out: 'dist/'+version+'/ui-dashboard.js'
            }
        },
        'ui-dashboard-min': {
            options: {
                name: 'build-lib-init',
                baseUrl: 'src',
                paths: libBuildPaths,
                optimize: 'uglify2',
                preserveLicenseComments: true,
                logLevel : 1,
                keepAmdefine: true,
                skipModuleInsertion: true,
                exclude : [
                    'angular'
                ],
                excludeShallow: libExcludeShallowFiles,
                wrap : {
                    startFile : [
                        'LICENSE'
                    ]
                },
                out: 'dist/'+version+'/ui-dashboard.min.js'
            }
        }
    });
};
