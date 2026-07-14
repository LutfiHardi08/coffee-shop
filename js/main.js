document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. RESPONSIVE MOBILE NAVBAR
       ========================================== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        // Close menu when links are clicked on Mobile Devices
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });
    }

    /* ==========================================
       2. SCROLL EFFECT ON NAVBAR
       ========================================== */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================
       3. ACTIVE LINK STATE ON SCROLL
       ========================================== */
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveSection() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Offset for navbar height
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

    window.addEventListener('scroll', highlightActiveSection);

    /* ==========================================
       4. BACK TO TOP BUTTON
       ========================================== */
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================
       5. SMOOTH SCROLL FOR ANCHOR LINKS
       ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetPosition = targetElement.offsetTop - 80; // Offset alignment
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================
       6. SCROLL REVEAL (INTERSECTION OBSERVER)
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal animation occurs only once
            }
        });
    }, {
        threshold: 0.15, // Triggers when 15% of element is visible
        rootMargin: '0px 0px -50px 0px' // Slightly delayed reveal for premium feeling
    });

    revealElements.forEach(el => {
        revealOnScrollObserver.observe(el);
    });

    /* ==========================================
       7. CLIENT-SIDE RESERVATION FEEDBACK (UX Flow)
       ========================================== */
    const reserveForm = document.getElementById('reserveForm');
    if (reserveForm) {
        reserveForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Client side success feedback
            const btn = reserveForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.disabled = true;
            btn.textContent = 'Memproses... ☕';
            
            setTimeout(() => {
                btn.textContent = 'Pemesanan Berhasil!';
                btn.style.backgroundColor = '#2e7d32'; // Green success color
                btn.style.borderColor = '#2e7d32';
                
                alert(`Terima kasih ${document.getElementById('fullName').value}! Reservasi meja Anda berhasil diproses secara lokal.`);
                
                // Reset form state after 2 seconds
                setTimeout(() => {
                    reserveForm.reset();
                    btn.disabled = false;
                    btn.textContent = originalText;
                    btn.style.backgroundColor = ''; 
                    btn.style.borderColor = '';
                }, 2000);

            }, 1200);
        });
    }
});
