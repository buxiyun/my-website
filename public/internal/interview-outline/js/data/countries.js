// =========================================================
// 国家元数据与研究阶段定义
// =========================================================

window.DATA = window.DATA || {};

const COUNTRIES = [
  /* 高频项目国家 */
  {code:'BR', name:'巴西', flag:'🇧🇷', city:'圣保罗', freq:true},
  {code:'IT', name:'意大利', flag:'🇮🇹', city:'米兰', freq:true},
  {code:'ES', name:'西班牙', flag:'🇪🇸', city:'马德里', freq:true},
  {code:'FR', name:'法国', flag:'🇫🇷', city:'巴黎', freq:true},
  {code:'ID', name:'印尼', flag:'🇮🇩', city:'雅加达', freq:true},
  {code:'TH', name:'泰国', flag:'🇹🇭', city:'曼谷', freq:true},
  /* 中东 */
  {code:'SA', name:'沙特阿拉伯', flag:'🇸🇦', city:'利雅得', freq:true},
  {code:'AE', name:'阿联酋', flag:'🇦🇪', city:'迪拜', freq:true},
  {code:'IL', name:'以色列', flag:'🇮🇱', city:'特拉维夫'},
  {code:'QA', name:'卡塔尔', flag:'🇶🇦', city:'多哈'},
  {code:'KW', name:'科威特', flag:'🇰🇼', city:'科威特城'},
  {code:'BH', name:'巴林', flag:'🇧🇭', city:'麦纳麦'},
  {code:'OM', name:'阿曼', flag:'🇴🇲', city:'马斯喀特'},
  {code:'JO', name:'约旦', flag:'🇯🇴', city:'安曼'},
  {code:'EG', name:'埃及', flag:'🇪🇬', city:'开罗'},
  /* 以下按字母排列 */
  {code:'AR', name:'阿根廷', flag:'🇦🇷', city:'布宜诺斯艾利斯'},
  {code:'AU', name:'澳大利亚', flag:'🇦🇺', city:'悉尼'},
  {code:'BE', name:'比利时', flag:'🇧🇪', city:'布鲁塞尔'},
  {code:'CL', name:'智利', flag:'🇨🇱', city:'圣地亚哥'},
  {code:'CO', name:'哥伦比亚', flag:'🇨🇴', city:'波哥大'},
  {code:'CZ', name:'捷克', flag:'🇨🇿', city:'布拉格'},
  {code:'DE', name:'德国', flag:'🇩🇪', city:'慕尼黑'},
  {code:'GB', name:'英国', flag:'🇬🇧', city:'伦敦'},
  {code:'GR', name:'希腊', flag:'🇬🇷', city:'雅典'},
  {code:'HK', name:'香港', flag:'🇭🇰', city:'香港'},
  {code:'HU', name:'匈牙利', flag:'🇭🇺', city:'布达佩斯'},
  {code:'IN', name:'印度', flag:'🇮🇳', city:'新德里'},
  {code:'JP', name:'日本', flag:'🇯🇵', city:'东京'},
  {code:'KR', name:'韩国', flag:'🇰🇷', city:'首尔'},
  {code:'MX', name:'墨西哥', flag:'🇲🇽', city:'墨西哥城'},
  {code:'MY', name:'马来西亚', flag:'🇲🇾', city:'吉隆坡'},
  {code:'NL', name:'荷兰', flag:'🇳🇱', city:'阿姆斯特丹'},
  {code:'NO', name:'挪威', flag:'🇳🇴', city:'奥斯陆'},
  {code:'NZ', name:'新西兰', flag:'🇳🇿', city:'奥克兰'},
  {code:'PE', name:'秘鲁', flag:'🇵🇪', city:'利马'},
  {code:'PH', name:'菲律宾', flag:'🇵🇭', city:'马尼拉'},
  {code:'PL', name:'波兰', flag:'🇵🇱', city:'华沙'},
  {code:'PT', name:'葡萄牙', flag:'🇵🇹', city:'里斯本'},
  {code:'RO', name:'罗马尼亚', flag:'🇷🇴', city:'布加勒斯特'},
  {code:'RU', name:'俄罗斯', flag:'🇷🇺', city:'莫斯科'},
  {code:'SE', name:'瑞典', flag:'🇸🇪', city:'斯德哥尔摩'},
  {code:'SG', name:'新加坡', flag:'🇸🇬', city:'新加坡'},
  {code:'TR', name:'土耳其', flag:'🇹🇷', city:'伊斯坦布尔'},
  {code:'TW', name:'中国台湾', flag:'🇹🇼', city:'台北'},
  {code:'US', name:'美国', flag:'🇺🇸', city:'洛杉矶'},
  {code:'VN', name:'越南', flag:'🇻🇳', city:'胡志明市'},
  {code:'ZA', name:'南非', flag:'🇿🇦', city:'约翰内斯堡'}
];


/* ---------- 研究阶段 ---------- */
const STAGES = [
  {id:'pd',   label:'产品定义',   note:'已建成'},
  {id:'pre',  label:'上市前测试', note:'待补充'},
  {id:'post', label:'上市后检验', note:'待补充'}
];
const STAGE_OF_TYPE = {FGD:'pd',IHV:'pd',Dealer:'pd',MPVFGDJ:'pd',MPVFGDS:'pd',MPVFGDI:'pd',MPVIHV:'pd',MPVDealer:'pd',MPVMedia:'pd',MPVExpert:'pd'};

