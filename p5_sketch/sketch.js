
let slider;
let radius = 15; 
let cx = 430;
let cy = 170;

let overBox = false;
let locked = false;

let n1 = 1;
let n2 = 1.5;

let angle_i = 45;
let angle_r = 45;

function setup() {
  createCanvas(730, 410);
  // slider has a range between 0 and 255 with a starting value of 127
  slider = createSlider(0, 90, 45);
  slider.position(10, 10);
  slider.style('width', '100px');
}

function draw() {
  background(50);
  fill('#004C99');
  rect(0, height/2, width, height/2);
  
  stroke(120);
  line(0,height/2,width,height/2);
  
  for (let i = 0; i < 20; i++) {
  stroke(250);
  line(width/2, 2*i * (height/40), width/2, (2*i+1) * (height/40));
  }
  
  line(90, 670, 400, 670);
  line(100, 680, 100, 380);
  noFill();
  arc(100, 670, 250 * n1, 250 * n1, -HALF_PI, 0);
  arc(100, 670, 250 * n2, 250 * n2, -HALF_PI, 0);
  
  fill(color(255, 153, 51, 100));
  arc(100, 670, 250 * n1, 250 * n1, -angle_i, 0);
  arc(100, 670, 250 * n2, 250 * n2, -angle_r, 0);
  // Test if the cursor is over the box (rayon incident)
  if (sq(mouseX - cx) + sq(mouseY - cy) < sq(radius)) {
    overBox = true;
  } else {
    overBox = false;
  }
  
  stroke('#FF8000');
  fill('#FF9933');
  ellipse(cx,cy,radius,radius);
  line(width/2, height/2, cx, cy);
  
  line(width/2, height/2, width/2 + (width/2 - cx), cy);
  
  textSize(32);
  text('i', width/2 - 50, height/2 - 50);
  
  noFill();
  arc(width/2, height/2, 100, 100, atan( (height/2 - cy)/(width/2 - cx)) - PI, -HALF_PI);
  
  angle_i = HALF_PI - atan( (height/2 - cy)/(width/2 - cx))
  
  text(round(angle_i * 180 / PI,1) , width/2 +150, height/2 + 150)
  
  angle_r = asin( n1 * sin(angle_i) / n2)
  
  text(round(angle_r * 180 / PI,1) , width/2 +150, height/2 + 250)
  
  length = sqrt( sq(width/2 - cx) + sq(height/2 - cy) )
  
  line(width/2, height/2, width/2 + length*sin(angle_r), height/2 + length*cos(angle_r));
}

function mousePressed() {
  if (overBox) {
    locked = true;
  } else {
    locked = false;
  }
  xOffset = mouseX - cx;
  yOffset = mouseY - cy;
}

function mouseDragged() {
  let mx = constrain(mouseX, 0, round(width/2) );
  let my = constrain(mouseY, 0, round(height/2) );
  if (locked) {
    cx = mx - xOffset;
    cy = my - yOffset;
  }
}

function mouseReleased() {
  locked = false;
}