// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the bootstrap application file.
    deps: ['lodash', 'zepto', 'helper', 'facade', 'env', 'bootstrap'],

    paths: {
        // Environment variables
        env: '../scripts/env',

        // JavaScript folders.
        libs: '../scripts/libs',
        plugins: '../scripts/plugins',

        // Libraries.
        backbone: '../scripts/libs/backbone',
        lodash: '../scripts/libs/lodash',
        //underscore: '../scripts/libs/underscore',
        modernizr: '../scripts/libs/modernizr.min',
        zepto: '../scripts/libs/zepto',
        hash: '../scripts/libs/md5',

        // Packages
        appliances: '../scripts/appliances',
        location: '../scripts/location',
        status: '../scripts/status'
    },

    shim: {
        zepto: {
            exports: '$'
        },
        lodash: {
            exports: '_'
        },
        backbone: {
            deps: ['lodash', 'zepto'],
            exports: 'Backbone'
        }
    }

});
