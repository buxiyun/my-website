// =========================================================
// 议题树视图主渲染引擎 (buildTreeHTML)
// =========================================================

/* 默认只展示子议题概览，展开后逐题选择；勾选刷新时保留展开状态。 */
function treeCompactQuestions(root, moduleKey){
  const groups = [];
  let group = null;
  Array.from(root.children).forEach(node => {
    if(node.tagName === 'H5'){
      group = {name:node.textContent.trim(), questions:[]};
      groups.push(group);
    } else {
      const questions = node.matches('.q-item[data-qid]') ? [node] : Array.from(node.querySelectorAll('.q-item[data-qid]'));
      if(questions.length && !group){
        group = {name:'其他问题', questions:[]};
        groups.push(group);
      }
      if(group) group.questions.push(...questions);
    }
  });
  return groups.filter(group => group.questions.length).map((group, index) => {
    const key = moduleKey + '-' + index;
    const selected = group.questions.filter(q => isQuestionSelected(q.dataset.qid)).length;
    const counts = {must:0, probe:0, cut:0};
    group.questions.forEach(q => counts[triageGet()[q.dataset.qid] || 'probe']++);
    const badges = Object.entries(counts).filter(([,n]) => n).map(([level,n]) =>
      `<span class="tree-level tree-level-${level}">${level === 'cut' ? 'OPTIONAL' : level.toUpperCase()} ${n}</span>`).join('');
    const rows = group.questions.map(q => {
      const qid = q.dataset.qid;
      const level = triageGet()[qid] || 'probe';
      const textNode = q.querySelector('ul.q > li').cloneNode(true);
      textNode.querySelectorAll('.tag,.triage-tag').forEach(tag => tag.remove());
      const text = textNode.textContent.trim();
      return `<label class="tree-question-row"><input type="checkbox" ${isQuestionSelected(qid)?'checked':''} onchange="toggleQuestionSelection('${qid}')"><span class="tree-level tree-level-${level}">${level === 'cut' ? 'OPTIONAL' : level.toUpperCase()}</span><span class="tree-question-text">${escHTML(text)}</span></label>`;
    }).join('');
    return `<details class="tree-topic" ${(state.treeExpanded||{})[key]?'open':''} ontoggle="rememberTreeTopic('${key}',this.open)"><summary><span class="tree-topic-name">${escHTML(group.name.replace(/^[A-Z]?\d+\.\d+\s*/,''))}</span><span class="tree-topic-count">${selected}/${group.questions.length} 已选</span><span class="tree-topic-levels">${badges}</span></summary><div class="tree-question-list">${rows}</div></details>`;
  }).join('');
}

function rememberTreeTopic(key, open){
  if(!state.treeExpanded) state.treeExpanded = {};
  state.treeExpanded[key] = open;
}

function treeSelectionSummary(){
  const entries = Object.entries(triageGet());
  const selected = entries.filter(([qid]) => isQuestionSelected(qid));
  const missing = entries.filter(([qid, level]) => level === 'must' && !isQuestionSelected(qid)).length;
  return `<span class="tree-selection-count">已选 <b>${selected.length}</b> / ${entries.length} 题</span>${missing?`<span class="tree-selection-warning">${missing} 道 MUST 未选</span>`:''}`;
}

function buildTreeHTML(){
  const v2ModsCache = (typeof v2GenerateMods==="function" && (isV3Type() || !isMPVType())) ? v2GenerateMods({selectionMode:true}) : null;
  if(!state.type || collectSelectedCountries().length===0) return null;
  const d = DATA[state.type];
  const ccs = collectSelectedCountries();
  const visibleModules = (typeof currentVisibleModules==='function') ? currentVisibleModules() : d.modules;
  const orderedMods = state.modOrder.length === visibleModules.length
    ? state.modOrder.map(id=>visibleModules.find(m=>m.id===id)).filter(Boolean)
    : visibleModules;
  let html = '<div class="tree-wrap">';
  if(v2ModsCache){
    html += `<div class="tree-selection-toolbar">
      <b>议题选题</b> ${treeSelectionSummary()}
      <p>点击子议题展开选题 · MUST 必问 / PROBE 追问 / OPTIONAL 可选</p>
      <button onclick="selectQuestionPreset('must')">仅选 MUST</button>
      <button onclick="selectQuestionPreset('probe')">MUST + PROBE</button>
      <button onclick="selectQuestionPreset('all')">全选</button>
      <button onclick="selectQuestionPreset('none')">清空</button>
      <button onclick="renderOutline()">按所选题目生成提纲 →</button>
    </div>`;

  }
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
      const selectable = Array.from(tmp.querySelectorAll('.q-item[data-qid]'));
      const qCount = v2ModsCache ? selectable.length : tmp.querySelectorAll('li').length;
      const selectedCount = v2ModsCache ? selectable.filter(q => isQuestionSelected(q.dataset.qid)).length : qCount;
      totalQ += selectedCount;
      const h5s = tmp.querySelectorAll('h5');
      const cleanName = m.name.replace(/^(\d+[\.、\s])+/,'');
      html += `<div class="tree-module">`;
      html += `<div class="tree-mod-head">`;
      html += `<div class="tree-mod-idx">${modNum}</div>`;
      html += `<div class="tree-mod-name">${cleanName}<span class="tree-mod-en">${m.en||''}</span></div>`;
      html += `<div class="tree-mod-badge">${selectedCount} / ${qCount} 问已选</div>`;
      html += `</div>`;
      if(v2ModsCache){
        html += '<div class="tree-subs tree-questions">' + treeCompactQuestions(tmp, cc + '-' + m.id) + '</div>';
      } else if(h5s.length > 0){
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
            /* 节点本身是 .q-item 或 li，直接计数 */
            if(node.matches && node.matches('.q-item, li')){
              subQ++;
            } else if(node.querySelectorAll){
              /* 兼容旧结构：嵌套的 li */
              subQ += node.querySelectorAll(':scope > li, :scope > .branch > ul > li').length;
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
      html += `<div style="text-align:center;margin-top:18px;font-size:13px;color:var(--ink3)">共 <b style="color:var(--brand)">${totalMods}</b> 个模块，<b style="color:var(--brand)">${totalQ}</b> 个已选题库问题（开场、收尾及执行提示自动保留）</div>`;
    }
  });
  html += `<div class="tree-actions"><button class="tree-back" onclick="renderOutline()">展开完整提纲 →</button></div>`;
  html += '</div>';
  lastBuildStats = null;
  return html;
}
