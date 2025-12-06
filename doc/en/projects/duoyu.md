---
title: DuoYu Finance
description: AI-Driven Multi-Agent Stock Investment Advisory System
outline: deep
---

# DuoYu Finance - AI-Driven Multi-Agent Stock Investment Advisory System

![version](https://img.shields.io/badge/version-1.0.0-blue)
![license](https://img.shields.io/badge/license-MIT-green)
![status](https://img.shields.io/badge/status-stable-success)

## 📖 Project Introduction

**DuoYu Finance** is a next-generation intelligent investment advisory system based on **AI Agent** technology. It breaks the limitations of traditional AI advisors that only provide simple Q&A. By building a virtual professional investment research team consisting of a **Chief Intelligence Officer, Bull Analyst, Bear Risk Officer, and Senior Moderator**, it simulates the decision-making process of top fund companies.

The system can not only retrieve real-time market data and news but also demonstrate the logical conflicts and trade-offs behind investment decisions through a "left-hand vs. right-hand" debate mechanism, providing transparent, deep, and objective investment advice.

## 🌐 Online Demo

👉 **Visit Online Demo**: <a href="https://tongzhilian.cn/duoyu/" target="_blank">https://tongzhilian.cn/duoyu/</a>

---

## 🌟 Core Highlights

### 1. 🚀 Real-Time Data Driven
Reject "hallucinations"! Our **Consultant Agent** has real-time web search capabilities.
- **Second-level Market Data**: Real-time acquisition of core indicators such as stock prices, changes, volume, and turnover rates.
- **Breaking News**: Instantly capture industry policies, company announcements, and market rumors affecting stock prices.
- **Data Traceability**: All analysis is based on real news links and data sources attached in the report, verifiable.

### 2. ⚔️ Multi-Agent Debate
We make the decision process transparent, simulating real investment research meetings:
- **🐂 Bull Agent**: Wearing "optimistic filters", digging for undervaluation, high growth potential, and moat advantages, looking for buying opportunities.
- **🐻 Bear Agent**: Wearing "pessimistic filters", auditing high valuation bubbles, technical breakdowns, and macro risks, issuing warnings.
- **🎤 Host Agent**: Guiding the fierce debate between the two sides, digging out logical loopholes, and finally giving a fair ruling based on the arguments of both sides.

### 3. 🎙️ Immersive Interaction
- **3D Virtual Digital Humans**: Each agent has a unique 3D image and personality traits.
- **Real-time Voice (TTS)**: Integrated with Volcano Engine ultra-realistic speech synthesis, talking to you like a real advisor.
- **Dynamic Visual Reports**: Transforming complex financial data into intuitive dashboards and radar charts.

---

## 🛠️ Tech Architecture

This project adopts a frontend-backend separation architecture, strictly following high cohesion and low coupling design principles.

### Frontend
- **Framework**: Vue 3 + Vite
- **UI Library**: Element Plus
- **3D Engine**: Three.js (Supports Draco compression models, extremely fast loading)
- **State Management**: Pinia
- **Router**: Vue Router

### Backend
- **Runtime**: Node.js
- **Web Framework**: Express
- **Database**: MongoDB (Persistent storage of research reports and history)
- **LLM Base**: Integrated Doubao LLM API, with powerful web search and logical reasoning capabilities.
- **Voice Service**: Volcano Engine TTS (Text-to-Speech)

### Deployment & Ops
- **Containerization**: Docker + Docker Compose full-stack containerized deployment.
- **Reverse Proxy**: Nginx (Supports dynamic DNS resolution and SSL configuration).
- **Automation Scripts**: Provides one-click deployment script `deploy_reset.sh`, supporting environment auto-cleaning and reset.

---

## 🚀 Quick Start

### Requirements
- Linux / Windows (WSL2)
- Docker & Docker Compose
- Node.js 18+ (Only for local development)

### Deployment Steps

1. **Clone Project**
   ```bash
   git clone https://github.com/Lappercn/duoyu.git
   cd duoyu
   ```

2. **Configure Env Vars**
   Create `.env` file in `backend` directory:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/duoyu
   
   # LLM Config (Doubao)
   DOUBAO_API_KEY=your_api_key
   DOUBAO_MODEL_VERSION=your_model_version
   
   # TTS Config (Volcano Engine)
   TTS_APPID=your_appid
   TTS_ACCESS_TOKEN=your_access_token
   TTS_CLUSTER=volcano_tts
   TTS_SECRET_KEY=your_secret_key
   ```

3. **One-Click Deployment**
   ```bash
   chmod +x deploy_reset.sh
   ./deploy_reset.sh
   ```
   The script will auto-clean old containers, create networks, start MongoDB, build frontend, and start backend services.

4. **Access System**
   Open browser: `http://localhost/duoyu/` (or server IP)

---

## 📂 Directory Structure

```
duoyu-finance/
├── backend/                # Backend Service
│   ├── src/
│   │   ├── controllers/    # API Controllers
│   │   ├── services/       # Core Logic (Agent Orchestrator, LLM, TTS)
│   │   └── models/         # MongoDB Models
│   └── ...
├── frontend/               # Frontend App
│   ├── src/
│   │   ├── components/     # Vue Components (3D Models, Reports)
│   │   ├── views/          # Page Views
│   │   └── ...
│   └── public/             # Static Assets
├── docs/                   # Project Docs
├── deploy_reset.sh         # Auto Deploy Script
├── nginx_full.conf         # Nginx Config
└── ...
```

---

## 🤝 Contribution

Welcome to submit Issues or Pull Requests!
1. Fork this repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Submit Pull Request

---

## 📄 License

This project is open source under the [MIT License](https://opensource.org/licenses/MIT).

GitHub Repository: [https://github.com/Lappercn/duoyu.git](https://github.com/Lappercn/duoyu.git)
