module.exports = function( grunt ) {
  'use strict';
  //
  // Grunt configuration:
  //
  // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
  //
  grunt.initConfig({

    // Project configuration
    // ---------------------

    // specify an alternate install location for Bower
    bower: {
      dir: 'app/components'
    },

    // Coffee to JS compilation
    coffee: {
      compile: {
        files: {
          'temp/scripts/*.js': 'app/scripts/**/*.coffee'
        },
        options: {
          basePath: 'app/scripts'
        }
      }
    },

    // compile .scss/.sass to .css using Compass
    compass: {
      dist: {
        // http://compass-style.org/help/tutorials/configuration-reference/#configuration-properties
        options: {
          css_dir: 'temp/styles',
          sass_dir: 'app/styles',
          images_dir: 'app/images',
          javascripts_dir: 'temp/scripts',
          force: true
        }
      }
    },

    // generate application cache manifest
    manifest:{
      dest: 'manifest.appcache'
    },

    // headless testing through PhantomJS
    mocha: {
      all: ['test/**/*.html']
    },

    // default watch configuration
    watch: {
      coffee: {
        files: 'app/scripts/**/*.coffee',
        tasks: 'coffee reload'
      },
      compass: {
        files: [
          'app/styles/**/*.{scss,sass}'
        ],
        tasks: 'compass reload'
      },
      reload: {
        files: [
          'app/*.html',
          'app/styles/**/*.css',
          'app/scripts/**/*.js',
          'app/images/**/*'
        ],
        tasks: 'reload'
      }
    },

    // default lint configuration, change this to match your setup:
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#lint-built-in-task
    lint: {
      files: [
        'Gruntfile.js',
        'app/scripts/**/*.js',
        'spec/**/*.js'
      ]
    },

    // specifying JSHint options and globals
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#specifying-jshint-options-and-globals
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        window: true,
        Zepto: true,
        Backbone: true,
        _: true,
        require: true,
        define: true,
        google: true,
        Modernizr: true
      }
    },

    // Build configuration
    // -------------------

    // the staging directory used during the process
    staging: 'temp',
    // final build output
    output: 'dist',

    mkdirs: {
      staging: 'app/'
    },

    // Below, all paths are relative to the staging directory, which is a copy
    // of the app/ directory. Any .gitignore, .ignore and .buildignore file
    // that might appear in the app/ tree are used to ignore these values
    // during the copy process.

    // concat css/**/*.css files, inline @import, output a single minified css
    css: {
      'styles/index.css': ['styles/**/*.css']
    },

    // renames JS/CSS to prepend a hash of their contents for easier
    // versioning
    rev: {
      js: 'scripts/**/*.js',
      css: 'styles/**/*.css',
      img: 'images/**'
    },

    mincss: {
      compress: {
        files: {
          "temp/styles/index.min.css": ['temp/styles/index.css']
        }
      }
    },

    // usemin handler should point to the file containing
    // the usemin blocks to be parsed
    'usemin-handler': {
      html: 'index.html'
    },

    // update references in HTML/CSS to revved files
    usemin: {
      html: ['**/*.html'],
      css: '**/*.css'
    },

    // HTML minification
    html: {
      files: ['**/*.html']
    },

    // Optimizes JPGs and PNGs (with jpegtran & optipng)
    img: {
      dist: '<config:rev.img>'
    },

    // rjs configuration. You don't necessarily need to specify the typical
    // `path` configuration, the rjs task will parse these values from your
    // main module, using http://requirejs.org/docs/optimization.html#mainConfigFile
    //
    // name / out / mainConfig file should be used. You can let it blank if
    // you're using usemin-handler to parse rjs config from markup (default
    // setup)
    rjs: {
      // no minification, is done by the min task
      optimize: 'none',
      //optimizeCss: "standard.keepLines",
      baseUrl: './scripts',
      wrap: true,
      name: 'config'
      //name: './scripts/lib/almond', // note patched usemin to use almond, see: https://gist.github.com/4287900
      //mainConfigFile: './scripts/config.js' 
    },
  });

  // Alias the `test` task to run the `mocha` task instead
  grunt.registerTask('test', 'mocha');

  // css minification
  grunt.loadNpmTasks('/usr/lib/node_modules/grunt-contrib-mincss');

  // overload build task
  grunt.registerTask('build','intro clean coffee compass mkdirs usemin-handler rjs concat css mincss min img rev usemin manifest copy time');

};
