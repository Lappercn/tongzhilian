import DefaultTheme from 'vitepress/theme'
import './style.css'

import TeamGallery from './components/TeamGallery.vue'
import TeamMembers from './components/TeamMembers.vue'
import AddMemberForm from './components/AddMemberForm.vue'
import CaptchaInput from './components/CaptchaInput.vue'
import QrLightbox from './components/QrLightbox.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('TeamGallery', TeamGallery)
        app.component('TeamMembers', TeamMembers)
        app.component('AddMemberForm', AddMemberForm)
        app.component('CaptchaInput', CaptchaInput)
        app.component('QrLightbox', QrLightbox)
        if (typeof window !== 'undefined') {
            const initTilt = () => {
                const isDesktop = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 769
                if (!isDesktop) return
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
            const observer = new MutationObserver(() => { initTilt() });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
}
