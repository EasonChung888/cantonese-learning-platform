const STORAGE_KEY = "cantonese-review-state-v1";
const DAY_ORDER = [
  { id: "day1", label: "Day 1", topic: "基础语音" },
  { id: "day2", label: "Day 2", topic: "介绍" },
  { id: "day3", label: "Day 3", topic: "问候" },
  { id: "day4", label: "Day 4", topic: "打电话" },
  { id: "day5", label: "Day 5", topic: "约会" },
  { id: "day6", label: "Day 6", topic: "问路" },
  { id: "day7", label: "Day 7", topic: "购物" },
  { id: "day8", label: "Day 8", topic: "交通" },
  { id: "day9", label: "Day 9", topic: "天气" },
  { id: "day10", label: "Day 10", topic: "饮食" },
  { id: "day11", label: "Day 11", topic: "香港" },
  { id: "day12", label: "Day 12", topic: "开户口" },
  { id: "day13", label: "Day 13", topic: "买餸" },
  { id: "day14", label: "Day 14", topic: "旅游" },
  { id: "day15", label: "Day 15", topic: "看医生" },
  { id: "day16", label: "Day 16", topic: "清洁香港" },
  { id: "day17", label: "Day 17", topic: "找学校" },
  { id: "day18", label: "Day 18", topic: "晨运" },
  { id: "day19", label: "Day 19", topic: "找工作与跳槽" },
  { id: "day20", label: "Day 20", topic: "打“九九九”" },
  { id: "day21", label: "Day 21", topic: "香港话" },
  { id: "day22", label: "Day 22", topic: "报纸" },
  { id: "day23", label: "Day 23", topic: "交通运输" },
  { id: "day24", label: "Day 24", topic: "海洋公园" },
  { id: "day25", label: "Day 25", topic: "黄大仙" },
  { id: "day26", label: "Day 26", topic: "电视文化" },
  { id: "day27", label: "Day 27", topic: "食在香港" },
  { id: "day28", label: "Day 28", topic: "“女人街”" },
  { id: "day29", label: "Day 29", topic: "“居者有其屋”" }
];
const DEFAULT_MODULE_ORDER = ["全部內容", "聲母", "韻母", "聲調", "常用字表", "句子"];
const CHAPTER_BOOK_MODULE_ORDER = ["全部內容", "課文", "重點詞彙", "補充語彙", "重點理解", "講解", "傳意項目介紹", "練習", "粵字辨認", "短文朗讀"];
const TYPE_LABELS = {
  jyutping: "粤拼识别",
  meaning: "普通话释义",
  reverse: "粤语反查",
  sentenceJyutping: "句子发音"
};
const DAILY_FEATURE_COUNT = 3;
const DAILY_CULTURE_COUNT = 6;
const RETRY_MIN_GAP = 2;
const RETRY_MAX_GAP = 3;
const HOME_FEATURES = [
  {
    id: "feature-mgoi",
    label: "茶餐厅一句",
    title: "唔該，落單呀。",
    jyutping: "m4 goi1, lok6 daan1 aa3",
    mandarin: "劳驾，我要点单。",
    note: "在香港日常里，唔该常用于麻烦别人做事；收到服务后也可以说唔该晒。",
    example: "想叫店员过来，可以自然地说：唔該，落單呀。",
    dayId: "day3"
  },
  {
    id: "feature-bin-dou",
    label: "问路一句",
    title: "邊度有地鐵站？",
    jyutping: "bin1 dou6 jau5 dei6 tit3 zaam6",
    mandarin: "哪里有地铁站？",
    note: "邊度是“哪里”，搭配有就能快速问位置，和问路主题很贴近。",
    example: "把目的地换进去也可以：邊度有便利店？",
    dayId: "day6"
  },
  {
    id: "feature-king",
    label: "聊天一句",
    title: "得閒再傾。",
    jyutping: "dak1 haan4 zoi3 king1",
    mandarin: "有空再聊。",
    note: "傾是“聊天、谈一谈”，语气比正式的“谈话”轻松很多。",
    example: "电话结束前可以说：好呀，得閒再傾。",
    dayId: "day4"
  },
  {
    id: "feature-daai-gaam-gaa",
    label: "购物一句",
    title: "撞啱大減價。",
    jyutping: "zong6 ngam1 daai6 gaam2 gaa3",
    mandarin: "碰巧大减价。",
    note: "撞啱表示“碰巧遇上”，逛商场、买衣服时很常用。",
    example: "看到打折可以说：撞啱大減價，就去掃貨。",
    dayId: "day7"
  },
  {
    id: "feature-gem-zung",
    label: "交通一句",
    title: "快啲撳鐘落車啦。",
    jyutping: "fai3 di1 gem6 zung1 log6 ce1 la1",
    mandarin: "快点按铃下车吧。",
    note: "撳鐘是在巴士、小巴上按铃示意下车，交通场景里很实用。",
    example: "坐过站前可以提醒同行的人：快啲撳鐘落車啦。",
    dayId: "day8"
  }
];
const HOME_CULTURE_CARDS = [
  {
    id: "culture-thanks",
    kind: "粤普差异",
    title: "唔該 vs 多謝",
    summary: "两个都像“谢谢”，但使用场景不一样。",
    detail: "别人帮你做了一件服务型的小事，例如让路、递东西、点单，用唔該很自然；收到礼物或更明确的好意时，多謝更合适。",
    sample: "服务员端上奶茶：唔該晒。朋友送你票：多謝晒。",
    dayId: "day3"
  },
  {
    id: "culture-di",
    kind: "语气趣点",
    title: "啲：一点，也是一批",
    summary: "啲常见到几乎像粤语里的万能小颗粒。",
    detail: "啲可以表示复数或少量，比如呢啲是“这些”，平啲是“便宜一点”。读句子时留意它前后的词，意思会更清楚。",
    sample: "呢啲嘢好靚。呢杯凍啲得唔得？",
    dayId: "day2"
  },
  {
    id: "culture-laa",
    kind: "语气助词",
    title: "喇：把话轻轻收住",
    summary: "喇常让一句话听起来更像自然口语。",
    detail: "它可以表示提醒、变化已经发生，或让语气更柔和。不要硬翻译，先把它当成一句话的口气尾巴。",
    sample: "夠鐘喇。走喇。唔該晒喇。",
    dayId: "day1"
  },
  {
    id: "scene-cafe",
    kind: "港味生活",
    title: "茶餐厅点单",
    summary: "短、快、直接，是很好的粤语听力场景。",
    detail: "茶餐厅对话经常出现唔該、要、凍、熱、呢個、嗰個。先抓关键词，再慢慢补完整句子。",
    sample: "唔該，一杯凍奶茶，一個菠蘿油。",
    dayId: "day5"
  },
  {
    id: "scene-phone",
    kind: "港味生活",
    title: "电话里的开场白",
    summary: "打电话时，确认人和事通常比寒暄更早出现。",
    detail: "可以先说喂、我係，然后说明找谁或什么事。练 Day 4 的句子时，特别适合连着读出来。",
    sample: "喂，我係阿明。請問陳小姐喺唔喺度？",
    dayId: "day4"
  },
  {
    id: "scene-meet",
    kind: "港味生活",
    title: "约会不只浪漫",
    summary: "粤语里的约会也可以是约朋友、约时间。",
    detail: "约时间时常会用今日、聽日、幾點、得唔得。把时间词练熟，真实对话会顺很多。",
    sample: "聽日下晝三點得唔得？",
    dayId: "day5"
  }
];

