/**
 * NAVBAR COMPONENT
 * ================
 * Reusable navigation bar for all pages
 * 
 * Usage: Add this script to your HTML:
 * <script src="/static/js/navbar.js"></script>
 * 
 * Then add this where you want the navbar:
 * <div id="navbar-container"></div>
 */

(function () {
    // Define navigation items
    const navItems = [
        { href: '/', icon: 'fas fa-home', text: 'Home', page: 'index' },
        { href: '/about.html', icon: 'fas fa-info-circle', text: 'About', page: 'about' },
        { href: '/services.html', icon: 'fas fa-concierge-bell', text: 'Services', page: 'services' },
        { href: '/projects.html', icon: 'fas fa-city', text: 'Projects', page: 'projects' },
        { href: '/team.html', icon: 'fas fa-users', text: 'Team', page: 'team' },
        { href: '/achievements.html', icon: 'fas fa-trophy', text: 'Achievements', page: 'achievements' },
        { href: '/partners.html', icon: 'fas fa-handshake', text: 'Partners', page: 'partners' },
        { href: '/contact.html', icon: 'fas fa-envelope', text: 'Contact', page: 'contact' }
    ];

    // Get current page from URL
    function getCurrentPage() {
        const path = window.location.pathname;
        if (path === '/' || path.endsWith('index.html')) return 'index';
        const page = path.split('/').pop().replace('.html', '');
        return page || 'index';
    }

    // Generate navbar HTML
    function generateNavbar() {
        const currentPage = getCurrentPage();

        const navItemsHTML = navItems.map(item => {
            const isActive = item.page === currentPage ? 'active' : '';
            return `
                <li class="nav-item ${isActive}">
                    <a class="nav-link" href="${item.href}">
                        <i class="${item.icon}"></i> ${item.text}
                    </a>
                </li>
            `;
        }).join('');

        return `
            <header>
                <nav class="navbar navbar-expand-lg navbar-custom">
                    <div class="container">
                        <a class="navbar-brand" href="/">
                            <i class="fas fa-building"></i> Calamba Expressive Properties
                        </a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav ml-auto">
                                ${navItemsHTML}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        `;
    }

    // Insert navbar when DOM is ready
    function insertNavbar() {
        const container = document.getElementById('navbar-container');
        if (container) {
            container.innerHTML = generateNavbar();
        } else {
            console.warn('Navbar container not found. Add <div id="navbar-container"></div> to your HTML.');
        }
    }

    // Auto-insert if document is ready, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insertNavbar);
    } else {
        insertNavbar();
    }
})();
