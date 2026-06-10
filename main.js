document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('nav-toggle');
    const buttons = document.getElementById('nav-buttons');
    const MOBILE_BREAKPOINT = 767;

    toggle.addEventListener('click', () => {
        const isClosed = buttons.classList.contains('closed');
        buttons.classList.toggle('closed', !isClosed);
        buttons.classList.toggle('open', isClosed);
        toggle.setAttribute('aria-expanded', String(isClosed));
    });

    window.addEventListener('resize', () => {
        const isDesktop = window.innerWidth > MOBILE_BREAKPOINT;

        if (isDesktop) {
            buttons.classList.remove('open', 'closed');
            toggle.setAttribute('aria-expanded', 'false');
        } else {
            buttons.classList.remove('open');
            buttons.classList.add('closed');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    const isDesktop = window.innerWidth > MOBILE_BREAKPOINT;
    if (!isDesktop) {
        buttons.classList.add('closed');
    }
});