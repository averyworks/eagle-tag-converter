# Eagle Tag Converter

※ 本說明文件為繁體中文版。  
日本語版・English version 的說明書請參考 GitHub Releases 頁面：  
👉 https://github.com/averyworks/eagle-tag-converter/releases/latest

---

## 概要
這個工具可以批次轉換 Eagle 標籤中的「分隔符號」與「類別名稱」。  
適合在需要一次整理大量標籤時使用。  

---

## 下載
從 GitHub Releases 下載最新版本：  
👉 [Releases 頁面](https://github.com/averyworks/eagle-tag-converter/releases/latest)

- **Windows (.exe 安裝程式)**：已確認可運作  
- **Mac (.dmg)**：理論上可用，但尚未測試，請自行承擔風險。  

---

## 安裝方法

### Windows
- 執行 `Eagle Tag Converter Setup x.x.x.exe`。  
- 安裝程式將啟動，並在開始功能表中建立捷徑。  
- 移除請透過 Windows 設定中的 **應用程式與功能**。  

### Mac
- 開啟 `Eagle Tag Converter-x.x.x.dmg`，將應用程式拖曳至 **Applications** 資料夾。  
- 移除只需在 Finder 中刪除該應用程式。  
- ※ Mac 版本尚未測試，建議先完整備份 Eagle 資料庫。  

---

## 更新方法
- 有新版本時，請下載最新版。  
- **Windows**：直接執行新的 `Setup.exe` 會覆蓋更新（不需要先移除）。  
- **Mac**：刪除舊應用程式，再從 dmg 複製新版到 Applications。  

---

## 使用方法

⚠ **注意：**  
在執行轉換之前，請務必 **先關閉 Eagle**。  
若 Eagle 持續開啟，快取可能會導致變更無法正確套用。  

1. 啟動應用程式後會顯示視窗。  

2. 點擊 **ライブラリ選択 / Select Library** 按鈕，選擇 Eagle 的資料庫資料夾。  

   **尋找資料庫的方法**：  
   - 在 Eagle 裡，對任意項目按右鍵並選擇 **在檔案總管 / Finder 中開啟**。  
   - 會打開該檔案所在的資料夾。  
   - 往上返回直到看到以 `.library` 結尾的資料夾。  
   - 選擇該資料夾。  

3. 選擇模式：  
   - **01. 区切り変換 / Separator Conversion**  
     一次轉換標籤內的「：」「__」「_」。  
   - **02. 区切り + カテゴリ名変換 / Category + Separator Conversion**  
     同時轉換類別名稱與分隔符號。  
   - **03. カテゴリ名変換 / Category Only Conversion**  
     只轉換類別名稱（保留分隔符號）。  

4. 輸入或選擇需要的類別名稱或分隔符號。  

5. 點擊 **変換開始 / Start Conversion**。  
   進度條與日誌會顯示處理結果。  

---

## 備份與還原
- 轉換前會自動建立 `.bak` 備份檔案。  
- 如需還原，點擊 **復元 / Restore** 按鈕。  
  會覆蓋回轉換前的原始狀態。  
- 確認無問題後，可點擊 **バックアップ削除 / Delete Backups** 來清理所有 `.bak` 檔案。  

⚠ **注意：**  
若在多次轉換時保留前一次的備份，還原時會連同「前一次已成功的變更」一併恢復。  
建議在確認還原後，刪除 `.bak` 檔案，再進行新的轉換。  

---

## 在 Eagle 中套用變更
要讓 Eagle 反映變更：  
請使用 Eagle 的選單 **「資料庫 > 清除快取並重新載入」**。  

---

## 注意事項
- 本工具 **請自行承擔使用風險**。  
- Mac 使用者建議在使用前先複製整個資料庫備份。  
- 本工具導致的任何問題，作者概不負責。  

---

## 版本資訊
- 版本：1.0.0  
- 發行日期：2025-09-28  

---

## 授權
本工具可免費使用，但 **不提供任何保證**。  
請自行承擔風險。  
