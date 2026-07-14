/* ============================================================
   TLU Insights / 观点 — your viewpoints & blog.

   👉 TO ADD A NEW ARTICLE: copy one { ... } block below, put it at
   the TOP of the array (newest first), and fill in the fields.

   - slug:    a short url-safe id (letters, numbers, hyphens). Must be unique.
   - date:    "YYYY-MM-DD"
   - tag:     short label (e.g. Perspective / 观点, Audio / 音频)
   - title:   the headline
   - excerpt: 1–2 sentence summary shown on the list page
   - body:    an array of paragraphs. Each string is one paragraph.
              Start a string with "## " to make it a sub-heading.
              (Leave body as [] if the article is audio-only.)
   - audio:   OPTIONAL list of audio clips. Each clip has a bilingual
              title and a `src` pointing to a file in /public/audio/.
              To add audio: drop the .mp3 in public/audio/ and reference
              it here as "/audio/your-file.mp3".

   Fill BOTH the _en (English) and _zh (中文) fields. If you only have
   one language, paste the same text into both for now.
   ============================================================ */

export type AudioClip = {
  title_en: string;
  title_zh: string;
  src: string;
};

export type Post = {
  slug: string;
  date: string;
  tag_en: string;
  tag_zh: string;
  title_en: string;
  title_zh: string;
  excerpt_en: string;
  excerpt_zh: string;
  body_en: string[];
  body_zh: string[];
  audio?: AudioClip[];
};