let activeDay = "day1";
let activeModule = "全部內容";
let wrongOnly = false;
let currentQuestion = null;
let state = loadState();
let homeMode = true;
let expandedHomeCard = null;

const items = window.STUDY_ITEMS;
const byId = new Map(items.map((item) => [item.id, item]));
const sentenceAudio = new Audio();
let speechUtterance = null;
const TRADITIONAL_TO_SIMPLIFIED = {
  粵: "粤",
  語: "语",
  學: "学",
  複: "复",
  習: "习",
  聲: "声",
  點: "点",
  詞: "词",
  彙: "汇",
  課: "课",
  補: "补",
  電: "电",
  擾: "扰",
  錯: "错",
  題: "题",
  這: "这",
  個: "个",
  篩: "筛",
  選: "选",
  練: "练",
  內: "内",
  容: "容",
  韻: "韵",
  調: "调",
  體: "体",
  標: "标",
  準: "准",
  發: "发",
  確: "确",
  認: "认",
  講: "讲",
  讀: "读",
  曬: "晒",
  麼: "么",
  乜: "乜",
  還: "还",
  來: "来",
  到: "到",
  習: "习",
  慣: "惯",
  幾: "几",
  而: "而",
  家: "家",
  現: "现",
  在: "在",
  處: "处",
  點: "点",
  疑: "疑",
  助: "助",
  督: "督",
  促: "促",
  提: "提",
  醒: "醒",
  知: "知",
  喇: "喇",
  對: "对",
  轉: "转",
  折: "折",
  胖: "胖",
  指: "指",
  以: "以",
  前: "前",
  久: "久",
  沒: "没",
  替: "替",
  候: "候",
  開: "开",
  參: "参",
  加: "加",
  業: "业",
  成: "成",
  就: "就",
  彼: "彼",
  此: "此",
  晚: "晚",
  安: "安",
  睡: "睡",
  覺: "觉",
  語: "语",
  境: "境",
  保: "保",
  留: "留",
  當: "当",
  情: "情",
  況: "况",
  大: "大",
  有: "有",
  改: "改",
  善: "善",
  最: "最",
  近: "近",
  段: "段",
  常: "常",
  省: "省",
  略: "略",
  數: "数",
  量: "量",
  泛: "泛",
  可: "可",
  表: "表",
  示: "示",
  幫: "帮",
  忙: "忙",
  介: "介",
  説: "说",
  說: "说",
  構: "构",
  字: "字",
  例: "例",
  與: "与",
  發: "发",
  音: "音",
  相: "相",
  同: "同",
  接: "接",
  但: "但",
  較: "较",
  練: "练",
  確: "确",
  寫: "写",
  出: "出",
  所: "所",
  屬: "属",
  請: "请",
  先: "先",
  正: "正",
  然: "然",
  後: "后",
  黑: "黑",
  母: "母",
  填: "填",
  入: "入",
  空: "空",
  格: "格",
  辦: "办",
  實: "实",
  問: "问",
  答: "答",
  短: "短",
  文: "文",
  朗: "朗",
  記: "记",
  得: "得",
  訴: "诉",
  休: "休",
  息: "息",
  次: "次",
  句: "句",
  子: "子",
  部: "部",
  分: "分",
  每: "每",
  句: "句",
  不: "不",
  一: "一",
  樣: "样",
  張: "张",
  陣: "阵",
  這: "这",
  個: "个",
  哪: "哪",
  裡: "里",
  裏: "里",
  個: "个",
  些: "些",
  點: "点",
  氣: "气",
  麼: "么",
  寫: "写",
  買: "买",
  飲: "饮",
  雜: "杂",
  貨: "货",
  廣: "广",
  場: "场",
  頭: "头",
  傷: "伤",
  痕: "痕",
  園: "园",
  啟: "启",
  頓: "顿",
  球: "球",
  達: "达",
  灣: "湾",
  臺: "台",
  台: "台",
  仔: "仔",
  兒: "儿",
  舊: "旧",
  術: "术",
  體: "体",
  設: "设",
  資: "资",
  產: "产",
  質: "质",
  責: "责",
  寶: "宝",
  標: "标",
  批: "批",
  評: "评",
  豐: "丰",
  富: "富",
  賭: "赌",
  痛: "痛",
  鬧: "闹",
  輪: "轮",
  流: "流",
  料: "料",
  強: "强",
  權: "权",
  危: "危",
  餓: "饿",
  客: "客",
  製: "制",
  造: "造",
  從: "从",
  親: "亲",
  戚: "戚",
  死: "死",
  水: "水",
  書: "书",
  信: "信",
  醫: "医",
  院: "院",
  引: "引",
  用: "用",
  圓: "圆",
  唇: "唇",
  光: "光",
  棍: "棍",
  拳: "拳",
  攜: "携",
  帶: "带",
  維: "维",
  護: "护",
  傳: "传",
  項: "项",
  隻: "只",
  壓: "压",
  禮: "礼",
  針: "针",
  藥: "药",
  慘: "惨",
  燒: "烧",
  風: "风",
  預: "预",
  長: "长",
  診: "诊",
  費: "费",
  鹽: "盐",
  暈: "晕",
  門: "门",
  鹹: "咸",
  欖: "榄",
  臨: "临",
  陰: "阴",
  謀: "谋",
  險: "险",
  擔: "担",
  談: "谈",
  彈: "弹",
  減: "减",
  價: "价",
  梘: "枧",
  簽: "签",
  萬: "万",
  憐: "怜",
  憫: "悯",
  錶: "表",
  遠: "远",
  凍: "冻",
  視: "视",
  願: "愿",
  試: "试",
  寧: "宁",
  頸: "颈",
  擇: "择",
  蹺: "跷",
  靚: "靓",
  樹: "树",
  種: "种",
  腫: "肿",
  撻: "挞",
  嘆: "叹",
  夠: "够",
  嘔: "呕",
  熱: "热",
  潔: "洁",
  傾: "倾",
  環: "环",
  廢: "废",
  嚴: "严",
  島: "岛",
  銅: "铜",
  鑼: "锣",
  龍: "龙",
  諗: "谂",
  徵: "征",
  絕: "绝",
  號: "号",
  贊: "赞",
  諮: "咨",
  詢: "询",
  應: "应",
  順: "顺",
  圍: "围",
  區: "区",
  規: "规",
  劃: "划",
  決: "决",
  響: "响",
  歡: "欢",
  韓: "韩",
  國: "国",
  調: "调",
  經: "经",
  選: "选",
  讀: "读",
  報: "报",
  訴: "诉",
  務: "务",
  濕: "湿",
  脫: "脱",
  介: "介",
  紹: "绍",
  下: "下",
  小: "小",
  姐: "姐",
  王: "王",
  三: "三",
  橫: "横",
  河: "河",
  自: "自",
  高: "高",
  興: "兴",
  東: "东",
  西: "西",
  肥: "肥",
  貴: "贵",
  便: "便",
  宜: "宜",
  漂: "漂",
  亮: "亮",
  錢: "钱",
  左: "左",
  右: "右",
  上: "上",
  前: "前",
  出: "出",
  口: "口",
  謝: "谢",
  用: "用",
  沒: "没",
  關: "关",
  係: "系",
  客: "客",
  氣: "气",
  寫: "写",
  見: "见",
  聽: "听",
  開: "开",
  關: "关",
  係: "系",
  邊: "边",
  嚟: "来",
  冇: "冇",
  啲: "啲",
  喺: "喺",
  嘅: "嘅",
  咗: "咗",
  佢: "佢",
  哋: "哋",
  唔: "唔",
  嗰: "嗰",
  嘢: "嘢",
  噉: "噉",
  吖: "吖",
  㗎: "㗎",
  貴: "贵",
  姓: "姓",
  這: "这",
  位: "位",
  先: "先",
  生: "生",
  買: "买",
  賣: "卖",
  飯: "饭",
  婚: "婚",
  姻: "姻",
  難: "难",
  產: "产",
  贈: "赠",
  燈: "灯",
  雞: "鸡",
  對: "对",
  比: "比",
  顯: "显",
  示: "示",
  較: "较",
  將: "将",
  普: "普",
  通: "通",
  話: "话",
  釋: "释",
  義: "义",
  反: "反",
  查: "查",
  識: "识",
  別: "别",
  類: "类",
  型: "型",
  資: "资",
  料: "料",
  暫: "暂",
  無: "无",
  檔: "档",
  案: "案",
  存: "存",
  錄: "录",
  確: "确",
  緊: "紧",
  張: "张",
  成: "成",
  齊: "齐",
  樣: "样",
  點: "点",
  麼: "么",
  兒: "儿",
  實: "实",
  況: "况",
  問: "问",
  答: "答",
  與: "与",
  過: "过",
  現: "现",
  亞: "亚",
  廣: "广",
  東: "东",
  國: "国",
  黃: "黄",
  吳: "吴",
  陳: "陈",
  鄭: "郑",
  會: "会",
  計: "计",
  祕: "秘",
  書: "书",
  經: "经",
  理: "理",
  紙: "纸",
  職: "职",
  擴: "扩",
  員: "员",
  動: "动",
  驗: "验",
  爭: "争",
  該: "该",
  歷: "历",
  遙: "遥",
  際: "际",
  駐: "驻",
  搶: "抢",
  離: "离",
  營: "营",
  條: "条",
  額: "额",
  貼: "贴",
  慮: "虑",
  闆: "板",
  鍾: "钟",
  於: "于",
  約: "约",
  積: "积",
  療: "疗",
  為: "为",
  優: "优",
  勢: "势",
  紅: "红",
  楊: "杨",
  蔣: "蒋",
  導: "导",
  獎: "奖",
  糧: "粮",
  鬆: "松",
  撈: "捞",
  騎: "骑",
  馬: "马",
  腳: "脚",
  鐘: "钟",
  魷: "鱿",
  魚: "鱼",
  齣: "出",
  運: "运",
  輸: "输",
  線: "线",
  專: "专",
  頁: "页",
  觀: "观",
  樂: "乐",
  遊: "游",
  覽: "览",
  廈: "厦",
  碼: "码",
  樓: "楼",
  總: "总",
  藝: "艺",
  賽: "赛",
  鵝: "鹅",
  鳥: "鸟",
  廳: "厅",
  勝: "胜",
  華: "华",
  囑: "嘱",
  廟: "庙",
  籤: "签",
  靈: "灵",
  燭: "烛",
  豬: "猪",
  財: "财",
  鄉: "乡",
  齋: "斋",
  攝: "摄",
  許: "许",
  證: "证",
  冊: "册",
  顧: "顾",
  隨: "随",
  歲: "岁",
  敗: "败",
  緣: "缘",
  養: "养",
  態: "态",
  獲: "获",
  歸: "归",
  鎮: "镇",
  疫: "疫",
  註: "注",
  遷: "迁",
  眾: "众",
  閒: "闲",
  穎: "颖",
  靡: "靡",
  劇: "剧",
  幕: "幕",
  銜: "衔",
  麗: "丽",
  貌: "貌",
  儀: "仪",
  慧: "慧",
  頗: "颇",
  譽: "誉",
  虛: "虚",
  假: "假",
  斷: "断",
  齡: "龄",
  歧: "歧",
  烏: "乌",
  憑: "凭",
  膩: "腻",
  鮮: "鲜",
  潤: "润",
  滬: "沪",
  餅: "饼",
  歐: "欧",
  麥: "麦",
  漢: "汉",
  堡: "堡",
  遜: "逊",
  餚: "肴",
  祺: "祺",
  貼: "贴",
  鋸: "锯",
  枱: "台",
  餐: "餐",
  雞: "鸡",
  儉: "俭",
  預: "预",
  鑊: "镬",
  鍋: "锅",
  鑄: "铸",
  鏟: "铲",
  蓋: "盖",
  讚: "赞",
  賞: "赏",
  趣: "趣",
  緻: "致",
  燉: "炖",
  湯: "汤",
  膽: "胆",
  醇: "醇",
  迴: "回",
  旋: "旋",
  盅: "盅",
  蝦: "虾",
  餃: "饺",
  鳳: "凤",
  爪: "爪",
  蓮: "莲",
  蓉: "蓉",
  蹄: "蹄",
  糕: "糕",
  芒: "芒",
  布: "布",
  甸: "甸",
  揀: "拣",
  腸: "肠",
  粥: "粥",
  滾: "滚",
  辣: "辣",
  摻: "掺",
  脆: "脆",
  經: "经",
  濟: "济",
  惠: "惠",
  購: "购",
  消: "消",
  賞: "赏",
  蔽: "蔽",
  舖: "铺",
  斕: "斓",
  繚: "缭",
  亂: "乱",
  閒: "闲",
  階: "阶",
  層: "层",
  豪: "豪",
  攤: "摊",
  譬: "譬",
  皆: "皆",
  脛: "胫",
  亞: "亚",
  近: "近",
  適: "适",
  飾: "饰",
  榜: "榜",
  後: "后",
  順: "顺",
  呃: "呃",
  秤: "秤",
  騙: "骗",
  鄙: "鄙",
  祕: "秘",
  譽: "誉",
  錢: "钱",
  梳: "梳",
  盎: "盎",
  罐: "罐",
  紙: "纸",
  卦: "卦",
  絲: "丝",
  跡: "迹",
  臆: "臆",
  德: "德",
  離: "离",
  歉: "歉",
  涵: "涵",
  煩: "烦",
  攪: "搅",
  泳: "泳",
  鏡: "镜",
  霧: "雾",
  吸: "吸",
  矇: "蒙",
  查: "查",
  飆: "飙",
  飈: "飙",
  升: "升",
  稠: "稠",
  密: "密",
  缺: "缺",
  狀: "状",
  企: "企",
  節: "节",
  淨: "净",
  限: "限",
  剩: "剩",
  律: "律",
  師: "师",
  筆: "笔",
  銀: "银",
  鎖: "锁",
  匙: "匙",
  縮: "缩",
  薪: "薪",
  捱: "挨",
  騾: "骡",
  類: "类",
  餉: "饷",
  釐: "厘",
  象: "象",
  孭: "孭",
  債: "债",
  期: "期",
  週: "周",
  周: "周",
  氹: "凼",
  浸: "浸",
  極: "极",
  懵: "懵",
  棘: "棘",
  瀉: "泻",
  壞: "坏",
  執: "执",
  笠: "笠",
  口: "口",
  營: "营",
  隊: "队",
  豐: "丰",
  潔: "洁",
  效: "效",
  隨: "随",
  機: "机",
  應: "应",
  變: "变",
  警: "警",
  告: "告",
  義: "义",
  車: "车",
  站: "站",
  秩: "秩",
  序: "序",
  警: "警",
  帳: "账",
  償: "偿",
  借: "借",
  私: "私",
  閂: "闩",
  望: "望",
  怨: "怨",
  漏: "漏",
  報: "报",
  枉: "枉",
  委: "委",
  婉: "婉",
  該: "该",
  快: "快",
  手: "手",
  實: "实",
  呎: "呎",
  搞: "搞",
  掂: "掂",
  搬: "搬",
  嘈: "嘈",
  貪: "贪",
  築: "筑",
  廳: "厅",
  內: "内",
  緻: "致",
  硤: "硖",
  尾: "尾",
  着: "着",
  著: "着",
  批: "批",
  廉: "廉",
  計: "计",
  邨: "邨",
  擁: "拥",
  獨: "独",
  廁: "厕",
  廚: "厨",
  齊: "齐",
  備: "备",
  申: "申",
  標: "标",
  需: "需",
  鼓: "鼓",
  勵: "励",
  世: "世",
  紀: "纪",
  績: "绩",
  睹: "睹"
};

