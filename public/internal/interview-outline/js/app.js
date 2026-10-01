// =========================================================
// 访谈提纲生成器 — 主控制器与响应式状态管理
// =========================================================

const state = { stage:'pd', type:null, countries:[], countryCount:1, _desiredCc:1, mods:{}, modOrder:[], repModel:'', repCountries:{},
  ownerType:'both', segment:'', bodyType:'',
  conds:{ climate:'', roads:'', charging:'', power:[], incentive:'', finance:'', usage:'', ihvSource:'' },
  viewMode:'outline', bevBench:'', iceBench:'', otherBench:'', f5Subs:{}, subs:{},
  sellingPoints:[], configItems:[], conceptVariants:[] };

/* ===== 产品评价(f5) 子模块定义 ===== */
const F5_SUBS = [
  {key:'competitor', label:'竞品评价', kw:['竞品评价']},
  {key:'exterior',   label:'外观造型', kw:['外观造型']},
  {key:'interior',   label:'内饰造型', kw:['内饰造型']},
  {key:'cmf',        label:'CMF',     kw:['CMF']},
  {key:'config',     label:'配置/总结', kw:['配置测试','一句话总结']},
  {key:'range',      label:'续航与充电', kw:['续航与充电','续航']},
  {key:'cockpit',    label:'智能座舱', kw:['智能座舱']},
  {key:'adas',       label:'智能驾驶', kw:['智能驾驶']},
  {key:'price',      label:'价格接受度', kw:['价格接受度','价格']},
  {key:'safety',     label:'安全需求', kw:['安全需求','安全']},
  {key:'selling',    label:'卖点表达理解', kw:['卖点表达理解']}
];

function initSubDefaults(){
  if(!state.type) return;
  const d = DATA[state.type];
  if(!d) return;
  d.modules.forEach(m=>{
    if(m.id==='f5') return;
    const subs = getGenericSubs(m.id);
    subs.forEach(s=>{ if(state.subs[s.key]===undefined) state.subs[s.key]=s.default_selected!==false; });
  });
  F5_SUBS.forEach(s=>{ if(state.f5Subs[s.key]===undefined) state.f5Subs[s.key]=true; });
}

function filterF5Content(content){
  if(!content) return content;
  if(!state.type) return content;
  const d = DATA[state.type];
  if(!d || !d.modules.find(m=>m.id==='f5')) return content;
  /* 全部选中 → 返回完整内容 */
  const allOn = F5_SUBS.every(s=>state.f5Subs[s.key]!==false);
  if(allOn) return content;

  const hasAny = F5_SUBS.some(s=>state.f5Subs[s.key]);
  const parser = new DOMParser();
  const doc = parser.parseFromString('<div>'+content+'</div>','text/html');
  const root = doc.querySelector('div');
  const children = Array.from(root.children);

  const blocks = [];
  let cur = null;
  children.forEach(el=>{
    if(el.tagName==='H5'){
      cur = {h5:el, content:[], h5Text:el.textContent||''};
      blocks.push(cur);
    } else {
      if(!cur) { cur = {h5:null, content:[], h5Text:''}; blocks.push(cur); }
      cur.content.push(el);
    }
  });

  function matchSub(text){
    for(const s of F5_SUBS){
      if(s.kw.some(k=>text.includes(k))) return s.key;
    }
    return null;
  }

  let html = '';
  blocks.forEach(b=>{
    const subKey = matchSub(b.h5Text);
    if(subKey){
      if(!state.f5Subs[subKey]) return;
      if(b.h5) html += b.h5.outerHTML;
      b.content.forEach(el=>{ html += el.outerHTML; });
    } else {
      /* 过渡/引言段：有任何子模块选中就保留 */
      if(hasAny){
        if(b.h5) html += b.h5.outerHTML;
        b.content.forEach(el=>{ html += el.outerHTML; });
      }
    }
  });
  return html;
}



/* ===== 通用子模块（h5）提取与过滤 ===== */
const _GENERIC_SUBS_CACHE = {};
function getGenericSubs(modId){
  
  /* v2: 从 V2_SUB_MAP 获取子模块信息（非 f5） */
  if(typeof V2_SUB_MAP!=='undefined' && (typeof isV3Type==='function' ? isV3Type() : !isMPVType()) && modId!=='f5'){
    const v2m = (typeof V3_SUB_MAP!=='undefined' && V3_SUB_MAP[state.type]) ? V3_SUB_MAP[state.type] : V2_SUB_MAP[state.type];
    if(v2m && v2m[modId]){
      const key = modId+'_v2';
      if(_GENERIC_SUBS_CACHE[key]) return _GENERIC_SUBS_CACHE[key];
      const subs = v2m[modId].map((s,i)=>({key:modId+'_vsub_'+i, label:s.name, relevance:s.relevance||'optional', default_selected:s.default_selected!==false, qids:s.qids||[], post_fgd_note:s.post_fgd_note||'', ihv_after_fgd_default_selected:s.ihv_after_fgd_default_selected===true}));
      _GENERIC_SUBS_CACHE[key] = subs;
      return subs;
    }
  }
  if(_GENERIC_SUBS_CACHE[modId]) return _GENERIC_SUBS_CACHE[modId];
  if(!state.type) return [];
  const d = DATA[state.type];
  if(!d) return [];
  const m = d.modules.find(x=>x.id===modId);
  if(!m) return [];
  let content = '';
  for(const cc of Object.keys(d.countries)){
    const cd = d.countries[cc];
    if(cd && cd.mods && cd.mods[modId]){ content = cd.mods[modId]; break; }
  }
  if(!content) return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString('<div>'+content+'</div>','text/html');
  const root = doc.querySelector('div');
  const subs = [];
  let idx = 0;
  Array.from(root.children).forEach(el=>{
    if(el.tagName==='H5'){
      let text = el.textContent.trim();
      text = text.replace(/^[A-Z]?\d+\.\d+[\s：:、.]*/, '');
      text = text.replace(/（原[^）]*）/g, '').trim();
      /* 清理可能残留的多余右括号 */
      text = text.replace(/）+$/, '').trim();
      subs.push({key:modId+'_sub_'+idx, label:text});
      idx++;
    }
  });
  _GENERIC_SUBS_CACHE[modId] = subs;
  return subs;
}



