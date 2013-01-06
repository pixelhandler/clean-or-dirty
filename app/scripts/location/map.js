/*global google:true */

// See: https://developers.google.com/maps/documentation/javascript/geocoding#ReverseGeocoding
//      https://developers.google.com/maps/documentation/javascript/streetview
define(['facade', 'env'], function (F, env) {
    'use strict';

    var Map,
        Backbone = F.Backbone,
        _ = F._;

    Map = function (lat, lng, elem) {
        var self = this;

        this.lat = lat;
        this.lng = lng;
        this.marker = null;
        this.geocoder = new google.maps.Geocoder();
        this.latlng = new google.maps.LatLng(lat, lng);
        this.infowindow = new google.maps.InfoWindow();
        this.panoOptions = this.setPanoOptions(this.latlng);
        this.panorama = new google.maps.StreetViewPanorama(elem, this.panoOptions)
        this.streetViewService = new google.maps.StreetViewService();
        /*
        this.streetViewService.getPanoramaByLocation(this.latLng, 50, function (data, status) {
            // TODO use  google.maps.geometry.spherical.computeHeading
            // https://developers.google.com/maps/documentation/javascript/geometry#Navigation
            self.panorama.setPosition(self.latlng);
            if (false && status == google.maps.StreetViewStatus.OK) {
                // Set the Pano to use the passed panoID
                self.panorama.setPano(data.location.pano);
                self.panorama.setPov({heading: 270, pitch: 0, zoom: 1});
            } else {
                self.panorama.setPov({heading: 0, pitch: 0, zoom: 3});
            }
        });
        */
        self.panorama.setPosition(self.latlng);
        self.panorama.setPov({heading: 0, pitch: 0, zoom: 2});
    };

    Map.prototype.setPanoOptions = function (pos) {
        return {
            position: pos,
            addressControl: false,
            linksControl: false,
            panControl: false,
            zoomControl: false,
            enableCloseButton: false,
            visible: true
        };
    };
    
    Map.prototype.mapOptions = {
        zoom: 1,
        center: null,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    Map.prototype.codeLatLng = function () {
        var self = this;

        self.geocoder.geocode({
            'latLng': self.latlng
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    self.marker = new google.maps.Marker({
                        position: self.latlng,
                        map: self.map
                    });
                    self.infowindow.setContent(results[0].formatted_address);
                    self.infowindow.open(self.map, self.marker);
                    self.formatted_address = results[0].formatted_address;
                    self.short_name = results[0].address_components[0].short_name;
                    self.trigger('reverseGeocodingSuccess', self);
                } else {
                    alert("Geocoder did not return expected results");
                }
            } else {
                alert("Geocoder failed due to: " + status);
            }
        });
    };

    Map.prototype.getLatLng = function () {
        return {
            "lat": this.lat,
            "lng": this.lng
        };
    };

    Map.prototype.getShortName = function () {
        return this.short_name;
    };

    Map.prototype.getFormattedAddress = function () {
        return this.formatted_address;
    };
    
    _.extend(Map.prototype, Backbone.Events);

    return Map;
});
