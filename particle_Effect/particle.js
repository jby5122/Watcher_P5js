class TextParticle {
  constructor(x, y, vx, vy, explode, c) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.c = c;
    this.explode = explode;
    this.size = explode ? 8 : 10;
    this.minSize = explode ? random(1, 3) : 8;
    this.life = 70;
    this.done = false;
    this.fall = false; // Controls when the particle starts falling
  }

  update() {
    if (this.explode) {
      this.size = lerp(this.size, this.minSize, 0.05);

      if (this.fall) {
        this.vel.add(gravity);
      }
      this.pos.add(this.vel);
      // this.life -= 2;
      // console.log(this.life)

    } else {
      this.vel.add(gravity);
      this.pos.add(this.vel);
    }

    this.life -= 2;
  }

  display() {
    noStroke();
    fill(this.c, this.life);
    drawingContext.shadowBlur = 50;
    drawingContext.shadowColor = color(this.c);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  finished() {
    console.log("finish")
    if (this.life < 0) {
      this.done = true;
    } else {
      this.done = false;
    }
  }
}


class Particle {
  constructor(x, y, vx, vy, explode, c) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    
    this.c = c;
    
    this.explode = explode;
    
    if (this.explode) {
      this.size = random(4,7);
    } else {
      this.size = 10;
    }
    this.life = 70;
    this.done = false;
  }
  
  update() {
    this.vel.add(gravity);
    this.pos.add(this.vel);
    
    this.life -= 2;
  }
  
  display() {
    noStroke();
    fill(this.c, this.life);
    drawingContext.shadowBlur = 50;
    drawingContext.shadowColor = color(this.c);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
  
  finished() {
    if (this.life < 0) {
      this.done = true;
    } else {
      this.done = false;
    }
  }
}