//Graphics Gems 1 - pag 24

let x1=10;
let y1=10;
let x2=210;
let y2=480;
let x3=480;
let y3=200;

function setup() {
  createCanvas(500, 500);
  background(220);
  triangle(x1, y1, x2, y2, x3, y3);
}

function draw() {
  method3();
}

function method3() {
  let r1 = random();
  let r2 = random();
  
  let s1 = sqrt(r1);
  
  let x = x1 * (1.0 - s1) + x2 * (1.0 - r2) * s1 + x3 * r2 * s1;
  let y = y1 * (1.0 - s1) + y2 * (1.0 - r2) * s1 + y3 * r2 * s1;
  
  fill(255, 0, 0);
  circle(x, y, 1);
  
  return [x, y];
}

function method4() {
  let x = random();
  let y = random();
  let q = abs(x - y);
  let s = q;
  let t = 0.5 * (x + y - q);
  let u = 1 - 0.5 * (q + x + y);
  
  let qx = s * x1 + t * x2 + u * x3;
  let qy = s * y1 + t * y2 + u * y3;
  
  fill(255, 0, 0);
  circle(qx, qy, 1);
  
  return [qx, qy];
}

function method1() {
  let t = random();
  let s = random();
  
  let a = 1 - sqrt(t);
  let b = (1-s) * sqrt(t);
  let c = s * sqrt(t);
  
  /* Calculate the Point Q*/
  let qx = a*x1 + b*x2 + c*x3;
  let qy = a*y1 + b*y2 + c*y3;
  
  /* Draw the point on the Canvas */
  fill(255,0,0);
  circle(qx,qy,1);
  
  /* Return the Q point */
  return [qx,qy];
}

function method2() {
  let t = random();
  let s = random();
  
  if (s+t > 1) {
    s = 1-s;
    t = 1-t;
  }
  
  a = 1-s-t;
  b = s;
  c = t;
  
  /* Calculate the Point Q*/
  let qx = a*x1 + b*x2 + c*x3;
  let qy = a*y1 + b*y2 + c*y3;
  
  /* Draw the point on the Canvas */
  fill(255,0,0);
  circle(qx,qy,1); 
  
  /* Return the Q point */
  return [qx,qy];
}
