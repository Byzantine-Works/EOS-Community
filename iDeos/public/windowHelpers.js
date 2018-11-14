const os = require('os');
const electron = require('electron');
const { Platform, WindowSize, DisplayName } = require('./constants');
const isDev = require('electron-is-dev');
const path = require('path');

const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
// const mainWindow;

const createWindow = () => {
  const options = {
    width: WindowSize.width,
    height: WindowSize.height,
  };

  const osOptions = {
    webPreferences: {
      zoomFactor: 1.0,
    },
  };

  osOptions[Platform.macOS] = {
    // titleBarStyle: 'hiddenInset',
    // vibrancy: 'ultra-dark',
    // transparent: true,
    // frame: false
  };
  osOptions[Platform.linux] = {};
  osOptions[Platform.windows] = {};

  Object.assign(options, osOptions[os.platform()]);

  /**
   * The main process creates web pages by creating BrowserWindow instances.
   * Each BrowserWindow instance runs the web page in its own "renderer process".
   */
  mainWindow = new BrowserWindow(options);
  mainWindow.require = electron;
  // mainWindow.webContents.on("request-open-directory", (event, msg) => {
  //   console.log("MAIN got open-directory message");
  //   console.log(event, msg);

  //   let thisMainWindow = mainWindow;
  //   dialog.showOpenDialog({ properties: ["openDirectory"] }, folder => {
  //     console.log("mainWindow: ", mainWindow);
  //     thisMainWindow.webContents.send("opened-directory", folder);
  //   });
  // });

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

  if (os.platform() === Platform.macOS) {
    app.setAboutPanelOptions({
      applicationName: DisplayName,
      applicationVersion: '0.0.1',
    });
  }

  mainWindow.on('closed', () => (mainWindow = null));
};

module.exports = createWindow;
