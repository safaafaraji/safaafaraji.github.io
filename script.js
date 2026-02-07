// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scroll (Lenis)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Theme Switcher Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');
const htmlElement = document.documentElement;

// Check Local Storage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Animate the change
    gsap.fromTo(themeIcon,
        { rotate: -90, scale: 0.5, opacity: 0 },
        { rotate: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('ri-moon-line');
        themeIcon.classList.add('ri-sun-line');
    } else {
        themeIcon.classList.remove('ri-sun-line');
        themeIcon.classList.add('ri-moon-line');
    }
}


// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, .bento-card, .magnetic-btn, button');

// Mouse Movement for Cursor
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });

    gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
    });
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        gsap.to(cursor, { scale: 1.5, duration: 0.3 });
    });

    link.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
        gsap.to(cursor, { scale: 1, duration: 0.3 });
    });
});

// Magnetic Buttons Effect
const magneticBtns = document.querySelectorAll('.magnetic-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.3, // Strength of magnetic pull
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});


// Preloader & Init Animations
window.addEventListener('load', () => {

    const preloaderTimeline = gsap.timeline();

    // Preloader Animation
    preloaderTimeline
        .to('.loading-progress', {
            width: '100%',
            duration: 1.5,
            ease: 'power2.inOut'
        })
        .to('.preloader-logo', {
            opacity: 1,
            y: -10,
            duration: 0.5,
            yoyo: true,
            repeat: 1
        }, "-=1.0")
        .to('.preloader', {
            y: '-100%',
            duration: 1,
            ease: 'power4.inOut'
        })
        .add(() => {
            // Trigger Hero Animations after preloader
            initHeroAnimations();
        }, "-=0.2");
});

function initHeroAnimations() {
    // Hero Text Reveal
    const tl = gsap.timeline();

    tl.from('.reveal-text', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out'
    })
        .from('.reveal-img', {
            scale: 0.8,
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out'
        }, "-=0.8");
}

// Scroll Animations for Bento Grid (Separate trigger)
gsap.utils.toArray('.reveal-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
});

// Footer Reveal
gsap.from('.footer-links .link-item', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 70%'
    },
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out'
});

// Mobile Menu Toggle
// Mobile Menu Logic
const hamburger = document.querySelector('.hamburger');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const closeMenuBtn = document.querySelector('.close-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Translation Data
const translations = {
    en: {
        nav_about: "About",
        nav_projects: "Projects",
        nav_skills: "Tech Stack",
        nav_contact: "Contact",
        hero_status: "Available for Opportunities",
        hero_title: "Building <span class='italic-serif'>digital experiences</span> with precision & Code.",
        hero_sub: "I am <strong>Safaa Faraji</strong>, a Software Engineering Student based in Morocco. I specialize in full-stack development, data analysis, and creating intuitive user interfaces.",
        hero_contact: "Get in Touch",
        hero_work: "View Work",
        edu_title: "Education",
        edu_desc1: "Valedictorian. Graduated with Highest Honors.",
        skills_label: "My Skillset",
        skills_title: "It<span class='gradient-text'> Knowledge</span>",
        projects_section: "Selected Projects",
        project_1_desc: "Design and development of a complete simulator for the Motorola 6809 8-bit microprocessor. Allows assembly code execution and real-time visualization of registers and memory. Implements MVC architecture for clear separation of concerns.",
        project_2_desc: "High-performance Optical Character Recognition (OCR) system capable of processing complex documents. Integrates image preprocessing algorithms (binarization, denoising) to improve recognition accuracy.",
        project_3_desc: "Implementation of a virtual environment (Cyber Range) for simulating network attacks and defenses. Scenarios include DDoS attacks, SQL Injection, and traffic analysis with Wireshark.",
        footer_text: "Built with precision.",
        // Blog
        blog_section: "Latest Writings",
        blog_1_title: "Mastering GSAP Animations",
        blog_1_desc: "A deep dive into creating smooth, high-performance web animations using GreenSock.",
        blog_2_title: "Building a Home Lab",
        blog_2_desc: "How I set up my personal Cyber Range for testing network security protocols.",
        read_more: "Read Article"
    },
    fr: {
        nav_about: "À propos",
        nav_projects: "Projets",
        nav_skills: "Compétences",
        nav_contact: "Contact",
        hero_status: "Disponible pour Opportunités",
        hero_title: "Créer des <span class='italic-serif'>expériences numériques</span> avec précision & Code.",
        hero_sub: "Je suis <strong>Safaa Faraji</strong>, étudiante en génie logiciel basée au Maroc. Je me spécialise dans le développement full-stack, l'analyse de données et la création d'interfaces intuitives.",
        hero_contact: "Me Contacter",
        hero_work: "Voir mes travaux",
        edu_title: "Formation",
        edu_desc1: "Major de promotion. Mention Très Bien.",
        skills_label: "Mes Compétences",
        skills_title: "Savoir<span class='gradient-text'> Faire IT</span>",
        projects_section: "Projets Sélectionnés",
        project_1_desc: "Conception et développement d'un simulateur complet pour le microprocesseur 8-bits Motorola 6809. Permet l'exécution de code assembleur, la visualisation des registres et de la mémoire en temps réel. Implémentation de l'architecture MVC pour une séparation claire des responsabilités.",
        project_2_desc: "Système de reconnaissance optique de caractères (OCR) haute performance capable de traiter des documents complexes. Intègre des algorithmes de prétraitement d'image (binaurisation, débruitage) pour améliorer la précision de la reconnaissance.",
        project_3_desc: "Mise en place d'un environnement virtuel (Cyber Range) pour la simulation d'attaques et de défenses réseaux. Scénarios incluant des attaques DDoS, SQL Injection et analyse de trafic avec Wireshark.",
        footer_text: "Conçu avec précision.",
        // Blog
        blog_section: "Derniers Articles",
        blog_1_title: "Maîtriser les Animations GSAP",
        blog_1_desc: "Une plongée dans la création d'animations web fluides et performantes avec GreenSock.",
        blog_2_title: "Construire un Home Lab",
        blog_2_desc: "Comment j'ai configuré mon Cyber Range personnel pour tester les protocoles de sécurité réseau.",
        read_more: "Lire l'Article"
    }
};

const langToggleBtn = document.getElementById('lang-toggle');
let currentLang = localStorage.getItem('lang') || 'en'; // Default to English

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    document.documentElement.lang = lang;
    langToggleBtn.textContent = lang === 'en' ? 'FR' : 'EN'; // Show opposite or current? Usually show what it IS or what to switch TO. Let's show current code.
    // Actually standard is often to show the current lang code.
    // If I am in EN, button says "FR" to switch? Or "EN"? 
    // Let's make the button show the *current* language, and toggle on click.
    langToggleBtn.textContent = lang.toUpperCase();
}

langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'fr' : 'en';
    localStorage.setItem('lang', currentLang);
    updateLanguage(currentLang);
});

// Init Language
updateLanguage(currentLang);

function openMobileMenu() {
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling

    // Animate Links
    gsap.fromTo('.mobile-link',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
    );

    gsap.fromTo('.mobile-socials',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.6 }
    );
}

function closeMobileMenu() {
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMobileMenu);
closeMenuBtn.addEventListener('click', closeMobileMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});
