// =========================================================
// 5b「产品卖点与配置」↔ 提纲对齐引擎
//   1) 填写产品测试方案 → 对应 session 的题目强制升级为 MUST
//   2) 测试对象（车头/车尾/车身/内饰…）归位到对应 session，并按方案数量生成统计与"喜欢/为什么"追问
//   3) 配置评价项、产品卖点始终在提纲中可见（不再依赖旧 v2 占位表格）
// =========================================================

/* ---------- 测试对象 → session 映射规则（按顺序匹配，最后一条为兜底） ---------- */
const CONCEPT_RULES = [
  { key:'front',    re:/车头|前脸|前部|前面|大灯|前灯|日行灯|格栅|引擎盖|机盖|前保/,
    sub:'C5.2', subV2:'M5.2', qids:['Q-M5.2-02'],
    psub:'B5.9', pqids:['B-PROD-09'],
    terms:['车辆前部外观','前部外观','车前部'] },
  { key:'rear',     re:/车尾|后部|尾部|尾灯|后灯|后保|尾门/,
    sub:'C5.2', subV2:'M5.2', qids:['Q-M5.2-03'],
    psub:'B5.9', pqids:['B-PROD-09'],
    terms:['车尾设计','车辆后部外观','后部外观'] },
  { key:'body',     re:/车身|侧面|侧围|轮廓|外形|造型|外观|整车/,
    sub:'C5.2', subV2:'M5.2', qids:['Q-M5.2-01','Q-M5.2-04'],
    psub:'B5.9', pqids:['B-PROD-09'],
    terms:['车辆整体外形','整体外形'] },
  { key:'interior', re:/内饰|座舱|仪表|中控台/,
    sub:'C5.3', subV2:'M5.3', qids:['Q-M5.3-01'],
    psub:'B5.9', pqids:['B-PROD-09'],
    terms:['这套内饰'] },
  { key:'cmf',      re:/颜色|色彩|配色|材质|CMF|面料|皮革/,
    sub:'C5.3', subV2:'M5.3', qids:['Q-M5.3-02','Q-M5.3-03'],
    psub:'B5.9', pqids:['B-PROD-09'],
    terms:[] },
  { key:'seat',     re:/座椅|坐姿|上下车|进出|乘坐|空间/,
    sub:'C5.4', subV2:'M5.4', qids:['Q-M5.4-01','Q-M5.4-02'],
    psub:'B5.2', pqids:['B-PROD-02'],
    terms:[] },
  { key:'hmi',      re:/屏幕|车机|交互|操作|按键|系统/,
    sub:'C5.5', subV2:'M5.5', qids:['Q-M5.5-01'],
    psub:'B5.4', pqids:['B-PROD-04'],
    terms:['屏幕布局'] },
  { key:'feature',  re:/配置|功能/,
    sub:'C5.6', subV2:'M5.6', qids:['Q-M5.6-01','Q-M5.6-06'],
    psub:'B5.10', pqids:['B-PROD-10'],
    terms:[] },
  /* 兜底：无法识别的测试对象归入整体概念评价 */
  { key:'concept',  re:/[\s\S]/,
    sub:'C5.1', subV2:'M5.1', qids:['Q-M5.1-01'],
    psub:'B5.8', pqids:['B-PROD-08'],
    terms:[] }
];

/* 配置评价项 / 产品卖点 的归位 session */
const CONFIG_SID   = { consumer:'C5.6', consumerV2:'M5.6', prof:'B5.10' };
const SELLING_SID  = { consumer:'C6.5', consumerV2:'M6.5', prof:'B8.4' };
/* 填写配置/卖点后需要升级为 MUST 的题目 */
const CONFIG_PROMOTE  = { consumer:['Q-M5.6-01','Q-M5.7-01'], prof:['B-PROD-10'] };
const SELLING_PROMOTE = { consumer:['Q-M6.5-02'], prof:[] };

/* ---------- 当前上下文 ---------- */
function conceptCtx(){
  const type = state.type;
  const useV3 = typeof V3_SUB_MAP !== 'undefined' && V3_SUB_MAP[type];
  const map = useV3 ? V3_SUB_MAP[type] : (typeof V2_SUB_MAP !== 'undefined' ? V2_SUB_MAP[type] : null);
  const qmap = useV3 ? (typeof V3_QByID !== 'undefined' ? V3_QByID : {}) : (typeof V2_QByID !== 'undefined' ? V2_QByID : {});
  return {
    type: type,
    useV3: !!useV3,
    map: map,
    qmap: qmap,
    prof: ['Dealer','MPVMedia','MPVExpert'].includes(type)
  };
}

/* 在 map 中按 sid 找子模块 */
function conceptFindSub(ctx, sid){
  if(!ctx.map || !sid) return null;
  for(const modId in ctx.map){
    const found = (ctx.map[modId]||[]).find(s => s.sid === sid);
    if(found) return { modId: modId, sub: found };
  }
  return null;
}

