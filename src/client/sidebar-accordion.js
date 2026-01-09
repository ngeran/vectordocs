/**
 * Sidebar Accordion Behavior
 * When one category expands, collapse all others
 */

export default function sidebarAccordion() {
  // Wait for the sidebar to be ready
  const initAccordion = () => {
    const sidebarMenus = document.querySelectorAll('.theme-doc-sidebar-menu');

    sidebarMenus.forEach((menu) => {
      const categories = menu.querySelectorAll('.menu__list-item');

      categories.forEach((category) => {
        const link = category.querySelector('.menu__link--sublist');
        if (!link) return;

        link.addEventListener('click', (e) => {
          // Check if this category is currently collapsed
          const isCollapsed = category.classList.contains('menu__list-item--collapsed');

          // Close all other categories in the same sidebar
          categories.forEach((otherCategory) => {
            if (otherCategory !== category && !otherCategory.classList.contains('menu__list-item--collapsed')) {
              otherCategory.classList.add('menu__list-item--collapsed');
            }
          });
        });
      });
    });
  };

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordion);
  } else {
    initAccordion();
  }

  // Re-initialize after navigation (for SPA routing)
  window.addEventListener('load', () => {
    setTimeout(initAccordion, 100);
  });
}
