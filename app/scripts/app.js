define([
    'facade',
    'location/model',
    'appliances/collection',
    'status/view',
    'about/view',
    'privacy/view',
    'settings/view',
], function (
    F, 
    LocationModel, 
    AppliancesCollection, 
    StatusView, 
    AboutView, 
    PrivacyView, 
    SettingsView
) {
    'use strict';

    var _ = F._,
        Backbone = F.Backbone,
        app = {};

    // template settings, see: http://japhr.blogspot.com/2011/10/underscorejs-templates-in-backbonejs.html
    _.templateSettings = {
        evaluate : /\{\[([\s\S]+?)\]\}/g,
        interpolate : /\{\{(.+?)\}\}/g
    };

    // data
    app.locationModel = new LocationModel();
    app.appliancesList = new AppliancesCollection();
    //app.currentAppliance = app.appliancesList.at(0);
    //Backbone.trigger('applianceStateChange', app.currentAppliance);

    // views
    app.statusView = new StatusView();
    app.aboutView = new AboutView();
    app.privacyView = new PrivacyView();
    app.settingsView = new SettingsView();

    // observers
    Backbone.on('LocationModelRefChange', function (model) {
        console.log('LocationModelRefChange: ' + model.get('ref'));
        app.statusView.model.set(
            {
                'ref': model.get('ref'),
                'name': model.get('name'),
                'meta': model.toJSON()
            },
            {silent: false}
        );
    });
    Backbone.on('ApplianceCollectionFoundRef', function (model) {
        var ref = model.get('ref'),
            state = model.get('state');

        if (!_.isNull(ref) && !_.isNull(state)) {
            console.log('applianceCollectionFoundRef, ref: ' + ref, ', state: ' + state);
            app.currentAppliance = model;
            app.statusView.model.set({'state': state}, {silent: false});
            Backbone.on(
                'applianceStateChange', 
                app.currentAppliance.setSubscriber, 
                app.currentAppliance
            );
        }
    });
    $('#checkStatus').on('tap', function (event) {
        event.preventDefault();
        app.currentAppliance.fetch(
            {
                success: function (model/*, response, options*/) {
                    app.statusView.model.set({'state': model.get('state')}, {silent: false});
                }, 
                error: function (/*model, xhr, options*/) {
                    alert('Could not get status :(');
                }
            }
        );
    });

    return app;
});
