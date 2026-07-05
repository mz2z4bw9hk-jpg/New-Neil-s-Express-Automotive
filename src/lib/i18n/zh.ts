import type { Dict } from './en';

export const zh: Dict = {
  meta: {
    title: "Neil's Express Automotive — 加州阿罕布拉汽车维修",
    description:
      '阿罕布拉家族经营汽车与卡车维修厂，50 多年历史，AAA 认证，位于 Garfield 大道。几分钟即可在线预约。',
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
    badge: 'AAA 认证 · 家族经营 50 余年',
    titleA: '安心上路，',
    titleB: '阿罕布拉。',
    tagline:
      'Garfield 大道上诚信专业的汽车养护 — 同一个家族，守护圣盖博谷车主安心出行五十余年。',
    ctaPrimary: '预约您的服务',
    ctaSecondary: '浏览服务项目',
    statYears: '扎根阿罕布拉',
    statRating: '真实验证评分',
    statDays: '每周营业天数',
    scroll: '下滑',
  },

  marquee: [
    'AAA 认证维修厂',
    'RepairPal 认证',
    '4.9★ 真实好评',
    '大师级技师坐镇',
    '混合动力检测与维修',
    '免费接送服务',
    'Se Habla Español',
    '我们说中文',
  ],

  servicesSection: {
    kicker: '服务范围',
    title: '每个系统，一站搞定。',
    intro: '从快捷换油到全面发动机诊断 — 轿车、SUV、混动车和卡车，一次修好。',
    estimated: '约 {duration}',
  },

  services: {
    oil: {
      title: '机油与油液保养',
      desc: '快捷干净的换油服务，每次到店附赠多点检查。',
      options: {
        conventional: {
          label: '常规机油保养',
          desc: '优质常规机油和机滤，补充各类油液，多点检查。',
        },
        fullSynthetic: {
          label: '全合成机油保养',
          desc: '高级全合成机油和机滤，适合现代发动机与更长保养周期。',
        },
        valuePackage: {
          label: '保养套餐（超值之选）',
          desc: '全合成换油，外加轮胎换位、电瓶检测和路试。',
        },
      },
    },
    brakes: {
      title: '刹车维修与保养',
      desc: '刹车片、刹车盘、卡钳和刹车油 — 制动安心，不靠猜。',
      options: {
        inspection: {
          label: '刹车检查',
          desc: '全面测量刹车片、刹车盘和管路，并出具书面报告。',
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
    tires: {
      title: '轮胎与四轮定位',
      desc: '轮胎换位、动平衡、新胎安装与精准四轮定位。',
      options: {
        rotationBalance: {
          label: '换位与动平衡',
          desc: '均衡磨损，让高速行驶更平顺。',
        },
        newTires: {
          label: '更换新轮胎',
          desc: '按您的驾驶习惯推荐优质品牌 — 安装并做好平衡。',
        },
        alignment: {
          label: '四轮定位',
          desc: '电脑四轮定位，解决跑偏和偏磨。',
        },
      },
    },
    diagnostics: {
      title: '发动机诊断',
      desc: '用原厂级诊断设备解读发动机故障灯。',
      options: {
        checkEngine: {
          label: '发动机故障灯',
          desc: '全面电脑扫描、精准测试，给您一个明确的答案。',
        },
        prePurchase: {
          label: '购车前检测',
          desc: '签字之前，先弄清楚您买的是什么车。',
        },
        electrical: {
          label: '行驶异常排查',
          desc: '熄火、顿挫、怠速不稳 — 我们一查到底。',
        },
      },
    },
    ac: {
      title: '空调与暖风',
      desc: '夏天够凉，冬天够暖 — 空调系统专业处理。',
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
          desc: '负载测试并打印报告；需要时安装优质电瓶。',
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
    scheduled: {
      title: '原厂定期保养',
      desc: '3 万/6 万/9 万英里保养，保住原厂质保 — 没有 4S 店的价格。',
      options: {
        minor30k: {
          label: '小保养（3 万英里级）',
          desc: '换油、轮胎换位、滤芯更换和全车检查。',
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
    hybrid: {
      title: '混合动力与电动车',
      desc: '混动系统诊断、高压电池和日常养护。',
      options: {
        healthCheck: {
          label: '混动系统健康检查',
          desc: '检查高压电池状态、散热系统和逆变器。',
        },
        hvBattery: {
          label: '高压电池问题',
          desc: '警告灯亮或续航下降 — 精确到电池模块级检测。',
        },
        hybridService: {
          label: '混动车定期保养',
          desc: '针对混动传动系统和刹车特点的专属保养。',
        },
      },
    },
    suspension: {
      title: '悬挂与转向',
      desc: '减震器、支柱、衬套 — 找回新车般的行驶质感。',
      options: {
        rideCheck: {
          label: '行驶与操控检查',
          desc: '异响、跑偏或颠簸声，路试加举升机双重检查。',
        },
        shocksStruts: {
          label: '减震器更换',
          desc: '优质配件更换，并复查四轮定位。',
        },
        steering: {
          label: '转向系统维修',
          desc: '转向机、拉杆和助力泄漏，彻底修好。',
        },
      },
    },
    smog: {
      title: '尾气检测准备与维修',
      desc: 'Smog 没过？我们找出原因、修好它，让您顺利过检。',
      options: {
        prep: {
          label: '检测前预检',
          desc: '先检查就绪监测项和常见问题点，心里有数再去检测。',
        },
        failedRepair: {
          label: '未通过检测维修',
          desc: '针对未通过的确切原因进行诊断和维修。',
        },
        readiness: {
          label: '行驶循环 / 就绪监测协助',
          desc: '维修或换电瓶后监测项未就绪？我们帮您完成行驶循环。',
        },
      },
    },
    transmission: {
      title: '变速箱服务',
      desc: '油液保养、故障诊断、离合器和换挡问题。',
      options: {
        fluidService: {
          label: '变速箱油保养',
          desc: '更换油液和滤芯，保持换挡顺滑、温度正常。',
        },
        diagnosis: {
          label: '换挡问题诊断',
          desc: '打滑、顿挫或报故障码 — 先诊断清楚，再谈维修。',
        },
        clutch: {
          label: '离合器服务',
          desc: '手动变速箱离合器的检查与更换。',
        },
      },
    },
    fleet: {
      title: '卡车与车队服务',
      desc: '让工作用车和小型车队按时保养、持续在路上。',
      options: {
        truckRepair: {
          label: '卡车维修',
          desc: '汽油和轻型柴油卡车，从刹车到传动系统。',
        },
        fleetMaintenance: {
          label: '车队保养',
          desc: '定期保养计划，最大限度减少停运时间。',
        },
        dot: {
          label: '安全检查（DOT 级）',
          desc: '为工作车辆出具全面车况报告。',
        },
      },
    },
  },

  process: {
    kicker: 'Neil’s 的规矩',
    title: '不玩套路。从来不。',
    intro: '四个步骤，对每一辆进店的车都一样 — 五十年来始终如此。',
    steps: [
      {
        title: '倾听与检查',
        desc: '先听您说，再用专业的眼睛和仪器找到问题。',
      },
      {
        title: '明明白白的报价',
        desc: '开工前给您详细的书面报价，每一块钱都由您批准。',
      },
      {
        title: '一次修好',
        desc: '大师级技师的手艺加优质配件 — 不走捷径，不强行推销。',
      },
      {
        title: '路试并终身负责',
        desc: '每项维修都经过路试验证，并有我们的质保背书。',
      },
    ],
  },

  why: {
    kicker: '为什么选 Neil’s',
    title: '街坊邻居都信赖的修车行',
    body:
      '从七十年代初起，同一个家族守着 Garfield 大道的这个街角 — 走过油荒、化油器、行车电脑到混合动力。4S 店的员工换了一批又一批；我们记得您的名字，也记得您车子的每一次保养。',
    points: [
      'AAA 认证维修厂 — 会员工时费和配件享 9 折（最高省 $75）',
      '大师级技师坐镇，原厂级诊断设备',
      '任何工作开始前先出具详细书面报价',
      '修车期间提供免费接送',
      '大多数维修当天完工',
      '提供英语、西班牙语和中文服务',
    ],
    statYears: '家族经营年数',
    statRating: '平均真实评分',
    statReviews: '全平台评价数',
    statDays: '每周营业天数',
  },

  testimonials: {
    kicker: '口碑相传',
    title: '阿罕布拉的老顾客一来再来',
    note: '内容代表 Yelp、CARFAX 和 SureCritic 上经过验证的顾客评价。',
    items: [
      {
        quote:
          '他们找到了真正的病根，而不是乱换零件，打电话报了个明明白白的价格，当天下午我就把车开走了。',
        name: 'M. Trujillo',
        detail: 'Honda Accord · 阿罕布拉',
      },
      {
        quote:
          '作为 AAA 会员我本来是冲着折扣来的，留下来却是因为他们的实在。动手之前，他们先把磨损的刹车盘拿给我看。',
        name: 'K. Wong',
        detail: 'Lexus RX · 蒙特利公园',
      },
      {
        quote:
          '跟他们聊过一次，你就明白这家店为什么能开五十年。我们家三辆车都交给了这家店。',
        name: 'D. Nguyen',
        detail: 'Toyota Camry Hybrid · 圣盖博',
      },
    ],
  },

  visitBand: {
    kicker: '欢迎到店',
    title: 'Garfield 大道上，Valley 大道以南',
    addressLabel: '地址',
    phoneLabel: '电话',
    hoursLabel: '营业时间',
    weekdays: '周一至周六',
    sunday: '周日',
    hoursValue: '上午 8:00 – 下午 6:00',
    aaa: 'AAA 会员：工时费与配件 9 折，最高优惠 $75。',
  },

  servicesPage: {
    kicker: '服务项目',
    title: '真正的一站式服务。',
    intro:
      '轿车、混动车、工作卡车 — 保养、维修，还有别家修不了的疑难杂症，一个屋檐下全部解决。',
    groups: {
      maintenance: '定期保养',
      repair: '维修与诊断',
      tiresBrakes: '轮胎与刹车',
      climate: '空调与电气',
      hybrid: '混动与电动',
      fleet: '卡车与车队',
    },
    includes: '常见项目',
    ctaTitle: '不确定车子哪里出了问题？',
    ctaBody: '把症状告诉我们，剩下的交给我们 — 诊断正是我们的强项。',
  },

  aboutPage: {
    kicker: '我们的故事',
    title: '同一个街角，五十年',
    lead:
      'Neil’s Express Automotive 是一家家族经营的全方位汽车与卡车维修厂，服务阿罕布拉和圣盖博谷已超过五十年。',
    story: [
      '七十年代初，这家店在 South Garfield 大道开门营业，那还是白金触点和化油器的年代。工具换了一代又一代 — 握手的分量没变。',
      '如今还是这个家族守在前台，背后是一位大师级技师和一支用原厂级设备诊断现代发动机、混动系统和各类电气问题的团队。',
      '我们拿到了 AAA 认证维修厂资质和 RepairPal 认证，但最珍惜的荣誉，是街坊邻里给出的 4.9 星口碑。',
    ],
    valuesTitle: '我们的原则',
    values: [
      {
        title: '诚信为先',
        desc: '开工前有书面报价，有任何变动先打电话。永远由您来批准。',
      },
      {
        title: '一次修好',
        desc: '大师级诊断加优质配件，交车前必经路试。',
      },
      {
        title: '是邻居，不是数字',
        desc: '三代阿罕布拉家庭把车开进这些车位。我们还想再守三代。',
      },
    ],
    credsTitle: '认证与担当',
    creds: [
      { title: 'AAA 认证维修厂', desc: '设施经检查、服务标准经审核，会员享折扣。' },
      { title: 'RepairPal 认证', desc: '对照全国维修数据的公道价格保证。' },
      { title: '大师级技师坐镇', desc: '发动机、电气、行驶性能的资深认证。' },
      { title: '4.9★ 真实评分', desc: 'Yelp、CARFAX 和 SureCritic 上数百条评价。' },
    ],
    teamTitle: '您会见到的人',
    team: [
      { role: '服务顾问', desc: '前台有问必答 — 英语、西班牙语、中文都行。' },
      { role: '大师级技师', desc: '疑难杂症到此为止：发动机、电子系统、混动。' },
      { role: '维修技师', desc: '刹车、轮胎、保养 — 细致准时。' },
      { role: '接送司机', desc: '修车期间送您回家或上班。' },
    ],
  },

  visitPage: {
    kicker: '到店信息',
    title: '好找，更好打交道。',
    intro: '我们位于阿罕布拉市中心的 South Garfield 大道，距 Valley 大道和 10 号高速只需几分钟。',
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
        q: '有 AAA 会员折扣吗？',
        a: '有 — 我们是 AAA 认证维修厂。会员工时费和配件享 9 折，每次最高优惠 $75。',
      },
      {
        q: '能修我的混动车吗？',
        a: '当然。混动系统诊断、高压电池问题和日常保养我们都做。',
      },
      {
        q: '修车期间我怎么出行？',
        a: '预约时告诉我们需要免费接送，也可以在休息室等候，或使用提前钥匙投递，修好后我们电话通知您。',
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
      'Garfield 大道上家族经营、AAA 认证的汽车与卡车维修厂 — 服务阿罕布拉和圣盖博谷 50 余年。',
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
      '出行安排',
      '日期与时间',
      '确认预约',
    ],
    selectHint: '请选择一项以继续',

    s1Title: '您的爱车需要什么？',
    s1Sub: '选一个最接近的 — 稍后还能补充细节。',

    s2Title: '关于您的{service}，需要哪种帮助？',
    s2Sub: '选择最合适的一项。',

    s3Title: '补充信息',
    s3Sub: '还有什么需要让技师知道的吗？',
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
    s6ModelPh: '如 Civic、RAV4、F-150',

    s7Title: '修车期间…',
    s7Sub: '您打算怎么安排？',
    s7Options: {
      wait: {
        label: '我在店里等',
        desc: '舒适的休息室，有 Wi-Fi — 适合两小时以内的服务。',
      },
      dropoff: {
        label: '放下车，稍后来取',
        desc: '车交给我们，修好第一时间打电话。支持提前钥匙投递。',
      },
      shuttle: {
        label: '请安排免费接送',
        desc: '修车期间送您回家或到附近上班。',
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
    s8ClosedSunday: '周日休息 — 请选择其他日期。',
    s8SlotNote: '每个时段最多接待 {max} 辆车，确保每辆车都得到用心对待。',

    s9Title: '确认预约',
    s9Appointment: '预约信息',
    s9Start: '开始时间',
    s9Duration: '预计时长',
    s9Done: '预计完成',
    s9Vehicle: '车辆',
    s9PlateLabel: '车牌号',
    s9Transport: '出行安排',
    s9Services: '服务项目',
    s9Contact: '联系方式',
    s9Notes: '备注',
    s9ConfirmTitle: '请确认以下事项',
    s9Confirm1: '我的车辆将于 {date} {time} 前到达 Neil’s Express Automotive。',
    s9Confirm2: '我了解可以使用钥匙投递，最早提前 24 小时交车。',
    s9Submit: '确认预约',

    successTitle: '{name}，预约成功！',
    successRef: '预约编号',
    successBody: '我们会致电 {phone} 与您确认。需要改动？来电话时报上预约编号即可。',
    successWhen: '您的预约',
    successCalendar: '添加到日历',
    successDone: '完成',
  },
};
