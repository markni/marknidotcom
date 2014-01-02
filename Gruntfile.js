module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ''
            },
            dist: {
                src: ['public/js/vendor/*.js'
					,'public/js/factory.js'
                    ,'public/js/main.js'
					,'public/js/controller.js'
					,'public/js/directive.js'],
                dest: 'dist/public/js/<%= pkg.name %>.js'
            },
			css: {
				src: ['public/css/bootstrap.css'
					,'public/css/style.css'],
				dest: 'dist/public/css/<%= pkg.name %>.css'
			}
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                mangle: false,
				sourceMap: 'dist/public/js/<%= pkg.name %>.min.map',


				sourceMappingURL: '<%= pkg.name %>.min.map', //points to the .map file in .min.js
				sourceMapPrefix: 3

            },
            dist: {
                files: {
                    'dist/public/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        copy:{
            main: {
                files: [


                    // includes files within path and its sub-directories
                    {expand: true, src: ['package.json'], dest: 'dist/'} ,
                    {expand: true, src: ['public/**'], dest: 'dist/'},
                    {expand: true, src: ['markni.js'], dest: 'dist/'},
                    {expand: true, src: ['views/layout_production.jade'], dest: 'dist/views/', rename:function(dest,src){
                        return dest+'layout.jade';
                    }}


                ]
            }
        }


    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask('default', ['copy','concat', 'uglify']);

};