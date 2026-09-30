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
  const typeLabel = state.type === 'FGD' ? '定性座谈会' : state.type === 'IHV' ? '深度访谈' : state.type === 'MPVExpert' ? '主机厂竞品专家深访' : state.type === 'MPVMedia' ? '汽车媒体专家深访' : '经销商访谈';
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
