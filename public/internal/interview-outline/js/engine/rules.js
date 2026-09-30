// =========================================================
// 车型规格分类与研究条件过滤规则库
// =========================================================

const OWNER_TYPES = [
  {id:'ev',    label:'仅电车', note:'BEV/PHEV/增程车主'},
  {id:'ice',   label:'仅油车', note:'燃油车车主'},
  {id:'both',  label:'电车和油车', note:'混合研究'}
];

const VEHICLE_SEGMENTS = [
  {id:'A00', label:'A00级（微型）',     note:'≈3.0–3.5m'},
  {id:'A0',  label:'A0级（小型）',      note:'≈3.5–4.0m'},
  {id:'A',   label:'A级（紧凑型）',     note:'≈4.0–4.5m'},
  {id:'B',   label:'B级（中型）',       note:'≈4.5–4.8m'},
  {id:'C',   label:'C级（中大型）',     note:'≈4.8–5.0m'},
  {id:'D',   label:'D级（大型/豪华）', note:'≈5.0m+'}
];

const BODY_TYPES = [
  {id:'sedan',     label:'Sedan 轿车'},
  {id:'hatchback', label:'Hatchback 两厢车'},
  {id:'SUV',       label:'SUV 运动型多用途'},
  {id:'MPV',       label:'MPV 多功能车'},
  {id:'pickup',    label:'Pickup 皮卡'},
  {id:'offroad',   label:'Off-road 越野车'},
  {id:'wagon',     label:'Wagon 旅行车'},
  {id:'coupe',     label:'Coupe 轿跑'}
];

const PERSONNEL_TYPES = [
  {id:'mass',    label:'当地初级',   note:'大众市场 / 入门消费群体'},
  {id:'middle',  label:'当地中产',   note:'中等收入 / 主流消费力'},
  {id:'wealthy', label:'当地富裕',   note:'高收入 / 高端消费群体'}
];



/* ---------- 研究条件：选项定义 / 规则库 / 过滤引擎 ---------- */
const COND_DEFS = [
  {key:'climate',  label:'气候带',       type:'select', options:[{v:'hot',label:'热带/亚热带（湿热）'},{v:'temperate',label:'温带（四季分明）'},{v:'cold',label:'寒冷（冬季多雪）'}]},
  {key:'roads',    label:'路面规整度',   type:'select', options:[{v:'good',label:'规整（城市道路良好）'},{v:'mixed',label:'一般（城乡混合）'},{v:'poor',label:'较差（破损/非铺装多）'}]},
  {key:'charging', label:'充电设施覆盖', type:'select', options:[{v:'high',label:'高（公共充电普及）'},{v:'mid',label:'中'},{v:'low',label:'低（充电不便）'}]},
  {key:'power',    label:'动力类型',     type:'multi',  options:[{v:'bev',label:'BEV（纯电）'},{v:'ice',label:'ICE（燃油）'},{v:'hev',label:'HEV（混动）'},{v:'phev',label:'PHEV（插电混动）'},{v:'reve',label:'REVE（增程式）'},{v:'other',label:'其他'}]},
  {key:'drive',    label:'驾驶方向',     type:'select', options:[{v:'lhd',label:'左舵'},{v:'rhd',label:'右舵'}]},
  {key:'incentive',label:'补贴/税收政策',type:'select', options:[{v:'yes',label:'有显著补贴/税收优惠'},{v:'no',label:'无显著补贴'}]},
  {key:'finance',  label:'金融渗透率',   type:'select', options:[{v:'high',label:'高（贷款/分期普遍）'},{v:'low',label:'低（现金购车为主）'}]},
  {key:'usage',    label:'用车目的',     type:'select', options:[{v:'household',label:'家用（已有/计划家用购车）'},{v:'intend',label:'意向家用（潜在家用购车者）'},{v:'commercial',label:'商用（企业/ fleet /商务用途）'}]},
  {key:'ihvSource', label:'IHV样本来源', type:'select', options:[{v:'no_fgd',label:'未参加过FGD（完整入户深访）'},{v:'after_fgd',label:'参加过FGD后入户（少做重复测试）'}]}
];

