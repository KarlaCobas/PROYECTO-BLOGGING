let currentSlide = 0;
let slideInterval;
let isSliding = false;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
const totalSlides = slides.length;
const slider = document.querySelector('.slider');
const sliderContainer = document.querySelector('.slider-container');

const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileNav = document.querySelector('.mobile-nav');
const menuOverlay = document.querySelector('.menu-overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
let isMenuOpen = false;

const breakingNewsTexts = [
    "ÚLTIMA HORA: Cumbre climática alcanza acuerdo histórico para reducir emisiones en un 45% para 2030",
    "ACTUALIZACIÓN: Banco Central Europeo anuncia aumento de tasas de interés para combatir inflación",
    "ALERTA: Sismo de magnitud 7.2 sacude región costera; activados protocolos de emergencia",
    "INFORMACIÓN: Avance en negociaciones de paz en conflicto regional tras mediación internacional",
    "URGENTE: Descubrimiento científico promete revolucionar tratamiento contra el cáncer"
];
let currentBreakingNews = 0;
let breakingNewsInterval;
const breakingNewsElement = document.querySelector('.breaking-news .container');
function showSlide(index) {
    if (isSliding) return;
    isSliding = true;
    
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    
    const offset = -currentSlide * 100;
    slider.style.transform = `translate3d(${offset}%, 0, 0)`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
    
    setTimeout(() => {
        isSliding = false;
    }, 800);
}
function nextSlide() {
    showSlide(currentSlide + 1);
}
function prevSlide() {
    showSlide(currentSlide - 1);
}
function setupSliderDots() {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== currentSlide) {
                resetSlideInterval();
                showSlide(index);
            }
        });
        
        dot.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ' ') && index !== currentSlide) {
                e.preventDefault();
                resetSlideInterval();
                showSlide(index);
            }
        });
    });
}
function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 10000);
}
function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
}
function setupSwipeSupport() {
    if (!sliderContainer) return;
    
    let startX = 0;
    let endX = 0;
    let isSwiping = false;
    
    sliderContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
        clearInterval(slideInterval);
    }, { passive: true });
    
    sliderContainer.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        endX = e.touches[0].clientX;
    }, { passive: true });
    
    sliderContainer.addEventListener('touchend', () => {
        if (!isSwiping) return;
        isSwiping = false;
        
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        startSlideInterval();
    }, { passive: true });
}
function initSlider() {
    if (!slider || !slides.length) return;
    
    slider.style.width = `${totalSlides * 100}%`;
    
    slides.forEach(slide => {
        slide.style.flex = `0 0 ${100 / totalSlides}%`;
        slide.style.width = `${100 / totalSlides}%`;
    });
    
    showSlide(0);
    setupSliderDots();
    setupSwipeSupport();
    startSlideInterval();
    
    if (window.matchMedia("(min-width: 769px)").matches) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            startSlideInterval();
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
            resetSlideInterval();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide();
            resetSlideInterval();
        }
    });
}
function openMobileMenu() {
    mobileNav.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburgerMenu.setAttribute('aria-expanded', 'true');
    isMenuOpen = true;
    
    const hamburgerIcon = hamburgerMenu.querySelector('i');
    if (hamburgerIcon) {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-times');
    }
    
    setTimeout(() => {
        const firstLink = mobileNav.querySelector('a');
        if (firstLink) firstLink.focus();
    }, 300);
}
function closeMobileMenu() {
    mobileNav.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    hamburgerMenu.setAttribute('aria-expanded', 'false');
    isMenuOpen = false;
    
    const hamburgerIcon = hamburgerMenu.querySelector('i');
    if (hamburgerIcon) {
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
    }
    
    hamburgerMenu.focus();
}
function toggleMobileMenu() {
    if (isMenuOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}
function setupHamburgerMenu() {
    if (!hamburgerMenu) return;
    
    hamburgerMenu.addEventListener('click', toggleMobileMenu);
    menuOverlay.addEventListener('click', closeMobileMenu);
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
    
    hamburgerMenu.setAttribute('aria-label', 'Abrir menú de navegación');
    hamburgerMenu.setAttribute('aria-expanded', 'false');
}
function setupSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header').offsetHeight;
                let targetPosition;
                
                if (targetId === '#inicio') {
                    targetPosition = 0;
                } else {
                    targetPosition = targetElement.offsetTop - headerHeight - 20;
                }
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
                
                highlightActiveSection();
            }
        });
    });
    
    window.addEventListener('scroll', highlightActiveSection);
}
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
    const scrollPosition = window.scrollY + 100;
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSectionId = '#' + section.id;
        }
    });
    
    if (scrollPosition < 100) {
        currentSectionId = '#inicio';
    }
    
    if (currentSectionId) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentSectionId) {
                link.classList.add('active');
            }
        });
    }
}
function setupScrollAnimations() {
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.news-article').forEach(article => {
            observer.observe(article);
        });
    } else {
        window.addEventListener('scroll', animateOnScroll);
        setTimeout(animateOnScroll, 100);
    }
}
function animateOnScroll() {
    const articles = document.querySelectorAll('.news-article');
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.85;
    
    articles.forEach(article => {
        const articlePosition = article.getBoundingClientRect().top;
        
        if (articlePosition < triggerPoint) {
            article.style.animationPlayState = 'running';
        }
    });
}
function changeBreakingNews() {
    if (!breakingNewsElement) return;
    
    breakingNewsElement.style.opacity = '0.7';
    breakingNewsElement.style.transition = 'opacity 0.3s';
    
    setTimeout(() => {
        currentBreakingNews = (currentBreakingNews + 1) % breakingNewsTexts.length;
        breakingNewsElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${breakingNewsTexts[currentBreakingNews]}`;
        breakingNewsElement.style.opacity = '1';
    }, 300);
}
function initBreakingNews() {
    if (!breakingNewsElement) return;
    
    breakingNewsInterval = setInterval(changeBreakingNews, 30000);
    
    if (window.matchMedia("(min-width: 769px)").matches) {
        const breakingNewsContainer = document.querySelector('.breaking-news');
        
        breakingNewsContainer.addEventListener('mouseenter', () => {
            clearInterval(breakingNewsInterval);
        });
        
        breakingNewsContainer.addEventListener('mouseleave', () => {
            breakingNewsInterval = setInterval(changeBreakingNews, 30000);
        });
    }
}
function handleHeaderScroll() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}
function handleResize() {
    if (slider) {
        slider.style.width = `${totalSlides * 100}%`;
        slides.forEach(slide => {
            slide.style.flex = `0 0 ${100 / totalSlides}%`;
            slide.style.width = `${100 / totalSlides}%`;
        });
        
        const offset = -currentSlide * 100;
        slider.style.transform = `translate3d(${offset}%, 0, 0)`;
    }
    
    if (window.innerWidth >= 768 && isMenuOpen) {
        closeMobileMenu();
    }
}
function initAll() {
    console.log('Inicializando página de noticias...');
    
    initSlider();
    setupHamburgerMenu();
    setupScrollAnimations();
    initBreakingNews();
    setupSmoothScroll();
    
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll();
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });
    
    dots.forEach((dot, index) => {
        dot.setAttribute('tabindex', '0');
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', `Ir a la slide ${index + 1}`);
    });
    
    console.log('Página inicializada correctamente');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(slideInterval);
        clearInterval(breakingNewsInterval);
    } else {
        startSlideInterval();
        breakingNewsInterval = setInterval(changeBreakingNews, 30000);
    }
});
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .desktop-nav a.active,
    .mobile-nav a.active {
        color: var(--accent) !important;
        font-weight: 600;
    }
    
    .desktop-nav a.active::after {
        width: 100% !important;
    }
    
    .active-touch {
        opacity: 0.8 !important;
        transform: scale(0.98) !important;
        transition: opacity 0.2s, transform 0.2s !important;
    }
    
    .slider-dot:focus {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
    }
    
    .hamburger-menu:focus {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
        border-radius: 4px;
    }
    
    .contact-info {
        margin-bottom: 20px;
    }
    
    .contact-info p {
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--accent-light);
    }
    
    .contact-info i {
        width: 20px;
        color: var(--accent-light);
    }
    
    /* Smooth transitions for header */
    header {
        transition: all 0.3s ease;
    }
    
    /* Loading state for images */
    .article-image img,
    .slide img {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
    
    /* Reduce motion for users who prefer it */
    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .slider {
            transition: none !important;
        }
    }
`;
document.head.appendChild(dynamicStyles);
function debugInfo() {
    console.log('=== DEPURACIÓN ===');
    console.log('Slides encontrados:', slides.length);
    console.log('Dots encontrados:', dots.length);
    console.log('Menú hamburguesa:', !!hamburgerMenu);
    console.log('Slider:', !!slider);
    console.log('Noticias de última hora:', !!breakingNewsElement);
    console.log('Ancho de ventana:', window.innerWidth);
    console.log('Altura de ventana:', window.innerHeight);
    console.log('=== FIN DEPURACIÓN ===');
}

if (typeof window !== 'undefined') {
    window.debugNewsPage = debugInfo;
    window.showNextSlide = nextSlide;
    window.showPrevSlide = prevSlide;
    window.toggleMenu = toggleMobileMenu;
}

document.addEventListener('touchstart', (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        e.target.classList.add('active-touch');
        setTimeout(() => {
            e.target.classList.remove('active-touch');
        }, 300);
    }
}, { passive: true });

let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            highlightActiveSection();
            handleHeaderScroll();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });