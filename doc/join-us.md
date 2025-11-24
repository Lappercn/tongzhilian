---
title: 加入我们
description: NexCore 招募全栈与算法工程师，联系邮箱与微信二维码
outline: deep
---

# 加入我们

<div class="join-hero">
  <div class="hero-content">
    <h2 class="hero-title">成为 NexCore 的一员</h2>
    <p class="hero-subtitle">重庆 · 专注 AI 落地与全栈工程化 · 以结果为导向</p>
    <div class="hero-actions">
      <a class="btn primary" href="mailto:shibaizhelianmeng@163.com">邮件联系</a>
      <a class="btn secondary" href="#contact">微信联系</a>
      <a class="btn outline" href="/team">了解团队</a>
    </div>
  </div>
  <div class="hero-media">
    <div class="media-grid">
      <div class="media-item">
        <QrLightbox src="/wx.jpg" alt="微信二维码" :thumb-size="220" :full-size="640" download-name="weixin-qrcode" />
        <div class="qrcode-caption">微信二维码</div>
      </div>
      <div class="media-item">
        <QrLightbox src="/feishu.png" alt="飞书二维码" :thumb-size="220" :full-size="640" download-name="feishu-qrcode" />
        <div class="qrcode-caption">飞书二维码</div>
      </div>
    </div>
    <div class="qrcode-tip">添加时请备注「应聘 + 岗位」</div>
  </div>
  <div class="hero-bg"></div>
  <div class="hero-blur"></div>
  <div class="hero-gradient"></div>
  <div class="hero-shape"></div>
</div>

::: warning 加入须知
加入需密钥，请先通过邮箱或微信联系我们获取密钥后再提交申请。
:::

## 我们正在寻找

<div class="roles-grid">
  <div class="role-card">
    <div class="role-icon">💻</div>
    <h3>前后端开发工程师</h3>
    <ul>
      <li>参与企业级 Web 应用的全栈开发 (Vue3 + Python/Node.js)</li>
      <li>设计并实现高可用的 RESTful API</li>
      <li>持续优化前端性能与用户体验</li>
    </ul>
  </div>
  <div class="role-card">
    <div class="role-icon">🤖</div>
    <h3>AI 算法工程师</h3>
    <ul>
      <li>模型选型、训练与调优，封装为高性能推理服务</li>
      <li>探索 LLM 在实际业务中的应用（RAG、Agent）</li>
      <li>重视工程落地与可观察性（MLOps）</li>
    </ul>
  </div>
</div>

## 为什么选择 NexCore？

<div class="features-grid">
  <div class="feature-item">
    <h3>🚀 快速成长</h3>
    <p>直接参与从需求到上线的完整项目周期，获得可见的成长与成果。</p>
  </div>
  <div class="feature-item">
    <h3>🛠️ 极客氛围</h3>
    <p>技术分享与开放协作文化，鼓励尝试、复盘与持续改进。</p>
  </div>
  <div class="feature-item">
    <h3>💰 合理回报</h3>
    <p>以价值与结果为导向，基于项目收益的分成机制。</p>
  </div>
</div>

## 联系方式 {#contact}

<div class="contact-card">
  <div class="contact-info">
    <div class="contact-title">📬 联系我们</div>
    <div class="contact-row">
      <span class="contact-label">邮箱</span>
      <a class="contact-link" href="mailto:shibaizhelianmeng@163.com">shibaizhelianmeng@163.com</a>
    </div>
    <div class="contact-row">
      <span class="contact-label">微信</span>
      <span class="contact-desc">扫描右侧二维码添加好友</span>
    </div>
    <div class="contact-row">
      <span class="contact-label">飞书</span>
      <span class="contact-desc">扫描右侧二维码添加联系人</span>
    </div>
  </div>
  <div class="contact-media">
    <div class="qrcodes">
      <div class="qrcode-wrap">
        <QrLightbox src="/wx.jpg" alt="微信二维码" :thumb-size="200" :full-size="640" download-name="weixin-qrcode" />
        <div class="qrcode-caption">微信</div>
      </div>
      <div class="qrcode-wrap">
        <QrLightbox src="/feishu.png" alt="飞书二维码" :thumb-size="200" :full-size="640" download-name="feishu-qrcode" />
        <div class="qrcode-caption">飞书</div>
      </div>
    </div>
    <div class="qrcode-tip">添加时请备注「应聘 + 岗位」</div>
  </div>
