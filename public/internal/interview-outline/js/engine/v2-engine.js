// =========================================================
// v2 题库动态生成引擎
// =========================================================

/* v2 variant key — 根据方法/受众选择变体 */
function v2VariantKey(){
  const t = state.type;
  if(typeof V3_ROLE_BY_TYPE!=='undefined' && V3_ROLE_BY_TYPE[t]) return V3_ROLE_BY_TYPE[t];
  if(t==='Dealer') return 'Dealer';
  if(t==='FGD' || t==='IHV') return 'owner'; // 未来增加 prospect 选择器
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
    case 'business':  return true;
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

/* 生成单题 HTML */
function v2QuestionHTML(q, vk){
  const variant = q.variants[vk];
  if(!variant) return '';
  let h = '';
  h += '<ul class="q"><li>' + escHTML(variant.text);
  if(q.material){
    h += ' <span class="tag" style="background:#fff4dc;border-color:#e8c97a;color:#7a5a12;font-size:10px">待准备：' + (V2_MAT_LABEL[q.material]||q.material) + '</span>';
  }
  h += '</li></ul>';
  if(q.probes && q.probes.length){
    h += '<div class="probe">【主持人注意/追问：' + q.probes.map(p=>escHTML(p)).join('；') + '】</div>';
  }
  if(q.conditional_probes && q.conditional_probes.length){
    q.conditional_probes.forEach(cp => {
      h += '<div class="probe" style="color:#8a6d3b">【条件追问（' + escHTML(cp.condition) + '）：' + escHTML(cp.text) + '】</div>';
    });
  }
  if(q.activity){
    /* 活动前缀过滤：IHV：/FGD：/Dealer：仅匹配当前类型时渲染，无前缀则全类型渲染 */
    const actTypeMatch = q.activity.match(/^(IHV|FGD|Dealer)[：:]/);
    if(!actTypeMatch || actTypeMatch[1] === state.type){
      h += '<div class="probe" style="color:#2a6e3b">【活动/记录：' + escHTML(q.activity) + '】</div>';
    }
  }
  if(q.condition){
    h += '<div class="probe" style="color:#5f6b7a;background:#f7f9fc;border-left-color:#9aa7b8">【触发条件：' + escHTML(q.condition) + '】</div>';
  }
  if(q.editorial_note){
    h += '<div class="probe" style="color:#888;font-size:11px">【编辑注：' + escHTML(q.editorial_note) + '】</div>';
  }
  return h;
}

/* 生成当前 state 对应的全部 mods */
function v2GenerateMods(){
  const method = state.type;
  const useV3 = typeof V3_SUB_MAP!=='undefined' && V3_SUB_MAP[method];
  const map = useV3 ? V3_SUB_MAP[method] : V2_SUB_MAP[method];
  if(!map) return {};
  const vk = v2VariantKey();
  const questionMap = useV3 ? V3_QByID : V2_QByID;
  const methodKey = useV3 && typeof V3_METHOD_BY_TYPE!=='undefined' ? V3_METHOD_BY_TYPE[method] : method;
  const result = {};

  Object.entries(map).forEach(([modId, subs]) => {
    /* f5 主体仍使用硬编码内容（有独立子模块选择体系）；仅追加标记 v2_only 的子模块（如 M6.5 卖点表达理解） */
    if(!useV3 && modId === 'f5') subs = subs.filter(s=>s.v2_only);
    if(!subs.length) return;
    let html = '';
    let totalQ = 0;

    subs.forEach(sub => {
      let subHTML = '';
      let subQ = 0;
      sub.qids.forEach(qid => {
        const q = questionMap[qid];
        if(!q) return;
        if(!q.methods.includes(methodKey)) return;
        if(!q.variants[vk]) return;
        if(!v2GatePasses(q.gate)) return;
        subHTML += v2QuestionHTML(q, vk);
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
    if(intro && intro.variants[vk]){
      result[modIds[0]] = '<div style="background:#f0f7ff;border:1px solid #c4d9f5;border-radius:6px;padding:10px 14px;margin-bottom:12px">'
        + '<div style="font-weight:600;color:#2a5fcc;margin-bottom:4px">开场与执行说明</div>'
        + v2QuestionHTML(intro, vk) + '</div>'
        + result[modIds[0]];
    }
    if(closing && closing.variants[vk]){
      result[modIds[modIds.length-1]] = result[modIds[modIds.length-1]]
        + '<div style="background:#f5f0ff;border:1px solid #d4c4f5;border-radius:6px;padding:10px 14px;margin-top:12px">'
        + '<div style="font-weight:600;color:#5a2acc;margin-bottom:4px">收尾</div>'
        + v2QuestionHTML(closing, vk) + '</div>';
    }
  }
  /* 实地家庭观察 → IHV i2（IHV 无 i1，追加到第一个模块 i2） */
  if(method === 'IHV' && homeTour && homeTour.variants[vk] && v2GatePasses(homeTour.gate)){
    if(result.i2){
      result.i2 = '<h5>实地家庭观察</h5>' + v2QuestionHTML(homeTour, vk) + result.i2;
    }
  }
  return result;
}
