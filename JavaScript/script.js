        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const mobileNav = document.querySelector('.mobile-nav');
        const closeMenu = document.querySelector('.close-menu');
        const menuOverlay = document.querySelector('.menu-overlay');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
        
        hamburgerMenu.addEventListener('click', () => {
            mobileNav.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        const closeMobileMenu = () => {
            mobileNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
        
        closeMenu.addEventListener('click', closeMobileMenu);
        menuOverlay.addEventListener('click', closeMobileMenu);
        
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        let currentSlide = 0;
        let slideInterval;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dot');
        const totalSlides = slides.length;
        
        function showSlide(index) {
            if (index >= totalSlides) currentSlide = 0;
            else if (index < 0) currentSlide = totalSlides - 1;
            else currentSlide = index;
            
            const slider = document.querySelector('.slider');
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        function prevSlide() {
            showSlide(currentSlide - 1);
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                startSlideInterval();
            });
        });
        
        function startSlideInterval() {
            slideInterval = setInterval(nextSlide, 10000);
        }
        
        function initSlider() {
            showSlide(0);
            startSlideInterval();
            
            const sliderContainer = document.querySelector('.slider-container');
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                startSlideInterval();
            });
        }
        
        document.addEventListener('DOMContentLoaded', () => {
            initSlider();
            
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });