const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    selectLibrary: () => ipcRenderer.invoke("select-library"),
    convertTags: (args) => ipcRenderer.invoke("convert-tags", args),
    convertCategory: (args) => ipcRenderer.invoke("convert-category", args),
    convertCatOnly: (args) => ipcRenderer.invoke("convert-catOnly", args),
    restoreBackups: (args) => ipcRenderer.invoke("restore-backups", args),
    onProgress: (callback) => ipcRenderer.on("progress", callback),
    deleteBackups: (args) => ipcRenderer.invoke("delete-backups", args),
});
