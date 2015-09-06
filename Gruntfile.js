module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                expand: true,
                cwd: 'public/',
                src: ['js/*'],
                dest: 'dest/',
                flatten: true,
                filter: 'isFile',
            },
        },
        watch: {
            jade: {
                files: 'view/**',
                options: {
                    livereload: true,
                }
            },
            js: {
                files: ['public/js/**', 'models/*.js', 'schemas/*.js'],
                //tasks: ['jshint'],
                options: {
                    livereload: true,
                }
            }
        },
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    args: [],
                    nodeArgs: ['--debug'],
                    callback: function(nodemon) {
                        nodemon.on('log', function(event) {
                            console.log(event.colour);
                        });
                    },
                    env: {
                        PORT: '1938'
                    },
                    cwd: __dirname,
                    ignore: ['node_modules/**', '.git'],
                    ext: 'js',
                    //watch: ['.'],
                    delay: 1,
                    legacyWatch: true
                }
            },
            exec: {
                options: {
                    exec: 'less'
                }
            }
        },
        concurrent: {
            target: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    // Load the plugin
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-concurrent");
    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.option("force", true);
    // Default task(s).
    grunt.registerTask('build', ['concurrent:target']);
    grunt.registerTask('develop', ['concurrent:target']);
    grunt.registerTask('default', ['newer:jshint','test','build']);
};