function filterSubContent(content, modId){
  if(modId==='f5') return filterF5Content(content);
  if(!content) return content;
  const subs = getGenericSubs(modId);
  if(subs.length===0) return content;
  const allOn = subs.every(s=>state.subs[s.key]!==false);
  if(allOn) return content;
  /* 5b 填写的测试对象/配置/卖点所在 session 强制保留 */
  const forcedKeys = new Set((typeof conceptRequiredSubKeys==='function') ? conceptRequiredSubKeys(modId) : []);
  const hasAny = subs.some(s=>state.subs[s.key]);
  const parser = new DOMParser();
  const doc = parser.parseFromString('<div>'+content+'</div>','text/html');
  const root = doc.querySelector('div');
  const blocks = [];
  let cur = null;
  Array.from(root.children).forEach(el=>{
    if(el.tagName==='H5'){
      cur = {h5:el, content:[], h5Text:el.textContent.trim()};
      blocks.push(cur);
    } else {
      if(!cur){ cur = {h5:null, content:[], h5Text:''}; blocks.push(cur); }
      cur.content.push(el);
    }
  });
  let html = '';
  blocks.forEach(b=>{
    const cleanH5Text = (b.h5Text||'').replace(/^[A-Z]?\d+\.\d+[\s：:、.]*/, '').replace(/（原[^）]*）/g, '').trim().replace(/）+$/, '');
    const sub = subs.find(s=>s.label===cleanH5Text);
    if(sub){
      if(state.subs[sub.key]===false && !forcedKeys.has(sub.key)) return;
      if(b.h5) html += b.h5.outerHTML;
      b.content.forEach(el=>{ html += el.outerHTML; });
    } else {
      if(hasAny){
        if(b.h5) html += b.h5.outerHTML;
        b.content.forEach(el=>{ html += el.outerHTML; });
      }
    }
  });
  return html;
}

function escReg(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }
function typesOfStage(st){ return Object.keys(DATA).filter(k=>(STAGE_OF_TYPE[k]||'pd')===st); }
function visibleTypes(st){ return typesOfStage(st).filter(k=>!DATA[k].hide); }
function isMPVType(){ return /^MPV/.test(state.type||''); }
function isV3Type(){ return typeof V3_TYPES!=='undefined' && V3_TYPES.includes(state.type); }
/* 类型切换后校正国家：仅保留新类型有内容的国家，若为空自动选第一个可用（优先高频）；同时校正 countryCount 不超过可用国家数 */
function syncCountriesToType(){
  if(!state.type) return;
  const codes = Object.keys(DATA[state.type].countries||{});
  if(!codes.length) return;
  state.countries = state.countries.filter(cc=>codes.includes(cc));
  if(!state.countries.length){
    const first = COUNTRIES.find(c=>codes.includes(c.code)&&c.freq) || COUNTRIES.find(c=>codes.includes(c.code));
    if(first) state.countries = [first.code];
  }
  /* 恢复用户期望的国家数（若新类型支持），否则自动下调至可用国家数 */
  if(codes.length >= state._desiredCc){
    state.countryCount = state._desiredCc;
  } else {
    state.countryCount = Math.max(1, codes.length);
  }
}

function initStageTabs(){
  const box = document.getElementById('stageTabs');
  if(!box) return;
  box.innerHTML = '';
  STAGES.forEach(s=>{
    const n = visibleTypes(s.id).length;
    const el = document.createElement('div');
    el.className = 'stage-tab' + (state.stage===s.id?' on':'');
    el.innerHTML = `<div class="t">${s.label}</div><div class="c">${n>0?n+' 类 · '+s.note:s.note}</div>`;
    el.onclick = ()=>switchStage(s.id);
    box.appendChild(el);
  });
}
function switchStage(id){
  if(state.stage===id) return;
  state.stage = id;
  state.type = null;
  state.mods = {};
  state.modOrder = [];
  state.countries = [];
  state.f5Subs = {};
  state.subs = {};
  state.repCountries = {};
  state.repModel = '';
  Object.keys(_GENERIC_SUBS_CACHE).forEach(k=>delete _GENERIC_SUBS_CACHE[k]);
  initStageTabs(); initTypeButtons(); initCountryButtons(); initOwnerGrid(); initCountryGrid(); initVehicleSpecs(); initConds(); initModList(); initSellingPointsUI(); initRepCountries();
}

function initTypeButtons(){
  const grid = document.getElementById('typeGrid');
  grid.innerHTML = '';
  const keys = visibleTypes(state.stage);
  if(keys.length===0){
    const e = document.createElement('div');
    e.className = 'stage-empty';
    e.innerHTML = `<b>「${STAGES.find(s=>s.id===state.stage).label}」阶段提纲库待补充</b><br>当前提纲库含 FGD / IHV / Dealer / 主机厂深访 / 媒体深访 五类，均属「产品定义」阶段。<br>可切换回「产品定义」选用提纲，并通过第 4 步「车型规格」中的车型名称替换将其复用到新项目。`;
    grid.appendChild(e);
    return;
  }
  let lastGroup = null;
  keys.forEach(key=>{
    const d = DATA[key];
    if(d.group && d.group!==lastGroup){
      lastGroup = d.group;
      const g = document.createElement('div');
      g.className = 'type-group';
      g.textContent = d.group;
      grid.appendChild(g);
    }
    const el = document.createElement('div');
    el.className = 'type-btn' + (state.type===key?' on':'');
    el.innerHTML = `<div class="t">${d.label}</div><div class="e">${d.labelEn}</div>`;
    el.onclick = ()=>{
      state.type = key;
      if(state.type !== 'IHV' && state.conds) state.conds.ihvSource = '';
      state.mods = {};
      state.modOrder = [];
      state.f5Subs = {};
      state.subs = {};
      Object.keys(_GENERIC_SUBS_CACHE).forEach(k=>delete _GENERIC_SUBS_CACHE[k]);
      syncCountriesToType();
      initTypeButtons(); initCountryButtons(); initOwnerGrid(); initCountryGrid(); initVehicleSpecs(); initConds(); initModList(); initSellingPointsUI();
    };
    grid.appendChild(el);
  });
}

/* ---------- 车主分类 ---------- */
function initOwnerGrid(){
  const box = document.getElementById('ownerGrid');
  if(!box) return;
  box.innerHTML = '';
  OWNER_TYPES.forEach(o=>{
    const el = document.createElement('div');
    el.className = 'owner-btn' + (state.ownerType===o.id?' on':'');
    el.innerHTML = `<div class="t">${o.label}</div><div class="n">${o.note}</div>`;
    el.onclick = ()=>{
      state.ownerType = o.id;
      /* 自动同步动力类型条件 */
      const powerMap = { ev:['bev','phev','reve'], ice:['ice','hev'], both:[] };
      state.conds.power = powerMap[o.id] || [];
      initOwnerGrid(); initConds();
    };
    box.appendChild(el);
  });
}

