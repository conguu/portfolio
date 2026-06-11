document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    if (window.innerWidth < 767) {
        menu.style.maxHeight = '0';
        menu.style.opacity = '0';

        function onTransitionEnd(e) {
            if (e.propertyName === 'max-height') {
                if (toggle.getAttribute('aria-expanded') === 'true') menu.style.maxHeight = '';
                menu.removeEventListener('transitionend', onTransitionEnd);
            }
        }

        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';

            if (expanded) {
                menu.style.maxHeight = '200px';
                requestAnimationFrame(() => {
                    menu.style.maxHeight = '0';
                    menu.style.opacity = '0';
                });
                toggle.setAttribute('aria-expanded', 'false');
            } else {
                menu.style.maxHeight = '200px';
                menu.style.opacity = '1';
                toggle.setAttribute('aria-expanded', 'true');
                menu.addEventListener('transitionend', onTransitionEnd);
            }
        });
    }
});