import Sketchpad from './Sketchpad'

class Erea extends Sketchpad {
  constructor() {
    super()
  }
  get type() {
    return 'erea'
  }
  clearSket(e) {
    this.ctx.strokeStyle = '#000'
    // this.ctx.strokeRect(e.clientX - this.offsetX - 10, e.clientY - this.offsetY - 10, 20, 20)
    this.canvas.onmousemove = e => {
      const x = e.clientX - this.offsetX - 10
      const y = e.clientY - this.offsetY - 10
      // this.ctx.save()
      // this.ctx.beginPath()
      // this.ctx.strokeRect(e.clientX - this.offsetX - 10, e.clientY - this.offsetY - 10, 20, 20)
      // this.ctx.arc(x,y,20,0,2*Math.PI);
      // this.ctx.clip()
      // this.ctx.clearRect(0,0,this.width,this.height);
      // this.ctx.restore();
      // this.ctx.restore()
      // this.ctx.strokeRect(x, y, 20, 20)
      this.ctx.clearRect(x, y, 20, 20)
      // this.ctx.save()
    }
  }
}

const erea = new Erea()

export default erea
