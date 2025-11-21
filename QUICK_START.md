# 团队成员添加功能 - 快速开始

## 🎯 功能概述

本系统提供了一个**纯前端**的团队成员添加功能,具有**双重验证机制**:
- ✅ **加入密钥验证** - 防止未授权访问
- ✅ **图形验证码验证** - 防止机器人攻击

所有数据存储在浏览器 localStorage 中,无需后端服务器。

## 🚀 快速开始

### 管理员设置

1. **配置加入密钥**
   
   编辑文件: `doc/.vitepress/config/access-keys.json`
   
   ```json
   {
     "keys": [
       "TEAM2025",
       "YOUR_CUSTOM_KEY"
     ]
   }
   ```

2. **分发密钥给候选人**
   
   通过邮件、即时通讯等方式将密钥发送给需要加入的成员

### 用户使用

1. 访问团队页面
2. 点击"加入我们的团队"按钮
3. 填写个人信息
4. 输入管理员提供的密钥
5. 完成验证码验证
6. 提交申请

## 📁 相关文件

- `doc/.vitepress/config/access-keys.json` - 密钥配置文件
- `doc/.vitepress/theme/components/AddMemberForm.vue` - 表单组件
- `doc/.vitepress/theme/components/CaptchaInput.vue` - 验证码组件
- `doc/.vitepress/theme/components/TeamMembers.vue` - 成员展示组件

## 📖 详细文档

- [完整功能说明](./TEAM_MEMBER_FEATURE.md) - 详细的功能介绍和使用指南
- [密钥管理指南](./ACCESS_KEY_MANAGEMENT.md) - 密钥配置和管理的完整指南

## ⚙️ 密钥管理

### 添加新密钥

```json
{
  "keys": [
    "EXISTING_KEY",
    "NEW_KEY_2025"  // 新添加
  ]
}
```

### 删除旧密钥

```json
{
  "keys": [
    "CURRENT_KEY"  // 已删除旧密钥
  ]
}
```

### 密钥特性

- ✅ 支持多个密钥同时有效
- ✅ 不区分大小写
- ✅ 自动去除首尾空格
- ✅ JSON 配置,易于管理

## 🔒 安全建议

1. **定期更换密钥** - 建议每季度更换一次
2. **使用复杂密钥** - 8-20个字符,字母数字组合
3. **安全分发** - 通过私密渠道发送密钥
4. **避免公开** - 不要在公开网页或代码仓库中暴露密钥

## 🛠️ 管理操作

### 查看新添加的成员

```javascript
// 在浏览器控制台执行
const members = JSON.parse(localStorage.getItem('team_members_data'))
console.log(members)
```

### 删除特定成员

```javascript
let members = JSON.parse(localStorage.getItem('team_members_data'))
members = members.filter(m => m.name !== '要删除的姓名')
localStorage.setItem('team_members_data', JSON.stringify(members))
location.reload()
```

### 清空所有新成员

```javascript
localStorage.removeItem('team_members_data')
location.reload()
```

## 🐛 故障排除

### 密钥验证失败

1. 检查 `access-keys.json` 文件格式是否正确
2. 确认密钥已添加到 `keys` 数组中
3. 清除浏览器缓存并刷新页面

### 成员未显示

1. 检查浏览器控制台是否有错误
2. 确认 localStorage 未被禁用
3. 刷新页面重试

## 📞 获取帮助

- 查看 [完整功能说明](./TEAM_MEMBER_FEATURE.md)
- 查看 [密钥管理指南](./ACCESS_KEY_MANAGEMENT.md)
- 联系团队管理员

## 🎨 界面预览

- 新成员卡片会显示"新成员"标识
- 支持明亮/暗黑主题
- 响应式设计,支持移动端

---

**最后更新**: 2025-11-21
