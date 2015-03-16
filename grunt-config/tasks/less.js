
module.exports = function(grunt) {
    var path = require('path');
    grunt.loadNpmTasks('grunt-contrib-less');

    var buildDir = require('../buildDir.js')();
    var pathInterfix = path.join('src', 'less') + path.sep;

    var dest = path.join(buildDir, 'css');
    var files = grunt.file.expandMapping([
        path.join('src','less','all.less')
        ], dest, {
          rename: function(base, destPath) {
            var res = path.join(base, destPath.replace(/\.less$/, '.css'));
            res = res.replace(pathInterfix, '');
            console.log("less : " + res + " compiled");
            return res;
          }
        });

    grunt.config('less', {
        dev: {
            options: {
                compress: false,
                sourceMap: false,
                strictImports: true
            },
            files: files
        },
        production: {
            options: {
                compress: true,
                sourceMap: false,
                strictImports: true,
                optimization: 5
            },
            files: files
        }
    });

};
