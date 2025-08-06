const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const { spawn } = require('child_process')

let mainWindow
let nextProcess

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
    titleBarStyle: 'default',
    show: false,
  })

  // Load the app
  let startUrl
  if (isDev) {
    startUrl = 'http://localhost:3000'
  } else {
    // For production, use the local server
    startUrl = 'http://localhost:3001'
  }
  
  console.log('Loading URL:', startUrl)
  mainWindow.loadURL(startUrl)

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // Open DevTools in development
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }
}

function startNextServer() {
  // Set demo mode environment variable for Electron
  process.env.NEXT_PUBLIC_DEMO_MODE = 'true'
  process.env.NEXTAUTH_SECRET = 'demo-secret-key-for-electron-app'
  process.env.DATABASE_URL = 'file:./dev.db'
  
  if (isDev) {
    nextProcess = spawn('npm', ['run', 'dev'], {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
      env: { ...process.env }
    })
  } else {
    // For production, start the Next.js standalone server
    const serverPath = path.join(__dirname, '..', '.next', 'standalone', 'server.js')
    console.log(`Starting Next.js production server from: ${serverPath}`)
    
    nextProcess = spawn(process.execPath, [serverPath], {
      cwd: path.join(__dirname, '..'),
      env: { 
        ...process.env,
        PORT: '3001',
        NODE_ENV: 'production'
      },
      stdio: 'inherit',
    })
  }
}

function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Paper',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.send('new-paper')
          }
        },
        {
          label: 'Open Dashboard',
          accelerator: 'CmdOrCtrl+D',
          click: () => {
            const dashboardUrl = isDev ? 'http://localhost:3000/dashboard' : 'http://localhost:3001/dashboard'
            mainWindow.loadURL(dashboardUrl)
          }
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    }
  ]

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    })
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

// App event handlers
app.whenReady().then(() => {
  startNextServer()
  createWindow()
  createMenu()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('before-quit', () => {
  if (nextProcess) {
    nextProcess.kill()
  }
}) 