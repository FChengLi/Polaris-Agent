import { app, BrowserWindow, Menu, Notification, ipcMain, nativeTheme, shell } from 'electron'
import path from 'node:path'

app.setName('Polaris Agent')
// Preserve the existing Chromium profile when changing the visible product name.
app.setPath('userData', path.join(app.getPath('appData'), 'KoreAgent Next'))
if (process.platform === 'win32') app.setAppUserModelId('com.polaris.agent')
const windowIcon = path.join(__dirname, '../../dist/brand/polaris-north-star.ico')
let approvalWindow: BrowserWindow | null = null

function surfaceUrl(hash = '') {
  const developmentUrl = process.env.VITE_DEV_SERVER_URL || (!app.isPackaged ? 'http://127.0.0.1:5173' : '')
  return developmentUrl ? `${developmentUrl}${hash}` : ''
}

function createWindow() {
  const windowsChrome = process.platform === 'win32'
  const titleBarColors = () => ({
    color: nativeTheme.shouldUseDarkColors ? '#141820' : '#f3f5f8',
    symbolColor: nativeTheme.shouldUseDarkColors ? '#e9edf5' : '#263141',
    height: 36,
  })
  const win = new BrowserWindow({
    width: 1440, height: 900, minWidth: 980, minHeight: 650, title: 'Polaris Agent',
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#141820' : '#f3f5f8', icon: windowIcon,
    ...(windowsChrome ? { titleBarStyle: 'hidden' as const, titleBarOverlay: titleBarColors(), autoHideMenuBar: true } : {}),
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false },
  })
  const updateChrome = () => {
    if (!win.isDestroyed() && windowsChrome) {
      win.setTitleBarOverlay(titleBarColors())
      win.setBackgroundColor(titleBarColors().color)
    }
  }
  nativeTheme.on('updated', updateChrome)
  win.on('closed', () => nativeTheme.removeListener('updated', updateChrome))
  const developmentUrl = surfaceUrl()
  if (developmentUrl) win.loadURL(developmentUrl)
  else win.loadFile(path.join(__dirname, '../../dist/index.html'))
}

function showApprovalWindow() {
  if (!approvalWindow) {
    approvalWindow = new BrowserWindow({
      width: 430, height: 390, minWidth: 380, minHeight: 330,
      title: 'Polaris Agent · 操作确认', alwaysOnTop: true, resizable: true,
      backgroundColor: nativeTheme.shouldUseDarkColors ? '#1b2029' : '#ffffff', icon: windowIcon, show: false,
      webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false },
    })
    const url = surfaceUrl('#approval')
    if (url) void approvalWindow.loadURL(url)
    else void approvalWindow.loadFile(path.join(__dirname, '../../dist/index.html'), { hash: 'approval' })
    approvalWindow.on('closed',()=>{approvalWindow=null})
  }
  approvalWindow.show()
  approvalWindow.focus()
}

app.whenReady().then(() => {
  if (process.platform === 'win32') Menu.setApplicationMenu(null)
  ipcMain.handle('open-external', (_e, url: string) => shell.openExternal(url))
  ipcMain.handle('notify', (_e, title: string, body: string) => new Notification({ title, body }).show())
  ipcMain.handle('show-approval', () => showApprovalWindow())
  ipcMain.handle('hide-approval', () => approvalWindow?.hide())
  createWindow(); app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) createWindow() })
})
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })

