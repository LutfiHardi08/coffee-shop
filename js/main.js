document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. SMART MOBILE NAVBAR TOGGLE
       ========================================== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
            // Prevent background scrolling when menu open on mobile
            document.body.style.overflowY = navMenu.classList.contains('open') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('open');
                document.body.style.overflowY = '';
            });
        });
    }

    /* ==========================================
       2. SCROLL DETECTION (NAVBAR LOOK CHANGE)
       ========================================== */
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    /* ==========================================
       3. PRECISE ACTIVE NAVIGATION STATE
       ========================================== */
    const sections = document.querySelectorAll('section[id]');
    function highlightActiveSection() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 160; 
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetLink.classList.add('active');
                } else {
                    targetLink.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', highlightActiveSection, { passive: true });

    /* ==========================================
       4. BACK TO TOP FUNCTIONALITY
       ========================================== */
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }, { passive: true });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ==========================================
       5. MATHEMATICALLY ALIGNED SMOOTH SCROLL
       ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (navbarHeight - 10);
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================
       6. OPTIMIZED INTERSECTION OBSERVER (REVEAL)
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================
       7. MICRO-INTERACTION: RESERVATION FLOW
       ========================================== */
    const reserveForm = document.getElementById('reserveForm');
    if (reserveForm) {
        reserveForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = reserveForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.disabled = true;
            btn.textContent = 'Memverifikasi Meja... ☕';
            
            setTimeout(() => {
                btn.textContent = 'Reservasi Berhasil!';
                btn.style.backgroundColor = '#4E7C59'; 
                btn.style.borderColor = '#4E7C59';
                
                alert(`Terima kasih, ${document.getElementById('fullName').value}. Slot premium Anda telah kami amankan secara lokal.`);
                
                setTimeout(() => {
                    reserveForm.reset();
                    btn.disabled = false;
                    btn.textContent = originalText;
                    btn.style.backgroundColor = ''; 
                    btn.style.borderColor = '';
                }, 2000);
            }, 1500);
        });
    }
});
