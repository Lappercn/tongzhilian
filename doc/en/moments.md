---
layout: doc
title: Moments
---

# 📸 Team Moments

Recording the life moments, team building trips, and technical insights of the NexCore team. We are not just code builders, but also life explorers.

## 🌍 Journey

<TeamGallery />

## 📝 Essays & Insights

<div class="moments-grid">

  <a href="/en/moments/rag-system" class="moment-card animate-fade-in delay-4 link-card">
    <div class="moment-content">
      <div class="moment-title">Building Enterprise RAG System from 0 to 1</div>
      <div class="moment-meta">✍️ Zhang Junhao · 🏷️ Tech Share</div>
      <div class="moment-excerpt">
        Reviewing the pitfalls and solutions encountered when building intelligent Q&A systems, deep thinking on vector database selection and Prompt engineering.
      </div>
      <div class="read-more">Read More →</div>
    </div>
  </a>

  <a href="/en/moments/vue3-ts-best-practices" class="moment-card animate-fade-in delay-4 link-card">
    <div class="moment-content">
      <div class="moment-title">Vue3 + TypeScript Best Practices</div>
      <div class="moment-meta">✍️ Li Wanjiang · 🏷️ Frontend Engineering</div>
      <div class="moment-excerpt">
        How to write highly maintainable frontend code using Composition API and TS type system? Sharing our internal standards.
      </div>
      <div class="read-more">Read More →</div>
    </div>
  </a>

  <a href="/en/moments/entrepreneurship" class="moment-card animate-fade-in delay-4 link-card">
    <div class="moment-content">
      <div class="moment-title">"Long-termism" on the Entrepreneurial Road</div>
      <div class="moment-meta">✍️ Zhang Xuedong · 🏷️ Thoughts</div>
      <div class="moment-excerpt">
        In the impetuous Internet environment, why do we insist on polishing every detail? Deep analysis of NexCore values.
      </div>
      <div class="read-more">Read More →</div>
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
