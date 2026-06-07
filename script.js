document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.main-header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const closeMenu = document.querySelector('.close-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sideLinks = document.querySelectorAll('.side-links a');
    const sections = document.querySelectorAll('section');
    const toggleMenu = (isOpen) => {
        if (isOpen) {
            sideMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            sideMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto'; 
        }
    };

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => toggleMenu(true));
    if (overlay) overlay.addEventListener('click', () => toggleMenu(false));
    if (closeMenu) closeMenu.addEventListener('click', () => toggleMenu(false));
    sideLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });
    const handleScrollEffects = () => {
        const scrollY = window.pageYOffset;
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScrollEffects);
    const revealOptions = {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0) scale(1)";
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    const animatedElements = document.querySelectorAll(
        '.animate-text, .animate-text-delay, .animate-btn, .wide-card, .animate-card-up'
    );
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transition = "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
                if (el.classList.contains('wide-card') || el.classList.contains('animate-card-up')) {
            el.style.transform = "translateY(60px) scale(0.95)";
        } else {
            el.style.transform = "translateY(30px)";
        }

        revealObserver.observe(el);
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    handleScrollEffects();
});
document.addEventListener('DOMContentLoaded', () => {
    const playTrigger = document.getElementById('play-video-trigger');
    const videoModal = document.getElementById('video-modal');
    const closeModal = document.querySelector('.close-modal');
    const promoIframe = document.getElementById('promo-iframe');
    const youtubeVideoID = "dQw4w9WgXcQ"; 
    const videoUrl = `videos/vid1.mp4`;

    if (playTrigger) {
        playTrigger.onclick = function() {
            promoIframe.src = videoUrl; 
            videoModal.style.display = 'flex'; 
            document.body.style.overflow = 'hidden'; 
        };
    }
    const closeVideo = () => {
        videoModal.style.display = 'none';
        promoIframe.src = ""; 
        document.body.style.overflow = 'auto'; 
    };

    if (closeModal) {
        closeModal.onclick = closeVideo;
    }
    window.onclick = function(event) {
        if (event.target == videoModal) {
            closeVideo();
        }
    };
});
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.onclick = () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.filter;

            items.forEach(item => {
                if(cat === 'all' || item.classList.contains(cat)) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        };
    });
    const galleryVideos = document.querySelectorAll('.gallery-item.video');
    galleryVideos.forEach(item => {
        const vid = item.querySelector('video');
        item.onmouseenter = () => vid.play();
        item.onmouseleave = () => { vid.pause(); vid.currentTime = 0; };
    });
    const modal = document.getElementById('portfolio-modal');
    const container = document.getElementById('p-media-container');
    const closeBtn = document.querySelector('.p-close');

    document.querySelectorAll('.gallery-box').forEach(box => {
        box.onclick = () => {
            container.innerHTML = ""; 
            if (box.dataset.video) {
                container.innerHTML = `<video src="${box.dataset.video}" controls autoplay></video>`;
            } else {
                const imgSrc = box.querySelector('img').src;
                container.innerHTML = `<img src="${imgSrc}">`;
            }
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };
    });

    closeBtn.onclick = () => {
        modal.style.display = 'none';
        container.innerHTML = "";
        document.body.style.overflow = 'auto';
    };
});
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const updateCount = () => {
                    const count = +counter.innerText;
                    const speed = target / 100; 
                    if (count < target) {
                        counter.innerText = Math.ceil(count + speed);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsRow = document.querySelector('.stats-row');
if (statsRow) statsObserver.observe(statsRow);