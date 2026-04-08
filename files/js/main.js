// ============================================
// Raytrix Scripts - MAIN JAVASCRIPT
// Interactive Elements & Animations
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVIGATION
    // ============================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect with throttle
    let scrollTimeout;
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', function() {
        cancelAnimationFrame(scrollTimeout);
        scrollTimeout = requestAnimationFrame(handleScroll);
    }, { passive: true });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    
    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    
    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Trigger stats counter animation when stats section is visible
                if (entry.target.classList.contains('stats') || entry.target.classList.contains('stats-v2')) {
                    animateStats();
                }
            }
        });
    }, observerOptions);
    
    // Observe all service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.add('animate-on-scroll');
        observer.observe(card);
    });
    
    // Observe all feature items
    document.querySelectorAll('.feature-item').forEach(item => {
        item.classList.add('animate-on-scroll');
        observer.observe(item);
    });
    
    // Observe all process steps
    document.querySelectorAll('.process-step').forEach(step => {
        step.classList.add('animate-on-scroll');
        observer.observe(step);
    });
    
    // Observe stats section (both old and new)
    document.querySelectorAll('.stats, .stats-v2').forEach(section => {
        observer.observe(section);
    });
    
    // Observe CTA section
    const ctaSection = document.querySelector('.cta');
    if (ctaSection) {
        ctaSection.classList.add('animate-on-scroll');
        observer.observe(ctaSection);
    }
    
    
    // ============================================
    // STATS COUNTER ANIMATION
    // ============================================
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        statsAnimated = true;
        
        const statNumbers = document.querySelectorAll('.stat-number, .sv2-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    
    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
    const scrollTopBtn = document.getElementById('scrollTop');
    let scrollBtnTimeout;
    
    function updateScrollBtn() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', function() {
        cancelAnimationFrame(scrollBtnTimeout);
        scrollBtnTimeout = requestAnimationFrame(updateScrollBtn);
    }, { passive: true });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    
    // ============================================
    // SERVICE CARDS HOVER EFFECTS (Optimized)
    // ============================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-effect');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-effect');
        });
    });
    
    
    // ============================================
    // PARALLAX EFFECT FOR HERO (Optimized)
    // ============================================
    const heroBackground = document.querySelector('.hero-background img');
    let parallaxTimeout;
    
    if (heroBackground) {
        function updateParallax() {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.5;
            heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        
        window.addEventListener('scroll', function() {
            cancelAnimationFrame(parallaxTimeout);
            parallaxTimeout = requestAnimationFrame(updateParallax);
        }, { passive: true });
    }

    // ============================================
    // HERO CAROUSEL removed: static tagline implemented (cleanup)
    
    
    // ============================================
    // CURSOR TRAIL EFFECT (Removed for Performance)
    // ============================================
    
    
    // ============================================
    // BUTTON RIPPLE EFFECT
    // ============================================
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: translate(-50%, -50%) scale(20);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    
    // ============================================
    // ACTIVE NAVIGATION LINK ON SCROLL (Throttled)
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    let navUpdateTimeout;
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || 
                (current === '' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', function() {
        cancelAnimationFrame(navUpdateTimeout);
        navUpdateTimeout = requestAnimationFrame(updateActiveNav);
    }, { passive: true });
    
    
    // ============================================
    // PERFORMANCE OPTIMIZATION
    // ============================================
    
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttle function for continuous events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    
    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    
    // ============================================
    // PREVENT ANIMATION REPLAY ON RESIZE
    // ============================================
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Add any resize-specific logic here
        }, 250);
    });
    
    
    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    console.log('%c🌊 Raytrix Scripts ', 'background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px; font-weight: bold;');
    console.log('%cPremium Digital Solutions | discord.gg/raytrix', 'color: #10b981; font-size: 14px; padding: 5px;');
    
});


// ============================================
// ADDITIONAL UTILITY FUNCTIONS
// ============================================

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get scroll percentage
function getScrollPercentage() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    return (scrollTop / docHeight) * 100;
}

// Animate element on scroll
function animateOnScroll(element, animationClass) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(animationClass);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(element);
}

// (Removed) Footer copy-to-clipboard handler per design feedback
