# 团队成员添加功能说明

## 功能概述

本系统提供了一个纯前端的团队成员添加功能,允许访客通过填写表单、上传照片和验证码验证来申请加入团队。所有数据都存储在浏览器的 localStorage 中,无需后端服务器。

## 功能特性

### 1. 双重验证机制
- **加入密钥**: 必填,需要输入团队提供的加入密钥
  - 支持显示/隐藏密钥
  - 不区分大小写验证
  - 密钥配置在 JSON 文件中,管理员可灵活管理
- **图形验证码**: 必填,4位随机字符验证码
  - 使用 Canvas 绘制
  - 支持点击刷新
  - 防止机器人攻击

### 2. 表单验证
- **姓名**: 必填,最多 20 个字符
- **角色/职位**: 必填,最多 50 个字符
- **个人简介**: 必填,最多 200 个字符,实时显示字数统计
- **技能标签**: 必填,最多添加 6 个标签,每个标签最多 20 个字符
- **个人照片**: 必填,支持 JPG、PNG、WEBP 格式,最大 2MB

### 3. 图片处理
- 实时预览上传的图片
- 支持更换和删除照片
- 自动转换为 base64 格式存储
- 文件大小限制为 2MB

### 4. 数据存储
- 使用浏览器 localStorage 存储成员数据
- 自动检测重复姓名,防止重复添加
- 支持实时同步显示新添加的成员

## 使用流程

### 访客端操作

1. **访问团队页面**
   - 打开网站的"团队成员"页面
   - 找到"加入我们的团队"按钮

2. **填写申请表单**
   - 点击按钮打开表单弹窗
   - 依次填写所有必填项:
     - 输入姓名
     - 输入角色/职位
     - 填写个人简介
     - 添加技能标签(输入后按回车或点击"添加"按钮)
     - 上传个人照片
     - **输入加入密钥**(联系团队管理员获取)
     - 输入验证码

3. **提交申请**
   - 确认所有信息填写完整
   - 点击"提交申请"按钮
   - 等待提交成功提示

4. **查看结果**
   - 提交成功后会显示成功提示
   - 3秒后自动关闭弹窗
   - 新成员会立即显示在团队列表中
   - 新成员卡片会有特殊的高亮边框和"新成员"标识

## 技术实现

### 组件结构

```
doc/.vitepress/theme/components/
├── AddMemberForm.vue      # 主表单组件
├── CaptchaInput.vue       # 验证码组件
└── TeamMembers.vue        # 团队成员展示组件
```

### 数据流

1. **添加成员**:
   ```
   用户填写表单 → 验证码验证 → 转换图片为 base64 
   → 保存到 localStorage → 触发 'members-updated' 事件
   → TeamMembers 组件监听事件 → 更新显示
   ```

2. **数据结构**:
   ```javascript
   {
     name: "姓名",
     role: "角色/职位",
     avatar: "姓名首字母",
     desc: "个人简介",
     tags: ["标签1", "标签2", ...],
     photo: "base64图片数据",
     addedAt: "2025-11-21T14:00:00.000Z",
     isNewMember: true
   }
   ```

3. **存储键名**: `team_members_data`

### 验证码实现

验证码使用 Canvas API 绘制,包含以下特性:
- 随机生成 4 位字符(排除易混淆字符如 0/O, 1/I)
- 随机颜色和旋转角度
- 干扰线和干扰点
- 渐变背景

## 管理功能

### 查看新成员

新添加的成员会在团队列表中显示,并带有以下特征:
- 卡片边框高亮(品牌色)
- "新成员"徽章标识
- 轻微的发光动画效果

### 数据管理

由于数据存储在 localStorage 中,管理员可以通过浏览器开发者工具进行管理:

1. **查看数据**:
   ```javascript
   // 在浏览器控制台执行
   const members = JSON.parse(localStorage.getItem('team_members_data'))
   console.log(members)
   ```

2. **删除特定成员**:
   ```javascript
   // 获取现有成员
   let members = JSON.parse(localStorage.getItem('team_members_data'))
   
   // 过滤掉要删除的成员
   members = members.filter(m => m.name !== '要删除的姓名')
   
   // 保存回 localStorage
   localStorage.setItem('team_members_data', JSON.stringify(members))
   
   // 刷新页面查看效果
   location.reload()
   ```

3. **清空所有新成员**:
   ```javascript
   localStorage.removeItem('team_members_data')
   location.reload()
   ```

4. **导出数据**:
   ```javascript
   const members = JSON.parse(localStorage.getItem('team_members_data'))
   const dataStr = JSON.stringify(members, null, 2)
   const blob = new Blob([dataStr], { type: 'application/json' })
   const url = URL.createObjectURL(blob)
   const a = document.createElement('a')
   a.href = url
   a.download = 'team-members-export.json'
   a.click()
   ```

## 注意事项

### 限制和约束

1. **浏览器兼容性**
   - 需要支持 localStorage 的现代浏览器
   - 需要支持 Canvas API
   - 建议使用 Chrome、Firefox、Safari、Edge 最新版本

2. **存储限制**
   - localStorage 通常限制为 5-10MB
   - 由于图片转为 base64 会增大约 33%,建议:
     - 限制图片大小为 2MB
     - 预计可存储约 50-100 个成员(取决于图片大小)

3. **数据持久性**
   - 数据存储在浏览器本地
   - 清除浏览器缓存会丢失数据
   - 不同浏览器/设备的数据不同步
   - 建议定期导出备份数据

4. **安全性**
   - 验证码仅为前端验证,可被绕过
   - 无法防止恶意用户通过控制台直接操作 localStorage
   - 适用于内部团队或可信环境
   - 如需更高安全性,建议添加后端验证

### 最佳实践

1. **定期备份**
   - 建议定期使用导出功能备份成员数据
   - 可以将导出的 JSON 文件保存到云盘

2. **审核机制**
   - 建议管理员定期检查新添加的成员
   - 删除不合适或测试数据

3. **迁移到后端**
   - 如果团队规模扩大,建议迁移到后端数据库
   - 可以使用导出的 JSON 数据作为初始数据

## 扩展建议

### 未来可以添加的功能

1. **审核流程**
   - 添加待审核状态
   - 管理员审核通过后才显示

2. **编辑功能**
   - 允许成员编辑自己的信息
   - 需要添加身份验证机制

3. **社交链接**
   - 添加 GitHub、LinkedIn 等社交媒体链接
   - 显示联系方式

4. **成员分类**
   - 按部门或技能分组
   - 支持筛选和搜索

5. **数据同步**
   - 使用云存储服务(如 Firebase)
   - 实现跨设备数据同步

## 故障排除

### 常见问题

1. **提交后没有显示新成员**
   - 检查浏览器控制台是否有错误
   - 刷新页面重试
   - 检查 localStorage 是否被禁用

2. **图片上传失败**
   - 确认图片格式正确(JPG/PNG/WEBP)
   - 确认图片大小不超过 2MB
   - 尝试压缩图片后重新上传

3. **验证码无法显示**
   - 检查浏览器是否支持 Canvas
   - 清除浏览器缓存重试

4. **数据丢失**
   - 检查是否清除了浏览器缓存
   - 查看是否有备份数据
   - 联系其他团队成员获取数据

## 联系支持

如有问题或建议,请联系开发团队。
