/* ============================================================
   terms.git.js · Git 协作（12 词条）
   ============================================================ */
(function (W) {
  W.STD_TERMS = W.STD_TERMS || [];
  W.STD_TERMS.push(

  {
    id: 'vcs',
    en: 'Version Control',
    zh: '版本控制',
    aliases: ['VCS', '版本管理'],
    cat: 'git',
    tags: ['Git', '协作'],
    level: 'core',
    summary: '给代码建立可回溯历史的系统：谁在何时改了什么，随时可回退。',
    plain: [
      '版本控制系统（Git 是事实标准）像给项目装了时光机：每次保存一个快照并记录作者与说明，任何时刻都能查看历史、对比差异、回到过去。没有它，团队协作就是互相覆盖文件的灾难现场。',
      '它还解决「并行」问题：每个人在自己分支上改动，最后按规则合并。配合远程仓库（GitHub、GitLab），多人异地协作、代码评审、持续集成都建立在版本历史之上。',
      '对 AI 协作的意义：让 AI 改代码前先确认工作区干净、必要时新建分支——这样 AI 的改动出问题可以整体丢弃，而不是污染你的半成品。'
    ],
    analogy: '版本控制像游戏存档：打 Boss 前先存档（提交），输了读档重来；还能翻看每段录像（历史 diff）复盘哪一步走错了。',
    talk: {
      good: [
        '动手前请先用 git status 确认工作区干净；这次修改单独建分支 feature/export-pdf 进行。'
      ],
      bad: [
        { say: '直接在我代码上改就行', why: '不区分已提交与未提交状态，AI 的改动混入你的半成品，出错时无法干净回退。' }
      ]
    },
    misconceptions: [
      '版本控制只是备份？它的核心价值是「结构化的历史 + 并行协作」，备份只是副产品。'
    ],
    related: ['repository', 'commit', 'branch']
  },

  {
    id: 'repository',
    en: 'Repository',
    zh: '仓库',
    aliases: ['repo', '代码库'],
    cat: 'git',
    tags: ['Git', '基础概念'],
    level: 'core',
    summary: '被 Git 管理的项目目录：含全部文件与完整历史，可克隆复制。',
    plain: [
      '仓库 = 项目文件 + 全部版本历史。它分两种形态：本地仓库在你电脑的 .git 目录里，远程仓库托管在 GitHub/GitLab 服务器上供团队同步。clone 会把文件和历史一起完整复制下来。',
      '仓库内文件有三种状态流转：工作区修改后 add 进暂存区（staging），再 commit 才真正记入历史。「暂存区」是新手最容易忽略的一环——它让你可以把零散改动拆成多个干净的提交。',
      '和 AI 协作时说清「这个 repo 是 monorepo，前端在后端同仓库的 web/ 目录下」，它能遵守你的目录约定，不会把文件放错位置。'
    ],
    analogy: '本地仓库像你书桌上的手稿和全部草稿纸，远程仓库像出版社保险柜里的正式存档——双方随时互相同步。',
    talk: {
      good: [
        '这是 monorepo：前端在 apps/web，公共组件在 packages/ui，新组件请放到对应目录。'
      ],
      bad: [
        { say: '把代码放到仓库里', why: '不说哪个远程、哪个目录结构，AI 可能凭空 git init 出一个孤立仓库。' }
      ]
    },
    misconceptions: [
      '.git 文件夹可以随手删？删掉它项目文件还在，但全部历史丢失，且无法再与远程同步。'
    ],
    related: ['vcs', 'clone-fork', 'commit']
  },

  {
    id: 'clone-fork',
    en: 'Clone & Fork',
    zh: 'Clone 与 Fork',
    cat: 'git',
    tags: ['Git', '开源协作'],
    level: 'common',
    summary: 'Clone 把仓库完整复制到本地；Fork 在平台服务器上复制一份到你的账号下。',
    plain: [
      'clone 是 Git 操作：把远程仓库连同历史拉到你本机，之后可以直接推送（如果你有权限）。fork 是平台操作：在 GitHub 上把别人的仓库复制一份到你账号名下——你没有原仓库写权限时，先 fork 再改再发 PR。',
      '标准开源贡献流：fork 上游仓库 → clone 你的 fork 到本地 → 新建分支改代码 → push 回你的 fork → 在平台上向上游发起 Pull Request → 维护者评审合并。',
      '让 AI 参与贡献时讲清这套链路：「这是 fork 仓库，上游叫 upstream，请把改动提交到我的 fork 分支」，避免它尝试直接 push 给无权限的上游。'
    ],
    analogy: 'fork 像把别人的公开菜谱复印一份到自己名下（随便涂改不影响原件），clone 则是把复印件拿回家厨房实操。',
    talk: {
      good: [
        '帮我配置双远程：origin 指向我的 fork，upstream 指向原仓库，平时只 push origin。'
      ],
      bad: [
        { say: '把这个开源项目代码拉下来改', why: '不说 fork 流程，AI 可能引导你 clone 后直接向上游 push，被权限拒绝卡住。' }
      ]
    },
    misconceptions: [
      'fork 之后自动同步上游？不会；上游更新需要你手动 fetch upstream 并合并到自己的 fork。'
    ],
    related: ['repository', 'pull-request', 'vcs']
  },

  {
    id: 'commit',
    en: 'Commit',
    zh: '提交',
    cat: 'git',
    tags: ['Git', '基础概念'],
    level: 'core',
    summary: '给暂存区的改动拍一张带说明的历史快照，永不改变的档案编号。',
    plain: [
      'commit 记录的是「此刻暂存区里所有改动的快照」，附上作者、时间和说明信息。每个提交有唯一哈希 ID，历史就是一条由提交串成的链。注意它存的是快照不是「改动了几个字」，所以回退和对比都极其可靠。',
      '好提交的两个标准：小而完整（一次只做一件事，能独立编译运行）、说明清楚（feat: 支持导出 PDF / fix: 修复空指针，遵循 Conventional Commits 风格更利于生成变更日志）。「改了三十个文件一锅炖」的大提交是评审噩梦。',
      'AI 协作场景：让它改完代码后「按功能拆成多个 commit 提交」，历史清晰可回溯；千万别让它把 node_modules 或密钥提交进去——.gitignore 先行。'
    ],
    analogy: 'commit 像快递揽收：add 打包进箱子（暂存区），commit 贴上面单正式发出——面单上的说明写得越清楚，日后追溯越省心。',
    talk: {
      good: [
        '把这次改动拆成两个提交：样式调整一个，逻辑修复一个，都用中文写清动机。'
      ],
      bad: [
        { say: '顺便帮我都提交了', why: '不加甄别的全量提交可能混入调试代码、临时文件甚至密钥，进入历史极难清除。' }
      ]
    },
    misconceptions: [
      '提交了就安全了？push 之前都只存在于本地；而且错误内容一旦推送到共享分支，改写历史要协调全组。'
    ],
    related: ['vcs', 'branch', 'gitignore', 'pull-request']
  },

  {
    id: 'branch',
    en: 'Branch',
    zh: '分支',
    cat: 'git',
    tags: ['Git', '协作'],
    level: 'core',
    summary: '从主干分出的平行开发线：各改各的互不干扰，完成后再合回去。',
    plain: [
      '分支本质是一个指向某次提交的可移动指针，创建几乎零成本。主分支（main/master）保持可用状态，功能开发、修 bug 各开分支：feature/login、fix/header-overlap——这就是「分支工作流」，几乎所有团队的标配。',
      '常见命名约定：feature/ 新功能、fix/ 修复、hotfix/ 生产紧急修复、release/ 发布准备。分支存活期越短越好，长期不合并的「僵尸分支」会积累巨大冲突。',
      'AI 协作最佳实践之一：每次让 AI 动手前先开新分支。它改砸了直接删分支即可，主分支毫发无损——这是把 AI 当实习生用的安全围栏。'
    ],
    analogy: '分支像平行宇宙：从同一时刻分叉出去各自发展剧情；拍完试映片段（merge）决定要不要并入正片时间线。',
    visual: { kind: 'anim', id: 'git-branch-merge', caption: '分支推进与合并的动态演示' },
    talk: {
      good: [
        '从最新的 main 拉出分支 feat/search-filter 再开始改，不要直接在 main 上提交。'
      ],
      bad: [
        { say: '随便开个分支吧', why: '不含来源与命名规范，AI 可能在陈旧节点上开分支，或起出无法辨识用途的名字。' }
      ]
    },
    misconceptions: [
      '分支是一份完整拷贝很占空间？Git 分支只是一个 41 字节的指针文件，创建瞬间完成。'
    ],
    related: ['merge', 'commit', 'rebase', 'conflict']
  },

  {
    id: 'merge',
    en: 'Merge',
    zh: '合并',
    cat: 'git',
    tags: ['Git', '协作'],
    level: 'core',
    summary: '把一条分支的成果汇入另一条：产生一个合并提交，保留完整分叉历史。',
    plain: [
      'merge 把目标分支的改动并入当前分支。若两边改的是不同文件，Git 自动完成；若碰了同一处，就抛出冲突等你裁决。合并成功通常会产生一个有两个父提交的 merge commit——历史上能看到「这里曾分叉又汇聚」。',
      '两种整合风格：merge 忠实记录分叉轨迹，历史真实但线图较乱；rebase 把提交摘下来接到目标末尾，历史笔直但改写了原有提交。团队必须统一约定（常见：个人分支内部可 rebase，进主干的 PR 用 merge）。',
      '让 AI 合并时的保命句式：「用 merge --no-ff 合入，不要 rebase 共享分支」——rebase 已推送的公共分支会重写他人基于它的所有工作，是团队协作大忌。'
    ],
    analogy: 'merge 像两条溪流自然汇成大河，交汇处立了块碑（merge commit）；rebase 像把支流的石头搬到主流末端铺直——好看，但原来的河道被抹掉了。',
    talk: {
      good: [
        '把 feature/cart 用 no-ff 方式合入 main，冲突若出现请逐个列出来问我怎么取舍。'
      ],
      bad: [
        { say: '把分支合一下就好', why: '不指定策略与冲突处理规则，AI 可能擅自 rebase 共享分支或粗暴选择一边丢弃他人改动。' }
      ]
    },
    misconceptions: [
      '冲突是 Git 坏了？冲突恰是保护机制——它无法替你决定业务语义，只能把矛盾摆上桌面由人裁决。'
    ],
    related: ['branch', 'conflict', 'rebase', 'pull-request']
  },

  {
    id: 'rebase',
    en: 'Rebase',
    zh: '变基',
    cat: 'git',
    tags: ['Git', '进阶'],
    level: 'advanced',
    summary: '把一串提交摘下来重新嫁接到另一条分支末尾，历史因此变得笔直。',
    plain: [
      'rebase 「换基底」：把你的提交序列取出，逐个在新基底上重放。效果是历史呈一条直线，没有交叉网。配套的交互模式 rebase -i 还能编辑、合并、重排提交，是整理本地凌乱历史的神器。',
      '铁律只有一条：不要 rebase 已经推送给他人使用的公共分支。重放后的提交哈希全新，等于宣告旧历史作废，协作者的本地会陷入错乱。黄金法则——私有分支随便变基，共享分支只许 merge。',
      '另一个高频场景是拉取更新：pull --rebase 让你的本地小提交「骑」到远端最新进度之上，避免「Merge branch main」之类的噪音提交刷屏。'
    ],
    analogy: 'rebase 像把你写的章节抽出来，重新誊到修订版教材的最新页码后面——书更连贯了，但你引用的旧页码（哈希）全部作废。',
    talk: {
      good: [
        '我本地这条 feature 分支落后了，请 git pull --rebase 同步；绝不要动 main 上的历史。'
      ],
      bad: [
        { say: '历史太乱了整理一下吧', why: '若是共享分支，AI 执行 rebase 将重写他人提交；整理历史仅限未分享的本地提交。' }
      ]
    },
    misconceptions: [
      'rebase 只是移动指针？它会为每个重放的提交生成全新哈希——这正是它与 merge 的本质区别，也是危险的来源。'
    ],
    related: ['merge', 'commit', 'branch']
  },

  {
    id: 'conflict',
    en: 'Merge Conflict',
    zh: '解决冲突',
    aliases: ['冲突'],
    cat: 'git',
    tags: ['Git', '协作'],
    level: 'common',
    summary: '两条分支改了同一处代码，Git 无法替你做主，标记出来由人裁决。',
    plain: [
      '当两边分支修改了同一行（或相邻区域），合并时 Git 会在文件里插入 <<<<<<< 、=======、>>>>>>> 标记，把两个版本并列展示。你需要人工决定：留这边、留那边、还是融合两者，然后删掉标记行，git add 完成裁决。',
      '减少冲突的习惯：分支小步快走勤合并、团队沟通避免两人同时重构同一模块、大重构提前广播。工具层面，VS Code 等编辑器提供三栏对比视图，比手抠标记行高效得多。',
      'AI 协作提示：把冲突段落连同两边的意图描述给 AI，它能给出融合建议；但业务取舍必须你来拍板——它不知道哪边代表更新的产品决策。'
    ],
    analogy: '两个同事同时改了会议室预订表同一格，系统没法猜谁说了算，只好把两条记录贴在一起等人拍板。',
    talk: {
      good: [
        '冲突在 checkout 函数：HEAD 版本是新支付流程，feature 版本是优惠券逻辑，请融合两者并保证都能触发。'
      ],
      bad: [
        { say: '有冲突你看着办', why: 'Git 与 AI 都不懂业务优先级，「随便选一边」丢掉的那边往往正是别人刚上线的工作。' }
      ]
    },
    misconceptions: [
      '解决冲突就是选一个版本？很多时候正确答案是手动融合两者语义，机械二选一会悄悄破坏功能。'
    ],
    related: ['merge', 'branch', 'code-review']
  },

  {
    id: 'pull-request',
    en: 'Pull Request',
    zh: 'Pull Request',
    aliases: ['PR', 'MR', '合并请求'],
    cat: 'git',
    tags: ['Git', '协作', '流程'],
    level: 'core',
    summary: '请求把你的分支合并进目标分支的正式流程，附带讨论与评审。',
    plain: [
      'PR（GitLab 里叫 Merge Request/MR）是「我想把 A 分支合进 B 分支」的申请单：平台展示全部差异，队友逐行评论，CI 自动跑测试，一切绿灯后维护者点合并。它是现代团队的质量闸门——没人能绕过评审直接动主干。',
      '好 PR 的修养：范围聚焦（一个大 PR 没人有耐心细看）、描述完整（做了什么、为什么、如何验证）、关联工单号、截图/录屏佐证 UI 改动。PR 越小，评审越快，返工越少。',
      '让 AI 写完代码后，要求它同时起草 PR 描述（背景/改动点/测试方式），你只需审核润色——这一步能把 AI 产出无缝接入人类协作流程。'
    ],
    analogy: 'PR 像论文投稿：你交稿件（分支差异），编辑部送外审（code review）+ 查重（CI 测试），通过后才刊发进期刊（主分支）。',
    talk: {
      good: [
        '为当前分支创建 PR：标题用 fix: 开头，正文包含背景、改动清单、自测步骤三节，关联 issue #42。'
      ],
      bad: [
        { say: '帮我合进主干', why: '跳过评审与 CI 直接合并违背团队闸门机制，也失去了变更记录与回滚锚点。' }
      ]
    },
    misconceptions: [
      'PR 被拒是坏事？评审意见正是免费的技术指导；被拒后完善重提，比带着隐患进主干便宜得多。'
    ],
    related: ['code-review', 'branch', 'merge', 'ci-cd']
  },

  {
    id: 'stash',
    en: 'Stash',
    zh: 'Stash 暂存',
    aliases: ['贮藏'],
    cat: 'git',
    tags: ['Git', '技巧'],
    level: 'common',
    summary: '把没做完的改动临时收进抽屉，让工作区瞬间干净，忙完再取出来。',
    plain: [
      '正改着代码，突然要切分支救火，但手头的半成品还不能提交——git stash 把全部未提交改动（含暂存的）打包藏起来，工作区恢复干净；处理完回来 git stash pop 取出继续。多次 stash 形成栈，可按编号取用。',
      '细节提醒：pop 取最近一次并删除记录；apply 只取不删；新文件默认不在 stash 里，需 git stash -u 连同未跟踪文件一起收。取回时若与当前代码冲突，Git 会照常标出冲突让你裁决。',
      '它和 commit 的分工：stash 是「临时寄存」，不进历史、不该长期滞留；超过一天的 stash 大概率会被遗忘——要么做完提交，要么干脆放弃。'
    ],
    analogy: 'stash 像电影院开场前的寄存柜：手里的零食杂物先锁进去（工作区清空），散场再取出来接着吃。',
    talk: {
      good: [
        '先把我的未提交改动 stash 起去 hotfix 分支修线上问题，回来后 pop 恢复现场。'
      ],
      bad: [
        { say: '把我这些改动先存一下别丢了', why: 'stash 不是持久存储，误清栈或冲突即丢失；重要半成品应 WIP 提交到私有分支。' }
      ]
    },
    misconceptions: [
      'stash 会保存新添加的文件？默认只收已跟踪文件的改动；加 -u 才包含 untracked 文件。'
    ],
    related: ['commit', 'branch', 'vcs']
  },

  {
    id: 'tag',
    en: 'Tag',
    zh: '标签 Tag',
    cat: 'git',
    tags: ['Git', '发布'],
    level: 'common',
    summary: '钉在某个提交上的永久路标：v1.2.0 就发生在这里，永不变动。',
    plain: [
      'tag 给特定提交起个名字，专用于版本里程碑：发布 v1.0.0 时打个 tag，以后任何时候都能精确回到那个状态打包。与分支的区别：分支指针随提交不断前进，tag 钉死不动。',
      '两种类型：轻量 tag 只是个别名；附注（annotated）tag 存储完整对象——打标人、日期、说明，并可 GPG 签名证明发布可信。发布正式版本一律用附注 tag。',
      '和 CI/CD 联动是它的现代价值：很多流水线以「推送了 v* 格式的 tag」为触发信号执行构建发布；语义化版本词条里的版本号正是写在 tag 上的。'
    ],
    analogy: 'tag 像景区里「海拔 2000m」的石碑：钉在那里永不挪窝；分支则像登山者本人，位置一直在变。',
    talk: {
      good: [
        '发布流程：合并后在 main 打附注 tag v1.4.0 并附更新说明，推送触发生产发布流水线。'
      ],
      bad: [
        { say: '给现在打个版本标记', why: '不说命名规范与类型，轻量 tag 缺少元数据，后续审计与签名验证无从谈起。' }
      ]
    },
    misconceptions: [
      'tag 推送和分支一样？git push 默认不推送 tag，需要显式 push --tags 或指定单个 tag。'
    ],
    related: ['semver', 'ci-cd', 'commit', 'branch']
  },

  {
    id: 'gitignore',
    en: '.gitignore',
    zh: '.gitignore 忽略配置',
    cat: 'git',
    tags: ['Git', '工程化'],
    level: 'core',
    summary: '声明哪些文件不进版本库：依赖、构建产物、密钥与本地配置。',
    plain: [
      '.gitignore 是仓库根目录的清单文件，一行一条规则，命中的路径将被 Git 无视：node_modules/、dist/、.env、*.log、.DS_Store……目的有三：体积（依赖与产物可重建）、噪音（与本机相关的配置不该打扰他人）、安全（密钥绝不入库）。',
      '三个易踩坑：一是已被跟踪的文件不会被 ignore 生效，需先 git rm --cached；二是空目录 Git 本就不记录，惯例放 .gitkeep 占位；三是全局忽略（如编辑器文件）应配全局 ignore 文件而非塞进项目清单。',
      'AI 新建项目时，第一句就该是「补齐合适的 .gitignore」——尤其是涉及 .env 密钥的场景，这一行配置挡住的是最昂贵的事故。'
    ],
    analogy: '.gitignore 像机场安检禁运清单：提前写明什么不许带上飞机（仓库），安检员（Git）照单放行其余行李。',
    talk: {
      good: [
        '初始化项目后先生成 Node + VS Code 场景的 .gitignore，务必包含 .env 与 dist 目录。'
      ],
      bad: [
        { say: '有些文件不想传上去', why: '不说具体哪些、是否已被跟踪，AI 可能只加规则不清理缓存，敏感文件仍在历史里。' }
      ]
    },
    misconceptions: [
      '加入 .gitignore 就能删除已上传的敏感文件？它只防未来；清除历史要用 filter-repo 等工具，泄露的密钥应立即作废轮换。'
    ],
    related: ['commit', 'env-var', 'repository']
  },

  {
    id: 'git-workflow',
    en: 'Git Workflows',
    zh: 'Git 协作工作流',
    aliases: ['工作流', 'Git Flow', '主干开发', 'feature branch'],
    cat: 'git',
    tags: ['协作', '流程'],
    level: 'common',
    summary: '团队协作要定「怎么用分支」：主干开发、Git Flow、GitHub Flow，按发布节奏选。',
    plain: [
      'Git 工作流是团队约定的分支使用规则：主干开发（Trunk-based）——大家都往 main 频繁小提交，配 CI 随时可发布；GitHub Flow——从 main 拉 feature 分支开发，PR 合回 main，适合持续发布；Git Flow——main 管正式版、develop 管开发、再加 release/hotfix 分支，适合按版本周期发布。',
      '选型看发布节奏：能天天发布选主干/GitHub Flow，轻；按版本定期发布且要维护旧版本，Git Flow 更合适。无论哪种，核心都是：分支要短命、PR 要小、合并要经过 review 和 CI。',
      '跟 AI 说「我们按 GitHub Flow：feature 分支开发、PR 合并回 main、CI 必须通过」，它就知道工作流约定；说「帮我规划 git 流程」它可能给你套个过重的 Git Flow。'
    ],
    analogy: 'Git 工作流像餐厅后厨的分工制度：有的店一灶到底谁在谁炒（主干开发），有的店分热菜凉菜专人（Git Flow）——制度要匹配出餐速度（发布节奏），不是越复杂越好。',
    talk: {
      good: [
        '采用 GitHub Flow：每次从 main 拉 feature 分支，PR review 后合并，配 CI。',
        '按版本发布的团队用 Git Flow：main 放正式版，develop 汇合开发。'
      ],
      bad: [
        { say: '直接往 main 提交吧', why: '没定工作流，长期直接提交 main 会导致冲突多、无法 review。' }
      ]
    },
    misconceptions: [
      '工作流越完整越好？过重的工作流拖慢小团队，要匹配规模。',
      'Git Flow 是标配？持续发布团队用主干开发更顺，没有万能工作流。'
    ],
    related: ['branch', 'pull-request', 'merge']
  },

  {
    id: 'git-remote',
    en: 'Git Remote',
    zh: '远程仓库',
    aliases: ['origin', 'remote', '远程', '上游'],
    cat: 'git',
    tags: ['远程', '协作'],
    level: 'core',
    summary: 'remote 是本地仓库指向的远程地址（默认叫 origin）：push/pull/fetch 都和它打交道。',
    plain: [
      '本地仓库通过 remote（远程别名）关联一个远程仓库地址，默认别名 origin。git push 把本地提交推给 origin，git pull 从 origin 拉取——所有远程操作都以 remote 为对象。',
      '一个仓库可以配多个 remote（比如 fork 出来的要同时连自己的和上游的）；git remote -v 查看、git remote add 添加。注意：remote 只是「地址指针」，远程的状态要 fetch 下来才能看到。',
      '跟 AI 说「把改动推到 origin/main」「加一个指向上游的 remote 用于同步」，它就知道操作对象；说「推送」如果没确认 remote 名，可能推到错的地址。'
    ],
    analogy: 'remote 像手机通讯录里的联系人：origin 是「家」这个号码（远程地址），拨号（push/pull）就是打给这个号码——你可以存多个号码（多个 remote），打哪个取决于你想联系谁。',
    talk: {
      good: [
        '把当前分支推送到 origin，并设置上游跟踪。',
        '加一个 upstream remote 指向原仓库，用于定期同步上游更新。'
      ],
      bad: [
        { say: '帮我推一下', why: '没说推到哪个 remote 和分支，AI 可能推到错误地址或默认分支。' }
      ]
    },
    misconceptions: [
      'remote 和仓库一样？remote 只是地址，本地和远程是两份独立副本。',
      '只有一个 remote？可以多个，fork 场景必须有上游 remote。'
    ],
    related: ['repository', 'clone-fork', 'vcs']
  },

  {
    id: 'git-fetch-pull',
    en: 'Git Fetch vs Pull',
    zh: 'fetch 与 pull',
    aliases: ['fetch', 'pull', '拉取', '同步远程'],
    cat: 'git',
    tags: ['远程', '命令'],
    level: 'core',
    summary: 'fetch 只把远程更新「下载到本地仓库」不动你的工作区；pull 是 fetch 后再合并到当前分支。',
    plain: [
      'git fetch 把远程的新提交下载到本地（更新远程跟踪分支 origin/main），但不碰你的工作区；git pull 等价于 fetch + merge（把远程更新合并进当前分支）。所以 fetch 是「安全查看远程有什么」，pull 是「直接把它合进来」。',
      '为什么推荐先 fetch 看情况：直接 pull 可能把远程的更新硬合并进你有冲突的工作区，先 fetch 再决定 merge 还是 rebase，可控。pull 的合并冲突和普通 merge 冲突一样处理。',
      '跟 AI 说「先 fetch 看看远程有没有更新，再决定怎么合」，它就不会贸然 pull 制造冲突；说「更新一下代码」它默认 pull，可能直接冲突。'
    ],
    analogy: 'fetch 像先到信箱把新邮件取回屋里放着（还没拆）；pull 是取回并立刻按内容把家里东西重新归置（合并）——先取回来看看有哪些邮件，比一封封拆着归置更稳。',
    visual: { kind: 'anim', id: 'git-fetch-pull', caption: 'fetch 只拿不回，pull 才合并' },
    talk: {
      good: [
        '先 git fetch origin，查看远程更新后再决定 pull 还是 rebase。',
        '用 git pull --rebase 保持历史线性，避免多余的 merge 提交。'
      ],
      bad: [
        { say: '直接 pull 吧', why: '不先 fetch 就直接合并，远程有冲突更新时你的工作区被打乱。' }
      ]
    },
    misconceptions: [
      'fetch 和 pull 一样？pull 是 fetch+merge，fetch 只下载不动工作区。',
      'pull 一定安全？它会直接合并，可能产生冲突，先 fetch 更可控。'
    ],
    related: ['git-remote', 'merge', 'rebase']
  },

  {
    id: 'git-push-force',
    en: 'Force Push',
    zh: '强制推送',
    aliases: ['force push', '-f', '强推', '覆盖远程'],
    cat: 'git',
    tags: ['远程', '命令'],
    level: 'advanced',
    summary: 'push -f 用本地覆盖远程历史：能救场也能毁掉协作，多人共享分支别乱用。',
    plain: [
      '普通 push 只接受「在远程基础上追加」的提交，历史分叉会被拒绝。git push --force（-f）强行把远程历史改成你本地的样子，常用于：rebase 之后（本地历史重写了）、清理错误提交。',
      '风险：如果别人已经基于远程旧历史提交了，force 会把他人的提交抹掉（他们本地还在但远程没了）。所以：不要对多人共享的分支 force push；共享分支要 force 时用 --force-with-lease（比 -f 安全，会检查远程没被改动过）。',
      '跟 AI 说「这条 feature 分支 rebase 后要 push -f，但用 --force-with-lease 防误伤」，它就用安全姿势；说「push 失败强制推」如果是对 main，可能就是灾难。'
    ],
    analogy: 'force push 像把公告栏的旧内容直接撕掉换新的：如果只有你一个人在管这块板（独享分支）没事；但如果别人也在上面贴了东西（共享分支），你一把撕掉，他们的内容就没了——所以要先确认没别人动过（--force-with-lease）。',
    talk: {
      good: [
        'rebase 后的私有 feature 分支用 git push --force-with-lease 更新远程。',
        '禁止对 main 直接 force push，采用 PR 合并。'
      ],
      bad: [
        { say: 'push 失败，加 -f 强推', why: '如果是共享分支，-f 会抹掉同事的提交，必须先确认。' }
      ]
    },
    misconceptions: [
      'force push 只是换个方式推送？它改写历史，可能丢失他人的远程提交。',
      '--force-with-lease 和 -f 一样？前者先校验远程没被他人改动，安全得多。'
    ],
    related: ['git-remote', 'rebase', 'git-branch-protection']
  },

  {
    id: 'git-log-history',
    en: 'Git Log & History',
    zh: '查看提交历史',
    aliases: ['git log', '历史', '提交记录', 'blame'],
    cat: 'git',
    tags: ['命令', '历史'],
    level: 'common',
    summary: 'git log 看提交历史、git blame 查每一行谁改的：排查「这行代码哪来的」全靠它们。',
    plain: [
      'git log 查看提交历史（谁、何时、改了什么）；git log --oneline 紧凑看；--graph 看分支合并图；git blame 文件按行标注「每一行最后一次是谁在哪个提交改的」。',
      '排查思路：出了 bug 想找「哪次改动引入的」，用 git log -S 关键词 或 git blame 定位到某行，再 git show 那个提交看当时改了啥。历史清晰度依赖提交信息质量——这就是提交信息要规范的原因。',
      '跟 AI 说「用 git log -S 找出哪个提交引入了这个函数」「git blame 看这行的来源」，它能精确定位；说「帮我查历史」没有具体线索它只能拉个列表。'
    ],
    analogy: 'git log 像项目的完整日记本：每一天（提交）记了什么一目了然；git blame 像给每行代码贴的「出处标签」：这行是谁、哪天、因为什么写下的——出问题顺着标签就能找到当事人。',
    talk: {
      good: [
        '用 git log -S 删除的关键词，找出哪个提交改动了这段逻辑。',
        '用 git blame 看这行代码的来源提交，再 git show 查看详情。'
      ],
      bad: [
        { say: '这代码谁改的，帮我查', why: '没给关键词或文件行，AI 只能拉历史，效率低。' }
      ]
    },
    misconceptions: [
      'blame 是甩锅工具？它是定位引入者的排查手段，不是追责工具。',
      '历史越详细越好？提交太碎或信息乱反而难查，提交信息规范很重要。'
    ],
    related: ['commit', 'git-commit-message', 'git-diff']
  },

  {
    id: 'git-diff',
    en: 'Git Diff',
    zh: 'diff 变更查看',
    aliases: ['diff', '变更', '改动', '对比'],
    cat: 'git',
    tags: ['命令', '变更'],
    level: 'common',
    summary: 'git diff 看工作区/暂存区/提交之间的差异：提交前先 diff 检查，别闭眼提交。',
    plain: [
      'git diff 显示不同版本间的差异：默认看工作区改动（还没暂存）；git diff --staged 看已暂存待提交的；git diff 两个提交之间 看版本差异。红-绿 分别表示删除和新增。',
      '好习惯：提交前 git diff --staged 检查一遍自己改了什么，别把调试代码、敏感信息、无关改动一起提交。PR 的 review 本质就是看 diff，diff 越小越清晰越容易审。',
      '跟 AI 说「提交前帮我 diff 检查，有没有混入调试代码或敏感信息」，它能帮你把关；说「直接提交」容易把临时调试的东西推上去。'
    ],
    analogy: 'diff 像发文章前的校对稿：红色删除线、绿色新增标注，一眼看清这版改了哪些字——不发未校对的稿子（不闭眼提交），就是 diff 的价值。',
    talk: {
      good: [
        '提交前跑 git diff --staged 检查，确认没有调试代码和敏感信息。',
        '对比这两个提交的 diff，找出功能变更点。'
      ],
      bad: [
        { say: '直接帮我提交', why: '不先看 diff，可能把临时调试、无关文件一起提交，污染历史。' }
      ]
    },
    misconceptions: [
      'diff 只能看本地？git diff 本地 vs 远程 也能看，配合 fetch。',
      '提交就是 push？提交是本地，diff 检查在提交前做最有效。'
    ],
    related: ['commit', 'git-log-history', 'conflict']
  },

  {
    id: 'git-reset',
    en: 'Git Reset',
    zh: 'reset 撤销',
    aliases: ['reset', '撤销', '回退', 'unstage'],
    cat: 'git',
    tags: ['命令', '撤销'],
    level: 'advanced',
    summary: 'reset 把 HEAD 移回某提交：--soft 保暂存、--mixed 撤暂存、--hard 连工作区一起丢（危险）。',
    plain: [
      'git reset 把当前分支的 HEAD 指回某个提交，用来撤销提交或撤出暂存。三个模式：--soft 只动 HEAD（改动还在暂存区）、--mixed（默认）撤销暂存（改动回到工作区）、--hard 连工作区改动一起丢弃（危险，误操作丢代码）。',
      '场景：提交完发现忘了一个文件——用 --soft 或 --amend 补；不想暂存了——reset 把它移出暂存区；彻底不要这次提交的改动——--hard（先确认）。重要提醒：reset 改写本地历史，已经 push 到共享分支的提交不要 reset，要用 revert。',
      '跟 AI 说「撤销最后一次提交但保留改动，用 reset --soft」「彻底丢弃本地未提交改动用 checkout 或 reset --hard」，它就知道分寸；说「撤销一下」没说模式可能误用 --hard。'
    ],
    analogy: 'reset 像把钟表（HEAD 指针）往回拨：--soft 是「拨回来但桌上的东西（改动）都还在」；--mixed 是「拨回来，东西退回口袋里（未暂存）」；--hard 是「拨回来顺便把屋子都清空了」——清空那招（--hard）用前务必确认没丢东西。',
    talk: {
      good: [
        '撤销最后一次提交但保留改动，用 git reset --soft HEAD~1。',
        '共享分支上不要 reset，已推送的提交用 revert 回滚。'
      ],
      bad: [
        { say: 'reset 回退一下', why: '没说模式，--hard 会丢掉工作区改动；共享分支上 reset 还会影响他人。' }
      ]
    },
    misconceptions: [
      'reset 能用在共享分支？会改写历史影响他人，已推送的用 revert。',
      '--hard 只是回退提交？它同时丢弃工作区未提交改动，是最危险的模式。'
    ],
    related: ['git-revert', 'commit', 'git-reflog']
  },

  {
    id: 'git-revert',
    en: 'Git Revert',
    zh: 'revert 回滚',
    aliases: ['revert', '回滚', '撤销提交', '反向提交'],
    cat: 'git',
    tags: ['命令', '撤销'],
    level: 'advanced',
    summary: 'revert 生成一个「反向提交」抵消旧提交：不改历史，共享分支回滚的安全方式。',
    plain: [
      'git revert 提交 会生成一个新提交，把那个提交的改动反向应用（删的加回、加的删掉），等于「用新提交抵消旧提交」。关键：它不改写历史，只追加，所以适合已经推送、多人共享的分支。',
      '对比 reset：reset 是「时间倒流」抹掉提交（本地/未共享可用）；revert 是「补一个反转操作」（共享分支必须用）。revert 多个提交要按时间倒序逐个 revert。',
      '跟 AI 说「线上有个坏提交已推送，用 revert 生成反向提交回滚，别 reset」，它就是正确的安全姿势；说「回滚一下」如果用了 reset 到共享分支，同事就遭殃。'
    ],
    analogy: 'revert 像撤回一条已群发的通知：不是回到「没发过」的状态（做不到，大家已经看到了），而是再发一条「上条作废」的更正通知（反向提交）——历史里两条都在，但最终效果抵消。',
    talk: {
      good: [
        '这个提交已经推到共享分支且有问题，用 git revert 生成反向提交。',
        'revert 多个提交时按时间从新到旧逐个执行。'
      ],
      bad: [
        { say: '把刚才的提交撤了', why: '没说是否已推送共享，AI 若用 reset 改写历史会让同事不同步。' }
      ]
    },
    misconceptions: [
      'revert 会删掉旧提交？不删，它是追加一个反向提交，历史完整保留。',
      'reset 和 revert 随便用哪个？共享分支必须 revert，本地未共享可用 reset。'
    ],
    related: ['git-reset', 'commit', 'git-remote']
  },

  {
    id: 'git-commit-message',
    en: 'Commit Message Convention',
    zh: '提交信息规范',
    aliases: ['提交信息', 'commit message', 'Conventional Commits', 'feat', 'fix'],
    cat: 'git',
    tags: ['规范', '协作'],
    level: 'common',
    summary: '提交信息按「类型+简述」写：feat 新功能、fix 修 bug，历史可扫、可自动生成 changelog。',
    plain: [
      '提交信息是给未来读历史的人（包括自己）看的。推荐 Conventional Commits 规范：格式「类型(范围): 简述」——feat 新功能、fix 修复、docs 文档、refactor 重构、chore 杂务，例如 fix(auth): 修复登录后 token 未刷新的问题。',
      '收益：git log 一眼扫出历史性质、能自动生成 changelog、能按类型筛选、配合工具做语义化版本（feat 升 minor、fix 升 patch）。要点：第一行简洁（≤50 字符）、说「为什么改」而不是「改了什么文件」。',
      '跟 AI 说「按 Conventional Commits 给我这次的提交信息：fix(login)，说明修复了什么问题」，它给的就是规范信息；说「帮我提交」它可能写个含糊的 update。'
    ],
    analogy: '提交信息像病历的「主诉」栏：规范的「主诉：右下腹疼痛 2 小时」一眼懂；不规范的「有点不舒服」让人一头雾水——半年后翻历史全靠它判断那次改动是干嘛的。',
    talk: {
      good: [
        '这次的提交信息用 Conventional Commits：feat(checkout) 新增微信支付入口。',
        '提交信息说明「为什么改」，不要只写「修改代码」。'
      ],
      bad: [
        { say: '提交信息随便写写就行', why: '含糊信息让半年后的 git log 无法排查，这是团队协作的隐性成本。' }
      ]
    },
    misconceptions: ['提交信息给机器看的？主要是给人看的，规范才能让人快速扫懂。', '类型随便标？类型错了 changelog 和版本号推断就错了。'],
    related: ['commit', 'git-log-history', 'semver']
  },

  {
    id: 'git-branch-protection',
    en: 'Branch Protection',
    zh: '分支保护',
    aliases: ['分支保护', '保护规则', 'PR 门槛', 'required review'],
    cat: 'git',
    tags: ['协作', '规范'],
    level: 'common',
    summary: '给 main 设保护规则：禁止直接推送、必须 PR + CI 通过 + 至少一人 review，守住院线。',
    plain: [
      '分支保护是仓库平台（GitHub/GitLab）的规则：对 main 等关键分支禁止直接 push，所有改动必须走 PR，并设置门槛——CI 测试通过、至少 N 人 review、无冲突。未满足门槛的合并被拒绝。',
      '这是「守住院线」的制度保障：保证进 main 的代码都经过验证和审查，防止有人绕过流程直接把坏代码推上去。还能要求「线性历史」（禁止 merge 提交）等额外约束。',
      '跟 AI 说「给 main 开保护：禁直接推送，PR 需 1 人 review + CI 通过」，它就是标准做法；说「放开 main 随便推」等于把质检流程全废了。'
    ],
    analogy: '分支保护像机场的登机口安检：不是买了票（有权限）就能直接上飞机（推 main），还得过安检（CI）和检票（review）——保护规则就是「必须走完这套流程」的硬规定，任何人都不能免检。',
    talk: {
      good: [
        '给 main 配置分支保护：禁止直接 push，PR 需至少 1 人 approve 且 CI 全绿。',
        'hotfix 也走 PR，不要绕过保护规则直接推。'
      ],
      bad: [
        { say: '让我直接推到 main 吧', why: '绕过保护规则等于绕过 review 和 CI，坏代码进主线的风险全留给自己。' }
      ]
    },
    misconceptions: [
      '保护规则只防别人？它也约束自己，是好习惯的强制化。',
      'CI 过了就不用 review？CI 查技术，review 查设计，两道都要。'
    ],
    related: ['pull-request', 'git-workflow', 'ci-cd']
  },

  {
    id: 'git-commit-amend',
    en: 'Git Commit --amend',
    zh: '修改上次提交',
    aliases: ['amend', '补充提交', '修改提交信息'],
    cat: 'git',
    tags: ['命令', '提交'],
    level: 'common',
    summary: '--amend 把改动并进上一次提交：补漏文件、改提交信息，但别改已推送的提交。',
    plain: [
      'git commit --amend 不新建提交，而是把当前改动并入「上一次提交」并（可选）改提交信息。典型场景：提交完发现忘加一个文件、提交信息写错了、想把两个小改动合成一个。',
      '注意：amend 改写最近一次提交的哈希（因为内容变了），所以如果上一次提交已经 push 到共享分支，amend 后要 force push 且影响他人——已推送的提交别 amend，直接新提交或 revert。',
      '跟 AI 说「漏了个文件，用 git commit --amend 并进上次提交」「改一下上次的提交信息用 amend」，它就知道处理；说「改提交」如果已推送，它会提示别 amend。'
    ],
    analogy: 'amend 像写完信还没寄出去前把漏写的话补上并重抄一遍：收件人（远程）没收到就不影响；但信已经寄出（已推送）就别改了，否则寄出的和补抄的对不上。',
    talk: {
      good: [
        '上次提交漏了配置文件，用 git commit --amend --no-edit 补进同一提交。',
        '提交信息写错了，用 git commit --amend 修改信息。'
      ],
      bad: [
        { say: '把上次提交改一下', why: '没确认是否已推送；已推送的提交 amend 后需要 force push，影响共享。' }
      ]
    },
    misconceptions: [
      'amend 只是改信息？也会把新改动并进去，改变提交哈希。',
      '已推送的提交随便 amend？会改变哈希，他人拉取会分叉，需谨慎。'
    ],
    related: ['commit', 'git-reset', 'git-push-force']
  },

  {
    id: 'git-cherry-pick',
    en: 'Git Cherry-Pick',
    zh: '拣选提交',
    aliases: ['cherry-pick', '拣选', '移植提交'],
    cat: 'git',
    tags: ['命令', '提交'],
    level: 'advanced',
    summary: '把别处某个提交的改动「搬」到当前分支：hotfix 要同步到多个分支时特别好用。',
    plain: [
      'git cherry-pick <提交号> 把某个提交的改动复制应用到当前分支（会生成一个新提交）。典型场景：fix 提交在 main 上，要同步到 release 分支；或 A 分支上的一个功能想单独搬到 B 分支。',
      '注意：cherry-pick 是「复制改动」，两个分支会各有一个内容相似但哈希不同的提交，后续 merge 时可能冲突或重复应用，要留意。它适合「少量精确移植」，批量同步还是用 merge/rebase 更自然。',
      '跟 AI 说「把这个修复提交 cherry-pick 到 release 分支」，它精确操作；说「把那个功能的代码搬过来」如果改动散在多提交，应该用 merge 而不是 cherry-pick。'
    ],
    analogy: 'cherry-pick 像从别人的文件夹里挑一张照片复印到你的相册：只搬这一张（单个提交），来源还在；但复印的和你自己的原件不是同一张（哈希不同），以后对账（merge）时要留意。',
    talk: {
      good: [
        '把 commit abc123 的修复 cherry-pick 到 release 分支。',
        '这段功能涉及多个提交，不适合 cherry-pick，建议用 merge 分支。'
      ],
      bad: [
        { say: '把那个分支的代码搬过来', why: '没说单个提交还是整段功能，整段功能用 cherry-pick 会漏或重复。' }
      ]
    },
    misconceptions: [
      'cherry-pick 会移动提交？它是复制应用，原提交还在原分支。',
      'cherry-pick 越多越好？散落应用会制造重复提交和冲突，批量同步用 merge。'
    ],
    related: ['commit', 'merge', 'branch']
  },

  {
    id: 'git-reflog',
    en: 'Git Reflog',
    zh: '操作日志 reflog',
    aliases: ['reflog', '操作日志', '找回提交', '撤销救回'],
    cat: 'git',
    tags: ['命令', '撤销'],
    level: 'advanced',
    summary: 'reflog 记录你所有 HEAD 移动的足迹：误删分支、reset --hard 丢提交，都能从这里找回。',
    plain: [
      'git reflog 记录本地仓库「HEAD 到过哪里」的完整日志（包括分支、reset、checkout、合并的每次移动）。它像黑匣子：即使你 reset --hard、误删分支，只要提交还在本地对象库，reflog 里就能找到那个提交号，用 git reset/checkout 找回来。',
      '价值：它是撤销的「后悔药」。比如 reset --hard 弄丢了提交，git reflog 找到旧提交号，git reset --hard 那个号 就回来了。注意 reflog 有保存期限（默认 90 天），且只记本地，不记远程操作。',
      '跟 AI 说「我 reset --hard 丢了提交，帮我用 reflog 找回」，它就能指导你操作；说「代码丢了」如果不知道 reflog，可能只能凭记忆重写。'
    ],
    analogy: 'reflog 像汽车的行驶记录仪：记录了你去过每个地方（每次 HEAD 移动）——哪怕你迷路又绕回原路（reset 回退），记录仪还在，按记录就能重新导航到你想去的地方（找回提交）。',
    talk: {
      good: [
        '用 git reflog 找到误删提交的哈希，再 git reset --hard 恢复。',
        '误操作后先看 reflog 确认状态，不要慌着重写代码。'
      ],
      bad: [
        { say: 'reset 后代码没了', why: '其实 reflog 能找回；不点破这个机制，你只能痛苦重写。' }
      ]
    },
    misconceptions: [
      'reflog 记录远程操作？只记本地 HEAD 移动，远程删了它管不到。',
      'reflog 永久保存？默认约 90 天，且每次操作追加，久了会被清理。'
    ],
    related: ['git-reset', 'git-revert', 'commit']
  },

  {
    id: 'git-bisect',
    en: 'Git Bisect',
    zh: '二分定位 bug',
    aliases: ['bisect', '二分查找', '定位引入提交', '回归定位'],
    cat: 'git',
    tags: ['命令', '调试'],
    level: 'advanced',
    summary: '告诉 Git「这个提交好、那个提交坏」，它自动二分定位到第一个出问题的提交。',
    plain: [
      'bug 是某次提交引入的，但不知道是哪次。git bisect 用二分法：你标记一个「好的」提交（没 bug）和一个「坏的」提交（有 bug），Git 每次切到一个中间提交让你测试并标记好/坏，最多 log2(提交数) 次就能定位到「第一个引入 bug 的提交」。',
      '配合 git bisect run 自动化：提供一个能判断好坏的测试命令，Git 全自动跑完二分，直接把罪魁提交找出来。它是最强的问题定位工具之一，尤其适合「某功能忽然坏了但不知道谁改的」。',
      '跟 AI 说「用 git bisect 二分定位引入这个回归的提交，我提供坏提交和好提交的标记」，它给的就是标准流程；说「帮我找谁改坏的」没上 bisect 可能要人肉翻几百个提交。'
    ],
    analogy: 'bisect 像用「排除法猜数字」：从 1-100 里猜，每次问「比 50 大还是小」砍半——而不是从 1 挨个试到 100。测试几十次就能定位到那个「从好变坏」的分界线提交。',
    talk: {
      good: [
        '用 git bisect：标记 HEAD 为 bad、v1.0 为 good，逐步二分定位首个坏提交。',
        '写个自动化判断脚本，配合 git bisect run 全自动定位。'
      ],
      bad: [
        { say: '不知道哪次提交把功能改坏了', why: '这就是 bisect 的用武之地；手翻历史找会非常低效。' }
      ]
    },
    misconceptions: [
      'bisect 只能人工测试？bisect run 配脚本可全自动。',
      '坏提交只有一个？bisect 找到的是「第一个变坏的」，之后的坏提交可能叠加。'
    ],
    related: ['git-log-history', 'git-diff', 'commit']
  },

  {
    id: 'git-ssh-https',
    en: 'Git Remote Auth (SSH vs HTTPS)',
    zh: '远程认证方式',
    aliases: ['SSH key', 'HTTPS', 'personal access token', '认证'],
    cat: 'git',
    tags: ['远程', '安全'],
    level: 'common',
    summary: '连远程两种认证：SSH 用密钥（一次配好长期用），HTTPS 用 token（密码已停用）。',
    plain: [
      'git push/pull 远程需要认证，两种主流：SSH——本地生成密钥对，公钥加到平台账号，之后免密长期用（推荐）；HTTPS——用用户名 + Personal Access Token（平台已停用密码，用 token 代替）或凭据管理器记住。',
      '选型：SSH 一次性配置最省心，适合长期开发；HTTPS + token 适合偶尔用、跨机器。常见坑：换机器没配密钥 push 失败、权限错误（Permission denied）多半是公钥没加或配置错。',
      '跟 AI 说「push 报 Permission denied，请检查 SSH 密钥是否已添加到平台、用的地址是不是 git@」，它就能定位认证问题；说「push 失败」不提示认证，它可能查错方向。'
    ],
    analogy: '远程认证像大楼门禁：SSH 是「办一张长期门禁卡」（密钥），一次办好以后刷卡就进；HTTPS 是「每次访客登记换临时通行证」（token）——长期住户当然办卡（SSH）省心。',
    talk: {
      good: [
        'push 权限被拒，请检查 SSH 公钥是否已添加、远程地址是否为 git@ 格式。',
        'HTTPS 方式用 Personal Access Token 而不是密码。'
      ],
      bad: [
        { say: 'push 不了，怎么回事', why: '没说报错类型，认证错误和网络错误处理方式完全不同。' }
      ]
    },
    misconceptions: [
      'HTTPS 用密码就行？平台已禁用密码，必须用 token。',
      'SSH 配置一次永远有效？密钥丢失或平台更换要重新配置，仍可能踩坑。'
    ],
    related: ['git-remote', 'repository', 'vpn']
  },

  {
    id: 'git-hooks',
    en: 'Git Hooks',
    zh: 'Git 钩子',
    aliases: ['hooks', 'pre-commit', '钩子', 'husky'],
    cat: 'git',
    tags: ['工程', '自动化'],
    level: 'advanced',
    summary: '在提交/推送等动作前自动跑脚本：pre-commit 跑 lint 和测试，坏代码根本提交不进去。',
    plain: [
      'Git 钩子（hooks）是 Git 在特定动作（提交前、提交后、推送前）自动执行的脚本。最常用 pre-commit：提交前自动跑 lint、格式化、单测，不过就拦截提交。团队常用 husky（前端）把钩子配置化，让每个成员都生效。',
      '价值是把「质量门槛」前置到开发者的动作上：不用等 CI 才发现问题，提交时就拦住。注意：钩子存于仓库 .git/hooks 默认不随仓库分发，要用 husky/hook 工具或脚本在 clone 后安装，才能让团队统一。',
      '跟 AI 说「配 husky pre-commit 跑 lint-staged，只检查改动的文件」，它给的就是团队级方案；说「加个提交前检查」如果只改 .git/hooks，同事 clone 后并不生效。'
    ],
    analogy: 'Git 钩子像超市门口的自动安检门：交钱（提交）前先过一遍安检（lint/测试），带了违规品（坏代码）就被拦住——比买回家（推到远程）才发现强多了。',
    talk: {
      good: [
        '配置 husky pre-commit 钩子，跑 lint-staged 只检查暂存的改动文件。',
        '钩子要能随仓库分发（用 husky 或脚本），否则团队不生效。'
      ],
      bad: [
        { say: '在 .git/hooks 里加个检查脚本', why: '.git 目录不随仓库提交，同事 clone 后钩子不生效，等于白配。' }
      ]
    },
    misconceptions: [
      '钩子会随仓库同步？.git/hooks 不随仓库走，要配置工具分发。',
      '钩子能防所有问题？能拦本地质量问题，但 CI 仍需把关，两者互补。'
    ],
    related: ['commit', 'ci-cd', 'linter']
  },

  {
    id: 'git-lfs',
    en: 'Git LFS',
    zh: '大文件存储',
    aliases: ['LFS', '大文件', '二进制', 'git lfs'],
    cat: 'git',
    tags: ['仓库', '文件'],
    level: 'advanced',
    summary: 'Git 存文本很高效、存二进制会撑爆仓库：LFS 把大文件换成指针，真身放远端存储。',
    plain: [
      'Git 对文本和代码很高效，但二进制大文件（图片、视频、模型、安装包）每次改动都会在历史里存一份完整副本，仓库迅速膨胀，clone 变慢、存储超限。Git LFS 解决：仓库里只存一个「指针」（小文本指向大文件），真身放在专门的 LFS 存储。',
      '场景：设计稿、游戏资源、数据集、构建产物。用 git lfs track \'*.psd\' 声明哪些类型走 LFS，这些文件 push 时自动上传 LFS 存储。注意：LFS 有额度限制（平台通常限总量），也要和「不该进仓库的构建产物」区分开。',
      '跟 AI 说「设计稿这类大文件用 git lfs track 管理，别直接提交」，它就知道怎么配；说「把视频加进仓库」直接提交会撑爆仓库历史。'
    ],
    analogy: 'Git LFS 像档案室的「外部仓库」制度：档案室只放一张卡片写着「原件在 3 号库」（指针），真身（大文件）放在远处的大仓库——档案室轻便，要找原件再去取。',
    talk: {
      good: [
        '用 git lfs track 声明 .psd 和 .zip 走 LFS，避免仓库膨胀。',
        '构建产物和临时大文件不要提交仓库，用 LFS 或外部存储。'
      ],
      bad: [
        { say: '把视频文件提交到仓库', why: '直接提交会让仓库历史和克隆体积爆炸，应走 LFS 或对象存储。' }
      ]
    },
    misconceptions: [
      'LFS 就是压缩？是外置存储+指针，不是压缩，clone 时按需拉取。',
      '大文件放 LFS 后不限量？平台有配额，仍需控制总量。'
    ],
    related: ['repository', 'commit', 'gitignore']
  },

  {
    id: 'git-merge-strategy',
    en: 'Merge Strategies',
    zh: '合并策略',
    aliases: ['merge commit', 'squash', 'rebase', '合并方式'],
    cat: 'git',
    tags: ['合并', '历史'],
    level: 'advanced',
    summary: '合分支三选一：merge 留合并点、squash 压成一个提交、rebase 线性化——看团队要什么历史。',
    plain: [
      '把功能分支合回 main 有三种策略，产物历史完全不同：普通 merge 保留一个「合并提交」和两条分叉（历史真实但图复杂）；squash and merge 把分支所有提交压成一个新提交（历史干净但丢中间过程）；rebase and merge 先变基再合并（线性历史、干净且保留每个提交）。',
      '选型：追求「可追溯的完整历史」用 merge；追求「主分支一眼清爽」用 squash；追求「线性且保留细节」用 rebase。GitHub 的 PR 合并按钮可分别配置这三种。',
      '跟 AI 说「PR 合并用 squash，保持 main 历史一条线」，它就知道约定；说「合并一下」如果团队要求线性历史而你点了 merge，历史就花了。'
    ],
    analogy: '合并策略像开会记录方式：merge 是「连讨论过程都留档」（完整但长）；squash 是「只记最终决议」（干净但细节没了）；rebase 是「把讨论按时间排好再记」（线性又完整）——看你要留多少过程。',
    talk: {
      good: [
        'PR 合并采用 squash，让 main 保持线性简洁历史。',
        '这个分支包含多个有意义的提交，用 rebase 合并保留细节。'
      ],
      bad: [
        { say: '合并分支吧', why: '没说策略，团队历史风格可能被破坏（merge 提交一堆或 squash 丢细节）。' }
      ]
    },
    misconceptions: [
      'squash 会保留每个提交？会把整个分支压成一个，中间提交信息丢失。',
      'rebase 和 merge 产物一样？rebase 生成线性历史无合并点，merge 保留分叉图。'
    ],
    related: ['merge', 'rebase', 'git-workflow']
  },

  {
    id: 'git-detached-head',
    en: 'Detached HEAD',
    zh: '分离 HEAD',
    aliases: ['detached HEAD', '游离头', '匿名分支', 'detached'],
    cat: 'git',
    tags: ['命令', '状态'],
    level: 'advanced',
    summary: 'HEAD 没指着任何分支、只指某个提交就是「分离头」：此时提交会成孤儿，记得先建分支。',
    plain: [
      '正常时 HEAD 指向当前分支（HEAD → main → 某提交）。当你 git checkout 一个提交号而不是分支名时，HEAD 直接指向那个提交，进入「分离 HEAD」状态（detached）。此时能查看代码，但如果在此提交，改动会挂在「无分支」上，切走就可能丢失。',
      '应对：分离头下想保留改动，先 git switch -c 新分支（把 HEAD 的改动挂到新分支），再继续。常见进入途径：checkout 旧提交号、checkout tag、bisect 过程。看到分离头先别慌，先建分支再操作。',
      '跟 AI 说「我在分离 HEAD 状态做了改动，请先建个分支保住再继续」，它就帮你脱离险境；说「改完代码切分支结果丢了」——典型分离头事故，用 reflog 找回。'
    ],
    analogy: '分离 HEAD 像你离开固定工位（分支）临时坐在一个没名牌的座位（直接坐提交上）工作：干完活如果直接走人（切走），手头的东西没地方归档（提交成孤儿）——先给自己挂个名牌（建分支）再干活就安全。',
    talk: {
      good: [
        '我在 detached HEAD 状态，先 git switch -c fix-temp 建分支保住改动。',
        '查看历史提交用 checkout 提交号，看完记得切回原分支，别在分离头下提交。'
      ],
      bad: [
        { say: '在分离头下提交了，切走不见了', why: '提交成了孤儿；不点破 reflog 和建分支，只能干瞪眼。' }
      ]
    },
    misconceptions: [
      '分离头状态很危险？只要先建分支就不危险，它是查看历史提交的正常方式。',
      '分离头下提交会丢？不立即丢（reflog 还能找），但切走就没分支引用，难找回。'
    ],
    related: ['branch', 'git-reflog', 'commit']
  },

  {
    id: 'git-submodule',
    en: 'Git Submodules',
    zh: '子模块',
    aliases: ['submodule', '子模块', '嵌套仓库', '依赖仓库'],
    cat: 'git',
    tags: ['仓库', '依赖'],
    level: 'advanced',
    summary: '在一个仓库里引用另一个仓库的特定版本：适合共享组件，但 clone 和更新要额外命令。',
    plain: [
      '子模块（submodule）允许一个仓库把另一个仓库作为「目录」引用，并锁定在某个提交。适合：共享库、主题、需要独立版本管理的组件。主仓库只记录「引用了哪个仓库的哪个提交」。',
      '代价是使用变复杂：clone 主仓库后要 git submodule update --init 才会拉子模块；子模块的更新要单独 pull 再提交主仓库的引用变化；操作不当（只更新了子模块没更新引用）会导致别人拿到的引用对不上。',
      '跟 AI 说「这个共享组件用 submodule 引用并锁定版本，clone 后记得 submodule update --init」，它就知道流程；说「引个公共库」如果不需要独立版本管理，npm/pip 包更合适。'
    ],
    analogy: '子模块像书架上「引用的一本共享参考书」：主书架只记着「第 3 版参考书在 2 号书架」（引用+版本），不自己复印内容——但搬家（clone）后得专门去 2 号书架取那本书（update --init），不是搬家就自动带过来的。',
    talk: {
      good: [
        '这个组件用 submodule 管理并锁定提交，clone 后执行 submodule update --init --recursive。',
        '更新子模块后，记得在主仓库提交引用变化，否则别人引用对不上。'
      ],
      bad: [
        { say: 'clone 下来怎么少了个目录', why: '子模块默认不自动拉取；不点破 update --init，你会以为代码丢了。' }
      ]
    },
    misconceptions: [
      'clone 会自动带子模块？不会，要 submodule update --init。',
      '子模块适合所有共享代码？不需要独立版本管理的，用包管理（npm/pip）更省心。'
    ],
    related: ['repository', 'clone-fork', 'dependency-management']
  }
  );
})(window);
