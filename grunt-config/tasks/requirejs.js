var path = require('path');

module.exports = function(grunt) {
    var buildDir = require('../buildDir.js')();
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    var paths = {
        "main":"modules/main/js",
        "core":"modules/core/js",
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
        "d3": "lib/d3",
        "jade": "lib/jade",
        "jquery": "lib/jquery-2.1.3",
        "lodash": "lib/lodash",
        "polyglot": "lib/polyglot",
        "views": path.resolve('..',buildDir, 'tmp','views')
    };

    var src = 'src';
    var target = path.join('target', 'build', 'webapp');
    var pathToConfig = path.join('src', 'config', 'require.config.js');

    optimizeOptions = grunt.option('build-requirejs-optimize') || 'none';

    grunt.config('requirejs', {
        dev: {
            options: {
                name: 'app',
                optimize: 'none',
                baseUrl: 'src',
                paths: paths,
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
                paths: paths,
                mainConfigFile: 'src/config/require.config.js',
                out: 'target/build/webapp/app.js',
                include: ['lib/require.js','config/require.config.js']
            }
        }
    });
};
