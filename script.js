// Password Protection
const password = "ourlove2024"; // Change this to your desired password
const passwordOverlay = document.getElementById('password-overlay');
const passwordInput = document.getElementById('password-input');
const passwordSubmit = document.getElementById('password-submit');
const passwordError = document.getElementById('password-error');

passwordSubmit.addEventListener('click', checkPassword);
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

function checkPassword() {
    if (passwordInput.value === password) {
        passwordOverlay.style.display = 'none';
        initWebsite();
    } else {
        passwordError.textContent = 'Incorrect password. Try again.';
        passwordInput.value = '';
        passwordInput.focus();
    }
}

function initWebsite() {
    // Initialize GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    // Landing page animation
    gsap.from('.landing-title', {
        duration: 2,
        y: 50,
        opacity: 0,
        ease: "power2.out"
    });

    gsap.from('.landing-subtitle', {
        duration: 2,
        y: 30,
        opacity: 0,
        delay: 0.5,
        ease: "power2.out"
    });

    gsap.from('.enter-btn', {
        duration: 1.5,
        y: 20,
        opacity: 0,
        delay: 1,
        ease: "back.out(1.7)"
    });

    // Enter button functionality
    document.getElementById('enter-btn').addEventListener('click', () => {
        document.getElementById('timeline').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Memory cards animation on scroll
    gsap.utils.toArray('.memory-card').forEach((card, index) => {
        gsap.set(card, { opacity: 0, y: 50 });

        ScrollTrigger.create({
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => {
                gsap.to(card, {
                    duration: 0.8,
                    opacity: 1,
                    y: 0,
                    delay: index * 0.1,
                    ease: "power2.out"
                });
            },
            onLeaveBack: () => {
                gsap.to(card, {
                    duration: 0.5,
                    opacity: 0,
                    y: -50,
                    ease: "power2.out"
                });
            }
        });
    });

    // Hover effects for memory cards
    document.querySelectorAll('.memory-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1.05,
                rotationY: 5,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1,
                rotationY: 0,
                ease: "power2.out"
            });
        });
    });

    // Click effects for memory cards (popup)
    document.querySelectorAll('.memory-card').forEach(card => {
        card.addEventListener('click', () => {
            const content = card.querySelector('.card-content');
            const isExpanded = card.classList.contains('expanded');

            if (isExpanded) {
                gsap.to(card, {
                    duration: 0.5,
                    scale: 1,
                    ease: "power2.out"
                });
                card.classList.remove('expanded');
            } else {
                gsap.to(card, {
                    duration: 0.5,
                    scale: 1.1,
                    ease: "power2.out"
                });
                card.classList.add('expanded');
            }
        });
    });

    // Collage animation
    gsap.set('.collage-item', { opacity: 0, scale: 0.8 });

    ScrollTrigger.create({
        trigger: '.collage',
        start: "top 80%",
        onEnter: () => {
            gsap.to('.collage-item', {
                duration: 1,
                opacity: 1,
                scale: 1,
                stagger: 0.2,
                ease: "back.out(1.7)"
            });
        }
    });

    // Background music
    const bgMusic = document.getElementById('bg-music');
    let musicPlaying = false;

    // Auto-play music on first user interaction
    document.addEventListener('click', () => {
        if (!musicPlaying) {
            bgMusic.play().catch(e => {
                console.log('Auto-play prevented by browser. Music will play on next interaction.');
            });
            musicPlaying = true;
        }
    }, { once: true });

    // Add floating hearts animation
    createFloatingHearts();

    // Add sparkle effects on hover
    addSparkleEffects();
}

function createFloatingHearts() {
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'hearts-container';
    heartsContainer.style.position = 'fixed';
    heartsContainer.style.top = '0';
    heartsContainer.style.left = '0';
    heartsContainer.style.width = '100%';
    heartsContainer.style.height = '100%';
    heartsContainer.style.pointerEvents = 'none';
    heartsContainer.style.zIndex = '1';
    document.body.appendChild(heartsContainer);

    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animation = `float ${Math.random() * 3 + 2}s linear infinite`;
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(createHeart, 2000);

    // Add CSS animation for floating hearts
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

function addSparkleEffects() {
    document.querySelectorAll('.memory-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            for (let i = 0; i < 5; i++) {
                createSparkle(card);
            }
        });
    });
}

function createSparkle(element) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.fontSize = '20px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '10';
    sparkle.style.left = Math.random() * element.offsetWidth + 'px';
    sparkle.style.top = Math.random() * element.offsetHeight + 'px';

    element.appendChild(sparkle);

    gsap.fromTo(sparkle,
        { scale: 0, opacity: 1 },
        {
            scale: 1,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => sparkle.remove()
        }
    );
}

// Initialize the website if password is already entered (for development)
if (localStorage.getItem('passwordEntered') === 'true') {
    passwordOverlay.style.display = 'none';
    initWebsite();
}