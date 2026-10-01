import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const inputPath = fileURLToPath(new URL('./题库审定数据.json', import.meta.url));
const outputPath = fileURLToPath(new URL('../../js/data/bank-v3.js', import.meta.url));
const input = JSON.parse(await fs.readFile(inputPath, 'utf8'));

const merged = new Map();
for (const raw of input.questions) {
  const q = structuredClone(raw);
  if (!merged.has(q.id)) {
    merged.set(q.id, {
      id: q.id,
      audience: q.audience,
      view_section: q.view_section,
      chapter_label: q.chapter_label,
      priority: q.priority,
      gate: q.gate || 'all',
      material: q.material || null,
      condition: q.condition || '',
      variants: {}, methods: [], probes: q.probes || [],
      conditional_probes: q.conditional_probes || [], activity: q.activity || null,
    });
  }
  const target = merged.get(q.id);
  Object.assign(target.variants, q.variants || {});
  target.methods = [...new Set([...target.methods, ...(q.methods || [])])];
  if (q.audience === '2B' && !target.condition) target.condition = q.condition || '';
}

const questions = [...merged.values()];
for (const id of ['Q-E0-01','Q-E0-03']) {
  const q = questions.find(x=>x.id===id);
  if (!q) continue;
  q.variants.business = {text:id==='Q-E0-01'
    ? '今天我们想了解贵组织的车辆采购与实际使用经验。开始前先说明研究目的、记录方式和资料用途；您是否愿意参与？'
    : '关于贵组织的车辆采购和使用，还有哪些重要情况没有谈到？如果只保留三条建议，您希望我们记住什么？'};
  if (!q.methods.includes('business')) q.methods.push('business');
}
const byAudience = {
  C: input.questions.filter(q => q.audience === '2C'),
  B: input.questions.filter(q => q.audience === '2B'),
};

const moduleDefs = {
  FGD: [
    ['c1','C1','人群与车辆背景','生活、家庭、现有车辆和使用角色'],
    ['c2','C2','使用场景与体验','高频场景、当地条件、满意度和痛点'],
    ['c3','C3','购买旅程与考虑因素','购买触发、信息、考虑因素、支付和补贴'],
    ['c4','C4','动力与补能','动力认知、真实补能和续航底线'],
    ['c5','C5','产品与配置','概念、造型、空间、交互和配置取舍'],
    ['c6','C6','品牌与购买条件','品牌认知、价格、顾虑和卖点'],
  ],
  IHV: [
    ['c1','C1','家庭与车辆背景','家庭、车辆历史和使用角色'],
    ['c3','C3','购买旅程与考虑因素','时间线、候选、考虑因素、支付和补贴'],
    ['c2','C2','场景与实地观察','真实使用、停车、装载、满意度和痛点'],
    ['c4','C4','动力与补能观察','停车地点、充电条件、续航和补能习惯'],
    ['c5','C5','产品与配置验证','结合实车或材料验证产品与配置'],
    ['c6','C6','品牌与购买条件','品牌、价格、顾虑和转化条件'],
  ],
  Dealer: [
    ['b1','B1','受访者与机构背景','职责、机构和证据范围'],
    ['b2','B2','品牌市场与政策','竞争、销量、补贴和基础设施'],
    ['b3','B3','客户画像与用途','客户特征、车辆关系和典型用途'],
    ['b4','B4','成交与流失','购买触发、考虑因素、成交与顾虑'],
    ['b5','B5','产品需求与方案','客户需求、产品评价和本地适配'],
    ['b6','B6','价格版型与盈利','预算、金融、版型和经销商盈利'],
    ['b7','B7','渠道营销与服务','获客、渠道覆盖和售后体验'],
    ['b8','B8','品牌机会与策略','品牌形象、中国品牌和市场进入'],
  ],
  MPVMedia: [
    ['b1','B1','受访者与机构背景','媒体职责、平台、受众和证据范围'],
    ['b2','B2','品牌市场与政策','公开市场、竞争、补贴和政策信息'],
    ['b3','B3','受众画像与用途','仅在有受众研究或采访证据时使用'],
    ['b4','B4','购买认知与信息影响','传播、受众讨论和购买考虑因素'],
    ['b5','B5','产品评价与方案','试驾、测评和受众反馈'],
    ['b6','B6','公开价格与版型','公开价格信息和理解度'],
    ['b7','B7','传播渠道与服务口碑','传播反馈、渠道覆盖和公开口碑'],
    ['b8','B8','品牌机会与风险','品牌形象、中国品牌和公众信任'],
  ],
  MPVExpert: [
    ['b1','B1','受访者与机构背景','职责、专业范围和证据边界'],
    ['b2','B2','品牌市场与政策','竞争、规模、政策和基础设施'],
    ['b3','B3','客户画像与用途','用户研究、车辆关系和典型用途'],
    ['b4','B4','购买与流失机制','购买触发、考虑因素和障碍'],
    ['b5','B5','产品需求与方案','产品定义、工程和本地化证据'],
    ['b6','B6','价格版型与渠道经济性','预算、金融、版本和渠道策略'],
    ['b7','B7','渠道营销与服务','渠道能力、传播和服务体系'],
    ['b8','B8','品牌机会与策略','定位、中国品牌和进入条件'],
  ],
  BusinessOrg: [
    ['b9','B9','商务与组织采购','组织车辆的真实采购、使用、成本、产品及政策条件'],
  ],
};

const roleByType = {FGD:'owner', IHV:'owner', Dealer:'Dealer', MPVMedia:'Media', MPVExpert:'OEM', BusinessOrg:'business'};
const methodByType = {FGD:'FGD', IHV:'IHV', Dealer:'Dealer', MPVMedia:'Media', MPVExpert:'OEM', BusinessOrg:'business'};

