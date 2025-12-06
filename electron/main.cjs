/* eslint-env node */
const { app, BrowserWindow } = require('electron');
const path = require('path');

// We use built-in app.isPackaged instead of 'electron-is-dev' to avoid import errors
const isDev = !app.isPackaged;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    frame: false, // Frameless Cyberpunk window
    backgroundColor: '#0a0a0a',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // Security: Enable remote module if needed, but keeping it simple for now
      enableRemoteModule: true,
    },
  });

  // Load Vite dev server if in dev mode, otherwise load build files
  const startURL = 'http://localhost:5173';
  
  // If you ever build for production, use this:
  // const startURL = isDev 
  //   ? 'http://localhost:5173' 
  //   : `file://${path.join(__dirname, '../dist/index.html')}`;

  mainWindow.loadURL(startURL);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});