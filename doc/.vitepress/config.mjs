import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dir = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dir, '../public')
const teamDir = path.resolve(__dir, '../团队风采')
const ogDir = path.resolve(publicDir, 'og')

const listFiles = (dir) => {
  if (!fs.existsSync(dir)) return []
  const out = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const p = path.resolve(dir, e.name)
    if (e.isDirectory()) out.push(...listFiles(p))
    else out.push(p)
  }
  return out
}

const ensureOgAssets = () => {
  if (!fs.existsSync(teamDir)) return
  if (!fs.existsSync(ogDir)) fs.mkdirSync(ogDir, { recursive: true })
  const imgs = listFiles(teamDir).filter(p => /\.(png|jpe?g|webp|gif)$/i.test(p))
  for (const src of imgs) {
    const name = path.basename(src)
    const dest = path.resolve(ogDir, name)
    if (!fs.existsSync(dest)) {
      try { fs.copyFileSync(src, dest) } catch {}
    }
  }
}

const generateSitemap = (images) => {
  try {
    const site = 'https://tongzhilian.cn'
    const routes = ['/', '/team', '/api-examples', '/projects', '/moments', '/join-us']
    const header = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">'
    const footer = '</urlset>'
    const body = routes.map(r => {
      const imgs = (images || []).slice(0, 10).map(img => `\n  <image:image>\n    <image:loc>${site}${img}</image:loc>\n  </image:image>`).join('')
      return `\n<url>\n  <loc>${site}${r}</loc>${imgs}\n</url>`
    }).join('')
    const xml = `${header}${body}\n${footer}`
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true })
    fs.writeFileSync(path.resolve(publicDir, 'sitemap.xml'), xml, 'utf-8')
    const robots = `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`
    fs.writeFileSync(path.resolve(publicDir, 'robots.txt'), robots, 'utf-8')
  } catch {}
}

let ogImages = []
try {
  ensureOgAssets()
  const candidates = [...listFiles(publicDir), ...listFiles(ogDir)]
  ogImages = candidates
    .filter(f => /\.(png|jpe?g|webp|gif)$/i.test(f))
    .map(f => '/' + path.relative(publicDir, f).replace(/\\/g, '/'))
    .concat(['/logo.png'])
} catch {}
const pickOgImage = () => {
  if (!ogImages.length) return '/logo.png'
  const i = Math.floor(Math.random() * ogImages.length)
  return ogImages[i]
}

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
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap', rel: 'stylesheet' }],
    ['script', { type: 'application/ld+json' }, `{"@context":"https://schema.org","@type":"Organization","name":"NexCore","url":"https://tongzhilian.cn","logo":"https://tongzhilian.cn/logo.png","email":"shibaizhelianmeng@163.com","address":{"addressLocality":"重庆","addressCountry":"CN"}}`]
  ],
  transformHead: ({ page }) => {
    const path = page && page.relativePath
      ? '/' + page.relativePath.replace(/\\/g, '/').replace(/index\.md$/, '').replace(/\.md$/, '')
      : '/';
    const url = 'https://tongzhilian.cn' + path;
    const title = page?.title || 'NexCore'
    const desc = page?.description || 'NexCore | 重庆 · 专注 AI 落地与全栈工程化：模型微调、RAG 知识库、MLOps；基于 Vue3 + Flask/FastAPI 与 MongoDB，遵循 RESTful API 契约与 CI/CD；团队精神：务实创新、协作共赢、快速交付、卓越质量'
    const img = pickOgImage()
    const imgAbs = 'https://tongzhilian.cn' + img
    return [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: desc }],
      ['meta', { property: 'og:image', content: imgAbs }],
      ['meta', { property: 'og:site_name', content: 'NexCore' }],
      ['meta', { property: 'og:locale', content: 'zh_CN' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: desc }],
      ['meta', { name: 'twitter:image', content: imgAbs }]
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

    sidebar: {
      '/': [
        {
          text: '团队',
          collapsed: false,
          items: [
            { text: '团队成员', link: '/team' },
            { text: '技术方向', link: '/api-examples' },
            { text: '项目案例', link: '/projects' },
            { text: '团队风采', link: '/moments' },
            { text: '加入我们', link: '/join-us' }
          ]
        }
      ],
      '/team': [
        {
          text: '团队',
          collapsed: false,
          items: [
            { text: '团队成员', link: '/team' },
            { text: '技术方向', link: '/api-examples' },
            { text: '项目案例', link: '/projects' },
            { text: '团队风采', link: '/moments' },
            { text: '加入我们', link: '/join-us' }
          ]
        }
      ],
      '/api-examples': [
        {
          text: '团队',
          collapsed: false,
          items: [
            { text: '团队成员', link: '/team' },
            { text: '技术方向', link: '/api-examples' },
            { text: '项目案例', link: '/projects' },
            { text: '团队风采', link: '/moments' },
            { text: '加入我们', link: '/join-us' }
          ]
        }
      ],
      '/projects': [
        {
          text: '团队',
          collapsed: false,
          items: [
            { text: '团队成员', link: '/team' },
            { text: '技术方向', link: '/api-examples' },
            { text: '项目案例', link: '/projects' },
            { text: '团队风采', link: '/moments' },
            { text: '加入我们', link: '/join-us' }
          ]
        }
      ],
      '/moments': [
        {
          text: '团队',
          collapsed: false,
          items: [
            { text: '团队成员', link: '/team' },
            { text: '技术方向', link: '/api-examples' },
            { text: '项目案例', link: '/projects' },
            { text: '团队风采', link: '/moments' },
            { text: '加入我们', link: '/join-us' }
          ]
        }
      ],
      '/join-us': [
        {
          text: '团队',
          collapsed: false,
          items: [
            { text: '团队成员', link: '/team' },
            { text: '技术方向', link: '/api-examples' },
            { text: '项目案例', link: '/projects' },
            { text: '团队风采', link: '/moments' },
            { text: '加入我们', link: '/join-us' }
          ]
        }
      ]
    },

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
      ,
      {
        name: 'og-assets',
        configureServer() { try { ensureOgAssets(); generateSitemap(ogImages) } catch {} },
        buildStart() { try { ensureOgAssets(); generateSitemap(ogImages) } catch {} }
      }
    ]
  }
})
