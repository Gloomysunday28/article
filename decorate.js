const util = {
  proxy(e, fn) {
    if (e.button === 0) {
      fn && fn(e)
    } else alert('请使用鼠标左键')
  }
}

export default util