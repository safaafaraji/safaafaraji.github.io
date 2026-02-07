# Safaa Faraji | Software Engineer Student Portfolio

![Portfolio Badge](https://img.shields.io/badge/Status-Live-success?style=for-the-badge) ![Tech](https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20JS-blue?style=for-the-badge)

A high-performance, aesthetically pleasing portfolio website designed to showcase software engineering projects and skills. Built with a "Mobile-First" approach, it features clean design, smooth animations, and a professional dark mode.

🔗 **Live Demo:** [https://safaafaraji.github.io/](https://safaafaraji.github.io/)

---

## 📊 Architecture & Flow

This diagram illustrates the structure of the application and how different components interact.

```mermaid
graph TD
    User[User / Visitor] -->|Access| Index[index.html]
    Index -->|Loads| CSS[style.css]
    Index -->|Loads| JS[script.js]
    Index -->|Loads| Assets[Assets / Images]
    
    subgraph "Core Features"
        JS -->|Triggers| GSAP[GSAP Animations]
        JS -->|Manages| Lenis[Lenis Smooth Scroll]
        JS -->|Toggles| Theme[Dark/Light Mode]
        CSS -->|Styles| Grid[Bento Grid Layout]
    end
    
    subgraph "Interactions"
        User -->|Scrolls| Lenis
        User -->|Clicks| Theme
        User -->|Hovers| Grid
    end
```

## 📈 Tech Stack Analysis

A visual breakdown of the technologies and skills highlighted in this portfolio.

```mermaid
pie
    title "Portfolio Tech Composition"
    "HTML5 & Semantic Markup" : 25
    "CSS3 (Variables, Flex/Grid)" : 35
    "JavaScript (Logic & Interactivity)" : 20
    "GSAP (Animations)" : 15
    "Performance Optimization" : 5
```

## ✨ Key Features

- **🎨 Futuristic Design**: Inspired by top-tier portfolios, featuring a "Bento" grid layout and glassmorphism.
- **🌗 Dark/White Mode**: Fully integrated theme switcher with persistent storage.
- **🏎️ Smooth Scrolling**: Powered by Locomotive Scroll / Lenis for a premium feel.
- **📱 Fully Responsive**: Optimized for all devices, including a custom full-screen mobile menu.
- **⚡ Performance**: Lightweight, no heavy frameworks, just pure code quality.

## 🚀 Future Updates (Roadmap)

We are constantly improving. Here is what is coming next:

- [ ] **Backend Integration**: Add a contact form backend (Node.js/Express or EmailJS).
- [ ] **Blog Section**: A space for writing technical articles and tutorials.
- [ ] **3D Elements**: Integrate Three.js for a more immersive 3D hero experience.
- [ ] **Multi-Language Support**: Add French/English toggle.
- [ ] **Project Case Studies**: Dedicated pages for deep-diving into major projects.

## 🛠️ Installation & Modification

1. **Clone the repository**
   ```bash
   git clone https://github.com/safaafaraji/safaafaraji.github.io.git
   ```
2. **Navigate to the folder**
   ```bash
   cd safaafaraji.github.io
   ```
3. **Open `index.html`** in your browser to view locally.

## 📄 License
© 2026 Safaa Faraji. All rights reserved.
