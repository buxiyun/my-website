// =========================================================
// MUST / PROBE / CUT 三级分层 + 时间预算校准
// =========================================================

/* ---------- 格式校准参数 ---------- */
const TRIAGE_CALIBRATION = {
  FGD: {
    label: 'FGD 6人组',
    totalMin: 150,      // 实际执行约2.5小时（含刺激物60min）
    groupSize: 6,
    overheadMin: 10,      // 开场说明 + 自我介绍
    stimulusMin: 60,      // 刺激物呈现（概念板/外观/CMF/空间/价格/品牌）
    bufferMin: 5,         // 过渡 + 缓冲
    narrativeSec: 5,      // 叙事型问题（行为回顾）FGD中主持人可控场，5min/题
    standardSec: 2.5,     // 标准问题单题耗时（6人组，主持人控场节奏）
    targetMust: [22, 26]  // 目标 MUST 题量区间（对标Nielsen原版24题）
  },
  IHV: {
    label: 'IHV 1对1',
    totalMin: 95,
    groupSize: 1,
    overheadMin: 10,
    stimulusMin: 30,
    bufferMin: 5,
    narrativeSec: 5,
    standardSec: 2.5,
    targetMust: [20, 25]
  },
  Dealer: {
    label: '经销商深访',
    totalMin: 90,
    groupSize: 1,
    overheadMin: 5,
    stimulusMin: 20,
    bufferMin: 5,
    narrativeSec: 5,
    standardSec: 2.5,
    targetMust: [25, 30]
  },
  MPVMedia: {
    label: '媒体深访',
    totalMin: 60,
    groupSize: 1,
    overheadMin: 5,
    stimulusMin: 15,
    bufferMin: 5,
    narrativeSec: 4,
    standardSec: 2,
    targetMust: [15, 20]
  },
  MPVExpert: {
    label: '主机厂专家深访',
    totalMin: 60,
    groupSize: 1,
    overheadMin: 5,
    stimulusMin: 15,
    bufferMin: 5,
    narrativeSec: 4,
    standardSec: 2,
    targetMust: [15, 20]
  }
};

/* ---------- 单题耗时估算 ---------- */
function triageEstimateSec(q, cal) {
  if (!cal) return 180; // 默认 3 分钟
  // 有明确活动指令（时间线填写、完整叙事练习）→ 叙事时长
  if (q.activity) return cal.narrativeSec * 60;
  const text = (q.variants && (q.variants.owner || q.variants.prospect || q.variants.Dealer || q.variants.Media || q.variants.OEM || q.variants.business));
  const t = text ? text.text : '';
  // 只有明确要求完整时间线/长周期回顾的才是叙事型
  if (/回顾最近一周|回顾最近.*出行|从.*开始讲起|按时间顺序还原|完整讲讲从出发到结束/.test(t)) {
    return cal.narrativeSec * 60;
  }
  return cal.standardSec * 60;
}

/* ---------- 优先级评分（越高越应该保留为 MUST）---------- */
function triagePriorityScore(q, modId, subIdx, qIdxInSub) {
  let score = 0;
  // 1. 探针数量越多 → 话题越深入 → 越重要
  const probeCount = (q.probes ? q.probes.length : 0);
  const condProbeCount = (q.conditional_probes ? q.conditional_probes.length : 0);
  score += probeCount * 2 + condProbeCount;
  // 2. 模块内第一个问题（破冰/基础题）加分
  if (subIdx === 0 && qIdxInSub === 0) score += 15;
  // 3. 子模块第一个问题加分
  if (qIdxInSub === 0) score += 5;
  // 4. 有活动指令（叙事/练习）的题目更重要但也更耗时，适度加分
  if (q.activity) score += 8;
  // 5. 有研究条件限制的题目降分（不是所有人都适用）
  if (q.condition) score -= 10;
  // 6. gate 越严格说明越核心
  if (q.gate && q.gate !== 'all') score += 3;
  return score;
}

