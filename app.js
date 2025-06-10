const app = document.getElementById('app');
const scriptList = JSON.parse(localStorage.getItem('scripts')) || [];

function renderUploadPage() {
  app.innerHTML = `
    <h2>Upload Script</h2>
    <input type="text" id="scriptName" placeholder="Script Name" />
    <textarea id="scriptContent" rows="10" placeholder="Paste your script here..."></textarea>
    <button onclick="uploadScript()">Upload</button>
  `;
}

function renderScriptListPage() {
  app.innerHTML = `
    <h2>Script List</h2>
    <input type="text" id="searchBox" placeholder="Search scripts..." oninput="filterScripts()" />
    <ul id="scriptList"></ul>
  `;
  displayScripts(scriptList);
}

function uploadScript() {
  const name = document.getElementById('scriptName').value.trim();
  const content = document.getElementById('scriptContent').value.trim();
  if (!name || !content) return alert("Fill in both fields.");

  const script = { id: Date.now(), name, content };
  scriptList.push(script);
  localStorage.setItem('scripts', JSON.stringify(scriptList));
  location.hash = '#/script';
}

function displayScripts(list) {
  const ul = document.getElementById('scriptList');
  ul.innerHTML = '';
  list.forEach(script => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${script.name}</strong>
      <button onclick="viewScript(${script.id})" style="float:right">View</button>
    `;
    ul.appendChild(li);
  });
}

function viewScript(id) {
  const script = scriptList.find(s => s.id === id);
  if (!script) return;

  app.innerHTML = `
    <h2>${script.name}</h2>
    <pre style="white-space:pre-wrap;background:#111;padding:1rem;border-radius:10px;">${script.content}</pre>
    <button onclick="window.history.back()">Back</button>
  `;
}

function filterScripts() {
  const term = document.getElementById('searchBox').value.toLowerCase();
  const filtered = scriptList.filter(s => s.name.toLowerCase().includes(term));
  displayScripts(filtered);
}

function router() {
  const hash = location.hash;
  if (hash === '#/upload') renderUploadPage();
  else if (hash === '#/script') renderScriptListPage();
  else app.innerHTML = `<h2>Welcome to ScriptHub</h2><p>Use the menu to upload or view scripts.</p>`;
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
    
