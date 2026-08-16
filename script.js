document.addEventListener('DOMContentLoaded', () => {
    // Set Current Year in Footer
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Sticky Navbar & Active Link
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        // Navbar bg
        if (navbar && backToTop) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
                backToTop.classList.add('visible');
            } else {
                navbar.classList.remove('scrolled');
                backToTop.classList.remove('visible');
            }
        }

        // Active link
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Back to top button
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // Animated Numbers Counter
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const startCounters = () => {
        if (hasCounted) return;
        const statsSection = document.getElementById('stats');
        if(!statsSection) return;
        
        const statsPosition = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (statsPosition < windowHeight - 50) {
            hasCounted = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = target % 1 !== 0 ? current.toFixed(1) : Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target % 1 !== 0 ? target.toFixed(1) : target;
                    }
                };
                updateCounter();
            });
        }
    };

    window.addEventListener('scroll', startCounters);

    // Lightbox Gallery
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    if (lightbox && lightboxImg && closeLightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                lightbox.style.display = 'block';
                lightboxImg.src = this.src;
            });
        });

        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    // Reviews Slider
    const slides = document.querySelectorAll('.review-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevReview');
    const nextBtn = document.getElementById('nextReview');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        const showSlide = (n) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = (n + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            if(dots[currentSlide]) dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => showSlide(currentSlide + 1);
        const prevSlide = () => showSlide(currentSlide - 1);

        const startSlideTimer = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        const resetSlideTimer = () => {
            clearInterval(slideInterval);
            startSlideTimer();
        };

        if(prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => { prevSlide(); resetSlideTimer(); });
            nextBtn.addEventListener('click', () => { nextSlide(); resetSlideTimer(); });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetSlideTimer();
            });
        });

        startSlideTimer();
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');
            formSuccess.classList.add('active');
            contactForm.reset();
            
            setTimeout(() => {
                formSuccess.classList.remove('active');
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                    contactForm.classList.remove('hidden');
                }, 500);
            }, 5000);
        });
    }
});
