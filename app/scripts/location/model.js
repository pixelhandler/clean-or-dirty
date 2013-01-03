define(['facade', 'env'], function (F, env) {
    'use strict';

    var LocationModel,
        _ = F._,
        Backbone = F.Backbone,
        hash = F.hash;

    LocationModel = Backbone.Model.extend({

        defaults: {
            ref: null,
            accuracy: null,
            attempts: 0,
            latitude: null,
            longitude: null,
            name: null
        },

        initialize: function () {
            _.bindAll(this, 'geoLocationSuccessHandler', 'geoLocationErrorHandler');
            //Backbone.on('applianceStateChange', this.geoLocation, this);
            this.on('geoLocationSuccess', this.getAddressWithGeoLocation, this);
            this.on('change:name', this.setRef, this);
            this.geoLocation();
        },

        geoLocation: function () {
            var self = this, attempts = self.get('attempts');

            if (Modernizr.geolocation && attempts < LocationModel.MAX_ATTEMPTS) {
                console.log('geoLocation attempts: ' + attempts);
                navigator.geolocation.getCurrentPosition(
                    function () {
                        self.geoLocationSuccessHandler.apply(self, arguments);
                    },
                    function () {
                        self.geoLocationErrorHandler.apply(self, arguments);
                    },
                    {enableHighAccuracy: true}
                );
            } else {
                throw 'no browser support, or exceeded max attempts';
            }
        },

        geoLocationSuccessHandler: function (position) {
            var self = this,
                attempts = self.get('attempts'),
                accuracy = position.coords.accuracy,
                lastAccuracy = self.get('accuracy'),
                lat = position.coords.latitude,
                lng = position.coords.longitude;

            console.log('accuracy: ' + accuracy);
            if (accuracy > LocationModel.MAX_ACCURACY) {
                setTimeout(function () { self.geoLocation(); }, LocationModel.RETRY_DELAY);
                attempts++;
                self.set({'attempts': attempts, 'accuracy': accuracy}, {silent: true});
                if (accuracy < lastAccuracy || _.isNull(lastAccuracy)) {
                    self.set({'latitude': lat, 'longitude': lng}, {silent: true});
                }
                if (attempts === LocationModel.MAX_ATTEMPTS) {
                    self.trigger('geoLocationSuccess');
                }
            } else {
                self.set({'attempts': 0, 'accuracy': accuracy, 'latitude': lat, 'longitude': lng});
                self.trigger('geoLocationSuccess');
            }
        },

        geoLocationErrorHandler: function (err) {
            var self = this,
                attempts = this.get('attempts');

            attempts++;
            self.set({'attempts': attempts}, {silent: true});
            setTimeout(function () { self.geoLocation(); }, LocationModel.RETRY_DELAY);
            console.dir(err);
        },

        getAddressWithGeoLocation: function (model) {
            var lat = this.get('latitude'),
                lng = this.get('longitude'),
                self = model || this,
                geocoder = new google.maps.Geocoder(),
                latLng = new google.maps.LatLng(lat, lng),
                name;

            geocoder.geocode({ 'latLng': latLng }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        name = results[0].address_components[0].short_name;
                        console.log('name: ' + name);
                        self.set({'name': name, 'addr': results[0].formatted_address}, {silent: false});
                        //self.trigger('getAddressWithGeoLocationSuccess', self);
                    }
                } else {
                    console.log("Geocode was not successful for the following reason: " + status);
                    // TODO subscribe and ask for pin
                    //model.trigger('requestName');
                }
            });
        },

        setRef: function (model) {
            var loc = {},
                ref = new Backbone.Model(),
                self = model || this;

            loc.last = self.previous('ref');
            loc.name = self.get('name');
            loc.addr = self.get('addr');
            loc.short = loc.addr.replace(/\s|,|[rstlnaeiou]|[AEIOU]|[\-\+]/g, '');
            _.each(['latitude', 'longitude'], function (attr) {
                loc[attr] = Math.round(self.get(attr) * 10).toString();
            });
            loc.hash = hash(loc.latitude + loc.short + loc.longitude);
            this.set({'ref': loc.hash, 'name': loc.name, 'meta': loc}, {silent: true});
            if (loc.last !== loc.hash) {
                ref.set({'ref': loc.hash, 'name': loc.name, 'meta': loc}, {silent: true});
                Backbone.trigger('LocationModelRefChange', ref);
            }
        },

        setName: function (name) {
            this.set({'name': name}, {silent: true});
        }

    },
    {
        MAX_ATTEMPTS: 3,
        MAX_ACCURACY: 200,
        RETRY_DELAY: 300
    }
    );

    return LocationModel;
});
