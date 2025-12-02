---
layout: home
outline: false

hero:
  name: "NexCore"
  text: "Future Within Reach"
  tagline: Chongqing · Focusing on AI Implementation & Full-Stack Engineering · Delivering Excellence
  image:
    src: /logo.png
    alt: NexCore Logo
  actions:
    - theme: brand
      text: Explore Team
      link: /en/team
    - theme: alt
      text: Core Tech
      link: /en/api-examples
    - theme: alt
      text: Success Stories
      link: /en/projects
    - theme: brand
      text: Join Us
      link: /en/join-us

features:
  - icon: ⚡️
    title: Rapid Full-Stack Dev
    details: Modern tech stack based on Vue3 + Flask/FastAPI. From prototype to production, we pursue extreme delivery speed and code quality.
  - icon: 🧠
    title: AI Deep Empowerment
    details: More than just API calls. We possess core capabilities in model fine-tuning, RAG knowledge base construction, and MLOps engineering.
  - icon: 🛠️
    title: Rigorous Engineering
    details: Adhering to RESTful API contracts, CI/CD automated pipelines, and full-link monitoring to ensure robust system operation.
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #2563eb 30%, #4f46e5);
}
</style>

<div style="margin-top: 4rem;">
  <h2 style="text-align: center; font-size: 2rem; font-weight: 800; margin-bottom: 1rem;">Team Moments</h2>
  <p style="text-align: center; color: var(--vp-c-text-2); margin-bottom: 3rem; max-width: 600px; margin-left: auto; margin-right: auto;">
    Beyond work, we love life. From snowy mountains to the seaside, recording every wonderful moment.
  </p>
  <TeamGallery :limit="6" :isHome="true" />
</div>

<div class="join-us-section">
  <div class="join-us-content">
    <h2 class="join-us-title">Join Us</h2>
    <p class="join-us-subtitle">
      Become a member of NexCore, create the future together
    </p>
    <p class="join-us-description">
      We are looking for passionate Full Stack Engineers, AI Algorithm Engineers, and Product Designers.<br>
      If you love technology and pursue excellence, welcome to join our team!
    </p>
    <div class="join-us-actions">
      <a href="/en/team" class="join-us-btn primary">Meet the Team</a>
      <a href="mailto:shibaizhelianmeng@163.com" class="join-us-btn secondary">Send Resume</a>
      <a href="/en/join-us" class="join-us-btn primary" style="margin-left:0.5rem;">Contact Us</a>
    </div>
  </div>
</div>

<div style="margin-top: 2rem;">
  <AddMemberForm />
  <p style="text-align:center;color:var(--vp-c-text-2);margin-top:0.5rem;">Key required to join. Please contact via email or WeChat to get the key before submitting. Go to <a href="/en/join-us">Join Us</a> for contact info.</p>
</div>

<style scoped>
.join-us-section {
  margin: 6rem auto 4rem;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  max-width: 1200px;
  position: relative;
  overflow: hidden;
}

.join-us-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: pulse 8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

.join-us-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
}

.join-us-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.join-us-subtitle {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  opacity: 0.95;
}

.join-us-description {
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.join-us-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.join-us-btn {
  display: inline-block;
  padding: 0.875rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.join-us-btn.primary {
  background: white;
  color: #667eea;
}

.join-us-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  background: #f8f9fa;
}

.join-us-btn.secondary {
  background: rgba(255,255,255,0.2);
  color: white;
  border: 2px solid white;
  backdrop-filter: blur(10px);
}

.join-us-btn.secondary:hover {
  transform: translateY(-2px);
  background: rgba(255,255,255,0.3);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

@media (max-width: 768px) {
  .join-us-section {
    margin: 4rem 1rem 2rem;
    padding: 3rem 1.5rem;
  }
  
  .join-us-title {
    font-size: 2rem;
  }
  
  .join-us-subtitle {
    font-size: 1.1rem;
  }
  
  .join-us-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .join-us-btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>
