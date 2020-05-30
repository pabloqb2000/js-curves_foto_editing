let extremesLimit;
let interpolationType = "linear";
let points = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(32);

	// Create UI elements
	extremesLimit = new ToggleButton(0,0,width/10,height/30,"Extreme limits");

	// Add extreme points
	points.push(new DragCircleConst(createVector(0,0), 5));
	points.push(new DragCircleConst(createVector(width/3,width/3), 5));

	// Start UI
	UI.tableWidth = 1;
	UI.tableHeight = 100;
	UI.distrubute();
}

function draw() {
	// Draw UI and draggable elements
	background(32);
	UI.update();
	UI.draw();
	

	// Draw curves
	translate(width/6, height/2 + width/6);
	scale(1,-1);
	strokeJoin(ROUND);
		// Draw grid
	drawGrid();
		// Plot functoin
	plot(getInterpolation);

	noStroke();
	Drag.update();
	Drag.draw();
}

function drawGrid() {
	let l = width/3;
	noFill();

	// lines
	strokeWeight(0.5);
	stroke(180);
	for(let i = 1; i < 4; i++) {
		line(i*l/4, 0, i*l/4, l);
		line(0, i*l/4, l, i*l/4);
	}

	// Big rect
	strokeWeight(1);
	stroke(230);
	rect(0,0, l, l);
}

/**
 * Plot the viven function, function f should be:
 * 		f: R -> R
 * The parameter step determines how smooth should the plot be
 * 
 * @param f Real value function to plot
 */
function plot(f) {
	let l = width/3;
	let step = 3;

	noFill();
	stroke(86, 210, 227);
	strokeWeight(1);

	beginShape();
	for(let x=0; x <= 1; x += step/l){
		vertex(x*l, f(x)*l);
	}
	endShape();
}
