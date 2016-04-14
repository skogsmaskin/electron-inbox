import electron from 'electron' // eslint-disable-line import/no-unresolved
const packageJSON = require('../package.json') // eslint-disable-line import/no-commonjs

const dialog = electron.dialog

export default {
  about: () => {
    dialog.showErrorBox(
      `Electron Inbox version ${packageJSON.version}`,
      `Google Inbox Wrapped in Electron by ${packageJSON.author}\n\n${packageJSON.homepage}`
    )
  }
}
