var path = require('path');

var PATH = {
    ROOT: path.join(__dirname)
};

PATH.NODE_PACKAGE = path.resolve(path.join(PATH.ROOT, '..', 'node_package'));

module.exports = function(grunt) {
    grunt.loadTasks('grunt-config/tasks');

    grunt.registerTask('build',[
    	'less:ui-dashboard',
    	'less:ui-dashboard-min',
    	'requirejs:ui-dashboard',
    	'requirejs:ui-dashboard-min',
    	'compress:ui-dashboard',
    	'copy:ui-dashboard',
        'production'
    ]);
    grunt.registerTask('default', [
    	'less:dev',
    	'jade:devall',
    	'jade:devindex',
    	'requirejs:dev',
    	'copy:dev'
    ]);
    grunt.registerTask('production', [
    	'less:production',
    	'jade:productionall',
    	'jade:productionindex',
    	'requirejs:production',
    	'copy:production'
    ]);
};
