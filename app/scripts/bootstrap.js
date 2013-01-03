require(['facade', 'router'], function (F, Router) {
    'use strict';

    var router,
        $ = F.$,
        Backbone = F.Backbone;

    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    router = new Router();

    Backbone.history.start({ pushState: false, root: '/'  });

    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router. If the link has a `data-bypass`
    // attribute, bypass the delegation completely.
    $(document).on('tap', 'a:not([data-bypass])', function (evt) {
        // Get the absolute anchor href.
        var href = $(this).attr('href');

        // If the href exists and is a hash route, run it through Backbone.
        if (href && href.indexOf('#') === 0) {
            // Stop the default event to ensure the link will not cause a page
            // refresh.
            evt.preventDefault();

            // `Backbone.history.navigate` is sufficient for all Routers and will
            // trigger the correct events. The Router's internal `navigate` method
            // calls this anyways.    The fragment is sliced from the root.
            Backbone.history.navigate(href, true);
        }
    });
    
    // mobile
    //MBP.scaleFix();
    //MBP.hideUrlBarOnLoad();
    window.addEventListener('load', function () {
        setTimeout(function () {
            window.scrollTo(0, 1);
        }, 0);
    });
    //MBP.preventScrolling;
    //MBP.preventZoom();
});
