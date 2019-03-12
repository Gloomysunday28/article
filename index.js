import Pencil from './Pencil'
import Erea from './Erea'
import util from './decorate'
// import Animation from './Animate'

const tools = document.getElementsByTagName('ul')[0]
const erea = document.getElementsByClassName('c-erea')[1]
const back = document.getElementsByClassName('c-return')[0]
const recover = document.getElementsByClassName('c-recover')[0]

Pencil.initSket()
// Animation.initCircle()

// 画笔
tools.onclick = function (e) {
  util.proxy(e, e => {
    Pencil.initSket()
    Array.from(this.children, el => {
      el.classList.remove('c-tool-active')
    })
    e.target.classList.add('c-tool-active')
    const color = e.target.style.background
    Pencil.changeColor(color)
  })
}

// 橡皮擦
erea.onclick = function () {
  util.proxy(e, function(e) {
    Erea.initSket()
  })
}

// 撤销
back.onclick = function () {
  Pencil.ctx.clearRect(0, 0, Pencil.width, Pencil.height)
  if (Pencil.excute.length) {
    Pencil.recover.push(Pencil.excute.pop())
    if (Pencil.excute.length) {
      Pencil.ctx.drawImage(...Pencil.excute[Pencil.excute.length - 1].params)
    }
  }
}

// 恢复
recover.onclick = function () {
  const cover = Pencil.recover.pop()
  if (cover) {
    Pencil.excute.push(cover)
    Pencil.ctx.clearRect(0, 0, Pencil.width, Pencil.height)
    Pencil.ctx.drawImage(...cover.params)
  } 
}