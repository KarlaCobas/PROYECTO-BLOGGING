let currentSimpleSlide = 0;
let simpleSliderInterval;
const simpleSlides = document.querySelectorAll('.simple-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSimpleSlides = simpleSlides.length;

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


function showSimpleSlide(index) {
    simpleSlides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    if (index >= totalSimpleSlides) {
        currentSimpleSlide = 0;
    } else if (index < 0) {
        currentSimpleSlide = totalSimpleSlides - 1;
    } else {
        currentSimpleSlide = index;
    }
    
    simpleSlides[currentSimpleSlide].classList.add('active');
    indicators[currentSimpleSlide].classList.add('active');
}

function nextSimpleSlide() {
    showSimpleSlide(currentSimpleSlide + 1);
}

function prevSimpleSlide() {
    showSimpleSlide(currentSimpleSlide - 1);
}

function goToSlide(index) {
    resetSliderInterval();
    showSimpleSlide(index);
}

function startSliderInterval() {
    simpleSliderInterval = setInterval(nextSimpleSlide, 5000); 
}

function resetSliderInterval() {
    clearInterval(simpleSliderInterval);
    startSliderInterval();
}

function initSimpleSlider() {
    if (!simpleSlides.length) {
        console.warn('No se encontraron slides');
        return;
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
        
        indicator.setAttribute('tabindex', '0');
        indicator.setAttribute('role', 'button');
        indicator.setAttribute('aria-label', `Ir a la noticia ${index + 1}`);
        
        indicator.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ' ') && index !== currentSimpleSlide) {
                e.preventDefault();
                goToSlide(index);
            }
        });
    });
    
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSimpleSlide();
            resetSliderInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSimpleSlide();
            resetSliderInterval();
        });
    }
    
    const sliderContainer = document.querySelector('.simple-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(simpleSliderInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            startSliderInterval();
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSimpleSlide();
            resetSliderInterval();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSimpleSlide();
            resetSliderInterval();
        }
    });
    
    setupSimpleSliderSwipe();
    
    showSimpleSlide(0);
    startSliderInterval();
    
    console.log('Slider simple inicializado con', totalSimpleSlides, 'slides');
}

function setupSimpleSliderSwipe() {
    const sliderContainer = document.querySelector('.simple-slider-container');
    if (!sliderContainer) return;
    
    let startX = 0;
    let endX = 0;
    let isSwiping = false;
    
    sliderContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
        clearInterval(simpleSliderInterval);
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
                nextSimpleSlide();
            } else {
                prevSimpleSlide();
            }
        }
        
        startSliderInterval();
    }, { passive: true });
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
    if (window.innerWidth >= 768 && isMenuOpen) {
        closeMobileMenu();
    }
}


function debugInfo() {
    console.log('=== DEPURACIÓN ===');
    console.log('Slides encontrados:', simpleSlides.length);
    console.log('Indicadores encontrados:', indicators.length);
    console.log('Menú hamburguesa:', !!hamburgerMenu);
    console.log('Noticias de última hora:', !!breakingNewsElement);
    console.log('Ancho de ventana:', window.innerWidth);
    console.log('Altura de ventana:', window.innerHeight);
    console.log('Slide actual:', currentSimpleSlide);
    console.log('Menú abierto:', isMenuOpen);
    console.log('=== FIN DEPURACIÓN ===');
}


function initAll() {
    console.log('Inicializando página de noticias con slider simple...');
    
    initSimpleSlider();
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
    
    if (typeof window !== 'undefined') {
        window.debugNewsPage = debugInfo;
        window.showNextSlide = nextSimpleSlide;
        window.showPrevSlide = prevSimpleSlide;
        window.toggleMenu = toggleMobileMenu;
        window.goToSlide = goToSlide;
    }
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('reduce-motion');
    }
    
    console.log('Página inicializada correctamente');
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(simpleSliderInterval);
        clearInterval(breakingNewsInterval);
    } else {
        startSliderInterval();
        breakingNewsInterval = setInterval(changeBreakingNews, 30000);
    }
});


document.addEventListener('touchstart', (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
        e.target.classList.contains('indicator')) {
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


const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    /* Estilos para navegación activa */
    .desktop-nav a.active,
    .mobile-nav a.active {
        color: var(--accent) !important;
        font-weight: 600;
    }
    
    .desktop-nav a.active::after {
        width: 100% !important;
    }
    
    /* Efecto táctil */
    .active-touch {
        opacity: 0.8 !important;
        transform: scale(0.98) !important;
        transition: opacity 0.2s, transform 0.2s !important;
    }
    
    /* Focus states para accesibilidad */
    .indicator:focus {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
    }
    
    .slider-prev:focus,
    .slider-next:focus {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
    }
    
    .hamburger-menu:focus {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
        border-radius: 4px;
    }
    
    /* Estilos para contacto en footer */
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
    
    /* Transiciones suaves para header */
    header {
        transition: all 0.3s ease;
    }
    
    /* Estados de carga para imágenes */
    .article-image img,
    .simple-slide img {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
    
    /* Reducir movimiento para usuarios que lo prefieren */
    .reduce-motion *,
    .reduce-motion *::before,
    .reduce-motion *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .reduce-motion .simple-slide {
        transition: none !important;
    }
`;
document.head.appendChild(dynamicStyles);