const els = {
  app: document.querySelector("#app"),
  homeView: document.querySelector("#homeView"),
  homeDayGrid: document.querySelector("#homeDayGrid"),
  homeFeatureGrid: document.querySelector("#homeFeatureGrid"),
  homeCultureGrid: document.querySelector("#homeCultureGrid"),
  homeStatDays: document.querySelector("#homeStatDays"),
  homeStatTotal: document.querySelector("#homeStatTotal"),
  homeStatDone: document.querySelector("#homeStatDone"),
  homeBtn: document.querySelector("#homeBtn"),
  brandHomeBtn: document.querySelector("#brandHomeBtn"),
  moduleNav: document.querySelector("#moduleNav"),
  activeModuleLabel: document.querySelector("#activeModuleLabel"),
  progressPercent: document.querySelector("#progressPercent"),
  doneCount: document.querySelector("#doneCount"),
  totalCount: document.querySelector("#totalCount"),
  resetTodayBtn: document.querySelector("#resetTodayBtn"),
  wrongOnlyBtn: document.querySelector("#wrongOnlyBtn"),
  shuffleBtn: document.querySelector("#shuffleBtn"),
  quizCategory: document.querySelector("#quizCategory"),
  quizType: document.querySelector("#quizType"),
  questionPrompt: document.querySelector("#questionPrompt"),
  questionStem: document.querySelector("#questionStem"),
  options: document.querySelector("#options"),
  feedback: document.querySelector("#feedback"),
  againBtn: document.querySelector("#againBtn"),
  knownBtn: document.querySelector("#knownBtn"),
  factTraditionalLabel: document.querySelector("#factTraditionalLabel"),
  factJyutpingLabel: document.querySelector("#factJyutpingLabel"),
  factMandarinLabel: document.querySelector("#factMandarinLabel"),
  factTraditional: document.querySelector("#factTraditional"),
  factJyutping: document.querySelector("#factJyutping"),
  factMandarin: document.querySelector("#factMandarin"),
  examplesBlock: document.querySelector("#examplesBlock"),
  wrongList: document.querySelector("#wrongList")
};

