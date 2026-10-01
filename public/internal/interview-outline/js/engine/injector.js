// =========================================================
// 条件注入：将所选条件关键词替换进通用表述 (injectConds)
// =========================================================

/* ---------- 条件注入：将所选条件关键词替换进通用表述 ---------- */
function injectConds(html){
  if(!html) return html;
  const c = state.conds;
  /* 路面规整度 → 在题目中体现路况描述 */
  if(c.roads === 'poor'){
    html = html.replace(/日常行驶路况如何[？?]/g, '日常行驶路况如何（颠簸/坑洼/非铺装路较多）？');
    html = html.replace(/出行时一半是什么样的路况/g, '出行时经常遇到什么样的烂路/坑洼/非铺装路面');
    html = html.replace(/是否会担心碰到底盘/g, '在烂路/坑洼路段是否会担心碰到底盘');
  } else if(c.roads === 'good'){
    html = html.replace(/日常行驶路况如何[？?]/g, '日常行驶路况如何（城市道路良好）？');
  }
  /* 充电设施覆盖 → 在题目中体现充电场景 */
  if(c.charging === 'low'){
    html = html.replace(/主要在家充还是公共充电桩/g, '主要在哪里充电（公共充电桩少、找桩难的情况下）');
    html = html.replace(/您一般多久充一次电/g, '在充电不便的情况下，您一般多久充一次电');
  } else if(c.charging === 'high'){
    html = html.replace(/主要在家充还是公共充电桩/g, '主要在家充还是公共充电桩（充电设施普及的情况下）');
  }
  /* 动力类型 → 在题目中体现具体动力类型 */
  if(c.power && c.power.length === 1){
    const pMap = {bev:'纯电', ice:'燃油', hev:'混动(HEV)', phev:'插电混动(PHEV)', reve:'增程式(REVE)', other:'其他动力'};
    const pLabel = pMap[c.power[0]] || c.power[0];
    /* 仅在题目未明确提及该动力类型时才注入 */
    html = html.replace(/这辆车主要是谁在开/g, '这辆' + pLabel + '车主要是谁在开');
    html = html.replace(/请回忆一下，当初购买这辆车时/g, '请回忆一下，当初购买这辆' + pLabel + '车时');
    html = html.replace(/您已经使用这辆车/g, '您已经使用这辆' + pLabel + '车');
  }
  /* 气候带 → 在题目中体现气候特征 */
  if(c.climate === 'hot'){
    html = html.replace(/在当地的高温天气下/g, '在当地高温湿热/暴晒天气下');
    html = html.replace(/当地雨季\/暴雨天气开车/g, '当地雨季/暴雨/台风天气开车');
  } else if(c.climate === 'cold'){
    html = html.replace(/在当地的高温天气下/g, '在当地寒冷/下雪天气下');
    html = html.replace(/当地雨季\/暴雨天气开车/g, '当地冬季结冰/雪地天气开车');
  }
  /* 金融渗透率 → 在题目中体现支付方式背景 */
  if(c.finance === 'high'){
    html = html.replace(/您选择的是哪种支付方式/g, '您选择的是哪种金融方案（贷款/分期/融资租赁等）');
  } else if(c.finance === 'low'){
    html = html.replace(/您选择的是哪种支付方式/g, '您是全款现金购车还是其他方式');
  }
  /* ====== 车型画像动态替换（基于 segment / bodyType / power） ====== */
  const _seg = state.segment;
  const _bt  = state.bodyType;
  const _pwr = c.power || [];
  const _SEG_MAP = {A00:'微型',A0:'小型',A:'紧凑型',B:'中型',C:'中大型',D:'大型'};
  const _BT_MAP  = {sedan:'轿车',hatchback:'两厢车',SUV:'SUV',MPV:'MPV',pickup:'皮卡',offroad:'越野车',wagon:'旅行车',coupe:'轿跑'};
  const _PWR_MAP = {bev:'纯电',ice:'燃油',hev:'混动',phev:'插电混动',reve:'增程式'};
  const _segLabel = _seg ? _SEG_MAP[_seg] : '';
  const _btLabel  = _bt  ? _BT_MAP[_bt]   : '';
  const _pwrLabel = (_pwr.length === 1) ? _PWR_MAP[_pwr[0]] : '';
  /* 完整车型描述：如 "紧凑型纯电SUV"、"小型两厢车"、"纯电车" */
  let _fullDesc = '';
  if(_segLabel && _btLabel) _fullDesc = _segLabel + _pwrLabel + _btLabel;
  else if(_btLabel) _fullDesc = _pwrLabel + _btLabel;
  else if(_segLabel) _fullDesc = _segLabel + _pwrLabel + '车';
  /* 尺寸描述映射（按级别） */
  const _SIZE_DESC  = {A00:'3米多',A0:'不到4米',A:'4米左右',B:'4米半左右',C:'接近5米',D:'5米以上'};
  const _SIZE_RANGE = {A00:'小于3.5米',A0:'不到4米',A:'4米左右',B:'4.5米左右',C:'接近5米',D:'5米以上'};

  /* 1) 尺寸描述替换（在车型名替换之前执行，避免被吞掉） */
  if(_seg && _SIZE_DESC[_seg]){
    const sd = _SIZE_DESC[_seg], sr = _SIZE_RANGE[_seg];
    if(sd !== sr){
      html = html.replace(/3米多（不到4米）/g, sd + '（' + sr + '）');
    } else {
      /* 级别描述与范围相同时（如A0级：不到4米），去掉冗余括号 */
      html = html.replace(/3米多（不到4米）/g, sd);
    }
    html = html.replace(/小于4米/g, sr);
    html = html.replace(/3米多/g, sd);
    /* 直接替换级别代号：A00/A0/A/B/C/D → 对应中文级别（避免"A00 BEV定义"等残留） */
    html = html.replace(/\bA00\b/g, _segLabel);
    html = html.replace(/\bA0\b/g, _segLabel);
    if(_seg !== 'A') html = html.replace(/\bA级\b/g, _segLabel + '级');
  }

  /* 2) 替代车身类型替换（"轿车/SUV" → 除已选车身类型外的其他类型） */
  if(_btLabel){
    const _allBTs = ['轿车','两厢车','SUV','MPV'];
    const _altBTs = _allBTs.filter(b => b !== _btLabel).slice(0, 2);
    if(_altBTs.length >= 2){
      const altStr = _altBTs.join('/');
      html = html.replace(/轿车\/SUV/g, altStr);
      html = html.replace(/SUV\/轿车/g, altStr);
    }
  }

  /* 3) 车身类型 → 在题目中体现具体车身类型（含级别+动力组合） */
  if(_bt){
    const desc = _fullDesc || _btLabel;
    /* 先处理 applyReplacements 已泛化后的「该车型」指称 */
    html = html.replace(/该车型/g, desc);
    /* 再处理原始数据中可能残留的具体车型指称 */
    html = html.replace(/4米纯电小车/g, desc);
    html = html.replace(/4米燃油小车/g, desc);
    html = html.replace(/4米小车/g, desc);
    html = html.replace(/纯电小车/g, (_pwrLabel || '纯电') + _btLabel);
    html = html.replace(/燃油小车/g, '燃油' + _btLabel);
    html = html.replace(/小车/g, desc);
    html = html.replace(/这辆纯电/g, '这辆' + (_pwrLabel || '纯电') + _btLabel);
    html = html.replace(/这辆燃油/g, '这辆' + '燃油' + _btLabel);
  }
  /* 4) 仅有级别、无车身类型时 */
  if(_seg && !_bt){
    const segLabel2 = _segLabel + '车';
    html = html.replace(/该车型/g, _fullDesc || segLabel2);
    html = html.replace(/小车/g, segLabel2);
  }
  /* 5) 品类 → 具体品类描述（级别+尺寸+车身类型），未选级别和车身类型时保留原文 */
  const _catLabel = (typeof categoryLabel === 'function') ? categoryLabel() : '';
  if(_catLabel){
    html = html.replace(/品类/g, _catLabel);
  }
  /* 条件元数据备注剥离（仅XX组使用此模块 等括号说明，不作为正文展示） */
  html = html.replace(/（仅[^）]*使用此模块）/g, '');
  /* 模块标题中的引用说明剥离："——参见 Stimulus（50min）" → "（50min）"，"——参见 PPT（50min）" → "（50min）" */
  html = html.replace(/——参见\s+(?:Stimulus|PPT|刺激物)（(\d+min)）/g, '（$1）');
  /* Stimulus → 刺激物（统一中文术语） */
  html = html.replace(/Stimulus/g, '刺激物');
  /* 巴西税种 → 中国对应税种（便于中文阅读） */
  html = html.replace(/IPVA/g, '车船税');
  html = html.replace(/IPI/g, '购置税');
  html = html.replace(/ICMS/g, '增值税');
  /* 对标竞品车型：未填写时，将硬编码的具体车型名替换为通用表述 */
  if(!state.bevBench && !state.iceBench && !state.otherBench){
    /* 括号/方括号内的竞品列表：【BYD Dolphin Mini, ...】或（如BYD Dolphin Mini, ...等） */
    html = html.replace(/【[^】]*(?:BYD|Geely|Renault|Chevrolet|GWM|五菱|比亚迪|吉利|VinFast|奇瑞|海马)[^】]*】/g, '【对标竞品车型】');
    html = html.replace(/（(?:如|例如)?[^）]*(?:BYD|Geely|Renault|Chevrolet|GWM|五菱|比亚迪|吉利|VinFast|奇瑞|海马)[^）]*等?）/g, '（对标竞品车型）');
    /* 直接提及的具体车型名 → 对标竞品 */
    html = html.replace(/BYD Dolphin Mini(?:\s*（[^）]*）)?/g, '对标竞品车型');
    html = html.replace(/Geely Geometry EX2/g, '对标竞品车型');
    html = html.replace(/Renault Kwid E-Tech/g, '对标竞品车型');
    html = html.replace(/Chevrolet Spark EUV/g, '对标竞品车型');
    html = html.replace(/GWM Ora 03/g, '对标竞品车型');
    html = html.replace(/Hyundai HB20/g, '对标竞品车型');
    html = html.replace(/Volkswagen Polo/g, '对标竞品车型');
    html = html.replace(/Fiat Argo/g, '对标竞品车型');
    html = html.replace(/Fiat Pulse/g, '对标竞品车型');
    html = html.replace(/Renault Kwid（ICE）/g, '对标竞品车型');
    html = html.replace(/比亚迪 Seagull\s*(?:\(BYD Atto 1\)|（当地名BYD Atto 1）)?/g, '对标竞品车型');
    html = html.replace(/吉利 Geometry EX2/g, '对标竞品车型');
    html = html.replace(/五菱 Binguo EV\s*(?:（缤果）|\(缤果\))?/g, '对标竞品车型');
    html = html.replace(/VinFast VF5/g, '对标竞品车型');
    html = html.replace(/奇瑞 QQ3 EV/g, '对标竞品车型');
    html = html.replace(/海鸥/g, '对标竞品车型');
    html = html.replace(/缤果/g, '对标竞品车型');
  }
  /* ====== 五大卖点替换 ====== */
  if(state.sellingPoints.length > 0){
    /* Format A: IHV Brazil — 两列表格（卖点 + 描述） */
    const spRows2Col = state.sellingPoints.map(sp=>`<tr><td>${sp.name}</td><td>${sp.desc||''}</td></tr>`).join('\n');
    html = html.replace(/(<table class="tbl">)(?:<tbody>)?<tr><th>卖点<\/th><th>描述<\/th><\/tr>\n?(?:<tr><td>[^<]*<\/td><td>[^<]*<\/td><\/tr>\n?)*(<\/table>)/g, '$1<tbody><tr><th>卖点</th><th>描述</th></tr>\n'+spRows2Col+'\n</tbody>$2');
    /* Format B: IHV Italy/Indonesia — 无表头单列表格（name——desc） */
    const spRows1Col = state.sellingPoints.map(sp=>`<tr><td>${sp.name}${sp.desc ? '——'+sp.desc : ''}</td></tr>`).join('\n');
    html = html.replace(/(<table class="tbl">)(?:<tbody>)?\n?(<tr><td>前备箱[^<]*<\/td><\/tr>\n?<tr><td>[^<]*<\/td><\/tr>\n?<tr><td>[^<]*<\/td><\/tr>\n?<tr><td>[^<]*<\/td><\/tr>\n?<tr><td>[^<]*<\/td><\/tr>\n?)(<\/table>)/g, '$1<tbody>\n'+spRows1Col+'\n</tbody>$3');
    /* Format C: FGD/Dealer — 列表格式 */
    state.sellingPoints.forEach((sp, idx)=>{
      const patterns = [
        /<li>前备箱[^<]*<\/li>/g,
        /<li>超大拓展后备储物空间[^<]*<\/li>/g,
        /<li>二排宽适空间[^<]*<\/li>/g,
        /<li>11kW双向车载充电机[^<]*<\/li>/g,
        /<li>空调导冷式冷藏盒[^<]*<\/li>/g
      ];
      if(patterns[idx] && sp.name){
        const replacement = `<li>${sp.name}${sp.desc ? '——'+sp.desc : ''}</li>`;
        html = html.replace(patterns[idx], replacement);
      }
    });
  } else {
    /* 未填写卖点时，替换为占位提示 */
    /* Format A: IHV Brazil — 两列表格 */
    html = html.replace(/<table class="tbl">(?:<tbody>)?<tr><th>卖点<\/th><th>描述<\/th><\/tr>\n?(?:<tr><td>[^<]*<\/td><td>[^<]*<\/td><\/tr>\n?)*<\/table>/g, '<p style="color:#999;font-style:italic">（请客户提供五大卖点评价表）</p>');
    /* Format B: IHV Italy/Indonesia — 无表头单列表格 */
    html = html.replace(/<table class="tbl">(?:<tbody>)?\n?(<tr><td>前备箱[^<]*<\/td><\/tr>\n?<tr><td>[^<]*<\/td><\/tr>\n?<tr><td>[^<]*<\/td><\/tr>\n?<tr><td>[^<]*<\/td><\/tr>\n?<tr><td>[^<]*<\/td><\/tr>\n?)<\/table>/g, '<p style="color:#999;font-style:italic">（请客户提供五大卖点评价表）</p>');
    /* Format C: FGD/Dealer — 列表格式 */
    html = html.replace(/<li>前备箱[^<]*<\/li>/g, '<li>（卖点1——请客户提供）</li>');
    html = html.replace(/<li>超大拓展后备储物空间[^<]*<\/li>/g, '<li>（卖点2——请客户提供）</li>');
    html = html.replace(/<li>二排宽适空间[^<]*<\/li>/g, '<li>（卖点3——请客户提供）</li>');
    html = html.replace(/<li>11kW双向车载充电机[^<]*<\/li>/g, '<li>（卖点4——请客户提供）</li>');
    html = html.replace(/<li>空调导冷式冷藏盒[^<]*<\/li>/g, '<li>（卖点5——请客户提供）</li>');
  }
  /* ====== 配置评价项替换 ====== */
  if(state.configItems.length > 0){
    const cfgRows = state.configItems.map(item=>`<tr><td>${item}</td><td></td><td></td></tr>`).join('\n');
    /* Format A: IHV Brazil — <th>配置项</th> 表头 */
    html = html.replace(/(<table class="tbl">)(?:<tbody>)?<tr><th>配置项<\/th><th>是否重要<\/th><th>是否会有溢价<\/th><\/tr>\n?(?:<tr><td>[^<]*<\/td><td><\/td><td><\/td><\/tr>\n?)*(<\/table>)/g, '$1<tbody><tr><th>配置项</th><th>是否重要</th><th>是否会有溢价</th></tr>\n'+cfgRows+'\n</tbody>$2');
    /* Format B: IHV Italy/Indonesia — <th>类别</th> 表头 */
    html = html.replace(/(<table class="tbl">)(?:<tbody>)?<tr><th>类别<\/th><th>是否重要<\/th><th>是否会有溢价<\/th><\/tr>\n?(?:<tr><td>[^<]*<\/td><td><\/td><td><\/td><\/tr>\n?)*(<\/table>)/g, '$1<tbody><tr><th>类别</th><th>是否重要</th><th>是否会有溢价</th></tr>\n'+cfgRows+'\n</tbody>$2');
    /* Format C: FGD/Dealer — 列表格式 */
    const cfgListItems = state.configItems.map(item=>`<li>${item}</li>`).join('\n');
    html = html.replace(/(<h5>配置买单与溢价测试<\/h5>\n?<p>[^<]*<\/p>\n?<ul class="q">\n?)(?:<li>[^<]*<\/li>\n?)*(<\/ul>)/g, '$1'+cfgListItems+'\n$2');
  } else {
    /* 未填写配置时，替换为占位提示 */
    /* Format A: IHV Brazil */
    html = html.replace(/<table class="tbl">(?:<tbody>)?<tr><th>配置项<\/th><th>是否重要<\/th><th>是否会有溢价<\/th><\/tr>\n?(?:<tr><td>[^<]*<\/td><td><\/td><td><\/td><\/tr>\n?)*<\/table>/g, '<p style="color:#999;font-style:italic">（请客户提供配置评价表）</p>');
    /* Format B: IHV Italy/Indonesia */
    html = html.replace(/<table class="tbl">(?:<tbody>)?<tr><th>类别<\/th><th>是否重要<\/th><th>是否会有溢价<\/th><\/tr>\n?(?:<tr><td>[^<]*<\/td><td><\/td><td><\/td><\/tr>\n?)*<\/table>/g, '<p style="color:#999;font-style:italic">（请客户提供配置评价表）</p>');
    /* Format C: FGD/Dealer — 列表格式 */
    html = html.replace(/(<h5>配置买单与溢价测试<\/h5>\n?<p>[^<]*<\/p>\n?<ul class="q">\n?)(?:<li>[^<]*<\/li>\n?)*(<\/ul>)/g, '$1<li>（请客户提供配置评价表）</li>\n$2');
  }
  /* ====== 5b 措辞对齐：题库通用说法 → 客户填写的测试对象（如"车辆前部外观"→"车头"） ====== */
  if(typeof applyConceptTerms === 'function') html = applyConceptTerms(html);
  return html;
}

