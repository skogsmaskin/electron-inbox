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
  }
}
