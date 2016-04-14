import dialogs from './dialogs'
import shortcuts from './shortcuts'

export default (app, window, platform) => {
  const common = [
    {
      label: 'Application',
      submenu: [
        {label: 'About Application', click: () => dialogs.about()},
        {type: 'separator'},
        {label: 'Quit', accelerator: 'Command+Q', click: () => app.quit()}
      ]
    },
    {
      label: 'File',
      submenu: [
        {label: 'Compose', accelerator: 'CmdOrCtrl+N', click: () => shortcuts.compose(window)}
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:'},
        {label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:'},
        {type: 'separator'},
        {label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:'},
        {label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:'},
        {label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:'},
        {label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:'}
      ]
    },
    {
      label: 'Window',
      submenu: [
        {label: 'Minimize', accelerator: 'CmdOrCtrl+M', selector: 'minimize:'},
        {label: 'Hide', accelerator: 'CmdOrCtrl+H', selector: 'hide:'}
      ]
    }
  ]

  return {
    darwin: common,
    linux: common,
    win32: common
  }[platform]
}
