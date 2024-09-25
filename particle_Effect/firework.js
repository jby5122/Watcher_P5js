class TextFirework {
  constructor(x, y, text = "") {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-10, -12));
    this.c = color(random(colors));
    this.explode = false;
    this.text = text; // Keep the text property
    this.firework = new TextParticle(this.pos.x, this.pos.y, this.vel.x, this.vel.y, this.explode, this.c);
    this.particles = [];
    this.done = false;
    this.pause = false;
    this.pauseTimer = 0;
    this.pauseDuration = 15; // Pause duration in frames (1 second at 60fps)
  }

  update() {
    if (!this.explode) {
      // Handle the initial ascent
      this.firework.update();

      if (this.firework.vel.y >= 0) {
        // Trigger the explosion when the firework reaches its peak
        this.exploded();
      }

    } else if (this.pause) {
      // Handle the pause after explosion
      this.pauseTimer++;
      if (this.pauseTimer > this.pauseDuration) {
        this.pause = false;
        // Let the particles start falling after the pause
        for (let particle of this.particles) {
          particle.fall = true;
        }
      }
      // console.log("pauseeee")
      // console.log(this.pause, this.explode)
    } else {
      console.log("disappear")
      // Handle the particles after the pause
      this.finished();

      for (let i=this.particles.length-1; i>=0; i--) {
        this.particles[i].finished();
        this.particles[i].update();

        if (this.particles[i].done) {
          this.particles.splice(i, 1);
        }
      }
    }
  }

  display() {
    if (!this.explode) {
      this.firework.display();
    } else {
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].display();
      }
    }
  }

  exploded() {
    this.explode = true;
    this.pause = true; // Start the pause when it explodes

    if (this.text) {
      let points = font.textToPoints(this.text, this.firework.pos.x - textWidth(this.text) / 2, this.firework.pos.y, 140, {
        sampleFactor: 0.08,
      });

      for (let i = 0; i < points.length; i++) {
        let p = points[i];
        let vx = random(-2, 2);
        let vy = random(-2, 2);
        this.particles[i] = new TextParticle(p.x, p.y, vx, vy, this.explode, this.c);
      }
    }
  }

  finished() {
    console.log(this.particles.length)
    if (this.particles.length == 0) {
      this.done = true;
    } else {
      this.done = false;
    }
  }
}

class Firework {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-9, -13));
    
    this.c = color(random(colors));
    
    this.explode = false;
    this.firework = new Particle(this.pos.x, this.pos.y, this.vel.x, this.vel.y, this.explode, this.c);
    
    this.particles = []; this.num = 40;
    this.done = false;
  }
  
  update() {
    if (this.explode == false) {
      this.firework.update();

      if (this.firework.vel.y >= 0) {
        this.exploded();
      }

    } else {
      this.finished();
      for (let i=this.particles.length-1; i>=0; i--) {
        this.particles[i].finished();
        this.particles[i].update();

        if (this.particles[i].done) {
          this.particles.splice(i, 1);
        }
      }
    }
  }
  
  display() {
    if (this.explode == false) {
      this.firework.display();
    } else {
      for (let i=0; i<this.particles.length; i++) {
        this.particles[i].display();
      }
    }
  }
  
  exploded() {
    this.explode = true;
    for (let i=0; i<this.num; i++) {
      this.vel = p5.Vector.random2D();
      this.vel.mult(random(2, 6));
      this.particles[i] = new Particle(this.firework.pos.x, this.firework.pos.y, this.vel.x, this.vel.y, this.explode, this.c);
    }
  }
  
  finished() {
    if (this.particles.length == 0) {
      this.done = true;
    } else {
      this.done = false;
    }
  }
}