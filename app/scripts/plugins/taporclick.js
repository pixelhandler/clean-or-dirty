$.fn.taporclick = function (efunc) {
    if (typeof efunc === 'undefined') {
        return this.trigger((Modernizr.touch) ? 'tap' : 'click');
    } else {
        return this.on((Modernizr.touch) ? 'tap' : 'click', efunc);
    }
};