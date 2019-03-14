import util from './decorate'

export default class Sketchpad {
  constructor() {
    this.canvas = document.getElementsByTagName ('canvas')[0];
    this.clientWidth = document.documentElement.clientWidth
    this.clientHeight = document.documentElement.clientHeight
    this.canvas.width = this.clientWidth
    this.canvas.height = this.clientHeight
    this.img = document.getElementsByTagName ('img')[0];
    this.screenCanvas = document.getElementsByTagName('div')[1]
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
      this.startX = e.clientX - this.offsetX
      this.startY = e.clientY - this.offsetY
      if (this.type === 'screenShoot') {
        this.captureScreen(e).then(res => this.screenImage = res)
      }
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
          if (this.type === 'screenShoot') {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            canvas.width = 300
            canvas.height = 300
            canvas.classList.add('my-canvas')
            document.querySelector('#app').appendChild(canvas)
            const imgX = e.clientX > (this.startX + this.offsetX) ? this.startX + this.offsetX : e.clientX
            const imgY = e.clientY > (this.startY + this.offsetY) ? this.startY + this.offsetY : e.clientY
            const imgWidth = Math.abs(e.clientX - this.startX - this.offsetX)
            const imgHeight = Math.abs(e.clientY - this.startY - this.offsetY)
            this.img.src = this.screenImage
            this.img.onload = () => {
              ctx.drawImage(this.img, imgX, imgY, imgWidth, imgHeight, 0, 0, 300, 300)
            }
            this.ctx.clearRect(0,0, this.width, this.height)
          }
          this.canvas.onmousemove = null
          this.ctx.closePath()
        }
      })
    }
  }
}