/* 条件标签：为每个题目添加与所选研究条件关联的标签 */
function tagQuestions(){
  if(!condsActive()) return;
  const doc = document.querySelector('.doc');
  if(!doc) return;
  const c = state.conds;
  /* 构建已选条件集合 */
  const activeCats = new Set();
  if(c.climate) activeCats.add('climate');
  if(c.roads) activeCats.add('roads');
  if(c.charging) activeCats.add('charging');
  if(c.power && c.power.length) activeCats.add('power');
  if(c.incentive) activeCats.add('incentive');
  if(c.finance) activeCats.add('finance');
  if(state.bodyType || state.segment) activeCats.add('vehicle');

  const tagColorMap = {
    climate:'t-climate', roads:'t-roads', charging:'t-charging',
    power:'t-power', incentive:'t-incentive',
    finance:'t-finance', vehicle:'t-vehicle'
  };
  const tagLabelMap = {
    'climate:hot':'气候', 'climate:cold':'气候',
    'roads:poor':'路况', 'roads:good':'路况', 'roads:mixed':'路况',
    'charging:low':'充电', 'charging:high':'充电', 'charging:mid':'充电',
    'power:bev':'纯电', 'power:ice':'燃油', 'power:hev':'混动',
    'power:phev':'插混', 'power:reve':'增程', 'power:hev,phev,reve':'混动',
    'incentive:yes':'政策',
    'finance:high':'金融', 'finance:low':'金融',
    'vehicle':'车型'
  };

  /* 判断某条规则的 fam 取值是否被用户实际选中 */
  function famIsSelected(fam){
    if(!fam) return false;
    const idx = fam.indexOf(':');
    if(idx<0) return false;
    const cat = fam.substring(0,idx);
    const subs = fam.substring(idx+1).split(','); // e.g. "hev,phev,reve"
    if(cat==='power'){
      const sel = state.conds.power||[];
      return subs.some(v=>sel.includes(v));
    }
    return !!state.conds[cat] && subs.includes(state.conds[cat]);
  }

  doc.querySelectorAll('ul.q>li').forEach(li=>{
    const text = li.textContent || '';
    const tags = [];
    const seen = new Set();
    /* COND_RULES 匹配 */
    for(const r of COND_RULES){
      if(!r.fam) continue;
      const cat = r.fam.split(':')[0];
      if(!activeCats.has(cat)) continue;
      if(!famIsSelected(r.fam)) continue;   /* 仅对用户实际选中的子值打标 */
      if(r.re.test(text)){
        const key = r.fam;
        if(!seen.has(key)){
          seen.add(key);
          const label = tagLabelMap[key] || key;
          const cls = tagColorMap[cat] || 't-power';
          tags.push(`<span class="q-tag ${cls}">${label}</span>`);
        }
      }
    }
    /* 车身类型/级别标签 */
    if(activeCats.has('vehicle') && !seen.has('vehicle')){
      const hasVehicleRef = /SUV|轿车|两厢|MPV|皮卡|越野|旅行|轿跑|微型|小型|紧凑|中型|中大型|大型|该车型|小车|纯电|燃油|混动|插混|增程|BEV|ICE|HEV|PHEV|REVE/i.test(text);
      if(hasVehicleRef){
        seen.add('vehicle');
        tags.push(`<span class="q-tag t-vehicle">车型</span>`);
      }
    }
    if(tags.length > 0){
      const tagSpan = document.createElement('span');
      tagSpan.className = 'q-tags';
      tagSpan.innerHTML = tags.join('');
      li.appendChild(tagSpan);
    }
  });
}

