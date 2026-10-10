/* ==========================================================================
   数据源：早稲田大学官方网站 www.waseda.jp
   ── 排名：官网 Vision150 News（2026-06-19）公布的 QS World University Rankings 2027
   ── 研究科 / 専攻：官网「学部・大学院」栏目、各研究科「3つのポリシー」页面、
      理工学術院「研究科・専攻の紹介」页面
   ── 校区：官网「交通アクセス」各校区页面
   pending:true 的条目 = 官网页面未直接给出该名称，整理中待复核
   ========================================================================== */
window.LIB = {

  meta: {
    universityJa: '早稲田大学',
    universityZh: '早稻田大学',
    universityEn: 'Waseda University',
    founded: '1882年（2032年創立150周年）',
    updated: '2026-10',
    rankingSource: {
      label: '官网报道 · QS 2027',
      url: 'https://www.waseda.jp/inst/vision150/news/9986'
    }
  },

  /* ------------------------------------------------------------ 排名主视觉 */
  hero: {
    kicker: 'QS World University Rankings 2027',
    rank: 201,
    unitLabel: '位　（世界 1,504 校中 · 上位 13.3%）',
    label: '国内私立大学 第 1 位 ／ 雇用者評価 世界 38 位',
    caption: '官网 Vision150 News（2026年6月19日）：QS World University Rankings 2027 公布，本学在纳入排名的世界 1,504 所大学中位列第 201 位（前 13.3%），为日本国内私立大学第一。',
    links: [
      { label: '官网报道：QS2027 世界201位', url: 'https://www.waseda.jp/inst/vision150/news/9986' },
      { label: '官网报道：QS2026 Top 14%', url: 'https://www.waseda.jp/top/en/news/85072' },
      { label: '官网报道：QS トップ13％', url: 'https://www.waseda.jp/inst/vision150/news/8381' }
    ],
    metrics: [
      { label: 'QS 2027 世界排名', value: '201 位', pct: 87, note: '1,504 校中 · 官网公布上位 13.3%' },
      { label: 'Employer Reputation', value: '世界 38 位', pct: 97, note: '雇用者评价单项指标 · 官网报道' },
      { label: '日本国内私立大学', value: '第 1 位', pct: 100, note: '官网报道表述「国内私大1位」' }
    ]
  },

  /* -------------------------------------------------------------- 榜单明细 */
  rankings: [
    {
      id: 'qs-2027',
      org: 'QS Quacquarelli Symonds',
      title: 'QS World University Rankings 2027',
      year: '2026年6月18日公布',
      rankText: '201 位',
      rank: 201,
      scope: '世界 1,504 校中 · 上位 13.3%',
      tags: [{ k: 'warm', v: '官网首发报道' }, { k: 'green', v: '世界前 13.3%' }, { k: 'blue', v: '国内私大第 1 位' }],
      blurb: '官网原文：「本学は順位が付与された世界の1,504大学の上位13.3%、201位に入りました（国内私大1位）」。',
      detail: 'QS 世界大学排名由 9 项指标构成：学术声誉（Academic Reputation）、教員一人あたり論文被引用数、雇用者评价（Employer Reputation）、毕业生活跃度（Employment Outcomes）、教员学生比率、外国人教员比率、国际研究网络指数、留学生比率、可持续性（Sustainability）。',
      advice: '这是官网目前公布的最新综合排名。选校时更应关注与修士报考直接相关的信息：研究科入试倍率、教授研究方向、语言成绩要求。',
      url: 'https://www.waseda.jp/inst/vision150/news/9986'
    },
    {
      id: 'employer-2027',
      org: 'QS World University Rankings 2027',
      title: 'Employer Reputation（雇用者評価）',
      year: '2026年6月18日公布',
      rankText: '38 位',
      rank: 38,
      scope: '世界 · 单项指标排名',
      tags: [{ k: 'warm', v: '官网报道' }, { k: 'green', v: '世界 38 位' }, { k: 'gold', v: '就职强项' }],
      blurb: '官网原文：「本ランキングを構成する指標のうち、本学は特に『Employer Reputation（雇用者による評価）』で、世界38位の高い評価を受けました」。',
      detail: '雇用者评价反映全球雇主对该校毕业生的认可度，与校友网络、企业合作密度直接相关，是就职导向考生最值得参考的单项指标之一。',
      advice: '如果目标是日本就职，这项比综合排名更有参考价值；写研究计划书时也可留意目标研究科与产业的合作项目。',
      url: 'https://www.waseda.jp/inst/vision150/news/9986'
    },
    {
      id: 'qs-2026',
      org: '早稲田大学官方网站',
      title: 'QS World University Rankings 2026',
      year: '2026年版',
      rankText: 'Top 14%',
      rank: 14,
      scope: '世界整体排名区间',
      tags: [{ k: 'warm', v: '官网英文报道' }, { k: 'green', v: '世界前 14%' }],
      blurb: '官网英文报道标题：Waseda University Ranked in Top 14% in the QS World University Rankings 2026。',
      detail: '同一榜单上一年度的官网公开表述为「世界前 14%」。整理时保留官网原文区间，不做二次换算，方便与研究科官网逐条核对。',
      advice: '跨年度比较时务必确认「榜单 + 年份 + 口径」，不同年份的区间表述不可直接对比。',
      url: 'https://www.waseda.jp/top/en/news/85072'
    },
    {
      id: 'qs-top13',
      org: '早稲田大学官方网站',
      title: 'QS世界大学ランキング トップ13％にランクイン',
      year: '官网报道',
      rankText: 'Top 13%',
      rank: 13,
      scope: '世界整体排名区间',
      tags: [{ k: 'warm', v: '官网报道' }, { k: 'green', v: '世界前 13%' }],
      blurb: '官网另一篇报道以「QS世界大学トップ13％にランクイン」为标题公布当年结果。',
      detail: '该报道说明早稻田在 QS 榜单中的位置长期稳定在世界前 13%～14% 区间，可作为判断“学校层面竞争力”的长期坐标。',
      advice: '把历年区间做成时间轴，比看单一年份更能判断趋势；本资源库后续会补齐历年数据。',
      url: 'https://www.waseda.jp/inst/vision150/news/8381'
    }
  ],

  /* -------------------------------------------------------------- 国内坐标 */
  contexts: [
    { k: '世界排名（QS 2027）', v: '201 位', d: '世界 1,504 校中 · 上位 13.3%' },
    { k: '国内私立大学', v: '1 位', d: '官网报道表述（QS 口径）' },
    { k: '雇用者评价', v: '世界 38 位', d: 'Employer Reputation 单项指标' },
    { k: '研究科数量', v: '17', d: '另有 5 个専門職大学院' }
  ],

  /* ==================================================================
     研究科 / 専門職大学院
     ================================================================== */
  schools: [
    {
      id: 'gsps',
      name: '政治学研究科',
      en: 'Graduate School of Political Science',
      type: '学术研究科',
      campusIds: ['waseda'],
      term: '修士 2 年 / 博士後期 3 年',
      url: 'https://www.waseda.jp/fpse/gsps/',
      summary: '1951 年设立，官网「3つのポリシー」页面列出政治学、新闻、全球公共政策三条路线；公共経営専攻已于 2020 年 9 月停止招生。',
      programs: [
        { name: '政治学コース', degree: '修士（政治学）／博士（政治学）', desc: '日本政治、比较政治、国际关系、政治思想、行政学等方向。' },
        { name: 'ジャーナリズムコース', degree: '修士（ジャーナリズム）', desc: '以现职记者与实务家授课为特色的新闻从业者培养课程。' },
        { name: 'グローバル公共政策コース', degree: '修士／博士', desc: '官网政策页面保留该课程，另设「学生募集停止」公告。' },
        { name: '公共経営専攻', degree: '—', desc: '官网注明「2020年9月を以て学生募集停止」。' }
      ],
      pending: false
    },
    {
      id: 'gse',
      name: '経済学研究科',
      en: 'Graduate School of Economics',
      type: '学术研究科',
      campusIds: ['waseda'],
      term: '修士 2 年 / 博士後期 3 年',
      url: 'https://www.waseda.jp/fpse/gse/',
      summary: '官网「3つのポリシー」按课程分别说明：修士课程与博士后期课程均设经济学科course与国际政治经济course两套体系。',
      programs: [
        { name: '経済学コース', degree: '修士（経済学）／博士（経済学）', desc: '官网：需具备逻辑整合性，并完成修士论文。' },
        { name: '国際政治経済学コース', degree: '修士（経済学）／博士（経済学）', desc: '官网：修得经济理论、计量分析以及政治领域的专业知识。' }
      ],
      pending: false
    },
    {
      id: 'glaw',
      name: '法学研究科',
      en: 'Graduate School of Law',
      type: '学术研究科',
      campusIds: ['waseda'],
      term: '修士 2 年 / 博士後期 3 年',
      url: 'https://www.waseda.jp/folaw/glaw',
      summary: '官网「3つのポリシー」按课程区分：博士后期课程授博士（法学），修士课程授修士（法学）与修士（先端法学），后者含知识产权法 LL.M. 与现代亚洲区域法 LL.M. 两条课程线。',
      programs: [
        { name: '先端法学専攻 知財LL.M.コース', degree: '修士（先端法学）', desc: '官网「(3-1)修士課程（＝学位：修士(先端法学)）知財LL.M.コース」。' },
        { name: '先端法学専攻 アジアLL.M.コース', degree: '修士（先端法学）', desc: '官网「(3-2)修士課程（＝学位：修士(先端法学)）アジアLL.M.コース」，另公告 2028 年度起导入 9 月入学。' },
        { name: '修士課程（一般）', degree: '修士（法学）', desc: '官网列出的一般修士课程路线。' },
        { name: '博士後期課程', degree: '博士（法学）', desc: '官网「(1)博士後期課程（＝学位：博士(法学)）」。' },
        { name: '法曹養成専攻（法科大学院）', degree: '法務博士（専門職）', desc: '专门职学位课程，官网列于専門職大学院。' }
      ],
      pending: false
    },
    {
      id: 'glas',
      name: '文学研究科',
      en: 'Graduate School of Letters, Arts and Sciences',
      type: '学术研究科',
      campusIds: ['toyama'],
      term: '修士 2 年 / 博士後期 3 年',
      url: 'https://www.waseda.jp/flas/glas/',
      summary: '官网：修士课程与博士后期课程共设置 140 个以上的研究指导，实行「コース」制并分课程举办履修指导。下表为官网公告中已确认的课程名，完整清单请以研究科官网为准。',
      programs: [
        { name: '哲学コース / 東洋哲学コース', degree: '修士（文学）／博士（文学）', desc: '西洋哲学与东洋哲学两个方向。', pending: true },
        { name: '心理学コース / 社会学コース / 教育学コース', degree: '修士（文学）', desc: '人文社会科学系课程。', pending: true },
        { name: '日本語日本文学コース / 中国語中国文学コース', degree: '修士（文学）', desc: '中国语中国文学课程见官网公告。' },
        { name: '英文学コース / フランス語フランス文学コース / ドイツ語ドイツ文学コース / ロシア語ロシア文学コース', degree: '修士（文学）', desc: '德语德语文学课程见官网公告。' },
        { name: '演劇映像コース / 美術史学コース', degree: '修士（文学）', desc: '戏剧影像与美术史方向。', pending: true },
        { name: '日本史学コース / 西洋史学コース / 考古学コース', degree: '修士（文学）', desc: '西洋史学、考古学课程见官网公告。' },
        { name: '文化人類学コース / 中東・イスラーム研究コース', degree: '修士（文学）', desc: '中东·伊斯兰研究课程见官网公告。' },
        { name: '表象・メディア論コース / 社会構築論コース', degree: '修士（文学）', desc: '两个课程均见官网公告（论文构想发表会等）。' }
      ],
      pending: true
    },
    {
      id: 'gedu',
      name: '教育学研究科',
      en: 'Graduate School of Education',
      type: '学术研究科',
      campusIds: ['waseda'],
      term: '修士 2 年 / 博士後期 3 年',
      url: 'https://www.waseda.jp/fedu/gedu/',
      summary: '官网「3つのポリシー」以「学位：専攻」表格列出 7 个专攻，另设教育学研究科高度教職実践専攻（教職大学院）作为专门职学位课程。',
      programs: [
        { name: '学校教育専攻', degree: '修士（教育学）／博士（教育学）', desc: '官网「学位：専攻」列表中的专攻之一。' },
        { name: '国語教育専攻', degree: '修士（教育学）', desc: '教科教育系专攻。' },
        { name: '英語教育専攻', degree: '修士（教育学）', desc: '2027 年度入试另有变更公告。' },
        { name: '社会科教育専攻', degree: '修士（教育学）', desc: '教科教育系专攻。' },
        { name: '数学教育専攻', degree: '修士（教育学）', desc: '教科教育系专攻。' },
        { name: '教育基礎学専攻', degree: '修士（教育学）', desc: '教育基础理论方向。' },
        { name: '教科教育学専攻', degree: '博士（教育学）', desc: '博士后期课程，设英語科領域・数学科領域（官网公告）。' },
        { name: '高度教職実践専攻（教職大学院）', degree: '教職修士（専門職）', desc: '面向现职教师的专门职学位课程。' }
      ],
      pending: false
    },
    {
      id: 'gsc',
      name: '商学研究科',
      en: 'Graduate School of Commerce',
      type: '学术研究科',
      campusIds: ['waseda'],
      term: '修士 2 年 / 博士後期 3 年',
      url: 'https://www.waseda.jp/fcom/gsc',
      summary: '官网研究科介绍写明：修士课程与博士后期课程下设 3 个课程、6 个专修 —— 経営管理（経営専修、マーケティング・国際ビジネス専修、金融・保険専修）、会計（会計専修）、産業・経済（理論・計量専修、公共政策・経済史専修）。',
      programs: [
        { name: '商学専攻 — 経営管理コース', degree: '修士（商学）／博士（商学）', desc: '含経営専修、マーケティング・国際ビジネス専修、金融・保険専修。' },
        { name: '商学専攻 — 会計コース', degree: '修士（商学）／博士（商学）', desc: '含会計専修。' },
        { name: '商学専攻 — 産業・経済コース', degree: '修士（商学）／博士（商学）', desc: '含理論・計量専修、公共政策・経済史専修。' }
      ],
      pending: false
    },
    {
      id: 'kikan',
      name: '基幹理工学研究科',
      en: 'Graduate School of Fundamental Science and Engineering',
      type: '学术研究科',
      campusIds: ['nishiwaseda'],
      term: '修士 2 年 / 博士後期 3 年',
      url: 'https://www.waseda.jp/fsci/about/departments/fundamental/',
      summary: '理工学術院三研究科之一。官网「研究科・専攻の紹介」以表格列出 6 个专攻，并标注 4 月/9 月入学与日语/英语学位项目（英語学位プログラム）的可否。',
      programs: [
        { name: '数学応用数理専攻', degree: '修士（理学／工学）／博士', desc: '4 月・9 月入学，日语/英语学位项目均可（官网表格）。' },
        { name: '機械科学・航空宇宙専攻', degree: '修士（工学）／博士', desc: '官网表格：英语学位项目不设 4 月入学。' },
        { name: '電子物理システム学専攻', degree: '修士（工学）／博士', desc: '4 月・9 月入学，日语/英语学位项目均可。' },
        { name: '情報理工・情報通信専攻', degree: '修士（工学）／博士', desc: '4 月・9 月入学，日语/英语学位项目均可。' },
        { name: '表現工学専攻', degree: '修士（工学）／博士', desc: '艺术与科学融合方向。' },
        { name: '材料科学専攻', degree: '修士（工学）／博士', desc: '官网表格：英语学位项目仅 9 月入学。' }
      ],
      pending: false
    },
    {
      id: 'souzou',
      name: '創造理工学研究科',
      en: 'Graduate School of Creative Science and Engineering',
      type: '学术研究科',
      campusIds: ['nishiwaseda'],
      term: '修士 2 年 / 博士後期 3 年',
      url: 'https://www.waseda.jp/fsci/about/departments/creative/',
      summary: '官网「研究科・専攻の紹介」列出 6 个专攻，并说明各专攻可通过日语或英语学位项目取得学位，另设实体育博士项目。',
      programs: [
        { name: '建築学専攻', degree: '修士（工学）／博士（工学）', desc: '建筑设计与规划方向。' },
        { name: '総合機械工学専攻', degree: '修士（工学）／博士（工学）', desc: '机械系统综合方向。' },
        { name: '経営システム工学専攻', degree: '修士（工学）／博士（工学）', desc: '管理与系统工程方向。' },
        { name: '経営デザイン専攻', degree: '修士（工学）／博士（工学）', desc: '经营设计方向。' },
        { name: '建設工学専攻', degree: '修士（工学）／博士（工学）', desc: '土木与建设工学方向。' },
        { name: '地球・環境資源理工学専攻', degree: '修士（工学）／博士（工学）', desc: '地球与环境资源理工方向。' }
      ],
      pending: false
    },
    {
      id: 'asen',
      name: '先進理工学研究科',
      en: 'Graduate School of Advanced Science and Engineering',
      type: '学术研究科',
      campusIds: ['nishiwaseda'],
      term: '修士 2 年 / 博士後期 3 年',
      url: 'https://www.waseda.jp/fsci/about/departments/advanced/',
      summary: '官网「研究科・専攻の紹介」列出修士课程 8 个专攻与一貫制博士課程「先進理工学専攻」，博士课程另设共同先端生命医科学専攻、共同先進健康科学専攻两个共同专攻。',
      programs: [
        { name: '物理学及応用物理学専攻', degree: '修士（理学／工学）／博士', desc: '从素粒子·原子核·宇宙物理到物性·生物物理。' },
        { name: '化学・生命化学専攻', degree: '修士（理学／工学）／博士', desc: '化学与生命化学方向。' },
        { name: '応用化学専攻', degree: '修士（工学）／博士', desc: '应用化学方向。' },
        { name: '生命医科学専攻', degree: '修士（工学／理学）／博士', desc: '医学与理工学融合，与先端生命医科学中心 TWIns 联动。' },
        { name: '電気・情報生命専攻', degree: '修士（工学）／博士', desc: '电气、信息与生命交叉方向。' },
        { name: '生命理工学専攻', degree: '修士（工学／理学）／博士', desc: '生命理工学方向。' },
        { name: 'ナノ理工学専攻', degree: '修士（工学）／博士', desc: '纳米科学与技术方向。' },
        { name: '共同原子力専攻', degree: '修士（工学）／博士', desc: '与其他机构共同设置的专攻。' },
        { name: '先進理工学専攻（一貫制博士課程）', degree: '博士（工学／理学）', desc: '官网标注为［一貫制博士課程］。' },
        { name: '共同先端生命医科学専攻 / 共同先進健康科学専攻', degree: '博士', desc: '博士课程的共同专攻（官网列表）。' }
      ],
      pending: false
    },
    {
      id: 'gweee',
      name: '環境・エネルギー研究科',
      en: 'Graduate School of Environment and Energy Engineering',
      type: '学术研究科',
      campusIds: ['honjo'],
      term: '修士 2 年 / 博士後期 3 年',
      url: 'https://www.waseda.jp/fsci/gweee/',
      summary: '官网政策页面说明：以工学与人文社会科学的融合为特色，修士课程在个别研究指导之外设置大量跨领域共同科目；校区在本庄キャンパス（官网本庄校区页面链接该研究科）。',
      programs: [
        { name: '修士課程', degree: '修士（工学）', desc: '官网：修得环境·能源领域所需的工学或社会·人文科学专业知识。', pending: true },
        { name: '博士後期課程', degree: '博士（工学）', desc: '官网：修得高度专业知识并开展独创性研究。', pending: true }
      ],
      pending: true
    },
    {
      id: 'gips',
      name: '情報生産システム研究科',
      en: 'Graduate School of Information, Production and Systems',
      type: '学术研究科',
      campusIds: ['kitakyushu'],
      term: '修士 2 年 / 博士後期 3 年',
      url: 'https://www.waseda.jp/fsci/gips/about/policy/',
      summary: '官网：专攻为「情報生産システム工学」，下设情報アーキテクチャ、生産システム、集積システム 3 个研究领域，日语与英语双语授课，校区位于北九州学研都市。',
      programs: [
        { name: '情報生産システム工学専攻 — 情報アーキテクチャ領域', degree: '修士（工学）／博士（工学）', desc: '官网列出的三大研究领域之一。' },
        { name: '情報生産システム工学専攻 — 生産システム領域', degree: '修士（工学）／博士（工学）', desc: '官网列出的三大研究领域之一。' },
        { name: '情報生産システム工学専攻 — 集積システム領域', degree: '修士（工学）／博士（工学）', desc: '官网列出的三大研究领域之一。' }
      ],
      pending: false
    },
    {
      id: 'gsss',
      name: '社会科学研究科',
      en: 'Graduate School of Social Sciences',
      type: '学术研究科',
      campusIds: ['waseda'],
      term: '修士 2 年 / 博士後期 3 年',
      url: 'https://www.waseda.jp/fsss/gsss/',
      summary: '官网政策页面明确列出修士课程的两个专攻及定员（各 30 名），学位为修士（社会科学）；课程由讲义、演习、研究指导与修士论文构成，并要求研究伦理教育。',
      programs: [
        { name: '地球社会論専攻', degree: '修士（社会科学）', desc: '官网：修士课程定员 30 名。' },
        { name: '政策科学論専攻', degree: '修士（社会科学）', desc: '官网：修士课程定员 30 名，另设英语学位项目。' },
        { name: '博士後期課程', degree: '博士（社会科学）', desc: '博士论文审查按官网「社会科学研究科博士学位論文審査基準」执行。' }
      ],
      pending: false
    },
    {
      id: 'ghum',
      name: '人間科学研究科',
      en: 'Graduate School of Human Sciences',
      type: '学术研究科',
      campusIds: ['tokorozawa'],
      term: '修士 2 年（另有 1 年制）/ 博士後期 3 年',
      url: 'https://www.waseda.jp/fhum/ghum/',
      summary: '位于所沢キャンパス（官网 100 号館说明中明确列出）。官网按入试类别区分修士课程 2 年制、修士课程 1 年制（教育臨床コース）、英语学位项目与博士后期课程。',
      programs: [
        { name: '修士課程（2年制）', degree: '修士（人間科学）', desc: '官网入试页面：一般入试、内部选拔入试。', pending: true },
        { name: '修士課程（1年制・教育臨床コース）', degree: '修士（人間科学）', desc: '官网：1 年制课程，设教育临床课程。' },
        { name: '英語学位プログラム（Educational Innovation and Communications）', degree: '修士（人間科学）', desc: '官网列出的英语学位项目名称。' },
        { name: '博士後期課程', degree: '博士（人間科学）', desc: '官网：设 4 月入学与 9 月入学的一般入试及推荐入试。' }
      ],
      pending: true
    },
    {
      id: 'gsports',
      name: 'スポーツ科学研究科',
      en: 'Graduate School of Sport Sciences',
      type: '学术研究科',
      campusIds: ['tokorozawa'],
      term: '修士 2 年（另有 1 年制）/ 博士後期 3 年',
      url: 'https://www.waseda.jp/fsps/gsps/',
      summary: '官网政策页面按修士课程 2 年制、修士课程 1 年制（含エリートコーチングコース）、博士后期课程分别说明培养目标，校区与人間科学研究科同为所沢キャンパス。',
      programs: [
        { name: '修士課程（2年制）', degree: '修士（スポーツ科学）', desc: '培养具备体育科学高度知识的专业职业人。', pending: true },
        { name: '修士課程（1年制）', degree: '修士（スポーツ科学）', desc: '面向有实务经验者，含エリートコーチングコース；官网说明 1 年制会考虑在职者履修便利。' },
        { name: '博士後期課程', degree: '博士（スポーツ科学）', desc: '以培养研究者为核心，另设 9 月入学入试。' }
      ],
      pending: true
    },
    {
      id: 'gsiccs',
      name: '国際コミュニケーション研究科',
      en: 'Graduate School of International Culture and Communication Studies',
      type: '学术研究科',
      campusIds: ['waseda'],
      term: '修士 2 年 / 博士後期 3 年',
      url: 'https://www.waseda.jp/fire/gsiccs/',
      summary: '官网设有「研究科概要・特色」「プログラム概要」「カリキュラム」页面，以英语授课为主，按语言·文化·社会三条轴线组织跨文化沟通研究。',
      programs: [
        { name: '修士課程', degree: '修士（国際コミュニケーション）', desc: '官网入试页面按 4 月入学与 9 月入学公布要项。', pending: true },
        { name: '博士後期課程', degree: '博士（国際コミュニケーション）', desc: '官网单列博士后期课程入试信息。', pending: true }
      ],
      pending: true
    },
    {
      id: 'gsaps',
      name: 'アジア太平洋研究科',
      en: 'Graduate School of Asia-Pacific Studies',
      type: '学术研究科',
      campusIds: ['waseda'],
      term: '修士 2 年 / 博士後期 3 年',
      url: 'https://www.waseda.jp/fire/gsaps/',
      summary: '官网政策页面的学习成果说明列出三大研究分野：地域研究、国際関係、国際協力・政策研究；官网另有「プログラム」页面介绍 MA 项目构成。',
      programs: [
        { name: '修士課程（MAプログラム）', degree: '修士（国際関係学）', desc: '2024 年度修士学位授与数 116 人（官网公开数据）。', pending: true },
        { name: '博士後期課程', degree: '博士（国際関係学）', desc: '2024 年度博士学位授与数 20 人（官网公开数据）。', pending: true },
        { name: '研究分野：地域研究 / 国際関係 / 国際協力・政策研究', degree: '—', desc: '官网学习成果条目中列出的三个分野。' }
      ],
      pending: true
    },
    {
      id: 'gsjal',
      name: '日本語教育研究科',
      en: 'Graduate School of Japanese Applied Linguistics',
      type: '学术研究科',
      campusIds: ['waseda'],
      term: '修士 2 年 / 博士後期 3 年',
      url: 'https://www.waseda.jp/fire/gsjal/',
      summary: '官网政策页面：修士课程培养具备日语教育学高度专业性的实践型专家，授予「修士（日本語教育学）」；博士后期课程培养实践研究者，授予「博士（日本語教育学）」。2027 年 4 月起开设「登録日本語教員養成プログラム」。',
      programs: [
        { name: '修士課程', degree: '修士（日本語教育学）', desc: '课程由三大支柱构成（官网政策页面）。' },
        { name: '博士後期課程', degree: '博士（日本語教育学）', desc: '以日语教育学的高度专业性与研究能力为核心。' }
      ],
      pending: false
    },
    {
      id: 'gsa',
      name: '会計研究科（会計大学院）',
      en: 'Graduate School of Accountancy',
      type: '専門職大学院',
      campusIds: ['waseda'],
      term: '専門職学位課程 2 年',
      url: 'https://www.waseda.jp/fcom/gsa',
      summary: '官网列于専門職大学院（会計大学院），页面设「コース紹介」，并公告开设アクチュアリー専門コース；培养注册会计师等会计专业人才。',
      programs: [
        { name: '会計専門職課程（会計大学院）', degree: '会計修士（専門職）', desc: '官网以「修了認定・学位授与に関する方針」公布标准年限内学位取得率等指标。', pending: true },
        { name: 'アクチュアリー専門コース', degree: '—', desc: '官网公告开设的专门课程（以数学为基础的保险数理方向）。' }
      ],
      pending: true
    },
    {
      id: 'wbs',
      name: '経営管理研究科（ビジネススクール）',
      en: 'Waseda Business School',
      type: '専門職大学院',
      campusIds: ['waseda'],
      term: '専門職学位課程 2 年（另有 1 年制）',
      url: 'https://www.waseda.jp/fcom/wbs/about/overview',
      summary: '即 Waseda Business School。官网沿革记载：由商学研究科専門職学位課程ビジネス専攻起步，后改编为経営管理研究科；官网「プログラム」页面介绍各项目，含夜间主 MBA 的コンセントレーション制度与企业派遣·非学位 1 年制项目。',
      programs: [
        { name: 'MBAプログラム（昼間 / 夜間主）', degree: '経営管理修士（専門職）', desc: '官网：夜间主 MBA 设コンセントレーション制度。', pending: true },
        { name: '企業派遣・ノンディグリー 1 年制プログラム', degree: '—', desc: '官网沿革页面列出的 1 年制项目。' }
      ],
      pending: true
    },
    {
      id: 'gwls',
      name: '法学研究科 法曹養成専攻（法科大学院）',
      en: 'Waseda Law School',
      type: '専門職大学院',
      campusIds: ['waseda'],
      term: '専門職学位課程 3 年（法学既修者 2 年）',
      url: 'https://www.waseda.jp/folaw/gwls',
      summary: '官网在専門職大学院栏目中列出，与法学研究科并列管理，负责法曹（法官、检察官、律师）培养。',
      programs: [
        { name: '法曹養成専攻', degree: '法務博士（専門職）', desc: '以司法考试合格为目标的专门职学位课程。' }
      ],
      pending: false
    },
    {
      id: 'gted',
      name: '教育学研究科 高度教職実践専攻（教職大学院）',
      en: 'Graduate School of Education (Professional Degree Program)',
      type: '専門職大学院',
      campusIds: ['waseda'],
      term: '専門職学位課程 2 年',
      url: 'https://www.waseda.jp/fedu/gted/',
      summary: '官网在専門職大学院栏目中列出，入试信息以「高度教職実践専攻」名义公布，面向现职教师与学校管理人才培养。',
      programs: [
        { name: '高度教職実践専攻', degree: '教職修士（専門職）', desc: '以学校实践课题研究为核心的教职大学院课程。' }
      ],
      pending: false
    },
    {
      id: 'gspm',
      name: '公共経営研究科',
      en: 'Graduate School of Public Management',
      type: '募集停止',
      campusIds: ['waseda'],
      term: '—',
      url: 'https://www.waseda.jp/fpse/gspm/',
      summary: '官网标注「［2012年度から募集停止］」，作为历史沿革保留在资源库中，便于查阅旧资料时对照。',
      programs: [
        { name: '公共経営専攻（募集停止）', degree: '—', desc: '2012 年度起停止招生。' }
      ],
      pending: false
    }
  ],

  /* ==================================================================
     校区（地址与交通均取自官网「交通アクセス」各校区页面）
     ================================================================== */
  campuses: [
    {
      id: 'waseda', name: '早稲田キャンパス', en: 'Waseda Campus', enShort: 'Waseda',
      pref: '東京都', addr: '〒169-8050 東京都新宿区西早稲田1-6-1',
      lat: 35.7090, lng: 139.7193, level: 'main',
      url: 'https://www.waseda.jp/top/access/waseda-campus',
      access: [
        { k: '東京メトロ東西線', v: '早稲田駅から徒歩5分' },
        { k: '東京メトロ副都心線', v: '西早稲田駅から徒歩17分' },
        { k: 'JR山手線 / 西武新宿線', v: '高田馬場駅から徒歩20分' },
        { k: '都電荒川線', v: '早稲田駅から徒歩5分' }
      ],
      schools: ['政治学研究科', '経済学研究科', '法学研究科', '教育学研究科', '商学研究科', '社会科学研究科', 'アジア太平洋研究科', '日本語教育研究科', '国際コミュニケーション研究科', '会計研究科', '経営管理研究科', '法科大学院', '教職大学院'],
      note: '官网该页面同时链接上述大学院，是修士阶段使用频率最高的校区；校内以步行者优先，车辆入校需事先许可。'
    },
    {
      id: 'toyama', name: '戸山キャンパス', en: 'Toyama Campus', enShort: 'Toyama',
      pref: '東京都', addr: '〒162-8644 東京都新宿区戸山1-24-1',
      lat: 35.7051, lng: 139.7186, level: 'main',
      url: 'https://www.waseda.jp/top/access/toyama-campus',
      access: [
        { k: '東京メトロ東西線', v: '早稲田駅から徒歩3分' },
        { k: '東京メトロ副都心線', v: '西早稲田駅から徒歩12分' },
        { k: 'JR山手線 / 西武新宿線', v: '高田馬場駅から徒歩20分' }
      ],
      schools: ['文学研究科（文学学術院）'],
      note: '文学学術院与文学部所在地；官网另列出从成田、羽田机场经东西线早稲田站的路线。'
    },
    {
      id: 'nishiwaseda', name: '西早稲田キャンパス', en: 'Nishi-Waseda Campus', enShort: 'Nishi-Waseda',
      pref: '東京都', addr: '〒169-8555 東京都新宿区大久保3-4-1',
      lat: 35.7076, lng: 139.7087, level: 'main',
      url: 'https://www.waseda.jp/top/access/nishiwaseda-campus',
      access: [
        { k: '東京メトロ副都心線', v: '西早稲田駅に直結' },
        { k: 'JR山手線 / 西武新宿線', v: '高田馬場駅から徒歩15分' },
        { k: '東京メトロ東西線', v: '早稲田駅から徒歩22分' }
      ],
      schools: ['基幹理工学研究科', '創造理工学研究科', '先進理工学研究科'],
      note: '理工学術院三大研究科所在地，副都心线西早稻田站与校区直结；官网特别说明校内不认可自行车、摩托车通行。'
    },
    {
      id: 'kikuicho', name: '喜久井町キャンパス', en: 'Kikuicho Campus', enShort: 'Kikuicho',
      pref: '東京都', addr: '〒162-0044 東京都新宿区喜久井町17',
      lat: 35.7039, lng: 139.7181, level: 'main',
      url: 'https://www.waseda.jp/top/access/kikuicho-campus',
      access: [
        { k: '東京メトロ東西線', v: '早稲田駅から徒歩5分' },
        { k: 'JR山手線 / 西武新宿線', v: '高田馬場駅から徒歩25分' }
      ],
      schools: ['研究施設（グリーン・コンピューティング・システム研究開発センター等）'],
      note: '以研究栋与实验设施为主，官网列出 40 号館、41 号館群等。'
    },
    {
      id: 'twins', name: '先端生命医科学センター TWIns', en: 'Center for Advanced Biomedical Sciences, TWIns', enShort: 'TWIns',
      pref: '東京都', addr: '〒162-8480 東京都新宿区若松町2-2',
      lat: 35.6996, lng: 139.7183, level: 'sub',
      url: 'https://www.waseda.jp/top/access/twins',
      access: [
        { k: '都営大江戸線', v: '若松河田駅から徒歩5分 / 牛込柳町駅から徒歩5分' },
        { k: '都営新宿線', v: '曙橋駅から徒歩8分' },
        { k: 'バス', v: '東京女子医科大学前バス停下車 徒歩2分' }
      ],
      schools: ['生命医科学研究関連施設'],
      note: '与东京女子医科大学共同运营的先端生命医科学教育研究设施，官网公布开馆时间与入馆手续。'
    },
    {
      id: 'nihonbashi', name: '日本橋キャンパス', en: 'Nihonbashi Campus', enShort: 'Nihonbashi',
      pref: '東京都', addr: '〒103-0027 東京都中央区日本橋1-4-1 日本橋一丁目ビルディング5F（コレド日本橋）',
      lat: 35.6826, lng: 139.7741, level: 'sub',
      url: 'https://www.waseda.jp/top/access/nihonbashi-campus',
      access: [
        { k: 'JR', v: '東京駅新幹線口から徒歩5分' },
        { k: '東京メトロ', v: '日本橋駅に直結' }
      ],
      schools: ['コンティニューイング・エデュケーション推進室', 'WASEDA NEO'],
      note: '以社会人教育、履修证明项目为主的城市型校区。'
    },
    {
      id: 'higashifushimi', name: '東伏見キャンパス', en: 'Higashifushimi Campus', enShort: 'Higashifushimi',
      pref: '東京都', addr: '〒202-0021 東京都西東京市東伏見3-4-1（79号館）／東伏見2-7-5（75-2号館）',
      lat: 35.7265, lng: 139.5605, level: 'main',
      url: 'https://www.waseda.jp/top/access/higashifushimi-campus',
      access: [
        { k: '西武新宿線', v: '東伏見駅から徒歩1分' }
      ],
      schools: ['競技スポーツセンター', '体育会各部施設'],
      note: '以体育会与竞技体育设施为主，官网列出学生寮、室内网球场、马术部等设施。'
    },
    {
      id: 'tokorozawa', name: '所沢キャンパス', en: 'Tokorozawa Campus', enShort: 'Tokorozawa',
      pref: '埼玉県', addr: '〒359-1192 埼玉県所沢市三ケ島2-579-15',
      lat: 35.8068, lng: 139.4470, level: 'main',
      url: 'https://www.waseda.jp/top/access/tokorozawa-campus',
      access: [
        { k: '西武池袋線', v: '小手指駅からスクールバス（無料）で約20分' }
      ],
      schools: ['人間科学研究科', 'スポーツ科学研究科'],
      note: '官网 100 号館说明明确列出人間科学研究科与スポーツ科学研究科，另设所沢図書館、保健センター分室。'
    },
    {
      id: 'honjo', name: '本庄キャンパス', en: 'Honjo Campus', enShort: 'Honjo',
      pref: '埼玉県', addr: '〒367-0035 埼玉県本庄市西冨田1011',
      lat: 36.2186, lng: 139.1831, level: 'main',
      url: 'https://www.waseda.jp/top/access/honjo-campus',
      access: [
        { k: '上越・北陸新幹線', v: '本庄早稲田駅下車 徒歩約3分' },
        { k: 'JR高崎線', v: '本庄駅下車 南口よりタクシー約5分' }
      ],
      schools: ['環境・エネルギー研究科', '環境総合研究センター', '本庄高等学院'],
      note: '官网该页面链接「大学院環境・エネルギー研究科」，是理工系中位置最北的校区。'
    },
    {
      id: 'kitakyushu', name: '北九州キャンパス', en: 'Kitakyushu Campus', enShort: 'Kitakyushu',
      pref: '福岡県', addr: '〒808-0135 福岡県北九州市若松区ひびきの2-7',
      lat: 33.8885, lng: 130.7135, level: 'main',
      url: 'https://www.waseda.jp/top/access/kitakyushu-campus',
      access: [
        { k: 'JR鹿児島本線', v: '小倉駅・博多駅から折尾駅へ' },
        { k: 'バス', v: '折尾駅西口から「学研都市ひびきの」方面' }
      ],
      schools: ['情報生産システム研究科'],
      note: '位于北九州学研都市，是唯一设在九州的研究科校区；官网同时链接当地研究中心。'
    },
    {
      id: 'nakano', name: '中野国際コミュニティプラザ', en: 'International Community Plaza Nakano', enShort: 'Nakano',
      pref: '東京都', addr: '〒164-0001 東京都中野区中野4丁目22番3号',
      lat: 35.7056, lng: 139.6656, level: 'sub',
      url: 'https://www.waseda.jp/top/access/nakano',
      access: [
        { k: '東京メトロ東西線', v: '早稲田駅から中野駅まで約8分、中野駅から徒歩' },
        { k: '東京メトロ東西線', v: '高田馬場駅から中野駅まで約5分、中野駅から徒歩' }
      ],
      schools: ['エクステンションセンター中野校', '学生寮 WISH'],
      note: '1 楼为早稻田大学延伸教育中心中野校，2～11 楼为学生宿舍 WISH。'
    }
  ]
};
