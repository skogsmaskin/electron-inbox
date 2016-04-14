export default {
  compose: window => {
    window.webContents.sendInputEvent({
      type: 'keyDown',
      keyCode: 'c'
    })
    window.webContents.sendInputEvent({
      type: 'char',
      keyCode: 'c'
    })
    window.webContents.sendInputEvent({
      type: 'keyUp',
      keyCode: 'c'
    })
  },
  showShortcuts: window => {
    window.webContents.sendInputEvent({
      type: 'keyDown',
      keyCode: '?'
    })
    window.webContents.sendInputEvent({
      type: 'char',
      keyCode: '?'
    })
    window.webContents.sendInputEvent({
      type: 'keyUp',
      keyCode: '?'
    })
  }

}