/* ---------- 国家网格 ---------- */
function initCountryGrid(){
  const box = document.getElementById('countryGrid');
  if(!box) return;
  box.innerHTML = '';
  const codes = state.type ? Object.keys(DATA[state.type].countries) : null;
  /* 高频国家 */
  const freq = COUNTRIES.filter(c=>c.freq);
  const rest = COUNTRIES.filter(c=>!c.freq);
  /* 仅多国模式下达到上限才压暗按钮；单国模式所有按钮始终可点（点击即替换） */
  const atLimit = state.countryCount > 1 && state.countries.length >= state.countryCount;
  if(codes){
    /* 只显示有内容的国家 */
    const avail = COUNTRIES.filter(c=>codes.includes(c.code));
    avail.forEach(c=>{
      const sel = state.countries.includes(c.code);
      const el = document.createElement('div');
      el.className = 'cg-btn' + (sel?' on':'') + (c.freq?' freq':'') + (!sel&&atLimit?' at-limit':'');
      el.innerHTML = `<div class="f">${c.flag}</div><div class="n">${c.name}</div>`;
      el.onclick = ()=>toggleCountry(c.code);
      box.appendChild(el);
    });
  } else {
    freq.forEach(c=>{
      const sel = state.countries.includes(c.code);
      const el = document.createElement('div');
      el.className = 'cg-btn' + (sel?' on':'') + ' freq' + (!sel&&atLimit?' at-limit':'');
      el.innerHTML = `<div class="f">${c.flag}</div><div class="n">${c.name}</div>`;
      el.onclick = ()=>toggleCountry(c.code);
      box.appendChild(el);
    });
    const sep = document.createElement('div');
    sep.className = 'cg-sep';
    sep.textContent = '更多国家或地区';
    box.appendChild(sep);
    rest.forEach(c=>{
      const sel = state.countries.includes(c.code);
      const el = document.createElement('div');
      el.className = 'cg-btn' + (sel?' on':'') + (!sel&&atLimit?' at-limit':'');
      el.innerHTML = `<div class="f">${c.flag}</div><div class="n">${c.name}</div>`;
      el.onclick = ()=>toggleCountry(c.code);
      box.appendChild(el);
    });
  }
}
function toggleCountry(code){
  const idx = state.countries.indexOf(code);
  if(idx >= 0){
    /* 取消选中；仅剩一个时不可取消（至少保留一个） */
    if(state.countries.length === 1) return;
    state.countries.splice(idx, 1);
  } else if(state.countryCount === 1){
    /* 单国模式：点击即替换，无需先取消再选 */
    state.countries = [code];
  } else {
    /* 新增选中 */
    if(state.countries.length >= state.countryCount){
      alert(`当前设定调研 ${state.countryCount} 个国家，已达到上限。\n如需选择其他国家，请先取消已选国家，或调整「调研国家数」。`);
      return;
    }
    state.countries.push(code);
  }
  initCountryGrid(); initRepCountries(); updateCcRemain();
}

/* ---------- 车型规格 ---------- */
function initVehicleSpecs(){
  const segSel = document.getElementById('segSelect');
  const bodySel = document.getElementById('bodySelect');
  if(segSel){
    segSel.innerHTML = '<option value="">不限定</option>' + VEHICLE_SEGMENTS.map(s=>`<option value="${s.id}"${state.segment===s.id?' selected':''}>${s.label}（${s.note}）</option>`).join('');
    segSel.onchange = ()=>{ state.segment = segSel.value; _updateCatPreview(); };
  }
  if(bodySel){
    bodySel.innerHTML = '<option value="">不限定</option>' + BODY_TYPES.map(b=>`<option value="${b.id}"${state.bodyType===b.id?' selected':''}>${b.label}</option>`).join('');
    bodySel.onchange = ()=>{ state.bodyType = bodySel.value; _updateCatPreview(); };
  }
  _updateCatPreview();
}
function _updateCatPreview(){
  const el = document.getElementById('catPreview');
  if(!el) return;
  const lbl = (typeof categoryLabel === 'function') ? categoryLabel() : '';
  if(lbl){
    el.textContent = lbl;
    el.style.display = '';
  } else {
    el.textContent = '选择级别和/或车身类型后自动显示';
    el.style.display = '';
    el.style.color = '#999';
    return;
  }
  el.style.color = '#2a5fcc';
}

/* ---------- 调研国家数 ---------- */
function initCcGrid(){
  const box = document.getElementById('ccGrid');
  if(!box) return;
  box.innerHTML = '';
  for(let i=1;i<=10;i++){
    const el = document.createElement('div');
    el.className = 'cc-btn' + (state.countryCount===i?' on':'');
    el.textContent = i;
    el.onclick = ()=>setCountryCount(i);
    box.appendChild(el);
  }
  updateCcRemain();
}
function setCountryCount(n){
  if(state.countryCount === n) return;
  state.countryCount = n;
  state._desiredCc = n;
  /* 如果已选国家数超过新限制，截断 */
  if(state.countries.length > n){
    state.countries = state.countries.slice(0, n);
  }
  initCcGrid(); initCountryGrid();
}
function updateCcRemain(){
  const el = document.getElementById('ccRemain');
  if(el) el.textContent = Math.max(0, state.countryCount - state.countries.length);
}

function initCountryButtons(){
  initCcGrid();
  initCountryGrid();
}

function isModuleApplicable(m){
  if(!m) return false;
  if(state.type === 'FGD' && m.id === 'c8') return state.conds && ['business','commercial'].includes(state.conds.usage);
  return true;
}
function currentVisibleModules(){
  if(!state.type) return [];
  return DATA[state.type].modules.filter(isModuleApplicable);
}

