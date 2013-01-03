define(['facade'], function (F) {
    'use strict';

    var Backbone = F.Backbone,
        StatusModel;

    StatusModel = Backbone.Model.extend({

        defaults: {
            clean: null,
            dirty: null,
            state: null
        },

        initialize: function () {
            var self = this;

            self.set({
                clean: StatusModel.CLEAN,
                dirty: StatusModel.DIRTY
            }, {
                silent: true
            });
            self.on('toggleState', self.toggleState, self);
            self.on('change:state', function () {
                var prevState = self.previous('state');

                if (prevState && self.changed.state !== prevState) {
                    Backbone.trigger('applianceStateChange', self);
                }
            }, self);
        },

        toggleState: function () {
            var changeTo, state = this.get('state');

            if (state === StatusModel.CLEAN || _.isNull(state)) {
                changeTo = StatusModel.DIRTY;
            } else if (state === StatusModel.DIRTY) {
                changeTo = StatusModel.CLEAN;
            }
            this.set({'state': changeTo}, {silent: false});
        }
    },
    {
        CLEAN: 'Clean',
        DIRTY: 'Dirty'
    });
    
    return StatusModel;
});
