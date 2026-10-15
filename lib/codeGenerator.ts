// Vibecode Code Generator Engine
// Generates fully functional HTML/CSS/JS apps from natural language prompts

export interface GeneratedApp {
  html: string;
  css: string;
  js: string;
  title: string;
}

interface AppContext {
  prompt: string;
  features: string[];
  color: string;
  darkMode: boolean;
  appType: string;
}

const DEFAULT_COLOR = "#6c5ce7";

export function generateApp(prompt: string, history: string[]): GeneratedApp {
  const context = analyzePrompt(prompt, history);
  const generator = getGenerator(context.appType);
  return generator(context);
}

function analyzePrompt(prompt: string, history: string[]): AppContext {
  const text = (prompt + " " + history.join(" ")).toLowerCase();

  // Detect app type
  let appType = "generic";
  if (text.includes("todo") || text.includes("to-do") || text.includes("task") || text.includes("opdracht")) appType = "todo";
  else if (text.includes("calculator") || text.includes("calc") || text.includes("rekenmachine")) appType = "calculator";
  else if (text.includes("weather") || text.includes("weer")) appType = "weather";
  else if (text.includes("notes") || text.includes("notitie") || text.includes("memo")) appType = "notes";
  else if (text.includes("timer") || text.includes("stopwatch") || text.includes("klok")) appType = "timer";
  else if (text.includes("pomodoro") || text.includes("focus")) appType = "pomodoro";
  else if (text.includes("form") || text.includes("formulier") || text.includes("survey") || text.includes("enquête")) appType = "form";
  else if (text.includes("dashboard") || text.includes("stats") || text.includes("statistiek")) appType = "dashboard";
  else if (text.includes("chat") || text.includes("message") || text.includes("bericht")) appType = "chat";
  else if (text.includes("gallery") || text.includes("galerij") || text.includes("photo") || text.includes("foto")) appType = "gallery";
  else if (text.includes("music") || text.includes("muziek") || text.includes("player")) appType = "music";
  else if (text.includes("shop") || text.includes("winkel") || text.includes("store") || text.includes("e-commerce")) appType = "shop";
  else if (text.includes("blog") || text.includes("artikel")) appType = "blog";
  else if (text.includes("portfolio") || text.includes("cv") || text.includes("resume")) appType = "portfolio";
  else if (text.includes("landing") || text.includes("website") || text.includes("site")) appType = "landing";
  else if (text.includes("game") || text.includes("spel") || text.includes("quiz")) appType = "quiz";
  else if (text.includes("budget") || text.includes("financ") || text.includes("geld") || text.includes("expense") || text.includes("uitgave")) appType = "budget";
  else if (text.includes("habit") || text.includes("gewoonte") || text.includes("routine")) appType = "habits";
  else if (text.includes("recipe") || text.includes("recept") || text.includes("cook") || text.includes("koken")) appType = "recipes";
  else if (text.includes("project") || text.includes("kanban") || text.includes("board") || text.includes("taak")) appType = "kanban";

  // Detect color
  let color = DEFAULT_COLOR;
  const colorMap: Record<string, string> = {
    "blue": "#3b82f6", "blauw": "#3b82f6",
    "green": "#10b981", "groen": "#10b981",
    "red": "#ef4444", "rood": "#ef4444",
    "orange": "#f97316", "oranje": "#f97316",
    "purple": "#8b5cf6", "paars": "#8b5cf6",
    "pink": "#ec4899", "roze": "#ec4899",
    "yellow": "#eab308", "geel": "#eab308",
    "teal": "#14b8a6", "cyaan": "#14b8a6",
    "indigo": "#6366f1",
  };
  for (const [key, val] of Object.entries(colorMap)) {
    if (text.includes(key)) { color = val; break; }
  }

  // Detect dark mode
  const darkMode = text.includes("dark") || text.includes("donker") || text.includes("nacht");

  // Extract features
  const features: string[] = [];
  if (text.includes("search") || text.includes("zoeken") || text.includes("zoek")) features.push("search");
  if (text.includes("filter") || text.includes("filteren")) features.push("filter");
  if (text.includes("sort") || text.includes("sorteer")) features.push("sort");
  if (text.includes("export") || text.includes("exporteer") || text.includes("download")) features.push("export");
  if (text.includes("share") || text.includes("deel") || text.includes("delen")) features.push("share");
  if (text.includes("notification") || text.includes("melding") || text.includes("notif")) features.push("notifications");
  if (text.includes("animation") || text.includes("animatie") || text.includes("animat")) features.push("animations");
  if (text.includes("responsive") || text.includes("mobiel") || text.includes("mobile")) features.push("responsive");
  if (text.includes("dark mode") || text.includes("donkere modus")) features.push("dark-toggle");
  if (text.includes("login") || text.includes("inloggen") || text.includes("auth")) features.push("auth");
  if (text.includes("chart") || text.includes("grafiek") || text.includes("graph")) features.push("charts");
  if (text.includes("drag") || text.includes("sleep") || text.includes("drag and drop")) features.push("drag-drop");
  if (text.includes("realtime") || text.includes("real-time") || text.includes("live")) features.push("realtime");
  if (text.includes("offline") || text.includes("offline")) features.push("offline");
  if (text.includes("pwa") || text.includes("progressive")) features.push("pwa");

  return { prompt, features, color, darkMode, appType };
}

function getGenerator(appType: string): (ctx: AppContext) => GeneratedApp {
  const generators: Record<string, (ctx: AppContext) => GeneratedApp> = {
    todo: generateTodo,
    calculator: generateCalculator,
    weather: generateWeather,
    notes: generateNotes,
    timer: generateTimer,
    pomodoro: generatePomodoro,
    form: generateForm,
    dashboard: generateDashboard,
    chat: generateChat,
    gallery: generateGallery,
    music: generateMusic,
    shop: generateShop,
    blog: generateBlog,
    portfolio: generatePortfolio,
    landing: generateLanding,
    quiz: generateQuiz,
    budget: generateBudget,
    habits: generateHabits,
    recipes: generateRecipes,
    kanban: generateKanban,
    generic: generateGeneric,
  };
  return generators[appType] || generators.generic;
}

// ============ TODO APP ============
function generateTodo(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const html = `
<div class="app">
  <header class="app-header">
    <div>
      <h1 class="app-title">Tasks</h1>
      <p class="app-subtitle" id="task-count">0 tasks</p>
    </div>
    <div class="header-actions">
      <button class="btn-ghost" id="clear-done">Clear done</button>
    </div>
  </header>
  <div class="input-row">
    <input type="text" id="task-input" placeholder="Add a new task..." class="task-input" autocomplete="off" />
    <button class="btn-primary" id="add-btn">Add</button>
  </div>
  <div class="filter-row">
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="active">Active</button>
    <button class="filter-btn" data-filter="completed">Done</button>
  </div>
  <ul class="task-list" id="task-list"></ul>
  <div class="empty-state" id="empty-state">
    <div class="empty-icon">✓</div>
    <p>No tasks yet. Add one above!</p>
  </div>
</div>`;

  const css = `
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; background:#0a0a0f; color:#f0f0f5; min-height:100vh; }
.app { max-width:560px; margin:0 auto; padding:40px 20px; }
.app-header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:24px; }
.app-title { font-size:28px; font-weight:700; }
.app-subtitle { font-size:14px; color:#8b8b9e; margin-top:4px; }
.header-actions { display:flex; gap:8px; }
.btn-ghost { background:transparent; border:1px solid #2a2a3a; color:#8b8b9e; padding:8px 14px; border-radius:8px; cursor:pointer; font-size:13px; transition:all .2s; }
.btn-ghost:hover { border-color:${c}; color:${c}; }
.input-row { display:flex; gap:10px; margin-bottom:16px; }
.task-input { flex:1; background:#12121a; border:1px solid #2a2a3a; border-radius:10px; padding:14px 16px; color:#f0f0f5; font-size:15px; outline:none; transition:border-color .2s; }
.task-input:focus { border-color:${c}; }
.task-input::placeholder { color:#5a5a6e; }
.btn-primary { background:${c}; color:#fff; border:none; padding:14px 22px; border-radius:10px; font-size:15px; font-weight:600; cursor:pointer; transition:opacity .2s; }
.btn-primary:hover { opacity:.85; }
.filter-row { display:flex; gap:6px; margin-bottom:20px; }
.filter-btn { background:transparent; border:none; color:#8b8b9e; padding:8px 14px; border-radius:8px; font-size:13px; cursor:pointer; transition:all .2s; }
.filter-btn.active { background:${c}22; color:${c}; }
.filter-btn:hover { color:#f0f0f5; }
.task-list { list-style:none; display:flex; flex-direction:column; gap:8px; }
.task-item { display:flex; align-items:center; gap:12px; background:#12121a; border:1px solid #1e1e2e; border-radius:12px; padding:14px 16px; transition:all .2s; animation:slideIn .3s ease; }
.task-item:hover { border-color:#2a2a3a; }
.task-item.completed { opacity:.5; }
.task-item.completed .task-text { text-decoration:line-through; }
@keyframes slideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
.task-check { width:22px; height:22px; border-radius:50%; border:2px solid #3a3a4e; background:transparent; cursor:pointer; flex-shrink:0; display:flex; align-items:center; justify-content:center; transition:all .2s; }
.task-check.checked { background:${c}; border-color:${c}; }
.task-check.checked::after { content:'✓'; color:#fff; font-size:12px; }
.task-text { flex:1; font-size:15px; }
.task-delete { background:transparent; border:none; color:#5a5a6e; cursor:pointer; font-size:18px; padding:4px; transition:color .2s; }
.task-delete:hover { color:#ef4444; }
.empty-state { text-align:center; padding:48px 20px; color:#5a5a6e; }
.empty-icon { width:48px; height:48px; border-radius:50%; background:#1a1a2a; display:flex; align-items:center; justify-content:center; margin:0 auto 16px; font-size:20px; color:${c}; }
.empty-state p { font-size:14px; }
`;

  const js = `
let tasks = JSON.parse(localStorage.getItem('vibecode_tasks') || '[]');
let filter = 'all';
const list = document.getElementById('task-list');
const input = document.getElementById('task-input');
const empty = document.getElementById('empty-state');
const countEl = document.getElementById('task-count');

function save() { localStorage.setItem('vibecode_tasks', JSON.stringify(tasks)); }
function render() {
  const filtered = tasks.filter(t => filter==='all' ? true : filter==='active' ? !t.done : t.done);
  list.innerHTML = filtered.map(t => \`
    <li class="task-item \${t.done?'completed':''}" data-id="\${t.id}">
      <button class="task-check \${t.done?'checked':''}" data-action="toggle"></button>
      <span class="task-text">\${escapeHtml(t.text)}</span>
      <button class="task-delete" data-action="delete">×</button>
    </li>\`).join('');
  empty.style.display = tasks.length ? 'none' : 'block';
  const active = tasks.filter(t=>!t.done).length;
  countEl.textContent = active + ' task' + (active!==1?'s':'');
}
function escapeHtml(s){ const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }
function addTask(){ const v=input.value.trim(); if(!v) return; tasks.unshift({id:Date.now(),text:v,done:false}); input.value=''; save(); render(); }
input.addEventListener('keydown', e=>{ if(e.key==='Enter') addTask(); });
document.getElementById('add-btn').addEventListener('click', addTask);
list.addEventListener('click', e=>{
  const btn = e.target.closest('[data-action]'); if(!btn) return;
  const id = +btn.closest('.task-item').dataset.id;
  if(btn.dataset.action==='toggle'){ const t=tasks.find(t=>t.id===id); t.done=!t.done; }
  else { tasks = tasks.filter(t=>t.id!==id); }
  save(); render();
});
document.querySelectorAll('.filter-btn').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));
  b.classList.add('active'); filter=b.dataset.filter; render();
}));
document.getElementById('clear-done').addEventListener('click',()=>{ tasks=tasks.filter(t=>!t.done); save(); render(); });
render();
`;

  return { html, css, js, title: "Tasks" };
}

