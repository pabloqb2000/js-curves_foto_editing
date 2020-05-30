/**
 * Evaluates the interpolation of the paremeter x 
 * Uses one king of interpolation or other depending
 * on the UI state
 * 
 * @param x 
 */
function getInterpolation(x) {
    let f;
    // Sort the nodes in ascending order 
    points.sort((a, b) => a.getCPos().x - b.getCPos().x);

    if(extremesLimit.active && (x < points[0].getCPos().x || x > points[points.length - 1].getCPos().x)) {
        f = limit;
    } else {
        switch(interpolationType) {
            case "test":
                f = testInterpolation;
                break;
            case "linear":
                f = linearInterpolation;
                break;
        }
    }
    
    // Crops the result in [0,1]
    return min(1,max(0, f(x)));
}

/**
 * Sin interpolation for testing prupouses
 */
function testInterpolation(x) {
    return sin(10*x);
}

/**
 * Linear interpolatoion
 */
function linearInterpolation(x) {
    let i = 1;
    while(points[i].getCPos().x <= x && i < points.length - 1)
        i++;
        
    let p1 = points[i - 1].getCPos();
    let p2 = points[i].getCPos();
    let m = (p2.y - p1.y) / (p2.x - p1.x);
    let c = p1.y - m*p1.x;
    return m*x + c;
}

/**
 * Limist the given value before and after the first and last nodes
 * if called outside that range returns 0
 */
function limit(x) {
    if(x < points[0].getCPos().x)
        return points[0].getCPos().y;
    if(x > points[points.length - 1].getCPos().x)
        return points[points.length - 1].getCPos().y;
    return 0;
}
