// =========================================================
// v2 题库动态生成引擎
// =========================================================

/* v2 variant key — 根据方法/受众选择变体 */
function v2VariantKey(){
  const t = state.type;
  if((t==='FGD' || t==='IHV') && state.conds && state.conds.usage==='intend') return 'prospect';
  if(typeof V3_ROLE_BY_TYPE!=='undefined' && V3_ROLE_BY_TYPE[t]) return V3_ROLE_BY_TYPE[t];
  if(t==='Dealer') return 'Dealer';
  if(t==='FGD' || t==='IHV') return 'owner';
  return 'owner';
}

/* v2 gate 条件检查 */
function v2GatePasses(gate){
  if(gate==='all') return true;
  const p = state.conds.power || [];
  switch(gate){
    case 'charge':
      if(!p.length) return true;
      return p.some(x=>['bev','phev','reve'].includes(x));
    case 'refuel':
      if(!p.length) return true;
      return p.some(x=>['ice','hev','phev','reve'].includes(x));
    case 'hot':
      return !state.conds.climate || ['hot','temperate'].includes(state.conds.climate);
    case 'cold':
      return !state.conds.climate || ['cold','temperate'].includes(state.conds.climate);
    case 'rain':
      return !state.conds.climate || ['hot','temperate'].includes(state.conds.climate);
    case 'business':  return state.conds && ['business','commercial'].includes(state.conds.usage);
    case 'ihv_after_fgd': return state.type === 'IHV' && state.conds && state.conds.ihvSource === 'after_fgd';
    case 'prospect_intent': return state.type === 'FGD' || state.type === 'IHV' ? (state.conds && state.conds.usage === 'intend') : false;
    case 'owner':     return true;
    case 'home_visit': return state.type === 'IHV';
    default: return true;
  }
}

/* v2 材料依赖标签 */
const V2_MAT_LABEL = {
  range_price:'价格区间', concept:'产品概念', exterior:'外观设计',
  cmf:'CMF方案', space:'空间布局', interaction:'交互体验',
  features:'功能配置', safety:'安全配置', brand:'品牌信息',
  price:'价格方案', message:'传播信息', thermal_comfort:'热舒适'
};

function v2ActivityForMethod(activity, method){
  if(!activity) return '';
  const typeMatch = activity.match(/^(IHV|FGD|Dealer)[：:](.*)$/);
  if(typeMatch) return typeMatch[1] === method ? typeMatch[2].trim() : '';
  const parts = activity.split(/[；;]\s*/).map(s=>s.trim()).filter(Boolean);
  const kept = parts.filter(part => {
    if(/^IHV/.test(part)) return method === 'IHV';
    if(/^FGD/.test(part)) return method === 'FGD';
    if(/^Dealer/.test(part)) return method === 'Dealer';
    return true;
  });
  return kept.join('；');
}

