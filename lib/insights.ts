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
    slug: "guzi-economy-ita-culture-brand-strategy",
    date: "2026-07-22",
    tag_en: "Perspective · Consumer",
    tag_zh: "观点 · 消费",
    title_en:
      "The GuZi Economy: A Hundred-Billion Track of Emotional Value and a Brand Playbook",
    title_zh:
      "谷子经济：情绪价值的千亿赛道与品牌打法方法论",
    excerpt_en:
      "The GuZi economy is not a fad but a structural consumption shift — a 168.9 billion yuan market growing at 40%, yet store closures and speculation controversies show that only brands grasping the underlying logic of ita-culture will survive the cycle.",
    excerpt_zh:
      "谷子经济不是风口而是结构性消费迁移——1689亿元市场以40%增速膨胀，但闭店潮与炒卖争议提醒我们，只有理解痛文化底层逻辑的品牌才能穿越周期。",
    body_en: [
      "The GuZi economy is not a passing fad but a structural consumption migration. When a market of 168.9 billion yuan expands at over 40% annual growth, when the emotional consumption of 500 million pan-ACG consumers begins to reshape the language of retail space, and when domestic IP online popularity surpasses foreign IP by 26.7 percentage points for the first time — what we see is not simply 'ACG going mainstream,' but a signal that the emotional-value economy is moving from subcultural margins to the main stage of consumption. But the flip side of prosperity is equally stark: over 155 GuZi stores closed in the first half of 2025, more than 180 brands shuttered 15,000-plus locations in a single year, and a scarce trading card listed at 188,800 yuan on the secondary market drew 'pseudo-gambling' regulatory scrutiny. Making money in this track is far harder than it looks; who profits depends on whether they understand the underlying logic of ita-culture.",
      "## Market and Landscape",
      "First, the scale. iiMedia Research data shows China's GuZi economy reached approximately 168.9 billion yuan in 2024, up 40.63% year-on-year, projected to reach 308.9 billion yuan by 2029; QuestMobile expects the total derivative merchandise market to exceed 240 billion yuan in 2025. Zooming out to the broader ACG peripheral ecosystem: about 298.3 billion yuan in 2019, approaching 600 billion yuan in 2024, nearly doubling in five years. Even more critical is the user base: core ACG users number nearly 100 million, pan-ACG users exceed 500 million, but actual purchasing users are only about 12.36 million — penetration remains extremely low, and the growth ceiling is far from being reached.",
      "Next, the structure. The most defining feature of this track is 'IP-driven plus fragmented channels': the Matthew effect of top IPs (LABUBU, Ne Zha, Sanrio, etc.) is far stronger than brand concentration, while the retail end is extremely fragmented, with numerous long-tail SMEs and individual studios. No public CR3/CR5 data exists, and no single brand holds a dominant share. Players fall roughly into four categories: IP operators and trading-card leaders led by Kayou (10.057 billion yuan revenue in 2024, two attempts at a Hong Kong IPO); designer-toy IP brands like Pop Mart, TOP TOY, and 52TOYS; mass-retail cross-sector players like MINISO (49-100 yuan unit price, 1,000-plus SKUs, thousands of stores); and niche ita-bag brands like WEGO, Berry Q, and WINK OUV. Price bands span from 9.9-yuan entry-level merchandise to 3,000-plus yuan gold IP pendants, but the true high-margin zone lies not in manufacturing but in IP licensing and scarcity design.",
      "The tension in the landscape lies in 'low visible barriers, high hidden thresholds.' Basic GuZi products are small, lightweight, and cheap to produce, attracting a flood of entrepreneurs; but quality IP acquisition and incubation, site selection, product curation, private-domain traffic operations, and inventory management — these are the real moats. The 2025 store-closure wave marks the end of the 'easy-money era': severe homogenization, expiring rent subsidies, declining Japanese manga IP search volumes alongside rising Chinese animation IPs have shifted the competitive focus from channel grabbing to IP originality and full-chain operations.",
      "## Brand Development Paths and Cases",
      "GuZi economy brand development shows a clear three-tier stratification.",
      "The first tier consists of IP licensing-driven trading-card giants. Kayou is the archetype — it launched with nationally recognized IP-licensed cards like Ultraman and My Little Pony, achieved 10.057 billion yuan in total revenue and 4.466 billion yuan in adjusted net profit in 2024, with card business revenue of 8.2 billion yuan and gross margins above 70%, holding 70 licensed and proprietary IPs. Its channel moat: over 90% of revenue comes from agent stores near school campuses. But the risks are equally prominent: 768 million yuan in royalty payments in 2024, nearly 90% non-exclusive IPs, and uncertain contract renewals; scarce cards listed at 188,800 yuan on secondary platforms, accused of 'pseudo-gambling mechanics,' facing minor-consumer compliance pressure. Kayou's second Hong Kong IPO filing will test the ceiling of the 'IP licensing plus card blind-box' model.",
      "The second tier comprises mid-tier challengers pursuing domestic IP plus full-category expansion. Jason Entertainment, founded in Guangzhou in 2019, started with collectible cards, surpassed 100 million yuan in sales in 2021, approached 1 billion yuan in revenue in 2025, with a single domestic anime film card set breaking 100 million yuan in a week. Its core strategy: reduce single-category dependence — card revenue share projected to drop from 85% to under 50%, expanding into figures, plush, GuZi, and TCG. The financing path is equally clear: Bilibili angel round in 2022, two strategic rounds in 2025 with investors including 37 Interactive Entertainment and Hengdian Capital, preferring partners with tourism or IP resources for synergy.",
      "The third tier is the long-tail, fragmented market for ita-bags, ita-clothing, and GuZi display props. This segment is dominated by small Taobao sellers with no dominant brand, relying on Xiaohongshu UGC 'showcasing GuZi' and 'GuZi aesthetics' tutorials to drive conversion. Xianyu sold 250,000 ita-bags in a year, with 90% of trading users being female and over 48% of buyers purchasing additional customization services — these two figures reveal the fundamental nature of ita-culture consumption: female dominance and customization premium. But offline GuZi store chains have undergone severe shakeouts, with 180-plus brands closing 15,000-plus stores in a year, survivors concentrating toward mall-anchored retail.",
      "The shared pattern across all three paths is worth distilling: enter with high-frequency trading cards or badges, bind IP licenses, extend to full categories, run online e-commerce and offline mall stores or pop-ups in parallel, with leading players pursuing IPOs and mid-tier players bringing in industrial capital. The difference lies in IP strategy depth — Kayou relies on external licensing but has the largest scale, Jason Entertainment deeply binds domestic anime IPs for differentiation, and long-tail players survive in niches through content seeding and customization services.",
      "## Consumers and Trends",
      "The GuZi economy consumer profile is highly concentrated: core demographic under 24 accounts for 57.5%, ages 25-30 account for 13.6%, predominantly female, with emotional projection as the primary purchase motivation — virtual idols and characters provide stable emotional connection, not functional utility. This is fundamentally different from traditional consumer goods logic: users are not buying an acrylic stand or an ita-bag, but a relationship with a virtual character, a confirmation of subcultural identity, and a sense of belonging within a community.",
      "Four core needs form the underlying structure of consumption motivation: emotional comfort (virtual idols providing emotional connection), spiritual satisfaction (handcraft assembly and display aesthetics), subcultural identity (recognizing kindred spirits through ita-bags and ita-clothing), and novelty-seeking stimulation (collecting and speculating on rare items). The decision pathway follows a standard four-stage model: Xiaohongshu or Douyin seeding, community validation (Bilibili or QQ groups), e-commerce or official mini-program purchase, and secondary market circulation. Notably, KOC (ordinary users sharing ita-bag styling and display cabinet layouts) seeding efficiency significantly exceeds brand-official content — meaning brands need to 'yield' to users in content strategy rather than top-down broadcasting.",
      "On trend signals, opportunities and risks coexist. Opportunities: domestic IP online attention reaches 55.1%, surpassing imported IP, with creations like Langlangshan Little Demon topping attention charts, giving the 'national GuZi' ecosystem sustained content supply capability; GuZi consumption merging with cultural tourism and commercial districts is activating urban consumption scenes, with leading companies' derivative transaction value exceeding 1.1 billion yuan in 2025 with year-on-year doubling; AI-generated custom patterns and small-batch printing technology are lowering barriers, rapidly expanding personalized ita-clothing and home peripheral supply. Risks: some IPs are treated as short-term monetization tools lacking long-term content ecosystems, making user stickiness fragile; AI-generated derivative IP boundaries remain legally undefined; cross-border sourcing channel disruptions and refund disputes are frequent; secondary market average price declines suggest price bubbles in certain categories.",
      "## Methodology",
      "Based on the above analysis, I distill an 'IP-Product-Place-People' four-dimensional brand strategy framework for new and existing players in the GuZi economy.",
      "Dimension One: IP Anchoring — From 'borrowing IP' to 'nurturing IP.' The essence of the GuZi economy is the IP economy, but 'borrowing IP' and 'nurturing IP' are fundamentally different strategies. Kayou paid 768 million yuan in royalties in 2024 with nearly 90% non-exclusive IPs — this is the cost of the 'borrowing' model: large scale but thin moats, high renewal risk. The correct path: use licensed IPs short-term for cash flow and user base, deeply bind domestic animation and game IPs mid-term for differentiation (as Jason Entertainment does), and cultivate proprietary IPs or participate in IP co-creation long-term, transitioning from copyright buyer to IP ecosystem co-builder. Principle: IP licensing is the entry ticket; IP incubation is the moat.",
      "Dimension Two: Category Ladder — High-frequency entry, progressive extension. Trading cards and badges are high-frequency, strongly IP-bound entry categories, but single-category dependence is a structural risk. Jason Entertainment's strategy of reducing card revenue share from 85% to under 50% is instructive. The actionable path: use cards and badges to build user stickiness and IP recognition, extend to plush and figures and other emotionally premium categories, then penetrate ita-bags, display props, IP co-branded home goods and other lifestyle categories, forming a category pyramid of 'high-frequency low-price for traffic, mid-frequency mid-price for profit, low-frequency high-price for brand building.' Principle: each category must have an independent emotional-value proposition, not just a simple licensing sticker.",
      "Dimension Three: Place Construction — A three-element channel system. 'Online seeding plus offline immersion plus secondary circulation' is not three independent channels but an organic loop. Online, Xiaohongshu is the core seeding platform, prioritizing KOC and UGC over brand-official content — 48% of Xianyu ita-bag buyers purchasing customization services shows users want participation, not finished products. Offline, upgrade from 'opening stores' to 'creating scenes': the core function of themed stores and pop-ups is not selling goods but providing immersive settings for photo-taking and community gatherings. Secondary circulation is a necessary part of ita-culture consumption — Xianyu's 2024 GMV grew 104% year-on-year, and brands should proactively design circulation-friendly product mechanisms (numbered limited editions, splittable sets) rather than treating the secondary market as a threat. Principle: channels are amplifiers of emotional value, not extensions of shelves.",
      "Dimension Four: User Management — Emotion as core, community as wing. GuZi consumers buy relationships, not products, so the focus of user management should shift from 'repurchase rate' to 'emotional engagement.' Specific steps: build continuous emotional connection between IP characters and users (character birthdays, plot updates, limited commemorations), establish community recognition mechanisms (ita-bags and ita-clothing as subcultural identifiers), design co-creation entry points (customization services, UGC collection, GuZi aesthetics tutorials), and manage expectations and scarcity (avoiding over-speculation that damages reputation). Principle: beware the 'pseudo-gambling' trap — scarcity design should serve collecting value, not speculative demand, or it will invite regulatory intervention and user attrition.",
      "Fifth Cross-Cutting Principle: Long-termism over short-term monetization. The 2025 store closures and secondary price declines have proven: growth driven by channel dividends and IP speculation is unsustainable. Brands need to answer one fundamental question — are you selling GuZi, or operating an IP-driven emotional consumption ecosystem? The former is a business; the latter is a brand. Kayou's IPO journey, Jason Entertainment's full-category transformation, and the customization premium in the Xianyu ita-bag segment are all, in essence, answering this question.",
      "## Conclusion and Judgment",
      "The GuZi economy is in the early-to-mid growth stage: a hundred-billion-level market, 40%+ growth, 500 million pan-ACG users but consumption penetration still low — this is a track with high certainty and a distant ceiling. But certainty does not mean gold everywhere. 155 store closures in half a year, 180-plus brands closing 15,000-plus locations in a year, secondary market average price declines — these signals indicate that the extensive-growth dividend period has ended, and the industry has entered a 'competing on IP originality, full-chain operations, and product curation' intensive phase.",
      "For practitioners, there are three core judgments. First, the rise of domestic IP is an irreversible trend (online attention at 55.1%, already exceeding imported IP), and brands that deeply bind with domestic-creation IP will reap structural dividends. Second, ita-bags, display props, co-branded home goods and other lifestyle categories are the next growth wave, but supply is currently fragmented and standardization is low — whoever establishes quality standards and brand awareness first will claim the position. Third, AI customization and scene fusion are the most certain opportunity signals within 12-24 months, but the undefined IP boundaries of AI derivatives and supply chain fragility are risks that need to be hedged in advance.",
      "The endgame of the GuZi economy will not be an oligopoly of a few dominant brands, but more likely a pyramid structure of 'top-tier IP ecosystems plus mid-tier category brands plus long-tail custom creators.' In this structure, the real winners are not the fastest runners, but those who best understand the economics of emotional value.",
    ],
    body_zh: [
      "谷子经济不是一阵风口，而是一场结构性的消费迁移。当 1689 亿元的市场规模以超过 40% 的年增速膨胀，当 5 亿泛二次元受众的情绪消费开始重塑零售空间的语言，当国产 IP 的网络热度首次反超海外 IP 达 26.7 个百分点——我们看到的不是简单的「二次元出圈」，而是情绪价值经济正从亚文化边缘走向消费主舞台的信号。但繁荣的另一面同样刺眼：2025 上半年超过 155 家谷子店闭店，一年内 180 多个品牌关掉了 1.5 万余家门店，二级市场上一张稀有卡牌被挂到 18.88 万元、引来「类赌博」监管审视。在这条赛道上赚钱远比看上去更难，谁能盈利，取决于他是否真正读懂了痛文化的底层逻辑。",
      "## 市场与格局",
      "先看规模。艾媒咨询数据显示，2024 年中国谷子经济规模约 1689 亿元，同比增长 40.63%，预计到 2029 年达到 3089 亿元；QuestMobile 预计 2025 年衍生品整体市场将突破 2400 亿元。把视野放到更大的二次元周边生态：2019 年约 2983 亿元，2024 年逼近 6000 亿元，五年近乎翻倍。更关键的是用户盘：核心二次元用户近 1 亿，泛二次元用户超过 5 亿，但真正的付费用户仅约 1236 万——渗透率极低，增长天花板远未触及。",
      "再看结构。这条赛道最鲜明的特征是「IP 驱动 + 渠道碎片化」：头部 IP（LABUBU、哪吒、三丽鸥等）的马太效应远强于品牌集中度，而零售端极度分散，长尾中小商家与个人工作室众多。目前没有公开的 CR3/CR5 数据，也没有任何单一品牌占据主导份额。玩家大致分为四类：以卡游为代表的 IP 运营与卡牌龙头（2024 年营收 100.57 亿元，两度冲刺港股 IPO）；泡泡玛特、TOP TOY、52TOYS 等潮玩 IP 品牌；名创优品这类大众零售跨界者（客单价 49-100 元、上千 SKU、数千家门店）；以及 WEGO、Berry Q、WINK OUV 等垂直痛包品牌。价格带从 9.9 元入门周边到 3000 多元的黄金 IP 挂件不等，但真正的高毛利区不在制造，而在 IP 授权与稀缺性设计。",
      "格局的张力在于「显性壁垒低、隐性门槛高」。基础谷子产品小、轻、制造成本低，吸引大量创业者涌入；但优质 IP 的获取与孵化、选址、选品、私域流量运营、库存管理——这些才是真正的护城河。2025 年的闭店潮标志着「躺赚时代」的终结：严重同质化、租金补贴到期、日漫 IP 搜索量下滑而国产动漫 IP 上升，把竞争焦点从抢渠道转向了 IP 原创力与全链路运营。",
      "## 品牌发展路径与案例",
      "谷子经济的品牌发展呈现清晰的三层分化。",
      "第一层是 IP 授权驱动的卡牌巨头。卡游是典型——它以奥特曼、小马宝莉等国民级授权 IP 卡牌起家，2024 年实现总营收 100.57 亿元、经调整净利润 44.66 亿元，其中卡牌业务营收 82 亿元、毛利率超 70%，握有 70 个授权及自有 IP。其渠道护城河：超 90% 收入来自校园周边的代理店。但风险同样突出：2024 年支付授权金 7.68 亿元，近 90% 为非独家 IP，续约存在不确定性；稀有卡在二级平台被挂到 18.88 万元，被指「类赌博机制」，面临未成年人消费合规压力。卡游二度递表港股，将检验「IP 授权 + 卡牌盲盒」模式的天花板。",
      "第二层是走「国产 IP + 全品类扩张」的腰部挑战者。卡游之外，谷斯智娱（Jason Entertainment）2019 年成立于广州，以集换式卡牌起家，2021 年销售额破亿，2025 年营收逼近 10 亿元，单个国产动画电影卡包一周破亿。其核心打法：降低单品类依赖——卡牌收入占比预计从 85% 降到 50% 以下，扩张至手办、毛绒、谷子、TCG。融资路径同样清晰：2022 年 B 站天使轮，2025 年两轮战略融资，投资方包括三七互娱、横店资本，偏好有文旅或 IP 资源可协同的伙伴。",
      "第三层是痛包、痛衣、谷子展示道具的长尾碎片化市场。这一板块由淘宝小卖家主导、无主导品牌，依靠小红书 UGC「晒谷」「谷美学」教程驱动转化。闲鱼一年售出 25 万只痛包，交易用户 90% 为女性、超过 48% 的买家额外购买定制服务——这两个数字揭示了痛文化消费的本质：女性主导与定制溢价。但线下谷子连锁经历了剧烈洗牌，一年内 180 多个品牌关掉 1.5 万余家门店，幸存者向商场店型集中。",
      "三条路径的共性值得提炼：以高频卡牌或徽章切入，绑定 IP 授权，向全品类延伸，线上电商与线下商场店/快闪并行，头部谋求 IPO、腰部引入产业资本。差别在于 IP 战略的深度——卡游依赖外部授权但规模最大，谷斯智娱深绑国产动漫 IP 做差异化，长尾玩家则靠内容种草与定制服务在细分中生存。",
      "## 消费者与趋势",
      "谷子经济的消费者画像高度集中：24 岁以下核心人群占 57.5%，25-30 岁占 13.6%，以女性为主，购买动机首要是情感投射——虚拟偶像与角色提供的是稳定的情感连接，而非功能效用。这与传统消费品逻辑根本不同：用户买的不是一个亚克力立牌或一只痛包，而是与一个虚拟角色的关系、一次亚文化身份的确认、一份在社群中的归属感。",
      "四类核心需求构成了消费动机的底层结构：情感慰藉（虚拟偶像提供情感连接）、精神满足（手工组装与陈列美学）、亚文化认同（通过痛包痛衣识别同好）、猎奇刺激（稀有品收集与炒卖）。决策路径遵循标准四段模型：小红书或抖音种草、社群验证（B 站或 QQ 群）、电商或官方小程序购买、二级市场流通。值得注意的是，KOC（普通用户分享痛包搭配与展示柜布置）的种草效率显著高于品牌官方内容——这意味着品牌在内容策略上需要向用户「让位」，而非自上而下地灌输。",
      "在趋势信号上，机会与风险并存。机会：国产 IP 网络关注度达 55.1%，反超进口 IP，《狼行山小妖怪》等创作登顶关注榜，让「国谷」生态具备持续的内容供给能力；谷子消费与文旅、商圈融合正在激活城市消费场景，头部公司 2025 年衍生品交易额破 11 亿元、同比翻倍；AI 生成定制图案与小批量印刷技术在降低门槛，快速扩充个性化痛衣与家居周边供给。风险：部分 IP 被当作短期变现工具、缺乏长期内容生态，用户黏性脆弱；AI 生成衍生 IP 的边界在法律上尚未界定；跨境采购渠道中断与退款纠纷频发；二级市场均价下滑，暗示某些品类存在价格泡沫。",
      "## 方法论",
      "基于上述分析，我为谷子经济的新老玩家提炼出一套「IP—产品—场域—人群」四维品牌战略框架。",
      "维度一：IP 锚定——从「借 IP」到「养 IP」。谷子经济的本质是 IP 经济，但「借 IP」和「养 IP」是根本不同的两种战略。卡游 2024 年支付授权金 7.68 亿元、近 90% 为非独家 IP，这就是「借」模式的代价：规模大但护城河薄、续约风险高。正确路径：短期用授权 IP 换现金流与用户盘，中期深绑国产动漫与游戏 IP 做差异化（如谷斯智娱），长期培育自有 IP 或参与 IP 共创，从版权买家转向 IP 生态共建者。原则：IP 授权是入场券，IP 孵化才是护城河。",
      "维度二：品类阶梯——高频切入、渐进延伸。卡牌与徽章是高频、强绑定 IP 的入门品类，但单品类依赖是结构性风险。谷斯智娱把卡牌收入占比从 85% 降到 50% 以下的策略颇具借鉴意义。可落地路径：用卡牌、徽章建立用户黏性与 IP 认知，延伸到毛绒、手办等情绪溢价品类，再渗透痛包、展示道具、IP 联名家居等生活方式品类，形成「高频低价引流、中频中价盈利、低频高价立品牌」的品类金字塔。原则：每个品类都要有独立的情绪价值主张，而不只是简单贴一张授权贴纸。",
      "维度三：场域构建——三要素渠道体系。「线上种草 + 线下沉浸 + 二级流通」不是三条独立渠道，而是一个有机闭环。线上，小红书是核心种草平台，优先 KOC 与 UGC 而非品牌官方内容——48% 的闲鱼痛包买家购买定制服务，说明用户要的是参与感而非成品。线下，从「开店」升级为「造景」：主题店与快闪的核心功能不是卖货，而是提供可拍照、可社群聚会的沉浸式场景。二级流通是痛文化消费的必要环节——闲鱼 2024 年 GMV 同比增长 104%，品牌应主动设计利于流通的产品机制（编号限量、可拆分套组），而非把二级市场视为威胁。原则：渠道是情绪价值的放大器，而不是货架的延伸。",
      "维度四：人群经营——情感为核、社群为翼。谷子消费者买的是关系而非产品，因此人群经营的重心应从「复购率」转向「情感投入度」。具体步骤：在 IP 角色与用户之间建立持续的情感连接（角色生日、剧情更新、限定纪念），建立社群识别机制（痛包痛衣作为亚文化标识），设计共创入口（定制服务、UGC 征集、谷美学教程），并管理预期与稀缺（避免过度炒卖损害口碑）。原则：警惕「类赌博」陷阱——稀缺性设计应服务于收集价值，而非投机需求，否则将招致监管介入与用户流失。",
      "第五条横切原则：长期主义高于短期变现。2025 年的闭店潮与二级价格下滑已经证明：靠渠道红利与 IP 炒作驱动的增长不可持续。品牌需要回答一个根本问题——你是在卖谷子，还是在运营一个 IP 驱动的情绪消费生态？前者是生意，后者才是品牌。卡游的 IPO 之路、谷斯智娱的全品类转型、闲鱼痛包板块的定制溢价，本质上都在回答这个问题。",
      "## 结论与判断",
      "谷子经济处于成长期的早中段：千亿级市场、40%+ 增速、5 亿泛二次元用户但消费渗透率仍低——这是一条确定性高、天花板遥远的赛道。但确定性不等于遍地是金。半年 155 家闭店、一年 180 多个品牌关掉 1.5 万余家门店、二级市场均价下滑——这些信号表明，粗放增长的红利期已经结束，行业进入「拼 IP 原创力、拼全链路运营、拼选品」的精耕阶段。",
      "对从业者而言，有三个核心判断。第一，国产 IP 崛起是不可逆的趋势（网络关注度 55.1%，已超进口 IP），深绑国创 IP 的品牌将收获结构性红利。第二，痛包、展示道具、联名家居等生活方式品类是下一波增长浪潮，但当前供给分散、标准化程度低——谁先建立品质标准与品牌认知，谁就能占位。第三，AI 定制与场景融合是 12-24 个月内确定性最高的机会信号，但 AI 衍生品未界定的 IP 边界与供应链脆弱性是需要提前对冲的风险。",
      "谷子经济的终局不会是少数寡头品牌的垄断，更可能是「头部 IP 生态 + 腰部品类品牌 + 长尾定制创作者」的金字塔结构。在这个结构里，真正的赢家不是跑得最快的人，而是最懂情绪价值经济学的人。",
    ],
  },
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
