document.addEventListener('DOMContentLoaded', () => {
    // --- SCROLL REVEAL VIA INTERSECTION OBSERVER ---
    const initScrollReveals = () => {
        const revealElements = document.querySelectorAll('.reveal');
        
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                root: null, // viewport
                rootMargin: '0px 0px -80px 0px', // trigger slightly before viewport bottom
                threshold: 0.1 // 10% visible
            };
            
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target); // Stop observing once visible
                    }
                });
            }, observerOptions);
            
            revealElements.forEach(el => {
                // Add base reveal class if it only has helper classes
                if (!el.classList.contains('reveal')) {
                    el.classList.add('reveal');
                }
                revealObserver.observe(el);
            });
        } else {
            // Fallback for older browsers
            revealElements.forEach(el => el.classList.add('visible'));
        }
    };

    // --- ANIME STATS COUNTERS ---
    const initCounters = () => {
        const counters = document.querySelectorAll('.counter-number');
        if (counters.length === 0) return;

        const countToValue = (counter) => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const stepTime = 30; // ms
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + (counter.getAttribute('data-suffix') || '');
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + (counter.getAttribute('data-suffix') || '');
                }
            }, stepTime);
        };

        if ('IntersectionObserver' in window) {
            const counterObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        countToValue(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => counterObserver.observe(counter));
        } else {
            counters.forEach(counter => countToValue(counter));
        }
    };

    // Initialize scripts
    initScrollReveals();
    initCounters();
});
