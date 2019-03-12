import Sketchpad from './Sketchpad'

class Animation extends Sketchpad {
  constructor() {
    super()
    this.r = 0
    this.alpha = 0
    this.scale = true
    this.backCanvas = document.createElement('canvas'),
    this.backCtx = this.backCanvas.getContext('2d');
    this.backCanvas.width = this.width;
    this.backCanvas.height = this.height;
    this.ctx.globalAlpha = 0.95;
    this.backCtx.globalCompositeOperation = 'copy';
    this.initCircle()
  }
  initCircle() {
    this.backCtx.drawImage(this.canvas, 0, 0, this.width, this.height);
    this.ctx.beginPath()
    this.ctx.clearRect(0, 0, this.width, this.height)
    if (this.r < 30) {
      this.r+=.5
    } else {
      this.r = 0
    }
    this.ctx.arc(this.width / 2, this.height / 2, this.r, 0, Math.PI * 2, false)
    this.ctx.strokeStyle = 'yellow'
    this.ctx.lineWidth = 3
    this.ctx.stroke()
    this.ctx.closePath()
    this.ctx.drawImage(this.backCanvas, 0, 0, this.width, this.height);
    window.requestAnimationFrame(this.initCircle.bind(this))
  }
}

const animation = new Animation

export default animation