/* ---------- 自动分级（预算感知）----------
 * 规则：
 *   CUT   — 有材料依赖（stimulus 未定则全部降级）
 *   MUST  — core + 无材料依赖，按优先级评分贪心填充时间预算
 *   PROBE — 其余（optional 无材料依赖 + MUST 预算溢出）
 *
 * 后续可在 BANK_V3 题目上直接加 triage 字段覆盖自动结果。
 */
function triageAssign(q) {
  // 显式标记优先
  if (q.triage) return q.triage;
  // 有材料依赖 → CUT（stimulus 未定无法执行）
  if (q.material) return 'cut';
  // 其余由预算算法决定（triageCompute 中处理）
  return q.priority === 'core' ? 'must' : 'probe';
}

/* ---------- 计算时间预算 ---------- */
function triageBudget(type) {
  const cal = TRIAGE_CALIBRATION[type];
  if (!cal) return null;
  const effectiveMin = cal.totalMin - cal.overheadMin - cal.stimulusMin - cal.bufferMin;
  return {
    cal: cal,
    totalMin: cal.totalMin,
    overheadMin: cal.overheadMin,
    stimulusMin: cal.stimulusMin,
    bufferMin: cal.bufferMin,
    effectiveMin: effectiveMin,
    targetMust: cal.targetMust
  };
}