function initModList(){
  const list = document.getElementById('modList');
  list.innerHTML = '';
  if(!state.type){ return; }
  const d = DATA[state.type];
  d.modules.forEach(m=>{ if(!isModuleApplicable(m)) state.mods[m.id]=false; });
  const visibleModules = currentVisibleModules();
  /* 初始化模块顺序（校验 id 全部属于当前类型，避免跨类型切换后长度恰好相同导致旧 id 失效、模块渲染为空） */
  if(!state.modOrder.length || state.modOrder.length !== d.modules.length || !state.modOrder.every(id=>visibleModules.some(m=>m.id===id))){
    state.modOrder = visibleModules.map(m=>m.id);
  }
  /* 按 state.modOrder 顺序渲染 */
  state.modOrder.forEach((mid,idx)=>{
    const m = visibleModules.find(x=>x.id===mid);
    if(!m) return;
    const on = state.mods[m.id]!==undefined ? state.mods[m.id] : true;
    state.mods[m.id] = on;
    /* 去掉编号前缀 */
    const cleanName = m.name.replace(/^(\d+[\.、\s])+/,'');
    const el = document.createElement('div');
    el.className = 'mod-item' + (on?' on':'');
    el.dataset.modId = m.id;
    el.dataset.idx = idx;
    el.innerHTML = `<span class="drag-handle" title="拖拽排序">⠿</span>
      <input type="checkbox" class="cb" ${on?'checked':''}>
      <div class="txt"><div class="nm">${cleanName}</div><div class="ds">${m.desc||''}</div></div>
      <div class="mod-move">
        <button title="上移" ${idx===0?'disabled':''} onclick="event.stopPropagation();moveMod(${idx},-1)">▲</button>
        <button title="下移" ${idx===state.modOrder.length-1?'disabled':''} onclick="event.stopPropagation();moveMod(${idx},1)">▼</button>
      </div>`;
    el.onclick = (e)=>{
      if(e.target.tagName==='INPUT' || e.target.tagName==='BUTTON' || e.target.classList.contains('drag-handle')) return;
      state.mods[m.id] = !state.mods[m.id];
      initModList();
    };
    el.querySelector('input').onchange = (e)=>{
      state.mods[m.id] = e.target.checked;
      initModList();
    };
    /* 拖拽排序 */
    el.draggable = true;
    el.ondragstart = (e)=>{ e.dataTransfer.setData('text/plain', idx); el.style.opacity='0.4'; };
    el.ondragend = ()=>{ el.style.opacity='1'; };
    el.ondragover = (e)=>{ e.preventDefault(); el.style.borderTopColor='var(--brand)'; };
    el.ondragleave = ()=>{ el.style.borderTopColor=''; };
    el.ondrop = (e)=>{
      e.preventDefault();
      el.style.borderTopColor='';
      const fromIdx = parseInt(e.dataTransfer.getData('text/plain'));
      const toIdx = idx;
      if(fromIdx!==toIdx){
        const item = state.modOrder.splice(fromIdx,1)[0];
        state.modOrder.splice(toIdx,0,item);
        initModList();
      }
    };
    list.appendChild(el);
    /* ---- 子模块选择面板（所有模块通用） ---- */
    if(on){
      initSubDefaults();
      let subList, stateMap;
      if(m.id==='f5'){
        subList = F5_SUBS;
        stateMap = state.f5Subs;
      } else {
        subList = getGenericSubs(m.id);
        stateMap = state.subs;
      }
      if(subList.length > 0){
        const panel = document.createElement('div');
        panel.className = 'sub-mod-panel';
        let subHTML = '<div class="sub-title">子模块选择（取消勾选则生成时跳过该部分）</div>';
        subHTML += '<div class="sub-grid">';
        subList.forEach(s=>{
          const postState = ihvPostFgdSubState(s, m.id);
          const checked = postState && postState.forceChecked !== undefined ? postState.forceChecked : stateMap[s.key]!==false;
          if(postState && postState.forceChecked !== undefined) stateMap[s.key] = postState.forceChecked;
          const displayLabel = injectConds(applyReplacements(s.label));
          const rel = postState
            ? `<span class="sub-badge ${postState.cls}">${postState.badge}</span>`
            : (s.relevance==='recommended' ? '<span class="sub-badge rec">推荐</span>' : '<span class="sub-badge opt">按需</span>');
          const note = postState && postState.note ? `<span class="sub-note">${postState.note}</span>` : '';
          const cls = postState ? ` ${postState.cls}` : '';
          subHTML += `<label class="sub-item${cls}"><input type="checkbox" ${checked?'checked':''} data-sub="${s.key}"> ${displayLabel}${isV3Type()?rel:''}${note}</label>`;
        });
        subHTML += '</div>';
        subHTML += `<div class="sub-mod-toolbar"><button onclick="event.stopPropagation();setAllSubs('${m.id}',true)">全选</button><button onclick="event.stopPropagation();setAllSubs('${m.id}',false)">全不选</button></div>`;
        panel.innerHTML = subHTML;
        panel.querySelectorAll('input[type=checkbox]').forEach(cb=>{
          cb.onclick = (e)=>{ e.stopPropagation(); };
          cb.onchange = (e)=>{
            if(m.id==='f5') state.f5Subs[e.target.dataset.sub] = e.target.checked;
            else state.subs[e.target.dataset.sub] = e.target.checked;
          };
        });
        list.appendChild(panel);
      }
    }
  });
  updateModCount();
  updateModSummary();
}

function moveMod(idx, dir){
  const newIdx = idx + dir;
  if(newIdx < 0 || newIdx >= state.modOrder.length) return;
  const tmp = state.modOrder[idx];
  state.modOrder[idx] = state.modOrder[newIdx];
  state.modOrder[newIdx] = tmp;
  initModList();
}

function updateModCount(){
  if(!state.type){document.getElementById('modCount').textContent='';return;}
  const d = DATA[state.type];
  const visibleModules = currentVisibleModules();
  const sel = visibleModules.filter(m=>state.mods[m.id]).length;
  document.getElementById('modCount').textContent = `${sel}/${visibleModules.length} 已选`;
}

function updateModSummary(){
  const box = document.getElementById('modSummary');
  if(!box) return;
  if(!state.type){ box.innerHTML=''; return; }
  const d = DATA[state.type];
  const selMods = currentVisibleModules().filter(m=>state.mods[m.id]);
  if(!selMods.length){ box.innerHTML='<span style="color:var(--ink3)">未选择任何模块</span>'; return; }
  /* 统计问题数（用第一个有内容的国家估算） */
  const ccs = collectSelectedCountries();
  let totalQ = 0;
  selMods.forEach(m=>{
    if(isV3Type() && typeof V3_SUB_MAP!=='undefined' && V3_SUB_MAP[state.type] && V3_SUB_MAP[state.type][m.id]){
      V3_SUB_MAP[state.type][m.id].forEach((s,i)=>{
        const key=m.id+'_vsub_'+i;
        if(state.subs[key]!==false) totalQ += s.qids.length;
      });
      return;
    }
    for(const cc of ccs){
      const cd = d.countries[cc];
      if(cd && cd.mods && cd.mods[m.id]){
        const tmp = document.createElement('div');
        tmp.innerHTML = cd.mods[m.id];
        totalQ += tmp.querySelectorAll('li').length;
        break;
      }
    }
  });
  const cleanNames = selMods.map(m=>m.name.replace(/^(\d+[\.、\s])+/,''));
  box.innerHTML = `<div style="margin-bottom:4px"><b>${selMods.length}</b> 个模块，约 <b>${totalQ}</b> 个问题</div>
    <div style="font-size:11.5px;color:var(--ink3);line-height:1.7">${cleanNames.map((n,i)=>`<span style="display:inline-block;background:#fff;border:1px solid var(--line);border-radius:5px;padding:1px 7px;margin:2px 3px 2px 0;font-size:11px">${i+1}. ${n}</span>`).join('')}</div>`;
}