/* 规则语义：命中规则 re 的板块，仅当所选条件满足 req（每个 key 的取值在允许列表内）时保留；
   条件留空（不限定）一律通过；power 为多选，与允许列表有交集即通过。任一条命中规则不满足 → 剔除该板块。
   fam = 「条件组:取值」；同一块若命中同一条件组下的多个不同取值（如既含纯电又含燃油表述的对比题），
   视为通用题，不做该组过滤（避免对比题在单动力研究中被误删）。附件(.instrument)为主持人参考工具，不过滤。 */
const COND_RULES = [
  /* 气候带 */
  {tag:'气候-热带',   fam:'climate:hot',  re:/高温|炎热|暴晒|防晒|遮阳|闷热|湿热|雨季|暴雨|台风|积水|洪涝/, req:{climate:['hot','temperate']}},
  {tag:'气候-寒冷',   fam:'climate:cold', re:/低温|寒冷|下雪|雪天|积雪|冰冻|结冰|冰面|寒潮|冬季续航|座椅加热|方向盘加热|除霜|防冻|雪地|暖风|暖气/, req:{climate:['cold','temperate']}},
  /* 路面 */
  {tag:'路况-较差',   fam:'roads:poor',   re:/烂路|坑洼|颠簸|泥泞|非铺装|土路|碎石|崎岖|越野|通过性|托底|磕底|破损路面|路况差/, req:{roads:['mixed','poor']}},
  /* 充电设施 */
  {tag:'充电-低覆盖', fam:'charging:low', re:/充电焦虑|找桩|排队充电|充电难|充电不便|充电桩(少|不足|不够|难找|缺乏)|补能焦虑|里程焦虑|续航焦虑/, req:{charging:['low','mid']}},
  /* 动力类型 */
  {tag:'动力-充电设施', fam:'power:bev,phev,reve', re:/充电桩|充电站|家充|快充|慢充|充电时间|充电(方便|便利|不便)|充电体验|充电频率|充电(习惯|方式)|实际续航|表显续航|电池(衰减|寿命|质保|安全|健康)/, req:{power:['bev','phev','reve']}},
  {tag:'动力-纯电',   fam:'power:bev', re:/纯电车型|纯电动|纯电小车|纯电车主|BEV|\bEV\b/, req:{power:['bev']}},
  {tag:'动力-纯电标记', fam:'power:bev', re:/【EV：|【EV:|【BEV】|【BEV：|BEV组|纯电组/, req:{power:['bev']}},
  {tag:'动力-HEV',   fam:'power:hev', re:/\bHEV\b|油电混合|普通混动|不插电混动|自充电混动/, req:{power:['hev']}},
  {tag:'动力-PHEV',  fam:'power:phev', re:/\bPHEV\b|插电混动|插混|插电式|插电混合/, req:{power:['phev']}},
  {tag:'动力-REVE',  fam:'power:reve', re:/\bREVE\b|增程|增程式|续航扩展|Range.?Extender/, req:{power:['reve']}},
  {tag:'动力-混动通用', fam:'power:hev,phev,reve', re:/混动|油电混合/, req:{power:['hev','phev','reve']}},
  {tag:'动力-燃油',   fam:'power:ice', re:/燃油车|燃油小车|燃油车型|纯燃油|汽油|柴油|乙醇|Flex-?Fuel|flex fuel|加油|油费|油耗|尾气|机油|发动机|变速箱|ICE/, req:{power:['ice']}},
  {tag:'动力-燃油标记', fam:'power:ice', re:/【ICE】|【ICE：|ICE组|燃油组/, req:{power:['ice']}},
  /* 驾驶方向 */
  {tag:'驾驶-右舵',   fam:'drive:rhd', re:/右舵|靠左行驶|左行(?!业)|右驾/, req:{drive:['rhd']}},
  {tag:'驾驶-左舵',   fam:'drive:lhd', re:/左舵|靠右行驶|左驾/, req:{drive:['lhd']}},
  /* 补贴/税收政策 */
  {tag:'政策-有补贴', fam:'incentive:yes', re:/补贴|Ecobonus|ecobonus|税收优惠|购置税(减免|优惠|免征)|IPI|IPVA|ICMS|政策(扶持|支持|激励|优惠)|激励政策/, req:{incentive:['yes']}},
  /* 金融渗透 */
  {tag:'金融-高渗透', fam:'finance:high', re:/贷款|分期|月供|首付|利率|金融(方案|产品|服务|政策)|融资租赁|车贷|联合购车基金|购车基金|信用贷|还款/, req:{finance:['high']}},
  {tag:'金融-低渗透', fam:'finance:low',  re:/全款|现金购车|一次性付款/, req:{finance:['low']}},
  /* 用车目的 */
  {tag:'用车-商用', fam:'usage:commercial', re:/采购|审批|签单|预算(审批|报批)|试用|fleet|车队|商务(用途|用车|出行)|商用|公司(采购|购车|用车|配车|户)|企业(采购|购车|用车|客户|用户)|公务用车|运营(成本|车辆|商)|网约车|出租|租赁|物流|配送|营运|公车|单位(购车|用车|配车)/, req:{usage:['commercial']}},
  {tag:'用车-家用', fam:'usage:household', re:/家用(车|购|出行|需求)|家庭(第二辆|第二台|增购|换购)/, req:{usage:['household','intend']}}
];

