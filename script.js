document.addEventListener('DOMContentLoaded', function() {
    // ========== ELEMENTS ==========
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const newsletterForm = document.getElementById('newsletterForm');
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselDots = document.getElementById('carouselDots');

    // ========== TYPING EFFECT ==========
    const typingText = document.getElementById('typingText');
    if (typingText) {
        const words = ['TheJamesExperience', 'A World of Stories', 'Your Next Adventure'];
        let wordIndex = 0, charIndex = 0, isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex--);
            } else {
                typingText.textContent = currentWord.substring(0, charIndex++);
            }

            let speed = isDeleting ? 40 : 80;
            if (!isDeleting && charIndex === currentWord.length) {
                speed = 2500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                speed = 400;
            }
            setTimeout(typeEffect, speed);
        }
        setTimeout(typeEffect, 2200);
    }

    // ========== TOAST NOTIFICATIONS ==========
    function showToast(message, type = '') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icon = type === 'success' ? '<i class="fa-solid fa-circle-check"></i>' :
                     type === 'error' ? '<i class="fa-solid fa-circle-xmark"></i>' :
                     '<i class="fa-solid fa-circle-info"></i>';
        toast.innerHTML = `${icon} ${message}`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ========== COUNTER ANIMATION ==========
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        counters.forEach(counter => {
            if (counter.dataset.animated) return;
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);

                if (target >= 1000) {
                    counter.textContent = current.toLocaleString() + '+';
                } else {
                    counter.textContent = current;
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.dataset.animated = 'true';
                }
            }
            requestAnimationFrame(update);
        });
    }

    // ========== SCROLL ANIMATIONS ==========
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = index * 100;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
                animateObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('[data-animate]').forEach(el => {
        animateObserver.observe(el);
    });

    // Counter observer
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) counterObserver.observe(statsBar);

    // ========== CAROUSEL ==========
    let currentSlide = 0, slidesPerView = 3, totalSlides = 4;

    function updateSlidesPerView() {
        if (window.innerWidth <= 640) slidesPerView = 1;
        else if (window.innerWidth <= 968) slidesPerView = 2;
        else slidesPerView = 3;
        updateCarousel();
        createDots();
    }

    function createDots() {
        if (!carouselDots) return;
        carouselDots.innerHTML = '';
        const numDots = Math.max(1, totalSlides - slidesPerView + 1);
        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentSlide) dot.classList.add('active');
            dot.addEventListener('click', () => { currentSlide = i; updateCarousel(); });
            carouselDots.appendChild(dot);
        }
    }

    function updateCarousel() {
        if (!carouselTrack) return;
        const maxSlide = Math.max(0, totalSlides - slidesPerView);
        currentSlide = Math.max(0, Math.min(currentSlide, maxSlide));
        const slideWidth = 100 / slidesPerView;
        carouselTrack.style.transform = `translateX(${-currentSlide * slideWidth}%)`;

        if (carouselDots) {
            carouselDots.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        if (prevBtn) { prevBtn.style.opacity = currentSlide === 0 ? '0.4' : '1'; }
        if (nextBtn) { nextBtn.style.opacity = currentSlide >= maxSlide ? '0.4' : '1'; }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { if (currentSlide > 0) { currentSlide--; updateCarousel(); } });
    if (nextBtn) nextBtn.addEventListener('click', () => { if (currentSlide < totalSlides - slidesPerView) { currentSlide++; updateCarousel(); } });

    // ========== SCROLL EVENTS ==========
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        if (navbar) {
            navbar.classList.toggle('scrolled', scrollY > 50);
        }
        if (scrollToTopBtn) {
            scrollToTopBtn.classList.toggle('visible', scrollY > 400);
        }
        lastScroll = scrollY;
    });

    // ========== MOBILE MENU ==========
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        });
    });

    // ========== SCROLL TO TOP ==========
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========== NEWSLETTER ==========
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('emailInput');
            if (email && email.value) {
                showToast('Successfully subscribed! Welcome aboard!', 'success');
                newsletterForm.reset();
            }
        });
    }

    // ========== TOUCH SWIPE ==========
    let touchStartX = 0;
    if (carouselTrack) {
        carouselTrack.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
        carouselTrack.addEventListener('touchend', (e) => {
            const diff = e.changedTouches[0].screenX - touchStartX;
            if (diff < -50 && currentSlide < totalSlides - slidesPerView) { currentSlide++; updateCarousel(); }
            if (diff > 50 && currentSlide > 0) { currentSlide--; updateCarousel(); }
        });
    }

    // ========== HERO PARTICLES ==========
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute; width: ${Math.random() * 6 + 2}px; height: ${Math.random() * 6 + 2}px;
                background: rgba(244, 162, 97, ${Math.random() * 0.3 + 0.05});
                border-radius: 50%; left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 6 + 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 3}s;
            `;
            particlesContainer.appendChild(particle);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
                25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
                50% { transform: translateY(-10px) translateX(-10px); opacity: 0.4; }
                75% { transform: translateY(-25px) translateX(5px); opacity: 0.5; }
            }
        `;
        document.head.appendChild(style);
    }

    // ========== ROTATING QUOTES ==========
    const quoteBannerText = document.getElementById('quoteBannerText');
    if (quoteBannerText) {
        const quotes = [
            "Every story is a doorway — step through, and discover a world you never knew existed.",
            "Words have the power to build worlds, break hearts, and mend souls all at once.",
            "The best stories aren't written — they're lived first, then put into words.",
            "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
            "Writing is painting with invisible ink — only those who truly look can see the colors.",
            "Every character I create carries a piece of my soul and a fragment of yours.",
            "Books don't just tell stories — they whisper secrets the universe wants you to hear.",
            "The magic of storytelling is that it turns strangers into family.",
            "I write not to escape reality, but to show you a deeper version of it.",
            "Between the lines of every story lies a truth waiting to be discovered.",
            "A pen is mightier than a sword, but a story is mightier than both.",
            "The pages may end, but a great story never stops living inside you.",
            "Every blank page is a promise — a chance to create something that didn't exist before.",
            "Stories connect us across time, space, and every difference we think divides us.",
            "The best adventures begin with a single sentence and an open heart.",
            "Writing isn't a hobby — it's how I make sense of this beautiful, chaotic world.",
            "When you read my words, we share the same heartbeat for a moment in time.",
            "Fiction is the lie that tells the truth better than facts ever could.",
            "I don't choose the stories — they choose me. I just hold the pen.",
            "Every ending I write is really a beginning in disguise."
        ];
        let quoteIndex = 0;

        setInterval(() => {
            quoteIndex = (quoteIndex + 1) % quotes.length;
            quoteBannerText.style.opacity = '0';
            quoteBannerText.style.transform = 'translateY(8px)';
            setTimeout(() => {
                quoteBannerText.textContent = quotes[quoteIndex];
                quoteBannerText.style.opacity = '1';
                quoteBannerText.style.transform = 'translateY(0)';
            }, 400);
        }, 10000);
    }

    // ========== SMOOTH ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ========== INIT ==========
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
});
