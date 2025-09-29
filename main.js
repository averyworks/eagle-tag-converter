const { app, BrowserWindow, dialog, ipcMain, Menu, shell } = require('electron');
const fs = require('fs');
const path = require('path');


function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}



// JSONを1行で保存する関数
function saveJsonOneLine(filePath, obj, backupText) {
    const jsonText = JSON.stringify(obj); // 整形なし = 1行JSON
    fs.writeFileSync(filePath + '.bak', backupText); // バックアップ
    fs.writeFileSync(filePath, jsonText, 'utf8');    // 保存
}

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        icon: path.join(__dirname, 'build', 'icon.ico'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html');

    // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

// ▼ ライブラリフォルダ選択
ipcMain.handle('select-library', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openDirectory']
    });
    return result.filePaths[0] || null;
});

// ▼ 変換処理
ipcMain.handle('convert-tags', async (event, { libPath, from, to }) => {
    if (!libPath) return { success: false, message: 'No library' };

    let convertedCount = 0;
    let logs = [];

    // ▼ ファイル一覧を先に集めて総数を数える
    function collectFiles(dir, list = []) {
        fs.readdirSync(dir).forEach(f => {
            const full = path.join(dir, f);
            const stat = fs.statSync(full);
            if (stat.isDirectory()) {
                collectFiles(full, list);
            } else if (f.endsWith('.json') || f.endsWith('.info')) {
                list.push(full);
            }
        });
        return list;
    }

    const allFiles = collectFiles(libPath);
    let processed = 0;

    function processFile(filePath) {
        try {
            const text = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(text);

            let fileChanges = 0;

            // ------------------------
            // 各アイテムの .info (tags配列)
            // ------------------------
            if (Array.isArray(data.tags)) {
                data.tags = data.tags.map(t => {
                    if (typeof t === 'string' && t.includes(from)) {
                        fileChanges++;
                        let replaced;
                        if (from === "_") {
                            // 単独の "_" だけ置換（__ は対象外）
                            replaced = t.replace(/(?<!_)_(?!_)/, to);
                        } else if (from === "__") {
                            // "__" だけ置換
                            replaced = t.replace(/__/, to);
                        } else {
                            // 通常の任意文字
                            replaced = t.replace(new RegExp(escapeRegExp(from)), to);
                        }
                        // ★ 正規化：選んだ区切り文字に揃える
                        const dupPattern = new RegExp(`${escapeRegExp(to)}{2,}`, "g");
                        replaced = replaced.replace(dupPattern, to);
                        return replaced;
                    }

                    if (typeof t === 'object' && t.name && t.name.includes(from)) {
                        fileChanges++;
                        let replaced;
                        if (from === "_") {
                            replaced = t.name.replace(/(?<!_)_(?!_)/, to);
                        } else if (from === "__") {
                            replaced = t.name.replace(/__/, to);
                        } else {
                            replaced = t.name.replace(new RegExp(escapeRegExp(from)), to);
                        }
                        const dupPattern = new RegExp(`${escapeRegExp(to)}{2,}`, "g");
                        replaced = replaced.replace(dupPattern, to);
                        t.name = replaced;
                    }




                    return t;
                });
            }

            // ------------------------
            // tags.json (historyTags, starredTags)
            // ------------------------
            if (Array.isArray(data.historyTags)) {
                data.historyTags = data.historyTags.map(t => {
                    if (t.includes(from)) {
                        fileChanges++;
                        let replaced = t.replace(new RegExp(escapeRegExp(from), 'g'), to);
                        return replaced.replace(/：{2,}/g, "：");
                    }
                    return t;
                });
            }

            if (Array.isArray(data.starredTags)) {
                data.starredTags = data.starredTags.map(t => {
                    if (t.includes(from)) {
                        fileChanges++;
                        let replaced = t.replace(new RegExp(escapeRegExp(from), 'g'), to);
                        return replaced.replace(/：{2,}/g, "：");
                    }
                    return t;
                });
            }

            // ------------------------
            // 保存処理
            // ------------------------
            if (fileChanges > 0) {
                saveJsonOneLine(filePath, data, text);
                convertedCount += fileChanges;
                logs.push(`${filePath}: ${fileChanges}`);
            }
        } catch (e) {
            // JSONじゃないファイルは無視
        }

        // ------------------------
        // 進捗送信
        // ------------------------
        processed++;
        const percent = Math.floor((processed / allFiles.length) * 100);
        event.sender.send("progress", { processed, total: allFiles.length, percent });
    }

    allFiles.forEach(f => processFile(f));

    return {
        success: true,
        message: `${convertedCount} 件のタグを変換しました / Converted ${convertedCount} tags.`,
        logs
    };

});




