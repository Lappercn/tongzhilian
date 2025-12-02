<script setup>
import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'

const { Layout } = DefaultTheme

onMounted(async () => {
  // 仅在根路径执行检查 (Only check on root path)
  if (typeof window === 'undefined') return
  const path = window.location.pathname.replace(/\/$/, '')
  // 允许 / 或 /index.html
  if (path !== '' && path !== '/index.html') return

  console.log('[NexCore] Starting language detection...')

  // 1. 检查本地存储 (Check localStorage)
  // 如果用户之前已经访问过并被重定向，或者手动切换了语言（需配合语言切换按钮存储状态，这里先假设重定向会存）
  const STORAGE_KEY = 'nexcore-lang-pref'
  if (localStorage.getItem(STORAGE_KEY)) {
    console.log('[NexCore] Language preference found in localStorage:', localStorage.getItem(STORAGE_KEY))
    return
  }

  try {
    // 2. 尝试通过 IP 判断 (Try IP detection)
    // 由于这是静态站点运行在浏览器端，无法直接使用 maxmind 等服务端库读取本地数据库
    // 我们使用免费且稳定的 GeoIP API 来实现相同功能
    
    // 优先使用 GeoJS (速度快，专门用于简单国家判断)
    const checkGeo = async () => {
      try {
        console.log('[NexCore] Requesting GeoJS...')
        const res = await fetch('https://get.geojs.io/v1/ip/country.json')
        if (res.ok) {
          const data = await res.json()
          console.log('[NexCore] GeoJS response:', data)
          // 优先使用 ISO code (country), 备用全名 (name)
          return data.country || data.name
        }
      } catch (e) {
        console.warn('[NexCore] GeoJS check failed, trying fallback...', e)
      }
      
      // 备用方案: ipapi.co
      try {
        console.log('[NexCore] Requesting ipapi.co fallback...')
        const res = await fetch('https://ipapi.co/json/')
        if (res.ok) {
          const data = await res.json()
          console.log('[NexCore] ipapi response:', data)
          return data.country_code || data.country_name
        }
      } catch (e) {
        console.warn('[NexCore] All GeoIP checks failed', e)
      }
      return null
    }

    const countryResult = await checkGeo()
    console.log('[NexCore] Detected Country:', countryResult)
    
    if (countryResult) {
      const upper = countryResult.toUpperCase()
      // 如果不是中国 (CN 或 CHINA)，则重定向到英文版
      if (upper !== 'CN' && upper !== 'CHINA') {
        console.log(`[NexCore] Detected country: ${countryResult}, redirecting to English...`)
        localStorage.setItem(STORAGE_KEY, 'en')
        window.location.href = '/en/'
        return
      } else {
        console.log('[NexCore] Detected China IP, staying on Chinese version.')
        localStorage.setItem(STORAGE_KEY, 'zh')
      }
    }
  } catch (e) {
    console.warn('[NexCore] IP detection error:', e)
    // 3. 降级策略：检查浏览器语言 (Fallback: Check browser language)
    const lang = navigator.language || navigator.userLanguage
    if (lang && !lang.startsWith('zh')) {
      console.log(`Fallback to browser lang: ${lang}, redirecting to English...`)
      localStorage.setItem(STORAGE_KEY, 'en')
      window.location.href = '/en/'
      return
    }
  }
  
  // 默认为中文，记录状态避免重复检查
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, 'zh')
  }
})
</script>

<template>
  <Layout />
</template>