</div>

<style>
.join-hero {
  position: relative;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 2rem;
  align-items: center;
  padding: 2.5rem;
  border-radius: 24px;
  overflow: hidden;
  background: radial-gradient(1200px 600px at 10% -20%, rgba(99,102,241,0.18), transparent),
              radial-gradient(800px 600px at 110% 120%, rgba(16,185,129,0.18), transparent),
              var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}
.hero-bg { position: absolute; inset: 0; }
.hero-blur { position: absolute; inset: 0; backdrop-filter: blur(6px); opacity: 0.3; }
.hero-gradient { position: absolute; inset: 0; background: linear-gradient(135deg, transparent 40%, rgba(99,102,241,0.08)); }
.hero-shape { position: absolute; right: -60px; bottom: -60px; width: 200px; height: 200px; border-radius: 50%; background: rgba(16,185,129,0.2); filter: blur(12px); }
.hero-content { position: relative; z-index: 1; }
.hero-title { margin: 0; font-size: 2rem; font-weight: 800; }
.hero-subtitle { margin: 0.75rem 0 1.5rem; color: var(--vp-c-text-2); }
.hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.25rem; border-radius: 12px; font-weight: 600; text-decoration: none; }
.btn.primary { background: var(--vp-c-brand-1); color: white; }
.btn.secondary { background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); }
.btn.outline { border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-1); }
.btn.primary:hover { background: var(--vp-c-brand-2); }
.hero-media { position: relative; z-index: 1; text-align: center; }
.media-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; align-items: start; }
.media-item { background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); border-radius: 16px; padding: 1rem; }
.hero-qrcode { width: 220px; border-radius: 16px; box-shadow: 0 16px 36px rgba(0,0,0,0.2); }
.qrcode-caption { margin-top: 0.35rem; color: var(--vp-c-text-3); font-size: 0.9rem; }
.qrcode-tip { margin-top: 0.5rem; color: var(--vp-c-text-3); font-size: 0.9rem; }

.roles-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin-top: 1rem; }
.role-card { background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); border-radius: 16px; padding: 1.25rem 1.5rem; }
.role-icon { font-size: 1.5rem; }
.role-card h3 { margin: 0.5rem 0 0.75rem; }
.role-card ul { margin: 0; padding-left: 1.1rem; }

.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-top: 1rem; }
.feature-item { background: var(--vp-c-bg-soft); padding: 1.25rem 1.5rem; border-radius: 16px; border: 1px solid var(--vp-c-divider); }
.feature-item h3 { margin: 0; color: var(--vp-c-brand-1); }

.contact-card { display: grid; grid-template-columns: 1.2fr 1fr; gap: 1.5rem; align-items: center; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); border-radius: 20px; padding: 1.5rem; margin-top: 1rem; }
.contact-title { font-weight: 800; font-size: 1.1rem; }
.contact-row { display: flex; gap: 0.75rem; margin-top: 0.75rem; align-items: center; }
.contact-label { width: 48px; color: var(--vp-c-text-3); }
.contact-link { color: var(--vp-c-brand-1); text-decoration: none; }
.contact-link:hover { text-decoration: underline; }
.contact-desc { color: var(--vp-c-text-2); }
.contact-media { text-align: center; }
.qrcodes { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; justify-items: center; }
.qrcode-wrap { background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); border-radius: 16px; padding: 0.75rem; }
.contact-qrcode { width: 200px; border-radius: 16px; box-shadow: 0 12px 28px rgba(0,0,0,0.18); }
.qrcode-caption { margin-top: 0.35rem; color: var(--vp-c-text-3); font-size: 0.9rem; }

@media (max-width: 900px) {
  .join-hero { grid-template-columns: 1fr; }
  .contact-card { grid-template-columns: 1fr; }
}

@media (max-width: 600px) {
  .hero-actions { flex-direction: column; }
  .btn { width: 100%; justify-content: center; }
  .media-grid { grid-template-columns: 1fr; }
  .qrcodes { grid-template-columns: 1fr; }
}
</style>
