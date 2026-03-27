const { app, BrowserWindow, ipcMain } = require('electron');
app.disableHardwareAcceleration();
app.commandLine.appendSwitch('disable-gpu');
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    fullscreen: true,
    alwaysOnTop: true,
    skipTaskbar: true,       
    resizable: false,
    movable: false,
    focusable: true,
    show: false,              
    backgroundColor: '#000000',  
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.once('ready-to-show', () => {
  win.show();
  win.setAlwaysOnTop(true, 'screen-saver');
  win.setVisibleOnAllWorkspaces(true);
  });
  
  win.loadFile('index.html');
  win.once('ready-to-show', () => {
    win.show();
  });

  win.webContents.on('dom-ready', () => {
    win.webContents.insertCSS('body { cursor: none; }');
  });
}

app.whenReady().then(createWindow);

ipcMain.on('close-app', () => {
  app.quit();
});

app.on('window-all-closed', () => {
  app.quit();
});