// =========================================================
// 提纲视图主渲染引擎 (buildOutlineHTML / render)
// =========================================================

function buildOutlineHTML(){
  const v2ModsCache = (typeof v2GenerateMods==="function" && (isV3Type() || !isMPVType())) ? v2GenerateMods() : null;
  if(!state.type || collectSelectedCountries().length===0) return null;
  const d = DATA[state.type];
  const ccs = collectSelectedCountries();
  const optHeader = document.getElementById('optHeader').checked;
  const optDivider = document.getElementById('optDivider').checked;
  const optProbe = document.getElementById('optProbe').checked;

  let html = '<div class="doc">';
  html += condBoxHTML();
  let keptMods = 0;
  let keptLi = 0, keptProbe = 0;
  ccs.forEach((cc,idx)=>{
    const cinfo = COUNTRIES.find(c=>c.code===cc);
    const cd = d.countries[cc];
    const rc = state.repCountries[cc]||{};
    const cFlag = rc.flag || cinfo.flag;
    const cName = rc.name || cinfo.name;
    if(ccs.length > 1){
      /* 多国家：每个国家一个版本标题 */
      html += `<div style="text-align:center;margin:${idx>0?'48px':'0'} 0 20px">`;
      html += `<div style="font-size:11px;color:var(--ink3);letter-spacing:2px;margin-bottom:6px">— 第 ${idx+1} 国 / 共 ${ccs.length} 国 —</div>`;
      let cityLabel = (isMPVType() && cc!=='HK' && cc!=='TH') ? cinfo.city : (cd.cityName || cinfo.city);
      if(rc.city) cityLabel = rc.city;
      else cityLabel = applyReplacements(cityLabel);
      html += `<span class="country-chip">${cFlag} ${cName} · ${cityLabel}</span>`;
      html += `</div>`;
    }
    let sec = '';
    /* 自动生成项目背景（对标车型等） */
    if(optHeader){
      sec += autoGenerateHeader(cc, cinfo, cd);
    } else if(cd.header){
      sec += cd.header;
    }
    /* 按用户排序渲染模块 */
    const orderedMods = state.modOrder.length === d.modules.length
      ? state.modOrder.map(id=>d.modules.find(m=>m.id===id)).filter(Boolean)
      : d.modules;
    orderedMods.forEach(m=>{
      if(!state.mods[m.id]) return;
      let content = (v2ModsCache && m.id!=='f5') ? (v2ModsCache[m.id]||'') : (cd.mods && cd.mods[m.id]);
      /* v3 类型完全使用角色化题库；旧 v2 的 f5 仍保留硬编码主体并追加 v2_only。 */
      if(m.id==='f5' && v2ModsCache && v2ModsCache['f5'] && !isV3Type()) content = (content||'') + v2ModsCache['f5'];
      if(!content) return;
      /* f5 子模块过滤 */
      content = filterSubContent(content, m.id);
      content = filterByConds(content).trim();
      if(m.id === 'c5' && typeof conceptTestHTML === 'function'){
        const conceptHTML = conceptTestHTML();
        if(conceptHTML) content = conceptHTML + content;
      }
      if(typeof benchmarkPromptHTML === 'function'){
        const benchHTML = benchmarkPromptHTML();
        if(benchHTML && ((state.type==='FGD' && m.id==='c1') || (state.type==='IHV' && m.id==='c3') || (state.type==='Dealer' && m.id==='b2'))){
          content = content + benchHTML;
        }
      }
      if(!content) return; /* 整个模块被研究条件过滤 */
      keptMods++;
      keptLi += (content.match(/<li[\s>]/g)||[]).length;
      keptProbe += (content.match(/class="probe"/g)||[]).length;
      sec += optDivider?`<hr class="sep">`:'';
      sec += `<h3 class="mod">${m.name}<span class="en">${m.en||''}</span></h3>`;
      sec += content;
    });
    if(cd.footer) sec += cd.footer;
    html += injectConds(applyReplacements(mpvLocalize(sec, cc)));
  });
  if(condsActive() && keptMods===0){
    html += `<p style="text-align:center;color:#999;padding:30px 0">所选模块的内容全部被当前研究条件过滤，请调整「研究条件」或勾选更多模块后重新生成。</p>`;
  }
  html += '</div>';
  lastBuildStats = {keptMods, keptLi, keptProbe};
  if(!optProbe){
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    tmp.querySelectorAll('.probe').forEach(p=>p.remove());
    html = tmp.innerHTML;
  }
  return html;
}

