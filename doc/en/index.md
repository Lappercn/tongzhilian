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
  <h2 style="text-align: center; font-size: 2rem; font-weight: 800; margin-bottom: 1rem;">Featured Projects</h2>
  <p style="text-align: center; color: var(--vp-c-text-2); margin-bottom: 3rem; max-width: 600px; margin-left: auto; margin-right: auto;">
    We solve real problems with technology. Here are some of our representative projects.
  </p>
  
  <div class="project-grid">
    <a href="/en/projects/duoyu" class="project-card">
      <div class="project-image">
        <img src="/projects/渝客淞/比赛记录/20251202-123435.jpg" alt="DuoYu Finance" />
      </div>
      <div class="project-content">
        <h3>DuoYu Finance - AI Investment Advisor</h3>
        <p>AI Agent-based multi-role game theory and real-time market analysis system, simulating top fund company decision-making process.</p>
        <div class="project-tags">
          <span>AI Agent</span>
          <span>Vue3</span>
          <span>Python</span>
        </div>
      </div>
    </a>
    <!-- More projects placeholder -->
  </div>
  
  <div style="text-align: center; margin-top: 2rem;">
    <a href="/en/projects" class="vp-button medium brand">View More Projects</a>
  </div>
</div>

<div style="margin-top: 6rem;">
  <h2 style="text-align: center; font-size: 2rem; font-weight: 800; margin-bottom: 1rem;">Team Moments</h2>
  <p style="text-align: center; color: var(--vp-c-text-2); margin-bottom: 3rem; max-width: 600px; margin-left: auto; margin-right: auto;">
    Beyond work, we love life. From snowy mountains to the seaside, recording every wonderful moment.
  </p>
  <TeamGallery :limit="6" :isHome="true" />
</div>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.project-card {
  display: block;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  text-decoration: none !important;
  color: inherit !important;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.1);
  border-color: var(--vp-c-brand);
}

.project-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-content {
  padding: 1.5rem;
}

.project-content h3 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.project-content p {
  margin: 0 0 1rem;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.project-tags span {
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  color: var(--vp-c-text-2);
}

.vp-button {
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  cursor: pointer;
  text-decoration: none;
}

.vp-button.medium {
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
}

.vp-button.brand {
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
}

.vp-button.brand:hover {
  border-color: var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text);
  background-color: var(--vp-button-brand-hover-bg);
}
</style>

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
