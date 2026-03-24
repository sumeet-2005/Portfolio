// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission with Formspree
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }
        
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                if (formStatus) {
                    formStatus.innerHTML = '✅ Message sent successfully! I\'ll get back to you soon.';
                    formStatus.style.color = '#00b894';
                }
                contactForm.reset();
            } else {
                const errorData = await response.json();
                console.error('Formspree error:', errorData);
                if (formStatus) {
                    formStatus.innerHTML = '❌ Failed to send. Please try again or email me directly at sumeetbiradar444@gmail.com';
                    formStatus.style.color = '#d63031';
                }
            }
        } catch (error) {
            console.error('Network error:', error);
            if (formStatus) {
                formStatus.innerHTML = '❌ Network error. Please check your connection and try again.';
                formStatus.style.color = '#d63031';
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
            
            // Clear status after 5 seconds
            setTimeout(() => {
                if (formStatus) {
                    formStatus.innerHTML = '';
                }
            }, 5000);
        }
    });
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = 'var(--shadow)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Add animation on scroll
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

// Observe all sections and cards
document.querySelectorAll('section, .skill-card, .project-card, .contact-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active navigation highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Fix for hover popups
document.querySelectorAll('.stat-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const popup = this.querySelector('.stat-hover-content');
        if (popup) {
            const rect = popup.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            if (rect.bottom > viewportHeight) {
                popup.style.top = 'auto';
                popup.style.bottom = '100%';
                popup.style.transform = 'translateX(-50%) translateY(-15px)';
            } else {
                popup.style.top = '100%';
                popup.style.bottom = 'auto';
                popup.style.transform = 'translateX(-50%) translateY(15px)';
            }
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const popup = this.querySelector('.stat-hover-content');
        if (popup) {
            popup.style.top = '';
            popup.style.bottom = '';
            popup.style.transform = '';
        }
    });
});

// Mobile support
if (window.innerWidth <= 768) {
    document.querySelectorAll('.stat-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const popup = this.querySelector('.stat-hover-content');
            
            document.querySelectorAll('.stat-hover-content').forEach(p => {
                if (p !== popup) {
                    p.style.display = 'none';
                }
            });
            
            if (popup.style.display === 'block') {
                popup.style.display = 'none';
            } else {
                popup.style.display = 'block';
            }
        });
    });
}

// Smooth reveal for stat items
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px'
});

document.querySelectorAll('.stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    statObserver.observe(el);
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
