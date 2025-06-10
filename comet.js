const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Comet {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -20;
    this.length = Math.random() * 60 + 40;
    this.speed = Math.random() * 2 + 1;
    this.angle = Math.PI / 4;
    this.opacity = Math.random() * 0.5 + 0.3;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    if (this.y > canvas.height || this.x > canvas.width) {
      this.reset();
    }
  }

  draw() {
    const gradient = ctx.createLinearGradient(this.x, this.y, this.x - this.length, this.y - this.length);
    gradient.addColorStop(0, `rgba(255,0,255,${this.opacity})`);
    gradient.addColorStop(1, `rgba(0,0,0,0)`);

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.length, this.y - this.length);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

const comets = Array.from({ length: 20 }, () => new Comet());

function animate() {
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  comets.forEach(comet => {
    comet.update();
    comet.draw();
  });

  requestAnimationFrame(animate);
}

animate();
