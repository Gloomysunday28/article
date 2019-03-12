import util from './decorate'

export default class Sketchpad {
  constructor() {
    this.canvas = document.getElementsByTagName ('canvas')[0];
    this.offsetX = this.canvas.getBoundingClientRect ().left;
    this.offsetY = this.canvas.getBoundingClientRect ().top;
    this.ctx = this.canvas.getContext ('2d'); // 拿起画笔
    this.width = this.canvas.getAttribute ('width');
    this.height = this.canvas.getAttribute ('height');
    this.excute = [] // 撤销操作
    this.recover = [] // 恢复操作
    this.initSket()
  }
  initSket() {
    this.canvas.onmousedown = e => {
      util.proxy(e, e => {
        this.ctx.beginPath()
        switch(this.type) {
          case 'pencil':
            this.lineConnect(e)
            break
          case 'erea':
            this.clearSket(e)
            break
          case 'screenShoot':
            this.screenShoot(e)
            break
          default:
            break
        }
        this.canvas.onmouseup = e => {
          const img = new Image()
          img.src = this.canvas.toDataURL()
          this.excute.push({
            params: [img, 0, 0, this.width, this.height]
          })
          this.ctx.drawImage(...[img, 0, 0, this.width, this.height])
        }
        window.onmouseup = e => {
          this.canvas.onmousemove = null
          this.ctx.closePath()
        }
      })
    }
  }
}