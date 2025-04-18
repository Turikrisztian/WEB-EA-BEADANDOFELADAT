const apiUrl = "https://jsonplaceholder.typicode.com/posts";
const dataList = document.getElementById("dataList");
const statsDiv = document.getElementById("stats");
const responseMessage = document.getElementById("responseMessage");

let localData = [];

function renderList() {
  dataList.innerHTML = localData.map(item =>
    `<li><strong>#${item.id}</strong>: ${item.title} — Height: ${item.height ?? '-'}</li>`
  ).join("");

  const heights = localData.map(i => i.height).filter(h => typeof h === "number");
  if (heights.length) {
    const sum = heights.reduce((a, b) => a + b, 0);
    const avg = (sum / heights.length).toFixed(2);
    const max = Math.max(...heights);
    statsDiv.innerHTML = `
      <p>📏 Height összesen: ${sum}</p>
      <p>📐 Átlag: ${avg}</p>
      <p>🚀 Legnagyobb: ${max}</p>
    `;
  } else {
    statsDiv.innerHTML = "<p>📭 Nincs height adat.</p>";
  }
}

async function fetchData() {
  responseMessage.textContent = "🔄 Adatok betöltése...";
  const response = await fetch(apiUrl);
  const data = await response.json();
  localData = data.slice(0, 5).map(item => ({
    id: item.id,
    title: item.title,
    height: Math.floor(Math.random() * 100 + 100) // csak demó érték
  }));
  renderList();
  responseMessage.textContent = "✅ Adatok betöltve.";
}

function validate(title, height) {
  if (!title || title.length > 30) {
    alert("❌ A cím kötelező és maximum 30 karakter lehet.");
    return false;
  }
  if (!height || isNaN(height)) {
    alert("❌ A height mező kötelező és számnak kell lennie.");
    return false;
  }
  return true;
}

async function createData() {
  const title = document.getElementById("newTitle").value.trim();
  const height = parseInt(document.getElementById("newHeight").value);
  if (!validate(title, height)) return;

  const response = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({ title, height }),
    headers: { "Content-type": "application/json" }
  });

  const result = await response.json();
  result.id = localData.length ? Math.max(...localData.map(i => i.id)) + 1 : 1;
  result.height = height;
  localData.push(result);
  renderList();
  responseMessage.textContent = "✅ Új bejegyzés hozzáadva!";
}

function getDataForId() {
  const id = parseInt(document.getElementById("updateId").value);
  const entry = localData.find(item => item.id === id);
  if (!entry) {
    alert("❌ Nincs ilyen ID!");
    return;
  }
  document.getElementById("updateTitle").value = entry.title;
  document.getElementById("updateHeight").value = entry.height;
}

async function updateData() {
  const id = parseInt(document.getElementById("updateId").value);
  const title = document.getElementById("updateTitle").value.trim();
  const height = parseInt(document.getElementById("updateHeight").value);

  if (!id || !validate(title, height)) return;

  const response = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, height }),
    headers: { "Content-type": "application/json" }
  });

  const index = localData.findIndex(item => item.id === id);
  if (index !== -1) {
    localData[index].title = title;
    localData[index].height = height;
    renderList();
    responseMessage.textContent = "✏️ Bejegyzés frissítve!";
  } else {
    alert("❌ Nincs ilyen ID!");
  }
}

async function deleteData() {
  const id = parseInt(document.getElementById("deleteId").value);
  if (!id) return alert("❌ Adj meg egy ID-t!");

  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });

  localData = localData.filter(item => item.id !== id);
  renderList();
  responseMessage.textContent = "🗑️ Bejegyzés törölve!";
}

