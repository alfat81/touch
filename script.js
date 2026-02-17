document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => revealOnScroll.observe(el));

    // Carousel Functionality
    const carousel = {
        track: document.querySelector('.carousel-track'),
        slides: document.querySelectorAll('.carousel-slide'),
        dots: document.querySelectorAll('.dot'),
        thumbnails: document.querySelectorAll('.thumbnail'),
        prevBtn: document.querySelector('.carousel-nav.prev'),
        nextBtn: document.querySelector('.carousel-nav.next'),
        currentIndex: 0,
        slideCount: 0,
        autoplayInterval: null
    };

    if (carousel.track && carousel.slides.length > 0) {
        carousel.slideCount = carousel.slides.length;
        initCarousel();
    }

    function initCarousel() {
        updateCarousel();
        
        carousel.prevBtn.addEventListener('click', () => {
            goToSlide(carousel.currentIndex - 1);
            resetAutoplay();
        });
        
        carousel.nextBtn.addEventListener('click', () => {
            goToSlide(carousel.currentIndex + 1);
            resetAutoplay();
        });
        
        carousel.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoplay();
            });
        });
        
        carousel.thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                goToSlide(index);
                resetAutoplay();
            });
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                goToSlide(carousel.currentIndex - 1);
                resetAutoplay();
            } else if (e.key === 'ArrowRight') {
                goToSlide(carousel.currentIndex + 1);
                resetAutoplay();
            }
        });
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carousel.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                goToSlide(carousel.currentIndex + 1);
                resetAutoplay();
            }
            if (touchEndX > touchStartX + 50) {
                goToSlide(carousel.currentIndex - 1);
                resetAutoplay();
            }
        }
        
        startAutoplay();
    }
    
    function goToSlide(index) {
        if (index < 0) {
            index = carousel.slideCount - 1;
        } else if (index >= carousel.slideCount) {
            index = 0;
        }
        
        carousel.currentIndex = index;
        updateCarousel();
    }
    
    function updateCarousel() {
        const offset = -carousel.currentIndex * 100;
        carousel.track.style.transform = `translateX(${offset}%)`;
        
        carousel.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === carousel.currentIndex);
        });
        
        carousel.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === carousel.currentIndex);
        });
        
        carousel.thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === carousel.currentIndex);
        });
    }
    
    function startAutoplay() {
        carousel.autoplayInterval = setInterval(() => {
            goToSlide(carousel.currentIndex + 1);
        }, 5000);
    }
    
    function resetAutoplay() {
        clearInterval(carousel.autoplayInterval);
        startAutoplay();
    }
    
    if (carousel.track) {
        carousel.track.addEventListener('mouseenter', () => {
            clearInterval(carousel.autoplayInterval);
        });
        
        carousel.track.addEventListener('mouseleave', () => {
            startAutoplay();
        });
    }
});
