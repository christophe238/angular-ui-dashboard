var path = require('path');

var PATH = {
    ROOT: path.join(__dirname)
};

PATH.NODE_PACKAGE = path.resolve(path.join(PATH.ROOT, '..', 'node_package'));

module.exports = function(grunt) {
    grunt.loadTasks('grunt-config/tasks');

    try {
        [
        'grunt-available-tasks',
        'grunt-karma'
        ].forEach(function(taskId) {
            require.resolve(taskId);
            grunt.loadNpmTasks(taskId);
        });
    } catch (e) {
        console.log('error');

        if (e.code != 'MODULE_NOT_FOUND') {
            throw e;
        }
    }

    grunt.registerTask('default', ['less:dev', 'jade:devall', 'jade:devindex', 'requirejs:dev', 'copy:dev']);
    grunt.registerTask('production', ['less:production', 'jade:productionall', 'jade:productionindex', 'requirejs:production', 'copy:production']);
};