/* 生成单题 HTML */
function v2QuestionHTML(q, vk, qid, editMode){
  const useBusinessVariant = (state.type==='FGD' || state.type==='IHV') && state.conds && ['business','commercial'].includes(state.conds.usage) && q.variants && q.variants.business;
  const variant = useBusinessVariant ? q.variants.business : q.variants[vk];
  if(!variant) return '';

  /* 编辑模式：显示选择框和 triage 标签 */
  const isSelected = isQuestionSelected(qid);
  const triage = (typeof triageGet === 'function') ? triageGet() : {};
  const triageLevel = triage[qid] || 'probe';
  const triageColors = { must: '#e85d5d', probe: '#5d8de8', cut: '#ccc' };
  const triageLabels = { must: 'MUST', probe: 'PROBE', cut: 'CUT' };

  let h = '<div class="q-item' + (editMode && !isSelected ? ' q-excluded' : '') + '"' + (editMode ? ' data-qid="'+qid+'"' : '') + '>';

  if(editMode){
    h += '<div style="display:flex;align-items:flex-start;gap:8px">';
    h += '<input type="checkbox" ' + (isSelected ? 'checked' : '') + ' onchange="toggleQuestionSelection(\''+qid+'\')" style="margin-top:4px;cursor:pointer">';
    h += '<div style="flex:1">';
  }

  h += '<ul class="q"><li>' + escHTML(variant.text);
  if(q.material){
    h += ' <span class="tag" style="background:#fff4dc;border-color:#e8c97a;color:#7a5a12;font-size:10px">待准备：' + (V2_MAT_LABEL[q.material]||q.material) + '</span>';
  }
  if(editMode){
    h += ' <span class="triage-tag" style="display:inline-block;font-size:9px;font-weight:700;padding:1px 5px;border-radius:3px;color:#fff;background:'+triageColors[triageLevel]+';margin-left:6px;vertical-align:middle">'+triageLabels[triageLevel]+'</span>';
  }
  h += '</li></ul>';
  if(q.probes && q.probes.length){
    if(q.probes_style === 'ordered'){
      h += '<div class="probe">【' + escHTML(q.probes_intro || '必须观察并记录') + '】<br>'
        + q.probes.map((p,i)=>(i+1)+'. '+escHTML(p)).join('<br>') + '</div>';
    } else {
      h += '<div class="probe">【主持人注意/追问：' + q.probes.map(p=>escHTML(p)).join('；') + '】</div>';
    }
  }
  if(q.conditional_probes && q.conditional_probes.length){
    q.conditional_probes.forEach(cp => {
      h += '<div class="probe" style="color:#8a6d3b">【条件追问（' + escHTML(cp.condition) + '）：' + escHTML(cp.text) + '】</div>';
    });
  }
  if(q.activity){
    const activity = v2ActivityForMethod(q.activity, state.type);
    if(activity){
      h += '<div class="probe" style="color:#2a6e3b">【活动/记录：' + escHTML(activity) + '】</div>';
    }
  }
  if(q.condition){
    h += '<div class="probe" style="color:#5f6b7a;background:#f7f9fc;border-left-color:#9aa7b8">【触发条件：' + escHTML(q.condition) + '】</div>';
  }
  if(q.editorial_note){
    h += '<div class="probe" style="color:#888;font-size:11px">【编辑注：' + escHTML(q.editorial_note) + '】</div>';
  }

  if(editMode){
    h += '</div>'; /* close inner div */
    h += '</div>'; /* close flex container */
  }

  h += '</div>';
  return h;
}

