define(['facade', 'app'], function (F, app) {
    'use strict';

    var Router,
        _ = F._,
        $ = F.$,
        Backbone = F.Backbone;

    Router = Backbone.Router.extend({

        routes: {
            '': 'index',
            'about': 'about',
            'privacy': 'privacy',
            'settings': 'settings'
        },

        initialize: function () {
            this.on('all', this.all);
        },

        all: function (route) {
            var frag = Backbone.history.fragment;

            console.log('route: ' + route);
            if (_.isFunction(this[frag])) {
                $('#content').empty();
                this[frag]();
            } else {
                $('#page').empty();
                this.index();
            }
        },

        index: function () {
            app.statusView.render();
        },

        about: function () {
            app.aboutView.render();
        },

        privacy: function () {
            app.privacyView.render();
        },

        settings: function () {
            app.settingsView.render();
        }
    });

    return Router;
});
