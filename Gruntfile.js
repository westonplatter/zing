module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), 
  
    watch: {
      scripts: {
        files: './resources/**/*.js', 
        tasks: ['jshint:server', 'jshint:frontend'], 
        options: {
          interrupt: true
        },
      },
    }, 
    
    jshint: {
      server: {
        options: {
          '-W085': true, // allow with statement for Ch3 example
        },
        src: 'app.js',
      },
      frontend: {
        src: 'public/main.js',
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  grunt.registerTask('test'         , ['default']);
  grunt.registerTask('default'      , ['jshint']);
};