function render(){
  if(!state.type || !DATA[state.type]){
    const paper = document.getElementById('paper');
    const head = document.getElementById('previewHead');
    if(paper) paper.innerHTML = '<div class="empty">请先选择研究类型</div>';
    if(head) head.innerHTML = '';
    state.renderedKey = null; state.editActive = false;
    showOutlineBtn(false);
    return;
  }
  const isTree = state.viewMode === 'tree';
  const html = isTree ? buildTreeHTML() : buildOutlineHTML();
  const paper = document.getElementById('paper');
  const head = document.getElementById('previewHead');
  if(!html || html.replace(/<[^>]+>/g,'').trim()===''){
    paper.innerHTML = '<div class="empty">请至少选择一个国家和一个模块</div>';
    head.innerHTML='';
    state.renderedKey = null; state.editActive = false;
    showOutlineBtn(false);
    return;
  }
  paper.innerHTML = html;
  state.renderedKey = outlineConfigKey();
  maybeRestoreEdits();
  tagQuestions();
  const d = DATA[state.type];
  const ccList = collectSelectedCountries();
  const ccStr = ccList.map(c=>{
    const r = state.repCountries[c];
    return (r&&r.name)?r.name:COUNTRIES.find(x=>x.code===c).name;
  }).join(' + ');
  const ccCountTag = ccList.length > 1 ? `<span class="tag" style="background:#f0f4ff;border-color:#b8ccff;color:#2a5fcc">调研：<b>${ccList.length} 国</b></span>` : '';
  const selMods = d.modules.filter(m=>state.mods[m.id]).length;
  let repTag = '';
  const repBits = [];
  if(state.repModel) repBits.push(`车型→${state.repModel}`);
  repCountryPairs().forEach(([f,t])=>repBits.push(`${f}→${t}`));
  if(repBits.length>0){
    repTag = `<span class="tag" style="background:#fff8f2;border-color:#e8833a;color:#b05a12">替换：<b>${repBits.slice(0,4).join('；')}${repBits.length>4?'…':''}</b></span>`;
  }
  const condTag = !isTree && condsActive() && lastBuildStats ? `<span class="tag" style="background:#f2fbf6;border-color:#bfe6cd;color:#1d7a4a">条件筛选：<b>${condSummary().length} 项生效；保留 ${lastBuildStats.keptLi} 问 / ${lastBuildStats.keptProbe} 提示 / ${lastBuildStats.keptMods} 模块</b></span>` : '';
  const modShown = !isTree && condsActive() && lastBuildStats ? `${lastBuildStats.keptMods}<span style="color:#1d7a4a">（过滤后）</span>/${d.modules.length}` : `${selMods}/${d.modules.length}`;
  const viewLabel = isTree ? '议题树' : '完整提纲';
  head.innerHTML = `<span class="tag" style="background:#f0faf4;border-color:#bfe6cd;color:#1d7a4a">视图：<b>${viewLabel}</b></span><span class="tag">类型：<b>${d.label}</b></span>${ccCountTag}<span class="tag">国家：<b>${ccStr}</b></span><span class="tag">模块：<b>${modShown}</b></span><span class="tag">字数：约 <b>${html.replace(/<[^>]+>/g,'').length}</b> 字</span>${repTag}${condTag}`;
  updateHeadEditTag();
  showOutlineBtn(isTree);
  paper.scrollIntoView({behavior:'smooth',block:'start'});
}

function showOutlineBtn(show){
  const btn = document.getElementById('btnOutline');
  if(btn) btn.style.display = show ? '' : 'none';
}
function renderTree(){
  state.viewMode = 'tree';
  render();
}
function renderOutline(){
  state.viewMode = 'outline';
  render();
}
