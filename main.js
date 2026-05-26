const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require("url");

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.webContents.session.clearStorageData();

  // Load the Angular application.
  mainWindow.loadURL(
    url.format({
      pathname:  path.join(__dirname, 'dist/dashboard-frontend/index.html'),
      protocol: 'file:',
      slashes: true
    }));

    Menu.setApplicationMenu(null);

  // Open the DevTools (optional).
   //mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
