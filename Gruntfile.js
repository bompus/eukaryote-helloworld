
module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bump: require('./config/bump'),
    cat: require('./config/cat'),
    clean: require('./config/clean'),
    jsdoc: require('./config/jsdoc'),
    jsdoc2md: require('./config/jsdoc2md'),
    jshint: require('./config/jshint'),
    karma: require('./config/karma')
  });

  grunt.registerTask('default', ['clean', 'jshint', 'test:single', 'jsdoc', 'jsdoc2md', 'cat:coverageDetail']);
  
  grunt.registerTask('test:single', [ 'karma:single' ]);
  grunt.registerTask('test:continuous', [ 'karma:continuous' ]);

};