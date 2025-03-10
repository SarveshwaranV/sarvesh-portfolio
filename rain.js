let OPT = {
selector: "#rainCanvas",
amount: 4000,
      speed: 0.4, // pixels per frame
lifetime: 400,
direction: {x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2},
  size: [3, 3],
maxopacity: 0.9,
 color: "150, 150, 150",
randColor: true,
acceleration: [5, 40]
}

if (window.innerWidth < 520) {
OPT.speed = 0.05;
OPT.color = "150, 150, 150";
}

(function spark() {
const canvas = document.querySelector(OPT.selector);
const ctx = canvas.getContext("2d");

let sparks = [];

window.addEventListener('resize', () => {
setCanvasWidth()
});

function setCanvasWidth() {
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
}

function rand(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}  

// Init animation
function init() {
setCanvasWidth();

window.setInterval( () => {
if (sparks.length < OPT.amount) {
  addSpark();
}
}, 1000 / OPT.amount);

window.requestAnimationFrame(draw);
}

function draw() {
ctx.fillStyle = 'rgba(0,0,0, 0.6)';
ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

sparks.forEach( (spark, i, array) => {

if (spark.opacity <= 0) {
  array.splice(i, 1);
} else {
  drawSpark(spark);
}

});

window.requestAnimationFrame(draw);
}

function Spark(x, y) {
this.x = x;
this.y = y;
this.age = 0;
this.acceleration = rand(OPT.acceleration[0], OPT.acceleration[1]);

this.direction = {
    x: (Math.random()) * 2, // Random value between -1 and 1
    y: (Math.random() - 0.5) * 2  // Random value between -1 and 1
};

this.color = OPT.randColor
? rand(0,255) + "," + rand(0,255) + "," + rand(0, 255)
: OPT.color

this.opacity = OPT.maxopacity - this.age / (OPT.lifetime * rand(1, 10));

this.go = function() {
this.x += OPT.speed * OPT.direction.x * this.acceleration / 2
this.y += OPT.speed * OPT.direction.y * this.acceleration / 2

this.direction = {
    x: (Math.random()) * 2, // Random value between -1 and 1
    y: (Math.random() - 0.5) * 2  // Random value between -1 and 1
};

this.opacity = OPT.maxopacity - ++this.age / OPT.lifetime;
}
}

function addSpark() {
let x = rand(-200, window.innerWidth + 200);
let y = rand(-200, window.innerHeight + 200);
sparks.push(new Spark(x, y));
}

function drawSpark(spark) {
let x = spark.x, y = spark.y;

spark.go();

ctx.beginPath();
ctx.fillStyle = `rgba(${spark.color}, ${spark.opacity})`;
ctx.rect(x, y, OPT.size[0], OPT.size[1], 0, 0, Math.PI * 2);
ctx.fill();
}

init();
})();