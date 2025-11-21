import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'NexCore',
  description: '重庆个人团队，专注 AI 落地、前后端与算法模型工程化',
  lastUpdated: false,
  cleanUrls: true,
  head: [
    ['meta', { name: 'keywords', content: 'NexCore, AI 落地, 算法模型, 重庆, 前后端, Vue3, Flask, MongoDB' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { property: 'og:title', content: 'NexCore — AI 落地与工程实践' }],
    ['meta', { property: 'og:description', content: 'NexCore 团队，重庆，专注 AI 落地、前后端与算法模型工程化' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'icon', href: '/wx.jpg' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap', rel: 'stylesheet' }],
    ['script', { type: 'application/ld+json' }, `{"@context":"https://schema.org","@type":"Organization","name":"NexCore","url":"https://nexcore.example.com","email":"shibaizhelianmeng@163.com","address":{"addressLocality":"重庆","addressCountry":"CN"}}`]
  ],
  transformHead: ({ page }) => {
    const path = page && page.relativePath
      ? '/' + page.relativePath.replace(/\\/g, '/').replace(/index\.md$/, '').replace(/\.md$/, '')
      : '/';
    const url = 'https://nexcore.example.com' + path;
    return [
      ['link', { rel: 'canonical', href: url }]
    ]
  },
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '团队成员', link: '/team' },
      { text: '技术方向', link: '/api-examples' },
      { text: '项目案例', link: '/projects' },
      { text: '团队风采', link: '/moments' },
      { text: '加入我们', link: '/join-us' }
    ],

    sidebar: [
      {
        text: '团队',
        collapsed: false, // 默认展开
        items: [
          { text: '团队成员', link: '/team' },
          { text: '技术方向', link: '/api-examples' },
          { text: '项目案例', link: '/projects' },
          { text: '团队风采', link: '/moments' },
          { text: '加入我们', link: '/join-us' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Lappercn/' }
    ]
  }
})
