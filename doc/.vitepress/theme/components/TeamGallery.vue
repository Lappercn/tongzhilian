<template>
  <div class="team-gallery" :class="{ 'home-mode': isHome }">
    <div v-for="(group, key) in displayGroups" :key="key" class="gallery-group animate-on-scroll">
      <div class="group-header">
        <div class="header-content">
          <div class="title-row">
            <h3 class="gallery-title">{{ group.title }}</h3>
            <span v-if="group.date" class="date-badge">{{ group.date }}</span>
          </div>
          
          <div class="content-flex">
            <!-- 描述文案 -->
            <div v-if="group.descriptionComponent || group.description" class="description-column">
              <div class="group-description-wrapper">
                <component :is="group.descriptionComponent" v-if="group.descriptionComponent" />
                <p v-else class="group-description">{{ group.description }}</p>
              </div>
            </div>

            <!-- 图片网格 -->
            <div class="images-column" :class="{ 'full-width': !group.descriptionComponent && !group.description }">
              <div class="gallery-grid">
                <div v-for="(img, index) in group.images.slice(0, isHome ? 4 : undefined)" :key="index" class="gallery-item" @click="openLightbox(img)">
                  <div class="img-wrapper">
                    <img :src="img.url" :alt="group.title" />
                  </div>
                  <div class="overlay">
                    <span class="view-text">
                      <span class="icon">🔍</span>
                    </span>
                  </div>
                </div>
                <!-- 首页模式下如果图片多于4张，显示提示 -->
                <div v-if="isHome && group.images.length > 4" class="more-images-hint">
                  <a :href="'/moments'" class="more-link">+{{ group.images.length - 4 }} 更多</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="isHome" class="home-footer">
      <a href="/moments" class="view-all-btn">
        探索更多精彩瞬间 <span class="arrow">→</span>
      </a>
    </div>
    
    <Transition name="fade">
      <div v-if="selectedImage" class="lightbox" @click="selectedImage = null">
        <button class="close-btn" @click.stop="selectedImage = null">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <img :src="selectedImage.url" class="lightbox-img" @click.stop />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'

const props = defineProps({
  limit: {
    type: Number,
    default: 0
  },
  isHome: {
    type: Boolean,
    default: false
  }
})

// 动态导入图片
const images = import.meta.glob('../../../团队风采/**/*.{jpg,png,jpeg,webp,gif}', { eager: true })
// 动态导入 markdown 文件
const descriptions = import.meta.glob('../../../团队风采/**/index.md', { eager: true })

const groupedImages = computed(() => {
  const groups = {}
  
  for (const path in images) {
    const parts = path.split('/')
    const rootIndex = parts.indexOf('团队风采')
    if (rootIndex === -1 || parts.length < rootIndex + 3) continue
    
    const person = parts[rootIndex + 1]
    const location = parts[rootIndex + 2]
    const groupKey = `${person}/${location}`
    const title = `${person} · ${location}`
    
    if (!groups[groupKey]) {
      groups[groupKey] = {
        title,
        images: [],
        description: '',
        descriptionComponent: null,
        date: null
      }
    }
    
    groups[groupKey].images.push({
      url: images[path].default,
      path
    })
  }

  for (const path in descriptions) {
    const parts = path.split('/')
    const rootIndex = parts.indexOf('团队风采')
    if (rootIndex === -1 || parts.length < rootIndex + 3) continue

    const person = parts[rootIndex + 1]
    const location = parts[rootIndex + 2]
    const groupKey = `${person}/${location}`

    if (groups[groupKey]) {
      const mod = descriptions[path]
      groups[groupKey].descriptionComponent = mod.default
      if (mod.frontmatter) {
        if (mod.frontmatter.description) groups[groupKey].description = mod.frontmatter.description
        if (mod.frontmatter.date) {
          const date = new Date(mod.frontmatter.date)
          groups[groupKey].date = date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })
        }
      }
    }
  }
  
  return Object.values(groups).sort((a, b) => {
     // 简单的排序，如果有日期按日期倒序，否则按名称
     if (a.date && b.date) return new Date(b.date) - new Date(a.date)
     return 0
  })
})

