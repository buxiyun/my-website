// =========================================================
// PPT 画廊交互、组装条与幻灯片内容编辑器
// =========================================================

/* --- 视图切换 --- */
function switchToPPTView(){
  pptViewActive = true;
  document.getElementById('paper').style.display = 'none';
  document.getElementById('previewHead').style.display = 'none';
  document.getElementById('pptDesignView').classList.add('active');
  renderPPTGallery();
  renderAssemblyStrip();
}
function switchToOutlineView(){
  pptViewActive = false;
  document.getElementById('paper').style.display = '';
  document.getElementById('previewHead').style.display = '';
  document.getElementById('pptDesignView').classList.remove('active');
}

/* --- 版式画廊 --- */
function renderPPTGallery(){
  const g = document.getElementById('pptGallery');
  g.innerHTML = PPT_CATS.map(cat=>{
    const layouts = PPT_LAYOUTS.filter(l=>l.cat===cat.id);
    return `<div class="ppt-gallery-cat">
      <div class="ppt-cat-head"><span class="cat-icon">${cat.icon}</span>${cat.name}</div>
      <div class="ppt-cat-grid">${layouts.map(l=>`
        <div class="ppt-layout-card" onclick="addPPTSlide('${l.id}')" title="点击添加此版式">
          <div class="ppt-layout-thumb">${l.thumb}</div>
          <div class="layout-name">${l.name}</div>
          <div class="layout-desc">${l.desc}</div>
        </div>`).join('')}
      </div>
    </div>`;
  }).join('');
}

/* --- 幻灯片管理 --- */
function addPPTSlide(layoutId){
  const layout = PPT_LAYOUTS.find(l=>l.id===layoutId);
  if(!layout) return;
  pptSlides.push({layoutId, title:layout.name, content:{}});
  renderAssemblyStrip();
  updateSlideCount();
}
function removePPTSlide(idx){
  pptSlides.splice(idx,1);
  if(pptEditIdx===idx){pptEditIdx=-1; renderContentEditor();}
  else if(pptEditIdx>idx) pptEditIdx--;
  renderAssemblyStrip();
  updateSlideCount();
}
function selectPPTSlide(idx){
  pptEditIdx = idx;
  renderAssemblyStrip();
  renderContentEditor();
}
function clearPPTSlides(){
  if(pptSlides.length && !confirm('确定清空所有幻灯片？')) return;
  pptSlides = [];
  pptEditIdx = -1;
  renderAssemblyStrip();
  renderContentEditor();
  updateSlideCount();
}
function movePPTSlide(idx, dir){
  const newIdx = idx + dir;
  if(newIdx < 0 || newIdx >= pptSlides.length) return;
  [pptSlides[idx], pptSlides[newIdx]] = [pptSlides[newIdx], pptSlides[idx]];
  if(pptEditIdx===idx) pptEditIdx=newIdx;
  else if(pptEditIdx===newIdx) pptEditIdx=idx;
  renderAssemblyStrip();
}
function updateSlideCount(){
  const el = document.getElementById('pptSlideCount');
  if(el) el.textContent = '共 ' + pptSlides.length + ' 页';
}

/* --- 组装条 --- */
function renderAssemblyStrip(){
  const strip = document.getElementById('pptAssemblyStrip');
  if(!strip) return;
  strip.innerHTML = pptSlides.map((s,i)=>{
    const layout = PPT_LAYOUTS.find(l=>l.id===s.layoutId);
    const active = i===pptEditIdx ? ' active' : '';
    return `<div class="ppt-asm-slide${active}" onclick="selectPPTSlide(${i})">
      <div class="asm-idx">${i+1}</div>
      <div class="asm-del" onclick="event.stopPropagation();removePPTSlide(${i})">✕</div>
      <div class="asm-thumb">${layout?.thumb||''}</div>
      <div class="asm-info">${layout?.name||s.layoutId}</div>
    </div>`;
  }).join('');
  updateSlideCount();
}

