let points = [[3,12],[0,11],[-4,7.5],[-9,7],[-15,5],[-13,3],[-11,2],[-9,2],[-7,1],[-3,-3],[-4,0],[-2,-0.5],[3,-1],[8,-3],[9,-5],[8,-8],[1,-11],[7,-10],[11,-14],[9,-10],[13,-7],[14,-2],[12,2],[7,5],[0,7],[3,12]];
let scaleFactor = 1;
let mouseXprev = 0;
let mouseXcurr = 0;
let textContent = "操這程式很難寫";
let borderDistance = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points[i].length; j++) {
      points[i][j] = points[i][j] * 30;
    }
  }
}

function draw() {
  background(255);
  translate(mouseX, mouseY);
  scaleFactor = map(mouseX, 0, windowWidth, 0.5, 2);
  scaleFactor = constrain(scaleFactor, 0.5, 2);
  scale(scaleFactor);
  
  // 將所有多邊形的角全部接合
  noFill();
  strokeWeight(3);
  stroke("#1b4332");
  beginShape();
  for (let i = 0; i < points.length; i++) {
    let x = points[i][0];
    let y = points[i][1];
    vertex(x, y);
  }
  endShape(CLOSE);
  
  // 繪製邊框
  for (let i = 0; i < 5; i++) {
    strokeWeight(i*borderDistance);
    for (let j = 0; j < points.length-1; j++) {
      let p1 = createVector(points[j][0], points[j][1]);
      let p2 = createVector(points[j+1][0], points[j+1][1]);
      let normal = p1.copy().sub(p2).rotate(HALF_PI).normalize().mult(i*borderDistance);
      let p1a = p1.copy().add(normal);
      let p2a = p2.copy().add(normal);
      gradientLine(p1a.x, p1a.y, p2a.x, p2a.y, color(255, 0, 0), color(0, 0, 255), 3);
    }
    let p1 = createVector(points[points.length-1][0], points[points.length-1][1]);
    let p2 = createVector(points[0][0], points[0][1]);
    let normal = p1.copy().sub(p2).rotate(HALF_PI).normalize().mult(i*borderDistance);
    let p1a = p1.copy().add(normal);
    let p2a = p2.copy().add(normal);
    gradientLine(p1a.x, p1a.y, p2a.x, p2a.y, color(255, 0, 0), color(0, 0, 255), 3);
  }
  
  
  // 加上文字
  push();
  textAlign(CENTER, CENTER);
  textSize(30);
  fill("#1b4332");
  stroke(255);
  strokeWeight(2);
  translate(0, 90); // 向下移動 30 像素
  text(textContent, 0, 0);
  pop();
}

function gradientLine(x1, y1, x2, y2, c1, c2, weight) {
  let d = dist(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  push();
  translate(x1, y1);
  rotate(angle);
  for (let i = 0; i < d; i++) {
    let inter = i / d;
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    strokeWeight(weight);
    line(i, 0, i+1, 0);
  }
  pop();
}

function mouseMoved() {
  mouseXprev = mouseXcurr;
  mouseXcurr = mouseX;
}