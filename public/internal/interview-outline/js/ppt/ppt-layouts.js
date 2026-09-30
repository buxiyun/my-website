// =========================================================
// PPT 版式设计系统 — 版式与分类定义
// =========================================================

/* ========== PPT 版式设计系统 ========== */
const PPT_COLORS = {primary:'12285E',brand:'1F5EFF',light:'E8EFFF',white:'FFFFFF',ink:'1A2233',ink2:'4A5568',ink3:'8892A6',green:'12805C',orange:'E8833A',bg:'F8FAFF'};

/* --- 版式定义 --- */
const PPT_LAYOUTS = [
  // ===== 开篇 =====
  {id:'cover-dark',cat:'opening',name:'深色封面',desc:'深色渐变背景 + 居中标题',
    thumb:'<div class="thumb-cover"><div class="t-title">报告标题</div><div class="t-line"></div><div class="t-sub">副标题 · 日期</div></div>',
    fields:[{k:'subtitle',l:'副标题',t:'text',ph:'消费者研究报告'},{k:'author',l:'作者/团队',t:'text'},{k:'date',l:'日期',t:'text'}]},
  {id:'cover-light',cat:'opening',name:'简约封面',desc:'白底 + 左侧蓝色竖线',
    thumb:'<div class="thumb-cover-left"><div class="t-accent"></div><div class="t-title">报告标题</div><div class="t-sub">副标题 · 日期</div></div>',
    fields:[{k:'subtitle',l:'副标题',t:'text'},{k:'author',l:'作者/团队',t:'text'},{k:'date',l:'日期',t:'text'}]},
  {id:'toc-grid',cat:'opening',name:'目录页',desc:'双列网格目录',
    thumb:'<div class="thumb-toc"><div class="toc-item"><div class="toc-num">01</div>章节一</div><div class="toc-item"><div class="toc-num">02</div>章节二</div><div class="toc-item"><div class="toc-num">03</div>章节三</div><div class="toc-item"><div class="toc-num">04</div>章节四</div></div>',
    fields:[{k:'items',l:'目录项（每行一个章节名）',t:'bullets',count:6}]},
  // ===== 章节 =====
  {id:'divider-num',cat:'section',name:'章节分隔页',desc:'蓝色渐变 + 大数字',
    thumb:'<div class="thumb-divider"><div class="t-num">01</div><div class="t-text">章节标题</div></div>',
    fields:[{k:'subtitle',l:'章节副标题',t:'text'}]},
  {id:'quote-page',cat:'section',name:'金句/引言页',desc:'深色背景 + 引用文字',
    thumb:'<div class="thumb-quote"><div class="q-mark">"</div><div class="q-text">核心洞察引言</div></div>',
    fields:[{k:'quote',l:'引用文字',t:'textarea',ph:'填入核心洞察或受访者金句'},{k:'source',l:'来源',t:'text'}]},
  // ===== 内容 =====
  {id:'summary-bullets',cat:'content',name:'执行摘要',desc:'标题 + 要点列表',
    thumb:'<div class="thumb-summary"><div class="s-head">Executive Summary</div><div class="s-item"><div class="s-dot"></div>核心发现一</div><div class="s-item"><div class="s-dot"></div>核心发现二</div><div class="s-item"><div class="s-dot"></div>核心发现三</div></div>',
    fields:[{k:'points',l:'核心发现',t:'bullets',count:5}]},
  {id:'summary-cards',cat:'content',name:'摘要卡片',desc:'网格卡片式摘要',
    thumb:'<div class="thumb-cards"><div class="mc"><div class="mc-val">01</div><div class="mc-label">发现一</div></div><div class="mc"><div class="mc-val">02</div><div class="mc-label">发现二</div></div><div class="mc"><div class="mc-val">03</div><div class="mc-label">发现三</div></div><div class="mc"><div class="mc-val">04</div><div class="mc-label">发现四</div></div></div>',
    fields:[{k:'cards',l:'摘要卡片',t:'cards',items:[{k:'c1',l:'要点一'},{k:'c2',l:'要点二'},{k:'c3',l:'要点三'},{k:'c4',l:'要点四'},{k:'c5',l:'要点五'},{k:'c6',l:'要点六'}]}]},
  {id:'persona',cat:'content',name:'用户画像',desc:'左侧头像区 + 右侧信息',
    thumb:'<div class="thumb-persona"><div class="p-left"><div class="p-avatar"></div></div><div class="p-right"><div class="p-row"></div><div class="p-row"></div><div class="p-row"></div><div class="p-row"></div></div></div>',
    fields:[{k:'name',l:'画像名称',t:'text',ph:'如：城市新中产'},{k:'profile',l:'基本信息',t:'kv',keys:['年龄','家庭','职业','收入']},{k:'needs',l:'用车需求',t:'textarea'},{k:'painPoints',l:'核心痛点',t:'textarea'},{k:'motivation',l:'购车动机',t:'textarea'}]},
  {id:'product-proscons',cat:'content',name:'产品评估',desc:'好评/槽点/建议三栏',
    thumb:'<div class="thumb-cols"><div class="col"><div class="col-head" style="background:#e6f7ef;color:#12805C">好评</div><div class="col-item">· 优点一</div><div class="col-item">· 优点二</div></div><div class="col"><div class="col-head" style="background:#fef2f2;color:#dc2626">槽点</div><div class="col-item">· 槽点一</div><div class="col-item">· 槽点二</div></div><div class="col"><div class="col-head" style="background:#e8efff;color:#1f5eff">建议</div><div class="col-item">· 建议一</div><div class="col-item">· 建议二</div></div></div>',
    fields:[{k:'pros',l:'用户好评',t:'bullets',count:4},{k:'cons',l:'用户槽点',t:'bullets',count:4},{k:'suggestions',l:'改进建议',t:'bullets',count:4}]},
  {id:'data-big',cat:'content',name:'数据大数字',desc:'大号数字 + 标签',
    thumb:'<div class="thumb-cards"><div class="mc"><div class="mc-val" style="font-size:14px">2.1%</div><div class="mc-label">GDP增速</div></div><div class="mc"><div class="mc-val" style="font-size:14px">48M</div><div class="mc-label">人口</div></div><div class="mc"><div class="mc-val" style="font-size:14px">310K</div><div class="mc-label">年销量</div></div><div class="mc"><div class="mc-val" style="font-size:14px">8.2%</div><div class="mc-label">BEV渗透率</div></div></div>',
    fields:[{k:'cards',l:'数据卡片',t:'cards',items:[{k:'d1',l:'指标一'},{k:'d2',l:'指标二'},{k:'d3',l:'指标三'},{k:'d4',l:'指标四'}]},{k:'source',l:'数据来源',t:'text'}]},
  {id:'compare-lr',cat:'content',name:'左右对比',desc:'两栏对比布局',
    thumb:'<div class="thumb-cols"><div class="col"><div class="col-head" style="background:#e8efff;color:#1f5eff">方案 A</div><div class="col-item">· 特点一</div><div class="col-item">· 特点二</div><div class="col-item">· 特点三</div></div><div class="col"><div class="col-head" style="background:#fff3e6;color:#e8833a">方案 B</div><div class="col-item">· 特点一</div><div class="col-item">· 特点二</div><div class="col-item">· 特点三</div></div></div>',
    fields:[{k:'leftTitle',l:'左栏标题',t:'text'},{k:'leftPoints',l:'左栏要点',t:'bullets',count:4},{k:'rightTitle',l:'右栏标题',t:'text'},{k:'rightPoints',l:'右栏要点',t:'bullets',count:4}]},
  {id:'list-icon',cat:'content',name:'图标列表',desc:'编号要点列表',
    thumb:'<div class="thumb-summary"><div class="s-head">关键要点</div><div class="s-item"><div class="s-dot"></div>要点描述一</div><div class="s-item"><div class="s-dot"></div>要点描述二</div><div class="s-item"><div class="s-dot"></div>要点描述三</div><div class="s-item"><div class="s-dot"></div>要点描述四</div></div>',
    fields:[{k:'items',l:'要点列表',t:'bullets',count:6}]},
  {id:'scenario-usage',cat:'content',name:'场景使用',desc:'用车场景卡片网格',
    thumb:'<div class="thumb-grid"><div class="sc-card"><div class="sc-bar" style="background:#12285e"></div><div class="sc-title">日常通勤</div><div class="sc-desc">城市代步</div></div><div class="sc-card"><div class="sc-bar" style="background:#1f5eff"></div><div class="sc-title">家庭出行</div><div class="sc-desc">周末出游</div></div><div class="sc-card"><div class="sc-bar" style="background:#12805c"></div><div class="sc-title">商务接待</div><div class="sc-desc">正式场合</div></div><div class="sc-card"><div class="sc-bar" style="background:#e8833a"></div><div class="sc-title">长途自驾</div><div class="sc-desc">假期远行</div></div></div>',
    fields:[{k:'scenes',l:'场景（每行：场景名 | 描述 | 关键特征）',t:'textarea',ph:'日常通勤 | 城市代步 | 油耗低、好停车\n家庭出行 | 周末出游 | 空间大、安全性高\n商务接待 | 正式场合 | 外观大气、品牌感强\n长途自驾 | 假期远行 | 续航长、舒适性好'},{k:'insight',l:'场景洞察',t:'textarea',ph:'核心使用场景及对应产品卖点'}]},
  // ===== 分析 =====
  {id:'journey-timeline',cat:'analysis',name:'购买旅程',desc:'时间轴 + 触点/障碍/驱动',
    thumb:'<div class="thumb-timeline"><div class="tl-line"></div><div class="tl-node"><div class="tl-dot"></div><div class="tl-label">认知</div></div><div class="tl-node"><div class="tl-dot"></div><div class="tl-label">考虑</div></div><div class="tl-node"><div class="tl-dot"></div><div class="tl-label">体验</div></div><div class="tl-node"><div class="tl-dot"></div><div class="tl-label">决策</div></div><div class="tl-node"><div class="tl-dot"></div><div class="tl-label">购后</div></div></div>',
    fields:[{k:'stages',l:'旅程阶段',t:'journey',items:['认知','考虑','体验','决策','购后']}]},
  {id:'competitor-matrix',cat:'analysis',name:'竞品矩阵',desc:'多维度对比表格',
    thumb:'<div class="thumb-table"><div class="th-row head"><div class="th-cell">维度</div><div class="th-cell">品牌A</div><div class="th-cell">品牌B</div></div><div class="th-row"><div class="th-cell">定位</div><div class="th-cell">★★★</div><div class="th-cell">★★☆</div></div><div class="th-row"><div class="th-cell">价格</div><div class="th-cell">★★☆</div><div class="th-cell">★★★</div></div></div>',
    fields:[{k:'dimensions',l:'对比维度（每行一个）',t:'textarea',ph:'品牌定位\n核心优势\n价格区间\n渠道覆盖'},{k:'insight',l:'竞争洞察',t:'textarea'}]},
  {id:'country-compare',cat:'analysis',name:'多国对比',desc:'多国横向并排对比',
    thumb:'<div class="thumb-cols"><div class="col"><div class="col-head" style="background:#12285e;color:#fff">巴西</div><div class="col-item">· 要点一</div><div class="col-item">· 要点二</div><div class="col-item">· 要点三</div></div><div class="col"><div class="col-head" style="background:#1f5eff;color:#fff">印度</div><div class="col-item">· 要点一</div><div class="col-item">· 要点二</div><div class="col-item">· 要点三</div></div><div class="col"><div class="col-head" style="background:#12805c;color:#fff">印尼</div><div class="col-item">· 要点一</div><div class="col-item">· 要点二</div><div class="col-item">· 要点三</div></div></div>',
    fields:[{k:'countries',l:'国家列表（每行一个国家）',t:'textarea',ph:'巴西\n印度\n印尼'},{k:'dimension',l:'对比维度',t:'text',ph:'如：市场特征、消费者偏好'},{k:'data',l:'各国数据（每行：国家 | 数据）',t:'textarea',ph:'巴西 | 年轻消费者占比高\n印度 | 价格敏感度高\n印尼 | SUV偏好明显'},{k:'insight',l:'跨国洞察',t:'textarea'}]},
  {id:'category-needs',cat:'analysis',name:'品类需求',desc:'消费需求层级与优先级',
    thumb:'<div class="thumb-needs"><div class="need-row"><div class="need-label">功能需求</div><div class="need-bar" style="width:90%;background:#12285e"></div></div><div class="need-row"><div class="need-label">情感需求</div><div class="need-bar" style="width:70%;background:#1f5eff"></div></div><div class="need-row"><div class="need-label">社交需求</div><div class="need-bar" style="width:50%;background:#12805c"></div></div><div class="need-row"><div class="need-label">身份认同</div><div class="need-bar" style="width:35%;background:#e8833a"></div></div></div>',
    fields:[{k:'category',l:'品类名称',t:'text',ph:'如：紧凑型SUV、纯电动轿车'},{k:'needs',l:'需求层级（每行：需求类型 | 重要度1-10 | 描述）',t:'textarea',ph:'功能需求 | 8 | 省油、空间大、可靠性高\n情感需求 | 6 | 驾驶乐趣、科技感\n社交需求 | 5 | 面子、品牌认同\n身份认同 | 4 | 环保理念、新中产标签'},{k:'priority',l:'优先级排序（从高到低）',t:'textarea',ph:'1. 经济实用性\n2. 安全配置\n3. 智能互联'},{k:'insight',l:'需求洞察',t:'textarea',ph:'消费者核心诉求与未满足需求'}]},
  {id:'strategy-4p',cat:'analysis',name:'营销策略',desc:'4P 四象限',
    thumb:'<div class="thumb-strategy"><div class="sg-item"><div class="sg-label">Product</div><div class="sg-desc">产品策略</div></div><div class="sg-item"><div class="sg-label">Price</div><div class="sg-desc">价格策略</div></div><div class="sg-item"><div class="sg-label">Place</div><div class="sg-desc">渠道策略</div></div><div class="sg-item"><div class="sg-label">Promotion</div><div class="sg-desc">传播策略</div></div></div>',
    fields:[{k:'product_s',l:'产品策略 Product',t:'textarea'},{k:'price_s',l:'价格策略 Price',t:'textarea'},{k:'channel_s',l:'渠道策略 Place',t:'textarea'},{k:'comm_s',l:'传播策略 Promotion',t:'textarea'}]},
  {id:'config-table',cat:'analysis',name:'配置表格',desc:'配置优先级排序表',
    thumb:'<div class="thumb-table"><div class="th-row head"><div class="th-cell">排名</div><div class="th-cell">配置项</div><div class="th-cell">关注度</div></div><div class="th-row"><div class="th-cell">1</div><div class="th-cell">全景影像</div><div class="th-cell">★★★★★</div></div><div class="th-row"><div class="th-cell">2</div><div class="th-cell">侧气囊</div><div class="th-cell">★★★★☆</div></div><div class="th-row"><div class="th-cell">3</div><div class="th-cell">氛围灯</div><div class="th-cell">★★★☆☆</div></div></div>',
    fields:[{k:'note',l:'备注说明',t:'text',ph:'配置优先级基于消费者调研数据'},{k:'items',l:'配置项（每行：配置名 | 关注度）',t:'textarea',ph:'全景影像 | ★★★★★\n侧气囊 | ★★★★☆\n氛围灯 | ★★★☆☆'}]},
  // ===== 定量数据 =====
  {id:'data-bar',cat:'data',name:'数据排名',desc:'水平条形排名图（支持1-3国对比）',
    thumb:'<div class="thumb-dbar"><div class="db-row"><div class="db-lab">项目A</div><div class="db-track"><div class="db-fill" style="width:85%;background:#12285e"></div></div></div><div class="db-row"><div class="db-lab">项目B</div><div class="db-track"><div class="db-fill" style="width:70%;background:#1f5eff"></div></div></div><div class="db-row"><div class="db-lab">项目C</div><div class="db-track"><div class="db-fill" style="width:55%;background:#12805c"></div></div></div><div class="db-row"><div class="db-lab">项目D</div><div class="db-track"><div class="db-fill" style="width:40%;background:#e8833a"></div></div></div></div>',
    hasCountries:true, defaultRows:6,
    fields:[{k:'source',l:'数据来源',t:'text',ph:'Q: 您最看重的因素是什么？(N=300)'},{k:'insight',l:'数据洞察',t:'textarea',ph:'核心发现与解读'}]},
  {id:'data-table',cat:'data',name:'数据表格',desc:'百分比数据对比表（支持1-3国对比）',
    thumb:'<div class="thumb-dtable"><div class="dt-row"><div class="dt-cell">指标</div><div class="dt-cell">巴西</div><div class="dt-cell">印度</div></div><div class="dt-row"><div class="dt-cell">品牌A</div><div class="dt-cell">45%</div><div class="dt-cell">38%</div></div><div class="dt-row"><div class="dt-cell">品牌B</div><div class="dt-cell">32%</div><div class="dt-cell">28%</div></div><div class="dt-row"><div class="dt-cell">品牌C</div><div class="dt-cell">18%</div><div class="dt-cell">25%</div></div></div>',
    hasCountries:true, defaultRows:5,
    fields:[{k:'source',l:'数据来源',t:'text',ph:'数据来源说明'},{k:'insight',l:'数据洞察',t:'textarea',ph:'核心发现与解读'}]},
  {id:'data-stacked',cat:'data',name:'堆叠构成',desc:'100%堆叠条形图展示构成比例（支持1-3国对比）',
    thumb:'<div class="thumb-dstacked"><div class="ds-row"><div class="ds-lab">品牌A</div><div class="ds-bar"><div class="ds-seg" style="width:40%;background:#12285e"></div><div class="ds-seg" style="width:35%;background:#1f5eff"></div><div class="ds-seg" style="width:25%;background:#12805c"></div></div></div><div class="ds-row"><div class="ds-lab">品牌B</div><div class="ds-bar"><div class="ds-seg" style="width:30%;background:#12285e"></div><div class="ds-seg" style="width:45%;background:#1f5eff"></div><div class="ds-seg" style="width:25%;background:#e8833a"></div></div></div><div class="ds-row"><div class="ds-lab">品牌C</div><div class="ds-bar"><div class="ds-seg" style="width:55%;background:#12285e"></div><div class="ds-seg" style="width:20%;background:#1f5eff"></div><div class="ds-seg" style="width:25%;background:#12805c"></div></div></div></div>',
    hasCountries:true, defaultRows:5,
    fields:[{k:'segLabels',l:'分段标签（逗号分隔）',t:'text',ph:'非常满意,满意,不满意'},{k:'source',l:'数据来源',t:'text',ph:'数据来源说明'},{k:'insight',l:'数据洞察',t:'textarea',ph:'核心发现与解读'}]},
  {id:'data-grouped',cat:'data',name:'分组柱图',desc:'分组柱状图多国对比（支持1-3国对比）',
    thumb:'<div class="thumb-dgrouped"><div class="dg-group"><div class="dg-bar" style="height:24px;background:#12285e"></div><div class="dg-bar" style="height:18px;background:#1f5eff"></div><div class="dg-bar" style="height:20px;background:#12805c"></div></div><div class="dg-group"><div class="dg-bar" style="height:16px;background:#12285e"></div><div class="dg-bar" style="height:22px;background:#1f5eff"></div><div class="dg-bar" style="height:12px;background:#12805c"></div></div><div class="dg-group"><div class="dg-bar" style="height:20px;background:#12285e"></div><div class="dg-bar" style="height:14px;background:#1f5eff"></div><div class="dg-bar" style="height:18px;background:#12805c"></div></div></div>',
    hasCountries:true, defaultRows:5,
    fields:[{k:'source',l:'数据来源',t:'text',ph:'数据来源说明'},{k:'insight',l:'数据洞察',t:'textarea',ph:'核心发现与解读'}]},
  // ===== 结尾 =====
  {id:'conclusion',cat:'closing',name:'结论建议',desc:'发现 + 建议 + 下一步',
    thumb:'<div class="thumb-summary"><div class="s-head">结论与建议</div><div class="s-item"><div class="s-dot" style="background:#12805C"></div>核心发现</div><div class="s-item"><div class="s-dot" style="background:#e8833a"></div>战略建议</div><div class="s-item"><div class="s-dot" style="background:#1f5eff"></div>下一步行动</div></div>',
    fields:[{k:'findings',l:'核心发现',t:'textarea'},{k:'strategy',l:'战略建议',t:'textarea'},{k:'nextSteps',l:'下一步行动',t:'textarea'}]},
  {id:'thanks',cat:'closing',name:'致谢页',desc:'深色背景 + Thank You',
    thumb:'<div class="thumb-thanks"><div class="th-text">Thank You</div><div class="th-sub">联系方式 · 日期</div></div>',
    fields:[{k:'contact',l:'联系方式',t:'text'},{k:'date',l:'日期',t:'text'}]}
];

const PPT_CATS = [
  {id:'opening',name:'开篇版式',icon:'🎬'},
  {id:'section',name:'章节版式',icon:'🔖'},
  {id:'content',name:'内容版式',icon:'📄'},
  {id:'analysis',name:'分析版式',icon:'📊'},
  {id:'data',name:'定量数据',icon:'📈'},
  {id:'closing',name:'结尾版式',icon:'✅'}
];

let pptSlides = [];
let pptEditIdx = -1;
let pptViewActive = false;

