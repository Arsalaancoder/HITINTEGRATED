document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENT REGISTRY ---
    const hamburger = document.querySelector('.hamburger');
    const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const headerNav = document.querySelector('.header-nav');
    const backToTop = document.querySelector('.back-to-top');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    // --- STICKY NAVBAR & BACK-TO-TOP TRIGGER ---
    const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // Sticky Header transition
        if (scrollTop > 50) {
            headerNav.classList.add('scrolled');
        } else {
            headerNav.classList.remove('scrolled');
        }

        // Back to Top button visibility
        if (scrollTop > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger immediately in case page loads scrolled down

    // --- MOBILE NAV DRAWER OPEN/CLOSE ---
    const openMobileNav = () => {
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileNavDrawer.classList.add('open');
        mobileNavOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent page scroll under drawer
    };

    const closeMobileNav = () => {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNavDrawer.classList.remove('open');
        mobileNavOverlay.classList.remove('open');
        document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', () => {
        if (mobileNavDrawer.classList.contains('open')) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    });

    mobileNavOverlay.addEventListener('click', closeMobileNav);

    // Escape Key Support to close menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNavDrawer.classList.contains('open')) {
            closeMobileNav();
        }
    });

    // --- MOBILE SUBMENU ACCORDIONS ---
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const parent = link.parentElement;
            const submenu = parent.querySelector('.mobile-submenu');
            
            if (submenu) {
                e.preventDefault(); // Stop navigation if it has a submenu
                const isOpen = submenu.classList.contains('open');
                
                // Close other submenus first for accordion behavior
                document.querySelectorAll('.mobile-submenu').forEach(sub => {
                    sub.classList.remove('open');
                    sub.previousElementSibling.querySelector('svg')?.style.setProperty('transform', 'rotate(0deg)');
                });

                if (!isOpen) {
                    submenu.classList.add('open');
                    link.querySelector('svg')?.style.setProperty('transform', 'rotate(180deg)');
                } else {
                    submenu.classList.remove('open');
                    link.querySelector('svg')?.style.setProperty('transform', 'rotate(0deg)');
                }
            }
        });
    });

    // --- ACTIVE PAGE STATE HIGHLIGHTER ---
    const highlightActiveNav = () => {
        const currentPath = window.location.pathname;
        const navItems = document.querySelectorAll('.nav-menu > .nav-item');
        
        navItems.forEach(item => {
            const mainLink = item.querySelector('.nav-link');
            if (!mainLink) return;

            const href = mainLink.getAttribute('href');
            
            // Check if current page matches parent page link
            if (currentPath.endsWith(href) || (href !== 'index.html' && href !== './index.html' && currentPath.includes(href.replace('.html', '')))) {
                item.classList.add('active');
            } else if ((currentPath === '/' || currentPath.endsWith('index.html')) && (href === 'index.html' || href === './index.html')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }

            // Check if dropdown sub-items match
            const dropdownLinks = item.querySelectorAll('.dropdown-link');
            dropdownLinks.forEach(subLink => {
                const subHref = subLink.getAttribute('href');
                if (currentPath.includes(subHref)) {
                    item.classList.add('active');
                }
            });
        });
    };

    highlightActiveNav();
});
