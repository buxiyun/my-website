# 访谈提纲生成器 — Project Handover

## 一句话概述

模块化 Web 应用（已完成约 9550 行单文件重构，支持一键单文件打包），为广汽集团海外市场调研项目生成定性访谈提纲。支持 10 种研究类型、47 个国家、多条件动态替换、可视化编辑、PPT 版式画廊、Excel 导出。

**线上地址**: `theleapunion.com/internal/interview-outline/`（Supabase 登录保护）  
**主入口**: `/Users/xiyunbu/Documents/my-website/public/internal/interview-outline/index.html`  
**所属仓库**: `github.com:buxiyun/my-website`，部署在 Vercel（push to main 自动部署）  
**单文件打包工具**: `node scripts/bundle.js`（输出 `index.bundle.html`，100% 自包含）

---

## 架构总览

```
┌────────────────────────────────────────────────────────────────────────┐
│  模块化 Web 应用 (CSS / Data / Engine / Views / PPT / App 分离)        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌──────────┐   ┌───────────────────────────────────────────────────┐  │
│  │ Sidebar  │   │ Main Area                                         │  │
│  │ (330px)  │   │                                                   │  │
│  │          │   │  ┌─ 提纲预览 (outline) ─────────────────────────┐  │  │
│  │ Step 1-9 │   │  │  paper.innerHTML = buildOutlineHTML()        │  │  │
│  │ 研究类型 │   │  └──────────────────────────────────────────────┘  │  │
│  │ 国家选择 │   │                                                   │  │
│  │ 条件选择 │   │  ┌─ 议题树 (tree) ──────────────────────────────┐  │  │
│  │ 模块选择 │   │  │  paper.innerHTML = buildTreeHTML()            │  │  │
│  │ 车型配置 │   │  └──────────────────────────────────────────────┘  │  │
│  │ 对标车型 │   │                                                   │  │
│  │ 卖点配置 │   │  ┌─ PPT版式画廊 ────────────────────────────────┐  │  │
│  │ PPT设计  │   │  │  画廊 (pptGallery) + 组装条 + 内容编辑器     │  │  │
│  │          │   │  └──────────────────────────────────────────────┘  │  │
│  └──────────┘   └───────────────────────────────────────────────────┘  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 目录与模块划分

```
public/internal/interview-outline/
├── index.html                  ← 精简主入口（~190 行，引入样式与脚本）
├── index.bundle.html           ← 由 scripts/bundle.js 生成的单文件完整打包版本
├── css/
│   ├── main.css                ← 全局变量、重置、侧边栏Step 1-9 表单卡片、按钮
│   ├── outline.css             ← 提纲文档样式、条件标签、打印及富文本编辑态
│   └── ppt.css                 ← PPT 版式画廊卡片、组装条、幻灯片内容编辑器
├── js/
│   ├── data/
│   │   ├── countries.js        ← 47 国元数据与高频国标记、研究阶段与类型字典
│   │   ├── fgd.js              ← DATA.FGD（座谈会：巴西/意大利/印尼原始题库）
│   │   ├── ihv.js              ← DATA.IHV（入户访谈：巴西/意大利/印尼原始题库）
│   │   ├── dealer.js           ← DATA.Dealer（经销商深访：巴西/意大利/印尼原始题库）
│   │   ├── mpv.js              ← DATA.MPV* 系列（港泰MPV及47国主机厂/媒体专家深访）
│   │   └── bank-v2.js          ← BANK（v2 标准题库 JSON，180 题 / 45 子模块）
│   ├── engine/
│   │   ├── rules.js            ← COND_RULES 过滤规则库（动力/气候/路况等）
│   │   ├── v2-engine.js        ← v2 题库动态生成引擎（v2GenerateMods）
│   │   ├── localize.js         ← 车型术语库、MODEL_TERMS_S11、国家本地化（mpvLocalize、applyReplacements）
│   │   └── injector.js         ← injectConds（核心动态替换管道：气候/路况/卖点/配置/税制）
│   ├── views/
│   │   ├── header-gen.js       ← autoGenerateHeader（项目背景、研究目的与样本定义生成）
│   │   ├── outline.js          ← buildOutlineHTML（提纲主渲染）、render()
│   │   ├── tree.js             ← buildTreeHTML（议题树视图主渲染）
│   │   └── editor.js           ← captureEdits、toggleEditMode、导出处理（Word/HTML/JSON）
│   ├── ppt/
│   │   ├── ppt-layouts.js      ← PPT_LAYOUTS（25+ 种幻灯片版式字典定义）
│   │   ├── ppt-renderers.js    ← PPT_RENDERERS（PptxGenJS 幻灯片绘制渲染器）
│   │   └── ppt-ui.js           ← PPT 画廊交互、组装条与幻灯片内容编辑器
│   └── app.js                  ← 全局 state、侧边栏事件监听、初始化与控制器入口
├── scripts/
│   └── bundle.js               ← 一键单文件打包脚本（node scripts/bundle.js）
└── HANDOVER.md                 ← 本交接文档
```

---

## 核心数据结构

### `DATA` 对象（`js/data/` 目录）

```javascript
window.DATA = window.DATA || {};
DATA.FGD = {
  label: 'FGD 座谈会',        // 显示名
  labelEn: 'Focus Group',     // 英文名
  short: 'FGD',               // 缩写
  group: '...',               // 可选，分组标题（B端深访类型共享）
  hide: true/false,           // 可选，隐藏类型
  modules: [                  // 模块定义数组
    { id:'f1', name:'1. 人群画像', en:'Consumer Profile', desc:'...', src:'原模块一' }
  ],
  countries: {                // 按国家代码索引的内容
    BR: {
      cityName: '圣保罗',
      header: '<h1>...</h1><div class="docnote">...</div>...',  // 项目背景 HTML
      mods: {
        f1: '<h5>1.1 基本信息</h5><ul class="q"><li>...</li></ul><div class="probe">...</div>...',
        f2: '...',
        // ...
      }
    },
    IT: { ... },
    ID: { ... }
  }
};
```

**现有类型**（10个）:

| Key | 显示名 | 国家数 | group | hide | 所属文件 | 说明 |
|-----|--------|--------|-------|------|----------|------|
| `FGD` | FGD 座谈会 | 3 (BR/IT/ID) | — | — | `js/data/fgd.js` | 核心类型，三国原始数据 |
| `IHV` | IHV 入户访谈 | 3 (BR/IT/ID) | — | — | `js/data/ihv.js` | |
| `Dealer` | Dealer 经销商访谈 | 3 (BR/IT/ID) | B端深访 | — | `js/data/dealer.js` | 刚加入B端分组 |
| `MPVFGDJ` | MPV FGD 意向 | 2 (HK/TH) | — | ✅ | `js/data/mpv.js` | 隐藏 |
| `MPVFGDS` | MPV FGD 实际车主 | 2 (HK/TH) | — | ✅ | `js/data/mpv.js` | 隐藏 |
| `MPVFGDI` | MPV FGD 意向车主 | 2 (HK/TH) | — | ✅ | `js/data/mpv.js` | 隐藏 |
| `MPVIHV` | MPV IHV | 2 (HK/TH) | — | ✅ | `js/data/mpv.js` | 隐藏 |
| `MPVDealer` | MPV Dealer | 2 (HK/TH) | — | ✅ | `js/data/mpv.js` | 隐藏 |
| `MPVExpert` | 主机厂深访·竞品专家 | 47 (全部) | B端深访 | — | `js/data/mpv.js` | 运行时扩展到全部国家 |
| `MPVMedia` | 媒体深访·汽车媒体专家 | 47 (全部) | B端深访 | — | `js/data/mpv.js` | 运行时扩展到全部国家 |

**关键**: `MPVExpert`/`MPVMedia` 在 `js/data/mpv.js` 中将 `countries` 挂载为 47 国全量（共享同一 src 引用），题目文本通过 `mpvLocalize()` 按国家本地化。

### `state` 对象（`js/app.js`）

```javascript
const state = {
  stage: 'pd',           // 研究阶段: 'pd'|'pre'|'post'
  type: null,            // 当前选中类型 key (如 'FGD')
  countries: [],         // 选中的国家代码数组 (如 ['BR','IT'])
  countryCount: 1,       // 最大可选国家数（受类型可用国家数约束）
  mods: {},              // 模块选择状态 { f1:true, f2:false, ... }
  modOrder: [],          // 模块排序
  repModel: '',          // 替换车型文本
  repCountries: {},      // 各国替换名称 { BR: {name:'巴西',city:'圣保罗'}, ... }
  ownerType: 'both',     // 车主类型: 'bev'|'ice'|'both'
  segment: '',           // 级别: 'A00'|'A0'|'A'|...
  bodyType: '',          // 车身: '轿车'|'SUV'|...
  personnel: 'middle',   // 人群: 'middle'|'high'
  conds: {               // 7 项研究条件
    climate:'', roads:'', charging:'', power:[], drive:'', incentive:'', finance:'', usage:''
  },
  viewMode: 'outline',   // 'outline'|'tree'
  bevBench:'', iceBench:'', otherBench:'',  // 对标车型
  f5Subs:{},             // f5 子模块选择
  subs:{},               // 通用子模块选择
  sellingPoints:[],      // 5大卖点
  configItems:[]         // 配置评价项
};
```

---

## 核心管线（Rendering Pipeline）

### 提纲生成管线

```
用户选择条件 → render() → buildOutlineHTML()
                              │
                              ├─ 对每个选中国家:
                              │    ├─ autoGenerateHeader(cc, cinfo, cd)  → 项目背景
                              │    └─ 对每个选中模块:
                              │         ├─ filterByConds(mods[cc])      → 条件过滤
                              │         ├─ mpvLocalize(html, cc)        → MPV国家本地化（仅MPV类型）
                              │         ├─ applyReplacements(html)      → 车型/国家术语替换
                              │         └─ injectConds(html)            → 条件关键词注入
                              │
                              ├─ 全局编号（CSS counter）
                              ├─ 条件标签（tag）
                              └─ paper.innerHTML = result