function toSimplified(value) {
  return String(value ?? "").replace(/[^\x00-\x7F]/g, (char) => TRADITIONAL_TO_SIMPLIFIED[char] || char);
}

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      done: parsed.done || {},
      wrong: parsed.wrong || {},
      retry: parsed.retry || {},
      familiarity: parsed.familiarity || {},
      sessions: parsed.sessions || {}
    };
  } catch {
    return { done: {}, wrong: {}, retry: {}, familiarity: {}, sessions: {} };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function itemDay(item) {
  return item.day || "day1";
}

function filteredItems() {
  let pool = items.filter((item) => itemDay(item) === activeDay);
  if (activeModule !== "全部內容") {
    pool = pool.filter((item) => item.module === activeModule);
  }
  if (wrongOnly) {
    pool = pool.filter((item) => state.wrong[item.id]);
  }
  return pool;
}

function studyContextKey() {
  return `${activeDay}::${activeModule}::${wrongOnly ? "wrong" : "all"}`;
}

function studySession() {
  const key = studyContextKey();
  if (!state.sessions[key]) {
    state.sessions[key] = { seen: [], current: null };
  }
  return state.sessions[key];
}

function retryGap() {
  return RETRY_MIN_GAP + Math.floor(Math.random() * (RETRY_MAX_GAP - RETRY_MIN_GAP + 1));
}

function ensureRetryState() {
  if (!state.retry) state.retry = {};
  return state.retry;
}

function retryRemaining(retry) {
  const remaining = retry.newCardsUntilDue ?? retry.due ?? retryGap();
  return Math.max(0, Number(remaining || 0));
}

function retryState(previous = {}, newCardsUntilDue = retryGap()) {
  return {
    newCardsUntilDue,
    due: newCardsUntilDue,
    repeats: previous.repeats || 0
  };
}

function markForRetry(item) {
  const retry = ensureRetryState();
  const previous = retry[item.id] || {};
  retry[item.id] = retryState(previous);
  state.wrong[item.id] = true;
  delete state.done[item.id];
}

function clearRetry(item) {
  delete state.wrong[item.id];
  if (state.retry) delete state.retry[item.id];
}

function isRetryItem(item) {
  return Boolean(state.retry?.[item.id]);
}

function countRegularCardForRetry(pool) {
  const poolIds = new Set(pool.map((item) => item.id));
  Object.entries(ensureRetryState()).forEach(([id, retry]) => {
    if (!poolIds.has(id)) return;
    const next = Math.max(0, retryRemaining(retry) - 1);
    retry.newCardsUntilDue = next;
    retry.due = next;
  });
}

function retryCandidates(pool) {
  return pool.filter((item) => {
    const retry = state.retry?.[item.id];
    return retry && retryRemaining(retry) <= 0;
  });
}

function rescheduleRetry(item) {
  const retry = ensureRetryState();
  const previous = retry[item.id] || {};
  retry[item.id] = retryState({ repeats: (previous.repeats || 0) + 1 });
}

function validDayIds() {
  return new Set(DAY_ORDER.map((day) => day.id));
}

function dayFromHash() {
  const dayId = decodeURIComponent(location.hash.replace(/^#/, ""));
  return validDayIds().has(dayId) ? dayId : null;
}

function clearInvalidHash() {
  if (location.hash) {
    history.replaceState(null, "", `${location.pathname}${location.search}`);
  }
}

function navigateToDay(dayId) {
  if (!validDayIds().has(dayId)) return;
  const nextHash = `#${dayId}`;
  if (location.hash === nextHash) {
    syncRoute();
    return;
  }
  location.hash = dayId;
}

function navigateHome() {
  history.pushState(null, "", `${location.pathname}${location.search}`);
  syncRoute();
}

function syncRoute() {
  const routedDay = dayFromHash();
  homeMode = !routedDay;

  if (routedDay) {
    activeDay = routedDay;
  } else {
    clearInvalidHash();
  }

  activeModule = "全部內容";
  wrongOnly = false;
  els.wrongOnlyBtn.classList.remove("active");
  render();
}

function buildHomeDays() {
  els.homeDayGrid.innerHTML = "";
  const totalItems = items.filter((item) => validDayIds().has(itemDay(item))).length;
  const doneItems = items.filter((item) => validDayIds().has(itemDay(item)) && state.done[item.id]).length;
  els.homeStatDays.textContent = DAY_ORDER.length;
  els.homeStatTotal.textContent = totalItems;
  els.homeStatDone.textContent = doneItems;

  DAY_ORDER.forEach((day) => {
    const dayItems = items.filter((item) => itemDay(item) === day.id);
    const modules = getModuleOrder(dayItems, day.id).filter((module) => module !== "全部內容");
    const done = dayItems.filter((item) => state.done[item.id]).length;
    const percent = dayItems.length ? Math.round((done / dayItems.length) * 100) : 0;
    const card = document.createElement("article");
    card.className = "home-day-card";
    card.innerHTML = `
      <div class="home-day-meta">
        <span class="home-day-kicker">${escapeHtml(day.label)}</span>
        <span>${dayItems.length} 题</span>
      </div>
      <div class="home-day-body">
        <h2>${escapeHtml(day.topic)}</h2>
        <p>${modules.map((module) => escapeHtml(toSimplified(module))).join(" · ") || "每日练习"}</p>
      </div>
      <div class="home-day-progress-block">
        <div class="home-day-status">
          <strong>${done}</strong>
          <span>/ ${dayItems.length} 已完成</span>
        </div>
        <div class="home-day-progress" aria-label="${escapeHtml(day.label)} 完成率 ${percent}%">
          <span style="width: ${percent}%"></span>
        </div>
      </div>
      <button class="primary-button home-day-button" type="button">进入 ${escapeHtml(day.label)}</button>
    `;
    card.querySelector("button").addEventListener("click", () => navigateToDay(day.id));
    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      navigateToDay(day.id);
    });
    els.homeDayGrid.append(card);
  });
}

function buildHomeMagazine() {
  renderHomeCardGrid(els.homeFeatureGrid, dailyCards(HOME_FEATURES, DAILY_FEATURE_COUNT, "feature"), "feature");
  renderHomeCardGrid(els.homeCultureGrid, dailyCards(HOME_CULTURE_CARDS, DAILY_CULTURE_COUNT, "culture"), "culture");
}

function dailyCards(cards, count, salt) {
  if (cards.length <= count) return rotateCards(cards, dailyIndex(cards.length, salt));
  return rotateCards(cards, dailyIndex(cards.length, salt)).slice(0, count);
}

function rotateCards(cards, offset) {
  return cards.map((_, index) => cards[(index + offset) % cards.length]);
}

function dailyIndex(length, salt) {
  if (!length) return 0;
  const today = new Date();
  const localDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const dayNumber = Math.floor(localDay.getTime() / 86400000);
  const saltNumber = [...salt].reduce((total, char) => total + char.charCodeAt(0), 0);
  return (dayNumber + saltNumber) % length;
}

function renderHomeCardGrid(container, cards, variant) {
  container.innerHTML = "";
  cards.forEach((card) => {
    const isExpanded = expandedHomeCard === card.id;
    const article = document.createElement("article");
    article.className = `home-mag-card ${variant === "feature" ? "featured" : "compact"}${isExpanded ? " expanded" : ""}`;
    article.innerHTML = homeCardTemplate(card, isExpanded, variant);
    article.querySelector(".home-mag-toggle").addEventListener("click", () => {
      expandedHomeCard = isExpanded ? null : card.id;
      buildHomeMagazine();
    });
    const dayButton = article.querySelector("[data-day]");
    if (dayButton) {
      dayButton.addEventListener("click", () => navigateToDay(dayButton.dataset.day));
    }
    container.append(article);
  });
}

function homeCardTemplate(card, isExpanded, variant) {
  const day = DAY_ORDER.find((entry) => entry.id === card.dayId);
  const detail = variant === "feature"
    ? `
      <dl class="home-expression-meta">
        <div>
          <dt>粤拼</dt>
          <dd>${escapeHtml(card.jyutping)}</dd>
        </div>
        <div>
          <dt>普通话</dt>
          <dd>${escapeHtml(card.mandarin)}</dd>
        </div>
      </dl>
    `
    : `<p class="home-card-summary">${escapeHtml(card.summary)}</p>`;
  const expanded = isExpanded
    ? `
      <div class="home-card-detail">
        <p>${escapeHtml(card.note || card.detail)}</p>
        <p class="home-card-example">${escapeHtml(card.example || card.sample)}</p>
        <button class="secondary-button home-card-day" type="button" data-day="${escapeHtml(card.dayId)}">
          去 ${escapeHtml(day?.label || "Day")} · ${escapeHtml(day?.topic || "练习")}
        </button>
      </div>
    `
    : "";

  return `
    <div class="home-card-topline">
      <span>${escapeHtml(card.label || card.kind)}</span>
      <button class="home-mag-toggle" type="button" aria-expanded="${isExpanded}">
        ${isExpanded ? "收起" : "展开"}
      </button>
    </div>
    <div class="home-card-main">
      <h3>${escapeHtml(card.title)}</h3>
      ${detail}
    </div>
    ${expanded}
  `;
}

function buildModules() {
  els.moduleNav.innerHTML = "";
  const dayItems = items.filter((item) => itemDay(item) === activeDay);
  getModuleOrder(dayItems).forEach((module) => {
    const count = module === "全部內容" ? dayItems.length : dayItems.filter((item) => item.module === module).length;
    const button = document.createElement("button");
    button.className = `module-button${module === activeModule ? " active" : ""}`;
    button.type = "button";
    button.innerHTML = `<span>${escapeHtml(toSimplified(module))}</span><span class="module-count">${count}</span>`;
    button.addEventListener("click", () => {
      saveState();
      activeModule = module;
      wrongOnly = false;
      els.wrongOnlyBtn.classList.remove("active");
      render();
    });
    els.moduleNav.append(button);
  });
}

function getModuleOrder(dayItems, dayId = activeDay) {
  if (dayId === "day1") return DEFAULT_MODULE_ORDER;
  const modules = new Set(dayItems.map((item) => item.module));
  return CHAPTER_BOOK_MODULE_ORDER.filter((module) => module === "全部內容" || modules.has(module));
}

function makeQuestion({ advance = false, skipItemId = null } = {}) {
  const pool = filteredItems();
  if (!pool.length) {
    currentQuestion = null;
    return;
  }

  const session = studySession();
  const poolIds = new Set(pool.map((item) => item.id));
  session.seen = session.seen.filter((id) => poolIds.has(id));

  if (!advance && session.current) {
    const restoredItem = byId.get(session.current.itemId);
    if (restoredItem && poolIds.has(restoredItem.id) && restoredItem.questionTypes.includes(session.current.type)) {
      currentQuestion = { item: restoredItem, type: session.current.type };
      saveState();
      return;
    }
  }

  if (advance) {
    const dueRetry = retryCandidates(pool).filter((item) => item.id !== skipItemId);
    const sortedRetry = [...dueRetry].sort((a, b) => {
      const retryA = state.retry?.[a.id] || {};
      const retryB = state.retry?.[b.id] || {};
      return (retryA.repeats || 0) - (retryB.repeats || 0)
        || (state.familiarity[a.id] || 0) - (state.familiarity[b.id] || 0);
    });
    const retryItem = sample(sortedRetry.slice(0, Math.min(6, sortedRetry.length)));
    if (retryItem) {
      const type = sample(retryItem.questionTypes);
      currentQuestion = { item: retryItem, type };
      if (!session.seen.includes(retryItem.id)) session.seen.push(retryItem.id);
      session.current = { itemId: retryItem.id, type };
      rescheduleRetry(retryItem);
      saveState();
      return;
    }
  }

  const regularPool = pool.filter((item) => !isRetryItem(item) && item.id !== skipItemId);
  const fallbackPool = pool.filter((item) => item.id !== skipItemId);
  const selectionPool = regularPool.length ? regularPool : (fallbackPool.length ? fallbackPool : pool);
  const selectionIds = new Set(selectionPool.map((item) => item.id));
  session.seen = session.seen.filter((id) => selectionIds.has(id));

  const unseenInRound = pool.filter((item) => !session.seen.includes(item.id));
  let unseen = unseenInRound.filter((item) => selectionIds.has(item.id));
  if (!unseen.length) {
    const previousId = session.current?.itemId;
    session.seen = [];
    unseen = selectionPool.length > 1 ? selectionPool.filter((item) => item.id !== previousId) : [...selectionPool];
  }

  const sorted = [...unseen].sort((a, b) => (state.familiarity[a.id] || 0) - (state.familiarity[b.id] || 0));
  const candidates = sorted.slice(0, Math.min(12, sorted.length));
  const item = sample(candidates);
  const type = sample(item.questionTypes);
  currentQuestion = { item, type };
  session.seen.push(item.id);
  session.current = { itemId: item.id, type };
  if (isRetryItem(item)) rescheduleRetry(item);
  else countRegularCardForRetry(pool);
  saveState();
}

function getQuestionText(item, type) {
  if (type === "sentenceJyutping") {
    return { prompt: "看普通话，说出粤语，再听标准发音确认", stem: item.mandarin || item.simplified || item.traditional, answer: item.jyutping, field: "jyutping" };
  }
  if (type === "jyutping") {
    return { prompt: "选出正确粤拼", stem: item.traditional, answer: item.jyutping, field: "jyutping" };
  }
  if (type === "meaning") {
    return { prompt: "选出普通话意思", stem: item.traditional, answer: item.mandarin, field: "mandarin" };
  }
  return { prompt: "根据普通话意思选出粤语", stem: item.mandarin, answer: item.traditional, field: "traditional" };
}

function buildOptions(item, type) {
  const { answer, field } = getQuestionText(item, type);
  const source = items
    .filter((candidate) => candidate.id !== item.id)
    .map((candidate) => ({
      candidate,
      score: optionScore(item, candidate, type, field)
    }))
    .sort((a, b) => b.score - a.score || Math.random() - 0.5)
    .map(({ candidate }) => optionForCandidate(candidate, field, type))
    .filter((option, index, values) => option.value && option.value !== answer && values.findIndex((value) => value.value === option.value) === index)
    .slice(0, 3);
  return shuffle([optionForCandidate(item, field, type), ...source]);
}

function optionForCandidate(candidate, field, type) {
  const value = candidate[field];
  return { value, label: field === "jyutping" ? value : toSimplified(value) };
}

function optionScore(item, candidate, type, field) {
  let score = 0;
  if (itemDay(candidate) === itemDay(item)) score += 60;
  if (candidate.module === item.module) score += 40;
  if (candidate.category === item.category) score += 35;

  if (type === "jyutping" || type === "sentenceJyutping") {
    const a = parseJyutping(item.jyutping);
    const b = parseJyutping(candidate.jyutping);
    if (a.syllables === b.syllables) score += 18;
    if (a.tones === b.tones) score += 12;
    if (rimeKey(a.base) === rimeKey(b.base)) score += 24;
    if (a.base[0] && a.base[0] === b.base[0]) score += 8;
    if (a.base.at(-1) && a.base.at(-1) === b.base.at(-1)) score += 8;
    score += Math.max(0, 16 - editDistance(a.base, b.base) * 4);
  } else {
    const a = String(item[field]);
    const b = String(candidate[field]);
    if (a.length === b.length) score += 6;
    score += Math.max(0, 10 - Math.abs(a.length - b.length) * 2);
  }

  return score;
}

function rimeKey(base) {
  return base
    .split(/\s+/)
    .map((syllable) => syllable.replace(/^(gw|kw|ng|[bpmfdtnlzcsjgkhyw])/, ""))
    .join(" ");
}

function parseJyutping(value) {
  const parts = String(value).trim().split(/\s+/);
  return {
    base: parts.map((part) => part.replace(/[1-6]/g, "")).join(" "),
    tones: parts.map((part) => part.match(/[1-6]/)?.[0] || "").join(""),
    syllables: parts.length
  };
}

function editDistance(a, b) {
  const rows = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i += 1) rows[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) rows[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      rows[i][j] = Math.min(
        rows[i - 1][j] + 1,
        rows[i][j - 1] + 1,
        rows[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return rows[a.length][b.length];
}

function renderQuestion() {
  if (!currentQuestion) {
    delete els.questionStem.dataset.itemId;
    els.quizCategory.textContent = wrongOnly ? "错题本" : toSimplified(activeModule);
    els.quizType.textContent = "-";
    els.questionPrompt.textContent = wrongOnly ? "目前没有错题。" : "这个筛选没有可练习内容。";
    els.questionStem.innerHTML = "<small>换个模块试试。</small>";
    els.options.innerHTML = "";
    els.feedback.hidden = true;
    return;
  }

  const { item, type } = currentQuestion;
  els.questionStem.dataset.itemId = item.id;
  const question = getQuestionText(item, type);
  els.questionStem.classList.toggle("sentence-stem", type === "sentenceJyutping");
  els.quizCategory.textContent = toSimplified(item.category);
  els.quizType.textContent = TYPE_LABELS[type];
  els.questionPrompt.textContent = question.prompt;
  renderQuestionStem(item, type, question);
  els.feedback.hidden = true;
  els.feedback.textContent = "";
  els.options.innerHTML = "";

  buildOptions(item, type).forEach((option) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.textContent = option.label;
    button.dataset.value = option.value;
    button.addEventListener("click", () => answer(option.value, question.answer));
    els.options.append(button);
  });

  renderFactPanel(item, type);
  els.examplesBlock.innerHTML = item.examples.length
    ? `<strong>例：</strong>${item.examples.map((example) => escapeHtml(toSimplified(example))).join(" · ")}`
    : "";
}

function renderQuestionStem(item, type, question) {
  els.questionStem.textContent = "";
  if (type !== "sentenceJyutping") {
    const block = document.createElement("div");
    block.className = "question-stem-block";

    const row = document.createElement("div");
    row.className = "question-audio-row";

    const text = document.createElement("span");
    text.className = "question-stem-text";
    text.textContent = toSimplified(question.stem);
    row.append(text, createAudioButton(item));

    const meta = document.createElement("small");
    meta.textContent = `${toSimplified(item.module)} · ${toSimplified(item.category)}`;
    block.append(row, meta);
    els.questionStem.append(block);
    return;
  }

  const block = document.createElement("div");
  block.className = "sentence-block";

  const practiceRow = document.createElement("div");
  practiceRow.className = "question-audio-row";

  const mandarin = document.createElement("p");
  mandarin.className = "sentence-mandarin";
  mandarin.textContent = toSimplified(question.stem);
  practiceRow.append(mandarin, createAudioButton(item));

  const meta = document.createElement("small");
  meta.textContent = `${toSimplified(item.module)} · ${toSimplified(item.category)}`;

  block.append(practiceRow, meta);
  els.questionStem.append(block);
}

function getDisplayText(item) {
  return toSimplified(item.cantonese || item.traditional);
}

function renderFactPanel(item, type) {
  if (type === "sentenceJyutping") {
    renderSentenceFactPanel(item);
    return;
  }

  els.factTraditionalLabel.textContent = "粤语";
  els.factJyutpingLabel.textContent = "粤拼";
  els.factMandarinLabel.textContent = "普通话";
  renderFactTraditional(item);
  els.factJyutping.textContent = item.jyutping;
  els.factMandarin.textContent = toSimplified(item.mandarin);
}

function renderSentenceFactPanel(item) {
  els.factTraditionalLabel.textContent = "普通话";
  els.factJyutpingLabel.textContent = "练习";
  els.factMandarinLabel.textContent = "提示";
  els.factTraditional.textContent = "";
  const text = document.createElement("span");
  text.textContent = toSimplified(item.mandarin);
  els.factTraditional.append(text, createAudioButton(item));
  els.factJyutping.textContent = "先自己说，再选答案";
  els.factMandarin.textContent = toSimplified(item.mandarin);
}

function renderFactTraditional(item) {
  els.factTraditional.textContent = "";
  const text = document.createElement("span");
  text.textContent = getDisplayText(item);
  els.factTraditional.append(text);
  if (item.questionTypes.includes("sentenceJyutping")) {
    els.factTraditional.append(createAudioButton(item));
  }
}

function createAudioButton(item) {
  const button = document.createElement("button");
  button.className = "audio-button";
  button.type = "button";
  button.textContent = "▶";
  button.title = "播放粤语发音";
  button.setAttribute("aria-label", `播放粤语发音：${getDisplayText(item)}`);
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    playItemAudio(item, button);
  });
  return button;
}

