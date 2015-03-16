module.exports = function(grunt) {
    var path = require('path');

    grunt.loadNpmTasks('grunt-contrib-compress')

    var localeInterfix = path.join('src','modules','core') + path.sep;

    var version = require('../version.js')();

    var libInterfix = path.join('dist',version) + path.sep;

    var versionFolder = path.join('dist',version);

    grunt.config('compress', {
        'ui-dashboard': {
            options :{
                archive : path.join(versionFolder,'ui-dashboard.zip')
            },
            files: [
                {
                    expand : true,
                    src : [path.join(versionFolder,'**'),'!'+path.join(versionFolder,'ui-dashboard.zip')]
                }
            ]
        }
    });

};
