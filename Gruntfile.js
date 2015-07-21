/*
 * Generated on 2015-07-21
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2015 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layoutdir: '<%= config.src %>/layouts',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/partials/*.html'
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/pages/*.html']
        }
      }
    },
    sass: {
      dev: {
        options: {
          sourcemap: 'inline',
          style: 'compressed',
          update: true
        },
        files: {
          'dist/assets/css/style.css': 'src/assets/scss/style.scss'
        }
      }
    },
    uglify: {
      app: {
        options: {
          sourceMap: true
        },
        files: {
          'dist/assets/js/script.js': [
            'src/assets/js/vendor/jquery-1.11.3.min.js',
            'src/assets/js/vendor/bootstrap.min.js',
            'src/assets/js/vendor/modernizr-respond.min.js',
            'src/assets/js/app.js',
            'src/assets/js/plugins.js'
          ]
        }
      }
    },
    copy: {
      images: {
        expand: true,
        cwd: 'src/assets/images/',
        src: '**',
        dest: 'dist/assets/img'
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'sass',
    'uglify',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
