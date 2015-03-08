module.exports = function(grunt) {
	//配置grunt任务
	grunt.initConfig({
		//清理css与js文件
		clean: {
			stylesheets: ['public/stylesheets/*.css', '!public/stylesheets/admin.css'],
			javascript: ['public/javascripts/build.min.js', 'public/javascript/build.js', '!public/javascript/admin.js']
		},
		//合并css文件生成style.css
		less: {
			options: {
				paths: ['public/stylesheets']
			},

			compile: {
				files: {
					'public/stylesheets/style.css': 'public/stylesheets/**.less'
				}
			}
		},
		//合并js文件生成build.js
		concat: {
			options: {
				separator: ";"
			},

			javascripts: {
				src: ['public/javascripts/**/*.js', '!public/javascripts/build.min.js', '!public/javascripts/build.js', '!public/javascripts/admin.js'],
				dest: 'public/javascripts/build.js'
			}
		},

		// // 压缩js代码
		// uglify: {
		// 	release: {
		// 		files: {
		// 			'public/javascripts/build.min.js': ['public/javascripts/build.js']
		// 		}
		// 	}
		// },

		//对js文件进行即时语法检查
		jshint: {
			options: {
				ignores: ['public/javascripts/build.min.js', 'node_modules/**/*', 'public/lib/**/*']
			},

			beforeConcat: ['**/*.js'],
			afterConcat: ['public/javascript/build.js']
		},
		//设置express启动配置
		express: {
			server: {
				options: {
					port: 3000,
					hostname: 'localhost',
					script: 'bin/www',
					livereload: true
				}
			}
		},
		//即时监控文件改动
		watch: {
			options: {
				spawn: false
			},
			express: {
				files: ['routes/*.js', 'models/**/**'],
				tasks: ['express']
			},
			jade: {
				files: ['views/*.jade'],
				options: {
					livereload: true
				}
			},
			stylesheets: {
				files: ['public/stylesheets/*.less'],
				tasks: ['less'],
				options: {
					livereload: true
				}
			},
			//前端js
			javascripts_frontend: {
				files: ['public/javascripts/*.js'],
				tasks: ['jshint:beforeConcat', 'concat', 'jshint:afterConcat'],
				options: {
					livereload: true
				}
			}
		}
	});

	//加载grunt任务
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	//设置默认任务
	grunt.registerTask('default', ['clean', 'less', 'jshint:beforeConcat', 'concat', 'jshint:afterConcat', 'express', 'watch']);
};