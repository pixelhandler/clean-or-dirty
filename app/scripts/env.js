define(['facade'], function (F) {
    'use strict';

    var _ = F._,
        env, 
        host = window.location.host, 
        protocol = window.location.protocol + '//',
        apiServer = "ec2-107-21-189-43.compute-1.amazonaws.com:8080";

    env = {
        production: {
            client: "www.clean-or-dirty.com",
            server: apiServer
        },
        prod: {
            client: "clean-or-dirty.com",
            server: apiServer
        },
        awsprod: {
            client: "www.clean-or-dirty.com.s3-website-us-east-1.amazonaws.com",
            server: apiServer
        },
        awsdev: {
            client: "cleanordirty.s3-website-us-east-1.amazonaws.com",
            server: apiServer
        },
        localdev: {
            client: "precise64:3501",
            server: "precise64:2403"
        },
        default: {
            client: host,
            server: apiServer
        },
        api: {
            appliances: '/appliances'
        },
        current: null,
    };

    if (host === env.production.client) {
        env.current = env.production;
    } else if (host === env.prod.client) {
        env.current = env.prod;
    } else if (host === env.awsprod.client) {
        env.current = env.awsprod;
    } else if (host === env.awsdev.client) {
        env.current = env.awsdev;
    } else if (host === env.localdev.client) {
        env.current = env.localdev;
    } else {
        env.current = env.default
    }
    env.current.api = {};
    _.each(env.api, function (value, key, obj) {
        env.current.api[key] = protocol + env.current.server + value;
    });

    return env.current;
});
