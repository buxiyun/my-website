// =========================================================
// 议题树视图主渲染引擎 (buildTreeHTML)
// =========================================================

function buildTreeHTML(){
  const v2ModsCache = (typeof v2GenerateMods==="function" && (isV3Type() || !isMPVType())) ? v2GenerateMods() : null;
  if(!state.type || collectSelectedCountries().length===0) return null;
  const d = DATA[state.type];
  const ccs = collectSelectedCountries();
  const orderedMods = state.modOrder.length === d.modules.length
    ? state.modOrder.map(id=>d.modules.find(m=>m.id===id)).filter(Boolean)
    : d.modules;
  let html = '<div class="tree-wrap">';
  /* 多国家时，每个国家一棵树 */
  ccs.forEach((cc, ccIdx)=>{
    const cinfo = COUNTRIES.find(c=>c.code===cc);
    const cd = d.countries[cc];
    const rc = state.repCountries[cc]||{};
    const cFlag = rc.flag || cinfo.flag;
    const cName = rc.name || cinfo.name;
    let treeTitle = d.label;
    if(cd && cd.header){
      const tmp = document.createElement('div');
      tmp.innerHTML = cd.header;
      const h1 = tmp.querySelector('h1.doctitle');
      if(h1) treeTitle = injectConds(applyReplacements(h1.textContent.trim()));
    }
    if(ccs.length > 1){
      html += `<div style="text-align:center;margin:${ccIdx>0?'36px':'0'} 0 16px"><span class="country-chip">${cFlag} ${cName}</span></div>`;
    }
    html += `<div class="tree-title">${treeTitle}</div>`;
    html += `<div class="tree-subtitle">议题树 · Issue Tree${ccs.length>1?' · '+cName:''}</div>`;
    let totalMods = 0, totalQ = 0, modNum = 0;
    orderedMods.forEach((m, treeIdx)=>{
      if(!state.mods[m.id]) return;
      let content = (v2ModsCache && m.id!=='f5') ? (v2ModsCache[m.id]||'') : (cd && cd.mods && cd.mods[m.id] ? cd.mods[m.id] : '');
      /* v3 类型完全使用角色化题库；旧 v2 的 f5 仍保留硬编码主体并追加 v2_only。 */
      if(m.id==='f5' && v2ModsCache && v2ModsCache['f5'] && !isV3Type()) content = (content||'') + v2ModsCache['f5'];
      if(!content) return;
      content = filterSubContent(content, m.id);
      content = filterByConds(content);
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
      if(!content.trim()) return;
      content = injectConds(applyReplacements(mpvLocalize(content, cc)));
      totalMods++;
      modNum++;
      const tmp = document.createElement('div');
      tmp.innerHTML = content;
      const qCount = tmp.querySelectorAll('li').length;
      totalQ += qCount;
      const h5s = tmp.querySelectorAll('h5');
      const cleanName = m.name.replace(/^(\d+[\.、\s])+/,'');
      html += `<div class="tree-module">`;
      html += `<div class="tree-mod-head">`;
      html += `<div class="tree-mod-idx">${modNum}</div>`;
      html += `<div class="tree-mod-name">${cleanName}<span class="tree-mod-en">${m.en||''}</span></div>`;
      html += `<div class="tree-mod-badge">${qCount} 问</div>`;
      html += `</div>`;
      if(h5s.length > 0){
        html += `<div class="tree-subs">`;
        h5s.forEach(h5=>{
          let subName = h5.textContent.trim();
          subName = subName.replace(/^\d+\.\d+[\s：:、.]*/, '');
          subName = subName.replace(/（原[^）]*）/g, '').trim();
          /* 清理可能残留的多余右括号 */
          subName = subName.replace(/）+$/, '').trim();
          let subQ = 0;
          let node = h5.nextElementSibling;
          while(node && node.tagName !== 'H5'){
            if(node.querySelectorAll){
              subQ += node.querySelectorAll(':scope > li, :scope > .branch > ul > li, :scope > .branch > ol > li').length;
            }
            node = node.nextElementSibling;
          }
          html += `<div class="tree-sub"><span class="tree-sub-name">${subName}</span><span class="tree-sub-cnt">${subQ} 问</span></div>`;
        });
        html += `</div>`;
      } else {
        html += `<div class="tree-nosub">${qCount} 个问题（无子分类）</div>`;
      }
      html += `</div>`;
    });
    if(totalMods === 0){
      html += `<p style="text-align:center;color:#999;padding:30px 0">所选模块的内容全部被当前研究条件过滤，请调整「研究条件」或勾选更多模块。</p>`;
    } else {
      html += `<div style="text-align:center;margin-top:18px;font-size:13px;color:var(--ink3)">共 <b style="color:var(--brand)">${totalMods}</b> 个模块，<b style="color:var(--brand)">${totalQ}</b> 个问题</div>`;
    }
  });
  html += `<div class="tree-actions"><button class="tree-back" onclick="renderOutline()">展开完整提纲 →</button></div>`;
  html += '</div>';
  lastBuildStats = null;
  return html;
}