function setAudioButtonPlaying(button, playing) {
  button.classList.toggle("playing", playing);
  button.textContent = playing ? "■" : "▶";
}

function playItemAudio(item, button) {
  sentenceAudio.pause();
  sentenceAudio.currentTime = 0;
  window.speechSynthesis?.cancel();
  setAudioButtonPlaying(button, true);

  if (!item.questionTypes.includes("sentenceJyutping")) {
    playSynthesizedCantonese(item, button);
    return;
  }

  sentenceAudio.src = `audio/sentences/${item.id}.m4a`;
  sentenceAudio.onended = () => {
    setAudioButtonPlaying(button, false);
  };
  sentenceAudio.play().catch(() => {
    playSynthesizedCantonese(item, button);
  });
}

function playSynthesizedCantonese(item, button) {
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    setAudioButtonPlaying(button, false);
    els.feedback.textContent = "当前浏览器暂不支持语音播放。";
    els.feedback.hidden = false;
    return;
  }

  speechUtterance = new SpeechSynthesisUtterance(item.cantonese || item.traditional);
  speechUtterance.lang = "zh-HK";
  speechUtterance.rate = 0.82;
  const voices = window.speechSynthesis.getVoices();
  speechUtterance.voice = voices.find((voice) => /^yue(-|_)/i.test(voice.lang))
    || voices.find((voice) => /^zh-HK$/i.test(voice.lang))
    || voices.find((voice) => /sinji|cantonese|hong kong/i.test(voice.name))
    || null;
  speechUtterance.onend = () => setAudioButtonPlaying(button, false);
  speechUtterance.onerror = () => {
    setAudioButtonPlaying(button, false);
    els.feedback.textContent = "粤语语音暂时无法播放，请检查系统语音设置。";
    els.feedback.hidden = false;
  };
  window.speechSynthesis.speak(speechUtterance);
}

