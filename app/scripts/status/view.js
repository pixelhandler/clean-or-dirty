define(['facade', 'status/model'], function (F, StatusModel) {
    'use strict';

    var $ = F.$,
        _ = F._,
        Backbone = F.Backbone;

    return Backbone.View.extend({

        el: '#content',

        events: {
            'tap': 'toggleState'
        },

        initialize: function () {
            _.bindAll(this, 'toggleState');
            this.model = this.model || new StatusModel();
            this.model.on('change:state', function () {
                var isPrevStateNull, isCurrentStateDirty;

                isPrevStateNull = (_.isNull(this.model.previous('state')));
                isCurrentStateDirty = (this.model.changed.state === StatusModel.DIRTY);
                if (!isPrevStateNull || isPrevStateNull && isCurrentStateDirty) {
                    this.flipView();
                }
            }, this);
        },

        render: function () {
            var data = this.model.toJSON();

            this.template = _.template($('#status').html()); // compile
            this.$el.hide().html(this.template(data));
            if (data.state === StatusModel.DIRTY) {
                this.flipView();
            }
            this.$el.show();
        },

        toggleState: function () {
            this.model.trigger('toggleState');
        },

        flipView: function () {
            var statusDisplay = this.$('.status');

            if (statusDisplay.hasClass('flip')) {
                statusDisplay.removeClass('flip');
            } else {
                statusDisplay.addClass('flip');
            }
        }

    });
});
