// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            navLinks.classList.remove('active');
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Your Professional Projects
const projects = [
    {
        title: "E-Commerce Platform",
        description: "A full-featured e-commerce platform with product management, cart system, and payment integration. Built with modern technologies for optimal performance.",
        tech: ["React", "Node.js", "MongoDB", "Stripe"],
        link: "#",
        featured: true
    },
    {
        title: "Portfolio Website",
        description: "A responsive portfolio website showcasing creative work and professional experience. Features smooth animations and modern design principles.",
        tech: ["HTML5", "CSS3", "JavaScript", "GSAP"],
        link: "#",
        featured: true
    },
    {
        title: "Task Management App",
        description: "Productivity application for managing tasks and projects. Includes user authentication, real-time updates, and collaborative features.",
        tech: ["Vue.js", "Firebase", "Tailwind CSS"],
        link: "#",
        featured: true
    },
    {
        title: "Weather Dashboard",
        description: "Real-time weather application with interactive maps and detailed forecasts. Integrates multiple weather APIs for accurate data.",
        tech: ["JavaScript", "API Integration", "Chart.js"],
        link: "#",
        featured: false
    }
];

// Render Projects
function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <a href="${project.link}" class="btn btn-primary" target="_blank">View Project <i class="fas fa-arrow-right"></i></a>
            </div>
        `).join('');
    }
}

// Your Professional Skills
const skills = [
    { name: "HTML5", icon: "fab fa-html5" },
    { name: "CSS3", icon: "fab fa-css3-alt" },
    { name: "JavaScript", icon: "fab fa-js" },
    { name: "React", icon: "fab fa-react" },
    { name: "Node.js", icon: "fab fa-node-js" },
    { name: "Python", icon: "fab fa-python" },
    { name: "Git", icon: "fab fa-git-alt" },
    { name: "MongoDB", icon: "fas fa-database" },
    { name: "Responsive Design", icon: "fas fa-mobile-alt" },
    { name: "UI/UX Design", icon: "fas fa-paint-brush" }
];

// Render Skills
function renderSkills() {
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid) {
        skillsGrid.innerHTML = skills.map(skill => `
            <div class="skill-card">
                <i class="${skill.icon}"></i>
                <h3>${skill.name}</h3>
            </div>
        `).join('');
    }
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            alert('Thank you for reaching out! I\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
        
        // For actual form submission, uncomment and configure:
        /*
        const formData = new FormData(contactForm);
        try {
            const response = await fetch('your-form-endpoint', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                alert('Message sent successfully!');
                contactForm.reset();
            }
        } catch (error) {
            alert('Error sending message. Please try again.');
        }
        */
    });
}

// Add scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-card, .about-text, .contact-wrapper').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderSkills();
});