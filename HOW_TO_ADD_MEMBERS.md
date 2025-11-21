# 如何添加新团队成员

## 📝 步骤说明

### 1. 编辑 TeamMembers.vue 组件

打开文件：`doc/.vitepress/theme/components/TeamMembers.vue`

在 `members` 数组中添加新成员信息：

```javascript
const members = [
  // ... 现有成员
  {
    name: "新成员姓名",
    role: "职位",
    avatar: "😊",  // 默认 Emoji（如果没有照片会显示）
    desc: "个人简介，介绍技能和经验",
    tags: ["技能1", "技能2", "技能3", "技能4"]
  }
]
```

### 2. 添加成员照片（可选）

如果要为成员添加真实照片：

1. 在 `doc/团队风采/` 目录下创建成员文件夹：
   ```
   doc/团队风采/新成员姓名/地点名称/
   ```

2. 将照片放入该文件夹，支持的格式：
   - `.jpg`
   - `.jpeg`
   - `.png`
   - `.webp`
   - `.gif`

3. （可选）创建 `index.md` 添加描述：
   ```markdown
   ---
   description: 简短描述
   date: 2024-01-15
   ---
   
   这里是详细的描述内容
   ```

4. 运行图片压缩工具（推荐）：
   ```bash
   node compress-images.js
   ```

### 3. 组件自动匹配逻辑

组件会自动：
- ✅ 扫描 `团队风采/` 目录
- ✅ 查找包含成员姓名的文件夹
- ✅ 如果找到照片，随机选择一张作为头像
- ✅ 如果没有照片，显示默认 Emoji

## 🎯 示例

### 添加一个有照片的成员

1. **编辑 TeamMembers.vue**：
```javascript
{
  name: "王小明",
  role: "UI/UX 设计师",
  avatar: "🎨",
  desc: "专注于用户体验设计，擅长创造直观美观的界面",
  tags: ["Figma", "Sketch", "UI Design", "Prototyping"]
}
```

2. **添加照片**：
```
doc/团队风采/王小明/北京/
├── photo1.jpg
├── photo2.jpg
└── index.md
```

3. **结果**：
   - 组件会自动找到 `王小明` 文件夹中的照片
   - 随机选择 `photo1.jpg` 或 `photo2.jpg` 作为头像
   - 每次刷新页面可能显示不同的照片

### 添加一个没有照片的成员

1. **只编辑 TeamMembers.vue**：
```javascript
{
  name: "李小红",
  role: "产品经理",
  avatar: "📱",
  desc: "负责产品规划和需求管理",
  tags: ["Product Management", "Agile", "User Research"]
}
```

2. **结果**：
   - 因为没有对应的照片文件夹
   - 会显示默认的 Emoji "📱"

## 🔄 更新现有成员

### 修改成员信息

直接编辑 `TeamMembers.vue` 中对应成员的数据即可。

### 添加/更换照片

1. 在 `doc/团队风采/{成员姓名}/` 下添加新照片
2. 组件会自动检测并随机选择

### 删除成员

从 `TeamMembers.vue` 的 `members` 数组中删除对应项即可。

## 💡 技巧

### 1. 控制照片选择

如果想让某个成员总是显示特定照片，可以：
- 只在该成员文件夹中放一张照片
- 或者修改组件逻辑，指定特定照片

### 2. 照片命名建议

使用有意义的文件名，例如：
- `profile.jpg` - 正式照片
- `casual.jpg` - 休闲照片
- `work.jpg` - 工作照片

### 3. 优化照片大小

使用压缩工具可以：
- 减少文件大小 90%+
- 提升页面加载速度
- 保持良好的视觉质量

```bash
node compress-images.js
```

## 📋 完整示例

```javascript
// TeamMembers.vue 中的 members 数组
const members = [
  {
    name: "张学东",
    role: "前后端开发 & 架构",
    avatar: "👨‍💻",
    desc: "专注于 Web 全栈开发与系统架构设计。擅长构建高性能、可扩展的企业级应用，对 Vue3 生态与 Python 后端有深入实践。",
    tags: ["Vue3", "Flask", "MongoDB", "System Design"]
  },
  {
    name: "李万江",
    role: "全栈开发工程师",
    avatar: "💻",
    desc: "精通前端交互与后端逻辑实现。致力于打造极致的用户体验，在复杂业务逻辑处理与界面交互优化方面经验丰富。",
    tags: ["Vue3", "Element Plus", "Python", "UI/UX"]
  }
]
```

对应的文件结构：
```
doc/团队风采/
├── 张学东/
│   └── 新疆/
│       ├── img1.jpg  ← 会被随机选择
│       ├── img2.jpg  ← 会被随机选择
│       └── index.md
└── 李万江/
    └── 青海/
        ├── photo.jpg ← 只有一张，总是显示这张
        └── index.md
```

## ❓ 常见问题

**Q: 为什么我的照片没有显示？**
- 检查文件夹名称是否与成员姓名完全一致
- 确认照片格式是否支持（jpg, png, jpeg, webp, gif）
- 查看浏览器控制台是否有错误信息

**Q: 如何让照片不随机变化？**
- 只在成员文件夹中放一张照片
- 或者修改组件代码，移除随机选择逻辑

**Q: 可以使用外部链接的照片吗？**
- 目前组件只支持本地照片
- 如需使用外部链接，需要修改组件逻辑

---

**更新日期**: 2025-11-21
