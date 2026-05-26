# 🌌 Pathlume — AI-Powered EdTech Platform

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Pathlume is a cutting-edge, adaptive e-learning ecosystem designed to dismantle the rigid structures of traditional education. By analyzing real-time user performance and behavior, Pathlume dynamically crafts **personalized learning paths**, deploys **adaptive assessments**, and integrates **gamified feedback loops** to ensure optimized skill mastery.

---

## 🚀 Key Features & Interface

### 1. Frictionless Onboarding & Secure Authentication
![Login Screen](./Screenshots/Login.jpeg)
A streamlined, high-converting entry point supporting standard credential creation alongside single-sign-on (SSO) OAuth integrations via **Google** and **GitHub**. Real-time form state validation prevents faulty data entry at the baseline layer.

### 2. AI-Powered Dynamic Recommendation Engine
![Recommendation Engine](./Screenshots/Recommendation.jpeg)
Pathlume constantly runs analytics behind the scenes. Based on your immediate quiz performance and behavioral telemetry, the recommendation engine flags conceptual gaps (e.g., catching structural weaknesses in *Data Structures*) and dynamically injects target practice modules to reinforce understanding before letting learners advance.

### 3. Adaptive Assessment & Real-Time Feedback
![Assessment Screen](./Screenshots/Assessment.jpeg)
Assessment sheets break away from static question pools. Quizzes adapt in difficulty based on previous answers. The dashboard offers immediate, contextual error handling, letting users know instantly why an answer is incorrect and tracking historical telemetry to build custom review lists.

### 4. Gamified Progress Mechanics & Streak Rewards
![Achievements Screen](./Screenshots/Achievements.jpeg)
To maximize retention and platform stickiness, Pathlume features a complete RPG-style leveling system (`Apprentice` to advanced tiers), granular XP progress metrics, badging architecture, and compound daily streak milestones backed by claimable XP rewards.

---

## 🛠️ System Architecture

Pathlume is built on a modern, decoupled tech stack designed to scale seamlessly under heavy concurrent user loads.

![System Architecture](./Screenshots/Architecture.jpeg)

### Core Architecture Pipeline
1. **User Onboarding:** Secure profile initialization & objective mapping.
2. **Input Validation:** High-speed processing layer for real-time form sanitization.
3. **AI Recommendation Engine:** Deep behavioral and performance intelligence computation.
4. **Personalized Learning Path:** Structural execution of a tailored, step-by-step syllabus.
5. **Quiz & Assessment Module:** Adaptive evaluation matrix with conditional question routing.
6. **Real-Time Feedback System:** Prompt analytical insights and actionable improvement vectors.
7. **Achievement Tracking:** High-speed update ledger managing gamified badges & state progression.
8. **User Dashboard:** Aggregated data visualizer highlighting analytics, time-tracking, and next steps.

### Backend & Infrastructure Layer
* **Cloud Hosting:** Highly available, low-latency globally distributed web deployments.
* **Database:** Structured relational schema mapping complex user profiles, historical metrics, and relational learning node graphs.
* **AI/ML Engine:** Intelligent inference modeling computing real-time course recommendations.
* **RESTful API Handling:** Fast, secure, asynchronous API communication channels.

---

## 💎 Engineering Highlights

* 🔒 **Protected Routing:** Secure, middleware-driven role-based access tokens governing exclusive modules, dashboard views, and administrative controls.
* ⚡ **Efficient State Management:** Global app state managed with peak performance in mind, ensuring snappy UI updates, persistence across sessions, and minimal re-renders.
* 📦 **Reusable Component Architecture:** Built using highly modular, atomic design principles allowing for rapid code scalability, code clarity, and structural reuse.
* 🎨 **UI/UX Excellence:** Custom, immersive dark-cyberpunk glassmorphic aesthetics engineered with pixel-perfect responsive Tailwind CSS layouts.

---

## 🛠️ Installation & Local Setup

To clone and run this application locally on your machine, follow these steps:

### Prerequisites
Make sure you have **Node.js** (v18 or higher) and **npm** installed.

### Steps
1. **Install Dependencies:**
   ```bash
   npm install