export const posts: Post[] = [
  {
    slug: "pet-smart-emotional-consumption-playbook",
    date: "2026-07-14",
    tag_en: "Perspective · Consumer",
    tag_zh: "观点 · 消费",
    title_en:
      "Not Selling Hardware, Selling Bonds: A Brand Playbook for the Pet Smart and Emotional Consumption Sector",
    title_zh:
      "不是卖硬件，是卖情感连接——宠物智能与情绪消费赛道的品牌打法",
    excerpt_en:
      "The pet smart hardware and emotional consumption sector is a structural growth opportunity driven by pet humanization and AI cost reduction — the winning playbook is to go narrow on health data, build trust through authentic content, and design for global from day one.",
    excerpt_zh:
      "宠物智能与情绪消费赛道的本质不是「卖硬件」，而是用健康数据闭环承载情感连接——胜出品牌的共性打法是先做窄做深、用真实内容建信任、从第一天就为全球化设计。",
    body_en: [
      "The pet smart hardware and emotional consumption products sector is one of the most underrated consumer tracks of the decade. Beneath the surface of market data lies a clear signal: consumers are not paying for 'smart' — they are paying for 'emotional bonds.' Pet humanization, the loneliness economy, and AI cost reductions have converged to unlock a structural growth cycle. The brands that ultimately win will not be those that pile on features, but those that transform fragmented hardware sales into closed-loop emotional data ecosystems.",
      "## Market & Landscape",
      "The global pet tech market was valued at USD 7.63 billion in 2024 and is projected to reach USD 17.25 billion by 2030, with a CAGR of approximately 14.6%. The companion robot sub-segment, valued at USD 480 million in 2025, is expected to nearly triple to USD 1.5 billion by 2030. North America accounts for over 37% of global pet tech revenue, but Asia-Pacific is the fastest-growing region. This is a classic 'scale in the West, speed in the East' dynamic.",
      "China's pet economy tells an even more compelling story. The urban pet consumer market reached RMB 300.2 billion in 2024, up 7.5% year-on-year, with 121 million pet dogs and cats. Yet pet ownership penetration stands at only 22%, compared to 70% in the US and 28% in Japan. The smart product penetration rate is even lower, placing China firmly in the early-to-mid growth stage. During the 2025 618 shopping festival, smart feeder sales surged 230% and smart litter boxes jumped 140% — these are not marginal improvements but explosive category creation signals.",
      "On the AI emotional toy front, China's AI toy sector generated RMB 24.6 billion in 2024, with policy targets exceeding RMB 100 billion by 2027. This emerging intersection of pet tech and emotional AI is producing entirely new product categories — from robotic companions with facial recognition to AI-driven health monitoring ecosystems — that blur the line between pet hardware and emotional wellness devices.",
      "The competitive landscape remains highly fragmented. China's smart pet products market reached approximately RMB 10.2 billion in 2024, with no single dominant player. Three camps are converging: domestic specialist brands (PETKIT, Homerun Tech, CATLINK, Petton), cross-sector tech and home appliance giants (Xiaomi, Haier, Panasonic, OPPO — though Midea's exit shows this path is far from guaranteed), and established overseas brands like PetSafe. The median annual consumer spend falls in the RMB 501–2,000 range (55.6% of buyers), while core smart product prices have collapsed from nearly USD 1,000 to USD 200–300 due to intensifying price competition.",
      "## Brand Development Paths & Cases",
      "Two brands offer the clearest blueprint for success in this sector: PETKIT and CATLINK. Their trajectories share a common spine — single-product breakthrough, deep iteration to build defensibility, health data ecosystem extension, and global scaling — but diverge meaningfully in execution.",
      "PETKIT, founded around 2013, started with smart feeders and water fountains. After a USD 20 million Series C led by Qiming Venture Partners in 2019, the brand made a series of instructive missteps: aggressive trade show presence with unclear ROI, a rapid offline store rollout that collided with price wars, and failed category experiments with smart aquariums and drying boxes. The turning point was a strategic pivot to 'go narrow' — focusing on three core SKUs and building a closed loop around feline urinary health spanning feeding, hydration, excretion, and diagnostic testing. Their smart wet food feeder, which required years of R&D to solve freshness preservation, exemplifies this depth-first approach. Today, PETKIT's overseas revenue accounts for a dominant share, driven by TikTok social commerce, multi-market DTC storefronts, and crowdfunding campaigns, with each market deeply localized for language, currency, payment, and logistics.",
      "CATLINK took a different angle, launching with the 'cat internet of things' concept before narrowing to smart litter boxes as its core category. Its differentiation lies in AI-powered multi-cat identity recognition via facial scanning, enabling precise per-cat health monitoring — from automatic cleaning and odor control to early detection of urinary diseases. On the commercialization side, CATLINK covers 31 countries through an asset-light distributor model. In Southeast Asian markets like Thailand and Malaysia, products priced at RMB 2,500–4,000 still achieve monthly sales exceeding 1,000 units on Shopee and Lazada. Domestically, CATLINK's Xiaohongshu strategy is notable for deploying 'low-ad-feel' authentic user experience content rather than polished brand campaigns.",
      "Both cases reveal a shared logic: mid-to-premium positioning to avoid the price war trap, obsessive product iteration over feature sprawl, and a channel strategy that treats overseas not as an afterthought but as a core growth engine from day one.",
      "## Consumers & Trends",
      "The core consumer profile is unmistakable: Millennials and Gen-Z (post-90s and post-00s) account for nearly 70% of smart pet product buyers, concentrated in tier-1 and tier-2 cities. For this cohort, pets are family members — over half of pet owners have renovated their living spaces to accommodate pets, and over 40% celebrate pet birthdays. This is not pet ownership; it is pet kinship.",
      "The demand structure is shifting from 'keeping pets alive' to 'precision health management': targeted nutrition, disease early screening, and behavioral monitoring are now baseline expectations. The market for smart pet products in China grew from RMB 2.9 billion in 2018 to RMB 5.3 billion in 2024, and is projected to reach approximately RMB 6.5 billion by 2026. Pet insurance premiums surged 51.3% year-on-year in the first half of 2025, signaling readiness for hardware-insurance-medical service bundles.",
      "However, serious friction points persist. 'Pseudo-tech' marketing — such as fecal analysis cameras that cannot see through cat litter, or human-derived health metrics that ignore species-specific biology — is eroding consumer trust. Fragmented multi-brand app ecosystems force users to juggle incompatible platforms, and frequent device false alarms generate 'data anxiety' severe enough to send owners on unnecessary veterinary visits. Data privacy risks remain largely unaddressed, with no clear standards for pet health data ownership or cross-border transfer.",
      "Content-wise, Xiaohongshu has become the sector's decisive battleground, with 165 million pet-interested users by mid-2025. The platform's content strategy is evolving from anthropomorphic 'pet as baby' narratives toward 'pet as pet' — respecting species-specific needs. Cross-industry entrants (Shuanghui, Three Squirrels, Adidas, Louis Vuitton) are flooding the space, compressing margins for undifferentiated players.",
      "## Methodology",
      "Based on the patterns observed across PETKIT, CATLINK, and emerging players, the following five-step brand playbook distills the repeatable methodology for winning in the pet smart and emotional consumption sector.",
      "Step 1: Anchor in pet health data, not gadget features. The winning products in this space are not 'smart' for smart's sake — they generate actionable health insights. CATLINK's facial recognition for multi-cat households and PETKIT's urinary health closed loop both succeed because they convert hardware into a data-generating health platform. Principle: every product decision should answer 'what health signal does this capture, and what action does it enable?'",
      "Step 2: Go narrow before going wide. PETKIT's painful experience with premature category expansion (smart aquariums, drying boxes, aggressive offline stores) and its subsequent recovery through strategic focus is the sector's most valuable cautionary tale. Resist the temptation to build a 'pet ecosystem' before dominating one health-relevant category. Principle: own one node of the feeding-hydration-excretion-monitoring chain so thoroughly that expansion becomes a pull from users, not a push from the brand.",
      "Step 3: Build trust through authentic content, not brand noise. CATLINK's Xiaohongshu playbook — low-ad-feel, real-user experience posts — consistently outperforms polished campaigns in this sector. The reason is structural: pet owners trust other pet owners more than brands, especially when 'pseudo-tech' skepticism is rising. Xiaohongshu's four-step method (break category, break scenario, break path, break audience) provides a replicable content framework. Principle: invest in community UGC and creator partnerships that feel indistinguishable from organic sharing.",
      "Step 4: Design for global from day one. Both PETKIT and CATLINK treat international markets as primary, not secondary. The go-to-market sequence is: crowdfunding for validation (Kickstarter/Indiegogo) → Amazon for scale → DTC independent sites for margin → local platforms (Shopee, Lazada, regional marketplaces) for penetration. Each market requires deep localization: language, currency, payment methods, logistics, and compliance. Principle: engineer products with global certifications and multi-region compliance in mind from the first prototype.",
      "Step 5: Position at mid-to-premium and defend it. The data is unambiguous: 55.6% of consumers spend RMB 501–2,000 annually, and the most successful brands (PETKIT, CATLINK) maintain premium pricing even in price-competitive channels like Southeast Asian e-commerce. The race to USD 200–300 smart products is a losing game for everyone except the consumer. Principle: premium pricing is sustainable only when paired with continuous product iteration and genuine health utility — cut corners on either, and you join the price war.",
      "## Conclusions & Judgments",
      "Three high-conviction calls for the next 12–24 months. First, the convergence of AI emotion sensing, health monitoring, and pet insurance will create a new category — 'pet health intelligence platforms' — that commands significantly higher lifetime value than standalone hardware. Brands that integrate device data with veterinary services and insurance underwriting will capture disproportionate value.",
      "Second, unified app ecosystems and open protocols will become the primary competitive moat. The current fragmentation of incompatible brand apps is the sector's most visible pain point, and the first brand (or consortium) to establish an open pet health data standard will effectively own the platform layer.",
      "Third, the 'pseudo-tech' trust crisis is the sector's largest systemic risk. Consumer protection agencies are already scrutinizing exaggerated claims, and a single viral incident — a smart device malfunction causing pet injury, or a data privacy breach — could trigger regulatory backlash that damages the entire category. Brands that invest in genuine efficacy, transparent capability communication, and proactive compliance will benefit from the shakeout that follows.",
    ],
    body_zh: [
      "宠物智能与情绪消费用品，是当下消费品赛道中最被低估的结构性机会之一。当我们把多个数据维度叠在一起看——全球宠物科技市场 CAGR 14.6%、中国宠物渗透率仅 22%（美国 70%）、618 智能喂食器销量暴涨 230%、AI 玩具赛道政策目标 2027 年破千亿——一个清晰的信号浮出水面：消费者不是在为「智能」付费，而是在为「情感连接」付费。宠物拟人化、孤独经济与 AI 技术降本三股力量合流，正在打开一个长周期的结构性增长窗口。最终胜出的品牌，不会是堆功能的那个，而是把「碎片化的硬件销售」变成「情感数据闭环生态」的那个。",
      "## 市场与格局",
      "全球宠物科技市场 2024 年规模约 76.3 亿美元，预计 2030 年达 172.5 亿美元（CAGR 约 14.6%）。宠物陪伴机器人作为子赛道，2025 年估值 4.8 亿美元，2030 年预计约 15 亿美元。北美占全球宠物科技收入 37% 以上，但亚太是增速最快的区域——这是一个典型的「规模看欧美、速度看东亚」的格局。",
      "中国市场的数据更具爆发力。2024 年城镇宠物消费市场达 3002 亿元，同比增长 7.5%，犬猫合计 1.21 亿只。但宠物渗透率仅约 22%，远低于美国 70%、日本 28%，智能用品渗透率更低，赛道处于成长期早中期。2025 年 618 大促期间，智能喂食器销量同比增长 230%、智能猫砂盆增长 140%——这不是边际改善，而是品类爆发信号。",
      "AI 情绪陪伴赛道同步起飞。中国 AI 玩具 2024 年营收 246 亿元，政策目标 2027 年超 1000 亿元。仿生宠物全球收入 2025 年已达 2.47 亿美元。宠物科技与情绪 AI 的交叉地带正在诞生全新品类——从具备面部识别的伴宠机器人到 AI 健康监测生态，硬件与情绪消费品的边界正在模糊。",
      "竞争格局高度分散。2024 年中国智能宠物用品市场规模约 102 亿元，尚无绝对霸主。三大阵营并存：本土专业品牌（小佩、霍曼科技、CATLINK、宠尔顿）构建品类深度；跨界科技巨头（小米、海尔、松下、OPPO）携技术与生态优势入局，但美的因业绩未达标退场，说明跨界不等于降维打击；海外老牌（PetSafe 等）曾占核心品类过半份额，但正被中国品牌的制造与成本优势蚕食。价格带方面，55.6% 消费者年消费集中在 501–2000 元中端区间，核心智能单品均价已从早期近千美元降至两三百美元，同质化价格战激烈。约 70% 用户选择线上渠道，天猫、京东为核心阵地。",
      "## 品牌发展路径与案例",
      "两个品牌提供了这个赛道最清晰的成长样本：小佩 PETKIT 和 CATLINK。两者的共同路径是「单品爆款切入→深度迭代建壁垒→健康数据生态延伸→全球化出海」，但在执行层面各有侧重，值得逐一拆解。",
      "小佩约 2013 年创立，以智能喂食器、饮水机切入赛道。2019 年获启明创投领投 2000 万美元 C 轮后，经历了一系列有教育意义的弯路：盲目参展效果不佳、大举开线下门店遭遇价格战被迫关店、追风口做智能鱼缸和烘干箱均以失败告终。转折点在于确立了「做窄」战略——聚焦三大核心单品深度迭代，围绕猫咪泌尿健康打通「喂食→饮水→排泄→检测」闭环。耗时数年攻克湿粮保鲜技术推出的智能湿粮喂食器，就是这种深度优先思维的产物。如今小佩海外营收占比极高，通过 TikTok 社媒电商、多国 DTC 独立站、众筹破圈实现全球化，每个站点深度本地化语言、货币、支付与物流。",
      "CATLINK 的切入角度不同，以「猫联网」概念起盘后聚焦智能猫砂盆这一核心品类。其差异化壁垒在于 AI 面部识别实现多猫身份精准识别，从自动清理、异味控制到泌尿系统疾病早筛，构建了「饮食饮水到排泄」的智能监控闭环。出海方面，CATLINK 以代理商轻资产模式覆盖 31 个国家和地区，在东南亚 Shopee、Lazada 平台上以 2500–4000 元的高客单价仍实现月销破千。国内渠道打法上，CATLINK 在小红书的投放策略值得关注——以「广告感不强」的真实用户体验分享为主，信任转化效率显著高于传统品牌广告。",
      "两个案例揭示的共性逻辑：中高端定价避开价格战泥潭、以持续的产品深度迭代而非品类宽度构建壁垒、将出海视为核心增长引擎而非锦上添花。",
      "## 消费者与趋势",
      "核心消费者画像清晰：90 后与 00 后合计占智能宠物用品消费者近 70%，集中于一线与新一线城市。对他们而言，宠物是家人——超半数宠物主会改造居家环境以适应宠物生活，超四成家庭为宠物庆祝节日。这不是养宠物，而是与宠物共同生活。",
      "需求结构正在从「养活」向「精准健康管理」迁移：精准营养投喂、疾病早筛、日常行为监测已成为刚性需求。中国宠物智能用品市场从 2018 年 29 亿元增至 2024 年 53 亿元，预计 2026 年约 65 亿元。2025 上半年宠物险保费超 5.63 亿元，同比增长 51.3%，说明消费者已为「硬件+保险+医疗」联动模式做好准备。",
      "但痛点同样尖锐。「伪科技」营销正在侵蚀信任——粪便形态分析摄像头因猫砂覆盖无法拍摄、开发者直接移植人类健康设备判定标准而忽视物种差异等问题被反复提及。多品牌 App 生态割裂导致用户体验碎片化，设备频繁误报引发「数据焦虑」，有用户因此反复带宠物跑医院。数据隐私安全标准缺失，宠物健康数据的归属和跨境传输尚无明确规范。小红书爱宠人群已达 1.65 亿，平台内容策略正从「拟孩化」向「宠物本体化」演进。双汇、三只松鼠、阿迪达斯等跨界品牌密集涌入，赛道竞争将显著加剧。",
      "## 方法论",
      "基于小佩、CATLINK 及新兴品牌的实践提炼，以下五步品牌打法框架可作为该赛道的可复用操作手册。",
      "第一步：锚定宠物健康数据，而非硬件功能。这个赛道的胜出产品不是「为了智能而智能」，而是能产出可行动的健康洞察。CATLINK 的面部识别多猫精准投喂、小佩的泌尿健康闭环之所以成功，是因为它们将硬件转化为数据生成的健康平台。原则：每一个产品决策都应回答「这捕捉了什么健康信号，驱动了什么行动？」",
      "第二步：先做窄、再做宽。小佩早期盲目扩品类（智能鱼缸、烘干箱、激进开线下门店）的教训是这个赛道最有价值的反面教材。在主导一个健康相关品类之前，抵制构建「宠物生态」的冲动。原则：把喂食-饮水-排泄-监测链条中的一个节点做到用户拉着你扩品类，而非你推着用户买新品。",
      "第三步：用真实内容建立信任，而非品牌噪音。CATLINK 在小红书的「低广告感」真实用户分享策略，在该赛道中持续跑赢精致品牌广告。原因很简单：宠物主人更信任同类，尤其在「伪科技」质疑升温的当下。小红书官方的「四步法」——破品类、破场景、破路径、破人群——提供了可复制的内容增长框架。原则：投入社区 UGC 和达人合作，让品牌内容在观感上与有机分享无异。",
      "第四步：从第一天就为全球化设计。小佩和 CATLINK 都将海外市场视为主要增长引擎而非补充。出海路径组合拳为：众筹验证（Kickstarter/Indiegogo）→亚马逊规模化→DTC 独立站提利润→本地平台（Shopee、Lazada、区域电商）做渗透，每个市场深度本地化语言、货币、支付、物流与合规。原则：从第一版原型开始就以全球认证和多区域合规标准进行产品工程。",
      "第五步：中高端定位并捍卫它。数据很清楚：55.6% 消费者年消费 501–2000 元，最成功的品牌（小佩、CATLINK）即使在东南亚电商这样价格敏感的渠道也维持高客单价。智能单品向两三百美元下探的价格战对所有人都是负和博弈。原则：中高端定价只有在持续产品迭代和真实健康效用的支撑下才可持续——任何一端打折，都会把你拖入价格战。",
      "## 结论与判断",
      "对未来 12–24 个月给出三个高确定性判断。第一，AI 情绪感知+健康监测+宠物保险的融合将催生「宠物健康智能平台」新品类，其用户终身价值将远高于单一硬件。能率先打通设备数据、医疗服务与保险精算的品牌将获得超额回报。",
      "第二，统一 App 生态和开放协议将成为首要竞争壁垒。当前多品牌 App 互不兼容是赛道最显性的痛点，第一个建立开放宠物健康数据标准的品牌（或联盟）将实质性占据平台层。",
      "第三，「伪科技」信任危机是赛道最大的系统性风险。消保委已开始关注夸大宣传问题，任何一次智能设备故障导致宠物安全事故的舆情事件都可能触发监管收紧，波及全行业。真正投入产品效能验证、透明沟通能力建设和主动合规的品牌，将从随后的行业洗牌中获益。",
    ],
  },
  {
    slug: "china-brands-going-global",
    date: "2026-03-17",
    tag_en: "Audio · Founder",
    tag_zh: "音频 · 创始人",
    title_en: "China brands going global",
    title_zh: "中国品牌出海",
    excerpt_en:
      "A founder's notes on what 'going global' really means — localization, consumer differences, and learning from DJI",
    excerpt_zh:
      "创始人谈「出海」的真正含义——本地化、消费者差异，以及向大疆学习",
    body_en: [
      "A short audio series from our founder on how Chinese brands can win abroad — beyond exports, toward real brands that travel.",
    ],
    body_zh: [
      "我们创始人关于中国品牌如何在海外取胜的一组短音频——超越「出口」，走向真正能走出去的品牌。",
    ],
    audio: [
      { title_en: "Defining 'going global' & the rise of auto exports", title_zh: "品牌出海的定义与汽车出口增长", src: "/audio/cbg-01.mp3" },
      { title_en: "The challenge of market localization", title_zh: "市场本地化的挑战", src: "/audio/cbg-02.mp3" },
      { title_en: "Consumer differences & brand challenges", title_zh: "消费者差异与品牌挑战", src: "/audio/cbg-03.mp3" },
      { title_en: "HQ arrogance & DJI's success", title_zh: "总部傲慢与大疆的成功", src: "/audio/cbg-04.mp3" },
    ],
  },
  {
    slug: "ai-and-raising-lobsters",
    date: "2026-03-30",
    tag_en: "Audio · Founder",
    tag_zh: "音频 · 创始人",
    title_en: "AI, and 'raising lobsters'",
    title_zh: "AI 与「养龙虾」",
    excerpt_en:
      "On AI replacing repetitive work, the cost of supervising it, and why China's environment is unique",
    excerpt_zh:
      "谈 AI 替代重复性工作、监督它的成本，以及中国土壤为何独特",
    body_en: [
      "Our founder's take on where AI actually helps, where it still falls short, and the capability gap that remains.",
    ],
    body_zh: [
      "我们创始人谈 AI 究竟在哪里有用、在哪里仍有不足，以及尚存的能力差距。",
    ],
    audio: [
      { title_en: "Openclaw positioning & the 'raising lobsters' analogy", title_zh: "Openclaw 定位与养龙虾比喻", src: "/audio/ai-01.mp3" },
      { title_en: "AI replacing repetitive work", title_zh: "AI 替代重复性工作", src: "/audio/ai-02.mp3" },
      { title_en: "AI's problems & the cost of supervision", title_zh: "AI 的问题与监督成本", src: "/audio/ai-03.mp3" },
      { title_en: "China's unique environment & the capability gap", title_zh: "中国土壤独特与能力差距", src: "/audio/ai-04.mp3" },
    ],
  },
  {
    slug: "the-pet-economy",
    date: "2025-11-18",
    tag_en: "Audio · Founder",
    tag_zh: "音频 · 创始人",
    title_en: "The pet economy",
    title_zh: "宠物经济",
    excerpt_en:
      "Pets as emotional anchors, a category exploding in variety, and the gaps in healthcare and brand building",
    excerpt_zh:
      "宠物作为情感寄托、品类的爆发，以及医疗与品牌建设的缺口",
    body_en: [
      "Our founder on why the pet economy is really an emotional economy — and where the opportunities and gaps lie.",
    ],
    body_zh: [
      "我们创始人谈宠物经济为何本质是情感经济——以及机会与缺口所在。",
    ],
    audio: [
      { title_en: "Pets as emotional anchor & projection", title_zh: "宠物是情感寄托与投射", src: "/audio/pet-01.mp3" },
      { title_en: "A category rich in variety", title_zh: "宠物经济品类丰富", src: "/audio/pet-02.mp3" },
      { title_en: "Industry status & brand building", title_zh: "行业现状与品牌建设", src: "/audio/pet-03.mp3" },
      { title_en: "The healthcare gap & social dimension", title_zh: "医疗缺口与社交属性", src: "/audio/pet-04.mp3" },
    ],
  },
  {
    slug: "technology-that-understands-business",
    date: "2026-06-28",
    tag_en: "Perspective",
    tag_zh: "观点",
    title_en: "Technology that understands business",
    title_zh: "懂生意的技术",
    excerpt_en:
      "Why the next wave of growth comes not from more data, but from closing the loop between insight, decision and execution",
    excerpt_zh:
      "为什么下一波增长不靠更多数据，而靠打通「洞察—决策—执行」的闭环",
    body_en: [
      "Most companies today are not short of data. They are short of decisions that data can actually drive, and the execution that turns those decisions into growth.",
      "## From data to decisions",
      "We believe the real differentiator is operational: the ability to move from a consumer insight to a concrete plan, and from a plan to omni-channel execution — without losing fidelity along the way.",
      "## The closed loop",
      "AI is most valuable when it is embedded in this loop, not bolted on at the end. Technology that understands business is technology that helps you decide and act, not just analyse.",
      "This is the first of our perspectives. We'll keep sharing how we think about growth, brands and markets here.",
    ],
    body_zh: [
      "今天大多数公司并不缺数据，缺的是数据能真正驱动的决策，以及把决策变成增长的执行。",
      "## 从数据到决策",
      "我们认为真正的差异化在于运营能力：能够从一个消费者洞察走到一份具体方案，再从方案走到全渠道执行，并在这个过程中不失真。",
      "## 闭环",
      "当 AI 被嵌入这个闭环、而不是事后附加时，它的价值最大。懂生意的技术，是帮助你决策与行动的技术，而不仅仅是做分析。",
      "这是我们的第一篇观点。我们会在这里持续分享我们对增长、品牌与市场的思考。",
    ],
  },
];
