# Eagle Tag Converter

Eagle のタグ名に使われている「区切り文字」や「カテゴリ名」を一括で変換できるツールです。  
大量のタグを一度に整理したいときに利用できます。

---

## 使い方

1. アプリを起動するとウィンドウが表示されます。

2. 「ライブラリ選択」ボタンを押して、Eagle のライブラリフォルダを選びます。

   ■ ライブラリの探し方：
   - Eagle で任意のアイテムを右クリックして「エクスプローラーで開く」を選びます。
   - 保存されているファイルのフォルダが開きます。
   - そこから上層に移動すると「〇〇.library」というフォルダがあります。
   - そのフォルダを選択してください。

3. モードを選択します。
   - 01.区切り変換  
     タグ内の「：」「__」「_」を一括で変換します。
   - 02.区切り + カテゴリ名変換  
     カテゴリ名と区切り文字をまとめて変換します。
   - 03.カテゴリ名変換  
     カテゴリ名だけを変換します（区切りは維持）。

4. 必要に応じてカテゴリ名や区切り文字を入力・選択してください。

5. 「変換開始」ボタンを押すと処理が始まります。  
   進捗バーとログに処理結果が表示されます。

---

## バックアップと復元

- 変換前に自動でバックアップ (.bak) ファイルが作成されます。
- 復元する場合は「復元」ボタンを押してください。  
  元のタグファイルに上書きされ、最初に変換する直前の状態に戻ります。
- 復元を確認して問題なければ、「バックアップ削除」ボタンを押すことで  
  `.bak` ファイルを一括で削除できます。

---

## 反映方法

変換後の結果を Eagle に反映させるには、  
Eagle のメニューから **「ライブラリ > キャッシュをクリアして再度読み込み」** を選んでください。  
Eagle を再起動する必要はありません。

---

## ダウンロード

最新版のビルド済みファイルは GitHub Releases から取得できます：  
👉 [Releases ページ](https://github.com/averyworks/eagle-tag-converter/releases/latest)

- Windows 版（.exe）：動作確認済み  
- Mac 版（.dmg）：理屈上動作するはずですが未検証です。自己責任でご利用ください。  

---

## 注意事項

- このツールは **自己責任でご利用ください**。  
- Mac 版は未検証のため、必ずライブラリフォルダをコピーしてバックアップを取ってからご利用ください。  
- 本ツールの利用によって生じたいかなる不具合についても、作者は責任を負いません。



---

# English

## Eagle Tag Converter

This tool allows you to batch-convert the "separator characters" and "category names" used in Eagle tags.  
It helps when you want to reorganize many tags at once.

---

## How to use

1. Launch the app and a window will appear.

2. Click the **Select Library** button and choose your Eagle library folder.

   ■ How to find the library folder:  
   - In Eagle, right-click any item and choose **Open in Explorer/Finder**.  
   - The folder containing the file will open.  
   - Go up a few levels until you see a folder ending with `.library`.  
   - Select that folder.  

   *Note: The menu wording in Eagle may differ slightly depending on your system language or Eagle version.*


3. Choose a mode:
   - **01.Separator conversion**  
     Convert separators in tags ( `：` / `__` / `_` ).
   - **02.Category + Separator conversion**  
     Convert both the category name and separator together.
   - **03.Category only conversion**  
     Convert only the category name (keep the separator).

4. Enter or select the category/separator you want.

5. Click **Start Conversion**.  
   A progress bar and log will show the results.

---

## Backup & Restore

- A backup file (`.bak`) is automatically created before conversion.  
- To restore, click the **Restore** button.  
  This overwrites the tag file with its original state before conversion.  
- Once confirmed, you can clean up by clicking **Delete Backups**, which removes all `.bak` files.

---

## Apply changes in Eagle

To reflect the changes in Eagle:  
Use **Menu > Library > Clear Cache and Reload**.  
Restarting Eagle is not required.

---

## Download

Get the latest build from GitHub Releases:  
👉 [Releases Page](https://github.com/averyworks/eagle-tag-converter/releases/latest)

- Windows (.exe): Verified working  
- Mac (.dmg): Theoretically works, but **untested**. Use at your own risk.  

---

## Notes

- Use this tool **at your own risk**.  
- For Mac users, please back up your library folder before using.  
- The author is not responsible for any issues caused by this tool.



# 繁體中文 (Taiwan)

## Eagle Tag Converter

這個工具可以批次轉換 Eagle 標籤中的「分隔符號」與「類別名稱」。  
適合在需要一次整理大量標籤時使用。

---

## 使用方法

1. 啟動應用程式後會顯示視窗。

2. 點擊 **「ライブラリ選択 / Select Library」** 按鈕，選擇 Eagle 的資料庫資料夾。

   ■ 尋找資料庫的方法：  
   - 在 Eagle 裡，對任意項目點右鍵並選擇 **在檔案總管/ Finder 中開啟**。  
   - 會打開該檔案所在的資料夾。  
   - 向上返回幾層，直到看到以 `.library` 結尾的資料夾。  
   - 選擇該資料夾。

3. 選擇模式：  
   - **「01.区切り変換 / Separator Conversion」**  
     一次轉換標籤內的「：」「__」「_」。  
   - **「02.区切り + カテゴリ名変換 / Category + Separator Conversion」**  
     同時轉換類別名稱與分隔符號。  
   - **「03.カテゴリ名変換 / Category Only Conversion」**  
     只轉換類別名稱（保留分隔符號）。

4. 輸入或選擇需要的類別名稱或分隔符號。

5. 點擊 **「変換開始 / Start Conversion」**。  
   進度條與日誌會顯示處理結果。

---

## 備份與還原

- 轉換前會自動建立 `.bak` 備份檔案。  
- 如需還原，點擊 **「復元 / Restore」** 按鈕。  
  會覆蓋回轉換前的原始狀態。  
- 確認無問題後，可點擊 **「バックアップ削除 / Delete Backups」** 來清理所有 `.bak` 檔案。

---

## 在 Eagle 中套用變更

要讓 Eagle 反映變更：  
請使用 Eagle 的選單 **「資料庫 > 清除快取並重新載入」**（注意：實際 Eagle 介面中的表述可能略有不同）。  
不需要重新啟動 Eagle。

---

## 下載

從 GitHub Releases 下載最新版本：  
👉 [Releases 頁面](https://github.com/averyworks/eagle-tag-converter/releases/latest)

- Windows (.exe)：已確認可運作  
- Mac (.dmg)：理論上可用，但尚未測試。**請自行承擔風險**。  

---

## 注意事項

- 本工具 **請自行承擔使用風險**。  
- Mac 使用者建議在使用前先複製整個資料庫資料夾備份。  
- 本工具導致的任何問題，作者概不負責。
