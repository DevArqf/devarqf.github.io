// ============================================
// PARTICLE SYSTEM
// ============================================
/*
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null, radius: 150 };
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.density = Math.random() * 30 + 1;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
    }
    draw() {
        const theme = document.body.dataset.theme;
        const color = theme === 'light' ? '77, 166, 255' : '77, 166, 255';
        ctx.fillStyle = `rgba(${color}, ${this.size / 3})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    update() {
        if (mouse.x && mouse.y) {
            let dx = mouse.x - this.x, dy = mouse.y - this.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
                let force = (mouse.radius - dist) / mouse.radius;
                let angle = Math.atan2(dy, dx);
                this.x -= Math.cos(angle) * force * this.density * 0.5;
                this.y -= Math.sin(angle) * force * this.density * 0.5;
            }
        }
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
}
function initParticles() {
    particles = [];
    let count = Math.min((canvas.width * canvas.height) / 9000, 120);
    for (let i = 0; i < count; i++) particles.push(new Particle());
}
function connectParticles() {
    const theme = document.body.dataset.theme;
    const color = theme === 'light' ? '77, 166, 255' : '77, 166, 255';
    for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.strokeStyle = `rgba(${color}, ${0.12 - dist / 1000})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
}
// Mouse and Touch Events
window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth <= 768 && navMenu) {
        navMenu.style.top = navbar.offsetHeight + 'px';
    }
});
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });
// Mobile touch support
if (!isTouchDevice) {
    document.addEventListener('touchstart', e => {
        const touch = e.touches[0];
        if (touch) {
            mouse.x = touch.clientX;
            mouse.y = touch.clientY;
        }
    }, { passive: true });
    document.addEventListener('touchmove', e => {
        const touch = e.touches[0];
        if (touch) {
            mouse.x = touch.clientX;
            mouse.y = touch.clientY;
        }
    }, { passive: true });
    document.addEventListener('touchend', () => {
        mouse.x = null;
        mouse.y = null;
    }, { passive: true });
}
resizeCanvas(); initParticles(); animate();
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth <= 768 && navbar && navMenu) {
        navMenu.style.top = navbar.offsetHeight + 'px';
    }
});
*/
// ============================================
// THEME TOGGLE
// ============================================
/*
const themeBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.body.dataset.theme = savedTheme;
updateThemeIcon(savedTheme);
function updateThemeIcon(theme) {
    const isDark = theme === 'dark';
    themeBtn.innerHTML = isDark
        ? `<img src="images/moon.png" alt="Dark Mode">`
        : `<img src="images/sun.png" alt="Light Mode">`;
}
themeBtn.addEventListener('click', () => {
    const currentTheme = document.body.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});
*/
// ============================================
// MOBILE MENU
// ============================================
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
    });
}

document.addEventListener('click', (e) => {
    if (navMenu && !navMenu.contains(e.target) && menuToggle && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        const offset = 80;
        const targetY = target.getBoundingClientRect().top + window.pageYOffset - offset;
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        const duration = 800;
        const startTime = performance.now();
        function animateScroll(currentTime) {
            const time = currentTime - startTime;
            const progress = Math.min(time / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            window.scrollTo(0, startY + distance * easeOut);
            if (progress < 1) requestAnimationFrame(animateScroll);
        }
        requestAnimationFrame(animateScroll);
        if (navMenu) navMenu.classList.remove('active');
    });
});

// ============================================
// ACTIVE NAV ON SCROLL
// ============================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (pageYOffset >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
});

// ============================================
// GITHUB API - FETCH REPOS
// ============================================
const GITHUB_USERNAME = 'DevArqf';
const projectGrid = document.getElementById('project-grid');
const projectImages = {
    'VoiceGuard': 'https://www.shutterstock.com/image-vector/ai-voice-bot-sound-wave-600nw-2656509111.jpg',
    'Cadia-Bot': 'https://externlabs.com/blogs/wp-content/uploads/2023/04/discord-bot-1.jpg',
    'Molek-Syntez-Solitaire-Solver': 'https://fanatical.imgix.net/product/original/8d8a5eb6-4b87-4733-ad7e-6d8580c722f8.jpeg?auto=compress,format&w=460&fit=crop&h=259',
    'create-discobase': 'https://i.ytimg.com/vi/IBOgiLbbqQw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDqSsb29-6TNW-K9J5FQuUWsE_YGQ',
    'DeBugBuddy': 'https://raw.githubusercontent.com/DevArqf/DeBugBuddy/main/DeBugBuddy%20Logo.png',
    'jolt-python-api': 'https://github.com/DevArqf/devarqf.github.io/blob/main/images/Jolt%Python%20Logo.png',
    'jolt-js-api': 'https://github.com/DevArqf/devarqf.github.io/blob/main/images/Jolt%20Javascript%20Logo.png',
    'Spoti-DL': 'https://github.com/DevArqf/devarqf.github.io/blob/main/images/Spoti%20DL%20.png'
};

async function fetchGitHubRepos() {
    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'DevArqf-Portfolio'
                }
            }
        );

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const repos = await response.json();

        const filtered = repos.filter(r => {
            if (r.fork && r.name === 'create-discobase') return true;
            const excluded = ['DevArqf', 'devarqf.github.io', 'WIMMG', 'Portfolio Ideas', 'API-Header-Spoofer'];
            return !r.fork && !excluded.includes(r.name);
        });

        if (filtered.length === 0) {
            projectGrid.innerHTML = '<p style="text-align:center;color:var(--text-muted);">No projects found.</p>';
            return;
        }

        displayProjects(filtered.slice(0, 6));
        return;

    } catch (error) {
        console.warn('Direct API failed, falling back to cached repos.json:', error);
    }

    try {
        const response = await fetch('repos.json');
        const repos = await response.json();
        displayProjects(repos.slice(0, 6));
    } catch (error) {
        console.error('Fallback failed too:', error);
        projectGrid.innerHTML = '<p style="text-align:center;color:var(--text-muted);">Failed to load projects. (Check console for details)</p>';
    }
}

function displayProjects(repos) {
    projectGrid.innerHTML = '';
    repos.forEach(repo => {
        const imgUrl = projectImages[repo.name] || '';
        const card = document.createElement('div');
        card.className = 'project-card';

        let tags = repo.language ? [repo.language] : [];
        if (repo.topics && repo.topics.length > 0) {
            tags = [...tags, ...repo.topics.slice(0, 4)];
        }
        tags = tags.filter(Boolean);

        card.innerHTML = `
            <div class="project-image">
                ${imgUrl ? `<img src="${imgUrl}" alt="${repo.name}">` : `<span class="project-placeholder">📂</span>`}
            </div>
            <div class="project-info">
                <h3 class="project-title">${formatName(repo.name)}</h3>
                <p class="project-desc">${repo.description || 'No description available.'}</p>
                <div class="project-tags">${tags.map(t => `<span>${t}</span>`).join('')}</div>
                <hr class="project-divider">
                <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-link">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    Source Code
                </a>
            </div>
        `;
        projectGrid.appendChild(card);
    });
}

function formatName(name) {
    return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

document.addEventListener('DOMContentLoaded', fetchGitHubRepos);

window.addEventListener('resize', () => {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth <= 768 && navMenu) {
        navMenu.style.top = navbar.offsetHeight + 'px';
    }

});
