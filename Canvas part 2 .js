var canvas;
var database;
var isDrawing = false;
var currentPath = [];
var drawing = [];
var dB_drawing = [];

function setup() {
    canvas = createCanvas(400, 400);
    canvas.parent("canvascontainer");
    database = firebase.database();

    canvas.mousePressed(startPath);
    canvas.mouseReleased(endPath);

    var saveButton = select('#saveButton');
    saveButton.size(198, 50);
    saveButton.mousePressed(saveDrawing);
    var clearButton = select('#clearButton');
    clearButton.size(198, 50);
    clearButton.mousePressed(clearDrawing);

}

function startPath() {
    isDrawing = true;
    currentPath = [];
    drawing.push(currentPath);
}

function endPath() {
    isDrawing = false;
   
}

function draw() {
    background("cyan");
    if (isDrawing) {
        var point = {
            x: mouseX,
            y: mouseY
        }
        currentPath.push(point);
    }
    stroke(25, 34, 234);
    strokeWeight(4);
    noFill();
    for (var i = 0; i < drawing.length; i++) {
        var path = drawing[i];
        beginShape();
        for (var j = 0; j < path.length; j++) {
            vertex(path[j].x, path[j].y);
        }
        endShape();
    }

    

   
}

function readData() {
    database.ref('MonaLisa/Session1/drawing/').on('child_added', function(data) {
        dB_drawing.push(data.val());
        console.log(dB_drawing);
    })
}

function saveDrawing() {
    var dBref = database.ref('MonaLisa');
    var data = {
        name: 'JSH',
        drawing: drawing,
       

    }
   
    dBref.set({
        "Session1": data
    })
}

//clear all data in database
function clearDrawing() {
    dB_drawing = [];
    var dBref = database.ref('MonaLisa');
    dBref.remove();
}