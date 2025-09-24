// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const barsIcon = document.getElementById('menu-bars');
    const timesIcon = document.getElementById('menu-times');
    let menuOpen = false;

    toggleBtn.addEventListener('click', function () {
        menuOpen = !menuOpen;
        mobileMenu.style.display = menuOpen ? 'flex' : 'none';
        barsIcon.style.display = menuOpen ? 'none' : '';
        timesIcon.style.display = menuOpen ? '' : 'none';
    });

    // Optional: Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (menuOpen && !toggleBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            menuOpen = false;
            mobileMenu.style.display = 'none';
            barsIcon.style.display = '';
            timesIcon.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        const bars = document.querySelectorAll('.h-full.bg-gradient-to-r.from-green-400');
        if (bars.length > 0) {
            bars[0].style.width = '90%';
            if (bars.length > 1) {
                bars[1].style.width = '60%';
            }
        }
    }, 100);
});

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(document.querySelectorAll('section[id]'));
    function setActiveNav() {
        let currentSection = sections[0];
        for (const section of sections) {
            if (window.scrollY >= section.offsetTop - 100) {
                currentSection = section;
            }
        }
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').replace('#', '') === currentSection.id) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', setActiveNav);
    setActiveNav();
});

document.addEventListener('DOMContentLoaded', () => {
    // Typing effect
    const texts = {
        5: 'JavaScript,',
        6: 'VSCode',
        7: 'TailwindCSS'
    };
    const elements = document.querySelectorAll('[data-typing]');
    let currentIndex = 0;

    function typeText(element, text, callback) {
        let i = 0;
        element.classList.add('typing');
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                element.classList.remove('typing');
                callback();
            }
        }, 50);
    }
    function startTyping() {
        if (currentIndex < elements.length) {
            const element = elements[currentIndex];
            const text = texts[element.getAttribute('data-typing')];
            typeText(element, text, () => {
                currentIndex++;
                startTyping();
            });
        }
    }
    startTyping();

    //  placeholder
    const lightbox = ({
        touchNavigation: true,
        loop: true,
        autoplayVideos: true,
        zoomable: true,
        draggable: true,
        selector: '.'
    });

    // Marquee
    const marquee = document.getElementById('marquee');
    const marqueeContent = marquee.innerHTML;
    marquee.innerHTML += marqueeContent;
    const marqueeItems = marquee.children;
    let totalWidth = 0;

    for (let item of marqueeItems) {
        totalWidth += item.offsetWidth + 32; // Include gap-8 (32px)
    }
    marquee.style.width = `${totalWidth}px`;
    // Add hover stop functionality
    marquee.addEventListener('mouseenter', () => {
        marquee.style.animationPlayState = 'paused';
    });
    marquee.addEventListener('mouseleave', () => {
        marquee.style.animationPlayState = 'running';
    });

    // Back to top and smooth scroll
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
        checkCurrentSection();
    });
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setActiveLink('home');
    });

    // add active link
    const navLinks = document.querySelectorAll('nav a, #mobile-menu a');
    const sections = document.querySelectorAll('section[id]');

    const removeActiveClasses = () => {
        navLinks.forEach(link => link.classList.remove('active'));
    };
    const setActiveLink = (targetId) => {
        removeActiveClasses();
        const activeLink = Array.from(navLinks).find(link => link.getAttribute('href') === `#${targetId}`);
        if (activeLink) activeLink.classList.add('active');
    };

    const checkCurrentSection = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80; 
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        if (current) {
            setActiveLink(current);
        } else if (window.pageYOffset < sections[0].offsetTop - 80) {
            setActiveLink('home');
        }
    };
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const yOffset = -70; 
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
                setActiveLink(targetId);
            }
        });
    });
    const initializeActiveLink = () => {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            setActiveLink(hash);
            const targetElement = document.getElementById(hash);
            const yOffset = -70;
            const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({
                top: y,
                behavior: 'instant'
            });
        } else {
            checkCurrentSection();
        }
    };

    initializeActiveLink();
    window.addEventListener('hashchange', initializeActiveLink);
});