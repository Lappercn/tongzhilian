<template>
  <div class="team-grid">
    <div 
      v-for="(member, index) in members" 
      :key="member.name" 
      class="team-card animate-fade-in"
      :class="`delay-${index + 1}`"
    >
      <div class="member-avatar">
        <img 
          v-if="memberPhotos[member.name]" 
          :src="memberPhotos[member.name]" 
          :alt="member.name" 
          style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" 
        />
        <span v-else>{{ member.avatar }}</span>
      </div>
      <div class="member-name">{{ member.name }}</div>
      <div class="member-role">{{ member.role }}</div>
      <div class="member-desc">{{ member.desc }}</div>
      <div class="member-tags">
        <span v-for="tag in member.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 团队成员数据
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
  },
  {
    name: "张君豪",
    role: "算法模型专家",
    avatar: "🤖",
    desc: "深耕人工智能与深度学习领域。负责核心算法模型的研发与优化，将前沿 AI 技术转化为实际落地的工程解决方案。",
    tags: ["Deep Learning", "NLP", "PyTorch", "Model Ops"]
  },
  {
    name: "杨家俊",
    role: "算法研发工程师",
    avatar: "🧠",
    desc: "专注于数据挖掘与模型训练。在海量数据处理与模型性能调优方面有独到见解，保障 AI 服务的高效与稳定。",
    tags: ["Data Mining", "Machine Learning", "Python", "Optimization"]
  }
]

// 动态导入团队风采目录中的所有图片
const images = import.meta.glob('../../../团队风采/**/*.{jpg,png,jpeg,webp,gif}', { eager: true })

// 为每个成员查找照片
const memberPhotos = computed(() => {
  const photos = {}
  
  members.forEach(member => {
    // 查找包含成员姓名的图片路径
    const memberImages = Object.keys(images).filter(path => 
      path.includes(member.name)
    )
    
    if (memberImages.length > 0) {
      // 随机选择一张照片
      const randomIndex = Math.floor(Math.random() * memberImages.length)
      const selectedPath = memberImages[randomIndex]
      photos[member.name] = images[selectedPath].default
    }
  })
  
  return photos
})
</script>

<style scoped>
/* 动画延迟类 */
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }
</style>
