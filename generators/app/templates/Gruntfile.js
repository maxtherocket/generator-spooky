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
            js: {
                files: '<%= config.src %>/js/**/*.js',
                tasks: ['browserify:dev']
            },
            less_imports: {
                files: ['<%= config.src %>/less/ui/*.less', '<%= config.src %>/less/sections/*.less'],
                tasks: ['less_imports']
            },
            less: {
                files: '<%= config.src %>/less/**/*.less',
                tasks: ['less:dev']
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

        browserify: {
            options: {
                transform: ['hbsfy', '6to5-browserify']
            },
            dev: {
                options: {
                    watch: true,
                    keepAlive: true
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
                tasks: ['connect', 'watch', 'browserify:dev'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }

    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-less-imports');

    // Default task
    grunt.registerTask('default', ['less_imports:dev', 'less:dev', 'concurrent:dev']);

};