```

### 替换管线顺序（极重要，不可调换）

```
filterByConds(raw)  →  mpvLocalize(raw, cc)  →  applyReplacements(filtered)  →  injectConds(replaced)
     ↑                      ↑                         ↑                              ↑
  条件过滤            MPV港泰→其他国家          车型术语→用户选择车型            条件词注入题目文本
 (COND_RULES)      (仅MPVExpert/MPVMedia)    (MODEL_TERMS→repModel等)      (climate/roads等→具体描述)
```

---

## 关键函数与文件索引

| 函数 | 文件路径 | 功能 |
|------|----------|------|
| `render()` | `js/views/outline.js` | 主渲染入口，调用 buildOutlineHTML 或 buildTreeHTML |
| `buildOutlineHTML()` | `js/views/outline.js` | 生成提纲视图 HTML |
| `buildTreeHTML()` | `js/views/tree.js` | 生成议题树视图 HTML |
| `filterByConds()` | `js/engine/rules.js` | COND_RULES 条件过滤 |
| `mpvLocalize()` | `js/engine/localize.js` | MPV 类型港泰→其他国家文本本地化 |
| `applyReplacements()` | `js/engine/localize.js` | 车型/国家术语替换 |
| `injectConds()` | `js/engine/injector.js` | 条件关键词注入 + 动态替换（最复杂） |
| `autoGenerateHeader()` | `js/views/header-gen.js` | 动态生成项目背景 |
| `syncCountriesToType()` | `js/app.js` | 类型切换时校正国家选择和 countryCount |
| `initCountryGrid()` | `js/app.js` | 渲染国家选择网格 |
| `toggleCountry()` | `js/app.js` | 国家选中/取消逻辑 |
| `initModList()` | `js/app.js` | 初始化模块选择列表 |
| `v2GenerateMods()` | `js/engine/v2-engine.js` | v2 JSON 引擎生成模块内容 |
| `captureEdits()` | `js/views/editor.js` | 捕获编辑模式修改 |
| `toggleEditMode()` | `js/views/editor.js` | 进入/退出编辑模式 |
| `cleanOutlineHTML()` | `js/views/editor.js` | 清理提纲导出 HTML（剥离编辑控件） |
| `cleanTreeHTML()` | `js/views/editor.js` | 清理议题树导出 HTML |
| `outlineExportHTML()` | `js/views/editor.js` | 导出用统一出口 |
| `exportOutlineJSON()` | `js/views/editor.js` | 导出结构化 JSON |
| `renderPPTGallery()` | `js/ppt/ppt-ui.js` | PPT 版式画廊渲染 |
| `renderContentEditor()` | `js/ppt/ppt-ui.js` | PPT 内容编辑器渲染 |
| `generatePPT()` | `js/ppt/ppt-renderers.js`| PptxGenJS PPT 生成出口 |
| `addHeader()` | `js/ppt/ppt-renderers.js`| PPT 幻灯片页眉（含 hypo） |

---

## 开发与部署流程

### 日常开发
- 直接在对应分类模块中编辑修改（如新增研究条件修改 `js/engine/rules.js`，修改题库去 `js/data/` 对应文件）。
- 本地浏览器直接双击打开 `index.html`（或经由 `npm run dev` 访问 `localhost:3000/internal/interview-outline/`）即可无缝调试。

### 单文件打包（如需独立分发或备份）
```bash
node public/internal/interview-outline/scripts/bundle.js
```
打包产物 `index.bundle.html` 自动生成在同一目录下，100% 内联，零外部依赖（除 PptxGenJS CDN）。

### 线上部署
```bash
git add .
git commit -m "feat/fix: xxx"
git push origin main
```
Vercel 检测到 main 分支提交将自动部署（~30秒）。

---

## 已知限制与状态

1. **单文件维护难（已解决）**：已拆解为 18 个模块文件，各层关注点分离，且支持随时反向打包为单文件。
2. **FGD/IHV/Dealer 仅 3 国**：BR/IT/ID 有原始数据，其他国家无内容（可参照 MPVExpert/MPVMedia 模式扩展）。
3. **MPV 隐藏类型**：5 个 MPV 消费端类型保持隐藏，仅 MPVExpert/MPVMedia 可见。
4. **编辑模式不跨配置**：修改条件后需重新生成，编辑内容按配置指纹存储。
5. **PPT 生成依赖 PptxGenJS CDN**：离线环境不可用。
