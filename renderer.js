
const ipc = window.electronAPI;


let libPath = null;

document.addEventListener("DOMContentLoaded", () => {
  // UI参照
  const convertBtn = document.getElementById("convert");
  const bar = document.getElementById("progress-bar");
  const text = document.getElementById("progress-text");
  const sepSelect = document.getElementById("sepCatOnly");
  const sepPreview = document.getElementById("sepPreview");
  const restoreBtn = document.getElementById("restore-button");
  const logEl = document.getElementById("log");

  const deleteBtn = document.getElementById("delete-backups");

  // ライブラリ選択
  const selectBtn = document.getElementById("selectLib");
  const libPathEl = document.getElementById("libPath");

  selectBtn.addEventListener("click", async () => {
    libPath = await ipc.selectLibrary();
    libPathEl.textContent = libPath || "未選択 / None";
  });


  // モード切り替え
  const radios = document.querySelectorAll("input[name='mode']");
  const updateMode = () => {
    const mode = document.querySelector("input[name='mode']:checked").value;
    document.getElementById("mode-separator").style.display = (mode === "separator") ? "block" : "none";
    document.getElementById("mode-category").style.display = (mode === "category") ? "block" : "none";
    document.getElementById("mode-catOnly").style.display = (mode === "catOnly") ? "block" : "none";
  };
  radios.forEach(r => r.addEventListener("change", updateMode));
  updateMode();

  // 変換開始
  convertBtn.addEventListener("click", async () => {
    if (!libPath) {
      logEl.textContent = "ライブラリを選択してください / Please select a library";
      return;
    }

    // 進捗初期化
    bar.value = 0;
    text.textContent = "Progress: 0% (0/0)";
    logEl.textContent = "Processing...";

    const mode = document.querySelector("input[name='mode']:checked").value;
    let result;

    if (mode === "separator") {
      // 区切り文字 置換モード
      const from = document.getElementById("from").value;
      const to = document.getElementById("to").value;
      result = await ipc.convertTags({ libPath, from, to });
    } else if (mode === "category") {
      // カテゴリ名＋区切り 置換モード
      const oldCat = document.getElementById("oldCat").value;
      const newCat = document.getElementById("newCat").value;
      const oldSep = document.getElementById("oldSep").value;
      const newSep = document.getElementById("newSep").value;

      if (!oldCat || !newCat) {
        logEl.textContent = "カテゴリ名を入力してください / Please enter a category name";
        return;
      }

      result = await ipc.convertCategory({ libPath, oldCat, oldSep, newCat, newSep });

    } else if (mode === "catOnly") {
      const oldCat = document.getElementById("oldCatOnly").value;
      const newCat = document.getElementById("newCatOnly").value;
      const sep = document.getElementById("sepCatOnly").value;


      if (!oldCat || !newCat) {
        logEl.textContent = "カテゴリ名を入力してください / Please enter a category name";
        return;
      }

      result = await ipc.convertCatOnly({ libPath, oldCat, newCat, sep });


    }

    // 完了表示（convert-category でもゲージが 100% になるよう main.js も後述の通り修正）
    bar.value = 100;
    text.textContent = "Progress: 100% Done";
    logEl.textContent = result.message + "\n" + result.logs.join("\n");
  });




  //カテゴリのみの場合のセパレータ表示連動

  // 初期表示
  sepPreview.textContent = sepSelect.value;

  // 選択変更時に反映
  sepSelect.addEventListener("change", () => {
    sepPreview.textContent = sepSelect.value;
  });




  //復元処理
  restoreBtn.addEventListener("click", async () => {
    if (!libPath) {
      logEl.textContent = "ライブラリを選択してください / Please select a library";
      return;
    }

    const result = await ipc.restoreBackups({ libPath }); // ← 他と同じ形式に統一
    console.log("restore result:", result);
    logEl.textContent = result.message;
  });







  //バックアップ削除処理
  deleteBtn.addEventListener("click", async () => {
    if (!libPath) return;
    const result = await ipc.deleteBackups({ libPath });
    logEl.textContent = result.message;
  });





});

// 進捗受信
ipc.onProgress((e, { processed, total, percent }) => {
  const bar = document.getElementById("progress-bar");
  const text = document.getElementById("progress-text");
  bar.value = percent;
  text.textContent = `Progress: ${percent}% (${processed}/${total})`;
});


