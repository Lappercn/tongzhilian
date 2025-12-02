<template>
  <div class="captcha-container">
    <div class="captcha-wrapper">
      <canvas 
        ref="captchaCanvas" 
        :width="width" 
        :height="height"
        @click="refreshCaptcha"
        class="captcha-canvas"
      ></canvas>
      <button 
        type="button"
        @click="refreshCaptcha" 
        class="refresh-btn"
        :title="isEn ? 'Refresh Captcha' : '刷新验证码'"
      >
        🔄
      </button>
    </div>
    <input 
      v-model="userInput"
      @input="handleInput"
      type="text" 
      :placeholder="placeholder"
      class="captcha-input"
      maxlength="4"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const isEn = computed(() => lang.value.startsWith('en'))

const props = defineProps({
  width: {
    type: Number,
    default: 120
  },
  height: {
    type: Number,
    default: 40
  },
  placeholder: {
    type: String,
    default: '请输入验证码'
  }
})

const emit = defineEmits(['update:modelValue', 'validate'])

const captchaCanvas = ref(null)
const captchaCode = ref('')
const userInput = ref('')

// 生成随机验证码
const generateCaptcha = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // 排除易混淆字符
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

// 绘制验证码
const drawCaptcha = () => {
  if (!captchaCanvas.value) return
  
  const canvas = captchaCanvas.value
  const ctx = canvas.getContext('2d')
  
  // 清空画布
  ctx.clearRect(0, 0, props.width, props.height)
  
  // 背景渐变
  const gradient = ctx.createLinearGradient(0, 0, props.width, props.height)
  gradient.addColorStop(0, '#f0f4f8')
  gradient.addColorStop(1, '#e8eef5')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, props.width, props.height)
  
  // 生成新验证码
  captchaCode.value = generateCaptcha()
  
  // 绘制干扰线
  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = `rgba(${Math.random() * 150}, ${Math.random() * 150}, ${Math.random() * 150}, 0.3)`
    ctx.beginPath()
    ctx.moveTo(Math.random() * props.width, Math.random() * props.height)
    ctx.lineTo(Math.random() * props.width, Math.random() * props.height)
    ctx.stroke()
  }
  
  // 绘制验证码文字
  const letters = captchaCode.value.split('')
  letters.forEach((letter, index) => {
    ctx.font = `bold ${20 + Math.random() * 8}px Arial`
    ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 40%)`
    ctx.textBaseline = 'middle'
    
    const x = 15 + index * 25
    const y = props.height / 2
    const angle = (Math.random() - 0.5) * 0.4
    
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.fillText(letter, 0, 0)
    ctx.restore()
  })
  
  // 绘制干扰点
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`
    ctx.beginPath()
    ctx.arc(
      Math.random() * props.width,
      Math.random() * props.height,
      1,
      0,
      2 * Math.PI
    )
    ctx.fill()
  }
}

// 刷新验证码
const refreshCaptcha = () => {
  drawCaptcha()
  userInput.value = ''
  emit('update:modelValue', '')
  emit('validate', false)
}

// 处理用户输入
const handleInput = () => {
  const isValid = userInput.value.toUpperCase() === captchaCode.value
  emit('update:modelValue', userInput.value)
  emit('validate', isValid)
}

// 验证方法(供父组件调用)
const validate = () => {
  return userInput.value.toUpperCase() === captchaCode.value
}

// 重置方法
const reset = () => {
  refreshCaptcha()
}

// 暴露方法给父组件
defineExpose({
  validate,
  reset
})

onMounted(() => {
  drawCaptcha()
})
</script>

<style scoped>
.captcha-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.captcha-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.captcha-canvas {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.captcha-canvas:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.refresh-btn {
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.refresh-btn:hover {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  transform: rotate(180deg);
}

.captcha-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  text-transform: uppercase;
}

.captcha-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.1);
}

.captcha-input::placeholder {
  color: var(--vp-c-text-3);
  text-transform: none;
}
</style>
