import Sketchpad from './Sketchpad'
import html2canvas from 'html2canvas'

class ScreenShoot extends Sketchpad {
  constructor() {
    super()
  }
  get type() {
    return 'screenShoot'
  }
  screenShoot(event) {
    const startX = event.clientX - this.offsetX
    const startY = event.clientY - this.offsetY
    this.canvas.onmousemove = e => {
      this.ctx.clearRect(0, 0, this.width, this.height)
      const moveX = e.clientX - this.offsetX - startX
      const moveY = e.clientY - this.offsetY - startY
      this.ctx.strokeStyle = 'blue'
      this.ctx.lineWidth = 3
      this.ctx.strokeRect(startX, startY, moveX, moveY)
    }
  }
  captureScreen(e) {
    return new Promise((resolve, reject) => {
      html2canvas(document.querySelector('#app'), {
        logging: false
      }).then(canvas => {
        const image = canvas.toDataURL('image/jpg')
        resolve(image)
      })
    })
  }
}

const screenShoot = new ScreenShoot

export default screenShoot