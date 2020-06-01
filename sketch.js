let extremesLimit, resetBtn, imgBox, saveBtn;
let interpolationType = "linear";
let points = [];
let origImg;
let imgUpdater;

let imagesRefs = [
	'https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
	'https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
];

let imagesNames = ["Landscape 1", "Landscape 2"];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(32);

	//Create image updaer
	imgUpdater = new ImageUpdater(imagesRefs);

	// Create UI elements
	extremesLimit = new ToggleButton(0,0,width/10,height/30,"Limits", resetIndex, true);
	resetBtn = new Button(0,0, width/10, height/30, "Reset", resetPnts);
	saveBtn = new Button(0,0, width/10, height/30, "Save", () => imgUpdater.save());
	imgBox = new OptionsBox(imagesNames, height/30, () => imgUpdater.startImg(imgBox.selectedIndex()));

	// Add extreme points
	points.push(new DragCircleConst(createVector(0,0), 4, resetIndex));
	points.push(new DragCircleConst(createVector(width/3,width/3), 4, resetIndex));

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
		// Plot function
	plot(getInterpolation);

	noStroke();
	Drag.update();
	Drag.draw();
	
	// Draw result
	translate(5/12*width, 0);
		// Draw gradient
	drawGradient(getInterpolation);
		// Display img
	scale(1,-1);
	imgUpdater.updateImg(getInterpolation);
	imgUpdater.drawImg();
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
function plot(f, step=3) {
	let l = width/3;

	noFill();
	stroke(86, 210, 227);
	strokeWeight(1);

	beginShape();
	for(let x=0; x <= 1; x += step/l){
		vertex(x*l, f(x)*l);
	}
	endShape();
}

/**
 * Draws the result gradient of the given function
 */
function drawGradient(f) {
	let l = width/3/256;
	let margin = 40;

	noStroke();
	fill(230);
	rect(-3, -3 - margin, width/3 + 6 + l, 26, 2);
	fill(30);
	rect(-1, -1 - margin, width/3 + 2 + l, 22);
	for(let i = 0; i < 256; i++) {
		fill(f(i/255)*255);
		rect(l*i, -margin, 2*l, 20);
	}
}

/**
 * Reset the points in the array
 */
function resetPnts() {
	points = [];
	Drag.elements = [];
	points.push(new DragCircleConst(createVector(0,0), 4, resetIndex));
	points.push(new DragCircleConst(createVector(width/3,width/3), 4, resetIndex));
	resetIndex();
}

/**
 * Reset the index of the img updater
 */
function resetIndex() {
	imgUpdater.resetIndex();
}
