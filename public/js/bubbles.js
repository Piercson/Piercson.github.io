// Code Modified From https://dev.to/sandeshsapkota/creating-an-bubble-animation-with-javascript-na
const root = document.querySelector("#app");
let { innerHeight, innerWidth } = window;
if (innerHeight < 300) {
  innerHeight = 350;
}
if (innerWidth < 300) {
  innerWidth = 750;
}
// creating many bubble instance
jQuery(document).ready(function() {
  // If not mobile, Make bubbles!
  if (innerWidth > 479) {
    setInterval(function () {
      requestAnimationFrame(() => new Bubble());
    }, 3000);
  }
});
var ticking = false;
document.addEventListener('scroll', function(e) {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      innerHeight = window.innerHeight;
      innerWidth = window.innerWidth;
      var top = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
      if(top >= min_y){
        min_y = top;
        max_y = top + innerHeight - 20;
      }else{
        min_y = document.getElementById("navbar").offsetHeight;
        max_y = innerHeight - 20;
      }
      ticking = false;
    });

    ticking = true;
  }
});
min_x = 20;
max_x = innerWidth * 0.2;
min_y = document.getElementById("navbar").offsetHeight;
max_y = innerHeight;
class Bubble {
  constructor() {
    this.bubbleSpan = undefined;
    this.handleNewBubble();
    this.color = `rgba(
        ${220},
        ${225},
        ${228},
        ${this.randomNumber(0.1, 1)})`;
    this.gonna_pop = false;
    // setting height and width of the bubble
    this.height = this.randomNumber(80, 20);
    this.width = this.height;

    this.posY = this.randomNumber(max_y, min_y + this.height);
    this.posX = this.randomNumber(max_x - this.height, min_x);

    this.bubbleSpan.style.top = this.posY + "px";
    this.bubbleSpan.style.left = this.posX + "px";

    // this.bubbleEnd.call(this.bubbleSpan, this.randomNumber(5000, 3000));
  }

  // creates and appends a new bubble in the DOM
  handleNewBubble() {
    this.bubbleSpan = document.createElement("span");
    this.bubbleSpan.classList.add("bubble");
    root.append(this.bubbleSpan);
    this.handlePosition();
    this.bubbleSpan.addEventListener("click", this.bubbleEnd);
  }

  handlePosition() {
    // positioning the bubble in different random X and Y
    var min_height = this.posY - 100;
    if(min_height <= min_y){
      min_height = min_y;
      if(!this.gonna_pop){
        this.bubbleEnd.call(this.bubbleSpan, this.randomNumber(2000, 1000));
        this.gonna_pop = true;
      }
    }
    var random_y = this.randomNumber(this.posY, min_height);
    var random_x = this.randomNumber(max_x - this.height, min_x);
    this.bubbleSpan.style.backgroundColor = this.color;
    this.bubbleSpan.style.height = this.height + "px";
    this.bubbleSpan.style.width = this.height + "px";

    this.posY = random_y;
    this.posX = random_x;

    this.bubbleSpan.style.top = this.posY + "px";
    this.bubbleSpan.style.left = this.posX + "px";

    const randomSec = this.randomNumber(1000, 200);
    setTimeout(this.handlePosition.bind(this), randomSec); // calling for re-position of bubble
  }

  randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  randomColor() {
    return `rgba(
        ${this.randomNumber(0, 255)},
        ${this.randomNumber(0, 255)},
        ${this.randomNumber(0, 255)},
        ${this.randomNumber(0.1, 1)})`;
  }

  bubbleEnd(removingTime = 0) {
    setTimeout(
      () => {
        requestAnimationFrame(() => this.classList.add("bubble--bust"));
      },
      removingTime === 0 ? removingTime : removingTime - 100
    );

    setTimeout(() => {
      requestAnimationFrame(() => this.remove());
      requestAnimationFrame(() => new Bubble());
    }, removingTime);
  }
}