//カテゴリとセパレーター
ipcMain.handle('convert-category', async (event, { libPath, oldCat, oldSep, newCat, newSep }) => {
    if (!libPath) return { success: false, message: 'No library' };

    let convertedCount = 0;
    let logs = [];

    // 総ファイル収集
    function collectFiles(dir, list = []) {
        fs.readdirSync(dir).forEach(f => {
            const full = path.join(dir, f);
            const stat = fs.statSync(full);
            if (stat.isDirectory()) collectFiles(full, list);
            else if (f.endsWith('.json') || f.endsWith('.info')) list.push(full);
        });
        return list;
    }
    const allFiles = collectFiles(libPath);
    let processed = 0;

    function processFile(filePath) {
        try {
            const text = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(text);
            let fileChanges = 0;

            const replaceCategory = (tag) => {
                if (tag.startsWith(oldCat + oldSep)) {
                    fileChanges++;
                    // 先頭の "oldCat + oldSep" をまるごと置換
                    return newCat + newSep + tag.slice((oldCat + oldSep).length);
                }
                return tag;
            };


            // tags 配列
            if (Array.isArray(data.tags)) {
                data.tags = data.tags.map(t => {
                    if (typeof t === 'string') return replaceCategory(t);
                    if (typeof t === 'object' && t.name) {
                        t.name = replaceCategory(t.name);
                        return t;
                    }
                    return t;
                });
            }

            // historyTags / starredTags
            if (Array.isArray(data.historyTags)) {
                data.historyTags = data.historyTags.map(replaceCategory);
            }
            if (Array.isArray(data.starredTags)) {
                data.starredTags = data.starredTags.map(replaceCategory);
            }

            if (fileChanges > 0) {
                saveJsonOneLine(filePath, data, text);
                convertedCount += fileChanges;
                logs.push(`${filePath}: ${fileChanges} [Cat+Sep]`);
            }
        } catch (e) {
            // JSON以外は無視
        }

        // 進捗送信
        processed++;
        const percent = Math.floor((processed / allFiles.length) * 100);
        event.sender.send("progress", { processed, total: allFiles.length, percent });
    }

    allFiles.forEach(f => processFile(f));
    return {
        success: true,
        message: `${convertedCount} 件のタグを変換しました / Converted ${convertedCount} tags.`,
        logs
    };
});



//カテゴリ名のみ
ipcMain.handle('convert-catOnly', async (event, { libPath, oldCat, newCat, sep }) => {
    if (!libPath) return { success: false, message: 'No library' };
    let convertedCount = 0;
    let logs = [];

    function collectFiles(dir, list = []) {
        fs.readdirSync(dir).forEach(f => {
            const full = path.join(dir, f);
            const stat = fs.statSync(full);
            if (stat.isDirectory()) collectFiles(full, list);
            else if (f.endsWith('.json') || f.endsWith('.info')) list.push(full);
        });
        return list;
    }
    const allFiles = collectFiles(libPath);
    let processed = 0;

    function processFile(filePath) {
        try {
            const text = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(text);
            let fileChanges = 0;

            const replaceCategory = (tag) => {
                if (tag.startsWith(oldCat + sep)) {
                    fileChanges++;
                    return newCat + sep + tag.slice((oldCat + sep).length);
                }
                return tag;
            };

            if (Array.isArray(data.tags)) {
                data.tags = data.tags.map(t => {
                    if (typeof t === 'string') return replaceCategory(t);
                    if (typeof t === 'object' && t.name) {
                        t.name = replaceCategory(t.name);
                        return t;
                    }
                    return t;
                });
            }

            if (Array.isArray(data.historyTags)) {
                data.historyTags = data.historyTags.map(replaceCategory);
            }
            if (Array.isArray(data.starredTags)) {
                data.starredTags = data.starredTags.map(replaceCategory);
            }

            if (fileChanges > 0) {
                saveJsonOneLine(filePath, data, text);
                convertedCount += fileChanges;
                logs.push(`${filePath}: ${fileChanges} [Category]`);
            }
        } catch (e) { }
        processed++;
        const percent = Math.floor((processed / allFiles.length) * 100);
        event.sender.send("progress", { processed, total: allFiles.length, percent });
    }

    allFiles.forEach(f => processFile(f));
    return {
        success: true,
        message: `${convertedCount} 件のタグを変換しました / Converted ${convertedCount} tags.`,
        logs
    };
});






// ▼ 復元処理
ipcMain.handle('restore-backups', async (event, { libPath }) => {
    console.log("restore-backups called:", libPath); // ★追加
    if (!libPath) {
        return {
            success: false,
            message: "ライブラリが選択されていません / No library selected.",
            logs: []
        };
    }

    let restoredCount = 0;

    function walk(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                walk(fullPath); // 再帰で全階層へ
            } else if (file.endsWith('.json.bak')) {
                const targetPath = fullPath.replace(/\.bak$/, '');
                fs.copyFileSync(fullPath, targetPath); // 上書き復元
                restoredCount++;
            }
        }
    }

    walk(libPath); // 最初の呼び出し：libPath直下 + 下層全部

    return {
        success: true,
        message: `${restoredCount} 件のファイルを復元しました / Restored ${restoredCount} files.`,
        logs: []
    };

});






// ▼ バックアップ削除処理
ipcMain.handle('delete-backups', async (event, { libPath }) => {
    if (!libPath) {
        return { success: false, message: "No library selected." };
    }

    let deletedCount = 0;

    function walk(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                walk(fullPath);
            } else if (file.endsWith('.bak')) {
                fs.unlinkSync(fullPath);
                deletedCount++;
            }
        }
    }

    walk(libPath);

    return {
        success: true,
        message: `${deletedCount} 件のバックアップを削除しました / Deleted ${deletedCount} backups.`
    };
});




//ヘルプ
function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true
        }
    });

    win.loadFile("index.html");

    // ヘルプメニューを作成
    const template = [
        {
            label: "ヘルプ",
            submenu: [
                {
                    label: "Open Readme (readme.txt)",
                    click: () => {
                        // インストール先にパッケージされた readme.txt を開く
                        const readmePath = path.join(process.resourcesPath, "readme.txt");
                        shell.openPath(readmePath);
                    }
                },
                {
                    label: "Open GitHub Releases",
                    click: () => {
                        shell.openExternal("https://github.com/averyworks/eagle-tag-converter/releases/latest");
                    }
                },
                {
                    label: "Open tagflot Page",
                    click: () => {
                        shell.openExternal("https://flotidot.com/tools/tagflot/index.html");
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}
