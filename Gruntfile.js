/**
 * Gruntfile.js Controls
 *
 * @author Code Parrots <support@codeparrots.com>
 * @since 1.0.0
 */
module.exports = function( grunt ) {

	'use strict';

	var pkg = grunt.file.readJSON( 'package.json' );

	grunt.initConfig( {

		pkg: pkg,

		uglify: {
			dist: {
				files: {
					'lib/admin/js/min/timeline-express-admin.min.js': [
						'lib/admin/js/timeline-express-settings.js',
						'lib/admin/js/bootstrap-select.js',
						'lib/admin/js/script.options-color-picker-custom.js'
					],
					'lib/admin/js/min/timeline-express-add-ons.min.js': [
						'lib/admin/js/timeline-express-add-ons.js'
					],
					'lib/admin/js/min/timeline-express-tinymce.min.js': [
						'lib/admin/js/timeline-express-button-script.js'
					],
					'lib/admin/js/min/timeline-express-blocks.min.js': [
						'lib/admin/js/timeline-express-blocks.js'
					],
					'lib/public/js/min/timeline-express.min.js': [
						'lib/public/js/timeline-express.js'
					],
				}
			}
		},

		postcss: {
			options: {
				map: false,
				processors: [
					require( 'autoprefixer-core' ) ( {
						browsers: [ 'last 2 versions' ]
					} )
				]
			},
			dist: {
				src: [ 'lib/admin/css/*.css', 'lib/public/css/*.css' ]
			}
		},

		cssmin: {
			options: {
				processImport: false,
				roundingPrecision: -1,
				shorthandCompacting: false
			},
			all: {
				files: [
					{
						'lib/admin/css/min/timeline-express-admin.min.css':
						[
							'lib/admin/css/timeline-express-settings.css',
							'lib/admin/css/timeline-express-welcome.css',
							'lib/admin/css/timeline-express-addons.css'
						]
					},
					{
						'lib/admin/css/min/timeline-express-admin-rtl.min.css':
						[
							'lib/admin/css/timeline-express-settings-rtl.css',
							'lib/admin/css/timeline-express-welcome-rtl.css',
							'lib/admin/css/timeline-express-addons-rtl.css'
						]
					},
					{
						'lib/public/css/min/timeline-express.min.css':
						[
							'lib/public/css/timeline-express.css',
							'lib/public/css/timeline-express-single-page.css'
						]
					},
					{
						'lib/public/css/min/timeline-express-rtl.min.css':
						[
							'lib/public/css/timeline-express-rtl.css',
							'lib/public/css/timeline-express-single-page.css',
							'lib/public/css/timeline-express-single-page-rtl.css'
						]
					}
				]
			},
			blocks: {
				files: [
					{
						'lib/admin/blocks/timeline/css/timeline-block.min.css': [ 'lib/admin/blocks/timeline/css/timeline-block.css' ]
					}
				]
			},
		},

		usebanner: {
			taskName: {
				options: {
					position: 'top',
					replace: true,
					banner: '/*\n'+
						' * @Plugin <%= pkg.title %>\n' +
						' * @Author <%= pkg.author %>\n'+
						' * @Site <%= pkg.site %>\n'+
						' * @Version <%= pkg.version %>\n' +
						' * @Build <%= grunt.template.today("mm-dd-yyyy") %>\n'+
						' */',
					linebreak: true
				},
				files: {
					src: [
						'lib/public/css/min/timeline-express.min.css',
						'lib/public/css/min/timeline-express-rtl.min.css',
						'lib/public/js/min/timeline-express.min.js',
						'lib/admin/css/min/timeline-express-admin.min.css',
						'lib/admin/css/min/timeline-express-admin-rtl.min.css',
						'lib/admin/js/min/timeline-express-tinymce.min.js',
						'lib/admin/js/min/timeline-express-admin.min.js',
						'lib/admin/js/min/timeline-express-blocks.min.js'
					]
				}
			}
		},

		copy: {
			main: {
				files: [
					{
						expand: true,
						flatten: true,
						src: [ 'lib/public/partials/*.php' ],
						dest: 'templates/',
						filter: 'isFile'
					}
				]
			},
			deploy: {
				files: [
					{
						expand: true,
						src: [
							'constants.php',
							'i18n/**/*.mo',
							'lib/**',
							'templates/**',
							'readme.txt',
							'timeline-express.php',
							'uninstall.php',
							'wpml-config.xml',
							// Exclude CMB2 files
							'!lib/admin/CMB2/css/sass/**',
							'!lib/admin/CMB2/languages/**',
							'!lib/admin/CMB2/tests/**',
							'!lib/admin/CMB2/*.md',
							'!lib/admin/CMB2/*.json',
							'!lib/admin/CMB2/*.clover',
							'!lib/admin/CMB2/*.js',
							'!lib/admin/CMB2/*.yml',
							'!lib/admin/CMB2/example-functions.php',
							'!lib/admin/CMB2/phpunit.xml.dist',
							'!lib/admin/CMB2/.git',
							'!lib/admin/CMB2/.gitattributes',
							'!lib/admin/CMB2/.gitignore',
						],
						dest: 'build/timeline-express/'
					}
				]
			}
		},

		watch: {
			admin_css: {
				files: [ 'lib/admin/css/*.css', '!lib/admin/css/min/*.min.css' ],
				tasks: [ 'cssmin', 'watch-banner' ],
				options: {
					spawn: false,
					event: [ 'all' ]
				}
			},
			admin_js: {
				files: [ 'lib/admin/js/*.js', '!lib/admin/js/min/*.min.js' ],
				tasks: [ 'watch-banner' ],
				options: {
					spawn: false,
					event: [ 'all' ]
				}
			},
			public_css: {
				files: [ 'lib/public/css/*.css', '!lib/public/css/min/*.min.css' ],
				tasks: [ 'watch-banner' ],
				options: {
					spawn: false,
					event: [ 'all' ]
				}
			},
			public_js: {
				files: [ 'lib/public/js/*.js', '!lib/public/js/min/*.min.js' ],
				tasks: [ 'watch-banner' ],
				options: {
					spawn: false,
					event: [ 'all' ]
				}
			},
			block_js: {
				files: [ 'lib/admin/blocks/**/*.js', '!lib/admin/js/timeline-express-blocks.js', '!lib/admin/blocks/js/**/*.min.js' ],
				tasks: [ 'shell:blocks_dev' ]
			},
			block_css: {
				files: [ 'lib/admin/blocks/**/*.css', '!lib/admin/blocks/**/*.min.css' ],
				tasks: [ 'cssmin:blocks' ]
			}
		},

		cssjanus: {
			theme: {
				options: {
					swapLtrRtlInUrl: false
				},
				files: [
					{
						src: 'lib/admin/css/timeline-express-addons.css',
						dest: 'lib/admin/css/timeline-express-addons-rtl.css'
					},
					{
						src: 'lib/admin/css/timeline-express-settings.css',
						dest: 'lib/admin/css/timeline-express-settings-rtl.css'
					},
					{
						src: 'lib/admin/css/timeline-express-welcome.css',
						dest: 'lib/admin/css/timeline-express-welcome-rtl.css'
					},
					{
						src: 'lib/public/css/timeline-express-single-page.css',
						dest: 'lib/public/css/timeline-express-single-page-rtl.css'
					},
					{
						src: 'lib/public/css/timeline-express.css',
						dest: 'lib/public/css/timeline-express-rtl.css'
					}
				]
			}
		},

		makepot: {
			target: {
				options: {
					domainPath: 'i18n/',
					include: [ '.+\.php' ],
					exclude: [ 'node_modules/', 'bin/', 'lib/admin/CMB2', 'tests/', 'lib/admin/classes/usage-tracking/vendor/' ],
					potComments: 'Copyright (c) {year} Code Parrots. All Rights Reserved.',
					potHeaders: {
						'x-poedit-keywordslist': true
					},
					processPot: function( pot, options ) {
						pot.headers[ 'report-msgid-bugs-to' ] = pkg.bugs.url;
						return pot;
					},
					type: 'wp-plugin',
					updatePoFiles: true
				}
			}
		},

		po2mo: {
			files: {
				src: 'i18n/*.po',
				expand: true
			}
		},

		bump: {
			options: {
				files: [ 'package.json' ],
				updateConfigs: [],
				commit: false,
				createTag: false,
				push: false,
				globalReplace: false,
				prereleaseName: false,
				metadata: '',
				regExp: false
			}
		},

		prompt: {
			bump: {
				options: {
					questions: [
						{
							config:  'bump.increment',
							type:    'list',
							message: 'Bump version from <%= pkg.version %> to:',
							choices: [
								{
									value: 'patch',
									name:  'Patch:  Patch Release eg: 1.0.0 => 1.0.1'
								},
								{
									value: 'minor',
									name:  'Minor:  Minor Release eg: 1.0.3 => 1.1.0'
								},
								{
									value: 'major',
									name:  'Major:  Major Release eg: 1.1.0 => 2.0.0'
								},
								{
									value: 'custom',
									name:  'Custom: Specify Version'
								}
							]
						},
						{
							config:   'bump.custom_version',
							type:     'input',
							message:  'What specific version would you like',
							when:     function ( answers ) {
								return answers[ 'bump.increment' ] === 'custom';
							}
						}
					],
					then: function( results ) {
						if ( results[ 'bump.increment' ] === 'patch' ) {
							grunt.task.run( [ 'shell:bump_patch' ] );
						} else if( results[ 'bump.increment' ] === 'minor' ) {
							grunt.task.run( [ 'shell:bump_minor' ] );
						} else if( results[ 'bump.increment' ] === 'major' ) {
							grunt.task.run( [ 'shell:bump_major' ] );
						} else if( results[ 'bump.increment' ] === 'custom' ) {
							grunt.task.run( [ 'shell:bump_custom' ] );
						}
						grunt.task.run( [ 'shell:bump' ] );
					}
				}
			}
		},

		replace: {
			base_file: {
				src: [ 'timeline-express.php' ],
				overwrite: true,
				replacements: [{
					from: /Version: (.*)/,
					to: "Version: <%= pkg.version %>"
				}]
			},
			readme_txt: {
				src: [ 'readme.txt' ],
				overwrite: true,
				replacements: [
				{
					from: /Stable tag: (.*)/,
					to: "Stable tag: <%= pkg.version %>"
				},
				{
					from: /Tested up to: (.*)/,
					to: "Tested up to: <%= pkg.tested_up_to %>"
				}
			]
			},
			readme_md: {
				src: [ 'README.md' ],
				overwrite: true,
				replacements: [
					{
						from: /# Timeline Express - (.*)/,
						to: "# Timeline Express - <%= pkg.version %>"
					},
					{
						from: /\*\*Stable tag:\*\* {8}(.*)/,
						to: "\**Stable tag:**        <%= pkg.version %> <br />"
					},
					{
						from: /\*\*Tested up to:\*\* {6}WordPress v(.*)/,
						to: "\**Tested up to:**      WordPress v<%= pkg.tested_up_to %> <br />"
					}
				]
			},
			constants: {
				src: [ 'constants.php' ],
				overwrite: true,
				replacements: [ {
					from: /define\(\s*'TIMELINE_EXPRESS_VERSION_CURRENT',\s*'(.*)'\s*\);/,
					to: "define( 'TIMELINE_EXPRESS_VERSION_CURRENT', '<%= pkg.version %>' );"
				} ]
			},
			php: {
				overwrite: true,
				replacements: [
					{
						from: /@since(\s+)NEXT/g,
						to: '@since$1<%= pkg.version %>'
					},
					{
						from: /@NEXT/g,
						to: '<%= pkg.version %>'
					},
				],
				src: [ '*.php', 'lib/**/*.php', 'templates/**/*.php' ]
			},
		},

		shell: {
			bump_patch: [
				'grunt bump:patch'
			].join( ' && ' ),
			bump_minor: [
				'grunt bump:minor'
			].join( ' && ' ),
			bump_major: [
				'grunt bump:major'
			].join( ' && ' ),
			bump_custom: [
				'grunt bump --setversion=<%= bump.custom_version %>'
			].join( ' && ' ),
			bump: [
				'grunt replace',
				'grunt cssmin',
				'grunt uglify',
				'grunt usebanner'
			].join( ' && ' ),
			clean_submodules: [
				'cd build/timeline-express/lib/admin/CMB2',
				'rm -rf .github',
				'rm -rf tests',
				'rm -rf .git',
				'rm -rf .gitattributes',
				'rm -rf .gitignore',
				'rm -rf .scrutinizer.yml',
				'rm -rf .travis.yml',
				'rm -rf CHANGELOG.md',
				'rm -rf composer.json',
				'rm -rf CONTRIBUTING.md',
				'rm -rf coverage.clover',
				'rm -rf Dockunit.json',
				'rm -rf example-functions.php',
				'rm -rf Gruntfile.js',
				'rm -rf package.json',
				'rm -rf phpunit.xml.dist',
				'rm -rf README.md',
				'rm -rf readme.txt'
			].join( ' && ' ),
			blocks_dev: [
				'cross-env BABEL_ENV=default webpack'
			].join( ' && ' ),
			blocks_prod: [
				'cross-env BABEL_ENV=default NODE_ENV=production webpack'
			].join( ' && ' )
		},

		wp_deploy: {
			deploy: {
				options: {
					plugin_slug: 'timeline-express',
					build_dir: 'build/timeline-express/',
					deploy_trunk: true,
					deploy_tag: pkg.version,
					max_buffer: 1024*1024*10
				}
			}
		},

		clean: {
			build: [ 'build/*' ]
		},

		compress: {
				main: {
						options: {
								archive: 'build/timeline-express-v<%= pkg.version %>.zip'
						},
						files: [ {
							cwd: 'build/timeline-express/',
							dest: 'timeline-express',
							src: [ '**' ]
						} ]
				}
		}

	} );

	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	grunt.registerTask( 'default', [ 'menu' ] );

	grunt.registerTask( 'Run all development tasks.', [
		'replace',
		'cssjanus',
		'uglify',
		'postcss',
		'cssmin',
		'usebanner',
		'copy:main',
		'Build the plugin into the /build/ directory.'
	] );

	grunt.registerTask( 'Watch files for changes.', [
		'watch'
	] );

	grunt.registerTask( 'watch-banner', 'Run minify/uglify/banner.', [
		'uglify',
		'postcss',
		'cssjanus',
		'cssmin',
		'usebanner'
	] );

	grunt.registerTask( 'Update template files.', [
		'copy:main'
	] );

	grunt.registerTask( 'Build the plugin into the /build/ directory.', [
		'clean:build',
		'copy:deploy',
		'shell:clean_submodules',
		'compress'
	] );

	grunt.registerTask( 'Bump the verison of Timeline Express to the next release.', [
		'prompt'
	] );

	grunt.registerTask( 'Generate a .pot translation file.', [
		'makepot'
	] );

	grunt.registerTask( 'Convert .po to .mo files.', [
		'po2mo'
	] );

	grunt.registerTask( 'Update the Timeline Express translation files.', [
		'makepot',
		'po2mo'
	] );

	grunt.registerTask( 'Deploy Timeline Express to the WordPress.org repository.', [
		'Run all development tasks.',
		'copy:deploy',
		'shell:clean_submodules',
		'wp_deploy'
	] );

	grunt.registerTask( 'Bump the version throughout from package.json.', [
		'replace'
	] );

};
