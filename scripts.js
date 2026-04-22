// Mobile menu functionality
const menuOpenButton = document.getElementById('menu-open-button');
const menuCloseButton = document.getElementById('menu-close-button');
const navMenu = document.querySelector('.nav-menu');

if (menuOpenButton && menuCloseButton && navMenu) {
    menuOpenButton.addEventListener('click', () => {
        navMenu.classList.add('active');
    });

    menuCloseButton.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}