function condsActive(){
  const c = state.conds;
  return !!(c.climate||c.roads||c.charging||(c.power&&c.power.length)||c.drive||c.incentive||c.finance||c.usage||c.ihvSource||state.bodyType||state.segment);
}
function ruleKeeps(req){
  const c = state.conds;
  return Object.keys(req).every(k=>{
    const allow = req[k];
    if(k==='power'){
      const sel = c.power||[];
      if(!sel.length) return true; /* 全不选=不限定 */
      return sel.some(v=>allow.includes(v));
    }
    return !c[k] || allow.includes(c[k]);
  });
}
function filterByConds(content){
  if(!condsActive() || !content) return content;
  const tmp = document.createElement('div');
  tmp.innerHTML = content;
  /* 逐板块测试：题目 / 追问 / 分支（附件为主持人参考工具，不过滤） */
  tmp.querySelectorAll('li, .probe, .branch').forEach(el=>{
    /* 分支用标题匹配，避免内容中提及对立类型导致冲突误判 */
    const t = el.classList.contains('branch')
      ? ((el.querySelector('.bt')||{}).textContent || '')
      : (el.textContent || '');
    const matched = [];
    for(const r of COND_RULES){ if(r.re.test(t)) matched.push(r); }
    if(!matched.length) return;
    /* 同条件组多取值冲突 → 该组视为通用 */
    const grpSubs = {};
    matched.forEach(r=>{ if(r.fam){ const g = r.fam.split(':')[0]; (grpSubs[g] = grpSubs[g] || new Set()).add(r.fam.split(':')[1]); } });
    for(const r of matched){
      if(r.fam && (grpSubs[r.fam.split(':')[0]].size >= 2)) continue;
      if(!ruleKeeps(r.req)){ el.remove(); return; }
    }
  });
  /* 清理空壳：空 ul / 空 branch / 空小节标题 */
  tmp.querySelectorAll('ul.q').forEach(ul=>{ if(!ul.querySelector('li')) ul.remove(); });
  tmp.querySelectorAll('.branch').forEach(b=>{ if(!b.querySelector('.probe') && !b.querySelector('li')) b.remove(); });
  for(let i=0;i<2;i++){ /* 两轮，处理连续空标题链 */
    tmp.querySelectorAll('h5').forEach(h=>{
      const n = h.nextElementSibling;
      if(!n || /^(H3|H4|H5|HR)$/i.test(n.tagName)) h.remove();
    });
  }
  return tmp.innerHTML;
}
