define(['facade'], function (F) {
    'use strict';

    var $ = F.$,
        _ = F._,
        Backbone = F.Backbone;

    return Backbone.View.extend({

        el: '#page',

        initialize: function () {
            this.template = _.template($('#settings').html()); // compile
        },

        render: function () {
            this.$el.html(this.template({}));
        }

    });
});
