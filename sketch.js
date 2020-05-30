let interpolationType = "test";
let points = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(32);

	// Create UI elements
	//sld = new Slider(start=0, end=255, value=32, 0, 0, width/12, height/60, null, "Background");
	//btn = new Button(x=0, y=0, width/12, height/30, "Reset", resetValue);
	//
	//tggl = new ToggleButton(0,0,width/12,height/30,"Discrete", discretice);
	//cPicker = new ColorPicker(0,0, width/12, height/30, null, "Color 1");

	// Add extreme points
	points.push(new DragCircle(createVector(0,0), 5));
	points.push(new DragCircle(createVector(width/3,width/3), 5));

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
	plot(getInterpolation());

	noStroke();
	Drag.update();
	Drag.draw();
}

function drawGrid() {
	let l = width/3;
	noFill();

	// lines
	strokeWeight(0.5);
	stroke(100);
	for(let i = 1; i < 4; i++) {
		line(i*l/4, 0, i*l/4, l);
		line(0, i*l/4, l, i*l/4);
	}

	// Big rect
	strokeWeight(1);
	stroke(230);
	rect(0,0, l, l);
}

function plot(f) {
	let l = width/3;
	let step = 1;

	noFill();
	stroke(86, 210, 227);
	strokeWeight(1);

	beginShape();
	for(let x=0; x <= 1; x += step/l){
		vertex(x*l, min(1,max(0, f(x)))*l);
	}
	endShape();
}

function mouseDragged() {
	UI.mouseDragged();
	Drag.mouseDragged();
}

function mousePressed() {
	UI.mouseClicked();
	Drag.mouseClicked();
}

// function keyPressed() {
//   if(keyCode === 83){
//
//   }
// }
