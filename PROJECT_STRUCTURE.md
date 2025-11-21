# 📁 NexCore 团队网站项目结构说明

> 本文档详细介绍了 NexCore 团队网站的项目结构、各文件和文件夹的作用。

---

## 📂 项目根目录

```
团队介绍/
├── doc/                    # VitePress 文档源文件目录
├── node_modules/           # npm 依赖包（自动生成）
├── compress-images.js      # 图片压缩工具脚本
├── package.json            # 项目依赖配置文件
├── package-lock.json       # 依赖版本锁定文件
└── PROJECT_STRUCTURE.md    # 本文档
```

### 🔧 根目录文件说明

#### `compress-images.js`
**作用**: 图片压缩工具脚本  
**功能**:
- 自动扫描 `doc/团队风采/` 目录下的所有图片
- 压缩图片至目标大小（默认 500KB）
- 调整图片尺寸（最大 1920x1920）
- 将 PNG 转换为 JPEG 以获得更好的压缩率
- 显示压缩前后的大小对比

**使用方法**:
```bash
node compress-images.js
```

**配置项**:
- `quality`: JPEG 质量 (0-100)，默认 80
- `maxWidth`: 最大宽度，默认 1920px
- `maxHeight`: 最大高度，默认 1920px
- `targetSizeKB`: 目标文件大小，默认 500KB

#### `package.json`
**作用**: 项目配置文件  
**内容**:
- 项目依赖（VitePress、Sharp 等）
- 脚本命令（dev、build、preview）
- 项目元信息

#### `package-lock.json`
**作用**: 依赖版本锁定文件  
**说明**: 自动生成，确保团队成员使用相同版本的依赖包

---

## 📂 doc/ 目录

VitePress 文档的主目录，包含所有页面内容和配置。

```
doc/
├── .vitepress/             # VitePress 配置目录
├── moments/                # 团队瞬间文章目录
├── public/                 # 静态资源目录
├── 团队风采/               # 团队成员照片目录
├── index.md                # 首页
├── team.md                 # 团队成员页面
├── api-examples.md         # 技术方向页面
├── projects.md             # 项目案例页面
├── moments.md              # 团队风采页面
├── join-us.md              # 加入我们页面
└── markdown-examples.md    # Markdown 示例（可删除）
```

### 📄 页面文件说明

#### `index.md` - 首页
**内容**:
- Hero 区域（品牌名称、标语、行动按钮）
- 特性展示（极速全栈开发、AI 深度赋能、严谨工程实践）
- 团队风采预览（显示前 4 个团队瞬间）
- 加入我们 CTA 区域

**特殊配置**:
```yaml
layout: home  # 使用 VitePress 的 home 布局
```

#### `team.md` - 团队成员页面
**内容**:
- 团队成员卡片展示
- 成员信息：头像、姓名、职位、简介、技能标签

**数据结构**:
```javascript
{
  name: "成员姓名",
  role: "职位",
  avatar: "emoji 头像",
  desc: "个人简介",
  tags: ["技能1", "技能2", ...]
}
```

#### `api-examples.md` - 技术方向页面
**内容**:
- 团队的技术栈介绍
- 前端、后端、AI、DevOps 等技术方向
- 代码示例和技术说明

#### `projects.md` - 项目案例页面
**内容**:
- 团队完成的项目展示
- 项目描述、技术栈、成果

#### `moments.md` - 团队风采页面
**内容**:
- 使用 `<TeamGallery />` 组件
- 展示所有团队瞬间（不限制数量）

#### `join-us.md` - 加入我们页面
**内容**:
- 招聘信息
- 职位要求
- 联系方式

---

## 📂 .vitepress/ 目录

VitePress 的配置和主题定制目录。

```
.vitepress/
├── cache/                  # 构建缓存（自动生成）
├── dist/                   # 构建输出目录（自动生成）
├── public/                 # 公共静态资源
├── theme/                  # 主题定制目录
└── config.mjs              # VitePress 配置文件
```

