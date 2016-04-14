const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const child_process = require('child_process')
const URL = require('url')
const Menu = require("menu")

const windowOptions = {
  width: 1920,
  height: 1080
}

const ownedHosts = [
  'inbox.google.com',
  'accounts.google.com'
]

const template = [{
 label: "Application",
 submenu: [
     { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
     { type: "separator" },
     { label: "Quit", accelerator: "Command+Q", click: function() { app.quit() }}
 ]}, {
 label: "Edit",
 submenu: [
     { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
     { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
     { type: "separator" },
     { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
     { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
     { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
     { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
 ]}
]

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow(windowOptions)
  mainWindow.loadURL('https://inbox.google.com')

  const webContents = mainWindow.webContents

  var handleRedirect = (e, url) => {
    const host = URL.parse(url).host
    if(ownedHosts.indexOf(host) === -1) {
      e.preventDefault()
      // TODO: support Linux and Windows here
      // Linux: xdg-open
      // Windows: ??
      child_process.execSync(`open ${url}]`)
    }
  }

  webContents.on('will-navigate', handleRedirect)
  webContents.on('new-window', handleRedirect)


  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })


  Menu.setApplicationMenu(Menu.buildFromTemplate(template))


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
