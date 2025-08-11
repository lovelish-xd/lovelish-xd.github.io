// Under Construction Page JavaScript
class UnderConstructionPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupProgressAnimation();
        this.setupEmailForm();
        this.setupIntersectionObserver();
        this.setupParallaxEffect();
        this.setupTypewriterEffect();
    }

    setupProgressAnimation() {
        const progressBar = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        // Animate progress bar on load
        setTimeout(() => {
            progressBar.style.width = '50%';
        }, 500);

        // Update progress randomly every 10 seconds (simulate ongoing work)
        setInterval(() => {
            const currentProgress = Math.min(50 + Math.random() * 10, 69);
            progressBar.style.width = `${currentProgress}%`;
            progressText.textContent = `${Math.round(currentProgress)}% Complete`;
        }, 10000);
    }

    setupEmailForm() {
        const emailForm = document.querySelector('.email-form');
        const emailInput = document.querySelector('.email-input');
        const notifyBtn = document.querySelector('.notify-btn');

        if (emailForm) {
            emailForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleEmailSubmission(emailInput.value);
            });

            notifyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleEmailSubmission(emailInput.value);
            });

            // Add real-time email validation
            emailInput.addEventListener('input', (e) => {
                this.validateEmail(e.target.value);
            });
        }
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailInput = document.querySelector('.email-input');
        const notifyBtn = document.querySelector('.notify-btn');

        if (email === '') {
            emailInput.style.borderColor = 'var(--border-color)';
            notifyBtn.disabled = false;
            notifyBtn.style.opacity = '1';
        } else if (emailRegex.test(email)) {
            emailInput.style.borderColor = '#10b981';
            notifyBtn.disabled = false;
            notifyBtn.style.opacity = '1';
        } else {
            emailInput.style.borderColor = '#ef4444';
            notifyBtn.disabled = true;
            notifyBtn.style.opacity = '0.6';
        }
    }

    handleEmailSubmission(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const notifyBtn = document.querySelector('.notify-btn');
        const originalText = notifyBtn.textContent;

        if (!emailRegex.test(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate API call
        notifyBtn.textContent = 'Subscribing...';
        notifyBtn.disabled = true;

        setTimeout(() => {
            notifyBtn.textContent = '✓ Subscribed!';
            notifyBtn.style.background = '#10b981';
            this.showNotification('Thanks! You\'ll be notified when the portfolio is ready.', 'success');
            
            // Reset after 3 seconds
            setTimeout(() => {
                notifyBtn.textContent = originalText;
                notifyBtn.disabled = false;
                notifyBtn.style.background = '';
                document.querySelector('.email-input').value = '';
            }, 3000);
        }, 1500);
    }

    showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe feature cards
        document.querySelectorAll('.feature-card').forEach(card => {
            observer.observe(card);
        });
    }

    setupParallaxEffect() {
        if (window.innerWidth > 768) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = document.querySelector('.floating-elements');
                if (parallax) {
                    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            });
        }
    }

    setupTypewriterEffect() {
        const title = document.querySelector('.gradient-text');
        if (title) {
            const text = title.textContent;
            title.textContent = '';
            title.style.opacity = '1';

            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    title.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };

            setTimeout(typeWriter, 1000);
        }
    }
}

// Utility functions
function addCustomCursor() {
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add hover effects
        document.querySelectorAll('a, button, .feature-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
}

function addEasterEgg() {
    let sequence = '';
    const easterEggCode = 'portfolio';

    document.addEventListener('keydown', (e) => {
        sequence += e.key.toLowerCase();
        sequence = sequence.slice(-easterEggCode.length);

        if (sequence === easterEggCode) {
            document.body.classList.add('easter-egg-active');
            setTimeout(() => {
                document.body.classList.remove('easter-egg-active');
            }, 3000);
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UnderConstructionPage();
    addCustomCursor();
    addEasterEgg();
});

// Add additional CSS for animations and notifications
const additionalStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--shadow-large);
        z-index: 1000;
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s ease;
        max-width: 300px;
    }

    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }

    .notification-success {
        background: #10b981;
        color: white;
    }

    .notification-error {
        background: #ef4444;
        color: white;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .notification-icon {
        font-weight: bold;
        font-size: 1.1rem;
    }

    .notification-message {
        font-size: 0.9rem;
    }

    .feature-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }

    .feature-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        opacity: 0.7;
    }

    .custom-cursor.hover {
        transform: scale(1.5);
        opacity: 1;
    }

    .easter-egg-active {
        animation: rainbow-bg 3s ease-in-out;
    }

    @keyframes rainbow-bg {
        0%, 100% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
    }

    /* Hide custom cursor on mobile */
    @media (max-width: 768px) {
        .custom-cursor {
            display: none;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
