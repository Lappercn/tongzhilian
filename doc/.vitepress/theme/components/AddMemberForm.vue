<template>
  <div class="add-member-form">
    <!-- 触发按钮 -->
    <button 
      v-if="!showForm" 
      @click="openForm" 
      class="add-member-btn"
    >
      <span class="btn-icon">➕</span>
      <span>{{ t('joinBtn') }}</span>
    </button>

    <!-- 表单弹窗 -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showForm" class="modal-overlay" @click.self="closeForm">
          <div class="modal-container">
            <div class="modal-header">
              <h2>{{ t('modalTitle') }}</h2>
              <button @click="closeForm" class="close-btn">✕</button>
            </div>

            <form @submit.prevent="handleSubmit" class="member-form">
              <!-- 姓名 -->
              <div class="form-group">
                <label for="name">{{ t('name') }} <span class="required">*</span></label>
                <input 
                  id="name"
                  v-model="formData.name"
                  type="text"
                  :placeholder="t('namePlaceholder')"
                  required
                  maxlength="20"
                />
              </div>

              <!-- 角色/职位 -->
              <div class="form-group">
                <label for="role">{{ t('role') }} <span class="required">*</span></label>
                <input 
                  id="role"
                  v-model="formData.role"
                  type="text"
                  :placeholder="t('rolePlaceholder')"
                  required
                  maxlength="50"
                />
              </div>

              <!-- 个人简介 -->
              <div class="form-group">
                <label for="desc">{{ t('desc') }} <span class="required">*</span></label>
                <textarea 
                  id="desc"
                  v-model="formData.desc"
                  :placeholder="t('descPlaceholder')"
                  required
                  rows="4"
                  maxlength="200"
                ></textarea>
                <div class="char-count">{{ formData.desc.length }}/200</div>
              </div>

              <!-- 技能标签 -->
              <div class="form-group">
                <label for="tags">{{ t('tags') }} <span class="required">*</span></label>
                <div class="tags-input-wrapper">
                  <div class="tags-display">
                    <span 
                      v-for="(tag, index) in formData.tags" 
                      :key="index"
                      class="tag-item"
                    >
                      {{ tag }}
                      <button 
                        type="button"
                        @click="removeTag(index)"
                        class="tag-remove"
                      >×</button>
                    </span>
                  </div>
                  <div class="tag-input-row">
                    <input 
                      id="tags"
                      v-model="currentTag"
                      @keydown.enter.prevent="addTag"
                      type="text"
                      :placeholder="t('tagsPlaceholder')"
                      maxlength="20"
                      :disabled="formData.tags.length >= 6"
                    />
                    <button 
                      type="button"
                      @click="addTag"
                      class="add-tag-btn"
                      :disabled="formData.tags.length >= 6 || !currentTag.trim()"
                    >
                      {{ t('addTagBtn') }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- 照片上传 -->
              <div class="form-group">
                <label for="photo">{{ t('photo') }} <span class="required">*</span></label>
                <div class="upload-area">
                  <input 
                    id="photo"
                    ref="fileInput"
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    @change="handleFileChange"
                    hidden
                  />
                  
                  <div v-if="!previewUrl" class="upload-placeholder" @click="triggerFileInput">
                    <div class="upload-icon">📷</div>
                    <p>{{ t('uploadHint') }}</p>
                    <p class="upload-hint">{{ t('uploadFormat') }}</p>
                  </div>
                  
                  <div v-else class="preview-container">
                    <img :src="previewUrl" alt="预览" class="preview-image" />
                    <div class="preview-actions">
                      <button type="button" @click="triggerFileInput" class="change-btn">
                        {{ t('changePhoto') }}
                      </button>
                      <button type="button" @click="removePhoto" class="remove-btn">
                        {{ t('deletePhoto') }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 加入密钥 -->
              <div class="form-group">
                <label for="accessKey">{{ t('accessKey') }} <span class="required">*</span></label>
                <div class="key-input-wrapper">
                  <input 
                    id="accessKey"
                    v-model="accessKey"
                    :type="showKey ? 'text' : 'password'"
                    :placeholder="t('keyPlaceholder')"
                    required
                    class="key-input"
                  />
                  <button 
                    type="button"
                    @click="showKey = !showKey"
                    class="toggle-key-btn"
                    :title="showKey ? 'Hide' : 'Show'"
                  >
                    {{ showKey ? '👁️' : '👁️‍🗨️' }}
                  </button>
                </div>
                <div class="key-hint">
                  💡 {{ t('keyHint') }}
                </div>
                <div v-if="keyError" class="error-message">
                  {{ keyError }}
                </div>
              </div>

              <!-- 验证码 -->
              <div class="form-group">
                <label>{{ t('captcha') }} <span class="required">*</span></label>
                <CaptchaInput 
                  ref="captchaRef"
                  :placeholder="t('captchaPlaceholder')"
                  @validate="handleCaptchaValidate"
                />
                <div v-if="captchaError" class="error-message">
                  {{ captchaError }}
                </div>
              </div>

              <!-- 提交按钮 -->
              <div class="form-actions">
                <button 
                  type="button" 
                  @click="closeForm"
                  class="btn btn-cancel"
                >
                  {{ t('cancel') }}
                </button>
                <button 
                  type="submit" 
                  class="btn btn-submit"
                  :disabled="isSubmitting"
                >
                  <span v-if="!isSubmitting">{{ t('submit') }}</span>
                  <span v-else class="loading">
                    <span class="spinner"></span>
                    {{ t('submitting') }}
                  </span>
                </button>
              </div>
            </form>

            <!-- 提交成功提示 -->
            <Transition name="fade">
              <div v-if="submitSuccess" class="success-overlay">
                <div class="success-message">
                  <div class="success-icon">✓</div>
                  <h3>{{ t('successTitle') }}</h3>
                  <p>{{ t('successMsg') }}</p>
                  <button @click="resetForm" class="btn btn-primary">
                    {{ t('continue') }}
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import { useData } from 'vitepress'
import CaptchaInput from './CaptchaInput.vue'
import accessKeysConfig from '../../config/access-keys.json'

const { lang } = useData()
const isEn = computed(() => lang.value.startsWith('en'))

const t = (key) => {
  const texts = {
    joinBtn: { zh: '加入我们的团队', en: 'Join Our Team' },
    modalTitle: { zh: '加入团队', en: 'Join Team' },
    name: { zh: '姓名', en: 'Name' },
    namePlaceholder: { zh: '请输入您的姓名', en: 'Enter your name' },
    role: { zh: '角色/职位', en: 'Role/Position' },
    rolePlaceholder: { zh: '例如: 前端开发工程师', en: 'e.g. Frontend Engineer' },
    desc: { zh: '个人简介', en: 'Bio' },
    descPlaceholder: { zh: '请简要介绍您的技能和经验...', en: 'Briefly introduce your skills and experience...' },
    tags: { zh: '技能标签', en: 'Skills' },
    tagsPlaceholder: { zh: '输入技能后按回车添加 (最多6个)', en: 'Press Enter to add (Max 6)' },
    addTagBtn: { zh: '添加', en: 'Add' },
    photo: { zh: '个人照片', en: 'Photo' },
    uploadHint: { zh: '点击上传照片', en: 'Click to upload' },
    uploadFormat: { zh: '支持 JPG、PNG、WEBP 格式', en: 'Supports JPG, PNG, WEBP' },
    changePhoto: { zh: '更换照片', en: 'Change' },
    deletePhoto: { zh: '删除', en: 'Delete' },
    accessKey: { zh: '加入密钥', en: 'Access Key' },
    keyPlaceholder: { zh: '请输入团队提供的加入密钥', en: 'Enter the access key' },
    keyHint: { zh: '加入需密钥，请通过"加入我们"页获取或联系管理员', en: 'Access Key required, please contact admin or check "Join Us" page' },
    captcha: { zh: '验证码', en: 'Captcha' },
    captchaPlaceholder: { zh: '请输入验证码', en: 'Enter Captcha' },
    cancel: { zh: '取消', en: 'Cancel' },
    submit: { zh: '提交申请', en: 'Submit Application' },
    submitting: { zh: '提交中...', en: 'Submitting...' },
    successTitle: { zh: '提交成功!', en: 'Success!' },
    successMsg: { zh: '您的申请已提交,我们会尽快审核。', en: 'Application submitted, we will review it soon.' },
    continue: { zh: '继续添加', en: 'Add Another' },
    required: { zh: '请填写所有必填项', en: 'Please fill in all required fields' },
    duplicate: { zh: '该成员已存在,请勿重复添加', en: 'Member already exists' },
    keyError: { zh: '密钥错误,请输入正确的团队加入密钥', en: 'Invalid Access Key' },
    captchaError: { zh: '验证码错误,请重新输入', en: 'Invalid Captcha, please try again' },
    uploadError: { zh: '请上传 JPG、PNG 或 WEBP 格式的图片', en: 'Please upload JPG, PNG or WEBP image' }
  }
  return texts[key]?.[isEn.value ? 'en' : 'zh'] || key
}

const showForm = ref(false)
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const captchaError = ref('')
const isCaptchaValid = ref(false)
const keyError = ref('')
const accessKey = ref('')
const showKey = ref(false)

// 从配置文件获取有效密钥列表
const validAccessKeys = accessKeysConfig.keys || []

// 验证密钥是否有效
const validateAccessKey = (key) => {
  if (!key || !key.trim()) {
    return false
  }
  // 不区分大小写比较
  return validAccessKeys.some(validKey => 
    validKey.toUpperCase() === key.trim().toUpperCase()
  )
}

const formData = reactive({
  name: '',
  role: '',
  desc: '',
  tags: [],
  photo: null
})

const currentTag = ref('')
const previewUrl = ref('')
const fileInput = ref(null)
const captchaRef = ref(null)

// 通过本地开发服务器 API 读写 JSON 文件
const getStoredMembers = async () => {
  try {
    const res = await fetch('/api/members', { method: 'GET' })
    if (!res.ok) throw new Error('读取成员数据失败')
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('读取成员数据失败:', error)
    return []
  }
}

const saveMembers = async (members) => {
  try {
    const res = await fetch('/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(members)
    })
    if (!res.ok) throw new Error('保存成员数据失败')
    // 触发自定义事件,通知 TeamMembers 组件更新
    window.dispatchEvent(new CustomEvent('members-updated', { detail: members }))
  } catch (error) {
    console.error('保存成员数据失败:', error)
    throw new Error('保存失败,请检查本地服务是否运行')
  }
}

// 打开表单
const openForm = () => {
  showForm.value = true
  document.body.style.overflow = 'hidden'
}

// 关闭表单
const closeForm = () => {
  if (!isSubmitting.value) {
    showForm.value = false
    document.body.style.overflow = ''
    if (!submitSuccess.value) {
      resetForm()
    }
  }
}

// 路由切换/组件卸载时恢复滚动
onUnmounted(() => {
  document.body.style.overflow = ''
})

// 添加标签
const addTag = () => {
  const tag = currentTag.value.trim()
  if (tag && formData.tags.length < 6 && !formData.tags.includes(tag)) {
    formData.tags.push(tag)
    currentTag.value = ''
  }
}

// 删除标签
const removeTag = (index) => {
  formData.tags.splice(index, 1)
}

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value?.click()
}

