---
layout: doc
title: 团队风采
---

# 📸 团队风采

记录 NexCore 团队的生活点滴、团建旅行与技术心得。我们不仅是代码的构建者，也是生活的探索者。

## 🌍 旅途印记

<TeamGallery />

## 📝 随笔与心得

<div class="moments-grid">

  <a href="/moments/rag-system" class="moment-card animate-fade-in delay-4 link-card">
    <div class="moment-content">
      <div class="moment-title">从 0 到 1 构建企业级 RAG 系统</div>
      <div class="moment-meta">✍️ 张君豪 · 🏷️ 技术分享</div>
      <div class="moment-excerpt">
        复盘我们在构建智能问答系统时遇到的坑与解决方案，关于向量数据库选型与 Prompt 工程的深度思考。
      </div>
      <div class="read-more">阅读全文 →</div>
    </div>
  </a>

  <a href="/moments/vue3-ts-best-practices" class="moment-card animate-fade-in delay-4 link-card">
    <div class="moment-content">
      <div class="moment-title">Vue3 + TypeScript 最佳实践</div>
      <div class="moment-meta">✍️ 李万江 · 🏷️ 前端工程化</div>
      <div class="moment-excerpt">
        如何利用 Composition API 和 TS 类型系统写出可维护性极高的前端代码？我们的内部规范分享。
      </div>
      <div class="read-more">阅读全文 →</div>
    </div>
  </a>

  <a href="/moments/entrepreneurship" class="moment-card animate-fade-in delay-4 link-card">
    <div class="moment-content">
      <div class="moment-title">创业路上的“长期主义”</div>
      <div class="moment-meta">✍️ 张学东 · 🏷️ 创业感悟</div>
      <div class="moment-excerpt">
        在浮躁的互联网环境中，我们为何坚持打磨每一个细节？关于 NexCore 价值观的深度剖析。
      </div>
      <div class="read-more">阅读全文 →</div>
    </div>
  </a>

</div>

<style>
.moment-image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-bottom: 1px solid var(--vp-c-divider);
}

.moment-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.moment-card:hover .moment-image {
  transform: scale(1.1);
}

.link-card {
  text-decoration: none !important;
  cursor: pointer;
  display: block;
  color: inherit !important;
}

.link-card:hover {
  border-color: var(--vp-c-brand);
}

.read-more {
  margin-top: auto;
  padding-top: 1rem;
  color: var(--vp-c-brand);
  font-weight: 600;
  font-size: 0.9rem;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.link-card:hover .read-more {
  opacity: 1;
  transform: translateX(0);
}
</style>
