import dialogs from './dialogs'
import commands from './commands'

export default (app, mainWindow, windowList, platform) => {
  const activeWindow = windowList.find(winObj => winObj.active)
  //
  // let composeAction = []
  // if (activeWindow) {
  //   composeAction = [{label: 'Compose', accelerator: 'CmdOrCtrl+N', click: () => shortcuts.compose(activeWindow.window)}]
  // }

  const windowListItems = windowList.map((winObj, index) => {
    const label = `${index + 1}. ${winObj.title}`
    return {
      label: label,
      type: 'checkbox',
      checked: winObj.window.isFocused(),
      accelerator: `CmdOrCtrl+${index + 1}`,
      click: () => winObj.window.focus()
    }
  })

  const common = [
    {
      label: 'Application',
      submenu: [
        {label: 'About Application', click: () => dialogs.about()},
        {type: 'separator'},
        {label: 'Quit', accelerator: 'Command+Q', click: () => app.quit()}
      ]
    },
    // {
    //   label: 'File',
    //   submenu: [
    //   ].concat(composeAction)
    // },
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
        {label: 'Minimize', accelerator: 'CmdOrCtrl+M', selector: 'performMiniaturize:'},
        {label: 'Hide', accelerator: 'CmdOrCtrl+H', selector: 'hide:'},
        {label: 'Close', accelerator: 'CmdOrCtrl+W', selector: 'performClose:'},
        {type: 'separator'},
        {label: 'Bring All to Front', selector: 'arrangeInFront:'},
        {type: 'separator'},
      ].concat(windowListItems)
    },
    {
      label: 'Help',
      submenu: [
        {label: 'Show keyboard shortcuts', click: () => commands.showShortcuts(activeWindow.window)}
      ]
    }
  ]

  return {
    darwin: common,
    linux: common,
    win32: common
  }[platform]
}
