/* ============================================================
   categories.js · 全站十大分类元数据
   color 仅作点缀色使用（侧栏圆点 / 卡片顶边）
   ============================================================ */
(function (W) {
  W.STD_CATEGORIES = [
    {
      id: 'basics',
      name: '编程基础',
      en: 'Programming Basics',
      icon: 'basics',
      color: 'var(--cat-basics)',
      desc: '变量、函数、作用域……一切代码世界的地基词汇，说不清它们就说不清需求。'
    },
    {
      id: 'dsa',
      name: '数据结构与算法',
      en: 'Data Structures & Algorithms',
      icon: 'dsa',
      color: 'var(--cat-dsa)',
      desc: '数组、哈希表、大 O——用来描述“程序跑多快、占多少内存”的标准语言。'
    },
    {
      id: 'frontend',
      name: '前端',
      en: 'Frontend',
      icon: 'frontend',
      color: 'var(--cat-frontend)',
      desc: '浏览器里发生的一切：页面结构、状态、渲染、路由与工程化。'
    },
    {
      id: 'backend',
      name: '后端',
      en: 'Backend',
      icon: 'backend',
      color: 'var(--cat-backend)',
      desc: '服务器端的接口设计、服务拆分与数据流转用语。'
    },
    {
      id: 'database',
      name: '数据库',
      en: 'Database',
      icon: 'database',
      color: 'var(--cat-database)',
      desc: '数据的存取之道：表、事务、索引、迁移与性能问题。'
    },
    {
      id: 'network',
      name: '网络协议',
      en: 'Network & Protocols',
      icon: 'network',
      color: 'var(--cat-network)',
      desc: '从敲下网址到页面出现，中间每一跳的标准说法。'
    },
    {
      id: 'git',
      name: 'Git 协作',
      en: 'Git & Collaboration',
      icon: 'git',
      color: 'var(--cat-git)',
      desc: '版本管理黑话：仓库、分支、合并、变基与 PR。'
    },
    {
      id: 'engineering',
      name: '工程实践',
      en: 'Engineering Practices',
      icon: 'engineering',
      color: 'var(--cat-engineering)',
      desc: '测试、CI/CD、重构、监控——让代码可持续的专业词汇。'
    },
    {
      id: 'architecture',
      name: '架构设计',
      en: 'Architecture & Design',
      icon: 'architecture',
      color: 'var(--cat-architecture)',
      desc: '设计模式与架构原则：把系统组织得优雅又抗造的说法。'
    },
    {
      id: 'ai',
      name: 'AI 与大模型',
      en: 'AI & LLM',
      icon: 'ai',
      color: 'var(--cat-ai)',
      desc: '与大模型协作必备名词：Token、上下文、RAG、Agent、MCP。'
    }
  ];
})(window);
