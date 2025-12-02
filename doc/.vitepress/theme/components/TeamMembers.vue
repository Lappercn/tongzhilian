<template>
  <div class="team-grid">
    <div 
      v-for="(member, index) in displayMembers" 
      :key="member.name + member.addedAt" 
      class="team-card animate-fade-in"
      :class="[`delay-${(index % 4) + 1}`, { 'new-member': member.isNewMember }]"
    >
      <div class="member-avatar">
        <img 
          v-if="memberPhotos[member.originalName]" 
          :src="memberPhotos[member.originalName]" 
          :alt="member.name" 
          style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" 
        />
        <span v-else>{{ member.avatar }}</span>
      </div>
      <div class="member-name">
        {{ member.name }}
        <span v-if="member.isNewMember" class="new-badge">{{ isEn ? 'New' : '新成员' }}</span>
      </div>
      <div class="member-role">{{ member.role }}</div>
      <div class="member-desc">{{ member.desc }}</div>
      <div class="member-tags">
        <span v-for="tag in member.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const isEn = computed(() => lang.value.startsWith('en'))

// 初始团队成员数据
const initialMembers = [
  {
    name: "张学东",
    nameEn: "Zhang Xuedong",
    role: "前后端开发 & 架构",
    roleEn: "Full Stack Dev & Architect",
    avatar: "👨‍💻",
    desc: "专注于 Web 全栈开发与系统架构设计。擅长构建高性能、可扩展的企业级应用,对 Vue3 生态与 Python 后端有深入实践。",
    descEn: "Focusing on Web full-stack development and system architecture design. Expert in building high-performance, scalable enterprise applications, with deep practice in Vue3 ecosystem and Python backend.",
    tags: ["Vue3", "Flask", "MongoDB", "System Design"]
  },
  {
    name: "李万江",
    nameEn: "Li Wanjiang",
    role: "全栈开发工程师",
    roleEn: "Full Stack Engineer",
    avatar: "💻",
    desc: "精通前端交互与后端逻辑实现。致力于打造极致的用户体验,在复杂业务逻辑处理与界面交互优化方面经验丰富。",
    descEn: "Proficient in frontend interaction and backend logic implementation. Dedicated to creating ultimate user experience, experienced in complex business logic processing and interface interaction optimization.",
    tags: ["Vue3", "Element Plus", "Python", "UI/UX"]
  },
  {
    name: "张君豪",
    nameEn: "Zhang Junhao",
    role: "算法模型专家",
    roleEn: "Algorithm Model Expert",
    avatar: "🤖",
    desc: "深耕人工智能与深度学习领域。负责核心算法模型的研发与优化,将前沿 AI 技术转化为实际落地的工程解决方案。",
    descEn: "Deeply cultivated in artificial intelligence and deep learning fields. Responsible for the R&D and optimization of core algorithm models, transforming cutting-edge AI technology into practical engineering solutions.",
    tags: ["Deep Learning", "NLP", "PyTorch", "Model Ops"]
  },
  {
    name: "杨家俊",
    nameEn: "Yang Jiajun",
    role: "算法研发工程师",
    roleEn: "Algorithm Engineer",
    avatar: "🧠",
    desc: "专注于数据挖掘与模型训练。在海量数据处理与模型性能调优方面有独到见解,保障 AI 服务的高效与稳定。",
    descEn: "Focusing on data mining and model training. Has unique insights in massive data processing and model performance tuning, ensuring the efficiency and stability of AI services.",
    tags: ["Data Mining", "Machine Learning", "Python", "Optimization"]
  },
  {
    name: "丁妍渝",
    nameEn: "Ding Yanyu",
    role: "产品经理 & 交互设计",
    roleEn: "Product Manager & UX Design",
    avatar: "🎨",
    desc: "致力于将 AI 技术转化为优秀的产品体验。擅长需求分析与产品规划，确保产品既具有技术前瞻性又符合用户使用习惯。",
    descEn: "Dedicated to transforming AI technology into excellent product experiences. Good at requirement analysis and product planning, ensuring products have both technical foresight and user usage habits.",
    tags: ["Product Manager", "UI/UX", "Agile", "User Research"]
  }
]

// 从本地开发接口读取新添加的成员
const newMembers = ref([])

const loadNewMembers = async () => {
  try {
    const res = await fetch('/api/members')
    if (!res.ok) throw new Error('读取新成员数据失败')
    const data = await res.json()
    newMembers.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('读取新成员数据失败:', error)
    newMembers.value = []
  }
}

// 合并所有成员
const members = computed(() => {
  return [...initialMembers, ...newMembers.value]
})

// 处理显示逻辑（国际化）
const displayMembers = computed(() => {
  return members.value.map(m => ({
    ...m,
    originalName: m.name, // 保留原始中文名用于查找图片
    name: (isEn.value && m.nameEn) ? m.nameEn : m.name,
    role: (isEn.value && m.roleEn) ? m.roleEn : m.role,
    desc: (isEn.value && m.descEn) ? m.descEn : m.desc
  }))
})

// 动态导入团队风采目录中的所有图片
const images = import.meta.glob('../../../团队风采/**/*.{jpg,png,jpeg,webp,gif}', { eager: true })

// 为每个成员查找照片
const memberPhotos = computed(() => {
  const photos = {}
  
  displayMembers.value.forEach(member => {
    // 如果是新添加的成员且有 base64 照片,直接使用
    if (member.isNewMember && member.photo) {
      photos[member.originalName] = member.photo
      return
    }
    
    // 查找包含成员姓名的图片路径 (使用原始中文名查找)
    const memberImages = Object.keys(images).filter(path => 
      path.includes(member.originalName)
    )
    
    if (memberImages.length > 0) {
      // 随机选择一张照片
      const randomIndex = Math.floor(Math.random() * memberImages.length)
      const selectedPath = memberImages[randomIndex]
      photos[member.originalName] = images[selectedPath].default
    }
  })
  
  return photos
})

// 监听成员更新事件
const handleMembersUpdate = (event) => {
  newMembers.value = event.detail || []
}

onMounted(() => {
  loadNewMembers()
  window.addEventListener('members-updated', handleMembersUpdate)
})

onUnmounted(() => {
  window.removeEventListener('members-updated', handleMembersUpdate)
})
</script>

<style scoped>
/* 动画延迟类 */
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }

/* 新成员卡片高亮 */
.new-member {
  position: relative;
  border: 2px solid var(--vp-c-brand-1);
}

.new-member::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  border-radius: inherit;
  z-index: -1;
  opacity: 0.1;
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.2; }
}

.member-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.new-badge {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  font-size: 0.75rem;
  border-radius: 12px;
  font-weight: 600;
  animation: pulse-badge 2s ease-in-out infinite;
}

@keyframes pulse-badge {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
</style>