/* --- 内容编辑器 --- */
function renderContentEditor(){
  const ed = document.getElementById('pptContentEditor');
  if(!ed) return;
  if(pptEditIdx<0 || pptEditIdx>=pptSlides.length){
    ed.classList.remove('active');
    ed.innerHTML = '<div class="ppt-ce-empty"><span class="ce-icon">👆</span>点击上方幻灯片编辑内容</div>';
    return;
  }
  ed.classList.add('active');
  const slide = pptSlides[pptEditIdx];
  const layout = PPT_LAYOUTS.find(l=>l.id===slide.layoutId);
  if(!layout){ed.innerHTML='<div class="ppt-ce-empty">未知版式</div>';return;}
  const c = slide.content || {};
  let fieldsHTML = '';
  (layout.fields||[]).forEach(f=>{
    if(f.t==='text'){
      fieldsHTML += `<div class="ppt-ce-field"><label>${f.l}</label><input type="text" value="${escHTML(c[f.k]||'')}" placeholder="${f.ph||''}" onchange="updateContent(${pptEditIdx},'${f.k}',this.value)"></div>`;
    } else if(f.t==='textarea'){
      fieldsHTML += `<div class="ppt-ce-field"><label>${f.l}</label><textarea placeholder="${f.ph||''}" onchange="updateContent(${pptEditIdx},'${f.k}',this.value)">${escHTML(c[f.k]||'')}</textarea></div>`;
    } else if(f.t==='bullets'){
      const items = c[f.k] || Array(f.count).fill('');
      while(items.length<f.count) items.push('');
      fieldsHTML += `<div class="ppt-ce-field"><label>${f.l}</label><div class="ppt-ce-bullets">${items.map((v,j)=>`<div class="ppt-ce-bullet-row"><span class="bnum">${j+1}</span><input type="text" value="${escHTML(v)}" onchange="updateBullet(${pptEditIdx},'${f.k}',${j},this.value)"></div>`).join('')}</div></div>`;
    } else if(f.t==='kv'){
      fieldsHTML += `<div class="ppt-ce-field"><label>${f.l}</label><div class="ppt-ce-kv">${f.keys.map(kk=>{const kv=c[f.k]||{};return `<div class="ppt-ce-kv-row"><span class="kv-lab">${kk}</span><input type="text" value="${escHTML(kv[kk]||'')}" onchange="updateKV(${pptEditIdx},'${f.k}','${kk}',this.value)"></div>`;}).join('')}</div></div>`;
    } else if(f.t==='cards'){
      fieldsHTML += `<div class="ppt-ce-field"><label>${f.l}</label><div class="ppt-ce-cards">${f.items.map(ci=>{const cv=c[f.k]||{};return `<div class="ppt-ce-card-row"><span class="clab">${ci.l}</span><div class="cinputs"><input type="text" value="${escHTML(cv[ci.k+'_v']||'')}" placeholder="数值" onchange="updateCard(${pptEditIdx},'${f.k}','${ci.k}_v',this.value)"><input type="text" value="${escHTML(cv[ci.k+'_n']||'')}" placeholder="备注" onchange="updateCard(${pptEditIdx},'${f.k}','${ci.k}_n',this.value)"></div></div>`;}).join('')}</div></div>`;
    } else if(f.t==='journey'){
      const stages = c[f.k] || {};
      fieldsHTML += `<div class="ppt-ce-field"><label>${f.l}</label><div class="ppt-ce-journey">${f.items.map(st=>{const sv=stages[st]||{};return `<div class="ppt-ce-stage"><div class="ppt-ce-stage-head">${st}</div><div class="ppt-ce-stage-fields"><label>关键触点<input type="text" value="${escHTML(sv.touches||'')}" onchange="updateJourney(${pptEditIdx},'${f.k}','${st}','touches',this.value)"></label><label>障碍/痛点<input type="text" value="${escHTML(sv.blockers||'')}" onchange="updateJourney(${pptEditIdx},'${f.k}','${st}','blockers',this.value)"></label><label>驱动因素<input type="text" value="${escHTML(sv.drivers||'')}" onchange="updateJourney(${pptEditIdx},'${f.k}','${st}','drivers',this.value)"></label></div></div>`;}).join('')}</div></div>`;
    }
  });
  /* --- 定量版式：国家模式 + 数据网格 --- */
  let countryHTML = '';
  if(layout.hasCountries){
    if(!c.countryMode) c.countryMode = 1;
    if(!c.countryNames) c.countryNames = ['总计'];
    if(!c.dataRows) c.dataRows = [];
    const numC = c.countryMode;
    while(c.countryNames.length < numC) c.countryNames.push('国家'+(c.countryNames.length+1));
    const defRows = layout.defaultRows || 5;
    while(c.dataRows.length < defRows) c.dataRows.push({label:'',values:Array(numC).fill('')});
    c.dataRows.forEach(r=>{ while((r.values||[]).length<numC) r.values.push(''); });
    const countryColors = ['#12285e','#1f5eff','#12805c'];
    countryHTML = `
      <div class="ppt-ce-country-sel">
        <label>国家模式</label>
        <select onchange="updateCountryMode(${pptEditIdx},parseInt(this.value))">
          <option value="1"${c.countryMode===1?' selected':''}>1 个国家</option>
          <option value="2"${c.countryMode===2?' selected':''}>2 个国家对比</option>
          <option value="3"${c.countryMode===3?' selected':''}>3 个国家对比</option>
        </select>
      </div>
      <div class="ppt-ce-country-names">${c.countryNames.slice(0,numC).map((cn,ci)=>`<div class="cn-input"><label style="color:${countryColors[ci]}">${ci===0?'🏳️':ci===1?'🏳️':'🏳️'} 国家${ci+1}名称</label><input type="text" value="${escHTML(cn)}" placeholder="国家名" onchange="updateCountryName(${pptEditIdx},${ci},this.value)"></div>`).join('')}</div>
      <div class="ppt-ce-data-grid">
        <div class="ppt-ce-dg-head"><span style="flex:0 0 20px">#</span><span class="ppt-ce-dg-lab" style="flex:0 0 120px">指标名称</span><span style="flex:1;display:flex;gap:5px">${c.countryNames.slice(0,numC).map((cn,ci)=>`<span style="flex:1;text-align:center;color:${countryColors[ci]}">${escHTML(cn)}</span>`).join('')}</span></div>
        ${c.dataRows.map((r,ri)=>`<div class="ppt-ce-dg-row"><span class="ppt-ce-dg-idx">${ri+1}</span><div class="ppt-ce-dg-lab"><input type="text" value="${escHTML(r.label||'')}" placeholder="指标${ri+1}" onchange="updateDataLabel(${pptEditIdx},${ri},this.value)"></div><div class="ppt-ce-dg-vals">${Array.from({length:numC},(_,ci)=>`<input type="text" value="${escHTML((r.values||[])[ci]||'')}" placeholder="—" onchange="updateDataVal(${pptEditIdx},${ri},${ci},this.value)">`).join('')}</div></div>`).join('')}
        <div class="ppt-ce-dg-add"><button onclick="addDataRow(${pptEditIdx})">+ 添加行</button></div>
      </div>`;
  }
  ed.innerHTML = `
    <div class="ppt-ce-head">
      <div style="flex:1">
        <div class="ce-layout-name">${layout.name} · 第 ${pptEditIdx+1} 页</div>
        <input class="ce-title-input" type="text" value="${escHTML(slide.title)}" placeholder="幻灯片标题" onchange="pptSlides[${pptEditIdx}].title=this.value">
        <textarea class="ce-hypo-input" placeholder="假设 / Hypothesis（此页核心观点，将显示在标题下方）" onchange="pptSlides[${pptEditIdx}].content.hypo=this.value">${escHTML(c.hypo||'')}</textarea>
      </div>
    </div>
    <div class="ppt-ce-fields">${countryHTML}${fieldsHTML || (layout.hasCountries ? '' : '<div style="color:var(--ink3);font-size:13px;padding:12px 0">此版式无需填写额外内容</div>')}</div>`;
}
function escHTML(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function updateContent(idx,k,v){if(pptSlides[idx]) pptSlides[idx].content[k]=v;}
function updateBullet(idx,k,j,v){if(!pptSlides[idx].content[k]) pptSlides[idx].content[k]=[];pptSlides[idx].content[k][j]=v;}
function updateKV(idx,k,kk,v){if(!pptSlides[idx].content[k]) pptSlides[idx].content[k]={};pptSlides[idx].content[k][kk]=v;}
function updateCard(idx,k,ck,v){if(!pptSlides[idx].content[k]) pptSlides[idx].content[k]={};pptSlides[idx].content[k][ck]=v;}
function updateJourney(idx,k,stage,field,v){if(!pptSlides[idx].content[k]) pptSlides[idx].content[k]={};if(!pptSlides[idx].content[k][stage]) pptSlides[idx].content[k][stage]={};pptSlides[idx].content[k][stage][field]=v;}
/* --- 定量版式辅助函数 --- */
function updateCountryMode(idx,mode){const c=pptSlides[idx].content;c.countryMode=mode;if(!c.countryNames)c.countryNames=[];while(c.countryNames.length<mode)c.countryNames.push('国家'+(c.countryNames.length+1));(c.dataRows||[]).forEach(r=>{while(!r.values)r.values=[];while(r.values.length<mode)r.values.push('');});renderContentEditor();}
function updateCountryName(idx,ci,v){pptSlides[idx].content.countryNames[ci]=v;renderContentEditor();}
function updateDataLabel(idx,ri,v){if(!pptSlides[idx].content.dataRows[ri])pptSlides[idx].content.dataRows[ri]={label:'',values:[]};pptSlides[idx].content.dataRows[ri].label=v;}
function updateDataVal(idx,ri,ci,v){if(!pptSlides[idx].content.dataRows[ri])pptSlides[idx].content.dataRows[ri]={label:'',values:[]};if(!pptSlides[idx].content.dataRows[ri].values)pptSlides[idx].content.dataRows[ri].values=[];pptSlides[idx].content.dataRows[ri].values[ci]=v;}
function addDataRow(idx){const nm=pptSlides[idx].content.countryMode||1;pptSlides[idx].content.dataRows.push({label:'',values:Array(nm).fill('')});renderContentEditor();}

/* --- 从提纲自动映射 --- */
function autoMapFromOutline(){
  const html = document.getElementById('paper')?.innerHTML;
  if(!html || html.includes('empty')) return alert('请先生成提纲');
  pptSlides = [];
  // 封面
  pptSlides.push({layoutId:'cover-dark',title:'研究报告',content:{subtitle:'消费者研究报告',date:new Date().toISOString().slice(0,7)}});
  // 目录
  const modHeaders = [];
  document.querySelectorAll('#paper .mod-header, #paper h3').forEach(el=>{
    const t = el.textContent.trim();
    if(t && modHeaders.length<8) modHeaders.push(t);
  });
  if(modHeaders.length){
    const tocContent = {};
    tocContent.items = modHeaders;
    pptSlides.push({layoutId:'toc-grid',title:'目录',content:tocContent});
  }
  // 每个模块映射到内容页
  const outlineText = document.getElementById('paper')?.innerText || '';
  if(outlineText.includes('人群') || outlineText.includes('画像') || outlineText.includes('Profile'))
    pptSlides.push({layoutId:'persona',title:'消费者画像',content:{}});
  if(outlineText.includes('场景') || outlineText.includes('用车') || outlineText.includes('使用场景'))
    pptSlides.push({layoutId:'scenario-usage',title:'使用场景',content:{}});
  if(outlineText.includes('满意') || outlineText.includes('痛点') || outlineText.includes('使用'))
    pptSlides.push({layoutId:'product-proscons',title:'产品评估',content:{}});
  if(outlineText.includes('需求') || outlineText.includes('品类') || outlineText.includes('需要'))
    pptSlides.push({layoutId:'category-needs',title:'品类需求',content:{}});
  if(outlineText.includes('配置') || outlineText.includes('优先级'))
    pptSlides.push({layoutId:'config-table',title:'产品配置',content:{}});
  if(outlineText.includes('购买') || outlineText.includes('决策') || outlineText.includes('考虑'))
    pptSlides.push({layoutId:'journey-timeline',title:'购买旅程',content:{}});
  if(outlineText.includes('品牌') || outlineText.includes('Brand'))
    pptSlides.push({layoutId:'compare-lr',title:'品牌对比',content:{}});
  if(outlineText.includes('竞品') || outlineText.includes('竞争'))
    pptSlides.push({layoutId:'competitor-matrix',title:'竞品分析',content:{}});
  if(outlineText.includes('策略') || outlineText.includes('营销') || outlineText.includes('4P'))
    pptSlides.push({layoutId:'strategy-4p',title:'营销策略',content:{}});
  // 定量数据页
  if(outlineText.includes('%') || outlineText.includes('占比') || outlineText.includes('排名') || outlineText.includes('数据'))
    pptSlides.push({layoutId:'data-bar',title:'数据排名',content:{countryMode:1,countryNames:['总计'],dataRows:Array(6).fill(null).map(()=>({label:'',values:['']}))}});
  if(outlineText.includes('对比') && (outlineText.includes('数据') || outlineText.includes('%')))
    pptSlides.push({layoutId:'data-table',title:'数据对比表',content:{countryMode:3,countryNames:['巴西','印度','印尼'],dataRows:Array(5).fill(null).map(()=>({label:'',values:['','','']}))}});
  if(outlineText.includes('满意度') || outlineText.includes('构成') || outlineText.includes('分布'))
    pptSlides.push({layoutId:'data-stacked',title:'满意度构成',content:{countryMode:1,countryNames:['总计'],dataRows:Array(5).fill(null).map(()=>({label:'',values:['']})),segLabels:'非常满意,满意,不满意'}});
  // 摘要 + 结论
  pptSlides.push({layoutId:'summary-bullets',title:'核心发现',content:{}});
  pptSlides.push({layoutId:'conclusion',title:'结论与建议',content:{}});
  pptSlides.push({layoutId:'thanks',title:'致谢',content:{}});
  pptEditIdx = -1;
  renderAssemblyStrip();
  renderContentEditor();
  updateSlideCount();
}