function answer(selected, correct) {
  if (!currentQuestion) return;
  const isCorrect = selected === correct;
  const { item } = currentQuestion;

  [...els.options.children].forEach((button) => {
    button.disabled = true;
    if (button.dataset.value === correct) button.classList.add("correct");
    if (button.dataset.value === selected && !isCorrect) button.classList.add("incorrect");
  });

  if (isCorrect) {
    if (isRetryItem(item)) {
      state.familiarity[item.id] = Math.min(5, (state.familiarity[item.id] || 0) + 1);
      els.feedback.textContent = `答对了：${getDisplayText(item)} · ${item.jyutping} · ${toSimplified(item.mandarin)}。这张卡还会继续复现，点击“认得”才会移出错题。`;
    } else {
      state.done[item.id] = true;
      clearRetry(item);
      state.familiarity[item.id] = Math.min(5, (state.familiarity[item.id] || 0) + 1);
      els.feedback.textContent = `答对了：${getDisplayText(item)} · ${item.jyutping} · ${toSimplified(item.mandarin)}`;
    }
  } else {
    markForRetry(item);
    state.familiarity[item.id] = Math.max(-3, (state.familiarity[item.id] || 0) - 1);
    els.feedback.textContent = `正确答案是：${toSimplified(correct)}`;
  }
  els.feedback.hidden = false;
  saveState();
  renderProgress();
  renderWrongList();
}

