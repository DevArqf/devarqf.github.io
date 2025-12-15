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
// GITHUB API - FETCH REPOS WITH CUSTOM OVERRIDES
// ============================================

const GITHUB_USERNAME = 'DevArqf';
const projectGrid = document.getElementById('project-grid');

const defaultProjectImages = {
    'VoiceGuard': 'https://www.shutterstock.com/image-vector/ai-voice-bot-sound-wave-600nw-2656509111.jpg',
    'Cadia-Bot': 'https://externlabs.com/blogs/wp-content/uploads/2023/04/discord-bot-1.jpg',
    'Molek-Syntez-Solitaire-Solver': 'https://fanatical.imgix.net/product/original/8d8a5eb6-4b87-4733-ad7e-6d8580c722f8.jpeg?auto=compress,format&w=460&fit=crop&h=259',
    'create-discobase': 'https://i.ytimg.com/vi/IBOgiLbbqQw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDqSsb29-6TNW-K9J5FQuUWsE_YGQ',
    'DeBugBuddy': 'https://raw.githubusercontent.com/DevArqf/DeBugBuddy/main/DeBugBuddy%20Logo.png'
};

let customConfigs = {};

async function loadCustomConfig() {
    try {
        const res = await fetch('/projects-config.json');
        if (res.ok) {
            const configs = await res.json();
            customConfigs = configs.reduce((map, cfg) => {
                map[cfg.repoName] = cfg;
                return map;
            }, {});
        }
    } catch (err) {
        console.warn('Could not load projects-config.json – using defaults only', err);
    }
}

function formatName(name) {
    return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

async function fetchGitHubRepos() {
    if (!projectGrid) {
        console.error('Element with id="project-grid" not found in HTML!');
        return;
    }

    await loadCustomConfig();

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
    } catch (error) {
        console.warn('GitHub API failed, trying fallback repos.json:', error);
        try {
            const response = await fetch('/repos.json');
            if (!response.ok) throw new Error('Fallback fetch failed');
            const repos = await response.json();
            displayProjects(repos.slice(0, 6));
        } catch (fallbackError) {
            console.error('Fallback failed too:', fallbackError);
            projectGrid.innerHTML = '<p style="text-align:center;color:var(--text-muted);">Failed to load projects.</p>';
        }
    }
}

function displayProjects(repos) {
    if (!projectGrid) return;

    projectGrid.innerHTML = '';

    repos.forEach(repo => {
        const config = customConfigs[repo.name] || {};
        const displayName = config.displayName || formatName(repo.name);
        const description = repo.description || 'No description available.';
        const imgUrl = config.imageUrl || defaultProjectImages[repo.name] || '';
        const detailPage = config.detailPage || null;

        let tags = [];
        if (config.customTags) {
            tags = config.customTags;
        } else {
            if (repo.language) tags.push(repo.language);
            if (repo.topics?.length > 0) {
                tags = [...tags, ...repo.topics.slice(0, 4)];
            }
        }
        tags = tags.filter(Boolean);

        const card = document.createElement('div');
        card.className = 'project-card';

        if (detailPage) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                if (e.target.closest('a')) return;
                window.location.href = detailPage;
            });
        }

        card.innerHTML = `
            <div class="project-image">
                ${imgUrl 
                    ? `<img src="${imgUrl}" alt="${displayName}" loading="lazy">`
                    : `<span class="project-placeholder">📂</span>`
                }
            </div>
            <div class="project-info">
                <h3 class="project-title">${displayName}</h3>
                <p class="project-desc">${description}</p>
                <div class="project-tags">
                    ${tags.map(t => `<span>${t}</span>`).join('')}
                </div>
                <hr class="project-divider">
                <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                    <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-link">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        Source Code
                    </a>
                </div>
            </div>
        `;

        projectGrid.appendChild(card);
    });
}

// ============================================
// DOM LOADED & RESIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    if (projectGrid) {
        fetchGitHubRepos();
    }

    const navbar = document.querySelector('.navbar');
    if (window.innerWidth <= 768 && navbar && navMenu) {
        navMenu.style.top = navbar.offsetHeight + 'px';
    }
});

window.addEventListener('resize', () => {
    const navbar = document.querySelector('.navbar');
    if (window.innerWidth <= 768 && navbar && navMenu) {
        navMenu.style.top = navbar.offsetHeight + 'px';
    }
});