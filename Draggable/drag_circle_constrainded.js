class DragCircleConst extends DragCircle {

    /**
     * 
     * @param pos Initial position
     * @param r Radius of the element
     * @param onDrag Action to perform when the object is dragged
     * @param onClick Action to perform when the object is clicked
     * @param mouseCoor True if position is given in mouse coordinates
     */
    constructor(pos, r=15, onDrag=null, onClick=null, mouseCoor=false) {
        super(pos, r, onDrag, onClick);

        this.offSet = createVector(width/6, -height/2 - width/6);
        this.l = width/3;

        this.dbClickable = true;

        // Offset and limit the position if on mouse coordinates
        if(mouseCoor) {
            this.pos = createVector(mouseX, -mouseY).sub(this.offSet);
            this.pos.x = min(max(this.pos.x, 0), this.l);
            this.pos.y = min(max(this.pos.y, 0), this.l);
        }
    }

    /**
     * Check if mouse is over the object
     */
    mouseIsOver() {
        let mouse = createVector(mouseX, -mouseY).sub(this.offSet);
        return mouse.dist(this.pos) <= this.r + 10;
    }

    /**
     * If the mouse is over the element
     * dragg it to the mouse position
     * and perform the on drag action
     */
    dragged() {
        this.pos = createVector(mouseX, -mouseY).sub(this.offSet);
        this.pos.x = min(max(this.pos.x, 0), this.l);
        this.pos.y = min(max(this.pos.y, 0), this.l);
        if(this.onDrag != null) this.onDrag();
    }

    /**
     * @return the position of the element in [0,1] range
     */
    getCPos() {
        return this.pos.copy().div(this.l);
    }

    /**
     * If element is doubleClicked call the onDrag method
     */
    doubleCliked() {
        if(this.onDrag != null) this.onDrag();
    }
}