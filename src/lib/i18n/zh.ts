import type { Dict } from './en';

export const zh: Dict = {
  meta: {
    title: 'Castro Auto Repair Service — 加州艾尔蒙特汽车维修',
    description:
      '艾尔蒙特 Garvey 大道上老板亲自坐镇的汽车修理厂。换油、刹车、排气与三元催化、空调、发动机大修，保时捷与奔驰专修。几分钟即可在线预约。',
  },

  nav: {
    home: '首页',
    services: '服务项目',
    about: '关于我们',
    visit: '到店信息',
    bookNow: '立即预约',
    menu: '菜单',
    close: '关闭',
    language: '语言',
  },

  common: {
    next: '下一步',
    back: '上一步',
    cancel: '取消',
    close: '关闭',
    done: '完成',
    optional: '选填',
    required: '必填',
    bookService: '预约服务',
    bookYourService: '预约您的服务',
    callUs: '致电我们',
    getDirections: '获取路线',
    learnMore: '了解更多',
    seeAllServices: '查看全部服务',
    openNow: '营业中',
    closedNow: '已打烊',
    openTodayUntil: '今日营业至 {time}',
    opensAt: '{day} {time} 开门',
    closed: '休息',
    walkInsWelcome: '欢迎直接到店 — 预约客户优先',
  },

  hero: {
    badge: '老板亲自经营 · 4.9★ 好评 · 艾尔蒙特',
    titleA: '安心上路，',
    titleB: '艾尔蒙特。',
    tagline:
      'Garvey 大道上诚信专业的汽车维修 — Juan Castro 和他的团队修得快、修得好，价格当面说清楚。',
    ctaPrimary: '预约您的服务',
    ctaSecondary: '浏览服务项目',
    statRating: '真实验证评分',
    statReviews: '顾客评价',
    statDays: '每周营业天数',
    scroll: '下滑',
  },

  marquee: [
    '4.9★ · 460+ 条真实评价',
    '老板亲自经营',
    '保时捷与奔驰专修',
    '发动机大修',
    '排气与三元催化',
    '价格公道 · 交车快',
    'Se Habla Español',
    '我们说中文',
  ],

  servicesSection: {
    kicker: '服务范围',
    title: '每个系统，一站搞定。',
    intro: '从快捷换油到发动机大修 — 家用车、工作皮卡和欧洲车，一次修好。',
    estimated: '约 {duration}',
  },

  services: {
    oil: {
      title: '换油保养',
      desc: '快捷干净的换油服务，每次到店顺带整车检查。',
      options: {
        conventional: {
          label: '常规机油保养',
          desc: '优质常规机油和机滤，补充各类油液，快速检查。',
        },
        fullSynthetic: {
          label: '全合成机油保养',
          desc: '高级全合成机油和机滤，适合现代发动机与更长保养周期。',
        },
        valuePackage: {
          label: '换油 + 体检套餐（超值之选）',
          desc: '全合成换油，外加电瓶检测、刹车检查和路试。',
        },
      },
    },
    brakes: {
      title: '刹车服务',
      desc: '刹车片、刹车盘、卡钳和刹车油 — 制动安心，不靠猜。',
      options: {
        inspection: {
          label: '刹车检查',
          desc: '全面测量刹车片、刹车盘和管路，给您一个直接的答案。',
        },
        padsRotors: {
          label: '刹车片与刹车盘更换',
          desc: '采用优质配件与全套附件更换，并正确磨合。',
        },
        fluidFlush: {
          label: '刹车油更换',
          desc: '整套液压系统冲洗，恢复扎实安心的踏板脚感。',
        },
      },
    },
    diagnostics: {
      title: '发动机诊断与维修',
      desc: '发动机故障灯追查到真正的病根 — 然后修好它。',
      options: {
        checkEngine: {
          label: '发动机故障灯',
          desc: '全面电脑扫描、精准测试，给您一个明确的答案。',
        },
        prePurchase: {
          label: '购车前检测',
          desc: '签字之前，先弄清楚您买的是什么车。',
        },
        drivability: {
          label: '行驶异常排查',
          desc: '熄火、顿挫、怠速不稳 — 我们一查到底。',
        },
      },
    },
    exhaust: {
      title: '排气与三元催化',
      desc: '消音器、排气管和三元催化 — 安静、合规、无泄漏。',
      options: {
        inspection: {
          label: '排气系统检查',
          desc: '举升机上从头到尾检查泄漏、异响和锈蚀。',
        },
        catConverter: {
          label: '三元催化转换器',
          desc: '诊断并更换合规的优质催化器。',
        },
        mufflerPipes: {
          label: '消音器与排气管',
          desc: '消音器和管路的维修或更换，焊接工整。',
        },
      },
    },
    ac: {
      title: '空调维修',
      desc: '艾尔蒙特的夏天需要冷气 — 空调专业诊断，一次做好。',
      options: {
        performanceCheck: {
          label: '空调性能检测',
          desc: '检测整套系统的温度、压力并排查泄漏。',
        },
        recharge: {
          label: '抽真空加注冷媒',
          desc: '按原厂标准加注冷媒，支持新型 1234yf 系统。',
        },
        heaterRepair: {
          label: '暖风维修',
          desc: '暖风水箱、风门、鼓风机和冷却液循环问题。',
        },
      },
    },
    battery: {
      title: '电瓶与电气系统',
      desc: '检测、电瓶、起动机、发电机和各种疑难电路问题。',
      options: {
        testReplace: {
          label: '电瓶检测 / 更换',
          desc: '当场负载测试；需要时安装优质电瓶。',
        },
        starterAlternator: {
          label: '起动机 / 发电机',
          desc: '起动与充电系统部件的诊断和更换。',
        },
        wiring: {
          label: '电路诊断',
          desc: '短路、漏电和莫名的警告灯，逐一排查到位。',
        },
      },
    },
    euro: {
      title: '欧洲车专修',
      desc: '保时捷和奔驰的专业保养维修，不用付 4S 店的价格。',
      options: {
        euroService: {
          label: '保时捷 / 奔驰保养',
          desc: '严格按手册执行德系车的定期保养。',
        },
        euroDiagnostics: {
          label: '欧洲车诊断',
          desc: '原厂级电脑诊断，维修方案实实在在。',
        },
        euroBrakes: {
          label: '欧洲车刹车与悬挂',
          desc: '原厂品质配件，按扭矩规范施工。',
        },
      },
    },
    rebuild: {
      title: '发动机大修',
      desc: '从磨损到焕然一新 — 本店自己动手大修，价格公道。',
      options: {
        evaluation: {
          label: '发动机评估',
          desc: '压缩测试、泄漏测试和检查，先诊断清楚再谈大事。',
        },
        topEnd: {
          label: '缸盖部分维修',
          desc: '缸垫、气门和正时部件。',
        },
        fullRebuild: {
          label: '整机大修',
          desc: '完整拆解重建，书面报价清清楚楚。',
        },
      },
    },
    scheduled: {
      title: '定期保养',
      desc: '3 万/6 万/9 万英里保养，护住质保，也护住您的车。',
      options: {
        minor30k: {
          label: '小保养（3 万英里级）',
          desc: '换油、滤芯更换和全车检查。',
        },
        major60k: {
          label: '大保养（6 万/9 万英里级）',
          desc: '按规范更换油液、滤芯、火花塞 — 原厂清单一项不少。',
        },
        factory: {
          label: '按手册保养（告诉我们里程即可）',
          desc: '严格按照厂家针对您当前里程的保养计划执行。',
        },
      },
    },
  },

  process: {
    kicker: 'Castro 的规矩',
    title: '不玩套路。从来不。',
    intro: '四个步骤，对每一辆进店的车都一样 — 460 条五星好评就是这么来的。',
    steps: [
      {
        title: '倾听与检查',
        desc: '先听您说，再用专业的眼睛和仪器找到问题。',
      },
      {
        title: '明明白白的报价',
        desc: '开工前价格说清楚，每一块钱都由您批准。',
      },
      {
        title: '一次修好',
        desc: '老师傅的手艺加优质配件 — 不走捷径，不强行推销。',
      },
      {
        title: '路试后再交车',
        desc: '每项维修都经过路试验证，才把钥匙交还给您。',
      },
    ],
  },

  why: {
    kicker: '为什么选 Castro',
    title: '您直接和修车师傅对话，而不是客服中心',
    body:
      '这是一家老板亲自经营的修理厂：Juan Castro 就在车间里、引擎盖下、柜台前。顾客评价翻来覆去就是那三个词 — 快、公道、修得好。这就是全部的经营之道。',
    points: [
      '老板亲自经营 — 给您报价的人就是修车的人',
      '任何工作开始前，价格先说清楚',
      '交车快 — 大多数维修当天完工',
      '保时捷与奔驰专业维修',
      '接受刷卡 · 等候有免费 Wi-Fi · 无障碍入口',
      '提供英语、西班牙语和中文服务',
    ],
    statRating: '平均真实评分',
    statReviews: '全平台评价数',
    statDays: '每周营业天数',
    statOwner: '老板亲自经营',
  },

  testimonials: {
    kicker: '口碑相传',
    title: '艾尔蒙特的老顾客一来再来',
    note: '内容代表 Yelp 和 Birdeye 上经过验证的顾客评价。',
    items: [
      {
        quote:
          '又快又利索 — 他找到了问题，报了个很实在的价格，当天就修好了。街坊修车行就该是这个样子。',
        name: 'R. Mendoza',
        detail: 'Honda Civic · 艾尔蒙特',
      },
      {
        quote:
          '我的奔驰不去 4S 店，就来这里。一样的工艺，账单只有零头，而且 Juan 动手之前会把一切解释清楚。',
        name: 'K. Lam',
        detail: 'Mercedes-Benz C300 · 柔似蜜',
      },
      {
        quote: '“靠谱”两个字。我们家三辆车，全都开来 Castro。他说多少钱，就是多少钱。',
        name: 'D. Alvarez',
        detail: 'Ford F-150 · 南艾尔蒙特',
      },
    ],
  },

  visitBand: {
    kicker: '欢迎到店',
    title: 'Garvey 大道，艾尔蒙特',
    addressLabel: '地址',
    phoneLabel: '电话',
    hoursLabel: '营业时间',
    hoursLines: ['周一、周三：上午 8:00 – 晚上 7:00', '周二 · 周四 · 周五：上午 8:00 – 下午 4:00', '周六、周日：休息'],
    amenities: '接受刷卡 · 免费 Wi-Fi · 无障碍入口',
    note:
      '这样的店不靠广告 — 靠的是街坊介绍街坊。您来取钥匙时，干活的名字就是门口招牌上的名字。',
    noteSign: '— Juan Castro 与 Castro Auto 一家',
    humanLine: '营业时间来电，接电话的就是修车师傅 — 永远没有语音菜单。',
    copyHint: '点击复制',
    copied: '已复制！',
    closesIn: '营业中 · {t}后打烊',
    opensIn: '{t}后开门',
    opensOn: '{day} {time} 开门',
    mapTag: '我们在这里',
    mapHint: '点击地图获取逐向导航',
  },

  servicesPage: {
    kicker: '服务项目',
    title: '真正的一站式服务。',
    intro:
      '家用车、工作皮卡 — 保养、维修、排气、发动机大修，还有别家送去 4S 店的德国车，一个屋檐下全部解决。',
    groups: {
      maintenance: '定期保养',
      repair: '维修与诊断',
      tiresBrakes: '刹车与安全',
      climate: '空调与电气',
      hybrid: '欧洲车专修',
      fleet: '卡车与车队',
    },
    includes: '常见项目',
    ctaTitle: '不确定车子哪里出了问题？',
    ctaBody: '把症状告诉我们，剩下的交给我们 — 诊断正是我们的强项。',
  },

  aboutPage: {
    kicker: '我们的故事',
    title: '老板就是修车师傅',
    lead:
      'Castro Auto Repair Service 是艾尔蒙特 Garvey 大道上一家老板亲自经营的修理厂 — 给您报价的人，就是给您修车的人。',
    story: [
      '很多修理厂在您和真正修车的人之间隔着一位服务顾问。在这里，这个距离不存在：Juan Castro 亲自管着车间，出厂的每一单活都写着他的名字。',
      '业务从换油、刹车做到排气系统、三元催化和发动机整机大修 — 还有保时捷和奔驰的专业维修，帮街坊们省下 4S 店的账单。',
      '结果都写在评价里：4.9 星的口碑，靠反复出现的三个词攒起来 — 快、公道、修得好。这份声誉，是这家店唯一需要的广告。',
    ],
    valuesTitle: '我们的原则',
    values: [
      {
        title: '有话直说',
        desc: '开工前报价清楚，有任何变动先打电话。永远由您来批准。',
      },
      {
        title: '一次修好',
        desc: '经验丰富的诊断加优质配件，交车前必经路试。',
      },
      {
        title: '是邻居，不是数字',
        desc: '艾尔蒙特、南艾尔蒙特、柔似蜜 — 这家店靠的是附近人们的口口相传。',
      },
    ],
    credsTitle: '大家为什么信任这家店',
    creds: [
      { title: '4.9★ 真实评分', desc: 'Yelp 和 Birdeye 上数百条评价。' },
      { title: '老板在车间', desc: 'Juan Castro 报价、动手、负责到底。' },
      { title: '欧洲车专修', desc: '保时捷和奔驰，不收 4S 店的溢价。' },
      { title: '省心好打交道', desc: '接受刷卡、等候免费 Wi-Fi、无障碍入口。' },
    ],
    teamTitle: '您会见到的人',
    team: [
      { role: 'Juan — 老板兼主修师傅', desc: '疑难杂症到此为止：发动机、电气、欧洲车。' },
      { role: '维修技师', desc: '刹车、排气、保养 — 细致准时。' },
      { role: '前台', desc: '英语、西班牙语、中文，有问必答。' },
      { role: '您', desc: '真的 — 走进来提问，跟我们一起看看引擎盖下面。' },
    ],
  },

  visitPage: {
    kicker: '到店信息',
    title: '好找，更好打交道。',
    intro: '我们位于艾尔蒙特 Garvey 大道，Rio Hondo 河东侧 — 距 10 号、60 号和 605 号高速都只需几分钟。',
    mapCta: '在 Google 地图中打开',
    formTitle: '给我们留言',
    formIntro: '咨询、询价，或者更想用文字说的事 — 每条留言我们都会看。',
    fName: '您的姓名',
    fContact: '电话或邮箱',
    fMessage: '需要什么帮助？',
    fSubmit: '发送留言',
    formSent: '收到，谢谢！我们会在一个工作日内回复您。',
    formNote: '更想通电话？营业时间致电 {phone}。',
    faqTitle: '常见问题',
    faqs: [
      {
        q: '需要预约吗？',
        a: '欢迎直接到店，但预约客户的车会最先上举升机。在线预约只需两分钟左右。',
      },
      {
        q: '修欧洲车吗？',
        a: '修 — 保时捷和奔驰是本店专长，从定期保养到电脑诊断，价格只是 4S 店的零头。',
      },
      {
        q: '维修怎么收费？',
        a: '任何工作开始前先给您明确报价，有变动先打电话。说好的价格就是最后的价格。',
      },
      {
        q: '修车时可以在店里等吗？',
        a: '当然 — 有免费 Wi-Fi 和无障碍入口。大活儿的话把车放下，修好第一时间打电话给您。',
      },
    ],
  },

  notFound: {
    title: '开错路口了',
    body: '这个页面不在我们的地图上。带您回到正路。',
    cta: '返回首页',
  },

  footer: {
    blurb:
      'Garvey 大道上老板亲自经营的修理厂 — 以快、公道、一次修好的口碑，服务艾尔蒙特、南艾尔蒙特和圣盖博谷。',
    quickLinks: '快速导航',
    servicesTitle: '热门服务',
    contactTitle: '联系与营业时间',
    langTitle: '语言',
    rights: '版权所有。',
    adminLink: '员工登录',
  },

  wizard: {
    title: '预约您的服务',
    stepLabel: '第 {current} 步，共 {total} 步：{name}',
    stepNames: [
      '选择服务',
      '服务详情',
      '补充说明',
      '联系电话',
      '您的信息',
      '车辆信息',
      '交车方式',
      '日期与时间',
      '确认预约',
    ],
    selectHint: '请选择一项以继续',

    s1Title: '您的爱车需要什么？',
    s1Sub: '选一个最接近的 — 稍后还能补充细节。',

    s2Title: '关于您的{service}，需要哪种帮助？',
    s2Sub: '选择最合适的一项。',

    s3Title: '补充信息',
    s3Sub: '还有什么需要让师傅知道的吗？',
    s3Selected: '您已选择的服务：',
    s3Label: '备注或特殊要求',
    s3Placeholder: '例如："左转时有吱吱声"，或"周五之前要用车"。',
    s3Chars: '{count} 个字符',
    s3TipsTitle: '填写小贴士',
    s3Tips: [
      '描述任何异常的噪音、气味或表现',
      '说明出现的时机（车速、天气、冷启动等）',
      '注明最近做过的维修或保养',
      '告诉我们任何时间限制或紧急情况',
    ],

    s4Title: '怎样联系到您？',
    s4Sub: '仅用于确认预约和服务进度通知。',
    s4Label: '电话号码',
    s4Help: '请输入 10 位电话号码',
    s4Privacy: '隐私说明：您的号码仅用于预约确认和服务通知，绝不用于骚扰信息。',
    s4Error: '请输入有效的 10 位电话号码。',

    s5Title: '介绍一下您自己',
    s5Sub: '用于您的预约确认。',
    s5First: '名字',
    s5Last: '姓氏',
    s5Email: '电子邮箱',
    s5EmailHelp: '确认函和提醒会发送到这里。',
    s5EmailError: '这个邮箱好像不太对 — 麻烦再检查一下？',

    s6Title: '欢迎，{name}！',
    s6TitleReturning: '欢迎回来，{name}！',
    s6Sub: '这次为哪辆车服务？',
    s6Year: '年份',
    s6Make: '品牌',
    s6Model: '车型',
    s6Plate: '车牌号',
    s6PlateHelp: '选填 — 方便我们调出您的保养记录。',
    s6YearPh: '选择年份',
    s6MakePh: '选择品牌',
    s6ModelPh: '如 Civic、C300、F-150',

    s7Title: '修车期间…',
    s7Sub: '您打算怎么安排交车？',
    s7Options: {
      wait: {
        label: '我在店里等',
        desc: '等候有免费 Wi-Fi — 适合两小时以内的服务。',
      },
      dropoff: {
        label: '放下车，稍后来取',
        desc: '车交给我们，修好第一时间打电话。',
      },
    },

    s8Title: '选择时间',
    s8Sub: '挑选您方便的预约时段。',
    s8DurationTitle: '预计服务时长',
    s8DurationBody: '您选择的服务通常需要约 {duration}。',
    s8Date: '选择日期',
    s8Slots: '选择时段',
    s8SpotsLeft: '剩 {count} 位',
    s8Full: '已满',
    s8Closed: '那天休息 — 选个工作日，我们好好为您服务。',
    s8SlotNote: '每个时段最多接待 {max} 辆车，确保每辆车都得到用心对待。',

    s9Title: '确认预约',
    s9Appointment: '预约信息',
    s9Start: '开始时间',
    s9Duration: '预计时长',
    s9Done: '预计完成',
    s9Vehicle: '车辆',
    s9PlateLabel: '车牌号',
    s9Transport: '交车方式',
    s9Services: '服务项目',
    s9Contact: '联系方式',
    s9Notes: '备注',
    s9ConfirmTitle: '请确认以下事项',
    s9Confirm1: '我的车辆将于 {date} {time} 前到达 Castro Auto Repair。',
    s9Confirm2: '我了解店家会先来电确认，预约才最终生效。',
    s9Submit: '确认预约',

    successTitle: '{name}，预约成功！',
    successRef: '预约编号',
    successBody: '我们会致电 {phone} 与您确认。需要改动？来电话时报上预约编号即可。',
    successWhen: '您的预约',
    successCalendar: '添加到日历',
    successDone: '完成',
  },
};