// 处理文件选择
const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // 验证文件类型
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
  if (!validTypes.includes(file.type)) {
    alert(t('uploadError'))
    return
  }

  formData.photo = file

  // 生成预览
  const reader = new FileReader()
  reader.onload = (e) => {
    previewUrl.value = e.target.result
  }
  reader.readAsDataURL(file)
}

// 删除照片
const removePhoto = () => {
  formData.photo = null
  previewUrl.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// 验证码验证回调
const handleCaptchaValidate = (isValid) => {
  isCaptchaValid.value = isValid
  if (isValid) {
    captchaError.value = ''
  }
}

// 将图片转换为 base64
const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// 提交表单
const handleSubmit = async () => {
  // 先验证密钥
  if (!validateAccessKey(accessKey.value)) {
    keyError.value = t('keyError')
    return
  }
  keyError.value = ''

  // 验证验证码
  if (!captchaRef.value?.validate()) {
    captchaError.value = t('captchaError')
    return
  }

  // 验证必填项
  if (!formData.name || !formData.role || !formData.desc || formData.tags.length === 0 || !formData.photo) {
    alert(t('required'))
    return
  }

  isSubmitting.value = true
  captchaError.value = ''

  try {
    // 将图片转换为 base64
    const photoBase64 = await convertImageToBase64(formData.photo)

    // 创建新成员对象
    const newMember = {
      name: formData.name,
      role: formData.role,
      avatar: formData.name.charAt(0), // 使用姓名首字母作为默认头像
      desc: formData.desc,
      tags: [...formData.tags],
      photo: photoBase64, // 保存 base64 图片
      addedAt: new Date().toISOString(), // 添加时间戳
      isNewMember: true // 标记为新添加的成员
    }

    // 获取现有成员数据
    const existingMembers = await getStoredMembers()

    // 检查是否已存在同名成员
    const isDuplicate = existingMembers.some(member => member.name === newMember.name)
    if (isDuplicate) {
      alert(t('duplicate'))
      isSubmitting.value = false
      return
    }

    // 添加新成员
    const updatedMembers = [...existingMembers, newMember]

    // 保存到 localStorage
    await saveMembers(updatedMembers)

    console.log('成员添加成功:', newMember)

    submitSuccess.value = true
    
    // 3秒后自动关闭
    setTimeout(() => {
      if (submitSuccess.value) {
        closeForm()
        submitSuccess.value = false
      }
    }, 3000)

  } catch (error) {
    console.error('提交失败:', error)
    alert(error.message || '提交失败,请稍后重试')
  } finally {
    isSubmitting.value = false
  }
}

// 重置表单
const resetForm = () => {
  formData.name = ''
  formData.role = ''
  formData.desc = ''
  formData.tags = []
  formData.photo = null
  currentTag.value = ''
  previewUrl.value = ''
  captchaError.value = ''
  isCaptchaValid.value = false
  submitSuccess.value = false
  accessKey.value = ''
  keyError.value = ''
  showKey.value = false
  
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  
  captchaRef.value?.reset()
}

</script>

<style scoped>
.add-member-form {
  margin: 2rem 0;
}

.add-member-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.3);
}

