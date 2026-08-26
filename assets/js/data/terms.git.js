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
  }

  );
})(window);