### 🔧 配置文件

#### `config.mjs` - VitePress 主配置文件
**作用**: 网站的核心配置  
**配置项**:

1. **基础信息**:
   - `title`: 网站标题 "NexCore"
   - `description`: 网站描述
   - `cleanUrls`: 启用干净的 URL（无 .html 后缀）

2. **SEO 配置**:
   - Meta 标签（keywords, description, og:title 等）
   - Canonical URL
   - Schema.org 结构化数据

3. **导航配置**:
   ```javascript
   nav: [
     { text: '首页', link: '/' },
     { text: '团队成员', link: '/team' },
     { text: '技术方向', link: '/api-examples' },
     { text: '项目案例', link: '/projects' },
     { text: '团队风采', link: '/moments' },
     { text: '加入我们', link: '/join-us' }
   ]
   ```

4. **侧边栏配置**:
   - 移动端折叠菜单
   - `collapsed: false` 确保默认展开

5. **外部资源**:
   - Google Fonts (Outfit 字体)
   - 网站图标

---

## 📂 theme/ 目录

主题定制文件，包含自定义组件和样式。

```
theme/
├── components/             # 自定义 Vue 组件
│   └── TeamGallery.vue     # 团队风采画廊组件
├── index.js                # 主题入口文件
└── style.css               # 全局样式文件
```

### 🎨 主题文件说明

#### `index.js` - 主题入口
**作用**: 注册自定义组件和配置主题  
**功能**:
- 导入默认主题
- 注册全局组件（TeamGallery）
- 引入自定义样式

**代码结构**:
```javascript
import DefaultTheme from 'vitepress/theme'
import TeamGallery from './components/TeamGallery.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('TeamGallery', TeamGallery)
  }
}
```

#### `style.css` - 全局样式
**作用**: 自定义网站样式  
**内容**:

1. **CSS 变量定义**:
   - 品牌颜色（蓝色、紫色渐变）
   - 浅色/深色主题配色
   - 阴影效果

2. **组件样式覆盖**:
   - 导航栏（毛玻璃效果）
   - Hero 区域
   - 特性卡片
   - 按钮样式

3. **移动端适配**:
   - 响应式导航菜单
   - 移动端菜单修复（确保内容可见）

4. **自定义组件样式**:
   - 团队成员卡片
   - 团队瞬间卡片
   - 悬停动画效果

5. **动画效果**:
   - `fadeInUp`: 淡入上移动画
   - `float`: 浮动动画
   - 卡片悬停 3D 效果

---

## 📂 components/ 目录

自定义 Vue 组件目录。

### 🖼️ TeamGallery.vue - 团队风采画廊组件

**作用**: 动态展示团队成员的照片和故事  

**功能特性**:
1. **自动扫描图片**: 使用 Vite 的 `import.meta.glob` 自动导入 `团队风采/` 目录下的所有图片
2. **Markdown 集成**: 读取每个目录下的 `index.md` 文件作为描述
3. **分组展示**: 按 `人名/地点` 自动分组
4. **响应式布局**: 网格布局，自适应不同屏幕尺寸
5. **图片预览**: 点击图片可放大查看（Lightbox）
6. **首页模式**: 支持限制显示数量

**Props**:
- `limit`: 限制显示的组数（首页使用）
- `isHome`: 是否为首页模式

**数据结构**:
```javascript
{
  title: "张学东 · 新疆",
  images: [
    { url: "/path/to/image.jpg", path: "..." }
  ],
  description: "描述文字",
  descriptionComponent: MarkdownComponent,
  date: "2024年1月"
}
```

**样式特点**:
- 卡片悬停效果
- 图片缩放动画
- 滚动淡入动画
- 深色模式支持

---

## 📂 团队风采/ 目录

存储团队成员照片和故事的目录。

