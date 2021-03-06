import electron from 'electron' // eslint-disable-line import/no-unresolved
import Menu from 'menu' // eslint-disable-line import/no-unresolved
import childProcess from 'child_process'
import URL from 'url'
import menuTemplate from './menu-template'

const app = electron.app
const BrowserWindow = electron.BrowserWindow

const windowOptions = {
  width: 1920,
  height: 1080,
  title: 'Inbox'
}

const ownedHosts = [
  'inbox.google.com',
  'accounts.google.com'
]

const windowList = []

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow


function updateMenu() {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate(
      menuTemplate(app, mainWindow, windowList, process.platform)
    )
  )
}

function createWindow() {
  mainWindow = new BrowserWindow(windowOptions)
  mainWindow.loadURL('https://inbox.google.com')

  const webContents = mainWindow.webContents

  const handleRedirect = (event, url) => {
    const host = URL.parse(url).host
    if (ownedHosts.indexOf(host) === -1) {
      event.preventDefault()
      switch (process.platform) {
        case 'darwin':
          childProcess.exec(`open "${url}"`)
          break
        case 'linux':
          childProcess.exec(`xdg-open "${url}"`)
          break
        case 'win32':
          childProcess.exec(`start "${url}"`)
          break
        default:
          // None
      }
    }
  }

  // mainWindow.webContents.openDevTools()

  webContents.on('will-navigate', handleRedirect)
  webContents.on('new-window', handleRedirect)


  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow)

// setInterval(() => {
//   console.log(windowList)
// }, 1000)

// Keep track of windows
app.on('browser-window-created', (event, window) => {
  const windowObject = {window: window, title: window.getTitle(), active: true}
  function setActive() {
    windowList.forEach(winObj => {
      winObj.active = false
    })
    windowObject.active = true
  }
  setActive()
  if (windowList.map(win => win.window).indexOf(window) === -1) {
    windowList.push(windowObject)
    const webContents = window.webContents
    const updateWindowName = () => {
      windowObject.title = webContents.getTitle()
      window.focus()
      updateMenu()
    }
    const removeFromWindowList = () => {
      windowList.splice(windowList.indexOf(windowObject), 1)
      updateMenu()
    }
    window.on('close', removeFromWindowList)
    window.on('focus', () => {
      setActive()
      updateMenu()
    })
    webContents.on('dom-ready', updateWindowName)
  }
  updateMenu()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
