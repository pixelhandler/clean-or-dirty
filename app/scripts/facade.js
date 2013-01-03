define([
    'zepto',
    'lodash',
    //'underscore',
    'backbone',
	'hash'
    //'plugins/type',
    //'plugins/callbacks',
    //'plugins/deferred'
], function ($, _, Backbone, hash) {
    'use strict';

    $.ajaxSettings.cache = false; // Zepto
    //$.ajaxSetup({cache: false}); // jQuery

    return {
        '$': Zepto,
        '_': _,
        'Backbone': Backbone,
		'hash': hash
    };

});
