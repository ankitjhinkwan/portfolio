// ===== ANKIT JINKWAN PORTFOLIO - MAIN JS =====

document.addEventListener('DOMContentLoaded', () => {
    initMatrixRain();
    initGlitchEffect();
    initGradientText();
    initParticles();
    initTypedEffect();
    initHeader();
    initMobileMenu();
    initBackToTop();
    initSkillAnimations();
    initProjectFilter();
    initProjectModal();
    initContactForm();
    initScrollAnimations();
});

// ===== PARTICLES =====
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            animation-duration: ${Math.random() * 15 + 10}s;
            animation-delay: ${Math.random() * 10}s;
            opacity: ${Math.random() * 0.5 + 0.1};
        `;
        container.appendChild(particle);
    }
}

// ===== TYPED EFFECT =====
function initTypedEffect() {
    const el = document.getElementById('typedText');
    if (!el) return;
    const phrases = [
        'Data Scientist 🔬',
        'I speak fluent Python & Sarcasm',
        'Turning Coffee → Insights ☕',
        'My Model > Your Gut Feeling',
        'Correlation ≠ Causation (but still cool)',
        'Professional Data Overthinker',
        'I find patterns in your chaos',
        '99 problems, ML solves 97 of them'
    ];
    let phraseIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
        const current = phrases[phraseIndex];
        el.textContent = isDeleting
            ? current.substring(0, charIndex--)
            : current.substring(0, charIndex++);

        let delay = isDeleting ? 60 : 110;

        if (!isDeleting && charIndex === current.length + 1) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 400;
        }
        setTimeout(type, delay);
    }
    setTimeout(type, 800);
}

// ===== HEADER =====
function initHeader() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) link.classList.add('active');
                });
            }
        });
    }, { passive: true });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    document.body.appendChild(overlay);

    function closeMenu() {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('active');
        if (isOpen) {
            closeMenu();
        } else {
            navLinks.classList.add('active');
            overlay.classList.add('active');
            menuBtn.innerHTML = '<i class="fas fa-times"></i>';
            document.body.style.overflow = 'hidden';
        }
    });

    overlay.addEventListener('click', closeMenu);
    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', closeMenu));
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        btn.classList.toggle('active', window.scrollY > 400);
    }, { passive: true });
}

// ===== SKILL BAR ANIMATIONS =====
function initSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.querySelector('.skill-progress');
                const target = entry.target.dataset.skill;
                if (progress && target) {
                    setTimeout(() => {
                        progress.style.width = target + '%';
                    }, 100);
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });

    skillItems.forEach(item => observer.observe(item));
}

// ===== PROJECT FILTER =====
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            cards.forEach(card => {
                const show = filter === 'all' || card.dataset.category === filter;
                card.style.transition = 'all 0.4s ease';
                if (show) {
                    card.style.display = 'block';
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => { card.style.display = 'none'; }, 400);
                }
            });
        });
    });
}

// ===== PROJECT MODAL =====
const projectData = {
    1: { category: 'ML Model', title: 'House Price Prediction', desc: 'A regression model that predicts house prices using advanced feature engineering, XGBoost and hyperparameter tuning on the Ames Housing dataset. Achieved an RMSE in the top 10% on Kaggle.', tags: ['Python', 'XGBoost', 'Scikit-learn', 'Pandas', 'Matplotlib'], features: ['Feature Engineering', 'Hyperparameter Tuning', 'Cross Validation', 'SHAP Explainability', 'Kaggle Submission', 'Jupyter Notebook'] },
    2: { category: 'EDA', title: 'COVID-19 Data Analysis', desc: 'Comprehensive exploratory data analysis of global COVID-19 trends, vaccination rates and mortality patterns. Visualises spread timelines and compares country-level responses using Pandas and Seaborn.', tags: ['Pandas', 'Seaborn', 'NumPy', 'Matplotlib', 'Jupyter'], features: ['Global Trend Analysis', 'Vaccination Rate Tracking', 'Mortality Pattern Study', 'Country Comparisons', 'Interactive Charts', 'Data Cleaning Pipeline'] },
    3: { category: 'Visualisation', title: 'Sales Analytics Dashboard', desc: 'An interactive Power BI dashboard visualising 3 years of retail sales data. Includes KPIs, revenue trends, regional breakdowns and product performance metrics for data-driven decision making.', tags: ['Power BI', 'DAX', 'SQL', 'Excel'], features: ['KPI Scorecards', 'Regional Breakdown', 'Year-over-Year Trends', 'Product Performance', 'DAX Measures', 'Drill-Through Pages'] },
    4: { category: 'ML Model', title: 'Customer Churn Prediction', desc: 'A binary classification model predicting telecom customer churn with 92% accuracy. Uses Random Forest with SHAP values to explain which features drive churn, enabling targeted retention strategies.', tags: ['Random Forest', 'SHAP', 'Python', 'Scikit-learn', 'Seaborn'], features: ['92% Accuracy', 'SHAP Explainability', 'Feature Importance', 'Confusion Matrix', 'ROC-AUC Analysis', 'Business Insights'] },
    5: { category: 'EDA', title: 'Netflix Content Analysis', desc: 'Deep-dive EDA into Netflix\'s entire content catalogue exploring genre trends, release patterns, content ratings and regional distribution. Uncovers insights on how Netflix has evolved its content strategy.', tags: ['Pandas', 'Plotly', 'Matplotlib', 'Python'], features: ['Genre Trend Analysis', 'Release Pattern Study', 'Content Rating Breakdown', 'Regional Distribution', 'Interactive Plotly Charts', 'Time-Series Analysis'] },
    6: { category: 'NLP', title: 'Twitter Sentiment Analysis', desc: 'An end-to-end NLP pipeline that classifies tweet sentiments in real-time using a fine-tuned BERT model. Deployed with an interactive Streamlit dashboard for live sentiment monitoring.', tags: ['NLP', 'BERT', 'Streamlit', 'Python', 'HuggingFace'], features: ['BERT Fine-Tuning', 'Real-Time Classification', 'Streamlit Dashboard', 'Sentiment Trends', 'Word Cloud Viz', 'REST API Ready'] }
};

function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');

    document.querySelectorAll('.view-project').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.dataset.id;
            const data = projectData[id];
            if (!data) return;

            document.getElementById('modalCategory').textContent = data.category;
            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalDesc').textContent = data.desc;
            document.getElementById('modalImg').src = btn.closest('.project-card').querySelector('img').src;
            document.getElementById('modalImg').alt = data.title;

            const tagsEl = document.getElementById('modalTags');
            tagsEl.innerHTML = data.tags.map(t => `<span class="project-tag">${t}</span>`).join('');

            const featuresEl = document.getElementById('modalFeatures');
            featuresEl.innerHTML = `<h4>Key Features</h4><ul>${data.features.map(f => `<li>${f}</li>`).join('')}</ul>`;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Backend API URL — update port if you change it in .env
    const API_URL = 'http://localhost:9000/api/contact';

    const fields = {
        name:    { el: document.getElementById('contactName'),    error: document.getElementById('nameError'),    validate: v => v.trim().length >= 2  ? '' : 'Name must be at least 2 characters.' },
        email:   { el: document.getElementById('contactEmail'),   error: document.getElementById('emailError'),   validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email.' },
        message: { el: document.getElementById('contactMessage'), error: document.getElementById('messageError'), validate: v => v.trim().length >= 10 ? '' : 'Message must be at least 10 characters.' }
    };

    Object.values(fields).forEach(({ el, error, validate }) => {
        el.addEventListener('input', () => {
            const msg = validate(el.value);
            error.textContent = msg;
            el.classList.toggle('error', !!msg);
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let hasError = false;
        Object.values(fields).forEach(({ el, error, validate }) => {
            const msg = validate(el.value);
            error.textContent = msg;
            el.classList.toggle('error', !!msg);
            if (msg) hasError = true;
        });
        if (hasError) return;

        const submitBtn  = document.getElementById('submitBtn');
        const btnText    = document.getElementById('btnText');
        const btnLoading = document.getElementById('btnLoading');
        const formStatus = document.getElementById('formStatus');

        btnText.style.display    = 'none';
        btnLoading.style.display = 'inline-flex';
        submitBtn.disabled       = true;
        formStatus.style.display = 'none';

        const payload = {
            name:    fields.name.el.value.trim(),
            email:   fields.email.el.value.trim(),
            subject: document.getElementById('contactSubject').value.trim() || 'Portfolio Contact',
            message: fields.message.el.value.trim()
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();

            if (response.ok && result.success) {
                formStatus.textContent   = '✅ Message sent! I\'ll get back to you within 24 hours.';
                formStatus.className     = 'form-status success';
                formStatus.style.display = 'block';
                form.reset();
                showToast('Message sent successfully!', 'success');
            } else {
                throw new Error(result.message || 'Something went wrong.');
            }
        } catch (err) {
            formStatus.textContent   = '❌ Couldn\'t send message. Email me directly at ankitjhinkwan9@gmail.com';
            formStatus.className     = 'form-status error-msg';
            formStatus.style.display = 'block';
            showToast('Failed to send message.', 'error');
        } finally {
            btnText.style.display    = 'inline-flex';
            btnLoading.style.display = 'none';
            submitBtn.disabled       = false;
        }
    });
}
// ===== TOAST =====
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3100);
}

// ===== MATRIX RAIN =====
function initMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrixCanvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.045;';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789∑∂∫≈≠∞μσλπβαθ∇⊕⊗'.split('');
    const fontSize = 13;
    let cols, drops;
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        cols = Math.floor(canvas.width / fontSize);
        drops = Array(cols).fill(1);
    }
    resize();
    window.addEventListener('resize', resize);
    function draw() {
        ctx.fillStyle = 'rgba(13,17,23,0.07)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#13d0d0';
        ctx.font = fontSize + 'px monospace';
        drops.forEach((y, i) => {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, y * fontSize);
            if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
    }
    setInterval(draw, 55);
}

// ===== GLITCH EFFECT =====
function initGlitchEffect() {
    const h1 = document.querySelector('#hero h1');
    if (!h1) return;
    const style = document.createElement('style');
    style.textContent = `
        #hero h1 { position: relative; display: inline-block; }
        #hero h1::before, #hero h1::after {
            content: attr(data-text);
            position: absolute; top: 0; left: 0; width: 100%; overflow: hidden;
        }
        #hero h1::before {
            color: #ff00c8;
            animation: glitch-top 3.5s infinite linear;
            clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
        }
        #hero h1::after {
            color: #00fff9;
            animation: glitch-bottom 3.5s infinite linear;
            clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
        }
        @keyframes glitch-top {
            0%,90%,100% { transform:translate(0); opacity:0; }
            91% { transform:translate(-3px,-1px); opacity:0.8; }
            92% { transform:translate(3px,1px); opacity:0.8; }
            93% { transform:translate(-3px,0); opacity:0.8; }
            94% { transform:translate(0,-2px); opacity:0.8; }
            95% { transform:translate(-3px,-1px); opacity:0; }
        }
        @keyframes glitch-bottom {
            0%,90%,100% { transform:translate(0); opacity:0; }
            91% { transform:translate(3px,1px); opacity:0.8; }
            92% { transform:translate(-3px,-1px); opacity:0.8; }
            93% { transform:translate(2px,2px); opacity:0.8; }
            94% { transform:translate(0,2px); opacity:0.8; }
            95% { transform:translate(3px,1px); opacity:0; }
        }
        #hero h1:hover { animation: glitch-shake 0.3s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes glitch-shake {
            10%,90% { transform:translate3d(-1px,0,0); }
            20%,80% { transform:translate3d(2px,0,0); }
            30%,50%,70% { transform:translate3d(-3px,0,0); }
            40%,60% { transform:translate3d(3px,0,0); }
        }
    `;
    document.head.appendChild(style);
    h1.setAttribute('data-text', h1.textContent);
}

// ===== ANIMATED GRADIENT TEXT =====
function initGradientText() {
    const style = document.createElement('style');
    style.textContent = `
        .text-gradient {
            background: linear-gradient(90deg, #13d0d0, #ff00c8, #ffe600, #13d0d0);
            background-size: 300% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientShift 4s ease infinite;
        }
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .hero-desc {
            background: linear-gradient(90deg, #94a3b8, #13d0d0, #ff00c8, #94a3b8);
            background-size: 300% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: shimmer 6s ease infinite;
        }
        @keyframes shimmer {
            0% { background-position: 0% center; }
            50% { background-position: 100% center; }
            100% { background-position: 0% center; }
        }
        .section-title {
            background: linear-gradient(135deg, #ffffff 30%, #13d0d0 70%, #ff00c8 100%);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientShift 6s ease infinite;
        }
    `;
    document.head.appendChild(style);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animateEls = document.querySelectorAll('.project-card, .tech-icon, .info-item, .about-content, .contact-form');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Add initial state
    const style = document.createElement('style');
    style.textContent = `
        .project-card, .tech-icon, .info-item, .about-content, .contact-form {
            opacity: 0;
            transform: translateY(25px);
        }
        @keyframes fadeInUp {
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    animateEls.forEach((el, i) => {
        el.style.animationDelay = `${(i % 3) * 0.1}s`;
        observer.observe(el);
    });
}