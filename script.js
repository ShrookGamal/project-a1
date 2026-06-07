/**
 * Beit Al-Ezz Website - Professional JavaScript Engine
 * الميزات: نظام التنقل، القائمة الجانبية، السكرول سباي، وأنيميشن الظهور التلقائي
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. الأهداف الأساسية (Elements) ---
    const header = document.querySelector('.main-header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const closeMenu = document.querySelector('.close-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sideLinks = document.querySelectorAll('.side-links a');
    const sections = document.querySelectorAll('section');

    // --- 2. نظام التحكم في القائمة الجانبية (Mobile Menu) ---
    const toggleMenu = (isOpen) => {
        if (isOpen) {
            sideMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // منع السكرول خلف المنيو
        } else {
            sideMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto'; // إعادة السكرol
        }
    };

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => toggleMenu(true));
    if (overlay) overlay.addEventListener('click', () => toggleMenu(false));
    if (closeMenu) closeMenu.addEventListener('click', () => toggleMenu(false));

    // إغلاق المنيو عند الضغط على أي رابط بداخلها
    sideLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });


    // --- 3. نظام السكرول الذكي (Header & Scroll Spy) ---
    const handleScrollEffects = () => {
        const scrollY = window.pageYOffset;

        // أ- تأثير الهيدر العائم
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // ب- تحديث الرابط النشط (Scroll Spy)
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


    // --- 4. حل مشكلة ظهور الكروت والأنيميشن (The Reveal System) ---
    // هذا الجزء يضمن ظهور العناصر فور وصول السكرول إليها
    
    const revealOptions = {
        threshold: 0.1, // تظهر بمجرد دخول 10% من العنصر للشاشة
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // إضافة كلاس الظهور الذي تم تعريفه في الـ CSS
                entry.target.classList.add('is-visible');
                
                // إضافة ستايل احتياطي لضمان الظهور 100% في حال فشل الكلاس
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0) scale(1)";
                
                // وقف المراقبة للعنصر بعد ظهوره لزيادة السرعة
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // استهداف جميع العناصر التي تحتاج لأنيميشن (نصوص، أزرار، كروت)
    const animatedElements = document.querySelectorAll(
        '.animate-text, .animate-text-delay, .animate-btn, .wide-card, .animate-card-up'
    );

    animatedElements.forEach(el => {
        // نضبط الحالة الابتدائية برمجياً لضمان البدء من وضع "المخفي"
        el.style.opacity = "0";
        el.style.transition = "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        
        // إذا كان العنصر كارت، ننزله لأسفل قليلاً ليبدأ الحركة
        if (el.classList.contains('wide-card') || el.classList.contains('animate-card-up')) {
            el.style.transform = "translateY(60px) scale(0.95)";
        } else {
            el.style.transform = "translateY(30px)";
        }

        revealObserver.observe(el);
    });


    // --- 5. التنقل السلس (Smooth Scrolling) ---
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

    // تشغيل الدالة مرة واحدة عند التحميل لضبط حالة الهيدر والروابط
    handleScrollEffects();
});
// --- كود تشغيل الفيديو المطور ---
document.addEventListener('DOMContentLoaded', () => {
    const playTrigger = document.getElementById('play-video-trigger');
    const videoModal = document.getElementById('video-modal');
    const closeModal = document.querySelector('.close-modal');
    const promoIframe = document.getElementById('promo-iframe');

    // ملاحظة هامة: يجب أن يكون الرابط بصيغة embed كما هو موضح بالأسفل
    // استبدلي dQw4w9WgXcQ بكود الفيديو الخاص بك من يوتيوب
    const youtubeVideoID = "dQw4w9WgXcQ"; 
    const videoUrl = `videos/vid1.mp4`;

    if (playTrigger) {
        playTrigger.onclick = function() {
            promoIframe.src = videoUrl; // وضع الرابط عند الضغط فقط
            videoModal.style.display = 'flex'; // إظهار النافذة
            document.body.style.overflow = 'hidden'; // منع السكرول أثناء المشاهدة
        };
    }

    // وظيفة إغلاق الفيديو
    const closeVideo = () => {
        videoModal.style.display = 'none';
        promoIframe.src = ""; // حذف الرابط لإيقاف الصوت تماماً
        document.body.style.overflow = 'auto'; // إعادة السكرول
    };

    if (closeModal) {
        closeModal.onclick = closeVideo;
    }

    // إغلاق عند الضغط خارج إطار الفيديو
    window.onclick = function(event) {
        if (event.target == videoModal) {
            closeVideo();
        }
    };
});
document.addEventListener('DOMContentLoaded', () => {
    // 1. الفلترة
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

    // 2. تشغيل الفيديو عند تمرير الماوس (Hover Preview)
    const galleryVideos = document.querySelectorAll('.gallery-item.video');
    galleryVideos.forEach(item => {
        const vid = item.querySelector('video');
        item.onmouseenter = () => vid.play();
        item.onmouseleave = () => { vid.pause(); vid.currentTime = 0; };
    });

    // 3. فتح الميديا في نافذة كبيرة (Lightbox)
    const modal = document.getElementById('portfolio-modal');
    const container = document.getElementById('p-media-container');
    const closeBtn = document.querySelector('.p-close');

    document.querySelectorAll('.gallery-box').forEach(box => {
        box.onclick = () => {
            container.innerHTML = ""; // تنظيف المحتوى السابق
            if (box.dataset.video) {
                // إذا كان فيديو
                container.innerHTML = `<video src="${box.dataset.video}" controls autoplay></video>`;
            } else {
                // إذا كانت صورة
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
// --- أنيميشن عداد الأرقام (Counter) ---
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const updateCount = () => {
                    const count = +counter.innerText;
                    const speed = target / 100; // سرعة العداد
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