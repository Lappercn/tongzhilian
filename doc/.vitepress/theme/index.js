import DefaultTheme from 'vitepress/theme'
import './style.css'

import TeamGallery from './components/TeamGallery.vue'
import TeamMembers from './components/TeamMembers.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('TeamGallery', TeamGallery)
        app.component('TeamMembers', TeamMembers)
        if (typeof window !== 'undefined') {
            // Vanilla JS Tilt Effect
            const initTilt = () => {
                const cards = document.querySelectorAll('.team-card, .VPFeature');

                cards.forEach(card => {
                    card.addEventListener('mousemove', (e) => {
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;

                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;

                        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
                        const rotateY = ((x - centerX) / centerX) * 10;

                        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                    });

                    card.addEventListener('mouseleave', () => {
                        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                    });
                });
            };

            // Initialize on mount and route change
            window.addEventListener('load', initTilt);

            // Observer for dynamic content (like route changes in SPA)
            const observer = new MutationObserver((mutations) => {
                initTilt();
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
}