function questionsFor(type, section) {
  const role = roleByType[type];
  const source = section.startsWith('C') ? byAudience.C : byAudience.B;
  return source.filter(q => q.view_section === section && q.variants && q.variants[role]);
}

function normalizeChapter(type, section, label) {
  let name = label || section;
  if ((type === 'FGD' || type === 'IHV') && name === '家庭／组织与生活背景') {
    name = '家庭与生活背景';
  }
  if (section === 'C3' && (name === '购车考虑因素' || name === '购车考虑因素与取舍')) {
    name = '购车考虑因素与取舍';
  }
  if (section === 'C5' && name === '外观体态、前脸与车尾') {
    name = '外观轮廓、前脸与车尾';
  }
  return name;
}

const maps = {};
for (const [type, defs] of Object.entries(moduleDefs)) {
  maps[type] = {};
  const role = roleByType[type];
  for (const [modId, section] of defs) {
    const groups = new Map();
    for (const q of questionsFor(type, section)) {
      const key = normalizeChapter(type, section, q.chapter_label);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(q.id);
    }
    maps[type][modId] = [...groups.entries()].map(([name, qids], index) => {
      const recommended = qids.some(id => input.questions.some(q => q.id === id && q.priority === 'core'));
      return {
        sid: `${section}.${index + 1}`,
        name,
        qids,
        relevance: recommended ? 'recommended' : 'optional',
        default_selected: recommended,
        role,
        minutes: type === 'FGD' ? 7 : type === 'IHV' ? 8 : 5,
      };
    });
  }
}

const typeMeta = {
  FGD:{label:'FGD 座谈会',labelEn:'Focus Group',short:'FGD',group:'2C 消费者访谈'},
  IHV:{label:'IHV 入户访谈',labelEn:'In-Home Visit',short:'IHV',group:'2C 消费者访谈'},
  Dealer:{label:'Dealer 经销商访谈',labelEn:'Dealer Interview',short:'Dealer',group:'2B 专业与组织访谈'},
  MPVMedia:{label:'媒体深访',labelEn:'Automotive Media Interview',short:'媒体',group:'2B 专业与组织访谈'},
  MPVExpert:{label:'主机厂专家深访',labelEn:'OEM Expert Interview',short:'主机厂专家',group:'2B 专业与组织访谈'},
  BusinessOrg:{label:'商务／组织采购者访谈',labelEn:'Business & Organization Buyer',short:'商务/组织',group:'2B 专业与组织访谈'},
};

const compactModules = Object.fromEntries(Object.entries(moduleDefs).map(([type, defs]) => [
  type,
  defs.map(([id,,name,desc], index) => ({id, name:`${index + 1}. ${name}`, en:name, desc, src:'汽车访谈题库 v3'})),
]));

const payload = {
  version:'3.0.0', status:'reviewed_role_split', stats:{questions:questions.length, consumer:byAudience.C.length, professional:byAudience.B.length},
  questions, maps, roles:roleByType, methods:methodByType, modules:compactModules, types:typeMeta,
};

// 应用逐题措辞审稿，避免重新生成时恢复旧问法；只覆盖文字，不改变题目结构。
const wordingPath = fileURLToPath(new URL('./措辞审稿覆盖.json', import.meta.url));
const wording = JSON.parse(await fs.readFile(wordingPath, 'utf8'));
for (const q of payload.questions) {
  const patch = wording.questions[q.id];
  if (!patch) continue;
  for (const field of ['chapter_label', 'condition', 'probes', 'conditional_probes', 'activity']) {
    if (Object.hasOwn(patch, field)) q[field] = structuredClone(patch[field]);
  }
  for (const [role, variant] of Object.entries(patch.variants || {})) {
    if (q.variants[role]) Object.assign(q.variants[role], structuredClone(variant));
  }
}
for (const [type, modules] of Object.entries(payload.modules)) {
  for (const mod of modules) {
    const reviewed = (wording.modules[type] || []).find(item => item.id === mod.id);
    if (reviewed) for (const field of ['name', 'en', 'desc']) mod[field] = reviewed[field];
  }
}
for (const [type, modules] of Object.entries(payload.maps)) {
  for (const [modId, subs] of Object.entries(modules)) {
    for (const sub of subs) {
      const reviewed = (wording.maps[type]?.[modId] || []).find(item => item.sid === sub.sid);
      if (reviewed) sub.name = reviewed.name;
    }
  }
}

const js = `// =========================================================\n// v3 角色化实题库 — 2C / 2B 独立结构\n// 来源：汽车访谈题库_2C与2B分角色修订版.xlsx\n// =========================================================\n\nconst BANK_V3 = ${JSON.stringify(payload)};\nconst V3_QByID = Object.fromEntries(BANK_V3.questions.map(q=>[q.id,q]));\nconst V3_SUB_MAP = BANK_V3.maps;\nconst V3_ROLE_BY_TYPE = BANK_V3.roles;\nconst V3_METHOD_BY_TYPE = BANK_V3.methods;\nconst V3_TYPES = Object.keys(BANK_V3.types);\n\nfunction v3CountryShell(){\n  return Object.fromEntries(COUNTRIES.map(c=>[c.code,{mods:{}}]));\n}\nV3_TYPES.forEach(type=>{\n  const meta = BANK_V3.types[type];\n  DATA[type] = { ...meta, modules:BANK_V3.modules[type], countries:v3CountryShell(), bankVersion:'3.0.0' };\n  STAGE_OF_TYPE[type] = 'pd';\n});\n`;

await fs.writeFile(outputPath, js, 'utf8');
console.log(JSON.stringify({outputPath, questions:questions.length, maps:Object.fromEntries(Object.entries(maps).map(([k,v])=>[k,Object.keys(v).length]))}, null, 2));
