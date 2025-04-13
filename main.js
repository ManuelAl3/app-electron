const { ipcMain } = require('electron')
const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

const API_URL_POKEMON = 'https://pokeapi.co/api/v2/pokemon'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'src/preload.js')
    }
  })

  win.loadFile('src/pages/index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('fetchPokemons', async (event, offset = 0, limit = 20) => {
    const response = await fetch(`${API_URL_POKEMON}?offset=${offset}&limit=${limit}`)
    const data = await response.json()
    return data.results
  })

  ipcMain.handle('fetchPokemonDetails', async (event, url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
  })

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})