function renderProgress() {
  const pool = filteredItems();
  const total = pool.length;
  const done = pool.filter((item) => state.done[item.id]).length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  els.progressPercent.textContent = `${percent}%`;
  els.doneCount.textContent = String(done);
  els.totalCount.textContent = String(total);
  document.documentElement.style.setProperty("--progress", `${percent * 3.6}deg`);
}

function renderWrongList() {
  const wrongItems = Object.keys(state.wrong)
    .map((id) => byId.get(id))
    .filter(Boolean)
    .slice(0, 8);
  els.wrongList.innerHTML = "";
  if (!wrongItems.length) {
    els.wrongList.textContent = "暂时没有错题。";
    return;
  }
  wrongItems.forEach((item) => {
    const row = document.createElement("div");
    row.className = "wrong-item";
    row.innerHTML = `<strong>${escapeHtml(toSimplified(item.traditional))}</strong><span>${escapeHtml(item.jyutping)}</span>`;
    els.wrongList.append(row);
  });
}

function render() {
  els.app.classList.toggle("home-mode", homeMode);
  buildHomeMagazine();
  buildHomeDays();
  if (homeMode) {
    currentQuestion = null;
    return;
  }

  buildModules();
  const dayLabel = DAY_ORDER.find((day) => day.id === activeDay)?.label || activeDay;
  els.activeModuleLabel.textContent = wrongOnly ? `${dayLabel} · 错题本` : `${dayLabel} · ${toSimplified(activeModule)}`;
  makeQuestion();
  renderQuestion();
  renderProgress();
  renderWrongList();
}

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

