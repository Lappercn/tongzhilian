---
layout: home

hero:
  name: "NexCore"
  text: "未来触手可及"
  tagline: 重庆 · 专注 AI 落地与全栈工程化 · 交付卓越价值
  image:
    src: /logo.png
    alt: NexCore Logo
  actions:
    - theme: brand
      text: 探索团队
      link: /team
    - theme: alt
      text: 核心技术
      link: /api-examples
    - theme: alt
      text: 成功案例
      link: /projects
    - theme: brand
      text: 加入团队
      link: /join-us

features:
  - icon: ⚡️
    title: 极速全栈开发
    details: 基于 Vue3 + Flask/FastAPI 的现代化技术栈，从原型到上线，我们追求极致的交付速度与代码质量。
  - icon: 🧠
    title: AI 深度赋能
    details: 不仅仅是调用 API。我们具备模型微调、RAG 知识库构建与 MLOps 工程落地的核心能力。
  - icon: 🛠️
    title: 严谨工程实践
    details: 坚持 RESTful API 契约驱动、CI/CD 自动化流水线与全链路监控，确保系统稳健运行。
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #2563eb 30%, #4f46e5);
}
</style>

<div style="margin-top: 4rem;">
  <h2 style="text-align: center; font-size: 2rem; font-weight: 800; margin-bottom: 1rem;">团队风采</h2>
  <p style="text-align: center; color: var(--vp-c-text-2); margin-bottom: 3rem; max-width: 600px; margin-left: auto; margin-right: auto;">
    工作之余，我们也热爱生活。从雪山到海边，记录下每一个精彩瞬间。
  </p>
  <TeamGallery :limit="4" :isHome="true" />
</div>

<div class="join-us-section">
  <div class="join-us-content">
    <h2 class="join-us-title">加入我们</h2>
    <p class="join-us-subtitle">
      成为 NexCore 的一员,一起创造未来
    </p>
    <p class="join-us-description">
      我们正在寻找充满激情的全栈工程师、AI 算法工程师和产品设计师。<br>
      如果你热爱技术、追求卓越,欢迎加入我们的团队!
    </p>
    <div class="join-us-actions">
      <a href="/team" class="join-us-btn primary">了解团队</a>
      <a href="mailto:shibaizhelianmeng@163.com" class="join-us-btn secondary">投递简历</a>
      <a href="/join-us" class="join-us-btn primary" style="margin-left:0.5rem;">联系我们</a>
    </div>
  </div>
</div>

<div style="margin-top: 2rem;">
  <AddMemberForm />
  <p style="text-align:center;color:var(--vp-c-text-2);margin-top:0.5rem;">加入需密钥，请先通过邮箱或微信联系获取密钥后再提交。前往 <a href="/join-us">加入我们</a> 获取联系方式。</p>
</div>

<style scoped>
.join-us-section {
  margin: 6rem auto 4rem;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  max-width: 1200px;
  position: relative;
  overflow: hidden;
}

.join-us-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: pulse 8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

.join-us-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
}

.join-us-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.join-us-subtitle {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  opacity: 0.95;
}

.join-us-description {
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.join-us-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.join-us-btn {
  display: inline-block;
  padding: 0.875rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.join-us-btn.primary {
  background: white;
  color: #667eea;
}

.join-us-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  background: #f8f9fa;
}

.join-us-btn.secondary {
  background: rgba(255,255,255,0.2);
  color: white;
  border: 2px solid white;
  backdrop-filter: blur(10px);
}

.join-us-btn.secondary:hover {
  transform: translateY(-2px);
  background: rgba(255,255,255,0.3);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

@media (max-width: 768px) {
  .join-us-section {
    margin: 4rem 1rem 2rem;
    padding: 3rem 1.5rem;
  }
  
  .join-us-title {
    font-size: 2rem;
  }
  
  .join-us-subtitle {
    font-size: 1.1rem;
  }
  
  .join-us-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .join-us-btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>
```