.add-member-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(var(--vp-c-brand-rgb), 0.4);
}

.btn-icon {
  font-size: 1.3rem;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* 模态框 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  overflow-y: auto;
}

.modal-container {
  background: var(--vp-c-bg);
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--vp-c-divider);
  position: sticky;
  top: 0;
  background: var(--vp-c-bg);
  z-index: 1;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--vp-c-text-1);
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--vp-c-text-2);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

/* 表单 */
.member-form {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.required {
  color: #f56c6c;
}

.form-group input[type="text"],
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.1);
}

.char-count {
  text-align: right;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
  margin-top: 0.25rem;
}

/* 标签输入 */
.tags-input-wrapper {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.5rem;
  background: var(--vp-c-bg);
}

.tags-display {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  min-height: 32px;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 6px;
  font-size: 0.875rem;
}

.tag-remove {
  background: none;
  border: none;
  color: var(--vp-c-brand-1);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.tag-remove:hover {
  background: var(--vp-c-brand-1);
  color: white;
}

.tag-input-row {
  display: flex;
  gap: 0.5rem;
}

.tag-input-row input {
  flex: 1;
  border: none;
  padding: 0.5rem;
  background: transparent;
  color: var(--vp-c-text-1);
}

.tag-input-row input:focus {
  outline: none;
}

.add-tag-btn {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.add-tag-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
}

.add-tag-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 上传区域 */
.upload-area {
  border: 2px dashed var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.upload-area:hover {
  border-color: var(--vp-c-brand-1);
}

.upload-placeholder {
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-placeholder:hover {
  background: var(--vp-c-bg-soft);
}

.upload-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.upload-placeholder p {
  margin: 0.5rem 0;
  color: var(--vp-c-text-2);
}

.upload-hint {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.preview-container {
  position: relative;
}

.preview-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.preview-actions {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
}

.change-btn,
.remove-btn {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.change-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.remove-btn:hover {
  border-color: #f56c6c;
  color: #f56c6c;
}

/* 密钥输入 */
.key-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.key-input {
  flex: 1;
  padding: 0.75rem;
  padding-right: 3rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: 'Courier New', monospace;
  letter-spacing: 0.1em;
}

.key-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.1);
}

.toggle-key-btn {
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.3s ease;
  opacity: 0.6;
}

.toggle-key-btn:hover {
  opacity: 1;
  background: var(--vp-c-bg-soft);
}

.key-hint {
  margin-top: 0.75rem;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}
.key-hint::before {
  content: '🔑';
  font-size: 1.1rem;
}
.key-hint a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
}
.key-hint a:hover {
  text-decoration: underline;
}

/* 错误消息 */
.error-message {
  margin-top: 0.5rem;
  color: #f56c6c;
  font-size: 0.875rem;
}

/* 表单操作按钮 */
.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.btn {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.btn-cancel:hover {
  background: var(--vp-c-bg-mute);
}

.btn-submit {
  background: var(--vp-c-brand-1);
  color: white;
}

.btn-submit:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.3);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 成功提示 */
.success-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.98);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  z-index: 10;
}

.dark .success-overlay {
  background: rgba(26, 26, 26, 0.98);
}

.success-message {
  text-align: center;
  padding: 2rem;
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, #67c23a, #85ce61);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  animation: scaleIn 0.5s ease;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.success-message h3 {
  margin: 0 0 0.5rem;
  color: var(--vp-c-text-1);
}

.success-message p {
  margin: 0 0 1.5rem;
  color: var(--vp-c-text-2);
}

.btn-primary {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 0.75rem 2rem;
}

.btn-primary:hover {
  background: var(--vp-c-brand-2);
}

/* 过渡动画 */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9) translateY(-20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .modal-container {
    max-height: 95vh;
    max-width: none;
    width: calc(100vw - 2rem);
    border-radius: 12px;
  }

  .member-form {
    padding: 1rem;
  }

  .preview-image {
    height: 220px;
  }

  .form-actions {
    flex-direction: column;
  }

  .add-member-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