// ============ CALCULATOR ============
function generateCalculator(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const html = `
<div class="calc">
  <div class="calc-display">
    <div class="calc-expr" id="expr"></div>
    <div class="calc-result" id="result">0</div>
  </div>
  <div class="calc-grid">
    <button class="btn-fn" data-val="C">C</button>
    <button class="btn-fn" data-val="±">±</button>
    <button class="btn-fn" data-val="%">%</button>
    <button class="btn-op" data-val="/">÷</button>
    <button class="btn-num" data-val="7">7</button>
    <button class="btn-num" data-val="6">6</button>
    <button class="btn-num" data-val="5">5</button>
    <button class="btn-op" data-val="*">×</button>
    <button class="btn-num" data-val="4">4</button>
    <button class="btn-num" data-val="3">3</button>
    <button class="btn-num" data-val="2">2</button>
    <button class="btn-op" data-val="-">−</button>
    <button class="btn-num" data-val="1">1</button>
    <button class="btn-num" data-val="0">0</button>
    <button class="btn-num" data-val=".">.</button>
    <button class="btn-op" data-val="+">+</button>
    <button class="btn-eq" data-val="=">=</button>
  </div>
</div>`;

  const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#f0f0f5;min-height:100vh;display:flex;align-items:center;justify-content:center}
.calc{width:320px;background:#12121a;border-radius:24px;padding:24px;border:1px solid #1e1e2e;box-shadow:0 20px 60px rgba(0,0,0,.4)}
.calc-display{text-align:right;margin-bottom:20px;padding:16px 8px}
.calc-expr{font-size:14px;color:#5a5a6e;min-height:20px}
.calc-result{font-size:42px;font-weight:300;margin-top:4px;word-break:break-all}
.calc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.calc-grid button{height:56px;border-radius:14px;border:none;font-size:18px;font-weight:500;cursor:pointer;transition:all .15s}
.btn-num{background:#1a1a2a;color:#f0f0f5}
.btn-num:hover{background:#252535}
.btn-fn{background:#1a1a2a;color:${c}}
.btn-fn:hover{background:#252535}
.btn-op{background:${c}22;color:${c}}
.btn-op:hover{background:${c}33}
.btn-eq{background:${c};color:#fff;grid-column:span 2}
.btn-eq:hover{opacity:.85}
`;

  const js = `
let expr='',result='0',justCalculated=false;
const exprEl=document.getElementById('expr'),resultEl=document.getElementById('result');
function update(){resultEl.textContent=result;exprEl.textContent=expr;}
function calc(){
  try{
    const e=expr.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-');
    if(!e) return;
    const r=Function('return '+e)();
    result=typeof r==='number'?(Math.round(r*1e10)/1e10).toString():'Error';
    expr='';justCalculated=true;
  }catch{result='Error';expr='';justCalculated=true;}
  update();
}
document.querySelectorAll('.calc-grid button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const v=btn.dataset.val;
    if(v==='C'){expr='';result='0';justCalculated=false;update();return;}
    if(v==='='){calc();return;}
    if(v==='±'){result=result.startsWith('-')?result.slice(1):'-'+result;update();return;}
    if(v==='%'){result=(parseFloat(result)/100).toString();update();return;}
    if(justCalculated){expr=result;result='0';justCalculated=false;}
    if('0123456789.'.includes(v)){result=result==='0'&&v!=='.'?v:result+v;}
    else{expr+=result+v+' ';result='0';}
    update();
  });
});
document.addEventListener('keydown',e=>{
  if('0123456789+-*/.'.includes(e.key)){
    if(justCalculated){expr=result;result='0';justCalculated=false;}
    if('0123456789.'.includes(e.key)){result=result==='0'?e.key:result+e.key;}
    else{expr+=result+e.key+' ';result='0';}
    update();
  }
  if(e.key==='Enter')calc();
  if(e.key==='Escape'){expr='';result='0';update();}
});
`;

  return { html, css, js, title: "Calculator" };
}

// ============ WEATHER ============
function generateWeather(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const html = `
<div class="weather-app">
  <div class="weather-header">
    <div class="search-box">
      <input type="text" id="city-input" placeholder="Search city..." class="search-input" />
      <button class="btn-search" id="search-btn">Search</button>
    </div>
  </div>
  <div class="weather-main" id="weather-main">
    <div class="weather-icon" id="w-icon">☀️</div>
    <div class="weather-temp" id="w-temp">22°</div>
    <div class="weather-desc" id="w-desc">Sunny</div>
    <div class="weather-city" id="w-city">Amsterdam</div>
  </div>
  <div class="weather-details">
    <div class="detail-card"><span class="detail-label">Humidity</span><span class="detail-value" id="d-humid">65%</span></div>
    <div class="detail-card"><span class="detail-label">Wind</span><span class="detail-value" id="d-wind">12 km/h</span></div>
    <div class="detail-card"><span class="detail-label">Pressure</span><span class="detail-value" id="d-press">1013 hPa</span></div>
    <div class="detail-card"><span class="detail-label">UV Index</span><span class="detail-value" id="d-uv">5</span></div>
  </div>
  <div class="forecast" id="forecast"></div>
</div>`;

  const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#f0f0f5;min-height:100vh}
.weather-app{max-width:480px;margin:0 auto;padding:32px 20px}
.search-box{display:flex;gap:10px;margin-bottom:32px}
.search-input{flex:1;background:#12121a;border:1px solid #2a2a3a;border-radius:12px;padding:14px 16px;color:#f0f0f5;font-size:15px;outline:none}
.search-input:focus{border-color:${c}}
.btn-search{background:${c};color:#fff;border:none;padding:14px 20px;border-radius:12px;font-weight:600;cursor:pointer}
.weather-main{text-align:center;padding:32px 0;margin-bottom:24px;background:linear-gradient(135deg,${c}15,${c}05);border-radius:20px;border:1px solid ${c}22}
.weather-icon{font-size:64px;margin-bottom:12px}
.weather-temp{font-size:56px;font-weight:200}
.weather-desc{font-size:16px;color:#8b8b9e;margin-top:4px}
.weather-city{font-size:14px;color:#5a5a6e;margin-top:8px}
.weather-details{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:24px}
.detail-card{background:#12121a;border:1px solid #1e1e2e;border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:6px}
.detail-label{font-size:12px;color:#5a5a6e;text-transform:uppercase;letter-spacing:.5px}
.detail-value{font-size:20px;font-weight:600}
.forecast{display:flex;gap:10px;overflow-x:auto;padding-bottom:8px}
.forecast-day{flex:1;min-width:64px;text-align:center;background:#12121a;border:1px solid #1e1e2e;border-radius:12px;padding:14px 8px}
.forecast-day .day{font-size:12px;color:#5a5a6e;margin-bottom:8px}
.forecast-day .icon{font-size:24px;margin-bottom:8px}
.forecast-day .temp{font-size:14px;font-weight:600}
`;

  const js = `
const cities={
  'amsterdam':{temp:18,desc:'Partly Cloudy',icon:'⛅',humid:72,wind:15,press:1015,uv:4},
  'london':{temp:14,desc:'Rain',icon:'🌧️',humid:85,wind:22,press:1008,uv:2},
  'paris':{temp:20,desc:'Sunny',icon:'☀️',humid:55,wind:10,press:1018,uv:6},
  'berlin':{temp:16,desc:'Cloudy',icon:'☁️',humid:68,wind:12,press:1012,uv:3},
  'new york':{temp:24,desc:'Sunny',icon:'☀️',humid:60,wind:8,press:1020,uv:7},
  'tokyo':{temp:22,desc:'Light Rain',icon:'🌦️',humid:78,wind:14,press:1010,uv:4},
  'sydney':{temp:28,desc:'Clear',icon:'☀️',humid:50,wind:18,press:1022,uv:8},
  'dubai':{temp:38,desc:'Hot & Sunny',icon:'🔥',humid:30,wind:10,press:1015,uv:10},
  'moscow':{temp:8,desc:'Snow',icon:'❄️',humid:80,wind:20,press:1005,uv:1},
  'mumbai':{temp:32,desc:'Monsoon',icon:'🌧️',humid:90,wind:16,press:1008,uv:5}
};
function setWeather(city){
  const d=cities[city.toLowerCase()]||{temp:20,desc:'Clear',icon:'☀️',humid:60,wind:10,press:1013,uv:5};
  document.getElementById('w-icon').textContent=d.icon;
  document.getElementById('w-temp').textContent=d.temp+'°';
  document.getElementById('w-desc').textContent=d.desc;
  document.getElementById('w-city').textContent=city.charAt(0).toUpperCase()+city.slice(1);
  document.getElementById('d-humid').textContent=d.humid+'%';
  document.getElementById('d-wind').textContent=d.wind+' km/h';
  document.getElementById('d-press').textContent=d.press+' hPa';
  document.getElementById('d-uv').textContent=d.uv;
  const days=['Thu','Fri','Sat','Sun','Mon'];
  const icons=['☀️','⛅','🌧️','☀️','⛅'];
  document.getElementById('forecast').innerHTML=days.map((d,i)=>\`
    <div class="forecast-day"><div class="day">\${d}</div><div class="icon">\${icons[i]}</div><div class="temp">\${d.temp+Math.floor(Math.random()*6-3)}°</div></div>\`).join('');
}
document.getElementById('search-btn').addEventListener('click',()=>{
  const v=document.getElementById('city-input').value.trim();
  if(v) setWeather(v);
});
document.getElementById('city-input').addEventListener('keydown',e=>{
  if(e.key==='Enter'){const v=e.target.value.trim();if(v)setWeather(v);}
});
setWeather('Amsterdam');
`;

  return { html, css, js, title: "Weather" };
}

// ============ NOTES ============
function generateNotes(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const html = `
<div class="notes-app">
  <header class="notes-header">
    <h1 class="notes-title">Notes</h1>
    <button class="btn-primary" id="new-note">+ New</button>
  </header>
  <div class="notes-layout">
    <aside class="notes-sidebar" id="sidebar">
      <div class="sidebar-search">
        <input type="text" id="note-search" placeholder="Search notes..." class="sidebar-input" />
      </div>
      <div class="notes-list" id="notes-list"></div>
    </aside>
    <main class="notes-editor">
      <input type="text" id="note-title" placeholder="Title" class="editor-title" />
      <textarea id="note-body" placeholder="Start writing..." class="editor-body"></textarea>
      <div class="editor-footer">
        <span id="note-date"></span>
        <button class="btn-danger" id="delete-note">Delete</button>
      </div>
    </main>
  </div>
</div>`;

  const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#f0f0f5;min-height:100vh}
.notes-app{height:100vh;display:flex;flex-direction:column}
.notes-header{display:flex;justify-content:space-between;align-items:center;padding:16px 24px;border-bottom:1px solid #1e1e2e}
.notes-title{font-size:20px;font-weight:700}
.btn-primary{background:${c};color:#fff;border:none;padding:10px 18px;border-radius:8px;font-weight:600;cursor:pointer;font-size:14px}
.notes-layout{flex:1;display:flex;overflow:hidden}
.notes-sidebar{width:280px;border-right:1px solid #1e1e2e;display:flex;flex-direction:column}
.sidebar-search{padding:12px;border-bottom:1px solid #1e1e2e}
.sidebar-input{width:100%;background:#12121a;border:1px solid #2a2a3a;border-radius:8px;padding:10px 12px;color:#f0f0f5;font-size:13px;outline:none}
.sidebar-input:focus{border-color:${c}}
.notes-list{flex:1;overflow-y:auto}
.note-item{padding:14px 16px;border-bottom:1px solid #1a1a2a;cursor:pointer;transition:background .15s}
.note-item:hover{background:#12121a}
.note-item.active{background:${c}15;border-left:3px solid ${c}}
.note-item-title{font-size:14px;font-weight:600;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.note-item-preview{font-size:12px;color:#5a5a6e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.notes-editor{flex:1;display:flex;flex-direction:column;padding:24px}
.editor-title{background:transparent;border:none;color:#f0f0f5;font-size:24px;font-weight:700;outline:none;margin-bottom:16px}
.editor-title::placeholder{color:#3a3a4e}
.editor-body{flex:1;background:transparent;border:none;color:#f0f0f5;font-size:15px;line-height:1.7;outline:none;resize:none;font-family:inherit}
.editor-body::placeholder{color:#3a3a4e}
.editor-footer{display:flex;justify-content:space-between;align-items:center;padding-top:16px;border-top:1px solid #1e1e2e;margin-top:16px}
#note-date{font-size:12px;color:#5a5a6e}
.btn-danger{background:transparent;border:1px solid #ef444444;color:#ef4444;padding:8px 14px;border-radius:8px;cursor:pointer;font-size:13px}
.btn-danger:hover{background:#ef444415}
`;

  const js = `
let notes=JSON.parse(localStorage.getItem('vibecode_notes')||'[]');
let activeId=null;
const list=document.getElementById('notes-list');
const titleEl=document.getElementById('note-title');
const bodyEl=document.getElementById('note-body');
const dateEl=document.getElementById('note-date');
const searchEl=document.getElementById('note-search');

function save(){localStorage.setItem('vibecode_notes',JSON.stringify(notes));}
function renderList(){
  const q=searchEl.value.toLowerCase();
  const filtered=notes.filter(n=>!q||n.title.toLowerCase().includes(q)||n.body.toLowerCase().includes(q));
  list.innerHTML=filtered.map(n=>\`
    <div class="note-item \${n.id===activeId?'active':''}" data-id="\${n.id}">
      <div class="note-item-title">\${n.title||'Untitled'}</div>
      <div class="note-item-preview">\${n.body.slice(0,60)||'Empty'}</div>
    </div>\`).join('');
}
function openNote(id){
  activeId=id;
  const n=notes.find(n=>n.id===id);
  if(n){titleEl.value=n.title;bodyEl.value=n.body;dateEl.textContent=new Date(n.updated).toLocaleString();}
  renderList();
}
function newNote(){
  const n={id:Date.now(),title:'',body:'',updated:Date.now()};
  notes.unshift(n);save();openNote(n.id);
}
document.getElementById('new-note').addEventListener('click',newNote);
list.addEventListener('click',e=>{
  const item=e.target.closest('.note-item');
  if(item) openNote(+item.dataset.id);
});
titleEl.addEventListener('input',()=>{const n=notes.find(n=>n.id===activeId);if(n){n.title=titleEl.value;n.updated=Date.now();save();renderList();}});
bodyEl.addEventListener('input',()=>{const n=notes.find(n=>n.id===activeId);if(n){n.body=bodyEl.value;n.updated=Date.now();save();renderList();}});
document.getElementById('delete-note').addEventListener('click',()=>{
  notes=notes.filter(n=>n.id!==activeId);activeId=null;
  titleEl.value='';bodyEl.value='';dateEl.textContent='';
  save();renderList();
});
searchEl.addEventListener('input',renderList);
if(notes.length===0) newNote(); else openNote(notes[0].id);
`;

  return { html, css, js, title: "Notes" };
}

// ============ TIMER / STOPWATCH ============
function generateTimer(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const html = `
<div class="timer-app">
  <div class="timer-tabs">
    <button class="tab active" data-tab="stopwatch">Stopwatch</button>
    <button class="tab" data-tab="timer">Timer</button>
  </div>
  <div class="timer-display" id="display">00:00.0</div>
  <div class="timer-sub" id="sub-display">Ready</div>
  <div class="timer-controls" id="controls">
    <button class="btn-circle btn-start" id="start-btn">Start</button>
    <button class="btn-circle btn-reset" id="reset-btn">Reset</button>
  </div>
  <div class="lap-section" id="lap-section" style="display:none">
    <button class="btn-lap" id="lap-btn">Lap</button>
    <div class="lap-list" id="lap-list"></div>
  </div>
  <div class="timer-input-section" id="timer-input" style="display:none">
    <div class="timer-inputs">
      <input type="number" id="t-min" value="5" min="0" max="999" class="time-input" />
      <span class="time-sep">min</span>
      <input type="number" id="t-sec" value="0" min="0" max="59" class="time-input" />
      <span class="time-sep">sec</span>
    </div>
  </div>
</div>`;

  const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#f0f0f5;min-height:100vh;display:flex;align-items:center;justify-content:center}
.timer-app{text-align:center;padding:40px}
.timer-tabs{display:flex;gap:8px;justify-content:center;margin-bottom:32px}
.tab{background:transparent;border:1px solid #2a2a3a;color:#8b8b9e;padding:10px 20px;border-radius:10px;cursor:pointer;font-size:14px;transition:all .2s}
.tab.active{background:${c}22;border-color:${c};color:${c}}
.timer-display{font-size:72px;font-weight:200;font-variant-numeric:tabular-nums;margin-bottom:8px}
.timer-sub{font-size:14px;color:#5a5a6e;margin-bottom:32px}
.timer-controls{display:flex;gap:16px;justify-content:center;margin-bottom:24px}
.btn-circle{width:64px;height:64px;border-radius:50%;border:none;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s}
.btn-start{background:${c};color:#fff}
.btn-start:hover{transform:scale(1.05)}
.btn-start.running{background:#ef4444}
.btn-reset{background:#1a1a2a;color:#8b8b9e;border:1px solid #2a2a3a}
.btn-reset:hover{color:#f0f0f5}
.lap-section{max-width:280px;margin:0 auto}
.btn-lap{background:#1a1a2a;border:1px solid #2a2a3a;color:#f0f0f5;padding:10px 24px;border-radius:10px;cursor:pointer;font-size:14px;margin-bottom:12px}
.lap-list{max-height:200px;overflow-y:auto;text-align:left}
.lap-item{display:flex;justify-content:space-between;padding:8px 12px;background:#12121a;border-radius:8px;margin-bottom:6px;font-size:13px;font-variant-numeric:tabular-nums}
.timer-inputs{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:16px}
.time-input{width:64px;background:#12121a;border:1px solid #2a2a3a;border-radius:10px;padding:12px;color:#f0f0f5;font-size:18px;text-align:center;outline:none}
.time-input:focus{border-color:${c}}
.time-sep{color:#5a5a6e;font-size:13px}
`;

  const js = `
let mode='stopwatch',running=false,startTime=0,elapsed=0,laps=[],interval=null;
const display=document.getElementById('display'),sub=document.getElementById('sub-display');
const startBtn=document.getElementById('start-btn'),resetBtn=document.getElementById('reset-btn');
const lapSection=document.getElementById('lap-section'),lapBtn=document.getElementById('lap-btn'),lapList=document.getElementById('lap-list');
const timerInput=document.getElementById('timer-input');

function fmt(ms){
  const d=Math.floor(ms/1000)%24*3600+Math.floor(ms/1000)%3600;
  const m=Math.floor(ms/60000),s=Math.floor(ms/1000)%60,cs=Math.floor(ms/100)%10;
  return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')+'.'+cs;
}
function tick(){
  elapsed=Date.now()-startTime;
  display.textContent=fmt(elapsed);
  if(mode==='timer'){
    const target=(+document.getElementById('t-min').value)*60000+(+document.getElementById('t-sec').value)*1000;
    const remaining=target-elapsed;
    if(remaining<=0){display.textContent='00:00.0';stop();sub.textContent="Time's up!";alert("Time's up!");}
  }
}
function start(){
  if(running)return;
  running=true;
  if(elapsed===0)startTime=Date.now();else startTime=Date.now()-elapsed;
  interval=setInterval(tick,100);
  startBtn.textContent='Pause';startBtn.classList.add('running');
  sub.textContent=mode==='stopwatch'?'Running':'Counting down...';
}
function stop(){
  running=false;clearInterval(interval);
  startBtn.textContent='Start';startBtn.classList.remove('running');
  sub.textContent='Paused';
}
function reset(){
  stop();elapsed=0;laps=[];
  display.textContent='00:00.0';sub.textContent='Ready';
  lapList.innerHTML='';
}
function addLap(){
  laps.unshift(elapsed);
  lapList.innerHTML=laps.map((l,i)=>\`<div class="lap-item"><span>Lap \${laps.length-i}</span><span>\${fmt(l)}</span></div>\`).join('');
}
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
  t.classList.add('active');mode=t.dataset.tab;reset();
  lapSection.style.display=mode==='stopwatch'?'block':'none';
  timerInput.style.display=mode==='timer'?'block':'none';
}));
startBtn.addEventListener('click',()=>running?stop():start());
resetBtn.addEventListener('click',reset);
lapBtn.addEventListener('click',addLap);
lapSection.style.display='block';
`;

  return { html, css, js, title: "Timer" };
}

// ============ POMODORO ============
function generatePomodoro(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const html = `
<div class="pomo-app">
  <div class="pomo-tabs">
    <button class="pomo-tab active" data-mode="focus">Focus</button>
    <button class="pomo-tab" data-mode="short">Short Break</button>
    <button class="pomo-tab" data-mode="long">Long Break</button>
  </div>
  <div class="pomo-ring">
    <svg viewBox="0 0 200 200" class="pomo-svg">
      <circle cx="100" cy="100" r="88" fill="none" stroke="#1a1a2a" stroke-width="8" class="ring-bg"/>
      <circle cx="100" cy="100" r="88" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round" class="ring-progress" id="ring" stroke-dasharray="553" stroke-dashoffset="0" transform="rotate(-90 100 100)"/>
    </svg>
    <div class="pomo-center">
      <div class="pomo-time" id="pomo-time">25:00</div>
      <div class="pomo-label" id="pomo-label">Focus</div>
    </div>
  </div>
  <div class="pomo-controls">
    <button class="pomo-btn primary" id="pomo-start">Start</button>
    <button class="pomo-btn" id="pomo-reset">Reset</button>
  </div>
  <div class="pomo-stats">
    <div class="pomo-stat"><span class="stat-num" id="stat-sessions">0</span><span class="stat-label">Sessions</span></div>
    <div class="pomo-stat"><span class="stat-num" id="stat-minutes">0</span><span class="stat-label">Minutes</span></div>
  </div>
</div>`;

  const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#f0f0f5;min-height:100vh;display:flex;align-items:center;justify-content:center}
.pomo-app{text-align:center;padding:40px}
.pomo-tabs{display:flex;gap:8px;justify-content:center;margin-bottom:32px}
.pomo-tab{background:transparent;border:1px solid #2a2a3a;color:#8b8b9e;padding:10px 18px;border-radius:10px;cursor:pointer;font-size:13px;transition:all .2s}
.pomo-tab.active{background:${c}22;border-color:${c};color:${c}}
.pomo-ring{position:relative;width:240px;height:240px;margin:0 auto 32px}
.pomo-svg{width:100%;height:100%}
.ring-progress{transition:stroke-dashoffset .5s linear}
.pomo-center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}
.pomo-time{font-size:48px;font-weight:200;font-variant-numeric:tabular-nums}
.pomo-label{font-size:13px;color:#5a5a6e;margin-top:4px}
.pomo-controls{display:flex;gap:12px;justify-content:center;margin-bottom:24px}
.pomo-btn{background:#1a1a2a;border:1px solid #2a2a3a;color:#f0f0f5;padding:12px 28px;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;transition:all .2s}
.pomo-btn.primary{background:${c};border-color:${c};color:#fff}
.pomo-btn:hover{transform:translateY(-1px)}
.pomo-stats{display:flex;gap:32px;justify-content:center}
.pomo-stat{text-align:center}
.stat-num{display:block;font-size:28px;font-weight:700;color:${c}}
.stat-label{font-size:12px;color:#5a5a6e}
`;

  const js = `
const durations={focus:25*60,short:5*60,long:15*60};
let mode='focus',remaining=durations.focus,running=false,interval=null,sessions=0,totalMin=0;
const timeEl=document.getElementById('pomo-time'),labelEl=document.getElementById('pomo-label');
const ring=document.getElementById('ring'),startBtn=document.getElementById('pomo-start');
const CIRC=553;

function update(){
  const m=Math.floor(remaining/60),s=remaining%60;
  timeEl.textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
  const progress=1-remaining/durations[mode];
  ring.style.strokeDashoffset=CIRC*(1-progress);
}
function tick(){
  remaining--;
  if(remaining<=0){
    clearInterval(interval);running=false;
    startBtn.textContent='Start';
    if(mode==='focus'){sessions++;totalMin+=durations.focus/60;document.getElementById('stat-sessions').textContent=sessions;document.getElementById('stat-minutes').textContent=totalMin;}
    else{totalMin+=durations[mode]/60;document.getElementById('stat-minutes').textContent=totalMin;}
    alert(mode==='focus'?'Break time!':'Back to focus!');
    reset();
  }
  update();
}
function start(){
  if(running)return;
  running=true;interval=setInterval(tick,1000);
  startBtn.textContent='Pause';
}
function reset(){
  clearInterval(interval);running=false;
  remaining=durations[mode];startBtn.textContent='Start';update();
}
document.querySelectorAll('.pomo-tab').forEach(t=>t.addEventListener('click',()=>{
  document.querySelectorAll('.pomo-tab').forEach(x=>x.classList.remove('active'));
  t.classList.add('active');mode=t.dataset.mode;
  labelEl.textContent=t.textContent;reset();
}));
startBtn.addEventListener('click',()=>running?(clearInterval(interval),running=false,startBtn.textContent='Start'):start());
document.getElementById('pomo-reset').addEventListener('click',reset);
update();
`;

  return { html, css, js, title: "Pomodoro" };
}

// ============ FORM ============
function generateForm(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const html = `
<div class="form-app">
  <header class="form-header">
    <h1 class="form-title">Contact Form</h1>
    <p class="form-subtitle">Fill in your details below</p>
  </header>
  <form class="form-body" id="contact-form" novalidate>
    <div class="form-group">
      <label class="form-label" for="f-name">Name *</label>
      <input type="text" id="f-name" class="form-input" placeholder="Your full name" required />
      <span class="form-error" id="err-name"></span>
    </div>
    <div class="form-group">
      <label class="form-label" for="f-email">Email *</label>
      <input type="email" id="f-email" class="form-input" placeholder="you@example.com" required />
      <span class="form-error" id="err-email"></span>
    </div>
    <div class="form-group">
      <label class="form-label" for="f-subject">Subject</label>
      <select id="f-subject" class="form-select">
        <option value="">Select a topic...</option>
        <option value="general">General Inquiry</option>
        <option value="support">Support</option>
        <option value="feedback">Feedback</option>
        <option value="sales">Sales</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label" for="f-message">Message *</label>
      <textarea id="f-message" class="form-textarea" rows="5" placeholder="Write your message here..." required></textarea>
      <span class="form-error" id="err-message"></span>
    </div>
    <div class="form-group">
      <label class="form-check">
        <input type="checkbox" id="f-newsletter" class="form-checkbox" />
        <span>Subscribe to newsletter</span>
      </label>
    </div>
    <div class="form-group">
      <label class="form-check">
        <input type="checkbox" id="f-terms" class="form-checkbox" required />
        <span>I agree to the terms &amp; conditions *</span>
      </label>
      <span class="form-error" id="err-terms"></span>
    </div>
    <button type="submit" class="btn-submit">Send Message</button>
  </form>
  <div class="form-success" id="form-success">
    <div class="success-icon">✓</div>
    <h3>Message Sent!</h3>
    <p>Thank you for reaching out. We'll get back to you soon.</p>
    <button class="btn-again" id="btn-again">Send Another</button>
  </div>
</div>`;

  const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#f0f0f5;min-height:100vh}
.form-app{max-width:560px;margin:0 auto;padding:40px 20px}
.form-header{margin-bottom:32px}
.form-title{font-size:28px;font-weight:700;margin-bottom:8px}
.form-subtitle{color:#8b8b9e;font-size:15px}
.form-body{display:flex;flex-direction:column;gap:20px}
.form-group{display:flex;flex-direction:column;gap:6px}
.form-label{font-size:13px;font-weight:600;color:#c0c0d0}
.form-input,.form-select,.form-textarea{background:#12121a;border:1px solid #1e1e2e;border-radius:10px;padding:12px 14px;color:#f0f0f5;font-size:14px;outline:none;transition:border-color .2s;font-family:inherit}
.form-input:focus,.form-select:focus,.form-textarea:focus{border-color:${c}}
.form-input.invalid,.form-textarea.invalid{border-color:#ef4444}
.form-select{appearance:none;cursor:pointer}
.form-textarea{resize:vertical;min-height:100px}
.form-error{font-size:12px;color:#ef4444;min-height:16px}
.form-check{display:flex;align-items:center;gap:10px;cursor:pointer;font-size:14px;color:#c0c0d0}
.form-checkbox{width:18px;height:18px;accent-color:${c};cursor:pointer}
.btn-submit{background:${c};color:#fff;border:none;padding:14px 28px;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;transition:opacity .2s,transform .15s}
.btn-submit:hover{opacity:.9;transform:translateY(-1px)}
.form-success{display:none;text-align:center;padding:48px 24px;background:#12121a;border:1px solid #1e1e2e;border-radius:16px}
.form-success.visible{display:block}
.success-icon{width:56px;height:56px;border-radius:50%;background:${c}22;color:${c};font-size:28px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
.form-success h3{font-size:20px;margin-bottom:8px}
.form-success p{color:#8b8b9e;font-size:14px;margin-bottom:24px}
.btn-again{background:transparent;border:1px solid ${c};color:${c};padding:10px 20px;border-radius:8px;cursor:pointer;font-size:14px;font-weight:600}
.btn-again:hover{background:${c}15}
`;

  const js = `
const form=document.getElementById('contact-form');
const success=document.getElementById('form-success');
form.addEventListener('submit',function(e){
  e.preventDefault();
  let valid=true;
  const name=document.getElementById('f-name');
  const email=document.getElementById('f-email');
  const message=document.getElementById('f-message');
  const terms=document.getElementById('f-terms');
  document.querySelectorAll('.form-error').forEach(el=>el.textContent='');
  document.querySelectorAll('.form-input,.form-textarea').forEach(el=>el.classList.remove('invalid'));
  if(!name.value.trim()){document.getElementById('err-name').textContent='Name is required';name.classList.add('invalid');valid=false;}
  if(!email.value.trim()||!email.value.includes('@')||!email.value.includes('.')){document.getElementById('err-email').textContent='Valid email is required';email.classList.add('invalid');valid=false;}
  if(!message.value.trim()){document.getElementById('err-message').textContent='Message is required';message.classList.add('invalid');valid=false;}
  if(!terms.checked){document.getElementById('err-terms').textContent='You must agree to the terms';valid=false;}
  if(valid){
    form.style.display='none';
    success.classList.add('visible');
  }
});
document.getElementById('btn-again').addEventListener('click',function(){
  form.reset();
  form.style.display='flex';
  success.classList.remove('visible');
});
`;

  return { html, css, js, title: "Form" };
}

// ============ DASHBOARD ============
function generateDashboard(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const html = `
<div class="dash-app">
  <header class="dash-header">
    <div>
      <h1 class="dash-title">Analytics Dashboard</h1>
      <p class="dash-subtitle">Overview of key metrics</p>
    </div>
    <div class="dash-period">
      <button class="period-btn active">7D</button>
      <button class="period-btn">30D</button>
      <button class="period-btn">90D</button>
    </div>
  </header>
  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="kpi-top"><span class="kpi-label">Revenue</span><span class="kpi-trend up">▲ 12.5%</span></div>
      <div class="kpi-value">€48,290</div>
      <div class="kpi-bar"><div class="kpi-bar-fill" style="width:78%"></div></div>
    </div>
    <div class="kpi-card">
      <div class="kpi-top"><span class="kpi-label">Users</span><span class="kpi-trend up">▲ 8.3%</span></div>
      <div class="kpi-value">2,847</div>
      <div class="kpi-bar"><div class="kpi-bar-fill" style="width:64%"></div></div>
    </div>
    <div class="kpi-card">
      <div class="kpi-top"><span class="kpi-label">Conversion</span><span class="kpi-trend down">▼ 2.1%</span></div>
      <div class="kpi-value">3.24%</div>
      <div class="kpi-bar"><div class="kpi-bar-fill" style="width:42%"></div></div>
    </div>
    <div class="kpi-card">
      <div class="kpi-top"><span class="kpi-label">NPS Score</span><span class="kpi-trend up">▲ 5</span></div>
      <div class="kpi-value">72</div>
      <div class="kpi-bar"><div class="kpi-bar-fill" style="width:72%"></div></div>
    </div>
  </div>
  <div class="dash-row">
    <div class="chart-card">
      <h3 class="card-title">Weekly Revenue</h3>
      <div class="bar-chart">
        <div class="bar-group"><div class="bar" style="height:45%"></div><span>Mon</span></div>
        <div class="bar-group"><div class="bar" style="height:62%"></div><span>Tue</span></div>
        <div class="bar-group"><div class="bar" style="height:38%"></div><span>Wed</span></div>
        <div class="bar-group"><div class="bar" style="height:80%"></div><span>Thu</span></div>
        <div class="bar-group"><div class="bar" style="height:92%"></div><span>Fri</span></div>
        <div class="bar-group"><div class="bar" style="height:55%"></div><span>Sat</span></div>
        <div class="bar-group"><div class="bar" style="height:70%"></div><span>Sun</span></div>
      </div>
    </div>
    <div class="activity-card">
      <h3 class="card-title">Recent Activity</h3>
      <div class="activity-list">
        <div class="activity-item"><span class="act-dot" style="background:#10b981"></span><div><strong>New order</strong> — #4821 · <span class="act-time">2m ago</span></div></div>
        <div class="activity-item"><span class="act-dot" style="background:${c}"></span><div><strong>User signup</strong> — sarah@co.com · <span class="act-time">15m ago</span></div></div>
        <div class="activity-item"><span class="act-dot" style="background:#f97316"></span><div><strong>Payment failed</strong> — #4819 · <span class="act-time">1h ago</span></div></div>
        <div class="activity-item"><span class="act-dot" style="background:#10b981"></span><div><strong>Upgrade</strong> — Pro plan · <span class="act-time">3h ago</span></div></div>
        <div class="activity-item"><span class="act-dot" style="background:#ef4444"></span><div><strong>Churn</strong> — basic plan · <span class="act-time">5h ago</span></div></div>
      </div>
    </div>
  </div>
</div>`;

  const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#f0f0f5;min-height:100vh}
.dash-app{max-width:1100px;margin:0 auto;padding:32px 20px}
.dash-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;flex-wrap:wrap;gap:12px}
.dash-title{font-size:24px;font-weight:700}
.dash-subtitle{color:#8b8b9e;font-size:14px;margin-top:4px}
.dash-period{display:flex;gap:4px;background:#12121a;border-radius:8px;padding:4px}
.period-btn{background:transparent;border:none;color:#8b8b9e;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:500}
.period-btn.active{background:${c};color:#fff}
.kpi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-bottom:24px}
.kpi-card{background:#12121a;border:1px solid #1e1e2e;border-radius:14px;padding:20px}
.kpi-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.kpi-label{font-size:13px;color:#8b8b9e;font-weight:500}
.kpi-trend{font-size:12px;font-weight:600;padding:3px 8px;border-radius:6px}
.kpi-trend.up{color:#10b981;background:#10b98115}
.kpi-trend.down{color:#ef4444;background:#ef444415}
.kpi-value{font-size:28px;font-weight:700;margin-bottom:12px}
.kpi-bar{height:6px;background:#1e1e2e;border-radius:3px;overflow:hidden}
.kpi-bar-fill{height:100%;background:${c};border-radius:3px;transition:width .6s ease}
.dash-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:768px){.dash-row{grid-template-columns:1fr}}
.chart-card,.activity-card{background:#12121a;border:1px solid #1e1e2e;border-radius:14px;padding:20px}
.card-title{font-size:15px;font-weight:600;margin-bottom:16px}
.bar-chart{display:flex;align-items:flex-end;gap:8px;height:160px;padding-top:8px}
.bar-group{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;height:100%;justify-content:flex-end}
.bar{width:100%;max-width:32px;background:linear-gradient(to top,${c},${c}88);border-radius:4px 4px 0 0;min-height:8px;transition:height .4s ease}
.bar-group span{font-size:11px;color:#5a5a6e}
.activity-list{display:flex;flex-direction:column;gap:12px}
.activity-item{display:flex;align-items:flex-start;gap:10px;font-size:13px;color:#c0c0d0;line-height:1.5}
.act-dot{width:8px;height:8px;border-radius:50%;margin-top:5px;flex-shrink:0}
.act-time{color:#5a5a6e;font-size:12px}
`;

  const js = `
document.querySelectorAll('.period-btn').forEach(btn=>{
  btn.addEventListener('click',function(){
    document.querySelectorAll('.period-btn').forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
    document.querySelectorAll('.bar').forEach(bar=>{
      bar.style.height=Math.floor(Math.random()*80+20)+'%';
    });
  });
});
`;

  return { html, css, js, title: "Dashboard" };
}

// ============ CHAT ============
function generateChat(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const html = `
<div class="chat-app">
  <header class="chat-header">
    <div class="chat-avatar">🤖</div>
    <div>
      <div class="chat-name">Vibecode Assistant</div>
      <div class="chat-status">● Online</div>
    </div>
  </header>
  <div class="chat-messages" id="chat-messages">
    <div class="msg msg-bot">
      <div class="msg-bubble">Hi there! 👋 How can I help you today?</div>
      <div class="msg-time" id="t0"></div>
    </div>
  </div>
  <div class="chat-input-row">
    <input type="text" id="chat-input" class="chat-input" placeholder="Type a message..." />
    <button class="chat-send" id="chat-send">➤</button>
  </div>
</div>`;

  const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#f0f0f5;min-height:100vh}
.chat-app{height:100vh;display:flex;flex-direction:column;max-width:720px;margin:0 auto}
.chat-header{display:flex;align-items:center;gap:12px;padding:16px 20px;border-bottom:1px solid #1e1e2e;background:#12121a}
.chat-avatar{width:40px;height:40px;border-radius:50%;background:${c}22;display:flex;align-items:center;justify-content:center;font-size:20px}
.chat-name{font-size:15px;font-weight:600}
.chat-status{font-size:12px;color:#10b981}
.chat-messages{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:12px}
.msg{display:flex;flex-direction:column;max-width:75%}
.msg-user{align-self:flex-end;align-items:flex-end}
.msg-bot{align-self:flex-start;align-items:flex-start}
.msg-bubble{padding:12px 16px;border-radius:16px;font-size:14px;line-height:1.5;word-break:break-word}
.msg-bot .msg-bubble{background:#12121a;border:1px solid #1e1e2e;border-bottom-left-radius:4px}
.msg-user .msg-bubble{background:${c};color:#fff;border-bottom-right-radius:4px}
.msg-time{font-size:11px;color:#5a5a6e;margin-top:4px;padding:0 4px}
.chat-input-row{display:flex;gap:10px;padding:16px 20px;border-top:1px solid #1e1e2e;background:#12121a}
.chat-input{flex:1;background:#0a0a0f;border:1px solid #1e1e2e;border-radius:12px;padding:12px 16px;color:#f0f0f5;font-size:14px;outline:none}
.chat-input:focus{border-color:${c}}
.chat-send{background:${c};color:#fff;border:none;width:44px;height:44px;border-radius:12px;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center}
.chat-send:hover{opacity:.85}
`;

  const js = `
const messagesEl=document.getElementById('chat-messages');
const inputEl=document.getElementById('chat-input');
const sendBtn=document.getElementById('chat-send');

function timeStr(){
  const d=new Date();
  return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
}
document.getElementById('t0').textContent=timeStr();

function addMsg(text,who){
  const div=document.createElement('div');
  div.className='msg msg-'+who;
  div.innerHTML='<div class="msg-bubble"></div><div class="msg-time">'+timeStr()+'</div>';
  div.querySelector('.msg-bubble').textContent=text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop=messagesEl.scrollHeight;
}

const responses=[
  {keywords:['hello','hi','hey','hallo','goedendag'],reply:'Hello! Great to see you. What can I do for you today? 😊'},
  {keywords:['weather','weer'],reply:'I can\\'t check live weather, but I hope it\\'s sunny where you are! ☀️'},
  {keywords:['code','app','build','maken','bouwen'],reply:'I love building apps! Try describing what you want and I\\'ll help you get started. 🚀'},
  {keywords:['thank','dank','thanks'],reply:'You\\'re welcome! Happy to help anytime. 🙌'},
  {keywords:['bye','doei','tot ziens'],reply:'Goodbye! Come back anytime you need help. 👋'},
  {keywords:['help','helpen','hulp'],reply:'Here\\'s what I can do: answer questions, brainstorm ideas, and help you build cool things!'},
];

function getReply(text){
  const lower=text.toLowerCase();
  for(const r of responses){
    if(r.keywords.some(k=>lower.includes(k))) return r.reply;
  }
  const fallbacks=[
    'Interesting! Tell me more about that. 🤔',
    'Got it! That\\'s a great point.',
    'I\\'m not sure about that, but let\\'s figure it out together!',
    'Nice! What else is on your mind?',
    'That\\'s cool! Can you elaborate a bit more?'
  ];
  return fallbacks[Math.floor(Math.random()*fallbacks.length)];
}

function send(){
  const text=inputEl.value.trim();
  if(!text)return;
  addMsg(text,'user');
  inputEl.value='';
  setTimeout(()=>{addMsg(getReply(text),'bot');},600+Math.random()*800);
}
sendBtn.addEventListener('click',send);
inputEl.addEventListener('keydown',e=>{if(e.key==='Enter')send();});
`;

  return { html, css, js, title: "Chat" };
}

// ============ GALLERY ============
function generateGallery(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const html = `
<div class="gal-app">
  <header class="gal-header">
    <h1 class="gal-title">Photo Gallery</h1>
    <p class="gal-subtitle">Browse and explore</p>
  </header>
  <div class="gal-filters" id="gal-filters">
    <button class="chip active" data-cat="all">All</button>
    <button class="chip" data-cat="nature">Nature</button>
    <button class="chip" data-cat="urban">Urban</button>
    <button class="chip" data-cat="abstract">Abstract</button>
    <button class="chip" data-cat="people">People</button>
  </div>
  <div class="gal-grid" id="gal-grid"></div>
  <div class="lightbox" id="lightbox">
    <button class="lb-close" id="lb-close">✕</button>
    <button class="lb-nav lb-prev" id="lb-prev">‹</button>
    <div class="lb-content" id="lb-content"></div>
    <button class="lb-nav lb-next" id="lb-next">›</button>
    <div class="lb-caption" id="lb-caption"></div>
  </div>
</div>`;

  const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#f0f0f5;min-height:100vh}
.gal-app{max-width:1100px;margin:0 auto;padding:32px 20px}
.gal-header{margin-bottom:24px}
.gal-title{font-size:28px;font-weight:700;margin-bottom:6px}
.gal-subtitle{color:#8b8b9e;font-size:14px}
.gal-filters{display:flex;gap:8px;margin-bottom:24px;flex-wrap:wrap}
.chip{background:#12121a;border:1px solid #1e1e2e;color:#8b8b9e;padding:8px 16px;border-radius:20px;cursor:pointer;font-size:13px;font-weight:500;transition:all .2s}
.chip:hover{border-color:${c};color:#f0f0f5}
.chip.active{background:${c};border-color:${c};color:#fff}
.gal-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px}
.gal-item{aspect-ratio:4/3;border-radius:14px;cursor:pointer;overflow:hidden;position:relative;transition:transform .2s,box-shadow .2s}
.gal-item:hover{transform:scale(1.03);box-shadow:0 8px 32px #00000066}
.gal-item-label{position:absolute;bottom:0;left:0;right:0;padding:12px 14px;background:linear-gradient(transparent,rgba(0,0,0,.7));font-size:13px;font-weight:500}
.lightbox{display:none;position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:100;align-items:center;justify-content:center;flex-direction:column}
.lightbox.open{display:flex}
.lb-content{width:80%;max-width:800px;aspect-ratio:16/9;border-radius:16px}
.lb-caption{margin-top:16px;font-size:15px;color:#c0c0d0}
.lb-close{position:absolute;top:20px;right:24px;background:transparent;border:none;color:#f0f0f5;font-size:28px;cursor:pointer}
.lb-nav{position:absolute;top:50%;transform:translateY(-50%);background:#ffffff15;border:none;color:#f0f0f5;font-size:32px;width:48px;height:48px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center}
.lb-prev{left:20px}
.lb-next{right:20px}
.lb-nav:hover{background:#ffffff25}
`;

  const js = `
const photos=[
  {title:'Mountain Sunrise',cat:'nature',g:'linear-gradient(135deg,#f97316,#ef4444,#8b5cf6)'},
  {title:'Forest Path',cat:'nature',g:'linear-gradient(135deg,#10b981,#065f46,#0a0a0f)'},
  {title:'Ocean Waves',cat:'nature',g:'linear-gradient(135deg,#0ea5e9,#1e40af,#0a0a0f)'},
  {title:'City Lights',cat:'urban',g:'linear-gradient(135deg,#f59e0b,#ef4444,#1e1e2e)'},
  {title:'Skyscraper',cat:'urban',g:'linear-gradient(135deg,#6366f1,#312e81,#0a0a0f)'},
  {title:'Street Art',cat:'urban',g:'linear-gradient(135deg,#ec4899,#8b5cf6,#1e1e2e)'},
  {title:'Color Splash',cat:'abstract',g:'linear-gradient(135deg,#ef4444,#f97316,#eab308)'},
  {title:'Geometric',cat:'abstract',g:'linear-gradient(135deg,#6366f1,#ec4899,#10b981)'},
  {title:'Fluid Art',cat:'abstract',g:'linear-gradient(135deg,#14b8a6,#6366f1,#ec4899)'},
  {title:'Portrait',cat:'people',g:'linear-gradient(135deg,#f97316,#ec4899,#8b5cf6)'},
  {title:'Crowd',cat:'people',g:'linear-gradient(135deg,#eab308,#ef4444,#1e1e2e)'},
  {title:'Dance',cat:'people',g:'linear-gradient(135deg,#10b981,#0ea5e9,#6366f1)'}
];
const grid=document.getElementById('gal-grid');
const lightbox=document.getElementById('lightbox');
let currentIdx=0;
let filtered=photos;

function renderGrid(cat){
  filtered=cat==='all'?photos:photos.filter(p=>p.cat===cat);
  grid.innerHTML=filtered.map((p,i)=>\`
    <div class="gal-item" style="background:\${p.g}" data-idx="\${i}">
      <div class="gal-item-label">\${p.title}</div>
    </div>\`).join('');
  grid.querySelectorAll('.gal-item').forEach(el=>{
    el.addEventListener('click',()=>openLightbox(parseInt(el.dataset.idx)));
  });
}
function openLightbox(idx){
  currentIdx=idx;
  updateLightbox();
  lightbox.classList.add('open');
}
function updateLightbox(){
  const p=filtered[currentIdx];
  document.getElementById('lb-content').style.background=p.g;
  document.getElementById('lb-caption').textContent=p.title+' — '+p.cat.charAt(0).toUpperCase()+p.cat.slice(1);
}
document.getElementById('lb-close').addEventListener('click',()=>lightbox.classList.remove('open'));
document.getElementById('lb-prev').addEventListener('click',()=>{currentIdx=(currentIdx-1+filtered.length)%filtered.length;updateLightbox();});
document.getElementById('lb-next').addEventListener('click',()=>{currentIdx=(currentIdx+1)%filtered.length;updateLightbox();});
lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.classList.remove('open');});
document.addEventListener('keydown',e=>{
  if(!lightbox.classList.contains('open'))return;
  if(e.key==='Escape')lightbox.classList.remove('open');
  if(e.key==='ArrowLeft'){currentIdx=(currentIdx-1+filtered.length)%filtered.length;updateLightbox();}
  if(e.key==='ArrowRight'){currentIdx=(currentIdx+1)%filtered.length;updateLightbox();}
});
document.querySelectorAll('.chip').forEach(ch=>{
  ch.addEventListener('click',function(){
    document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));
    this.classList.add('active');
    renderGrid(this.dataset.cat);
  });
});
renderGrid('all');
`;

  return { html, css, js, title: "Gallery" };
}

// ============ MUSIC ============
function generateMusic(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const html = `
<div class="music-app">
  <div class="player-main">
    <div class="album-art" id="album-art"></div>
    <div class="track-info">
      <div class="track-title" id="track-title">Loading...</div>
      <div class="track-artist" id="track-artist">—</div>
    </div>
    <div class="progress-wrap">
      <div class="progress-bar" id="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
      <div class="progress-times"><span id="time-cur">0:00</span><span id="time-total">0:00</span></div>
    </div>
    <div class="controls">
      <button class="ctrl-btn" id="btn-prev">⏮</button>
      <button class="ctrl-btn ctrl-play" id="btn-play">▶</button>
      <button class="ctrl-btn" id="btn-next">⏭</button>
    </div>
    <div class="volume-row">
      <span class="vol-icon">🔊</span>
      <input type="range" id="vol-slider" min="0" max="100" value="75" class="vol-slider" />
    </div>
  </div>
  <div class="playlist">
    <h3 class="pl-title">Up Next</h3>
    <div class="pl-list" id="pl-list"></div>
  </div>
</div>`;

  const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#f0f0f5;min-height:100vh}
.music-app{max-width:480px;margin:0 auto;padding:32px 20px}
.player-main{background:#12121a;border:1px solid #1e1e2e;border-radius:20px;padding:28px;margin-bottom:20px}
.album-art{width:100%;aspect-ratio:1;border-radius:14px;margin-bottom:20px;transition:background .4s}
.track-info{margin-bottom:20px}
.track-title{font-size:20px;font-weight:700;margin-bottom:4px}
.track-artist{font-size:14px;color:#8b8b9e}
.progress-wrap{margin-bottom:20px}
.progress-bar{height:6px;background:#1e1e2e;border-radius:3px;cursor:pointer;overflow:hidden}
.progress-fill{height:100%;background:${c};border-radius:3px;width:0%;transition:width .3s linear}
.progress-times{display:flex;justify-content:space-between;margin-top:6px;font-size:12px;color:#5a5a6e}
.controls{display:flex;align-items:center;justify-content:center;gap:20px;margin-bottom:20px}
.ctrl-btn{background:transparent;border:none;color:#f0f0f5;font-size:24px;cursor:pointer;width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background .2s}
.ctrl-btn:hover{background:#1e1e2e}
.ctrl-play{background:${c};color:#fff;width:60px;height:60px;font-size:26px}
.ctrl-play:hover{opacity:.85;background:${c}}
.volume-row{display:flex;align-items:center;gap:12px}
.vol-icon{font-size:16px}
.vol-slider{flex:1;-webkit-appearance:none;appearance:none;height:4px;background:#1e1e2e;border-radius:2px;outline:none;cursor:pointer}
.vol-slider::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:${c};cursor:pointer}
.playlist{background:#12121a;border:1px solid #1e1e2e;border-radius:16px;padding:20px}
.pl-title{font-size:14px;font-weight:600;color:#8b8b9e;margin-bottom:12px;text-transform:uppercase;letter-spacing:.5px}
.pl-list{display:flex;flex-direction:column;gap:4px}
.pl-item{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:10px;cursor:pointer;transition:background .15s}
.pl-item:hover{background:#1a1a2a}
.pl-item.active{background:${c}15}
.pl-num{font-size:13px;color:#5a5a6e;width:20px;text-align:center}
.pl-item.active .pl-num{color:${c}}
.pl-thumb{width:40px;height:40px;border-radius:8px;flex-shrink:0}
.pl-info{flex:1;min-width:0}
.pl-name{font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pl-artist{font-size:12px;color:#5a5a6e}
`;

  const js = `
const tracks=[
  {title:'Midnight Drive',artist:'Neon Waves',dur:214,g:'linear-gradient(135deg,#6366f1,#ec4899)'},
  {title:'Solar Flare',artist:'Cosmic Echo',dur:187,g:'linear-gradient(135deg,#f97316,#ef4444)'},
  {title:'Deep Blue',artist:'Oceanic',dur:243,g:'linear-gradient(135deg,#0ea5e9,#1e40af)'},
  {title:'Golden Hour',artist:'Sunset Collective',dur:198,g:'linear-gradient(135deg,#eab308,#f97316)'},
  {title:'Emerald',artist:'Forest Sound',dur:221,g:'linear-gradient(135deg,#10b981,#065f46)'},
  {title:'Violet Haze',artist:'Dream State',dur:205,g:'linear-gradient(135deg,#8b5cf6,#ec4899)'}
];
let cur=0,playing=false,progress=0,timer=null;

function fmt(s){const m=Math.floor(s/60);const sec=Math.floor(s%60);return m+':'+String(sec).padStart(2,'0');}
function loadTrack(i){
  cur=i;progress=0;
  const t=tracks[i];
  document.getElementById('album-art').style.background=t.g;
  document.getElementById('track-title').textContent=t.title;
  document.getElementById('track-artist').textContent=t.artist;
  document.getElementById('time-total').textContent=fmt(t.dur);
  document.getElementById('progress-fill').style.width='0%';
  document.getElementById('time-cur').textContent='0:00';
  renderPlaylist();
}
function renderPlaylist(){
  document.getElementById('pl-list').innerHTML=tracks.map((t,i)=>\`
    <div class="pl-item\${i===cur?' active':''}" data-i="\${i}">
      <span class="pl-num">\${i===cur?'▶':(i+1)}</span>
      <div class="pl-thumb" style="background:\${t.g}"></div>
      <div class="pl-info"><div class="pl-name">\${t.title}</div><div class="pl-artist">\${t.artist}</div></div>
    </div>\`).join('');
  document.querySelectorAll('.pl-item').forEach(el=>{
    el.addEventListener('click',()=>{loadTrack(parseInt(el.dataset.i));if(!playing)togglePlay();});
  });
}
function togglePlay(){
  playing=!playing;
  document.getElementById('btn-play').textContent=playing?'⏸':'▶';
  if(playing){
    timer=setInterval(()=>{
      progress+=0.5;
      if(progress>=tracks[cur].dur){nextTrack();return;}
      document.getElementById('progress-fill').style.width=(progress/tracks[cur].dur*100)+'%';
      document.getElementById('time-cur').textContent=fmt(progress);
    },500);
  }else{clearInterval(timer);}
}
function nextTrack(){loadTrack((cur+1)%tracks.length);if(playing){clearInterval(timer);timer=setInterval(()=>{progress+=0.5;if(progress>=tracks[cur].dur){nextTrack();return;}document.getElementById('progress-fill').style.width=(progress/tracks[cur].dur*100)+'%';document.getElementById('time-cur').textContent=fmt(progress);},500);}}
function prevTrack(){loadTrack((cur-1+tracks.length)%tracks.length);if(playing){clearInterval(timer);timer=setInterval(()=>{progress+=0.5;if(progress>=tracks[cur].dur){nextTrack();return;}document.getElementById('progress-fill').style.width=(progress/tracks[cur].dur*100)+'%';document.getElementById('time-cur').textContent=fmt(progress);},500);}}
document.getElementById('btn-play').addEventListener('click',togglePlay);
document.getElementById('btn-next').addEventListener('click',nextTrack);
document.getElementById('btn-prev').addEventListener('click',prevTrack);
document.getElementById('progress-bar').addEventListener('click',function(e){
  const rect=this.getBoundingClientRect();
  const pct=(e.clientX-rect.left)/rect.width;
  progress=pct*tracks[cur].dur;
  this.querySelector('.progress-fill').style.width=(pct*100)+'%';
  document.getElementById('time-cur').textContent=fmt(progress);
});
loadTrack(0);
`;

  return { html, css, js, title: "Music Player" };
}

// ============ SHOP ============
function generateShop(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const html = `
<div class="shop-app">
  <header class="shop-header">
    <h1 class="shop-title">🛍️ Vibeshop</h1>
    <button class="cart-btn" id="cart-toggle">
      🛒 Cart <span class="cart-badge" id="cart-badge">0</span>
    </button>
  </header>
  <div class="shop-layout">
    <div class="product-grid" id="product-grid"></div>
    <aside class="cart-panel" id="cart-panel">
      <h3 class="cart-title">Your Cart</h3>
      <div class="cart-items" id="cart-items"><p class="cart-empty">Cart is empty</p></div>
      <div class="cart-footer">
        <div class="cart-total-row"><span>Total</span><strong id="cart-total">€0.00</strong></div>
        <button class="btn-checkout" id="btn-checkout">Checkout</button>
      </div>
    </aside>
  </div>
</div>`;

  const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#f0f0f5;min-height:100vh}
.shop-app{max-width:1100px;margin:0 auto;padding:24px 20px}
.shop-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
.shop-title{font-size:24px;font-weight:700}
.cart-btn{background:#12121a;border:1px solid #1e1e2e;color:#f0f0f5;padding:10px 18px;border-radius:10px;cursor:pointer;font-size:14px;font-weight:500;display:flex;align-items:center;gap:8px}
.cart-badge{background:${c};color:#fff;font-size:11px;font-weight:700;width:20px;height:20px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center}
.shop-layout{display:grid;grid-template-columns:1fr 320px;gap:20px}
@media(max-width:768px){.shop-layout{grid-template-columns:1fr}}
.product-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px}
.product-card{background:#12121a;border:1px solid #1e1e2e;border-radius:14px;overflow:hidden;transition:transform .2s}
.product-card:hover{transform:translateY(-2px)}
.product-img{aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:48px}
.product-info{padding:14px}
.product-name{font-size:14px;font-weight:600;margin-bottom:4px}
.product-price{font-size:16px;font-weight:700;color:${c};margin-bottom:10px}
.btn-add{width:100%;background:${c};color:#fff;border:none;padding:10px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer}
.btn-add:hover{opacity:.85}
.cart-panel{background:#12121a;border:1px solid #1e1e2e;border-radius:14px;padding:20px;height:fit-content;position:sticky;top:20px}
.cart-title{font-size:16px;font-weight:700;margin-bottom:16px}
.cart-items{display:flex;flex-direction:column;gap:12px;margin-bottom:16px}
.cart-empty{color:#5a5a6e;font-size:14px;text-align:center;padding:20px 0}
.cart-item{display:flex;align-items:center;gap:10px}
.cart-item-thumb{width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.cart-item-info{flex:1;min-width:0}
.cart-item-name{font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cart-item-price{font-size:12px;color:#8b8b9e}
.cart-item-qty{display:flex;align-items:center;gap:6px}
.qty-btn{background:#1e1e2e;border:none;color:#f0f0f5;width:24px;height:24px;border-radius:6px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center}
.qty-btn:hover{background:${c}33}
.qty-num{font-size:13px;min-width:16px;text-align:center}
.cart-footer{border-top:1px solid #1e1e2e;padding-top:16px}
.cart-total-row{display:flex;justify-content:space-between;margin-bottom:12px;font-size:15px}
.btn-checkout{width:100%;background:${c};color:#fff;border:none;padding:12px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer}
.btn-checkout:hover{opacity:.85}
`;

  const js = `
const products=[
  {id:1,name:'Wireless Headphones',price:89.99,emoji:'🎧',g:'linear-gradient(135deg,#6366f1,#312e81)'},
  {id:2,name:'Smart Watch',price:249.99,emoji:'⌚',g:'linear-gradient(135deg,#10b981,#065f46)'},
  {id:3,name:'Mechanical Keyboard',price:149.99,emoji:'⌨️',g:'linear-gradient(135deg,#f97316,#7c2d12)'},
  {id:4,name:'USB-C Hub',price:59.99,emoji:'🔌',g:'linear-gradient(135deg,#0ea5e9,#1e40af)'},
  {id:5,name:'Desk Lamp',price:45.99,emoji:'💡',g:'linear-gradient(135deg,#eab308,#78350f)'},
  {id:6,name:'Phone Stand',price:29.99,emoji:'📱',g:'linear-gradient(135deg,#ec4899,#831843)'},
  {id:7,name:'Mouse Pad XL',price:24.99,emoji:'🖱️',g:'linear-gradient(135deg,#8b5cf6,#4c1d95)'},
  {id:8,name:'Webcam Pro',price:129.99,emoji:'📷',g:'linear-gradient(135deg,#ef4444,#7f1d1d)'}
];
let cart={};
const grid=document.getElementById('product-grid');
function renderProducts(){
  grid.innerHTML=products.map(p=>\`
    <div class="product-card">
      <div class="product-img" style="background:\${p.g}">\${p.emoji}</div>
      <div class="product-info">
        <div class="product-name">\${p.name}</div>
        <div class="product-price">€\${p.price.toFixed(2)}</div>
        <button class="btn-add" data-id="\${p.id}">Add to Cart</button>
      </div>
    </div>\`).join('');
  grid.querySelectorAll('.btn-add').forEach(btn=>{
    btn.addEventListener('click',()=>addToCart(parseInt(btn.dataset.id)));
  });
}
function addToCart(id){
  if(cart[id])cart[id].qty++;
  else cart[id]={id,qty:1};
  updateCart();
}
function removeFromCart(id){
  if(cart[id]){cart[id].qty--;if(cart[id].qty<=0)delete cart[id];}
  updateCart();
}
function updateCart(){
  const items=Object.values(cart);
  const count=items.reduce((s,i)=>s+i.qty,0);
  const total=items.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0);
  document.getElementById('cart-badge').textContent=count;
  document.getElementById('cart-total').textContent='€'+total.toFixed(2);
  const el=document.getElementById('cart-items');
  if(!items.length){el.innerHTML='<p class="cart-empty">Cart is empty</p>';return;}
  el.innerHTML=items.map(i=>{
    const p=products.find(x=>x.id===i.id);
    return \`<div class="cart-item">
      <div class="cart-item-thumb" style="background:\${p.g}">\${p.emoji}</div>
      <div class="cart-item-info"><div class="cart-item-name">\${p.name}</div><div class="cart-item-price">€\${(p.price*i.qty).toFixed(2)}</div></div>
      <div class="cart-item-qty">
        <button class="qty-btn" data-act="dec" data-id="\${i.id}">−</button>
        <span class="qty-num">\${i.qty}</span>
        <button class="qty-btn" data-act="inc" data-id="\${i.id}">+</button>
      </div>
    </div>\`;
  }).join('');
  el.querySelectorAll('.qty-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const id=parseInt(btn.dataset.id);
      if(btn.dataset.act==='inc')addToCart(id);
      else removeFromCart(id);
    });
  });
}
document.getElementById('btn-checkout').addEventListener('click',()=>{
  if(!Object.keys(cart).length){alert('Your cart is empty!');return;}
  alert('Order placed! Thank you for shopping with Vibeshop 🎉');
  cart={};updateCart();
});
renderProducts();
`;

  return { html, css, js, title: "Shop" };
}

// ============ BLOG ============
function generateBlog(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const html = `
<div class="blog-app">
  <header class="blog-header">
    <h1 class="blog-title">The Vibecode Blog</h1>
    <p class="blog-subtitle">Thoughts on tech, design & life</p>
  </header>
  <div class="blog-featured" id="blog-featured"></div>
  <div class="blog-tags" id="blog-tags">
    <button class="tag-chip active" data-tag="all">All</button>
    <button class="tag-chip" data-tag="tech">Tech</button>
    <button class="tag-chip" data-tag="design">Design</button>
    <button class="tag-chip" data-tag="career">Career</button>
    <button class="tag-chip" data-tag="life">Life</button>
  </div>
  <div class="blog-grid" id="blog-grid"></div>
</div>`;

  const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#f0f0f5;min-height:100vh}
.blog-app{max-width:900px;margin:0 auto;padding:32px 20px}
.blog-header{margin-bottom:28px}
.blog-title{font-size:32px;font-weight:800;margin-bottom:6px}
.blog-subtitle{color:#8b8b9e;font-size:15px}
.blog-featured{background:#12121a;border:1px solid #1e1e2e;border-radius:18px;overflow:hidden;margin-bottom:24px;cursor:pointer;transition:transform .2s}
.blog-featured:hover{transform:translateY(-2px)}
.feat-img{height:240px;display:flex;align-items:center;justify-content:center;font-size:64px}
.feat-body{padding:24px}
.feat-tags{display:flex;gap:6px;margin-bottom:12px}
.feat-tag{font-size:11px;font-weight:600;padding:4px 10px;border-radius:6px;background:${c}22;color:${c};text-transform:uppercase;letter-spacing:.5px}
.feat-title{font-size:22px;font-weight:700;margin-bottom:8px}
.feat-excerpt{color:#8b8b9e;font-size:14px;line-height:1.6;margin-bottom:12px}
.feat-meta{font-size:13px;color:#5a5a6e}
.blog-tags{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap}
.tag-chip{background:#12121a;border:1px solid #1e1e2e;color:#8b8b9e;padding:7px 14px;border-radius:18px;cursor:pointer;font-size:13px;font-weight:500}
.tag-chip:hover{border-color:${c};color:#f0f0f5}
.tag-chip.active{background:${c};border-color:${c};color:#fff}
.blog-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
.post-card{background:#12121a;border:1px solid #1e1e2e;border-radius:14px;overflow:hidden;cursor:pointer;transition:transform .2s}
.post-card:hover{transform:translateY(-2px)}
.post-img{height:140px;display:flex;align-items:center;justify-content:center;font-size:40px}
.post-body{padding:16px}
.post-tags{display:flex;gap:4px;margin-bottom:10px;flex-wrap:wrap}
.post-tag{font-size:10px;font-weight:600;padding:3px 8px;border-radius:5px;background:${c}18;color:${c};text-transform:uppercase}
.post-title{font-size:15px;font-weight:600;margin-bottom:6px;line-height:1.4}
.post-excerpt{font-size:13px;color:#8b8b9e;line-height:1.5;margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.post-meta{font-size:12px;color:#5a5a6e;display:flex;justify-content:space-between}
`;

  const js = `
const posts=[
  {title:'Building Apps with AI: A Complete Guide',tags:['tech','career'],read:8,emoji:'🤖',g:'linear-gradient(135deg,#6366f1,#ec4899)',excerpt:'Discover how AI-powered tools are transforming the way we build software, from prototype to production.'},
  {title:'Design Systems That Scale',tags:['design'],read:6,emoji:'🎨',g:'linear-gradient(135deg,#10b981,#0ea5e9)',excerpt:'Learn the principles behind creating a design system that grows with your team and product.'},
  {title:'Remote Work: 5 Years Later',tags:['life','career'],read:5,emoji:'🏠',g:'linear-gradient(135deg,#f97316,#eab308)',excerpt:'Reflecting on how remote work has changed our lives, careers, and the future of work.'},
  {title:'The Art of Code Review',tags:['tech'],read:7,emoji:'🔍',g:'linear-gradient(135deg,#ef4444,#f97316)',excerpt:'How to give and receive code reviews that actually improve your codebase and team culture.'},
  {title:'Minimalist Living for Developers',tags:['life'],read:4,emoji:'📦',g:'linear-gradient(135deg,#14b8a6,#10b981)',excerpt:'Why less is more — applying minimalist principles to your workspace, code, and life.'},
  {title:'CSS Tricks You Should Know in 2025',tags:['tech','design'],read:9,emoji:'✨',g:'linear-gradient(135deg,#8b5cf6,#6366f1)',excerpt:'From container queries to :has() — modern CSS features that will level up your designs.'}
];
const feat=document.getElementById('blog-featured');
const grid=document.getElementById('blog-grid');
function render(tag){
  const filtered=tag==='all'?posts:posts.filter(p=>p.tags.includes(tag));
  if(filtered.length){
    const f=filtered[0];
    feat.style.display='block';
    feat.innerHTML='<div class="feat-img" style="background:'+f.g+'">'+f.emoji+'</div><div class="feat-body"><div class="feat-tags">'+f.tags.map(t=>'<span class="feat-tag">'+t+'</span>').join('')+'</div><div class="feat-title">'+f.title+'</div><div class="feat-excerpt">'+f.excerpt+'</div><div class="feat-meta">'+f.read+' min read</div></div>';
  }else{feat.style.display='none';}
  const rest=filtered.slice(1);
  grid.innerHTML=rest.map(p=>\`
    <div class="post-card">
      <div class="post-img" style="background:\${p.g}">\${p.emoji}</div>
      <div class="post-body">
        <div class="post-tags">\${p.tags.map(t=>'<span class="post-tag">'+t+'</span>').join('')}</div>
        <div class="post-title">\${p.title}</div>
        <div class="post-excerpt">\${p.excerpt}</div>
        <div class="post-meta"><span>\${p.read} min read</span><span>2025</span></div>
      </div>
    </div>\`).join('');
}
document.querySelectorAll('.tag-chip').forEach(ch=>{
  ch.addEventListener('click',function(){
    document.querySelectorAll('.tag-chip').forEach(x=>x.classList.remove('active'));
    this.classList.add('active');
    render(this.dataset.tag);
  });
});
render('all');
`;

  return { html, css, js, title: "Blog" };
}

// ============ PORTFOLIO ============
function generatePortfolio(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const html = `
<div class="pf-app">
  <section class="pf-hero">
    <div class="pf-avatar">👨‍💻</div>
    <h1 class="pf-name">Enrico Goossen</h1>
    <p class="pf-role">Full-Stack Developer & Designer</p>
    <p class="pf-bio">I build beautiful, functional web applications with a focus on performance and user experience.</p>
    <div class="pf-links">
      <a class="pf-link" href="#">GitHub</a>
      <a class="pf-link" href="#">LinkedIn</a>
      <a class="pf-link" href="#">Email</a>
    </div>
  </section>
  <section class="pf-section">
    <h2 class="pf-section-title">Projects</h2>
    <div class="pf-grid">
      <div class="pf-card"><div class="pf-card-img" style="background:linear-gradient(135deg,#6366f1,#ec4899)">🚀</div><div class="pf-card-body"><h3>SaaS Dashboard</h3><p>Analytics platform with real-time data visualization</p><div class="pf-tech"><span>React</span><span>Node.js</span><span>D3.js</span></div></div></div>
      <div class="pf-card"><div class="pf-card-img" style="background:linear-gradient(135deg,#10b981,#0ea5e9)">🛒</div><div class="pf-card-body"><h3>E-Commerce Platform</h3><p>Full-stack shop with payment integration</p><div class="pf-tech"><span>Next.js</span><span>Stripe</span><span>PostgreSQL</span></div></div></div>
      <div class="pf-card"><div class="pf-card-img" style="background:linear-gradient(135deg,#f97316,#ef4444)">🤖</div><div class="pf-card-body"><h3>AI Chatbot</h3><p>Intelligent customer support assistant</p><div class="pf-tech"><span>Python</span><span>OpenAI</span><span>FastAPI</span></div></div></div>
      <div class="pf-card"><div class="pf-card-img" style="background:linear-gradient(135deg,#8b5cf6,#14b8a6)">📱</div><div class="pf-card-body"><h3>Mobile App</h3><p>Cross-platform fitness tracking app</p><div class="pf-tech"><span>React Native</span><span>Firebase</span><span>GraphQL</span></div></div></div>
    </div>
  </section>
  <section class="pf-section">
    <h2 class="pf-section-title">Skills</h2>
    <div class="pf-skills">
      <div class="skill"><span class="skill-name">TypeScript</span><div class="skill-bar"><div class="skill-fill" style="width:92%"></div></div></div>
      <div class="skill"><span class="skill-name">React / Next.js</span><div class="skill-bar"><div class="skill-fill" style="width:95%"></div></div></div>
      <div class="skill"><span class="skill-name">Node.js</span><div class="skill-bar"><div class="skill-fill" style="width:88%"></div></div></div>
      <div class="skill"><span class="skill-name">CSS / Tailwind</span><div class="skill-bar"><div class="skill-fill" style="width:90%"></div></div></div>
      <div class="skill"><span class="skill-name">Python</span><div class="skill-bar"><div class="skill-fill" style="width:75%"></div></div></div>
      <div class="skill"><span class="skill-name">AWS / Cloud</span><div class="skill-bar"><div class="skill-fill" style="width:70%"></div></div></div>
    </div>
  </section>
  <section class="pf-section pf-contact">
    <h2 class="pf-section-title">Get in Touch</h2>
    <p class="pf-contact-text">Interested in working together? Drop me a message!</p>
    <a class="pf-cta" href="mailto:hello@example.com">Say Hello →</a>
  </section>
</div>`;

  const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#f0f0f5;min-height:100vh}
.pf-app{max-width:900px;margin:0 auto;padding:40px 20px}
.pf-hero{text-align:center;padding:48px 0;margin-bottom:40px}
.pf-avatar{font-size:72px;margin-bottom:16px}
.pf-name{font-size:36px;font-weight:800;margin-bottom:8px}
.pf-role{font-size:18px;color:${c};font-weight:600;margin-bottom:12px}
.pf-bio{color:#8b8b9e;font-size:15px;max-width:500px;margin:0 auto 20px;line-height:1.6}
.pf-links{display:flex;gap:12px;justify-content:center}
.pf-link{color:#c0c0d0;text-decoration:none;font-size:14px;font-weight:500;padding:8px 16px;border:1px solid #1e1e2e;border-radius:8px;transition:all .2s}
.pf-link:hover{border-color:${c};color:${c}}
.pf-section{margin-bottom:40px}
.pf-section-title{font-size:22px;font-weight:700;margin-bottom:20px;padding-bottom:10px;border-bottom:1px solid #1e1e2e}
.pf-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px}
.pf-card{background:#12121a;border:1px solid #1e1e2e;border-radius:14px;overflow:hidden;transition:transform .2s}
.pf-card:hover{transform:translateY(-3px)}
.pf-card-img{height:120px;display:flex;align-items:center;justify-content:center;font-size:40px}
.pf-card-body{padding:16px}
.pf-card-body h3{font-size:15px;font-weight:600;margin-bottom:6px}
.pf-card-body p{font-size:13px;color:#8b8b9e;margin-bottom:12px;line-height:1.5}
.pf-tech{display:flex;gap:6px;flex-wrap:wrap}
.pf-tech span{font-size:11px;padding:3px 8px;background:#1e1e2e;border-radius:5px;color:#8b8b9e}
.pf-skills{display:flex;flex-direction:column;gap:16px}
.skill{display:flex;align-items:center;gap:16px}
.skill-name{width:140px;font-size:14px;font-weight:500;flex-shrink:0}
.skill-bar{flex:1;height:8px;background:#1e1e2e;border-radius:4px;overflow:hidden}
.skill-fill{height:100%;background:linear-gradient(90deg,${c},${c}88);border-radius:4px}
.pf-contact{text-align:center;padding:40px 0}
.pf-contact-text{color:#8b8b9e;font-size:15px;margin-bottom:20px}
.pf-cta{display:inline-block;background:${c};color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:15px;font-weight:600;transition:opacity .2s}
.pf-cta:hover{opacity:.85}
`;

  const js = `
// Portfolio is mostly static — smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',function(e){
    e.preventDefault();
    const target=document.querySelector(this.getAttribute('href'));
    if(target)target.scrollIntoView({behavior:'smooth'});
  });
});
`;

  return { html, css, js, title: "Portfolio" };
}

// ============ LANDING ============
function generateLanding(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const html = `
<div class="land-app">
  <nav class="land-nav">
    <div class="land-logo">⚡ Vibecode</div>
    <div class="land-nav-links">
      <a href="#features">Features</a>
      <a href="#testimonials">Reviews</a>
      <a href="#cta">Pricing</a>
    </div>
    <button class="land-nav-cta">Get Started</button>
  </nav>
  <section class="land-hero">
    <div class="land-badge">🚀 Now in Public Beta</div>
    <h1 class="land-h1">Build Apps<br /><span class="land-gradient">10x Faster</span></h1>
    <p class="land-sub">Describe what you want. Watch it come to life. No code required — but you can edit every line.</p>
    <div class="land-hero-actions">
      <button class="btn-primary-lg">Start Building Free</button>
      <button class="btn-secondary-lg">Watch Demo</button>
    </div>
    <div class="land-hero-stats">
      <div class="land-stat"><strong>12k+</strong><span>Apps built</span></div>
      <div class="land-stat"><strong>4.9★</strong><span>User rating</span></div>
      <div class="land-stat"><strong>&lt;30s</strong><span>Avg. build time</span></div>
    </div>
  </section>
  <section class="land-section" id="features">
    <h2 class="land-section-title">Everything you need</h2>
    <p class="land-section-sub">Powerful features that make building effortless</p>
    <div class="land-features">
      <div class="feat-card"><div class="feat-icon">⚡</div><h3>Instant Generation</h3><p>From prompt to working app in under 30 seconds.</p></div>
      <div class="feat-card"><div class="feat-icon">🎨</div><h3>Custom Design</h3><p>Full control over colors, layout, and styling.</p></div>
      <div class="feat-card"><div class="feat-icon">📱</div><h3>Responsive</h3><p>Every app works beautifully on any device.</p></div>
      <div class="feat-card"><div class="feat-icon">🔒</div><h3>Private by Default</h3><p>Your code stays yours. No data leaves your machine.</p></div>
      <div class="feat-card"><div class="feat-icon">🔄</div><h3>Iterate Fast</h3><p>Make changes conversationally, see them instantly.</p></div>
      <div class="feat-card"><div class="feat-icon">📦</div><h3>Export Anywhere</h3><p>Download clean HTML/CSS/JS or deploy in one click.</p></div>
    </div>
  </section>
  <section class="land-section" id="testimonials">
    <h2 class="land-section-title">Loved by builders</h2>
    <div class="land-testimonials">
      <div class="testi-card"><p>"I built my entire MVP in an afternoon. Vibecode is a game-changer for indie hackers."</p><div class="testi-author"><span class="testi-avatar" style="background:linear-gradient(135deg,#6366f1,#ec4899)">S</span><div><strong>Sarah K.</strong><span>Indie Hacker</span></div></div></div>
      <div class="testi-card"><p>"The quality of generated code is surprisingly good. I've shipped 3 client projects with it."</p><div class="testi-author"><span class="testi-avatar" style="background:linear-gradient(135deg,#10b981,#0ea5e9)">M</span><div><strong>Marco V.</strong><span>Freelance Dev</span></div></div></div>
      <div class="testi-card"><p>"As a non-technical founder, this is the first tool that actually lets me build what I imagine."</p><div class="testi-author"><span class="testi-avatar" style="background:linear-gradient(135deg,#f97316,#eab308)">A</span><div><strong>Anna L.</strong><span>Startup Founder</span></div></div></div>
    </div>
  </section>
  <section class="land-cta" id="cta">
    <h2>Ready to build something amazing?</h2>
    <p>Join 12,000+ builders creating apps with Vibecode.</p>
    <button class="btn-primary-lg">Start Free — No Credit Card</button>
  </section>
  <footer class="land-footer">
    <div>⚡ Vibecode</div>
    <div class="land-footer-links"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Contact</a></div>
    <div>© 2025 Vibecode. All rights reserved.</div>
  </footer>
</div>`;

  const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#f0f0f5;min-height:100vh}
.land-app{max-width:1100px;margin:0 auto}
.land-nav{display:flex;justify-content:space-between;align-items:center;padding:16px 24px;border-bottom:1px solid #1e1e2e;position:sticky;top:0;background:#0a0a0fee;backdrop-filter:blur(10px);z-index:10}
.land-logo{font-size:18px;font-weight:700}
.land-nav-links{display:flex;gap:24px}
.land-nav-links a{color:#8b8b9e;text-decoration:none;font-size:14px;font-weight:500;transition:color .2s}
.land-nav-links a:hover{color:#f0f0f5}
.land-nav-cta{background:${c};color:#fff;border:none;padding:8px 18px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer}
.land-hero{text-align:center;padding:80px 20px 60px}
.land-badge{display:inline-block;background:${c}15;border:1px solid ${c}33;color:${c};padding:6px 16px;border-radius:20px;font-size:13px;font-weight:500;margin-bottom:24px}
.land-h1{font-size:52px;font-weight:800;line-height:1.1;margin-bottom:20px}
.land-gradient{background:linear-gradient(135deg,${c},#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.land-sub{font-size:18px;color:#8b8b9e;max-width:540px;margin:0 auto 32px;line-height:1.6}
.land-hero-actions{display:flex;gap:12px;justify-content:center;margin-bottom:48px;flex-wrap:wrap}
.btn-primary-lg{background:${c};color:#fff;border:none;padding:14px 32px;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;transition:opacity .2s}
.btn-primary-lg:hover{opacity:.85}
.btn-secondary-lg{background:transparent;border:1px solid #1e1e2e;color:#f0f0f5;padding:14px 32px;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer}
.btn-secondary-lg:hover{border-color:${c}}
.land-hero-stats{display:flex;gap:40px;justify-content:center;flex-wrap:wrap}
.land-stat{text-align:center}
.land-stat strong{display:block;font-size:24px;font-weight:700;color:${c};margin-bottom:4px}
.land-stat span{font-size:13px;color:#5a5a6e}
.land-section{padding:60px 24px;text-align:center}
.land-section-title{font-size:32px;font-weight:700;margin-bottom:12px}
.land-section-sub{color:#8b8b9e;font-size:15px;margin-bottom:40px}
.land-features{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;text-align:left}
.feat-card{background:#12121a;border:1px solid #1e1e2e;border-radius:16px;padding:24px;transition:border-color .2s}
.feat-card:hover{border-color:${c}44}
.feat-icon{font-size:28px;margin-bottom:12px}
.feat-card h3{font-size:16px;font-weight:600;margin-bottom:8px}
.feat-card p{font-size:14px;color:#8b8b9e;line-height:1.5}
.land-testimonials{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;text-align:left}
.testi-card{background:#12121a;border:1px solid #1e1e2e;border-radius:16px;padding:24px}
.testi-card p{font-size:14px;color:#c0c0d0;line-height:1.6;margin-bottom:16px;font-style:italic}
.testi-author{display:flex;align-items:center;gap:10px}
.testi-avatar{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff}
.testi-author strong{display:block;font-size:13px}
.testi-author span{font-size:12px;color:#5a5a6e}
.land-cta{text-align:center;padding:80px 24px;background:linear-gradient(135deg,${c}11,transparent);border-top:1px solid #1e1e2e;border-bottom:1px solid #1e1e2e}
.land-cta h2{font-size:32px;font-weight:700;margin-bottom:12px}
.land-cta p{color:#8b8b9e;font-size:15px;margin-bottom:28px}
.land-footer{display:flex;justify-content:space-between;align-items:center;padding:24px;flex-wrap:wrap;gap:12px;font-size:13px;color:#5a5a6e}
.land-footer-links{display:flex;gap:16px}
.land-footer-links a{color:#5a5a6e;text-decoration:none}
.land-footer-links a:hover{color:#f0f0f5}
`;

  const js = `
document.querySelectorAll('.land-nav-links a').forEach(a=>{
  a.addEventListener('click',function(e){
    e.preventDefault();
    const t=document.querySelector(this.getAttribute('href'));
    if(t)t.scrollIntoView({behavior:'smooth'});
  });
});
`;

  return { html, css, js, title: "Landing Page" };
}

// ============ QUIZ ============
function generateQuiz(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const html = `
<div class="quiz-app">
  <div class="quiz-header">
    <div class="quiz-progress-wrap">
      <div class="quiz-progress-bar"><div class="quiz-progress-fill" id="quiz-progress"></div></div>
      <span class="quiz-progress-text" id="quiz-progress-text">1 / 5</span>
    </div>
  </div>
  <div class="quiz-body" id="quiz-body"></div>
  <div class="quiz-footer" id="quiz-footer"></div>
</div>`;

  const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#f0f0f5;min-height:100vh}
.quiz-app{max-width:600px;margin:0 auto;padding:32px 20px;min-height:100vh;display:flex;flex-direction:column}
.quiz-header{margin-bottom:28px}
.quiz-progress-wrap{display:flex;align-items:center;gap:12px}
.quiz-progress-bar{flex:1;height:8px;background:#1e1e2e;border-radius:4px;overflow:hidden}
.quiz-progress-fill{height:100%;background:${c};border-radius:4px;transition:width .4s ease}
.quiz-progress-text{font-size:13px;color:#8b8b9e;font-weight:500;white-space:nowrap}
.quiz-body{flex:1}
.quiz-question{font-size:22px;font-weight:700;margin-bottom:24px;line-height:1.4}
.quiz-options{display:flex;flex-direction:column;gap:10px}
.quiz-option{background:#12121a;border:2px solid #1e1e2e;border-radius:12px;padding:16px 20px;cursor:pointer;font-size:15px;transition:all .2s;display:flex;align-items:center;gap:12px}
.quiz-option:hover{border-color:${c}66;background:#1a1a2a}
.quiz-option.selected{border-color:${c};background:${c}15}
.quiz-option.correct{border-color:#10b981;background:#10b98115}
.quiz-option.wrong{border-color:#ef4444;background:#ef444415}
.quiz-option-letter{width:28px;height:28px;border-radius:50%;background:#1e1e2e;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0}
.quiz-option.selected .quiz-option-letter{background:${c};color:#fff}
.quiz-option.correct .quiz-option-letter{background:#10b981;color:#fff}
.quiz-option.wrong .quiz-option-letter{background:#ef4444;color:#fff}
.quiz-footer{margin-top:28px;display:flex;justify-content:flex-end}
.btn-quiz{background:${c};color:#fff;border:none;padding:12px 28px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:opacity .2s}
.btn-quiz:hover{opacity:.85}
.btn-quiz:disabled{opacity:.4;cursor:not-allowed}
.quiz-result{text-align:center;padding:40px 0}
.result-score{font-size:72px;font-weight:800;color:${c};margin-bottom:12px}
.result-label{font-size:20px;font-weight:600;margin-bottom:8px}
.result-msg{color:#8b8b9e;font-size:15px;margin-bottom:32px}
.result-breakdown{text-align:left;background:#12121a;border:1px solid #1e1e2e;border-radius:14px;padding:20px;margin-bottom:24px}
.result-item{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #1e1e2e;font-size:14px}
.result-item:last-child{border-bottom:none}
.result-item .correct-mark{color:#10b981;font-weight:700}
.result-item .wrong-mark{color:#ef4444;font-weight:700}
`;

  const js = `
const questions=[
  {q:'What does HTML stand for?',opts:['Hyper Text Markup Language','High Tech Modern Language','Hyper Transfer Machine Language','Home Tool Markup Language'],ans:0},
  {q:'Which CSS property controls text size?',opts:['font-style','text-size','font-size','text-style'],ans:2},
  {q:'What is the correct way to declare a JS variable?',opts:['variable x','var x','v x','let! x'],ans:1},
  {q:'Which HTTP method is used to update data?',opts:['GET','POST','PUT','DELETE'],ans:2},
  {q:'What does API stand for?',opts:['Application Programming Interface','Applied Program Integration','Advanced Protocol Interface','Application Process Integration'],ans:0}
];
let cur=0,selected=-1,score=0,answers=[];
const body=document.getElementById('quiz-body');
const footer=document.getElementById('quiz-footer');
const progFill=document.getElementById('quiz-progress');
const progText=document.getElementById('quiz-progress-text');

function render(){
  if(cur>=questions.length){showResult();return;}
  const q=questions[cur];
  progFill.style.width=((cur)/questions.length*100)+'%';
  progText.textContent=(cur+1)+' / '+questions.length;
  selected=-1;
  body.innerHTML='<div class="quiz-question">'+q.q+'</div><div class="quiz-options">'+
    q.opts.map((o,i)=>'<div class="quiz-option" data-i="'+i+'"><span class="quiz-option-letter">'+'ABCD'[i]+'</span><span>'+o+'</span></div>').join('')+'</div>';
  footer.innerHTML='<button class="btn-quiz" id="btn-next" disabled>Next →</button>';
  document.querySelectorAll('.quiz-option').forEach(el=>{
    el.addEventListener('click',function(){
      document.querySelectorAll('.quiz-option').forEach(x=>x.classList.remove('selected'));
      this.classList.add('selected');
      selected=parseInt(this.dataset.i);
      document.getElementById('btn-next').disabled=false;
    });
  });
  document.getElementById('btn-next').addEventListener('click',next);
}
function next(){
  if(selected<0)return;
  const q=questions[cur];
  const correct=selected===q.ans;
  if(correct)score++;
  answers.push({q:q.q,correct});
  document.querySelectorAll('.quiz-option').forEach((el,i)=>{
    el.style.pointerEvents='none';
    if(i===q.ans)el.classList.add('correct');
    else if(i===selected&&!correct)el.classList.add('wrong');
  });
  setTimeout(()=>{cur++;render();},800);
}
function showResult(){
  progFill.style.width='100%';
  progText.textContent='Done';
  const pct=Math.round(score/questions.length*100);
  const msg=pct>=80?'Excellent work! 🎉':pct>=60?'Good job! 👍':'Keep practicing! 💪';
  body.innerHTML='<div class="quiz-result"><div class="result-score">'+pct+'%</div><div class="result-label">You scored '+score+' out of '+questions.length+'</div><div class="result-msg">'+msg+'</div><div class="result-breakdown">'+
    answers.map((a,i)=>'<div class="result-item"><span>'+(i+1)+'. '+a.q+'</span><span class="'+(a.correct?'correct-mark':'wrong-mark')+'">'+(a.correct?'✓':'✗')+'</span></div>').join('')+
    '</div><button class="btn-quiz" id="btn-retry">Try Again</button></div>';
  footer.innerHTML='';
  document.getElementById('btn-retry').addEventListener('click',()=>{cur=0;score=0;answers=[];render();});
}
render();
`;

  return { html, css, js, title: "Quiz" };
}

// ============ BUDGET ============
function generateBudget(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const html = `
<div class="budget-app">
  <header class="budget-header">
    <h1 class="budget-title">💰 Budget Tracker</h1>
    <div class="budget-summary">
      <div class="sum-card"><span class="sum-label">Income</span><span class="sum-value income" id="sum-income">€0.00</span></div>
      <div class="sum-card"><span class="sum-label">Expenses</span><span class="sum-value expense" id="sum-expense">€0.00</span></div>
      <div class="sum-card"><span class="sum-label">Balance</span><span class="sum-value" id="sum-balance">€0.00</span></div>
    </div>
  </header>
  <div class="budget-form">
    <select id="b-type" class="b-select">
      <option value="in">Income</option>
      <option value="out">Expense</option>
    </select>
    <input type="text" id="b-desc" class="b-input" placeholder="Description" />
    <input type="number" id="b-amount" class="b-input" placeholder="Amount" min="0" step="0.01" />
    <select id="b-cat" class="b-select">
      <option value="food">🍕 Food</option>
      <option value="transport">🚗 Transport</option>
      <option value="housing">🏠 Housing</option>
      <option value="entertainment">🎬 Fun</option>
      <option value="salary">💼 Salary</option>
      <option value="other">📦 Other</option>
    </select>
    <button class="b-add" id="b-add">+ Add</button>
  </div>
  <div class="budget-list" id="budget-list">
    <p class="budget-empty">No transactions yet. Add one above!</p>
  </div>
</div>`;

  const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#f0f0f5;min-height:100vh}
.budget-app{max-width:700px;margin:0 auto;padding:32px 20px}
.budget-header{margin-bottom:24px}
.budget-title{font-size:24px;font-weight:700;margin-bottom:16px}
.budget-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.sum-card{background:#12121a;border:1px solid #1e1e2e;border-radius:12px;padding:14px;text-align:center}
.sum-label{display:block;font-size:12px;color:#5a5a6e;margin-bottom:4px;text-transform:uppercase;letter-spacing:.5px}
.sum-value{font-size:18px;font-weight:700}
.sum-value.income{color:#10b981}
.sum-value.expense{color:#ef4444}
.budget-form{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap}
.b-select,.b-input{background:#12121a;border:1px solid #1e1e2e;border-radius:8px;padding:10px 12px;color:#f0f0f5;font-size:13px;outline:none}
.b-select:focus,.b-input:focus{border-color:${c}}
.b-input{flex:1;min-width:100px}
.b-add{background:${c};color:#fff;border:none;padding:10px 20px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer}
.b-add:hover{opacity:.85}
.budget-list{display:flex;flex-direction:column;gap:8px}
.budget-empty{color:#5a5a6e;text-align:center;padding:32px 0;font-size:14px}
.budget-item{display:flex;align-items:center;gap:12px;background:#12121a;border:1px solid #1e1e2e;border-radius:12px;padding:14px 16px}
.budget-item-icon{font-size:20px}
.budget-item-info{flex:1;min-width:0}
.budget-item-desc{font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.budget-item-cat{font-size:12px;color:#5a5a6e}
.budget-item-amount{font-size:15px;font-weight:700;white-space:nowrap}
.budget-item-amount.in{color:#10b981}
.budget-item-amount.out{color:#ef4444}
.budget-item-del{background:transparent;border:none;color:#5a5a6e;cursor:pointer;font-size:16px;padding:4px}
.budget-item-del:hover{color:#ef4444}
`;

  const js = `
let txs=JSON.parse(localStorage.getItem('vibecode_budget')||'[]');
const list=document.getElementById('budget-list');
const catIcons={food:'🍕',transport:'🚗',housing:'🏠',entertainment:'🎬',salary:'💼',other:'📦'};
const catNames={food:'Food',transport:'Transport',housing:'Housing',entertainment:'Fun',salary:'Salary',other:'Other'};

function save(){localStorage.setItem('vibecode_budget',JSON.stringify(txs));}
function render(){
  const income=txs.filter(t=>t.type==='in').reduce((s,t)=>s+t.amount,0);
  const expense=txs.filter(t=>t.type==='out').reduce((s,t)=>s+t.amount,0);
  document.getElementById('sum-income').textContent='€'+income.toFixed(2);
  document.getElementById('sum-expense').textContent='€'+expense.toFixed(2);
  const bal=income-expense;
  const balEl=document.getElementById('sum-balance');
  balEl.textContent='€'+bal.toFixed(2);
  balEl.style.color=bal>=0?'#10b981':'#ef4444';
  if(!txs.length){list.innerHTML='<p class="budget-empty">No transactions yet. Add one above!</p>';return;}
  list.innerHTML=txs.map((t,i)=>\`
    <div class="budget-item">
      <span class="budget-item-icon">\${catIcons[t.cat]||'📦'}</span>
      <div class="budget-item-info"><div class="budget-item-desc">\${t.desc}</div><div class="budget-item-cat">\${catNames[t.cat]||t.cat}</div></div>
      <span class="budget-item-amount \${t.type}">\${t.type==='in'?'+':'−'}€\${t.amount.toFixed(2)}</span>
      <button class="budget-item-del" data-i="\${i}">✕</button>
    </div>\`).join('');
  list.querySelectorAll('.budget-item-del').forEach(btn=>{
    btn.addEventListener('click',()=>{txs.splice(parseInt(btn.dataset.i),1);save();render();});
  });
}
document.getElementById('b-add').addEventListener('click',()=>{
  const type=document.getElementById('b-type').value;
  const desc=document.getElementById('b-desc').value.trim();
  const amount=parseFloat(document.getElementById('b-amount').value);
  const cat=document.getElementById('b-cat').value;
  if(!desc||!amount||amount<=0){alert('Please fill in description and a valid amount.');return;}
  txs.unshift({type,desc,amount,cat});
  save();render();
  document.getElementById('b-desc').value='';
  document.getElementById('b-amount').value='';
});
render();
`;

  return { html, css, js, title: "Budget" };
}

// ============ HABITS ============
function generateHabits(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const html = `
<div class="habit-app">
  <header class="habit-header">
    <h1 class="habit-title">🌱 Habit Tracker</h1>
    <p class="habit-subtitle">Build better habits, one day at a time</p>
  </header>
  <div class="habit-add-row">
    <input type="text" id="habit-input" class="habit-input" placeholder="Add a new habit..." />
    <button class="habit-add-btn" id="habit-add">+ Add</button>
  </div>
  <div class="habit-week-header">
    <span class="habit-week-label">Habit</span>
    <div class="habit-week-days" id="habit-week-days"></div>
  </div>
  <div class="habit-list" id="habit-list"></div>
</div>`;

  const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#f0f0f5;min-height:100vh}
.habit-app{max-width:700px;margin:0 auto;padding:32px 20px}
.habit-header{margin-bottom:24px}
.habit-title{font-size:24px;font-weight:700;margin-bottom:6px}
.habit-subtitle{color:#8b8b9e;font-size:14px}
.habit-add-row{display:flex;gap:10px;margin-bottom:24px}
.habit-input{flex:1;background:#12121a;border:1px solid #1e1e2e;border-radius:10px;padding:12px 16px;color:#f0f0f5;font-size:14px;outline:none}
.habit-input:focus{border-color:${c}}
.habit-add-btn{background:${c};color:#fff;border:none;padding:12px 20px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer}
.habit-add-btn:hover{opacity:.85}
.habit-week-header{display:flex;align-items:center;gap:8px;margin-bottom:12px;padding:0 4px}
.habit-week-label{width:160px;font-size:12px;color:#5a5a6e;font-weight:600;text-transform:uppercase;letter-spacing:.5px}
.habit-week-days{display:flex;gap:4px;flex:1}
.habit-day{flex:1;text-align:center;font-size:11px;color:#5a5a6e;font-weight:500}
.habit-day.today{color:${c};font-weight:700}
.habit-list{display:flex;flex-direction:column;gap:8px}
.habit-empty{color:#5a5a6e;text-align:center;padding:32px 0;font-size:14px}
.habit-row{display:flex;align-items:center;gap:8px;background:#12121a;border:1px solid #1e1e2e;border-radius:12px;padding:12px 16px}
.habit-name{width:160px;font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.habit-days{display:flex;gap:4px;flex:1}
.habit-day-cell{flex:1;aspect-ratio:1;border-radius:8px;background:#1e1e2e;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all .2s;border:2px solid transparent}
.habit-day-cell:hover{border-color:${c}66}
.habit-day-cell.done{background:${c};border-color:${c}}
.habit-day-cell.done::after{content:'✓';color:#fff;font-size:12px;font-weight:700}
.habit-streak{font-size:12px;color:#f97316;font-weight:600;white-space:nowrap;min-width:50px;text-align:right}
.habit-del{background:transparent;border:none;color:#5a5a6e;cursor:pointer;font-size:14px;padding:4px}
.habit-del:hover{color:#ef4444}
`;

  const js = `
let habits=JSON.parse(localStorage.getItem('vibecode_habits')||'[]');
const list=document.getElementById('habit-list');
const weekDays=document.getElementById('habit-week-days');
const today=new Date();
const days=[];
for(let i=6;i>=0;i--){
  const d=new Date(today);d.setDate(d.getDate()-i);
  days.push(d);
}
function dayKey(d){return d.toISOString().split('T')[0];}
function renderWeekHeader(){
  const labels=['Su','Mo','Tu','We','Th','Fr','Sa'];
  weekDays.innerHTML=days.map(d=>{
    const isToday=dayKey(d)===dayKey(today);
    return '<span class="habit-day'+(isToday?' today':'')+'">'+labels[d.getDay()]+'</span>';
  }).join('');
}
function getStreak(h){
  let streak=0;
  for(let i=0;i<days.length;i++){
    if(h.days[dayKey(days[i])])streak++;
    else break;
  }
  return streak;
}
function render(){
  if(!habits.length){list.innerHTML='<p class="habit-empty">No habits yet. Add one above! 🌱</p>';return;}
  list.innerHTML=habits.map((h,hi)=>{
    const cells=days.map(d=>{
      const k=dayKey(d);
      const done=h.days[k];
      return '<div class="habit-day-cell'+(done?' done':'')+'" data-hi="'+hi+'" data-k="'+k+'"></div>';
    }).join('');
    const streak=getStreak(h);
    return '<div class="habit-row"><span class="habit-name">'+h.name+'</span><div class="habit-days">'+cells+'</div><span class="habit-streak">'+(streak>0?'🔥 '+streak:'')+'</span><button class="habit-del" data-hi="'+hi+'">✕</button></div>';
  }).join('');
  list.querySelectorAll('.habit-day-cell').forEach(cell=>{
    cell.addEventListener('click',function(){
      const hi=parseInt(this.dataset.hi);
      const k=this.dataset.k;
      habits[hi].days[k]=!habits[hi].days[k];
      save();render();
    });
  });
  list.querySelectorAll('.habit-del').forEach(btn=>{
    btn.addEventListener('click',function(){
      habits.splice(parseInt(this.dataset.hi),1);
      save();render();
    });
  });
}
function save(){localStorage.setItem('vibecode_habits',JSON.stringify(habits));}
document.getElementById('habit-add').addEventListener('click',addHabit);
document.getElementById('habit-input').addEventListener('keydown',e=>{if(e.key==='Enter')addHabit();});
function addHabit(){
  const input=document.getElementById('habit-input');
  const name=input.value.trim();
  if(!name)return;
  habits.push({name,days:{}});
  input.value='';
  save();render();
}
renderWeekHeader();
render();
`;

  return { html, css, js, title: "Habits" };
}

// ============ RECIPES ============
function generateRecipes(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const html = `
<div class="recipe-app">
  <header class="recipe-header">
    <h1 class="recipe-title">🍳 Recipe Box</h1>
    <div class="recipe-search">
      <input type="text" id="recipe-search" class="recipe-search-input" placeholder="Search recipes..." />
    </div>
  </header>
  <div class="recipe-grid" id="recipe-grid"></div>
  <div class="recipe-detail" id="recipe-detail">
    <button class="detail-close" id="detail-close">← Back</button>
    <div class="detail-content" id="detail-content"></div>
  </div>
</div>`;

  const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#f0f0f5;min-height:100vh}
.recipe-app{max-width:1000px;margin:0 auto;padding:32px 20px}
.recipe-header{margin-bottom:24px}
.recipe-title{font-size:28px;font-weight:700;margin-bottom:16px}
.recipe-search{max-width:400px}
.recipe-search-input{width:100%;background:#12121a;border:1px solid #1e1e2e;border-radius:10px;padding:12px 16px;color:#f0f0f5;font-size:14px;outline:none}
.recipe-search-input:focus{border-color:${c}}
.recipe-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px}
.recipe-card{background:#12121a;border:1px solid #1e1e2e;border-radius:14px;overflow:hidden;cursor:pointer;transition:transform .2s}
.recipe-card:hover{transform:translateY(-2px)}
.recipe-card-img{height:140px;display:flex;align-items:center;justify-content:center;font-size:48px}
.recipe-card-body{padding:16px}
.recipe-card-title{font-size:15px;font-weight:600;margin-bottom:6px}
.recipe-card-meta{display:flex;gap:12px;font-size:12px;color:#5a5a6e}
.recipe-card-meta span{display:flex;align-items:center;gap:4px}
.recipe-detail{display:none}
.recipe-detail.open{display:block}
.detail-close{background:transparent;border:1px solid #1e1e2e;color:#8b8b9e;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;margin-bottom:20px}
.detail-close:hover{border-color:${c};color:#f0f0f5}
.detail-content{background:#12121a;border:1px solid #1e1e2e;border-radius:16px;padding:28px}
.detail-hero{height:200px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:72px;margin-bottom:24px}
.detail-title{font-size:24px;font-weight:700;margin-bottom:8px}
.detail-meta{display:flex;gap:16px;margin-bottom:24px;font-size:13px;color:#8b8b9e}
.detail-section{margin-bottom:24px}
.detail-section h3{font-size:16px;font-weight:600;margin-bottom:12px;color:${c}}
.detail-ingredients{display:flex;flex-direction:column;gap:8px}
.detail-ingredient{display:flex;align-items:center;gap:10px;font-size:14px;color:#c0c0d0}
.detail-ingredient::before{content:'•';color:${c};font-weight:700}
.detail-steps{display:flex;flex-direction:column;gap:12px}
.detail-step{display:flex;gap:12px;font-size:14px;color:#c0c0d0;line-height:1.6}
.step-num{width:28px;height:28px;border-radius:50%;background:${c}22;color:${c};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;margin-top:2px}
`;

  const js = `
const recipes=[
  {title:'Pasta Carbonara',time:25,servings:2,difficulty:'Easy',emoji:'🍝',g:'linear-gradient(135deg,#eab308,#f97316)',ingredients:['400g spaghetti','200g pancetta','3 egg yolks','100g pecorino romano','Black pepper','Salt'],steps:['Boil salted water and cook spaghetti al dente.','Fry pancetta in a pan until crispy.','Whisk egg yolks with grated pecorino and pepper.','Toss hot pasta with pancetta, off heat.','Add egg mixture quickly, stirring constantly.','Serve immediately with extra pecorino.']},
  {title:'Avocado Toast',time:10,servings:1,difficulty:'Easy',emoji:'🥑',g:'linear-gradient(135deg,#10b981,#065f46)',ingredients:['2 slices sourdough bread','1 ripe avocado','1 lemon','Chili flakes','Sea salt','Olive oil'],steps:['Toast the sourdough bread until golden.','Mash avocado with lemon juice, salt, and pepper.','Spread generously over toast.','Drizzle with olive oil and sprinkle chili flakes.']},
  {title:'Chicken Stir Fry',time:30,servings:4,difficulty:'Medium',emoji:'🍗',g:'linear-gradient(135deg,#f97316,#ef4444)',ingredients:['500g chicken breast','2 bell peppers','1 onion','3 cloves garlic','4 tbsp soy sauce','1 tbsp sesame oil','200g rice','Vegetable oil'],steps:['Cook rice according to package instructions.','Slice chicken into thin strips.','Stir fry chicken in hot oil until golden, set aside.','Fry vegetables with garlic until tender.','Return chicken, add soy sauce and sesame oil.','Serve over steamed rice.']},
  {title:'French Onion Soup',time:45,servings:4,difficulty:'Medium',emoji:'🍲',g:'linear-gradient(135deg,#8b5cf6,#6366f1)',ingredients:['4 large onions','2 tbsp butter','1 liter beef stock','200ml dry white wine','4 slices baguette','100g gruyère cheese','Fresh thyme'],steps:['Slice onions thin and caramelize in butter (20 min).','Add wine and deglaze the pan.','Pour in beef stock and simmer 15 minutes.','Place baguette slices in bowls, ladle soup over.','Top with gruyère and broil until golden.']},
  {title:'Berry Smoothie Bowl',time:10,servings:1,difficulty:'Easy',emoji:'🫐',g:'linear-gradient(135deg,#ec4899,#8b5cf6)',ingredients:['1 frozen banana','1 cup mixed berries','100ml coconut milk','Granola','Sliced almonds','Honey','Coconut flakes'],steps:['Blend banana, berries, and coconut milk until thick.','Pour into a bowl.','Top with granola, almonds, and extra berries.','Drizzle with honey and sprinkle coconut flakes.']},
  {title:'Homemade Pizza',time:60,servings:2,difficulty:'Hard',emoji:'🍕',g:'linear-gradient(135deg,#ef4444,#f97316)',ingredients:['500g bread flour','7g yeast','300ml warm water','200ml tomato sauce','200g mozzarella','Fresh basil','Olive oil','Salt'],steps:['Mix flour, yeast, water, and salt. Knead 10 min.','Let dough rise 1 hour until doubled.','Stretch into two rounds on floured surface.','Spread tomato sauce, add mozzarella.','Bake at 250°C for 10-12 minutes.','Top with basil and olive oil after baking.']}
];
const grid=document.getElementById('recipe-grid');
const detail=document.getElementById('recipe-detail');
const detailContent=document.getElementById('detail-content');

function renderGrid(filter){
  const f=(filter||'').toLowerCase();
  const filtered=recipes.filter(r=>r.title.toLowerCase().includes(f));
  if(!filtered.length){grid.innerHTML='<p style="color:#5a5a6e;grid-column:1/-1;text-align:center;padding:32px">No recipes found.</p>';return;}
  grid.innerHTML=filtered.map((r,i)=>\`
    <div class="recipe-card" data-i="\${i}">
      <div class="recipe-card-img" style="background:\${r.g}">\${r.emoji}</div>
      <div class="recipe-card-body">
        <div class="recipe-card-title">\${r.title}</div>
        <div class="recipe-card-meta"><span>⏱ \${r.time} min</span><span>👥 \${r.servings}</span><span>📊 \${r.difficulty}</span></div>
      </div>
    </div>\`).join('');
  grid.querySelectorAll('.recipe-card').forEach(card=>{
    card.addEventListener('click',()=>openDetail(parseInt(card.dataset.i),filtered));
  });
}
function openDetail(i,filtered){
  const r=filtered[i];
  detailContent.innerHTML='<div class="detail-hero" style="background:'+r.g+'">'+r.emoji+'</div><div class="detail-title">'+r.title+'</div><div class="detail-meta"><span>⏱ '+r.time+' min</span><span>👥 '+r.servings+' servings</span><span>📊 '+r.difficulty+'</span></div><div class="detail-section"><h3>Ingredients</h3><div class="detail-ingredients">'+r.ingredients.map(ing=>'<div class="detail-ingredient">'+ing+'</div>').join('')+'</div></div><div class="detail-section"><h3>Instructions</h3><div class="detail-steps">'+r.steps.map((s,i)=>'<div class="detail-step"><span class="step-num">'+(i+1)+'</span><span>'+s+'</span></div>').join('')+'</div></div>';
  grid.style.display='none';
  detail.classList.add('open');
}
document.getElementById('detail-close').addEventListener('click',()=>{
  detail.classList.remove('open');
  grid.style.display='grid';
});
document.getElementById('recipe-search').addEventListener('input',function(){
  renderGrid(this.value);
});
renderGrid('');
`;

  return { html, css, js, title: "Recipes" };
}

// ============ KANBAN ============
function generateKanban(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const html = `
<div class="kanban-app">
  <header class="kanban-header">
    <h1 class="kanban-title">📋 Project Board</h1>
    <div class="kanban-add-row">
      <input type="text" id="kanban-input" class="kanban-input" placeholder="Add a card to To Do..." />
      <button class="kanban-add-btn" id="kanban-add">+ Add</button>
    </div>
  </header>
  <div class="kanban-board">
    <div class="kanban-col" data-col="todo">
      <div class="kanban-col-header"><h3>To Do</h3><span class="kanban-count" id="count-todo">0</span></div>
      <div class="kanban-cards" id="cards-todo"></div>
    </div>
    <div class="kanban-col" data-col="progress">
      <div class="kanban-col-header"><h3>In Progress</h3><span class="kanban-count" id="count-progress">0</span></div>
      <div class="kanban-cards" id="cards-progress"></div>
    </div>
    <div class="kanban-col" data-col="done">
      <div class="kanban-col-header"><h3>Done</h3><span class="kanban-count" id="count-done">0</span></div>
      <div class="kanban-cards" id="cards-done"></div>
    </div>
  </div>
</div>`;

  const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#f0f0f5;min-height:100vh}
.kanban-app{max-width:1100px;margin:0 auto;padding:24px 20px}
.kanban-header{margin-bottom:24px}
.kanban-title{font-size:24px;font-weight:700;margin-bottom:16px}
.kanban-add-row{display:flex;gap:10px}
.kanban-input{flex:1;background:#12121a;border:1px solid #1e1e2e;border-radius:10px;padding:12px 16px;color:#f0f0f5;font-size:14px;outline:none}
.kanban-input:focus{border-color:${c}}
.kanban-add-btn{background:${c};color:#fff;border:none;padding:12px 20px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer}
.kanban-add-btn:hover{opacity:.85}
.kanban-board{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;min-height:400px}
@media(max-width:768px){.kanban-board{grid-template-columns:1fr}}
.kanban-col{background:#0e0e14;border:1px solid #1e1e2e;border-radius:14px;padding:16px;display:flex;flex-direction:column}
.kanban-col.drag-over{border-color:${c};background:${c}08}
.kanban-col-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.kanban-col-header h3{font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:#8b8b9e}
.kanban-count{background:#1e1e2e;font-size:12px;font-weight:700;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center}
.kanban-cards{flex:1;display:flex;flex-direction:column;gap:8px;min-height:60px}
.kanban-card{background:#12121a;border:1px solid #1e1e2e;border-radius:10px;padding:12px 14px;cursor:grab;font-size:14px;font-weight:500;transition:border-color .2s;position:relative}
.kanban-card:hover{border-color:${c}44}
.kanban-card.dragging{opacity:.5;border-color:${c}}
.kanban-card-del{position:absolute;top:8px;right:8px;background:transparent;border:none;color:#5a5a6e;cursor:pointer;font-size:12px;opacity:0;transition:opacity .2s}
.kanban-card:hover .kanban-card-del{opacity:1}
.kanban-card-del:hover{color:#ef4444}
.kanban-empty{color:#3a3a4e;font-size:13px;text-align:center;padding:20px 0;font-style:italic}
`;

  const js = `
let board=JSON.parse(localStorage.getItem('vibecode_kanban')||'{"todo":[],"progress":[],"done":[]}');
const cols=['todo','progress','done'];

function save(){localStorage.setItem('vibecode_kanban',JSON.stringify(board));}
function render(){
  cols.forEach(col=>{
    const el=document.getElementById('cards-'+col);
    document.getElementById('count-'+col).textContent=board[col].length;
    if(!board[col].length){el.innerHTML='<div class="kanban-empty">Drop cards here</div>';return;}
    el.innerHTML=board[col].map((card,i)=>\`
      <div class="kanban-card" draggable="true" data-col="\${col}" data-i="\${i}">
        \${card}
        <button class="kanban-card-del" data-col="\${col}" data-i="\${i}">✕</button>
      </div>\`).join('');
  });
  document.querySelectorAll('.kanban-card').forEach(card=>{
    card.addEventListener('dragstart',function(e){
      e.dataTransfer.setData('text/plain',JSON.stringify({col:this.dataset.col,i:parseInt(this.dataset.i)}));
      this.classList.add('dragging');
    });
    card.addEventListener('dragend',function(){this.classList.remove('dragging');});
  });
  document.querySelectorAll('.kanban-card-del').forEach(btn=>{
    btn.addEventListener('click',function(e){
      e.stopPropagation();
      board[this.dataset.col].splice(parseInt(this.dataset.i),1);
      save();render();
    });
  });
}
cols.forEach(col=>{
  const colEl=document.querySelector('[data-col="'+col+'"]');
  colEl.addEventListener('dragover',function(e){e.preventDefault();this.classList.add('drag-over');});
  colEl.addEventListener('dragleave',function(){this.classList.remove('drag-over');});
  colEl.addEventListener('drop',function(e){
    e.preventDefault();this.classList.remove('drag-over');
    try{
      const data=JSON.parse(e.dataTransfer.getData('text/plain'));
      const item=board[data.col].splice(data.i,1)[0];
      if(item)board[col].push(item);
      save();render();
    }catch(err){}
  });
});
document.getElementById('kanban-add').addEventListener('click',addCard);
document.getElementById('kanban-input').addEventListener('keydown',e=>{if(e.key==='Enter')addCard();});
function addCard(){
  const input=document.getElementById('kanban-input');
  const text=input.value.trim();
  if(!text)return;
  board.todo.push(text);
  input.value='';
  save();render();
}
render();
`;

  return { html, css, js, title: "Kanban" };
}

// ============ GENERIC ============
function generateGeneric(ctx: AppContext): GeneratedApp {
  const c = ctx.color;
  const title = ctx.prompt ? ctx.prompt.substring(0, 40) : "My App";
  const html = `
<div class="gen-app">
  <header class="gen-header">
    <div class="gen-logo">⚡</div>
    <div>
      <h1 class="gen-title">\${title}</h1>
      <p class="gen-subtitle">Your custom application</p>
    </div>
  </header>
  <div class="gen-body">
    <div class="gen-input-area">
      <label class="gen-label" for="gen-input">Describe what you want to see</label>
      <textarea id="gen-input" class="gen-textarea" rows="3" placeholder="Type something interesting..."></textarea>
      <button class="gen-btn" id="gen-btn">✨ Generate</button>
    </div>
    <div class="gen-results" id="gen-results">
      <div class="gen-placeholder">
        <div class="gen-placeholder-icon">🎨</div>
        <p>Enter text above and click Generate to create a card.</p>
      </div>
    </div>
  </div>
</div>`;

  const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#f0f0f5;min-height:100vh}
.gen-app{max-width:700px;margin:0 auto;padding:40px 20px}
.gen-header{display:flex;align-items:center;gap:16px;margin-bottom:32px}
.gen-logo{width:48px;height:48px;border-radius:12px;background:${c}22;display:flex;align-items:center;justify-content:center;font-size:24px}
.gen-title{font-size:24px;font-weight:700}
.gen-subtitle{font-size:14px;color:#8b8b9e}
.gen-body{display:flex;flex-direction:column;gap:24px}
.gen-input-area{background:#12121a;border:1px solid #1e1e2e;border-radius:16px;padding:24px}
.gen-label{display:block;font-size:13px;font-weight:600;color:#c0c0d0;margin-bottom:10px}
.gen-textarea{width:100%;background:#0a0a0f;border:1px solid #1e1e2e;border-radius:10px;padding:14px;color:#f0f0f5;font-size:14px;outline:none;resize:vertical;font-family:inherit;margin-bottom:14px}
.gen-textarea:focus{border-color:${c}}
.gen-btn{background:${c};color:#fff;border:none;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:opacity .2s}
.gen-btn:hover{opacity:.85}
.gen-results{display:flex;flex-direction:column;gap:12px}
.gen-placeholder{text-align:center;padding:40px 20px;color:#5a5a6e}
.gen-placeholder-icon{font-size:40px;margin-bottom:12px}
.gen-card{background:#12121a;border:1px solid #1e1e2e;border-radius:14px;padding:20px;animation:fadeIn .3s ease}
.gen-card-title{font-size:15px;font-weight:600;margin-bottom:8px;color:${c}}
.gen-card-text{font-size:14px;color:#c0c0d0;line-height:1.6}
.gen-card-time{font-size:12px;color:#5a5a6e;margin-top:10px}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
`;

  const js = `
const results=document.getElementById('gen-results');
const btn=document.getElementById('gen-btn');
const input=document.getElementById('gen-input');
const cards=JSON.parse(localStorage.getItem('vibecode_generic')||'[]');

function renderCards(){
  if(!cards.length){
    results.innerHTML='<div class="gen-placeholder"><div class="gen-placeholder-icon">🎨</div><p>Enter text above and click Generate to create a card.</p></div>';
    return;
  }
  results.innerHTML=cards.map((card,i)=>\`
    <div class="gen-card">
      <div class="gen-card-title">\${card.title}</div>
      <div class="gen-card-text">\${card.text}</div>
      <div class="gen-card-time">\${card.time}</div>
    </div>\`).join('');
}
function generate(){
  const text=input.value.trim();
  if(!text){input.focus();return;}
  const title=text.substring(0,50)+(text.length>50?'...':'');
  const now=new Date();
  const time=now.toLocaleDateString()+' '+now.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
  cards.unshift({title,text,time});
  if(cards.length>20)cards.pop();
  localStorage.setItem('vibecode_generic',JSON.stringify(cards));
  input.value='';
  renderCards();
}
btn.addEventListener('click',generate);
input.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.ctrlKey)generate();});
renderCards();
`;

  return { html, css, js, title: title };
}