/* ---------- 对当前 state 执行分级，返回 { qid: 'must'|'probe'|'cut' } ---------- */
function triageCompute() {
  window._triageResult = {};
  window._triageStats = null;
  window._triageBudget = null;
  const type = state.type;
  const cal = TRIAGE_CALIBRATION[type];
  if (!cal) return {};

  const useV3 = typeof V3_SUB_MAP !== 'undefined' && V3_SUB_MAP[type];
  const map = useV3 ? V3_SUB_MAP[type] : (typeof V2_SUB_MAP !== 'undefined' ? V2_SUB_MAP[type] : null);
  if (!map) return {};

  const questionMap = useV3 ? V3_QByID : V2_QByID;
  const methodKey = useV3 && typeof V3_METHOD_BY_TYPE !== 'undefined' ? V3_METHOD_BY_TYPE[type] : type;
  const vk = typeof v2VariantKey === 'function' ? v2VariantKey() : 'owner';

  // 有效讨论时间（秒）
  const effectiveSec = (cal.totalMin - cal.overheadMin - cal.stimulusMin - cal.bufferMin) * 60;

  // 5b 填写后必须覆盖的 session（强制启用，避免相关题目被取消勾选而漏问）
  const requiredSids = (typeof conceptRequiredSids === 'function') ? conceptRequiredSids() : new Set();

  // 第一遍：收集所有有效题目，初步分级 + 评分
  const allCandidates = []; // { qid, modId, sec, initialTriage, score, q }
  const cutItems = [];

  const seen = new Set();
  Object.entries(map).forEach(([modId, subs]) => {
    if(!state.mods[modId]) return;
    subs.forEach((sub, subIdx) => {
      if(state.subs && state.subs[modId + '_vsub_' + subIdx] === false && !requiredSids.has(sub.sid)) return;
      sub.qids.forEach((qid, qIdx) => {
        if(seen.has(qid)) return;
        const q = questionMap[qid];
        if (!q) return;
        if (!q.methods.includes(methodKey)) return;
        const hasVariant = q.variants[vk] || ((type === 'FGD' || type === 'IHV') && state.conds && ['business', 'commercial'].includes(state.conds.usage) && q.variants.business);
        if (!hasVariant) return;
        if (typeof v2GatePasses === 'function' && !v2GatePasses(q.gate)) return;

        const postFgd = type === 'IHV' && state.conds && state.conds.ihvSource === 'after_fgd';
        if(postFgd && (modId === 'c5' || modId === 'c6') && q.gate !== 'ihv_after_fgd') return;
        if(!postFgd && q.gate === 'ihv_after_fgd') return;
        seen.add(qid);
        const sec = triageEstimateSec(q, cal);
        const initialTriage = q.triage || (q.material ? 'cut' : (q.priority === 'core' ? 'must' : 'probe'));

        if (initialTriage === 'cut') {
          cutItems.push({ qid, modId, sec });
        } else {
          const score = triagePriorityScore(q, modId, subIdx, qIdx);
          allCandidates.push({ qid, modId, sec, initialTriage, score, q });
        }
      });
    });
  });

  // 第二遍：预算感知贪心分配 MUST
  // 将 MUST 候选按评分降序排列，贪心填充时间预算
  const mustCandidates = allCandidates.filter(c => c.initialTriage === 'must')
    .sort((a, b) => b.score - a.score);
  const probeCandidates = allCandidates.filter(c => c.initialTriage === 'probe');

  const result = {};
  let usedSec = 0;
  let mustCount = 0;
  const [targetLo, targetHi] = cal.targetMust || [0, 999];

  // 贪心填充 MUST
  mustCandidates.forEach(c => {
    if (usedSec + c.sec <= effectiveSec && mustCount < targetHi) {
      result[c.qid] = 'must';
      usedSec += c.sec;
      mustCount++;
    } else {
      // 预算已满或达到目标上限 → 降级为 PROBE
      result[c.qid] = 'probe';
    }
  });

  // 原有的 PROBE 候选直接标记
  probeCandidates.forEach(c => {
    result[c.qid] = 'probe';
  });

  // CUT 标记
  cutItems.forEach(c => {
    result[c.qid] = 'cut';
  });

  // 5b「产品卖点与配置」驱动的强制升级：
  // 客户已填写测试对象/配置/卖点 → 对应 session 的题目必须问（覆盖 OPTIONAL 与预算降级）
  if (typeof conceptPromotedQids === 'function') {
    conceptPromotedQids().forEach(qid => {
      if (Object.prototype.hasOwnProperty.call(result, qid)) result[qid] = 'must';
    });
  }

  window._triageResult = result;
  // 统计
  const stats = { must: 0, probe: 0, cut: 0, mustSec: 0, probeSec: 0, cutSec: 0, mustQ: [], probeQ: [], cutQ: [] };
  // 按模块统计（供摘要使用）
  const modStats = {};
  Object.entries(result).forEach(([qid, triage]) => {
    const q = questionMap[qid];
    const sec = q ? triageEstimateSec(q, cal) : 180;
    stats[triage]++;
    stats[triage + 'Sec'] += sec;
    stats[triage + 'Q'].push({ qid, sec, text: (q && (q.variants[vk] || q.variants.business || {}) || {}).text || '' });
    // 按模块累计（仅 must + probe，即实际进入提纲的题）
    if(isQuestionSelected(qid)){
      // 找到该 qid 所属 modId
      for(const [mId, mSubs] of Object.entries(map)){
        const found = mSubs.some(s => s.qids.includes(qid));
        if(found){
          if(!modStats[mId]) modStats[mId] = { count: 0, sec: 0 };
          modStats[mId].count++;
          modStats[mId].sec += sec;
          break;
        }
      }
    }
  });

  // 记录被降级的题目（原 MUST → 实际 PROBE）
  stats._downgraded = mustCandidates.filter(c => result[c.qid] === 'probe').map(c => ({
    qid: c.qid, score: c.score, sec: c.sec
  }));
  stats._mustTarget = cal.targetMust;

  // 存入全局供其他模块读取
  window._triageResult = result;
  window._triageStats = stats;
  window._triageBudget = triageBudget(type);
  window._triageModStats = modStats;

  return result;
}

/* ---------- 获取当前分级结果 ---------- */
function triageGet() {
  return window._triageResult || {};
}