/* 生成当前 state 对应的全部 mods */
function v2GenerateMods(options = {}){
  const method = state.type;
  const useV3 = typeof V3_SUB_MAP!=='undefined' && V3_SUB_MAP[method];
  const map = useV3 ? V3_SUB_MAP[method] : V2_SUB_MAP[method];
  if(!map) return {};
  const vk = v2VariantKey();
  const questionMap = useV3 ? V3_QByID : V2_QByID;
  const methodKey = useV3 && typeof V3_METHOD_BY_TYPE!=='undefined' ? V3_METHOD_BY_TYPE[method] : method;
  const result = {};

  /* 内部预算计算：决定哪些题进入提纲、哪些作为备选、哪些不纳入 */
  if(typeof triageCompute === 'function') triageCompute();

  Object.entries(map).forEach(([modId, subs]) => {
    if(!state.mods[modId]) return;
    /* f5 主体仍使用硬编码内容（有独立子模块选择体系）；仅追加标记 v2_only 的子模块（如 M6.5 卖点表达理解） */
    if(!useV3 && modId === 'f5') subs = subs.filter(s=>s.v2_only);
    if(!subs.length) return;
    let html = '';
    let totalQ = 0;

    subs.forEach((sub, subIdx) => {
      if(state.subs && state.subs[modId + '_vsub_' + subIdx] === false) return;
      let subHTML = '';
      let subQ = 0;
      sub.qids.forEach(qid => {
        const q = questionMap[qid];
        if(!q) return;
        if(!q.methods.includes(methodKey)) return;
        const isPostFgdIHV = state.type === 'IHV' && state.conds && state.conds.ihvSource === 'after_fgd';
        if(isPostFgdIHV && (modId === 'c5' || modId === 'c6') && q.gate !== 'ihv_after_fgd') return;
        if(!isPostFgdIHV && q.gate === 'ihv_after_fgd') return;
        const hasVariant = q.variants[vk] || ((state.type==='FGD' || state.type==='IHV') && state.conds && ['business','commercial'].includes(state.conds.usage) && q.variants.business);
        if(!hasVariant) return;
        if(!v2GatePasses(q.gate)) return;

        /* 编辑模式：显示所有题目（包括 CUT），由用户选择 */
        const editMode = options.selectionMode === true;
        if(!editMode && !isQuestionSelected(qid)) return;

        subHTML += v2QuestionHTML(q, vk, qid, editMode);
        subQ++;
      });
      if(subQ > 0){
        html += '<h5>' + sub.sid + ' ' + escHTML(sub.name) + '</h5>';
        html += subHTML;
        totalQ += subQ;
      }
    });

    if(totalQ > 0) result[modId] = html;
  });

  /* E0 执行工具：开场 → 首模块前，收尾 → 末模块后 */
  const intro = questionMap['Q-E0-01'];
  const closing = questionMap['Q-E0-03'];
  const homeTour = questionMap['Q-E0-02'];
  /* 按模块编号排序，确保开场/收尾挂载到正确的首/末模块 */
  const modIds = Object.keys(result).sort((a,b) => {
    const na = parseInt(a.replace(/\D/g,''))||0;
    const nb = parseInt(b.replace(/\D/g,''))||0;
    return na - nb;
  });

  if(modIds.length > 0){
    /* 入户参观 → IHV 首模块前，先 prepend（再被开场说明 prepend 覆盖到其后），确保排在开场说明之后 */
    if(method === 'IHV' && homeTour && homeTour.variants[vk] && v2GatePasses(homeTour.gate)){
      result[modIds[0]] = '<h5>入户参观与现场记录（开场寒暄约10分钟后进行）</h5>' + v2QuestionHTML(homeTour, vk, 'Q-E0-02') + result[modIds[0]];
    }
    if(intro && intro.variants[vk]){
      result[modIds[0]] = '<div style="background:#f0f7ff;border:1px solid #c4d9f5;border-radius:6px;padding:10px 14px;margin-bottom:12px">'
        + '<div style="font-weight:600;color:#2a5fcc;margin-bottom:4px">开场与执行说明</div>'
        + v2QuestionHTML(intro, vk, 'Q-E0-01') + '</div>'
        + result[modIds[0]];
    }
  }
  return result;
}

function v2ClosingHTML(){
  const useV3 = typeof V3_QByID !== 'undefined';
  const questionMap = useV3 ? V3_QByID : V2_QByID;
  const closing = questionMap && questionMap['Q-E0-03'];
  const vk = v2VariantKey();
  if(!closing || !closing.variants || !closing.variants[vk]) return '';
  return '<div style="background:#f5f0ff;border:1px solid #d4c4f5;border-radius:6px;padding:10px 14px;margin-top:12px">'
    + '<div style="font-weight:600;color:#5a2acc;margin-bottom:4px">收尾</div>'
    + v2QuestionHTML(closing, vk, 'Q-E0-03', false) + '</div>';
}

/* 分级是推荐，显式选择始终优先；默认只纳入 MUST。 */
function isQuestionSelected(qid){
  const selections = state.questionSelections || {};
  if(Object.prototype.hasOwnProperty.call(selections, qid)) return selections[qid];
  return (typeof triageGet === 'function' ? triageGet()[qid] : 'must') === 'must';
}

function refreshQuestionSelection(){
  const y = window.scrollY;
  render(false);
  window.scrollTo(0, y);
}

function toggleQuestionSelection(qid){
  if(!state.questionSelections) state.questionSelections = {};
  state.questionSelections[qid] = !isQuestionSelected(qid);
  refreshQuestionSelection();
}

function toggleEditMode(){
  renderTree();
}

function selectQuestionPreset(preset){
  if(!state.questionSelections) state.questionSelections = {};
  const levels = triageCompute();
  Object.entries(levels).forEach(([qid, level]) => {
    state.questionSelections[qid] = preset === 'all' ||
      (preset === 'must' && level === 'must') ||
      (preset === 'probe' && level !== 'cut');
  });
  refreshQuestionSelection();
}

function selectAllQuestions(select){
  selectQuestionPreset(select ? 'all' : 'none');
}
