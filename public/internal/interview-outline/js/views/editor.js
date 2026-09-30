// =========================================================
// 提纲与议题树可视化编辑模式及导出出口 (Word / HTML / JSON)
// =========================================================

/* ---------- 导出 ---------- */
function exportShell(title, inner){
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${title}</title>
<style>
body{font-family:"PingFang SC","Microsoft YaHei",sans-serif;font-size:14.5px;color:#111827;line-height:1.85;max-width:860px;margin:30px auto;padding:0 24px}
h1.doctitle{font-size:19px;text-align:center;font-weight:800}
h2.docsub{font-size:15px;text-align:center;color:#22315e;margin-bottom:14px}
hr.sep{border:none;border-top:2px solid #22315e;margin:16px 0}
.docnote{background:#f6f8ff;border-left:4px solid #1f5eff;padding:10px 14px;font-size:13px;color:#33415e;margin:12px 0}
h3.mod{font-size:16px;font-weight:800;color:#12285e;margin:22px 0 8px;padding-bottom:5px;border-bottom:2.5px solid #12285e}
h3.mod .en{font-size:11.5px;color:#8892a6;font-weight:500;margin-left:8px}
h4{font-size:14.5px;color:#1f3a8a;margin:14px 0 6px}
h5{font-size:13.5px;color:#33415e;margin:10px 0 4px}
p{margin:5px 0}
ul.q{list-style:none;margin:4px 0 8px;padding:0}
body{counter-reset:qnum}
ul.q>li{position:relative;padding-left:36px;margin:6px 0;counter-increment:qnum}
ul.q>li::before{content:counter(qnum);position:absolute;left:0;top:0;font-weight:700;color:#1f5eff;font-size:13px}
.probe{background:#f7f8fa;border-left:3px solid #c3cad9;color:#42506b;font-size:13px;padding:6px 12px;margin:5px 0 5px 36px}
.probe::before{content:"↳ ";color:#8892a6}
.branch{background:#fff8f2;border-left:4px solid #e8833a;padding:10px 14px;margin:10px 0}
.branch .bt{font-weight:800;color:#b05a12;font-size:13.5px;margin-bottom:4px}
table.tbl{border-collapse:collapse;width:100%;margin:10px 0;font-size:13px}
table.tbl th{background:#eef2fb;border:1px solid #c6d0e6;padding:7px 10px;text-align:left;color:#22315e}
table.tbl td{border:1px solid #c6d0e6;padding:7px 10px;vertical-align:top}
.country-chip{display:inline-block;background:#12285e;color:#fff;font-size:12px;font-weight:700;border-radius:6px;padding:2px 10px;margin-bottom:8px}
.instrument{background:#fbf7ff;border:1px dashed #b79ae0;padding:10px 14px;margin:10px 0;font-size:13px;color:#4a3a63}
.instrument .it{font-weight:700;color:#6b3fa0;margin-bottom:4px}
.condbox{background:#f2fbf6;border:1px solid #bfe6cd;border-left:4px solid #2f9e5f;padding:10px 14px;margin:12px 0;font-size:13px;color:#20503a}
.condbox .cb-title{font-weight:800;color:#1d7a4a;margin-bottom:4px}
.condbox .cb-items{line-height:1.9}
.condbox .cb-note{font-size:11.5px;color:#5b8a70;margin-top:4px}
.q-tags{display:none}
.q-tag{display:inline-block;font-size:10px;font-weight:600;padding:1px 6px;border-radius:3px;line-height:1.5;white-space:nowrap}
.q-tag.t-climate{background:#fff3e0;color:#e65100;border:1px solid #ffcc80}
.q-tag.t-roads{background:#efebe9;color:#4e342e;border:1px solid #bcaaa4}
.q-tag.t-charging{background:#e8f5e9;color:#1b5e20;border:1px solid #a5d6a7}
.q-tag.t-power{background:#e3f2fd;color:#0d47a1;border:1px solid #90caf9}
.q-tag.t-drive{background:#f3e5f5;color:#4a148c;border:1px solid #ce93d8}
.q-tag.t-incentive{background:#fff8e1;color:#f57f17;border:1px solid #ffe082}
.q-tag.t-finance{background:#fce4ec;color:#880e4f;border:1px solid #f48fb1}
.q-tag.t-vehicle{background:#e0f7fa;color:#006064;border:1px solid #80deea}
</style></head><body>${inner}</body></html>`;
}

function download(name, blob){
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 5000);
}

/* 导出源：有编辑版用编辑版，配置已变化则提示重新生成 */
function outlineExportHTML(){
  if(!state.renderedKey) return {ok:false, msg:'请先生成提纲'};
  if(state.renderedKey !== outlineConfigKey()) return {ok:false, msg:'左侧配置在生成后有改动，请先重新生成提纲再导出。'};
  const edited = currentEditedHTML();
  const html = edited || buildOutlineHTML();
  if(!html) return {ok:false, msg:'请先生成提纲'};
  return {ok:true, html};
}

function exportDoc(){
  const r = outlineExportHTML();
  if(!r.ok) return alert(r.msg);
  const html = r.html;
  const d = DATA[state.type];
  const ccStr = collectSelectedCountries().map(c=>{
    const rp = state.repCountries[c];
    return (rp&&rp.name)?rp.name:COUNTRIES.find(x=>x.code===c).name;
  }).join('_');
  const modelTag = state.repModel?('_'+state.repModel):'';
  const full = exportShell('访谈提纲', html);
  download(`访谈提纲_${d.short}${modelTag}_${ccStr}.doc`, new Blob(['\ufeff'+full], {type:'application/msword'}));
}
function exportHtml(){
  const r = outlineExportHTML();
  if(!r.ok) return alert(r.msg);
  const html = r.html;
  const d = DATA[state.type];
  const ccStr = collectSelectedCountries().map(c=>{
    const rp = state.repCountries[c];
    return (rp&&rp.name)?rp.name:COUNTRIES.find(x=>x.code===c).name;
  }).join('_');
  const modelTag = state.repModel?('_'+state.repModel):'';
  download(`访谈提纲_${d.short}${modelTag}_${ccStr}.html`, new Blob(['\ufeff'+exportShell('访谈提纲', html)], {type:'text/html'}));
}
function copyOutline(){
  const r = outlineExportHTML();
  if(!r.ok) return alert(r.msg);
  const tmp = document.createElement('div');
  tmp.innerHTML = r.html;
  // 保留问题编号感的纯文本
  const text = tmp.innerText || tmp.textContent;
  navigator.clipboard.writeText(text).then(()=>alert('已复制到剪贴板'));
}

/* ========== 提纲编辑模式 ========== */
/* 流程：生成提纲 → 点「编辑提纲」直接在版面上改文字/调序/增删题 → 导出使用编辑后内容；
   编辑结果按配置指纹自动存 localStorage，同配置再次生成时自动恢复。 */
const EDIT_STORE_KEY = 'io_outline_edits_v1';
let editMode = false;
let editSaveTimer = null;

function loadEditStore(){
  try{ return JSON.parse(localStorage.getItem(EDIT_STORE_KEY)||'{}')||{}; }catch(e){ return {}; }
}
function saveEditStore(s){
  try{ localStorage.setItem(EDIT_STORE_KEY, JSON.stringify(s)); }catch(e){}
}

/* 当前配置指纹：类型+国家+模块+子模块+条件+替换等，任一变化视为一份新提纲 */
function outlineConfigKey(){
  const d = DATA[state.type]||{modules:[]};
  const opt = id=>{ const el=document.getElementById(id); return el?el.checked:null; };
  return JSON.stringify([
    state.type, collectSelectedCountries(),
    d.modules.filter(m=>state.mods[m.id]).map(m=>m.id),
    state.subs, state.f5Subs, state.conds,
    state.ownerType, state.segment, state.bodyType,
    state.repModel, state.repCountries, state.sellingPoints, state.configItems,
    state.bevBench, state.iceBench, state.otherBench,
    opt('optHeader'), opt('optDivider'), opt('optProbe')
  ]);
}

/* 从 DOM 序列化干净 HTML：去掉编辑控件、可编辑属性、条件标签（标签由 tagQuestions 统一重建） */
function cleanOutlineHTML(rootEl){
  const clone = rootEl.cloneNode(true);
  clone.querySelectorAll('.edit-ctl,.edit-add,.edit-bar,.q-tags').forEach(n=>n.remove());
  clone.querySelectorAll('[contenteditable]').forEach(n=>n.removeAttribute('contenteditable'));
  return clone.innerHTML;
}

/* 议题树干净 HTML：去掉可编辑属性和样式类 */
function cleanTreeHTML(rootEl){
  const clone = rootEl.cloneNode(true);
  clone.querySelectorAll('[contenteditable]').forEach(n=>n.removeAttribute('contenteditable'));
  clone.querySelectorAll('.tree-editable').forEach(n=>n.classList.remove('tree-editable'));
  return clone.innerHTML;
}

function currentEditedHTML(){
  const saved = loadEditStore()[outlineConfigKey()];
  return (saved && saved.html) ? saved.html : null;
}

function currentEditedTreeHTML(){
  const saved = loadEditStore()[outlineConfigKey()];
  return (saved && saved.treeHtml) ? saved.treeHtml : null;
}

function captureEdits(){
  if(!editMode) return;
  if(state.renderedKey !== outlineConfigKey()) return; /* 画布内容与当前配置不符时不保存 */
  const paper = document.getElementById('paper');
  const doc = paper.querySelector('.doc');
  const treeWrap = paper.querySelector('.tree-wrap');
  if(!doc && !treeWrap) return;
  const store = loadEditStore();
  const key = outlineConfigKey();
  const viewKey = state.viewMode === 'tree' ? 'treeHtml' : 'html';
  const sourceEl = state.viewMode === 'tree' ? treeWrap : doc;
  const cleanHtml = cleanTreeHTML(sourceEl);
  store[key] = store[key] || {};
  store[key][viewKey] = cleanHtml;
  store[key].savedAt = Date.now();
  store[key].label = `${(DATA[state.type]||{}).label||state.type} · ${collectSelectedCountries().join(',')}`;
  const keys = Object.keys(store);
  if(keys.length > 15){
    keys.sort((a,b)=>(store[a].savedAt||0)-(store[b].savedAt||0)).slice(0, keys.length-15).forEach(k=>delete store[k]);
  }
  saveEditStore(store);
  state.editActive = true;
  updateHeadEditTag();
  if(doc) updateWordCountTag();
  if(doc) healEditControls(doc);
}

/* 自愈：选中整题重打文字等操作可能连带清掉控件，补回缺失的 ↑↓✕ / ✕ / 加一问 */
function healEditControls(doc){
  doc.querySelectorAll('ul.q > li, .branch li').forEach(li=>{
    if(li.querySelector(':scope > .edit-ctl')) return;
    li.appendChild(mkQCtl());
  });
  doc.querySelectorAll('h5, h4').forEach(h=>{
    if(h.closest('.condbox,.instrument,.docnote,.branch')) return;
    if(h.querySelector(':scope > .edit-ctl')) return;
    const s=document.createElement('span');
    s.className='edit-ctl'; s.setAttribute('contenteditable','false');
    s.appendChild(mkEditBtn('delsec','删除本小节及其题目','✕'));
    h.appendChild(s);
  });
  placeEditAddButtons(doc);
}

function updateWordCountTag(){
  const doc = document.querySelector('#paper .doc');
  const head = document.getElementById('previewHead');
  if(!doc || !head) return;
  const words = doc.innerText.length;
  head.querySelectorAll('.tag').forEach(t=>{
    if(t.textContent.indexOf('字数')===0) t.innerHTML = `字数：约 <b>${words}</b> 字`;
  });
}

function updateHeadEditTag(){
  const head=document.getElementById('previewHead');
  if(!head) return;
  let tag = head.querySelector('.edit-flag');
  if(state.editActive){
    if(!tag){
      tag=document.createElement('span');
      tag.className='tag edit-flag';
      tag.style.cssText='background:#fffbe8;border-color:#ecd98a;color:#8a6d00;cursor:pointer';
      tag.title='点击还原为原始生成内容';
      tag.onclick = ()=>revertEdits();
      head.appendChild(tag);
    }
    tag.innerHTML = `✏️ <b>已编辑</b>（点击还原）`;
  } else if(tag){ tag.remove(); }
}

function mkEditBtn(act,title,label){
  const b=document.createElement('button');
  b.type='button'; b.dataset.act=act; b.title=title; b.textContent=label;
  b.setAttribute('contenteditable','false');
  return b;
}
function mkQCtl(){
  const s=document.createElement('span');
  s.className='edit-ctl'; s.setAttribute('contenteditable','false');
  s.appendChild(mkEditBtn('up','上移一题','↑'));
  s.appendChild(mkEditBtn('down','下移一题','↓'));
  s.appendChild(mkEditBtn('del','删除此题','✕'));
  return s;
}

/* 在每个题目列表（含其追问）之后放「＋ 加一问」按钮 */
function placeEditAddButtons(doc){
  doc.querySelectorAll('.edit-add').forEach(n=>n.remove());
  doc.querySelectorAll('ul.q').forEach(ul=>{
    let anchor = ul, s = ul.nextElementSibling;
    while(s && s.classList && s.classList.contains('probe')){ anchor = s; s = s.nextElementSibling; }
    const add=document.createElement('div');
    add.className='edit-add'; add.setAttribute('contenteditable','false');
    add.appendChild(mkEditBtn('addq','在此列表末尾添加一题','＋ 加一问'));
    anchor.after(add);
  });
}

function injectEditControls(doc){
  /* 题目/分支选项：↑ ↓ ✕ */
  doc.querySelectorAll('ul.q > li, .branch li').forEach(li=>{
    if(li.querySelector(':scope > .edit-ctl')) return;
    li.appendChild(mkQCtl());
  });
  /* 小节标题：删除整节 */
  doc.querySelectorAll('h5, h4').forEach(h=>{
    if(h.closest('.condbox,.instrument,.docnote,.branch')) return;
    if(h.querySelector(':scope > .edit-ctl')) return;
    const s=document.createElement('span');
    s.className='edit-ctl'; s.setAttribute('contenteditable','false');
    s.appendChild(mkEditBtn('delsec','删除本小节及其题目','✕'));
    h.appendChild(s);
  });
  placeEditAddButtons(doc);
  /* 可编辑文本 */
  doc.querySelectorAll('ul.q > li, .branch li, .probe, h3.mod, h4, h5, .branch .bt, .doc > p').forEach(n=>{
    if(n.closest('.condbox,.instrument,.docnote')) return;
    n.setAttribute('contenteditable','true');
  });
  /* 条件标签不可编辑 */
  doc.querySelectorAll('.q-tags').forEach(n=>n.setAttribute('contenteditable','false'));
}

/* 议题树编辑控件：模块名、子模块名可编辑 */
function injectTreeEditControls(treeWrap){
  /* 模块名可编辑 */
  treeWrap.querySelectorAll('.tree-mod-name').forEach(n=>{
    n.setAttribute('contenteditable','true');
    n.classList.add('tree-editable');
  });
  /* 子模块名可编辑 */
  treeWrap.querySelectorAll('.tree-sub-name').forEach(n=>{
    n.setAttribute('contenteditable','true');
    n.classList.add('tree-editable');
  });
  /* 模块标题（多国时的国家标题）可编辑 */
  treeWrap.querySelectorAll('.tree-title').forEach(n=>{
    n.setAttribute('contenteditable','true');
    n.classList.add('tree-editable');
  });
}

function injectEditBar(){
  const paper = document.getElementById('paper');
  if(paper.querySelector('.edit-bar')) return;
  const bar=document.createElement('div');
  bar.className='edit-bar'; bar.setAttribute('contenteditable','false');
  bar.innerHTML = `<span class="eb-title">✏️ 编辑中</span>`
    + `<span class="eb-hint">直接点击文字修改；题目/选项悬停显示 <b>↑ ↓ ✕</b>；「＋ 加一问」追加题目；小节标题悬停 ✕ 删除整节。导出 Word / HTML / 复制 / PPT 均使用编辑后内容。</span>`
    + `<button class="btn" data-act="exportjson">导出 JSON</button>`
    + `<button class="btn" data-act="revert">还原原始</button>`
    + `<button class="btn primary" data-act="done">完成编辑</button>`;
  paper.prepend(bar);
}

function setEditBtnLabel(){
  const b=document.getElementById('btnEdit');
  if(b) b.textContent = editMode ? '✅ 完成编辑' : '✏️ 编辑提纲';
}

function toggleEditMode(){
  if(editMode){ exitEditMode(); return; }
  const paper = document.getElementById('paper');
  const doc = paper.querySelector('.doc');
  const treeWrap = paper.querySelector('.tree-wrap');
  if(state.viewMode==='outline' && !doc){ alert('请先在「完整提纲」视图生成提纲，再进入编辑。'); return; }
  if(state.viewMode==='tree' && !treeWrap){ alert('请先生成议题树，再进入编辑。'); return; }
  if(state.renderedKey !== outlineConfigKey()){ alert('左侧配置已变化，请先重新生成，再进入编辑。'); return; }
  editMode = true;
  document.body.classList.add('editing');
  if(state.viewMode==='outline'){
    injectEditControls(doc);
  } else {
    injectTreeEditControls(treeWrap);
  }
  injectEditBar();
  setEditBtnLabel();
}

function exitEditMode(){
  clearTimeout(editSaveTimer);
  captureEdits();
  editMode = false;
  document.body.classList.remove('editing');
  const paper = document.getElementById('paper');
  const doc = paper.querySelector('.doc');
  const treeWrap = paper.querySelector('.tree-wrap');
  if(doc){
    doc.innerHTML = cleanOutlineHTML(doc);
    tagQuestions();
  }
  if(treeWrap){
    treeWrap.outerHTML = cleanTreeHTML(treeWrap);
  }
  const bar = paper.querySelector('.edit-bar');
  if(bar) bar.remove();
  setEditBtnLabel();
  updateHeadEditTag();
}

/* 重新生成时：同配置存在本地保存的编辑版则自动恢复 */
function maybeRestoreEdits(){
  const paper = document.getElementById('paper');
  if(state.viewMode==='tree'){
    const treeWrap = paper.querySelector('.tree-wrap');
    if(!treeWrap){ state.editActive=false; return false; }
    const saved = currentEditedTreeHTML();
    if(!saved){ state.editActive=false; return false; }
    treeWrap.outerHTML = saved;
    state.editActive = true;
    return true;
  }
  const doc = paper.querySelector('.doc');
  if(!doc){ state.editActive=false; return false; }
  const saved = currentEditedHTML();
  if(!saved){ state.editActive=false; return false; }
  doc.innerHTML = saved;
  state.editActive = true;
  return true;
}

function revertEdits(){
  if(!confirm('还原为原始生成内容？当前对这份提纲的所有编辑将丢弃。')) return;
  const store = loadEditStore();
  delete store[outlineConfigKey()];
  saveEditStore(store);
  state.editActive = false;
  editMode = false;
  document.body.classList.remove('editing');
  setEditBtnLabel();
  render();
}

/* 单题列表：连同其后追问整题移动；多题列表：在列表内移动 li */
function moveQuestion(btn, act){
  if(state.viewMode === 'tree') return; /* 议题树模式下禁止移动 */
  const li = btn.closest('li');
  if(!li) return;
  const parent = li.parentNode;
  const ul = (parent.matches && parent.matches('ul.q')) ? parent : null;
  if(ul && ul.children.length === 1 && !ul.closest('.branch')){
    const nodes = [ul];
    let s = ul.nextElementSibling;
    while(s && s.classList && s.classList.contains('probe')){ nodes.push(s); s = s.nextElementSibling; }
    if(act==='up'){
      let p = ul.previousElementSibling;
      while(p && p.classList && (p.classList.contains('probe') || p.classList.contains('edit-add'))) p = p.previousElementSibling;
      if(!(p && (p.matches('ul.q') || p.classList.contains('branch')))) return;
      nodes.forEach(n=> p.parentNode.insertBefore(n, p));
    } else {
      let n = nodes[nodes.length-1].nextElementSibling;
      while(n && n.classList && n.classList.contains('edit-add')) n = n.nextElementSibling;
      if(!(n && (n.matches('ul.q') || n.classList.contains('branch')))) return;
      let last = n, s2 = n.nextElementSibling;
      while(s2 && s2.classList && s2.classList.contains('probe')){ last = s2; s2 = s2.nextElementSibling; }
      const ref = last.nextElementSibling;
      nodes.forEach(nd=> last.parentNode.insertBefore(nd, ref));
    }
  } else {
    let ref = act==='up' ? li.previousElementSibling : li.nextElementSibling;
    while(ref && ref.tagName!=='LI') ref = act==='up' ? ref.previousElementSibling : ref.nextElementSibling;
    if(!ref) return;
    if(act==='up') parent.insertBefore(li, ref);
    else parent.insertBefore(li, ref.nextSibling);
  }
  placeEditAddButtons(doc0());
  captureEdits();
}
function doc0(){ return document.querySelector('#paper .doc'); }

function deleteSection(btn){
  const h = btn.closest('h5,h4');
  if(!h) return;
  if(!confirm('删除该小节及其下所有题目/追问？')) return;
  let node = h.nextElementSibling;
  while(node && !['H3','H4','H5','HR'].includes(node.tagName)){
    const nx = node.nextElementSibling; node.remove(); node = nx;
  }
  h.remove();
  captureEdits();
}

function addQuestion(btn){
  const add = btn.closest('.edit-add');
  const ul = add ? add.previousElementSibling : null;
  if(!ul || !ul.matches('ul.q')) return;
  const li = document.createElement('li');
  li.textContent = '（新增问题：请直接输入题目文字）';
  ul.appendChild(li);
  li.appendChild(mkQCtl());
  li.setAttribute('contenteditable','true');
  captureEdits();
  const textNode = li.firstChild;
  if(textNode && document.createRange){
    const range = document.createRange();
    range.setStart(textNode, 0);
    range.setEnd(textNode, textNode.textContent.length);
    const sel = window.getSelection();
    if(sel){ sel.removeAllRanges(); sel.addRange(range); }
  }
}

/* 提纲 → 结构化 JSON（模块/小节/题目/追问），作为题库编码的中间格式 */
function exportOutlineJSON(){
  const doc = doc0();
  if(!doc) return alert('请先生成提纲');
  const html = currentEditedHTML() || cleanOutlineHTML(doc);
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  tmp.querySelectorAll('.edit-ctl,.edit-add,.q-tags').forEach(n=>n.remove());

  const data = { format:'interview-outline-json', version:1, exportedAt:new Date().toISOString(),
    typeId: state.type, type: (DATA[state.type]||{}).label||state.type,
    repModel: state.repModel||'', conds: (typeof condSummary==='function'?condSummary():[]),
    countries: [], condBox: '' };
  if(state.sellingPoints && state.sellingPoints.length) data.sellingPoints = state.sellingPoints;

  const liText = (li)=>{
    const c = li.cloneNode(true);
    c.querySelectorAll('.q-tags,.probe,.edit-ctl,.edit-add').forEach(n=>n.remove());
    return (c.innerText||c.textContent||'').replace(/\s+/g,' ').trim();
  };
  let block=null, mod=null, sec=null, lastQ=null;
  const newBlock = (name)=>{ block={ name:name||null, title:null, subtitle:null, preamble:[], modules:[] }; data.countries.push(block); mod=null; sec=null; lastQ=null; };
  const ensureMod = ()=>{ if(!mod){ mod={ title:'（未命名模块）', en:'', sections:[], notes:[] }; block.modules.push(mod); } return mod; };
  const ensureSec = (title)=>{ const m=ensureMod(); sec={ title:title||null, questions:[], branches:[], notes:[] }; m.sections.push(sec); lastQ=null; return sec; };
  const notesSink = ()=> sec ? sec.notes : (mod ? mod.notes : block.preamble);
  const parseQList = (ul, sink)=>{
    Array.from(ul.children).forEach(ch=>{
      if(ch.tagName==='LI'){ lastQ = { text: liText(ch), probes: [] }; sink.questions.push(lastQ); }
      else if(ch.classList && ch.classList.contains('probe')){ (lastQ ? lastQ.probes : sink.notes).push(ch.innerText.trim()); }
    });
  };
  const parseBranch = (b)=>{
    const bt = b.querySelector('.bt');
    const out = { title: bt?bt.textContent.trim():'', questions:[], notes:[] };
    let lq = null;
    Array.from(b.children).forEach(el=>{
      if(el.classList.contains('bt')) return;
      if(el.matches('ul.q')){
        Array.from(el.children).forEach(ch=>{
          if(ch.tagName==='LI'){ lq = { text: liText(ch), probes: [] }; out.questions.push(lq); }
          else if(ch.classList.contains('probe')){ (lq ? lq.probes : out.notes).push(ch.innerText.trim()); }
        });
      } else if(el.classList.contains('probe')){ (lq ? lq.probes : out.notes).push(el.innerText.trim()); }
      else out.notes.push(el.innerText.trim());
    });
    return out;
  };
  newBlock();
  Array.from(tmp.children).forEach(el=>{
    const tag = el.tagName;
    if(el.classList.contains('condbox')){ data.condBox = el.innerText.trim(); return; }
    if(el.classList.contains('country-chip')){ newBlock(el.innerText.trim()); return; }
    if(el.querySelector && el.querySelector('.country-chip')){ newBlock(el.querySelector('.country-chip').innerText.trim()); return; }
    if(tag==='H1'){ block.title = el.innerText.trim(); return; }
    if(tag==='H2'){ block.subtitle = el.innerText.trim(); return; }
    if(el.classList.contains('docnote') || el.classList.contains('instrument')){ block.preamble.push(el.innerText.trim()); return; }
    if(tag==='H3'){
      const c = el.cloneNode(true);
      const enEl = c.querySelector('.en'); const enText = enEl?enEl.textContent.trim():'';
      if(enEl) enEl.remove();
      mod = { title: c.innerText.trim().replace(/\s+/g,' '), en: enText, sections:[], notes:[] };
      block.modules.push(mod); sec=null; lastQ=null; return;
    }
    if(tag==='H4' || tag==='H5'){ ensureSec(el.innerText.trim()); return; }
    if(el.classList.contains('branch')){ ensureSec(null); sec.branches.push(parseBranch(el)); lastQ=null; return; }
    if(tag==='UL' && el.classList.contains('q')){ parseQList(el, sec || ensureSec(null)); return; }
    if(el.classList && el.classList.contains('probe')){ (lastQ ? lastQ.probes : notesSink()).push(el.innerText.trim()); return; }
    notesSink().push(el.innerText.trim());
  });
  if(data.countries.length===1 && !data.countries[0].name){
    data.countries[0].name = collectSelectedCountries().map(c=>{
      const rp = state.repCountries[c];
      return (rp&&rp.name)?rp.name:(COUNTRIES.find(x=>x.code===c)||{}).name;
    }).join(' + ');
  }

  const d = DATA[state.type]||{};
  const ccStr = collectSelectedCountries().map(c=>{
    const rp = state.repCountries[c];
    return (rp&&rp.name)?rp.name:(COUNTRIES.find(x=>x.code===c)||{}).name;
  }).join('_');
  const modelTag = state.repModel?('_'+state.repModel):'';
  download(`提纲JSON_${d.short||state.type}${modelTag}_${ccStr}.json`, new Blob([JSON.stringify(data,null,2)], {type:'application/json'}));
}

/* 编辑模式事件（事件委托，只需绑定一次） */
(function(){
  const paper = document.getElementById('paper');
  if(!paper) return;
  paper.addEventListener('click', e=>{
    const btn = e.target.closest('button[data-act]');
    if(!btn || !editMode) return;
    const act = btn.dataset.act;
    if(act==='done'){ exitEditMode(); }
    else if(act==='revert'){ revertEdits(); }
    else if(act==='exportjson'){ exportOutlineJSON(); }
    else if(act==='up'||act==='down'){ moveQuestion(btn, act); }
    else if(act==='del'){ const li=btn.closest('li'); if(li){ li.remove(); captureEdits(); } }
    else if(act==='delsec'){ deleteSection(btn); }
    else if(act==='addq'){ addQuestion(btn); }
  });
  paper.addEventListener('input', e=>{
    if(!editMode) return;
    if(e.target.closest && e.target.closest('.edit-ctl,.edit-add,.edit-bar')) return;
    clearTimeout(editSaveTimer);
    editSaveTimer = setTimeout(captureEdits, 500);
  });
  window.addEventListener('beforeunload', ()=>{
    if(editMode){ clearTimeout(editSaveTimer); captureEdits(); }
  });
})();

