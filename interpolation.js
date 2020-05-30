function getInterpolation() {
	switch(interpolationType) {
        case "test":
            return testInterpolation;
    }
}

function testInterpolation(x) {
    return x;
}