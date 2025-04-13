const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  fetchPokemons: (offset, limit) => ipcRenderer.invoke('fetchPokemons', offset, limit),
  fetchPokemonDetails: (url) => ipcRenderer.invoke('fetchPokemonDetails', url)
});


