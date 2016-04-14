export default (app, window, platform) => {
  return {
    darwin: [
      {
        label: 'Application',
        submenu: [
          {label: 'About Application', selector: 'orderFrontStandardAboutPanel:'},
          {type: 'separator'},
          {label: 'Quit', accelerator: 'Command+Q', click: () => app.quit()}
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
    ],
    linux: [
      {
        label: 'Application',
        submenu: [
          {label: 'About Application', selector: 'orderFrontStandardAboutPanel:'},
          {type: 'separator'},
          {label: 'Quit', accelerator: 'Command+Q', click: () => app.quit()}
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
    ],
    win32: [
      {
        label: 'Application',
        submenu: [
          {label: 'About Application', selector: 'orderFrontStandardAboutPanel:'},
          {type: 'separator'},
          {label: 'Quit', accelerator: 'Command+Q', click: () => app.quit()}
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
  }[platform]
}
