module.exports = function(grunt) 
{
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-linter');	
	grunt.loadNpmTasks('grunt-dot-compiler');
	grunt.loadNpmTasks('grunt-pngmin');
	grunt.loadNpmTasks('grunt-glue-nu');
	grunt.loadNpmTasks('grunt-rename');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-targethtml');

	var projectName = grunt.option("pagename");
	var distFolder = "_dist";


	// Project configuration.
	grunt.initConfig(
	{	
		// ------------ watch scss
		// https://github.com/gruntjs/grunt-contrib-watch
		watch: 
		{
		  sass: 
		  {
		  	interrupt: true,
		    files: ['src/scss/**/*.scss'],
		    tasks: ['sass:dist']
		  }
		},

		// ------------ scss
		// https://github.com/gruntjs/grunt-contrib-sass
		sass: 
		{
			dist: 
			{
				options:
				{
					style: 'expanded',
      				compass: true,
					lineNumbers: true
				},

				files: 
				[{					
					expand : true,
					cwd    : 'src/scss',
					src    : ['project.scss'],
					dest   : '../' + distFolder + '/Content/css',
					ext    : '.css'
				}]
			}
		},

		// ------------ glue
		// https://npmjs.org/package/grunt-glue-nu
		glue: 
		{
			options: 
			{				
			},	

			files: 
			{		
				options: 
				{			
					css                : '../' + distFolder + '/Content/css/sprites',
					namespace          : '',				
					crop               : false
				}, 

				src  : ['src/images/sprites/'],
				dest : '../' + distFolder + '/Content/images/sprites' 	 // destination folder of processed images				
			}			
		},

		// this moves and renames the sprites.css folder to the sprites.scss 
		// so it can be compiled with the othe SCSS
		rename: 
		{
	        renameSpriteToScss: 
	        {
	            src: '../' + distFolder + '/Content/css/sprites/sprites.css',
	            dest: 'src/scss/sprites/sprites.scss'
	        }
	    },



		// ------------ pngmin aka pngquant
		// https://npmjs.org/package/grunt-pngmin
		pngmin: 
		{
			compile:
			{
				options: 
				{
					type: 256,
					ext: ".png",
					force: true
				},

				files: 
				[
					{		
						expand : true,
						src    : ['**/*.png'],
						cwd    : 'src/images/compression', // source folder to images to process
						dest   : '../' + distFolder + '/Content/images/' 	 // destination folder of processed images
					}
				]
			}			
		},


		// ------------ LINTER
		// https://github.com/circusbred/grunt-linter
		linter: 
		{
			files: 
			[
				'../' + distFolder + '/Content/js/project/**/*.js'			
			],

			exclude:
			[			
				'../' + distFolder + '/Content/js/project/templates/templates-compiled.js'
			]
		},

		jshint: 
		{
			options: 
			{
				
			}
		},


		// ------------ DOT compiler
		// https://npmjs.org/package/grunt-dot-compiler
		dot: 
		{
			dist: 
			{
				options: 
				{
					variable : 'oTemplates',
					root     : 'src/templates/'
				},
				src  : ['src/templates/**/*.html'],
				dest : '../' + distFolder + '/Content/js/project/templates/templates-compiled.js'
			}
		},

		// ------------ REQUIREJS
		requirejs:
		{
			compile: 
			{
			    options: 
			    {				 
					name           : "config",			 	
					baseUrl        : '../' + distFolder + '/Content/js/project/',	
					include        : ['../libs/require.js'],	

					optimize       : "uglify2",
					mainConfigFile : '../' + distFolder + '/Content/js/project/config.js',				
					out            : '../' + distFolder + '/Content/js/release/' + projectName + '.js',

					preserveLicenseComments : false,
					generateSourceMaps      : true
		
			    }
			}
		},

		// ------------ targethtml
		// https://github.com/changer/grunt-targethtml
		targethtml: 
		{
	        dist: 
	        {
	            options: 
	            {
	                curlyTags: 
	                {
	                    bustVersion: "v=" + (new Date()).getTime()
	                }
	            },
	            files: 
	            {
	                '../_dist/index.html': 'src/index.html'
	            }
	        }
	    }

	});


	// ------------ TASKS

	// build JS and compile templates
	grunt.registerTask('build', ['dot', 'linter', 'requirejs']);

	// compile templates
	grunt.registerTask('buildTemplate', ['dot']);

	// compress pngs
	grunt.registerTask('compressImages', ['pngmin']);

	// glue sprites
	grunt.registerTask('glueSprites', ['glue', 'rename']);	

	// compile scss
	grunt.registerTask('compileScss', ['sass']);
	
	// watch scss
	grunt.registerTask('watchScss', ['sass', 'watch']);

};