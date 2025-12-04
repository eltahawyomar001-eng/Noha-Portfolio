// ==========================================
// NOHA - Retro Feminine Portfolio
// JavaScript Interactions
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // Mobile Navigation Toggle
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // ==========================================
    // Smooth Scroll for Navigation Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // Navbar Background on Scroll
    // ==========================================
    const navbar = document.querySelector('.navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(125, 79, 80, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    
    // ==========================================
    // Intersection Observer for Animations
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate on scroll
    const animateElements = document.querySelectorAll(
        '.section-header, .about-content, .work-card, .service-card, .testimonial-card, .contact-content'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // ==========================================
    // Stagger Animation for Work Cards
    // ==========================================
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // ==========================================
    // Contact Form Handling
    // ==========================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const project = document.getElementById('project').value;
            
            // Simple validation
            if (!name || !email || !project) {
                showNotification('Please fill in all fields ✿', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email ✿', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent ✿', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // ==========================================
    // Notification System
    // ==========================================
    function showNotification(message, type = 'success') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = message;
        
        // Styles
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 20px 30px;
            background: ${type === 'success' ? '#7D4F50' : '#C87F5F'};
            color: #FDF6E9;
            font-family: 'Space Mono', monospace;
            font-size: 14px;
            letter-spacing: 1px;
            border-radius: 0;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
    
    // Add notification animations
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;
    document.head.appendChild(notificationStyles);
    
    // ==========================================
    // Cursor Flower Trail Effect
    // ==========================================
    let lastFlowerTime = 0;
    const flowerInterval = 200; // ms between flowers
    
    document.addEventListener('mousemove', function(e) {
        const currentTime = Date.now();
        
        if (currentTime - lastFlowerTime > flowerInterval) {
            createFlowerTrail(e.clientX, e.clientY);
            lastFlowerTime = currentTime;
        }
    });
    
    function createFlowerTrail(x, y) {
        const flowers = ['✿', '❀', '✾', '❋', '✧'];
        const flower = document.createElement('div');
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: ${12 + Math.random() * 10}px;
            color: #F4D1D1;
            pointer-events: none;
            z-index: 9998;
            opacity: 0.6;
            animation: flowerFade 1s ease forwards;
        `;
        
        document.body.appendChild(flower);
        
        setTimeout(() => flower.remove(), 1000);
    }
    
    // Flower trail animation
    const flowerTrailStyles = document.createElement('style');
    flowerTrailStyles.textContent = `
        @keyframes flowerFade {
            0% {
                opacity: 0.6;
                transform: translateY(0) rotate(0deg) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-30px) rotate(180deg) scale(0);
            }
        }
    `;
    document.head.appendChild(flowerTrailStyles);
    
    // ==========================================
    // Parallax Effect for Decorative Flowers
    // ==========================================
    const decorativeFlowers = document.querySelectorAll('.decorative-flower');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        decorativeFlowers.forEach((flower, index) => {
            const speed = 0.2 + (index * 0.1);
            flower.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ==========================================
    // Active Navigation Link Highlighting
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Active link styles
    const activeLinkStyles = document.createElement('style');
    activeLinkStyles.textContent = `
        .nav-links a.active {
            color: #7D4F50;
        }
        .nav-links a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(activeLinkStyles);
    
    // ==========================================
    // Typing Effect for Hero Title
    // ==========================================
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let charIndex = 0;
        
        function typeText() {
            if (charIndex < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 30);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeText, 1000);
    }
    
    // ==========================================
    // Image Hover Tilt Effect
    // ==========================================
    const polaroid = document.querySelector('.polaroid');
    
    if (polaroid) {
        polaroid.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        polaroid.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(-3deg)';
        });
    }
    
    // ==========================================
    // Console Easter Egg
    // ==========================================
    console.log('%c✿ Noha\'s Portfolio ✿', 'font-size: 24px; color: #7D4F50; font-family: serif;');
    console.log('%cDesigned with love and vintage charm', 'font-size: 12px; color: #D4A5A5;');
    console.log('%c❀ Thanks for checking out the code! ❀', 'font-size: 14px; color: #9B7B7B;');
    
});
