class LinearInterpolation {
    /**
     * Calculate the inclination of each interval
     * between two nodes
     */
    build() {  
        this.ms = [];
        for(let i = 1; i < points.length; i++) {
            let p1 = points[i - 1].getCPos();
            let p2 = points[i].getCPos();
            this.ms.push((p2.y - p1.y) / (p2.x - p1.x));
        }
    }

    /**
     * Evaluate the interpolation
     * 
     * @param x Point to evaluate
     * @param nextNode Index of the first node after x value
     */
    eval(x, nextNode) {
        let m = this.ms[nextNode - 1];
        let p1 = points[nextNode - 1].getCPos();
        return m*(x - p1.x) + p1.y;
    }
}

class PolynomialInterpolation {
    /**
     * Calculate the coeficients of the polynomial
     * First calculate the divided differences using 
     * newtons algorithm 
     * Then apply the horner algorithm
     * to further simplify the evaluation
     */
    build() {  
        let dd = points.map(p => [p.getCPos().y]);
        let n = points.length - 1;
        for(let j = 1; j <= n; j++) {
            for(let i = 1; i <= j; i++) {
                dd[j].push( 
                    (dd[j][i-1] - dd[j-1][i-1]) / (points[j].getCPos().x - points[j-i].getCPos().x));
            }
        }
        this.divDifs = dd.map(l => l[l.length - 1]).reverse();
    }

    /**
     * Evaluate the interpolation
     * 
     * @param x Point to evaluate
     * @param nextNode Index of the first node after x value
     */
    eval(x, nextNode) {
        return this.horner(this.divDifs, x);
    }

    /**
     * Applies a variant of horner algorithm
     * to evaluate the polynomial
     * @param l List of coefficients 
     * @param x X value to evaluate
     */
    horner(l, x) {
        let n = l.length;
        let q = l[0];
        for(let i = 1; i < n; i++) {
            q = q*(x - points[n-i-1].getCPos().x) + l[i];
        }
        return q;
    }
}