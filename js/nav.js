document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    function handleResize() {
    if (window.innerWidth >= 768) {
        menu.style.maxHeight = '';
        menu.style.opacity = '';
        menu.style.overflow = '';
        toggle.setAttribute('aria-expanded', 'false');
    } else {
        if (toggle.getAttribute('aria-expanded') !== 'true') {
        menu.style.maxHeight = '0';
        menu.style.opacity = '0';
        menu.style.overflow = 'hidden';
        }
    }
    }

    window.addEventListener('resize', handleResize);

    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';

        if (expanded) {
            requestAnimationFrame(() => {
                menu.style.maxHeight = '0';
                menu.style.opacity = '0';
            });

            toggle.setAttribute('aria-expanded', 'false');
        } else {
            menu.style.maxHeight = '200px';
            menu.style.opacity = '1';
            toggle.setAttribute('aria-expanded', 'true');
        }
    });
});