/* ---------- 生成时间预算 HTML 摘要（干净版，不含分级标签） ---------- */
function triageSummaryHTML() {
  const stats = window._triageStats;
  const budget = window._triageBudget;
  const modStats = window._triageModStats || {};
  if (!stats || !budget) return '';

  const selected = Object.entries(triageGet()).filter(([qid]) => isQuestionSelected(qid));
  const questionMap = typeof V3_SUB_MAP !== 'undefined' && V3_SUB_MAP[state.type] ? V3_QByID : V2_QByID;
  const selectedSec = selected.reduce((sum, [qid]) => sum + triageEstimateSec(questionMap[qid], budget.cal), 0);
  const omittedMust = Object.entries(triageGet()).filter(([qid, level]) => level === 'must' && !isQuestionSelected(qid)).length;
  const effectiveMin = budget.effectiveMin;
  const totalQ = selected.length;
  const overage = selectedSec - effectiveMin * 60;
  const isOver = overage > 0;

  let h = '<div style="background:#fafbfc;border:1px solid #e1e4e8;border-radius:8px;padding:12px 16px;margin:12px 0;font-size:12px">';
  h += '<div style="font-weight:600;color:#333;margin-bottom:8px;font-size:13px">时间预算</div>';

  // 时间分配行
  h += '<div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:8px">';
  h += `<span>总时长 <b>${budget.totalMin}</b> min</span>`;
  h += `<span style="color:#888">开场 ${budget.overheadMin}</span>`;
  h += `<span style="color:#888">刺激物 ${budget.stimulusMin}</span>`;
  h += `<span style="color:#888">缓冲 ${budget.bufferMin}</span>`;
  h += `<span style="color:#2a6e3b;font-weight:600">有效讨论 ${effectiveMin} min</span>`;
  h += '</div>';

  // 提纲概览
  h += '<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center;margin-bottom:6px">';
  h += `<span>已选 <b>${totalQ}</b> 题 ≈${Math.round(selectedSec / 60)}min（不含开场、收尾及额外执行提示）</span>`;
  ['must', 'probe', 'cut'].forEach(level => {
    h += `<span>${level === 'cut' ? 'OPTIONAL' : level.toUpperCase()}：${selected.filter(([, value]) => value === level).length} / ${stats[level]} 题</span>`;
  });
  if(omittedMust) h += `<span style="color:#b05a12">有 ${omittedMust} 道 MUST 未选，请确认研究重点仍被覆盖。</span>`;
  h += '</div>';

  // 余量/超载
  if (isOver) {
    const overMin = Math.ceil(overage / 60);
    h += `<div style="color:#d32f2f;font-weight:600">⚠ 所选题目超出有效时间约 ${overMin} 分钟，建议减少勾选题目</div>`;
  } else {
    const slack = Math.floor((effectiveMin * 60 - selectedSec) / 60);
    h += `<div style="color:#2a6e3b">余量约 ${slack} 分钟</div>`;
  }

  // 模块级时间分配
  if(Object.keys(modStats).length > 0){
    h += '<div style="margin-top:8px;border-top:1px solid #e1e4e8;padding-top:8px">';
    h += '<div style="font-weight:600;color:#666;font-size:11px;margin-bottom:4px">各模块题量与估算时长</div>';
    h += '<div style="display:flex;gap:8px;flex-wrap:wrap;font-size:11px;color:#555">';
    Object.entries(modStats).forEach(([modId, ms]) => {
      const mins = Math.round(ms.sec / 60);
      h += `<span style="display:inline-block;background:#f5f7fa;border:1px solid #e1e4e8;border-radius:4px;padding:2px 8px">${modId}：${ms.count}题 ≈${mins}min</span>`;
    });
    h += '</div></div>';
  }

  // 被降级的题目（核心候选 → 实际备选）
  if (stats._downgraded && stats._downgraded.length > 0) {
    h += `<div style="margin-top:8px;border-top:1px solid #e1e4e8;padding-top:8px">`;
    h += `<div style="font-weight:600;color:#666;font-size:11px;margin-bottom:4px">以下 ${stats._downgraded.length} 题因时间预算从核心调整为备选：</div>`;
    h += `<div style="font-size:11px;color:#888;line-height:1.8">`;
    stats._downgraded.forEach(d => {
      h += `<span style="display:inline-block;background:#f0f4ff;border:1px solid #c4d9f5;border-radius:3px;padding:0 5px;margin:1px 3px;font-size:10px">${d.qid}</span>`;
    });
    h += `</div></div>`;
  }

  h += '</div>';
  return h;
}
