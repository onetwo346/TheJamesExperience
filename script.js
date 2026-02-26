document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const newsletterForm = document.getElementById('newsletterForm');
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselDots = document.getElementById('carouselDots');

    let currentSlide = 0;
    let slidesPerView = 3;
    let totalSlides = 4;

    function updateSlidesPerView() {
        if (window.innerWidth <= 640) {
            slidesPerView = 1;
        } else if (window.innerWidth <= 968) {
            slidesPerView = 2;
        } else {
            slidesPerView = 3;
        }
        updateCarousel();
        createDots();
    }

    function createDots() {
        if (!carouselDots) return;
        carouselDots.innerHTML = '';
        const numDots = Math.ceil(totalSlides - slidesPerView + 1);
        
        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentSlide) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateCarousel();
            });
            carouselDots.appendChild(dot);
        }
    }

    function updateCarousel() {
        if (!carouselTrack) return;
        
        const maxSlide = totalSlides - slidesPerView;
        if (currentSlide > maxSlide) {
            currentSlide = maxSlide;
        }
        if (currentSlide < 0) {
            currentSlide = 0;
        }

        const slideWidth = 100 / slidesPerView;
        const offset = -currentSlide * slideWidth;
        carouselTrack.style.transform = `translateX(${offset}%)`;

        const dots = carouselDots.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        if (prevBtn) {
            prevBtn.disabled = currentSlide === 0;
            prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        }
        if (nextBtn) {
            nextBtn.disabled = currentSlide >= totalSlides - slidesPerView;
            nextBtn.style.opacity = currentSlide >= totalSlides - slidesPerView ? '0.5' : '1';
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentSlide < totalSlides - slidesPerView) {
                currentSlide++;
                updateCarousel();
            }
        });
    }

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            scrollToTopBtn.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            scrollToTopBtn.classList.remove('visible');
        }
    });

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('emailInput').value;
            
            alert(`Thank you for subscribing! We'll send updates to ${email}`);
            newsletterForm.reset();
        });
    }

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.book-card, .quick-link-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    let touchStartX = 0;
    let touchEndX = 0;

    if (carouselTrack) {
        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            if (currentSlide < totalSlides - slidesPerView) {
                currentSlide++;
                updateCarousel();
            }
        }
        if (touchEndX > touchStartX + 50) {
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        }
    }

    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
