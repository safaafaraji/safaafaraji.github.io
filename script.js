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
