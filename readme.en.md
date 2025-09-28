# Eagle Tag Converter

※ This readme is the English version.  
日本語版・繁體中文版の説明書は GitHub Releases ページに掲載しています：  
👉 https://github.com/averyworks/eagle-tag-converter/releases/latest

---

## Overview
A tool to batch-convert separator characters and category names in Eagle tags.  
Useful when you want to organize a large number of tags at once.

---

## Download
Get the latest build from GitHub Releases:  
👉 [Releases Page](https://github.com/averyworks/eagle-tag-converter/releases/latest)

- **Windows (.exe installer)**: Verified working  
- **Mac (.dmg)**: Theoretically works, but untested. Use at your own risk.  

---

## Installation

### Windows
- Run `Eagle Tag Converter Setup x.x.x.exe`.  
- The installer will start, and a shortcut will be added to the Start Menu.  
- To uninstall, use **Apps & Features** in Windows settings.  

### Mac
- Open `Eagle Tag Converter-x.x.x.dmg` and drag the app into the **Applications** folder.  
- To uninstall, simply delete the app from Finder.  
- *Note: Mac version is untested. Please back up your Eagle library before use.*  

---

## Update
- Download the latest file when a new version is released.  
- **Windows**: Run the new `Setup.exe` to update (no uninstall needed).  
- **Mac**: Delete the old app, then copy the new app from dmg to Applications again.  

---

## How to use

⚠ **Important:**  
Before running a conversion, make sure to **close Eagle**.  
If Eagle is running, cache may prevent the changes from being applied correctly.  

1. Launch the app and a window will appear.  

2. Click the **ライブラリ選択 / Select Library** button and choose your Eagle library folder.  

   **How to find your library folder**:  
   - In Eagle, right-click any item and choose **Open in Explorer/Finder**.  
   - The folder containing that file will open.  
   - Move up until you find a folder ending with `.library`.  
   - Select that folder.  

3. Choose a mode:  
   - **01. 区切り変換 / Separator conversion**  
     Convert separators in tags (`：`, `__`, `_`).  
   - **02. 区切り + カテゴリ名変換 / Category + Separator conversion**  
     Convert both category names and separators.  
   - **03. カテゴリ名変換 / Category only conversion**  
     Convert only the category names (keep separators).  

4. Enter or select the category/separator you want.  

5. Click **変換開始 / Start Conversion**.  
   A progress bar and log will show the results.  

---

## Backup & Restore
- A backup file (`.bak`) is automatically created before conversion.  
- To restore, click the **復元 / Restore** button.  
  This overwrites the tag file with its original state before conversion.  
- Once confirmed, you can clean up by clicking **バックアップ削除 / Delete Backups**, which removes all `.bak` files.  

⚠ **Note:**  
If you keep the previous backup when running multiple conversions, restoring will also revert the changes that were already successful.  
Please delete old `.bak` files after confirming a restore before starting a new conversion.  

---

## Apply changes in Eagle
To reflect changes in Eagle:  
Use **Menu > Library > Clear Cache and Reload**.  

---

## Notes
- Use this tool **at your own risk**.  
- For Mac users, always back up your library before use.  
- The author is not responsible for any issues caused by this tool.  

---

## Version
- Version: 1.0.0  
- Release Date: 2025-09-28  

---

## License
This tool is free to use but comes with **no warranty**.  
Use at your own risk.  
