module.exports = function(grunt) {
    var path = require('path');

    grunt.loadNpmTasks('grunt-contrib-compress')

    var localeInterfix = path.join('src','modules','core') + path.sep;

    var version = require('../version.js')();

    var libInterfix = path.join('dist',version) + path.sep;

    var versionFolder = path.join('dist',version);

    var files = grunt.file.expandMapping([
        path.join(versionFolder,'**')
        ], versionFolder, {
            rename: function(base, destPath) {
                var res = path.join(base, destPath);

                console.log("Compress : " + res + " copied");
                return res;
            }
        });
    grunt.config('compress', {
        'ui-dashboard': {
            options :{
                archive : path.join(versionFolder,'ui-dashboard-'+version+'.zip')
            },
            files: [
                {
                    expand : true,
                    src : path.join(versionFolder,'**')
                }
            ]
        }
    });

};
