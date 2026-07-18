document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. GLOBAL ELEMENT SELECTORS
    // ==========================================
    const header = document.querySelector('.site-header');
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const backToTopBtn = document.getElementById('backToTop');

    // ==========================================
    // 2. STICKY NAVBAR MANAGEMENT
    // ==========================================
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            backToTopBtn.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            backToTopBtn.classList.remove('visible');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // ==========================================
    // 3. RESPONSIVE NAVIGATION SHELL (HAMBURGER)
    // ==========================================
    const toggleMobileMenu = () => {
        mainNav.classList.toggle('open');
        menuToggle.classList.toggle('open');
    };

    menuToggle.addEventListener('click', toggleMobileMenu);

    // Menutup menu mobile secara otomatis saat salah satu link diklik
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
            menuToggle.classList.remove('open');
        });
    });

    // ==========================================
    // 4. ACTIVE NAVIGATION LINK TRACKING
    // ==========================================
    const activeMenuOnScroll = () => {
        let scrollPosition = window.scrollY + 120; // offset untuk kecocokan posisi visual

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', activeMenuOnScroll);

    // ==========================================
    // 5. ANIMASI SCROLL REVEAL (INTERSECTION OBSERVER)
    // ==========================================
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Hanya animasi satu kali saat meluncur masuk
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach(el => revealObserver.observe(el));

    // ==========================================
    // 6. LOGIKA BACK TO TOP UTILITY
    // ==========================================
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================
    // 7. ARSITEKTUR VALDASI FORM FRONTEND KONTROL
    // ==========================================
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Pengumpulan data (Sangat siap diintegrasikan dengan API / AJAX)
            const formData = new FormData(reservationForm);
            const data = Object.fromEntries(formData.entries());
            
            // Tampilan notifikasi kustom minimalis premium
            alert(`Terima kasih, ${data.name}! Reservasi Anda untuk tanggal ${data.date} pukul ${data.time} (Jumlah: ${data.guests} Orang) berhasil dicatat secara lokal pada sistem Frontend.`);
            
            reservationForm.reset();
        });
    }
});
