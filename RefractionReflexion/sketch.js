let slider1;
let slider2;

let radius = 15;

let cx = 430;
let cy = 170;

let slider1_x = 40;
let slider2_x = 40;

let overlisder1 = false;
let overlisder2 = false;

let overBox = false;
let locked = false;

let angle_i = 45;
let angle_r = 45;

// if any scroll is attempted, set this to the previous value
window.onscroll = function() {
  window.scrollTo(0, 0);
};

function setup() {
  createCanvas(document.documentElement.clientWidth,document.documentElement.clientHeight)
  //createCanvas(751, 422);
  // slider has a range between 0 and 255 with a starting value of 127
  slider1 = createSlider(1, 2, 1, 0.1);
  slider1.position(10, 10);
  slider1.style('width', '100px');
  
  slider2 = createSlider(1, 2, 1.5, 0.1);
  slider2.position(10, 30);
  slider2.style('width', '100px');
}

function draw() {
  const milieu1 = color(9,   12,  17,  255);
  const milieu2 = color(19,  65,  69,  255);
  const gray    = color(145, 143, 141, 255);
  
  let refrCol = color(101, 26,  26,  255);
  let refrCol2 = color(101, 26,  26,  200);
  let inciCol = color(54,  95,  73,  255);
  let inciCol2 = color(54,  95,  73,  200);
  let reflCol = color(114,  60,  46,  255); 
  let reflCol2 = color(114,  60,  46,  200);
  
  let n1 = slider1.value();
  let n2 = slider2.value();
  let angle_i = HALF_PI - atan( (height/2 - cy)/(width/2 - cx))
  let angle_r = asin( n1 * sin(angle_i) / n2)
  let length = sqrt( sq(width/2 - cx) + sq(height/2 - cy) )
  
  background(milieu1);
  fill(milieu2);
  rect(0, height/2, width, height/2);
  
  stroke(gray);
  line(0,height/2,width,height/2);
  
  for (let i = 0; i < 20; i++) {
  stroke(gray);
  line(width/2, 2*i * (height/40), width/2, (2*i+1) * (height/40));
  }
  
  // Slider milieu1
  stroke(gray)
  fill(milieu2)
  rect(width - width/6 , height/ 2 - 2*height/20, width/8, height/20  )
  fill(gray)
  rect(width - width/6 + slider1_x, height/ 2 - 2*height/20, width/160, height/20 )
  
   // Test if the cursor is over the slider
  if (
    mouseX > width - width/6 + slider1_x &&
    mouseX < width - width/6 + slider1_x + width/160 && 
    mouseY > height/ 2 - 2*height/20 &&
    mouseY < height/ 2 - height/20
    ) {
      overlisder1 = true;
    } else {
      overlisder1 = false;
    }
  
  // Slider milieu2
  fill(milieu1)
  rect(width - width/6 , height/ 2 + height/20, width/8, height/20  )
  fill(gray)
  rect(width - width/6 + 40, height/ 2 + height/20, width/160, height/20 )
  
   // Test if the cursor is over the box (rayon incident)
  if (sq(mouseX - cx) + sq(mouseY - cy) < sq(radius)) {
    overBox = true;
  } else {
    overBox = false;
  }
  
  // Graphique 
  let x = width / 5 - width / 7;
  let dx = width / 4.5;
  let y = height / 2.5 + height/1.8;
  let dy = height / 2.28;
  let slope = 300;
  
  line(x-10, y, x + dx, y);
  line(x, y+10, x, y-dy);
  noFill();
  arc(x, y, slope * n1, slope * n1, -HALF_PI, 0);
  arc(x, y, slope * n2, slope * n2, -HALF_PI, 0);
  
  // Dessin rayon lumineux
  strokeWeight(2.5);
  fill(inciCol2);
  stroke(inciCol);
  arc(x, y, slope * n1, slope * n1, -angle_i, 0);
  fill(refrCol2);
  stroke(refrCol);
  arc(x, y, slope * n2, slope * n2, -angle_r, 0);
  
  stroke(inciCol);
  fill(inciCol);
  ellipse(cx,cy,radius,radius);
  line(width/2, height/2, cx, cy);
  //noFill();
  fill(inciCol2);
  arc(width/2, height/2, width/13, width/13, -angle_i-HALF_PI , -HALF_PI);
  text(round(angle_i * 180 / PI,1) , width/2 +150, height/2 + 150)
  
  stroke(reflCol);
  fill(reflCol2);
  line(width/2, height/2, width/2 + (width/2 - cx), cy);
  arc(width/2, height/2, width/13, width/13, -HALF_PI , -HALF_PI+angle_i);
  
  stroke(refrCol);
  fill(refrCol2);
  text(round(angle_r * 180 / PI,1) , width/2 +150, height/2 + 250)
  line(width/2, height/2, width/2 + length*sin(angle_r), height/2 + length*cos(angle_r));
  arc(width/2, height/2, width/13, width/13, HALF_PI-angle_r , HALF_PI);
}

function mousePressed() {
  if (overlisder1) {
    lockslider1 = true;
  } else {
    lockslider1 = false;
  }
  
  slide1_xoff = mouseX - (width - width/6);
  
  if (overBox) {
    locked = true;
  } else {
    locked = false;
  }
  xOffset = mouseX - cx;
  yOffset = mouseY - cy;
}

function mouseDragged() {
  let slider1_mx = constrain(mouseX, width - width/6, width - width/6 + width/8);
  
  if (loskslider1) {
    slider1_x = slider1_mx - slide1_xoff
  }
  
  let mx = constrain(mouseX, 0, round(width/2) -1 );
  let my = constrain(mouseY, 0, round(height/2) - 1 );
  
  if (locked) {
    cx = mx - xOffset;
    cy = my - yOffset;
  }
  
}

function mouseReleased() {
  locked = false;
}