/* ---------- 已填写的测试对象 + 命中规则 ---------- */
function matchedConceptObjects(){
  if(typeof selectedConceptVariants !== 'function') return [];
  const ctx = conceptCtx();
  return selectedConceptVariants().map(x => {
    const rule = CONCEPT_RULES.find(r => r.re.test(x.name)) || CONCEPT_RULES[CONCEPT_RULES.length-1];
    const sid = ctx.prof ? rule.psub : (ctx.useV3 ? rule.sub : rule.subV2);
    return { name: x.name, count: x.count, rule: rule, sid: sid };
  });
}

/* ---------- (1) MUST 升级：填写了就必问 ---------- */
function conceptPromotedQids(){
  const out = new Set();
  const ctx = conceptCtx();
  if(!ctx.map) return out;

  /* 1a. 产品测试方案 → 对应 session 的核心题 + 措辞匹配题 */
  matchedConceptObjects().forEach(obj => {
    const hit = conceptFindSub(ctx, obj.sid);
    if(!hit) return;
    const explicit = (ctx.prof ? obj.rule.pqids : obj.rule.qids) || [];
    hit.sub.qids.forEach(qid => {
      const q = ctx.qmap[qid];
      if(!q) return;
      if(q.priority === 'core' || explicit.includes(qid)) out.add(qid);
    });
  });

  /* 1b. 配置评价项 → 配置相关核心题 */
  if((state.configItems||[]).length){
    (ctx.prof ? CONFIG_PROMOTE.prof : CONFIG_PROMOTE.consumer).forEach(qid => { if(ctx.qmap[qid]) out.add(qid); });
  }
  /* 1c. 产品卖点 → 卖点理解相关核心题 */
  const sps = (state.sellingPoints||[]).filter(sp => sp && (sp.name||'').trim());
  if(sps.length){
    (ctx.prof ? SELLING_PROMOTE.prof : SELLING_PROMOTE.consumer).forEach(qid => { if(ctx.qmap[qid]) out.add(qid); });
  }
  return out;
}

/* ---------- (2) 每个测试对象的 session 内容块 ---------- */
function conceptLetters(n){
  return Array.from({length:n}, (_,i)=>String.fromCharCode(65+i));
}

function conceptBlockHTML(obj){
  const ctx = conceptCtx();
  const name = obj.name, n = obj.count;
  const letters = conceptLetters(n);
  const schemeList = letters.map(l=>'方案 '+l).join('、');
  const esc = (typeof escHTML === 'function') ? escHTML : (s=>String(s));
  let h = '';

  if(ctx.type === 'FGD'){
    h += `<div class="docnote"><b>【产品测试 · ${esc(name)}（${n} 个方案）】</b>本场需要测试 ${esc(name)} ${n} 个方案。先独立选择、只统计人数，再进入开放讨论，避免先讨论导致互相影响。</div>`;
    h += `<ul class="q">
  <li>请看${esc(name)}的 ${n} 个方案（${schemeList}）。如果只能选一个，请每位受访者独立选择一个方案，主持人先只统计人数。</li>
  <li>这几个方案里有没有您喜欢的？喜欢哪一个、具体喜欢哪里？为什么？</li>
  <li>有没有您觉得不合适、不喜欢的？是哪里让您有这种感觉？</li>
  <li>如果需要，也请每位受访者独立选择一个最不适合的方案，另行统计人数。</li>
</ul>`;
    h += `<ul class="q">` + letters.map(l=>`<li>${esc(name)}方案 ${l}：____ 人 / n=${n}</li>`).join('') + `</ul>`;
    h += `<div class="probe">【主持人记录：本环节先只记录数字，不在统计表中写理由；喜欢/不喜欢的原因放到后续开放追问中讨论。】</div>`;
  } else if(ctx.prof){
    h += `<div class="docnote"><b>【产品测试 · ${esc(name)}（${n} 个方案）】</b>请结合展示材料，按真实客户/受众反应回答，不要只讲个人审美。</div>`;
    h += `<ul class="q">
  <li>请看${esc(name)}的 ${n} 个方案（${schemeList}）。您判断客户/受众更容易接受哪一个？依据是什么？</li>
  <li>这些方案里哪些容易被喜欢、哪些容易引发争议？分别是什么原因？</li>
  <li>如果只能保留一个方案推向市场，您会选哪个？为什么？</li>
</ul>`;
  } else {
    /* IHV 1对1：不做人数统计 */
    h += `<div class="docnote"><b>【产品测试 · ${esc(name)}（${n} 个方案）】</b>逐个看完再回答，先说选择，再说原因。</div>`;
    h += `<ul class="q">
  <li>请看${esc(name)}的 ${n} 个方案（${schemeList}）。如果只能选一个，您会选哪一个？为什么？</li>
  <li>这几个方案里有没有您喜欢的？具体喜欢哪里？</li>
  <li>有没有您觉得不合适或不喜欢的？是哪里让您有这种感觉？</li>
</ul>`;
  }
  return h;
}

