function getInterpolation(x) {
    let f;
	switch(interpolationType) {
        case "test":
            f = testInterpolation;
            break;
        case "linear":
            f = linearInterpolation;
            break;
    }
    return min(1,max(0, f(x)));
}

function testInterpolation(x) {
    return sin(10*x);
}

function linearInterpolation(x) {
    let p1 = points[0].getCPos();
    let p2 = points[1].getCPos();
    let m = (p2.y - p1.y) / (p2.x - p1.x);
    let c = p1.y - m*p1.x;
    return m*x + c;
}
