var markni = {};
markni.timeouts = [];

/**
 * scroll element to view
 *
 * @param element
 * @param to
 * @param duration
 */
markni.scrollTo = function(element, to, duration) {
    var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

    var animateScroll = function(){
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if(currentTime < duration) {
            markni.timeouts.push(setTimeout(animateScroll, increment));
        }
    };
    animateScroll();
};

/**
 *clear out animation stack
 */

markni.stopAnimations = function(){
    for (var i=0; i<markni.timeouts.length; i++) {
        clearTimeout(markni.timeouts[i]);
    }
};


/**
 * helper function to get distance from the top
 * @param elm
 * @returns {number}
 */

function posY(elm) {
    var test = elm, top = 0;

    while(!!test && test.tagName.toLowerCase() !== "body") {
        top += test.offsetTop;
        test = test.offsetParent;
    }

    return top;
}


/**
 * get viewport height
 * @returns {number}
 */

function viewPortHeight() {
    var de = document.documentElement;

    if(!!window.innerWidth)
    { return window.innerHeight; }
    else if( de && !isNaN(de.clientHeight) )
    { return de.clientHeight; }

    return 0;
}


/**
 * scroll to
 * @returns {number}
 */

function scrollY() {
    if( window.pageYOffset ) { return window.pageYOffset; }
    return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
}


/**
 * check if the elm is visible in view
 * @param elm
 * @returns {boolean}
 */

function checkvisible( elm ) {
    var vpH = viewPortHeight(), // Viewport Height
        st = scrollY(), // Scroll Top
        y = posY(elm);


    return (y < (vpH + st));
}


/**
 * Helper function to ease scroll speed
 *
 * @param t - current time
 * @param b - start value
 * @param c - change in value
 * @param d - duration
 * @returns {number}
 */

Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};
