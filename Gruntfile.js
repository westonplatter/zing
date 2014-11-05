module.exports = function(grunt){
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'), 
    
    jasmine_node: {
      projectRoot: '.'
    },

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
      options: {
        jshintrc: '.jshintrc'
      },
      server: {
        // options: {
        //   '-W085': true, // allow with statement
        // },
        src: 'app.js',
      },
      frontend: {
        src: 'public/main.js',
      }, 
      specs: {
        src: './specs'
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jasmine-node');

  grunt.registerTask('test', ['jshint', 'jasmine_node']);
  grunt.registerTask('default', ['jshint']);
};
