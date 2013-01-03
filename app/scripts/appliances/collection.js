define(['facade', 'env', 'appliances/model'], function (F, env, ApplianceModel) {
    'use strict';

    var ApplianceCollection,
        _ = F._,
        //$ = F.$,
        Backbone = F.Backbone;

    ApplianceCollection = Backbone.Collection.extend({

        model: ApplianceModel,

        url: env.api.appliances,

        initialize: function () {
            var self = this;

            _.bindAll(this, 'fetchByRef', 'findAppliance');
            self.add({}, {silent: true});
            Backbone.on('LocationModelRefChange', self.fetchByRef, self);
            self.on('fetchByRefSuccess', function (model) {
                self.CURRENTLOCATION = model;
                //TODO handle many appliances in same ref location
                // self.findAppliance();
                self.each(function (_model) {
                    if (!_model.id) {
                        self.remove(_model, {silent: true});
                    }
                });
                Backbone.trigger('ApplianceCollectionFoundRef', model);
            }, self);
        },

        fetchByRef: function (ref) {
            var self = this, _ref = ref.get('ref');

            self.fetch({
                url: self.url + '?{"ref": "' + _ref + '"}',
                success: function (collection, response/*, options*/) {
                    var model;

                    console.log('fetchByRefSuccess...');
                    console.dir(response);
                    if (_.isArray(response)) {
                        if (response.length === 0) {
                            collection.create({'ref': _ref, 'state': 'Clean'});
                        }
                        model = collection.pop();
                        collection.reset();
                        collection.trigger('fetchByRefSuccess', model);
                    }
                },
                error: function (collection, xhr, options) {
                    console.log('fetchByRef ' + 'Error...');
                    console.dir(xhr);
                }
            });
        },

        findAppliance: function () {
            var self = this, applianceModel, found, ref;

            if (!self.CURRENTLOCATION) {
                throw new Error('CURRENTLOCATION must be set');
            } else {
                ref = self.CURRENTLOCATION.get('ref');
                found = self.find(function (model) {
                    var  _ref = model.get('ref');

                    // TODO handle many appliances in same ref location
                    // _name = model.get('name'),
                    // if (_name && _name === name && _ref === ref) {

                    return (_ref === ref);
                });
            }
            if (found) {
                applianceModel = found;
            } else {
                applianceModel = self.at(0);
            }
            Backbone.trigger('ApplianceCollectionFoundRef', applianceModel);

            return applianceModel;
        },

    });

    return ApplianceCollection;
});
