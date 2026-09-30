// =========================================================
// 动态项目背景、研究目的与样本定义生成
// =========================================================

function collectSelectedCountries(){
  if(!state.type || !DATA[state.type]) return [];
  return COUNTRIES.filter(c=>state.countries.includes(c.code) && DATA[state.type].countries[c.code]).map(c=>c.code);
}

function autoGenerateHeader(cc, cinfo, cd){
  const d = DATA[state.type];
  const cName = (state.repCountries[cc] && state.repCountries[cc].name) || cinfo.name;
  let cityLabel = (isMPVType() && cc!=='HK' && cc!=='TH') ? cinfo.city : (cd.cityName || cinfo.city);
  if(state.repCountries[cc] && state.repCountries[cc].city) cityLabel = state.repCountries[cc].city;
  else cityLabel = applyReplacements(cityLabel);
  
  const ccs = collectSelectedCountries();
  const isMulti = ccs.length > 1;
  const typeLabel = {
    FGD:'定性座谈会', IHV:'入户深度访谈', Dealer:'经销商深访',
    MPVExpert:'主机厂专家深访', MPVMedia:'汽车媒体专家深访',
    BusinessOrg:'商务与组织采购者深访'
  }[state.type] || '专业深访';
  const modelLabel = state.repModel || '目标车型';
  
  let html = '';
  html += `<h1 class="doctitle">${modelLabel}海外产品定义调研</h1>`;
  html += `<h2 class="docsub">${typeLabel}大纲</h2>`;
  
  html += `<div class="docnote">`;
  if(isMulti){
    html += `<b>【项目背景：多国对比研究】</b>本访谈大纲适用于${ccs.map(c=>{
      const ci = COUNTRIES.find(x=>x.code===c);
      return ci ? ci.name : c;
    }).join('、')}市场调研。`;
  } else {
    html += `<b>【项目背景】</b>本访谈大纲适用于${cName}（${cityLabel}）市场调研。`;
  }
  
  const power = state.conds.power || [];
  const hasBEV = power.includes('bev');
  const hasICE = power.includes('ice');
  const hasHEV = power.some(p=>['hev','phev','reve'].includes(p));
  
  let groupDesc = [];
  if(hasBEV) groupDesc.push('BEV');
  if(hasICE) groupDesc.push('ICE');
  if(hasHEV) groupDesc.push('混动');
  
  if(groupDesc.length > 0){
    html += `本次调研包含${groupDesc.join(' + ')}车主/用户。`;
    if(hasBEV && hasICE){
      html += `访谈中ICE相关模块仅在ICE车主组中使用。`;
    }
  }

  const usageLabel = {'household':'家用','intend':'意向家用','commercial':'商用'}[state.conds.usage] || '';
  if(usageLabel){
    html += `受访者用车目的：<b>${usageLabel}</b>。`;
    if(state.conds.usage === 'commercial'){
      html += `商用相关题目（采购审批、车队管理等）仅在商用组中使用。`;
    }
  }

  html += `请根据当地具体车型、政策环境、基础设施情况灵活调整。<br>`;
  
  if(state.bevBench){
    html += `<b>BEV对标车型：</b>${state.bevBench}<br>`;
  }
  if(state.iceBench){
    html += `<b>ICE对标车型：</b>${state.iceBench}<br>`;
  }
  if(state.otherBench){
    html += `<b>其他对标车型：</b>${state.otherBench}<br>`;
  }
  
  html += `</div>`;

  /* 动态研究目的 */
  html += autoGenerateObjectives();

  /* 动态样本定义（模块概览） */
  html += autoGenerateSampleDef();

  return html;
}

