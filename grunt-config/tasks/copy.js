module.exports = function(grunt) {
    var path = require('path');
    grunt.loadNpmTasks('grunt-contrib-copy')

    var buildDir = require('../buildDir.js')();

    var dest = path.join(buildDir);

    var localeInterfix = path.join('src','modules','core') + path.sep;
    var files = grunt.file.expandMapping([
        path.join('assets','img','*'),
        path.join('fonts','*'),
        path.join('src','modules','core','locale','*')
        ], dest, {
            rename: function(base, destPath) {
                var res = path.join(base, destPath);

                res = res.replace(localeInterfix,'');

                console.log("copy : " + res + " copied");
                return res;
            }
        });

    var version = require('../version.js')();

    var libInterfix = path.join('dist',version) + path.sep;

    function getLibFilesInto(folder){
        return grunt.file.expandMapping([
            path.join('dist',version,'*')
            ], path.join('dist',folder), {
                rename: function(destPath, base) {
                    var res = path.join(destPath, base.replace(libInterfix,''));
                    res = res.replace(libInterfix,'');
                    console.log("copy : " + res + " copied");
                    return res;
                }
        });
    }
    grunt.config('copy', {
        dev: {
            files: files
        },
        production: {
            files: files
        },
        'ui-dashboard': {
            files: getLibFilesInto('.latest')
        },
        'ui-dashboard-dev': {
            files: getLibFilesInto('dev')
        }
    });

};
