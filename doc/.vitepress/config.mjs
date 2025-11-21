import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

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
  ,
  vite: {
    plugins: [
      {
        name: 'members-api',
        configureServer(server) {
          const __dirname = path.dirname(fileURLToPath(import.meta.url))
          const dataDir = path.resolve(__dirname, 'data')
          const filePath = path.resolve(dataDir, 'members.json')

          if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
          if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]', 'utf-8')

          server.middlewares.use((req, res, next) => {
            if (!req.url?.startsWith('/api/members')) return next()

            res.setHeader('Content-Type', 'application/json; charset=utf-8')

            if (req.method === 'GET') {
              try {
                const content = fs.readFileSync(filePath, 'utf-8')
                res.end(content)
              } catch (e) {
                res.statusCode = 500
                res.end(JSON.stringify({ code: 500, message: 'read_error', data: null }))
              }
              return
            }

            if (req.method === 'POST') {
              let body = ''
              req.on('data', (chunk) => { body += chunk })
              req.on('end', () => {
                try {
                  const data = JSON.parse(body || '[]')
                  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
                  res.end(JSON.stringify({ code: 200, message: 'success', data: { count: Array.isArray(data) ? data.length : 0 } }))
                } catch (e) {
                  res.statusCode = 400
                  res.end(JSON.stringify({ code: 400, message: 'invalid_json', data: null }))
                }
              })
              return
            }

            res.statusCode = 405
            res.end(JSON.stringify({ code: 405, message: 'method_not_allowed', data: null }))
          })
        }
      }
    ]
  }
})
