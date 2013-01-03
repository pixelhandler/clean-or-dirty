define(['facade', 'env'], function (F, env) {
    'use strict';

    var ApplianceModel,
        _ = F._,
        //$ = F.$,
        Backbone = F.Backbone;

    ApplianceModel = Backbone.Model.extend({

        defaults: {
            ref: null,
            state: null
        },

        urlRoot: env.api.appliances,

        initialize: function () {
            this.on('persist', this.save, this);
        },

        setSubscriber: function (model) {
            var self = this, changes = 0;

            _.each(ApplianceModel.DEFAULTS, function (attr) {
                var attrValue = model.get(attr);

                if (model.has(attr) && !_.isNull(attrValue)) {
                    self.set(attr, attrValue);
                    changes++;
                }
            });
            if (changes > 0) {
                if (self.timeout) {
                    window.clearTimeout(self.timeout);
                }
                self.timeout = setTimeout(function () { self.trigger('persist'); }, 100);
            }
        },

        save: function (attributes, options) {
            if (!_.isNull(this.get('ref')) && !_.isNull(this.get('state'))) {
                options = options || {wait: true};
                attributes = attributes || this.toJSON();
                Backbone.Model.prototype.save.call(this, attributes, options);
            }
        }

    },
    {
        DEFAULTS: ['ref', 'state', 'name'/*, 'meta'*/]
    });

    return ApplianceModel;
});
