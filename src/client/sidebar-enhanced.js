/**
 * Ultra-Modern Sidebar Enhancements
 * Creative interactions & animations
 */

export default function enhanceSidebar() {
  // Wait for DOM to be ready
  const init = () => {
    const sidebarMenus = document.querySelectorAll('.theme-doc-sidebar-menu');

    sidebarMenus.forEach((menu) => {
      // Add subtle parallax effect on scroll
      let ticking = false;
      const sidebar = menu.closest('.doc-sidebar-container');

      if (sidebar) {
        window.addEventListener('scroll', () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              const scrolled = window.scrollY;
              const items = menu.querySelectorAll('.menu__list-item');

              items.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

                if (isVisible) {
                  const depth = Math.abs(rect.top - window.innerHeight / 2) / window.innerHeight;
                  const opacity = 1 - depth * 0.3;
                  item.style.opacity = Math.max(0.4, Math.min(1, opacity));
                }
              });

              ticking = false;
            });

            ticking = true;
          }
        });
      }

      // Add magnetic effect to menu items
      const menuLinks = menu.querySelectorAll('.menu__link, .menu__link--sublist');

      menuLinks.forEach((link) => {
        link.addEventListener('mousemove', (e) => {
          const rect = link.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const deltaX = (x - centerX) / 10;
          const deltaY = (y - centerY) / 10;

          link.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });

        link.addEventListener('mouseleave', () => {
          link.style.transform = '';
        });
      });

      // Add glow effect on category expand/collapse
      const categories = menu.querySelectorAll('.menu__list-item');

      categories.forEach((category) => {
        const link = category.querySelector('.menu__link--sublist');
        if (!link) return;

        link.addEventListener('click', () => {
          // Create ripple effect
          const ripple = document.createElement('div');
          ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: radial-gradient(circle, var(--ifm-color-primary) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 0;
            transition: width 0.6s ease, height 0.6s ease, opacity 0.6s ease;
          `;

          link.style.position = 'relative';
          link.style.overflow = 'hidden';
          link.appendChild(ripple);

          // Animate ripple
          requestAnimationFrame(() => {
            ripple.style.width = '300px';
            ripple.style.height = '300px';
            ripple.style.opacity = '0.2';
          });

          // Clean up
          setTimeout(() => {
            ripple.style.opacity = '0';
            setTimeout(() => ripple.remove(), 600);
          }, 600);
        });
      });

      // Number badges removed for cleaner minimalistic design

      // Add smooth reveal animation for submenus
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            const target = mutation.target;
            const submenu = target.querySelector('.menu__list');

            if (submenu) {
              const isCollapsed = target.classList.contains('menu__list-item--collapsed');

              if (!isCollapsed) {
                // Animate items in
                const items = submenu.querySelectorAll('.menu__list-item');
                items.forEach((item, index) => {
                  item.style.animation = 'none';
                  item.style.opacity = '0';
                  item.style.transform = 'translateX(-10px)';

                  setTimeout(() => {
                    item.style.animation = 'slideInStagger 300ms ease forwards';
                    item.style.animationDelay = `${index * 50}ms`;
                  }, 50);
                });
              }
            }
          }
        });
      });

      categories.forEach((category) => {
        observer.observe(category, { attributes: true });
      });
    });
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialize after navigation
  window.addEventListener('load', () => {
    setTimeout(init, 200);
  });
}
