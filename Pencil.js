import Sketchpad from './Sketchpad'

class Pencil extends Sketchpad {
  constructor() {
    super()
  }
  get type() {
    return 'pencil'
  }
  changeColor(color) {
    this.color = color
  }
  lineConnect(e) {
    // this.ctx.save()
    this.ctx.moveTo(e.clientX - this.offsetX, e.clientY - this.offsetY)
    this.canvas.onmousemove = e => {
      this.ctx.lineTo(e.clientX - this.offsetX, e.clientY - this.offsetY)
      this.ctx.lineWidth = 3
      this.ctx.strokeStyle = this.color
      this.ctx.stroke()
    }
  }
}

const pencil = new Pencil()

export default pencil