/* ---------- (3) 配置评价项 / 产品卖点 内容块 ---------- */
function configEvalBlockHTML(){
  const items = (state.configItems||[]).map(s=>String(s||'').trim()).filter(Boolean);
  if(!items.length) return '';
  const esc = (typeof escHTML === 'function') ? escHTML : (s=>String(s));
  const rows = items.map(it=>`<tr><td>${esc(it)}</td><td></td><td></td></tr>`).join('\n');
  return `<div class="docnote"><b>【配置评价清单】</b>以下 ${items.length} 项配置由客户提供，请逐项确认是否理解、是否重要、是否愿意为它多付钱。</div>
<table class="tbl"><tbody>
<tr><th>配置项</th><th>是否重要</th><th>是否会有溢价</th></tr>
${rows}
</tbody></table>
<div class="probe">【主持人注意/追问：逐项记录 是否知道/用过、重要程度、是否愿意付溢价、必须与哪一项二选一。】</div>`;
}

function sellingPointBlockHTML(){
  const sps = (state.sellingPoints||[]).filter(sp => sp && (sp.name||'').trim());
  if(!sps.length) return '';
  const esc = (typeof escHTML === 'function') ? escHTML : (s=>String(s));
  const rows = sps.map(sp=>`<tr><td>${esc(sp.name)}</td><td>${esc(sp.desc||'')}</td><td></td><td></td></tr>`).join('\n');
  return `<div class="docnote"><b>【产品卖点】</b>以下 ${sps.length} 个卖点由客户提供。请先让受访者用自己的话解释，再评价可信度与吸引力，不要提示"这是卖点"。</div>
<table class="tbl"><tbody>
<tr><th>卖点</th><th>描述</th><th>是否听懂/相信</th><th>是否打动</th></tr>
${rows}
</tbody></table>
<div class="probe">【主持人注意/追问：逐个卖点记录 是否听懂、是否相信、是否打动、是否愿意为它付费、和哪个配置冲突。】</div>`;
}

/* ---------- 5b 填写后必须覆盖的 session（即使用户在子模块面板里取消勾选也强制纳入） ---------- */
function conceptRequiredSids(){
  const ctx = conceptCtx();
  const sids = new Set();
  if(!ctx.map) return sids;
  matchedConceptObjects().forEach(obj => sids.add(obj.sid));
  if((state.configItems||[]).length){
    sids.add(ctx.prof ? CONFIG_SID.prof : (ctx.useV3 ? CONFIG_SID.consumer : CONFIG_SID.consumerV2));
  }
  if((state.sellingPoints||[]).some(sp => sp && (sp.name||'').trim())){
    sids.add(ctx.prof ? SELLING_SID.prof : (ctx.useV3 ? SELLING_SID.consumer : SELLING_SID.consumerV2));
  }
  return sids;
}

/* 子模块是否被 5b 强制启用 */
function conceptSubForced(sub, requiredSids){
  return !!(sub && requiredSids && requiredSids.has(sub.sid));
}

/* 某模块内被 5b 强制启用的子模块 key（供 filterSubContent 保留内容） */
function conceptRequiredSubKeys(modId){
  const ctx = conceptCtx();
  const keys = [];
  if(!ctx.map || !ctx.map[modId]) return keys;
  const sids = conceptRequiredSids();
  ctx.map[modId].forEach((s,i) => { if(sids.has(s.sid)) keys.push(modId + '_vsub_' + i); });
  return keys;
}

/* ---------- 归位计划：{ bySid: {sid: html}, sids: [sid...] } ---------- */
function conceptPlacementPlan(){
  const ctx = conceptCtx();
  const bySid = {};
  const sids = [];
  const push = (sid, html) => {
    if(!sid || !html) return;
    if(!bySid[sid]){ bySid[sid] = ''; sids.push(sid); }
    bySid[sid] += html;
  };

  /* 产品测试方案 → 对应 session */
  matchedConceptObjects().forEach(obj => push(obj.sid, conceptBlockHTML(obj)));

  /* 配置评价项 */
  if((state.configItems||[]).length){
    const sid = ctx.prof ? CONFIG_SID.prof : (ctx.useV3 ? CONFIG_SID.consumer : CONFIG_SID.consumerV2);
    push(sid, configEvalBlockHTML());
  }
  /* 产品卖点 */
  const sellingHTML = sellingPointBlockHTML();
  if(sellingHTML){
    const sid = ctx.prof ? SELLING_SID.prof : (ctx.useV3 ? SELLING_SID.consumer : SELLING_SID.consumerV2);
    push(sid, sellingHTML);
  }
  return { bySid: bySid, sids: sids };
}

/* ---------- (2b) 措辞对齐：把题库里的通用说法换成客户填写的测试对象 ---------- */
function applyConceptTerms(html){
  if(!html) return html;
  const objs = matchedConceptObjects();
  if(!objs.length) return html;
  objs.forEach(obj => {
    (obj.rule.terms||[]).forEach(term => {
      if(!term || term === obj.name) return;
      html = html.split(term).join(obj.name);
    });
  });
  return html;
}