const displayGroups = computed(() => {
  if (props.limit > 0) {
    return groupedImages.value.slice(0, props.limit)
  }
  return groupedImages.value
})

const selectedImage = ref(null)

const openLightbox = (img) => {
  selectedImage.value = img
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1 })

  setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))
  }, 100)
})
</script>

<style scoped>
.team-gallery {
  padding: 2rem 0;
}

.team-gallery.home-mode {
  padding: 0;
}

.gallery-group {
  margin-bottom: 6rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.gallery-group.visible {
  opacity: 1;
  transform: translateY(0);
}

.group-header {
  margin-bottom: 2rem;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.gallery-title {
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(120deg, var(--vp-c-brand-dark), var(--vp-c-brand-next));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  letter-spacing: -0.5px;
  line-height: 1.2;
  flex-shrink: 0; /* 防止标题被挤压 */
}

.date-badge {
  font-size: 0.85rem;
  padding: 6px 16px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  font-family: var(--vp-font-family-mono);
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

/* Layout: Flex for large screens */
.content-flex {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
}

.description-column {
  flex: 1;
  min-width: 300px;
  position: sticky;
  top: 100px;
}

.images-column {
  flex: 2;
}

.images-column.full-width {
  flex: 1;
}

.group-description-wrapper {
  background: var(--vp-c-bg-alt);
  padding: 2.5rem;
  border-radius: 24px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.group-description-wrapper:hover {
  transform: translateY(-5px);
}

.group-description-wrapper::before {
  content: '"';
  position: absolute;
  top: -10px;
  left: 20px;
  font-size: 8rem;
  color: var(--vp-c-brand);
  opacity: 0.08;
  font-family: serif;
  pointer-events: none;
  line-height: 1;
}

.group-description-wrapper :deep(h1) { display: none; }
.group-description-wrapper :deep(p) {
  margin: 1rem 0;
  line-height: 1.8;
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
}
.group-description-wrapper :deep(blockquote) {
  border-left: 4px solid var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 0 12px 12px 0;
  font-style: italic;
  color: var(--vp-c-text-1);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.gallery-item {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 1;
  box-shadow: var(--card-shadow);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--vp-c-bg-soft);
}

.img-wrapper {
  width: 100%;
  height: 100%;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(4px);
}

.view-text {
  color: white;
  font-size: 1.5rem;
  background: rgba(255,255,255,0.2);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.8);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.gallery-item:hover {
  transform: translateY(-8px);
  box-shadow: var(--card-shadow-hover);
}
.gallery-item:hover img {
  transform: scale(1.15);
}
.gallery-item:hover .overlay {
  opacity: 1;
}
.gallery-item:hover .view-text {
  transform: scale(1);
}

/* Home Mode Specifics */
.more-images-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  background: var(--vp-c-bg-soft);
  border-radius: 20px;
  border: 2px dashed var(--vp-c-divider);
}

.more-link {
  font-weight: 700;
  color: var(--vp-c-brand);
  text-decoration: none;
  font-size: 1.2rem;
}

.home-footer {
  text-align: center;
  margin-top: 4rem;
}

.view-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 12px 32px;
  background: var(--vp-c-brand);
  color: white !important;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none !important;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
}

.view-all-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5);
}

.view-all-btn .arrow {
  transition: transform 0.3s ease;
}

.view-all-btn:hover .arrow {
  transform: translateX(4px);
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  cursor: zoom-out;
  backdrop-filter: blur(20px);
}

.lightbox-img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 0 50px rgba(0,0,0,0.5);
}

.close-btn {
  position: absolute;
  top: 30px;
  right: 30px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

@media (max-width: 960px) {
  .content-flex {
    flex-direction: column;
  }
  .description-column {
    position: static;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
  .gallery-title {
    font-size: 1.8rem;
  }
}
</style>
