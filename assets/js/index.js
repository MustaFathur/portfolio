(function() {
    function initNavbar() {
        const themeToggle = document.getElementById('theme-toggle');
        const menuToggle = document.getElementById('menu-toggle');
        const navigationMenu = document.querySelector('.navigation-menu');
        const body = document.body;
        const scrollUp = document.querySelector('.scroll-up');
        const navbar = document.querySelector('nav');

        if (!themeToggle || !menuToggle || !navigationMenu || !scrollUp || !navbar) {
            console.error('One or more required elements not found');
            return;
        }

        // Inisiasi Icon
        if (typeof feather !== 'undefined') {
            feather.replace();
        } else {
            console.error('Feather icons not loaded');
        }

        // Load Theme yang disimpan
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
        }
        updateThemeIcon();

        // Fungsionalitas Toggle Theme
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            updateThemeIcon();
            saveTheme();
            console.log('Theme toggled');
        });

        function updateThemeIcon() {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                if (body.classList.contains('dark-mode')) {
                    icon.setAttribute('data-feather', 'moon');
                } else {
                    icon.setAttribute('data-feather', 'sun');
                }
                if (typeof feather !== 'undefined') {
                    feather.replace();
                }
            }
        }

        function saveTheme() {
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        }

        // Function Aktivasi Menu
        menuToggle.addEventListener('click', () => {
            navigationMenu.classList.toggle('active');
            console.log('Menu toggled');
        });

        // Close Menu Ketika Menekan Di Luar
        document.addEventListener('click', (event) => {
            if (!navigationMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navigationMenu.classList.remove('active');
            }
        });

        // Layout Update Pada Resize Window
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                navigationMenu.classList.remove('active');
            }
        });

        // Scroll Up Function
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            const navbarBottom = navbar.offsetTop + navbar.offsetHeight;

            if (scrollPosition > navbarBottom) {
                scrollUp.classList.add('show');
            } else {
                scrollUp.classList.remove('show');
            }
        });

        scrollUp.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        console.log('Navbar and scroll-to-top initialization complete');
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }
})();