els.shuffleBtn.addEventListener("click", () => {
  makeQuestion({ advance: true });
  renderQuestion();
});

els.knownBtn.addEventListener("click", () => {
  if (!currentQuestion) return;
  state.done[currentQuestion.item.id] = true;
  clearRetry(currentQuestion.item);
  state.familiarity[currentQuestion.item.id] = Math.min(5, (state.familiarity[currentQuestion.item.id] || 0) + 1);
  saveState();
  makeQuestion({ advance: true });
  renderQuestion();
  renderProgress();
  renderWrongList();
});

els.againBtn.addEventListener("click", () => {
  if (!currentQuestion) return;
  const skippedItemId = currentQuestion.item.id;
  markForRetry(currentQuestion.item);
  state.familiarity[currentQuestion.item.id] = Math.max(-3, (state.familiarity[currentQuestion.item.id] || 0) - 1);
  saveState();
  makeQuestion({ advance: true, skipItemId: skippedItemId });
  renderQuestion();
  renderProgress();
  renderWrongList();
});

els.wrongOnlyBtn.addEventListener("click", () => {
  saveState();
  wrongOnly = !wrongOnly;
  els.wrongOnlyBtn.classList.toggle("active", wrongOnly);
  render();
});

els.resetTodayBtn.addEventListener("click", () => {
  filteredItems().forEach((item) => {
    delete state.done[item.id];
    delete state.wrong[item.id];
    if (state.retry) delete state.retry[item.id];
  });
  delete state.sessions[studyContextKey()];
  saveState();
  render();
});

els.homeBtn.addEventListener("click", navigateHome);
els.brandHomeBtn.addEventListener("click", navigateHome);
window.addEventListener("hashchange", syncRoute);
window.addEventListener("popstate", syncRoute);

syncRoute();