function autoGenerateObjectives(){
  const power = state.conds.power || [];
  const hasBEV = power.includes('bev');
  const hasICE = power.includes('ice');
  const hasHEV = power.some(p=>['hev','phev','reve'].includes(p));
  const modelLabel = state.repModel || '目标车型';
  const usage = state.conds.usage || '';

  let items = [];
  if(state.type === 'Dealer'){
    items = [
      `理解当地目标品类的竞争格局、政策环境、销量变化与渠道经营现状。`,
      `还原真实客户画像、购车动机、考虑因素、成交障碍及流失原因。`,
      `评估${modelLabel}的产品优势、价格与配置版本、销售话术、售后要求与关键卖点。`,
      `识别中国汽车品牌在当地的优势、短板及进入市场所需条件。`
    ];
  } else if(state.type === 'MPVMedia'){
    items = [
      `基于报道、试驾、受众研究与公开资料，理解当地目标品类的市场、政策和竞争变化。`,
      `识别消费者讨论中的购车考虑因素、主要顾虑、信息影响与品牌认知。`,
      `从专业测评和传播角度评估${modelLabel}的产品方案、卖点表达及潜在舆论风险。`,
      `明确结论的证据边界，不要求受访者回答订单、成交率或企业内部数据。`
    ];
  } else if(state.type === 'MPVExpert'){
    items = [
      `理解当地市场、用户、政策与竞争格局，并明确判断所依据的专业证据。`,
      `还原目标用户的购买与流失机制，识别关键产品需求和本地化约束。`,
      `评估${modelLabel}的产品、工程、价格与配置版本、渠道服务及品牌进入策略。`,
      `区分公开信息、项目经验和专业判断，不要求披露企业保密信息。`
    ];
  } else if(state.type === 'BusinessOrg'){
    items = [
      `还原组织车辆的实际用途、使用者、任务与运营痛点。`,
      `梳理需求提出、试用、预算、审批和供应商选择的完整采购决策流程。`,
      `识别组织采购的考虑因素、全生命周期成本、产品配置、品牌及服务要求。`,
      `核实补贴、税费、牌照与运营政策对采购时间、数量、动力和预算的影响。`
    ];
  }

  if(items.length){
    items.push(`___________（请补充本项目特定的研究目标）`);
    let roleHtml = `<h4>【研究目的】</h4>\n<ul class="q">\n`;
    items.forEach(t=>{ roleHtml += `<li>${t}</li>\n`; });
    return roleHtml + `</ul>`;
  }

  items.push(`真实用车体验与场景还原：深入探究当地${modelLabel}${usage==='commercial'?'（商用/公务）':''}拥有者的核心购买动机、真实用车场景诉求与痛点。`);
  items.push(`核心价值要素与产品力权衡机制洞察：深挖目标用户在购车时对外观、内饰、空间、续航、智能化、安全等核心维度的具体关注点。`);

  if(hasBEV){
    items.push(`续航与充电体验的价值锚定：针对纯电车型的核心工程矛盾（续航vs成本、家充vs公共充电），切入用户真实使用场景进行模拟推演。`);
  }

  items.push(`产品定义方向验证：基于开放式讨论+示卡测试，验证受访者对${modelLabel}的造型、续航、配置、安全、价格等核心维度的期望与底线。`);

  if(hasBEV && hasICE){
    items.push(`BEV vs ICE跨动力对比洞察：通过BEV车主与ICE车主的对比，揭示消费者在动力选择上的真实决策逻辑与核心障碍。`);
  }

  if(usage === 'commercial'){
    items.push(`商用采购决策链路还原：梳理商用购车的需求提出→预算→试用→审批→签单全流程，理解司机与乘员意见如何进入决策、采购数量及节奏。`);
    items.push(`商用场景适配性验证：验证${modelLabel}在商务出行、企业通勤、短途配送等商用场景下的适配度与竞品替代潜力。`);
  } else if(usage === 'household' || usage === 'intend'){
    items.push(`家庭用车决策与使用场景深挖：了解家庭购车决策中各成员（配偶/子女/老人）的角色与影响力，以及日常家用场景的细分需求。`);
  }

  items.push(`___________（请补充本项目特定的研究目标）`);
  items.push(`___________（请补充本项目特定的研究目标）`);

  let html = `<h4>【研究目的】</h4>\n<ul class="q">\n`;
  items.forEach(t=>{ html += `<li>${t}</li>\n`; });
  html += `</ul>`;
  return html;
}

function autoGenerateSampleDef(){
  const d = DATA[state.type];
  if(!d) return '';
  const power = state.conds.power || [];
  const hasBEV = power.includes('bev');
  const hasICE = power.includes('ice');
  const usage = state.conds.usage || '';
  const usageLabel = {'household':'家用','intend':'意向家用','commercial':'商用'}[usage] || '';

  let groupDesc = [];
  if(hasBEV) groupDesc.push('BEV组');
  if(hasICE) groupDesc.push('ICE组');
  if(power.some(p=>['hev','phev','reve'].includes(p))) groupDesc.push('混动组');

  let html = `<h4>【样本定义与时长】</h4>\n`;
  const roleSample = {
    Dealer:'当地经销商负责人、销售主管或能依据近期客户和经营记录回答的相关人员。',
    MPVMedia:'覆盖目标品类的汽车媒体、编辑、记者或测评人；涉及用户画像时须有受众研究或采访依据。',
    MPVExpert:'职责覆盖目标市场、产品、工程或渠道议题的主机厂专家。',
    BusinessOrg:'商务或组织车辆的采购决策者、车队管理者或实际使用负责人。'
  }[state.type];
  if(roleSample) html += `<p>建议受访者：${roleSample}</p>\n`;
  if(usageLabel){
    html += `<p>受访者用车目的：<b>${usageLabel}</b></p>\n`;
  }
  if(groupDesc.length > 0){
    html += `<p>访谈分组：${groupDesc.join(' + ')}</p>\n`;
  }
  html += `<p>访谈时长：约___分钟</p>\n`;

  const selMods = d.modules.filter(m=>state.mods[m.id]);
  if(selMods.length > 0){
    html += `<table class="tbl"><tr><th>模块</th><th>内容</th><th>时长</th></tr>\n`;
    selMods.forEach((m,i)=>{
      const shortName = m.name.replace(/^(\d+[\.、\s])+/, '');
      html += `<tr><td>模块${i+1}</td><td>${shortName}</td><td>___min</td></tr>\n`;
    });
    html += `<tr><td><b>合计</b></td><td></td><td>___min</td></tr></table>\n`;
  }
  return html;
}

let lastBuildStats = null;
