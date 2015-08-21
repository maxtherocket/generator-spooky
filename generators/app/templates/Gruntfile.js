var babelify = require('babelify');

module.exports = function(grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({

        // configurable paths
        config: {
            src: 'src',
            dist: 'dist',
            tmp: '.tmp',
            vendor: '<%= bowerrc.directory %>',
            node: 'node_modules'
        },

        // Metadata
        pkg: grunt.file.readJSON('package.json'),

        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= props.license %> */\n',

        watch: {
            less: {
                files: ['<%= config.src %>/js/**/*.scss', '<%= config.src %>/sass/**/*.scss'],
                tasks: ['sass_import:dev', 'sass:dev'],
                options: {
                  interrupt: true
                }
            }
        },

        less: {
            dev: {
                files: {
                    '<%= config.tmp %>/main.css': "<%= config.src %>/less/main.less"
                }
            }
        },

        less_imports: {
            options: {
                inlineCSS: false, // default: true
                import: 'less' // default: once
            },
            dev: {
                files: {'<%= config.src %>/less/_imports.less': ['<%= config.src %>/less/ui/**/*.less', '<%= config.src %>/less/sections/**/*.less']}
            }
        },

        sass: {
            options: {
            	loadPath: './'
            },
            dev: {
                files: {
                    '<%= config.tmp %>/main.css': "<%= config.src %>/sass/main.scss"
                }
            },
            dist: {
                files: {
                    '<%= config.dist %>/main.css': "<%= config.src %>/sass/main.scss"
                }
            }
        },

        sass_import: {
          options: {
          },
          dev: {
            files: {
              '<%= config.src %>/sass/imports.scss': ['<%= config.src %>/js/**/*.scss']
            }
          },
        },

        browserify: {
            options: {
                transform: [babelify, 'hbsfy'],
                browserifyOptions: {
                	extensions: ['.es6']
                }
            },
            dev: {
                options: {
                    watch: true,
                    keepAlive: true,
                    debug: true
                },
                files: {
                    '<%= config.tmp %>/main.js': ['<%= config.src %>/js/main.js']
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    keepalive: true,
                    useAvailablePort: true,
                    base: ['.tmp', 'src']
                }
            }
        },

        concurrent: {
            dev: {
                tasks: ['watch', 'browserify:dev', 'connect'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        clean: {
        	dist: ['<%= config.dist %>']
        },

        copy: {
          dist: {
            files: [
              // includes files within path

              {expand: true, cwd:'<%= config.src %>', src: ['*.html'], dest: '<%= config.dist %>/', filter: 'isFile'},

              // includes files within path and its sub-directories
              //{expand: true, src: ['path/**'], dest: 'dest/'},

              // makes all src relative to cwd
              //{expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

              // flattens results to a single level
              //{expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
            ],
          },
        }

    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-less-imports');
    grunt.loadNpmTasks('grunt-sass-import');

    // Default task
    grunt.registerTask('default', ['sass_import:dev', 'sass:dev', 'concurrent:dev']);

};