```
团队风采/
├── 张学东/
│   └── 新疆/
│       ├── index.md
│       ├── img1.jpg
│       └── img2.jpg
├── 张君豪/
│   └── 重庆/
│       ├── index.md
│       └── img1.jpg
└── 李万江/
    └── 青海/
        ├── index.md
        └── img1.jpg
```

### 📝 目录结构规则

**格式**: `团队风采/{人名}/{地点}/`

**必需文件**:
- `index.md`: 描述文件（可选）
- 至少一张图片（jpg, png, jpeg, webp, gif）

**index.md 格式**:
```markdown
---
description: 简短描述
date: 2024-01-15
---

# 标题（不会显示）

这里是详细的描述内容，支持 Markdown 格式。

可以包含：
- 列表
- **加粗**
- *斜体*
- > 引用
```

**图片要求**:
- 格式：JPG, PNG, JPEG, WebP, GIF
- 建议大小：< 500KB（使用 compress-images.js 压缩）
- 建议尺寸：≤ 1920x1920

---

## 📂 moments/ 目录

团队瞬间的 Markdown 文章目录（备用）。

```
moments/
├── entrepreneurship.md     # 创业故事
└── ...                     # 其他文章
```

**说明**: 这是传统的 Markdown 文章方式，目前主要使用 `团队风采/` 目录的自动化方案。

---

## 📂 public/ 目录

静态资源目录，构建时会直接复制到输出目录。

```
public/
├── logo.png                # 网站 Logo
├── wx.jpg                  # 微信二维码/图标
└── ...                     # 其他静态资源
```

**访问方式**: 直接使用 `/文件名` 访问，例如 `/logo.png`

---

## 🚀 常用命令

### 开发模式
```bash
npm run dev
```
启动本地开发服务器，支持热重载。

### 构建生产版本
```bash
npm run build
```
构建静态网站到 `.vitepress/dist/` 目录。

### 预览构建结果
```bash
npm run preview
```
预览构建后的网站。

### 压缩图片
```bash
node compress-images.js
```
批量压缩 `团队风采/` 目录下的图片。

---

## 📝 添加新内容指南

### 添加新的团队成员
编辑 `doc/team.md`，在 `members` 数组中添加：
```javascript
{
  name: "新成员",
  role: "职位",
  avatar: "🎯",
  desc: "简介",
  tags: ["技能1", "技能2"]
}
```

### 添加新的团队瞬间
1. 在 `doc/团队风采/` 下创建目录：`{人名}/{地点}/`
2. 添加图片文件
3. （可选）创建 `index.md` 添加描述
4. 运行 `node compress-images.js` 压缩图片

### 添加新页面
1. 在 `doc/` 目录创建 `.md` 文件
2. 在 `config.mjs` 的 `nav` 和 `sidebar` 中添加链接

---

## 🎨 主题定制

### 修改颜色
编辑 `theme/style.css` 中的 CSS 变量：
```css
:root {
  --vp-c-brand: #3b82f6;        /* 主品牌色 */
  --vp-c-brand-light: #60a5fa;  /* 浅色 */
  --vp-c-brand-dark: #2563eb;   /* 深色 */
}
```

### 添加自定义组件
1. 在 `theme/components/` 创建 `.vue` 文件
2. 在 `theme/index.js` 中注册组件
3. 在 Markdown 文件中使用 `<ComponentName />`

---

## 🔍 技术栈

- **框架**: VitePress 1.x
- **构建工具**: Vite
- **前端**: Vue 3
- **样式**: CSS Variables + Custom CSS
- **图片处理**: Sharp
- **部署**: 静态网站托管（Vercel, Netlify, GitHub Pages 等）

---

## 📧 联系方式

如有问题，请联系：
- 邮箱: shibaizhelianmeng@163.com
- GitHub: https://github.com/Lappercn/

---

**最后更新**: 2025-11-21  
**文档版本**: 1.0