function setAllMods(v){
  if(!state.type) return;
  DATA[state.type].modules.forEach(m=>{ state.mods[m.id]=isModuleApplicable(m) ? v : false; });
  initModList();
}
function restoreDefaultMods(){
  setAllMods(true);
  F5_SUBS.forEach(s=>state.f5Subs[s.key]=true);
  Object.keys(state.subs).forEach(k=>state.subs[k]=true);
}

function setAllF5Subs(v){
  F5_SUBS.forEach(s=>state.f5Subs[s.key]=v);
  initModList();
}

function setAllSubs(modId, v){
  if(modId==='f5'){
    F5_SUBS.forEach(s=>state.f5Subs[s.key]=v);
  } else {
    const subs = getGenericSubs(modId);
    subs.forEach(s=>state.subs[s.key]=v);
  }
  initModList();
}

/* ---------- 国家 / 车型替换 ---------- */
function initRepCountries(){
  const box = document.getElementById('repCountries');
  if(!box) return;
  box.innerHTML = '';
  state.countries.forEach(cc=>{
    const c = COUNTRIES.find(x=>x.code===cc);
    if(!c) return;
    if(state.type && !DATA[state.type].countries[cc]) return;
    if(!state.repCountries[cc]) state.repCountries[cc] = {name:'',city:'',flag:'',code:''};
    const r = state.repCountries[cc];
    const row = document.createElement('div');
    row.className = 'rep-row';
    row.innerHTML = `<div class="lab">${c.flag} ${c.name} <span class="orig">→ 替换为</span></div>`;
    const wrap = document.createElement('div');
    wrap.className = 'rep-fields';
    [['name','国家名称',c.name],['city','城市',c.city],['flag','旗帜emoji',c.flag],['code','代号',c.code]].forEach(([k,ph,orig])=>{
      const inp = document.createElement('input');
      inp.placeholder = `${ph}·原${orig}`;
      inp.value = r[k]||'';
      inp.oninput = ()=>{ state.repCountries[cc][k] = inp.value.trim(); };
      wrap.appendChild(inp);
    });
    row.appendChild(wrap);
    box.appendChild(row);
  });
}
function clearReplace(){
  state.repModel = '';
  state.repCountries = {};
  const mi = document.getElementById('repModel');
  if(mi) mi.value = '';
  initRepCountries();
}
function clearBenchmarks(){
  state.bevBench = '';
  state.iceBench = '';
  state.otherBench = '';
  ['bevBench','iceBench','otherBench'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.value = '';
  });
}
function clearProductData(){
  state.sellingPoints = [];
  state.configItems = [];
  state.conceptVariants = [];
  initSellingPointsUI();
  const ci = document.getElementById('configItems');
  if(ci) ci.value = '';
}
function initSellingPointsUI(){
  const container = document.getElementById('spList');
  if(!container) return;
  container.innerHTML = '';
  /* 确保至少有5行空白卖点 */
  while(state.sellingPoints.length < 5) state.sellingPoints.push({name:'',desc:''});
  renderSellingPointRows();
  while(state.conceptVariants.length < 2) state.conceptVariants.push({name:'',desc:'',sid:''});
  renderConceptVariantRows();
  const ci = document.getElementById('configItems');
  if(ci) ci.oninput = ()=>updateProductData();
}
function escInputValue(s){
  return String(s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function renderSellingPointRows(){
  const container = document.getElementById('spList');
  if(!container) return;
  container.innerHTML = '';
  state.sellingPoints.forEach((sp,i)=>{
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:4px;margin-bottom:4px;align-items:center';
    row.innerHTML = `
      <span style="font-size:11px;color:var(--ink3);min-width:16px">${i+1}.</span>
      <input type="text" id="spName${i}" value="${escInputValue(sp.name)}" placeholder="卖点${i+1}名称" style="flex:1;padding:4px 6px;border:1px solid var(--line);border-radius:4px;font-size:11.5px;min-width:0">
      <input type="text" id="spDesc${i}" value="${escInputValue(sp.desc)}" placeholder="描述" style="flex:1.5;padding:4px 6px;border:1px solid var(--line);border-radius:4px;font-size:11.5px;min-width:0">
      <button class="mini" onclick="removeSellingPoint(${i})" style="font-size:13px;padding:1px 7px;line-height:1.4;flex:0 0 auto" title="删除此行">✕</button>
    `;
    container.appendChild(row);
  });
  /* Wire up event listeners */
  state.sellingPoints.forEach((_,i)=>{
    const n = document.getElementById('spName'+i);
    const d = document.getElementById('spDesc'+i);
    if(n) n.oninput = ()=>updateProductData();
    if(d) d.oninput = ()=>updateProductData();
  });
}
/* 预设对象的默认归位 session */
function conceptPresetDefaultSid(name){
  if(typeof CONCEPT_PRESETS === 'undefined') return '';
  const p = CONCEPT_PRESETS.find(x=>x.name===name);
  return p ? p.sub : '';
}
/* 自定义对象的默认归位 session */
function conceptCustomDefaultSid(){
  if(typeof CONCEPT_CUSTOM_DEFAULT === 'undefined') return 'C5.6';
  return CONCEPT_CUSTOM_DEFAULT.consumer;
}
/* 读取第 i 行测试方案（对象名 + 数量 + 归位 session） */
function readConceptRow(i){
  const sel = document.getElementById('conceptSel'+i);
  const txt = document.getElementById('conceptName'+i);
  const num = document.getElementById('conceptDesc'+i);
  const sid = document.getElementById('conceptSid'+i);
  const sv = sel ? sel.value : '';
  const name = sv === '__custom__' ? (txt ? txt.value.trim() : '') : sv;
  return { name: name, desc: num ? num.value.trim() : '', sid: sid ? sid.value : '' };
}
function renderConceptVariantRows(){
  const container = document.getElementById('conceptList');
  if(!container) return;
  container.innerHTML = '';
  const presets = (typeof CONCEPT_PRESETS !== 'undefined') ? CONCEPT_PRESETS.map(p=>p.name) : [];
  const sessions = (typeof conceptSessionOptions === 'function') ? conceptSessionOptions() : [];
  state.conceptVariants.forEach((sp,i)=>{
    const name = (sp.name||'').trim();
    const isPreset = !!name && presets.includes(name);
    const isCustom = !!name && !isPreset;
    const curSid = sp.sid || (isPreset ? conceptPresetDefaultSid(name) : conceptCustomDefaultSid());
    const objOpts = ['<option value="">测试对象…</option>']
      .concat(presets.map(p=>`<option value="${escInputValue(p)}"${p===name?' selected':''}>${escInputValue(p)}</option>`))
      .concat(`<option value="__custom__"${isCustom?' selected':''}>自定义…</option>`)
      .join('');
    const sidOpts = sessions.map(s=>`<option value="${s.sid}"${s.sid===curSid?' selected':''}>${escInputValue(s.label)}</option>`).join('');
    const row = document.createElement('div');
    row.style.cssText = 'border:1px solid var(--line);border-radius:6px;padding:4px 5px;margin-bottom:5px;background:#fcfdfe';
    row.innerHTML = `
      <div style="display:flex;gap:4px;align-items:center">
        <span style="font-size:11px;color:var(--ink3);min-width:16px">${i+1}.</span>
        <select id="conceptSel${i}" style="flex:1.3;padding:3px 4px;border:1px solid var(--line);border-radius:4px;font-size:11.5px;min-width:0;background:#fff">${objOpts}</select>
        <input type="number" min="1" max="12" id="conceptDesc${i}" value="${escInputValue(sp.desc)}" placeholder="方案数" title="方案数量" style="flex:.5;padding:3px 4px;border:1px solid var(--line);border-radius:4px;font-size:11.5px;min-width:0">
        <button class="mini" onclick="removeConceptVariant(${i})" style="font-size:13px;padding:1px 7px;line-height:1.4;flex:0 0 auto" title="删除此行">✕</button>
      </div>
      <div style="display:flex;gap:4px;align-items:center;margin-top:4px">
        <input type="text" id="conceptName${i}" value="${isCustom?escInputValue(name):''}" placeholder="自定义对象名" style="flex:1;padding:3px 4px;border:1px solid var(--line);border-radius:4px;font-size:11.5px;min-width:0;display:${isCustom?'':'none'}">
        <span style="font-size:10.5px;color:var(--ink3);flex:0 0 auto">归入</span>
        <select id="conceptSid${i}" style="flex:1.4;padding:3px 4px;border:1px solid var(--line);border-radius:4px;font-size:11px;min-width:0;background:#fff">${sidOpts}</select>
      </div>
    `;
    container.appendChild(row);
  });
  state.conceptVariants.forEach((_,i)=>{
    const sel = document.getElementById('conceptSel'+i);
    const txt = document.getElementById('conceptName'+i);
    const num = document.getElementById('conceptDesc'+i);
    const sid = document.getElementById('conceptSid'+i);
    if(sel) sel.onchange = ()=>{
      const custom = sel.value === '__custom__';
      if(txt){
        txt.style.display = custom ? '' : 'none';
        if(custom) txt.focus();
      }
      /* 选预设时自动带出该对象的默认 session；自定义则回到默认（可再改） */
      if(sid){
        if(custom) sid.value = conceptCustomDefaultSid();
        else if(sel.value) sid.value = conceptPresetDefaultSid(sel.value) || sid.value;
      }
      updateProductData();
    };
    if(txt) txt.oninput = ()=>updateProductData();
    if(num) num.oninput = ()=>updateProductData();
    if(sid) sid.onchange = ()=>updateProductData();
  });
}
function addSellingPoint(){
  syncSellingPointsFromDOM();
  state.sellingPoints.push({name:'',desc:''});
  renderSellingPointRows();
}
function removeSellingPoint(idx){
  syncSellingPointsFromDOM();
  state.sellingPoints.splice(idx,1);
  renderSellingPointRows();
}
function addConceptVariant(){
  syncSellingPointsFromDOM();
  state.conceptVariants.push({name:'',desc:'',sid:''});
  renderConceptVariantRows();
}
function removeConceptVariant(idx){
  syncSellingPointsFromDOM();
  state.conceptVariants.splice(idx,1);
  renderConceptVariantRows();
}
function syncSellingPointsFromDOM(){
  /* Read all rows from DOM, preserving empty ones (unlike updateProductData which filters) */
  const container = document.getElementById('spList');
  if(!container) return;
  const arr = [];
  for(let i=0;i<container.children.length;i++){
    const n = document.getElementById('spName'+i);
    const d = document.getElementById('spDesc'+i);
    arr.push({name: n?n.value.trim():'', desc: d?d.value.trim():''});
  }
  state.sellingPoints = arr;
  const concepts = [];
  const conceptContainer = document.getElementById('conceptList');
  if(conceptContainer){
    for(let i=0;i<conceptContainer.children.length;i++){
      concepts.push(readConceptRow(i));
    }
  }
  state.conceptVariants = concepts;
  /* Also sync config items */
  const ci = document.getElementById('configItems');
  state.configItems = ci ? ci.value.split('\n').map(s=>s.trim()).filter(s=>s) : [];
}
function updateProductData(){
  /* 保留所有行（含空白），避免用户未填的空行丢失 */
  const newPoints = [];
  const container = document.getElementById('spList');
  if(container){
    const rows = container.children;
    for(let i=0;i<rows.length;i++){
      const n = document.getElementById('spName'+i);
      const d = document.getElementById('spDesc'+i);
      newPoints.push({name: n?n.value.trim():'', desc: (d&&d.value.trim())||''});
    }
  }
  state.sellingPoints = newPoints;
  const concepts = [];
  const conceptContainer = document.getElementById('conceptList');
  if(conceptContainer){
    const rows = conceptContainer.children;
    for(let i=0;i<rows.length;i++){
      concepts.push(readConceptRow(i));
    }
  }
  state.conceptVariants = concepts;
  const ci = document.getElementById('configItems');
  state.configItems = ci ? ci.value.split('\n').map(s=>s.trim()).filter(s=>s) : [];
}
function selectedConceptVariants(){
  syncSellingPointsFromDOM();
  return (state.conceptVariants||[])
    .map((x,i)=>{
      const name = (x.name||'').trim();
      const count = Math.max(0, Math.min(12, parseInt((x.desc||'').trim(), 10) || 0));
      return {name, count, sid: (x.sid||'').trim()};
    })
    .filter(x=>x.name && x.count > 0);
}
function conceptTestHTML(){
  /* V3：产品测试方案由 concept-align.js 按 session 归位（见 conceptPlacementPlan） */
  if(typeof isV3Type === 'function' && isV3Type()) return '';
  if(state.type !== 'FGD') return '';
  const groups = selectedConceptVariants();
  if(!groups.length) return '';
  const sections = groups.map(g=>{
    const letters = Array.from({length:g.count}, (_,i)=>String.fromCharCode(65+i));
    const statRows = letters.map(l=>`<li>${escInputValue(g.name)}方案 ${l}：____ 人 / n=${g.count}</li>`).join('');
    return `<h5>${escInputValue(g.name)}方案选择人数统计</h5>
<ul class="q">
  <li>请看${escInputValue(g.name)}的 ${g.count} 个方案（${letters.map(l=>'方案 '+l).join('、')}）。如果只能选一个，请每位受访者独立选择一个方案，主持人先只统计人数。</li>
  <li>如果需要，也请每位受访者独立选择一个最不适合的方案，另行统计人数。</li>
</ul>
<ul class="q">${statRows}</ul>`;
  }).join('');
  const labels = groups.map(g=>`${escInputValue(g.name)}${g.count}个`).join('、');
  return `<h5>产品定义方案统计 Session</h5>
<div class="docnote"><b>【FGD统计】</b>本场需要测试：${labels}。每个测试对象都先独立选择，再只统计各方案人数，统一记录为“____ 人 / n=方案数量”。统计完成后再进入开放讨论，避免先讨论导致互相影响。</div>
<div class="probe">【主持人记录：本 session 只记录数字，不在统计表中写理由；理由放到后续开放追问中讨论。】</div>
${sections}`;
}
function repCountryPairs(){
  /* 汇总所有已填写的国家替换对（名称/城市/旗帜/港泰合并称），长者优先 */
  const pairs = [];
  Object.keys(state.repCountries).forEach(cc=>{
    const c = COUNTRIES.find(x=>x.code===cc);
    const r = state.repCountries[cc];
    if(!c||!r) return;
    if(r.name && r.name!==c.name) pairs.push([c.name, r.name]);
    if(r.city && r.city!==c.city) pairs.push([c.city, r.city]);
    if(r.flag && r.flag!==c.flag) pairs.push([c.flag, r.flag]);
  });
  const h = state.repCountries.HK, t = state.repCountries.TH;
  if(h&&t&&h.name&&t.name) pairs.push(['港泰', h.name+t.name]);
  pairs.sort((a,b)=>b[0].length-a[0].length);
  return pairs;
}


function benchmarkItems(){
  const items = [];
  const add = (group, raw)=>{
    String(raw||'').split(/[，,、;；\n]/).map(x=>x.trim()).filter(Boolean).forEach(name=>items.push({group,name}));
  };
  add('BEV/电车对标', state.bevBench);
  add('ICE/油车对标', state.iceBench);
  add('其他/通用对标', state.otherBench);
  return items;
}
function benchmarkNamesText(){
  return benchmarkItems().map(x=>x.name).join('、');
}
function benchmarkPromptHTML(){
  const items = benchmarkItems();
  if(!items.length) return '';
  const names = items.map(x=>x.name);
  const rows = items.map(x=>`<li>${escInputValue(x.name)}（${escInputValue(x.group)}）：了解程度 ____；是否看过/试驾过 ____；最强优势 ____；最大短板 ____；我们要超过它的地方 ____。</li>`).join('');
  if(state.type === 'Dealer'){
    return `<h5>对标品牌/车型认知与胜负原因</h5>
<div class="docnote"><b>【对标说明】</b>以下品牌/车型是本项目要超越的参照：${escInputValue(names.join('、'))}。请经销商按真实客户认知、到店比较和成交/流失案例回答。</div>
<ul class="q">
  <li>客户是否熟悉这些对标品牌/车型？通常是从哪里知道的？到店时会主动提到哪些？</li>
  <li>客户有没有实际看过、试驾过或认真比较过这些车型？比较后为什么选择现在的车，为什么没有选另一款同类型车？</li>
  <li>这些对标车型分别靠什么赢单？又最常因为什么被客户放弃或流失？</li>
  <li>如果我们要超过这些品牌/车型，产品、配置、价格、渠道、售后和品牌信任中最需要超过哪几项？</li>
</ul>
<div class="probe">【主持人记录：把“听说过/看过/试驾过/认真比较过/最终购买过”分开；成交原因、放弃原因和销售解释分开；最后请经销商选出最难超越的1–2个对标。】</div>
<ul class="q">${rows}</ul>`;
  }
  if(state.type === 'FGD' || state.type === 'IHV'){
    return `<h5>对标品牌/车型认知、试驾与选择原因</h5>
<div class="docnote"><b>【对标说明】</b>以下品牌/车型是本项目要超越的参照：${escInputValue(names.join('、'))}。先问自发认知，再逐个提示，不把这些车型预设为“好车”。</div>
<ul class="q">
  <li>这些品牌/车型您都听说过吗？哪些只是听说，哪些认真了解过，哪些看过实车或试驾过？</li>
  <li>当时为什么选择了现在的车？为什么没有选择这些同类型的对标车型？</li>
  <li>如果未来有一款新产品想超过这些品牌/车型，至少要在哪些方面明显更好，您才会认真考虑？</li>
</ul>
<div class="probe">【主持人记录：每个对标分别记录了解程度、接触深度、试驾情况、喜欢点、放弃点和必须超越的标准；区分真实经历与听说印象。】</div>
<ul class="q">${rows}</ul>`;
  }
  return '';
}


function condSummary(){
  const c = state.conds, out = [];
  ['climate','roads','charging','incentive','finance'].forEach(k=>{
    if(!c[k]) return;
    const def = COND_DEFS.find(d=>d.key===k);
    const opt = def.options.find(o=>o.v===c[k]);
    if(opt) out.push({label:def.label, text:opt.label});
  });
  const pdef = COND_DEFS.find(d=>d.key==='power');
  const pSel = c.power||[];
  if(pSel.length && pSel.length < pdef.options.length){
    const labels = pSel.map(v=>{ const o = pdef.options.find(x=>x.v===v); return o?o.label:v; });
    out.push({label:pdef.label, text:labels.join('、')});
  }
  return out;
}
function condBoxHTML(){
  const cs = condSummary();
  /* 追加车辆规格信息 */
  const vehItems = [];
  const _catLbl = (typeof categoryLabel === 'function') ? categoryLabel() : '';
  if(_catLbl) vehItems.push({label:'品类', text: _catLbl});
  if(state.bodyType){
    const btMap = {sedan:'轿车',hatchback:'两厢车',SUV:'SUV',MPV:'MPV',pickup:'皮卡',offroad:'越野车',wagon:'旅行车',coupe:'轿跑'};
    vehItems.push({label:'车身类型', text: btMap[state.bodyType] || state.bodyType});
  }
  if(state.segment){
    const segDef = VEHICLE_SEGMENTS.find(s=>s.id===state.segment);
    if(segDef) vehItems.push({label:'车辆级别', text: segDef.label});
  }
  const allItems = [...cs, ...vehItems];
  if(!allItems.length) return '';
  const titleText = vehItems.length ? '研究条件与车辆设定（本稿已据此调整内容）' : '研究条件设定（本稿已据此剔除不适用内容）';
  return `<div class="condbox"><div class="cb-title">${titleText}</div><div class="cb-items">${allItems.map(x=>`<b>${x.label}</b>：${x.text}`).join(' ｜ ')}</div><div class="cb-note">未列出的条件为「不限定」；如需调整请在生成器中修改后重新生成。</div></div>`;
}
function isIhvSourceConditionInactive(def){
  return def && def.key === 'ihvSource' && state.type !== 'IHV';
}
function ihvPostFgdSubState(sub, modId){
  if(state.type !== 'IHV' || !state.conds || state.conds.ihvSource !== 'after_fgd') return null;
  if(modId !== 'c5' && modId !== 'c6') return null;
  const isRecheck = (sub.qids||[]).includes('Q-IHV-FGD-01') || sub.ihv_after_fgd_default_selected;
  return isRecheck
    ? {badge:'FGD后复核', cls:'post-keep', forceChecked:true, note:'参加过FGD后只做上次选择与理由复核。'}
    : {badge:'已在FGD完成', cls:'post-muted', forceChecked:false, note:'参加过FGD的IHV默认不重复完整产品/品牌/价格测试。'};
}
function applyIhvSourceDefaults(){
  if(state.type !== 'IHV' || !state.conds) return;
  if(state.conds.ihvSource === 'after_fgd'){
    const subsMap = (typeof V3_SUB_MAP!=='undefined' && V3_SUB_MAP.IHV) ? V3_SUB_MAP.IHV : null;
    ['c5','c6'].forEach(modId=>{
      (subsMap && subsMap[modId] ? subsMap[modId] : []).forEach((sub,i)=>{
        const key = modId + '_vsub_' + i;
        state.subs[key] = (sub.qids||[]).includes('Q-IHV-FGD-01') || sub.ihv_after_fgd_default_selected===true;
      });
    });
  }
  if(state.conds.ihvSource === 'no_fgd'){
    const subsMap = (typeof V3_SUB_MAP!=='undefined' && V3_SUB_MAP.IHV) ? V3_SUB_MAP.IHV : null;
    ['c5','c6'].forEach(modId=>{
      (subsMap && subsMap[modId] ? subsMap[modId] : []).forEach((sub,i)=>{
        const key = modId + '_vsub_' + i;
        state.subs[key] = sub.default_selected !== false;
      });
    });
  }
}

function initConds(){
  const box = document.getElementById('condList');
  if(!box) return;
  box.innerHTML = '';
  COND_DEFS.forEach(def=>{
    const row = document.createElement('div');
    row.className = 'cond-row';
    const lab = document.createElement('div');
    lab.className = 'lab';
    lab.textContent = def.label;
    row.appendChild(lab);
    const inactiveCond = isIhvSourceConditionInactive(def);
    if(inactiveCond) row.className += ' cond-disabled';
    if(def.type==='select'){
      const sel = document.createElement('select');
      sel.innerHTML = `<option value="">不限定</option>` + def.options.map(o=>`<option value="${o.v}"${state.conds[def.key]===o.v?' selected':''}>${o.label}</option>`).join('');
      if(inactiveCond){ sel.disabled = true; sel.title = '仅 IHV 入户访谈使用'; }
      sel.onchange = ()=>{ state.conds[def.key] = sel.value; if(def.key==='ihvSource') applyIhvSourceDefaults(); initModList(); };
      row.appendChild(sel);
    }else if(def.type==='radio'){
      const wrap = document.createElement('div');
      wrap.className = 'cond-chks';
      def.options.forEach(o=>{
        const l = document.createElement('label');
        const rb = document.createElement('input');
        rb.type = 'radio';
        rb.name = 'cond-'+def.key;
        rb.value = o.v;
        rb.checked = state.conds[def.key]===o.v;
        rb.onchange = ()=>{ state.conds[def.key] = rb.value; };
        l.appendChild(rb);
        l.appendChild(document.createTextNode(o.label));
        wrap.appendChild(l);
      });
      row.appendChild(wrap);
    }else{
      const wrap = document.createElement('div');
      wrap.className = 'cond-chks';
      def.options.forEach(o=>{
        const l = document.createElement('label');
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = (state.conds[def.key]||[]).includes(o.v);
        cb.onchange = ()=>{
          const arr = state.conds[def.key]||[];
          const i = arr.indexOf(o.v);
          if(cb.checked && i<0) arr.push(o.v);
          if(!cb.checked && i>=0) arr.splice(i,1);
          state.conds[def.key] = arr;
        };
        l.appendChild(cb);
        l.appendChild(document.createTextNode(o.label));
        wrap.appendChild(l);
      });
      row.appendChild(wrap);
    }
    box.appendChild(row);
  });
}
function resetConds(){
  state.conds = { climate:'', roads:'', charging:'', power:[], incentive:'', finance:'', usage:'', ihvSource:'' };
  initConds();
}


/* ---------- 启动 ---------- */
initStageTabs(); initTypeButtons(); initCcGrid(); initCountryButtons(); initOwnerGrid(); initCountryGrid(); initVehicleSpecs(); initModList(); initRepCountries(); initConds(); initSellingPointsUI();
/* 默认选中第一个常用国家 */
if(!state.countries.length){
  const firstFreq = COUNTRIES.find(c=>c.freq);
  if(firstFreq) state.countries = [firstFreq.code];
  initCountryGrid(); updateCcRemain();
}
const repModelInput = document.getElementById('repModel');
if(repModelInput) repModelInput.oninput = ()=>{ state.repModel = repModelInput.value.trim(); };
['bevBench','iceBench','otherBench'].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.oninput = ()=>{ 
    state[id] = el.value.trim();
    /* 输入框为空时确保状态变量为空字符串（falsy） */
    if(!state[id]) state[id] = '';
  };
});
