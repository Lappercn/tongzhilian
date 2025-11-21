<template>
  <div class="qr-thumb" @click="open = true" :style="{ width: thumbSize + 'px' }">
    <img :src="src" :alt="alt" class="qr-thumb-img" />
    <div class="qr-thumb-tip">点击放大</div>
  </div>
  <Teleport to="body">
    <Transition name="qr-modal">
      <div v-if="open" class="qr-overlay" @click.self="open = false">
        <div class="qr-dialog">
          <img :src="src" :alt="alt" class="qr-full-img" :style="{ width: fullSize + 'px' }" />
          <div class="qr-actions">
            <a :href="src" :download="downloadName" class="qr-btn">下载二维码</a>
            <button class="qr-btn primary" @click="open = false">关闭</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  thumbSize: { type: [Number, String], default: 220 },
  fullSize: { type: [Number, String], default: 600 },
  downloadName: { type: String, default: 'qrcode' }
})
const open = ref(false)
const thumbSize = typeof props.thumbSize === 'string' ? parseInt(props.thumbSize) : props.thumbSize
const fullSize = typeof props.fullSize === 'string' ? parseInt(props.fullSize) : props.fullSize
const src = props.src
const alt = props.alt
const downloadName = props.downloadName
</script>

<style scoped>
.qr-thumb { display: inline-block; cursor: zoom-in; text-align: center; }
.qr-thumb-img { width: 100%; border-radius: 16px; box-shadow: 0 12px 28px rgba(0,0,0,0.18); }
.qr-thumb-tip { margin-top: 0.35rem; color: var(--vp-c-text-3); font-size: 0.85rem; }

.qr-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 1rem; }
.qr-dialog { background: var(--vp-c-bg); border-radius: 20px; padding: 1.25rem; box-shadow: 0 24px 48px rgba(0,0,0,0.35); }
.qr-full-img { display: block; max-width: 90vw; max-height: 70vh; object-fit: contain; border-radius: 12px; }
.qr-actions { display: flex; gap: 0.75rem; justify-content: center; margin-top: 1rem; }
.qr-btn { padding: 0.6rem 1.1rem; border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); text-decoration: none; font-weight: 600; }
.qr-btn.primary { background: var(--vp-c-brand-1); color: #fff; border-color: transparent; }
.qr-btn:hover { filter: brightness(1.03); }

.qr-modal-enter-active, .qr-modal-leave-active { transition: all 0.2s ease; }
.qr-modal-enter-from, .qr-modal-leave-to { opacity: 0; transform: scale(0.98); }

@media (max-width: 600px) {
  .qr-dialog { width: calc(100vw - 2rem); padding: 0.75rem; }
  .qr-actions { flex-direction: column; }
  .qr-btn { width: 100%; text-align: center; }
}
</style>
