function mouseDragged() {
	UI.mouseDragged();
	Drag.mouseDragged();
}

function mousePressed() {
	UI.mousePressed();
	if(!Drag.mousePressed()) {
		let mouse = createVector(mouseX - width/6, -mouseY + height/2 + width/6);
		if(mouse.x >= 0 && mouse.x <= width/3 && mouse.y >= 0 && mouse.y <= width/3) {			
			let newPt = new DragCircleConst(createVector(mouse.x, mouse.y), 5);
			points.push(newPt);
			Drag.selected = newPt;
		}
	}
}

function mouseClicked() {
    UI.mouseClicked();
	Drag.mouseClicked();
}

function mouseReleased() {
    UI.mouseReleased();
	Drag.mouseReleased();
}

function mouseWheel(event) {
	UI.mouseWheel(event);
}

// function keyPressed() {
//   if(keyCode === 83){
//
//   }
// }

