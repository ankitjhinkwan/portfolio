// ===================================================
//  ANKIT JINKWAN PORTFOLIO — main.js
// ===================================================

// ── EmailJS Setup ─────────────────────────────────
// STEPS TO ACTIVATE FREE EMAIL:
// 1. Go to https://emailjs.com → Sign up (free — 200 emails/month)
// 2. Add Email Service → Gmail → connect your Gmail → copy Service ID
// 3. Create Email Template → use these variables in the body:
//      From: {{from_name}} ({{from_email}})
//      Subject: {{subject}}
//      {{message}}
//    Copy the Template ID
// 4. Account tab → General → copy your Public Key
// 5. Paste the three values below and you're done!
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';    // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';   // e.g. 'template_xyz456'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';     // e.g. 'aBcDeFgHiJkLmNoP'

// ── Project Data ──────────────────────────────────
const PROJECTS = {
    1: {
        cat: 'ML Model',
        title: 'Customer Churn Prediction',
        desc: 'A binary classification model predicting telecom customer churn with 92% accuracy. Uses Random Forest with SHAP values to explain which features drive churn — enabling targeted retention strategies that save businesses money.',
        tags: ['Python', 'Random Forest', 'SHAP', 'Scikit-learn', 'Seaborn', 'Pandas'],
        features: ['92% Classification Accuracy', 'SHAP Explainability', 'Feature Importance Analysis', 'Confusion Matrix & ROC-AUC', 'Business Insight Reports', 'End-to-End ML Pipeline'],
        img: 'https://placehold.co/800x450/091525/13d0d0?text=Customer+Churn+Prediction',
        live: '#', github: 'https://github.com/ankitjhinkwan/house-price-prediction'
    },
    2: {
        cat: 'Visualisation',
        title: 'Sales Analytics Dashboard',
        desc: 'An interactive Power BI dashboard visualising 3 years of retail sales data. Includes KPI scorecards, revenue trends, regional breakdowns and product performance metrics — used directly for business decision-making.',
        tags: ['Power BI', 'DAX', 'SQL', 'Excel', 'Data Modelling'],
        features: ['KPI Scorecards', 'Regional Breakdown', 'Year-over-Year Trends', 'Product Performance', 'DAX Measures', 'Drill-Through Pages'],
        img: 'https://placehold.co/800x450/091525/13d0d0?text=Sales+Analytics+Dashboard',
        live: '#', github: 'https://github.com/ankitjhinkwan/covid19-data-analysis'
    },
    3: {
        cat: 'ML Model',
        title: 'House Price Prediction',
        desc: 'Regression model predicting house prices using advanced feature engineering and XGBoost on the Ames Housing dataset. Achieved RMSE in the Kaggle top 10% — with SHAP values for full model explainability.',
        tags: ['Python', 'XGBoost', 'Scikit-learn', 'Pandas', 'Matplotlib', 'SHAP'],
        features: ['Top 10% Kaggle RMSE', 'Advanced Feature Engineering', 'Hyperparameter Tuning', 'Cross-Validation', 'SHAP Explainability', 'Full EDA Pipeline'],
        img: 'https://placehold.co/800x450/091525/13d0d0?text=House+Price+Prediction',
        live: '#', github: 'https://github.com/ankitjhinkwan/sales-analytics-dashboard'
    },
    4: {
        cat: 'EDA',
        title: 'Netflix Content Analysis',
        desc: 'Deep-dive exploratory data analysis of Netflix\'s entire catalogue — uncovering genre trends, release patterns, content ratings and regional distribution. Reveals how Netflix evolved its content strategy over the years.',
        tags: ['Pandas', 'Plotly', 'Matplotlib', 'Python', 'Seaborn'],
        features: ['Genre Trend Analysis', 'Release Pattern Study', 'Content Rating Breakdown', 'Regional Distribution', 'Interactive Plotly Charts', 'Time-Series Analysis'],
        img: 'https://placehold.co/800x450/091525/ff4060?text=Netflix+Content+Analysis',
        live: '#', github: 'https://github.com/ankitjhinkwan/customer-churn-prediction'
    },
    5: {
        cat: 'NLP',
        title: 'Twitter Sentiment Analysis',
        desc: 'End-to-end NLP pipeline classifying tweet sentiments in real-time using a fine-tuned BERT model. Deployed as an interactive Streamlit dashboard for live sentiment monitoring, word clouds and trend tracking.',
        tags: ['BERT', 'HuggingFace', 'Streamlit', 'Python', 'NLP', 'PyTorch'],
        features: ['BERT Fine-Tuning', 'Real-Time Classification', 'Streamlit Dashboard', 'Sentiment Trend Charts', 'Word Cloud Visualisation', 'REST API Ready'],
        img: 'https://placehold.co/800x450/091525/c8dae8?text=Twitter+Sentiment+Analysis',
        live: '#', github: 'https://github.com/ankitjhinkwan/netflix-content-analysis'
    },
    6: {
        cat: 'EDA',
        title: 'COVID-19 Data Analysis',
        desc: 'Comprehensive exploratory data analysis of global COVID-19 trends — vaccination rates, mortality patterns, spread timelines and country-level responses. Includes an automated data cleaning pipeline for daily-updating datasets.',
        tags: ['Pandas', 'Seaborn', 'NumPy', 'Matplotlib', 'Jupyter', 'Python'],
        features: ['Global Trend Analysis', 'Vaccination Rate Tracking', 'Mortality Pattern Study', 'Country Comparisons', 'Automated Data Pipeline', 'Time-Series Visualisations'],
        img: 'https://placehold.co/800x450/091525/ff4060?text=COVID-19+Data+Analysis',
        live: '#', github: 'https://github.com/ankitjhinkwan/twitter-sentiment-analysis'
    }
};

// ══════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initParticles();
    initTyped();
    initHeader();
    initMobileMenu();
    initBackToTop();
    initReveal();
    initSkillBars();
    initFilter();
    initModal();
    initContactForm();
});

// ── CURSOR ────────────────────────────────────────
function initCursor() {
    const dot  = document.getElementById('cDot');
    const ring = document.getElementById('cRing');
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
    });

    function animRing() {
        rx += (mx - rx) * 0.14;
        ry += (my - ry) * 0.14;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(animRing);
    }
    animRing();

    document.querySelectorAll('a, button, .proj-card, .chip, .f-btn').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hov'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hov'));
    });
}

// ── PARTICLES ─────────────────────────────────────
function initParticles() {
    const wrap = document.getElementById('pWrap');
    if (!wrap) return;
    for (let i = 0; i < 28; i++) {
        const p = document.createElement('div');
        p.classList.add('p-dot');
        p.style.cssText = `
            left:${Math.random()*100}%;
            width:${Math.random()*3+1.5}px;
            height:${Math.random()*3+1.5}px;
            animation-duration:${Math.random()*16+12}s;
            animation-delay:${Math.random()*12}s;
            opacity:${Math.random()*.4+.08};
        `;
        wrap.appendChild(p);
    }
}

// ── TYPED EFFECT ──────────────────────────────────
function initTyped() {
    const el = document.getElementById('typedEl');
    if (!el) return;
    const phrases = ['Data Scientist', 'ML Engineer', 'Data Analyst', 'Insight Explorer', 'Problem Solver'];
    let pi = 0, ci = 0, del = false;

    function type() {
        const cur = phrases[pi];
        el.textContent = del ? cur.slice(0, ci--) : cur.slice(0, ci++);
        let delay = del ? 55 : 105;
        if (!del && ci === cur.length + 1) { delay = 2000; del = true; }
        else if (del && ci < 0) { del = false; ci = 0; pi = (pi + 1) % phrases.length; delay = 350; }
        setTimeout(type, delay);
    }
    setTimeout(type, 800);
}

// ── HEADER ────────────────────────────────────────
function initHeader() {
    const hdr = document.getElementById('header');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        hdr.classList.toggle('scrolled', window.scrollY > 50);

        const pos = window.scrollY + 140;
        sections.forEach(sec => {
            if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
                links.forEach(l => {
                    l.classList.remove('active');
                    if (l.getAttribute('href') === '#' + sec.id) l.classList.add('active');
                });
            }
        });
    }, { passive: true });
}

// ── MOBILE MENU ───────────────────────────────────
function initMobileMenu() {
    const btn     = document.getElementById('menuBtn');
    const nav     = document.getElementById('navList');
    const overlay = document.getElementById('navOverlay');

    function close() {
        nav.classList.remove('open');
        overlay.classList.remove('on');
        btn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
    }

    btn.addEventListener('click', () => {
        const open = nav.classList.contains('open');
        open ? close() : (
            nav.classList.add('open'),
            overlay.classList.add('on'),
            (btn.innerHTML = '<i class="fas fa-times"></i>'),
            (document.body.style.overflow = 'hidden')
        );
    });

    overlay.addEventListener('click', close);
    document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', close));
}

// ── BACK TO TOP ───────────────────────────────────
function initBackToTop() {
    const btn = document.getElementById('btt');
    window.addEventListener('scroll', () => {
        btn.classList.toggle('on', window.scrollY > 420);
    }, { passive: true });
}

// ── SCROLL REVEAL ─────────────────────────────────
function initReveal() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('vis');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach((el, i) => {
        el.style.transitionDelay = `${(i % 4) * 0.08}s`;
        obs.observe(el);
    });
}

// ── SKILL BARS ────────────────────────────────────
function initSkillBars() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const fill = e.target.querySelector('.s-fill');
                const pct  = e.target.dataset.s;
                if (fill && pct) {
                    setTimeout(() => { fill.style.width = pct + '%'; }, 120);
                }
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.s-item').forEach(item => obs.observe(item));
}

// ── PROJECT FILTER ────────────────────────────────
function initFilter() {
    const btns  = document.querySelectorAll('.f-btn');
    const cards = document.querySelectorAll('.proj-card');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.f;

            cards.forEach(card => {
                const show = f === 'all' || card.dataset.cat === f;
                if (show) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity  = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity  = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => { card.style.display = 'none'; }, 320);
                }
            });
        });
    });
}

// ── PROJECT MODAL ─────────────────────────────────
function initModal() {
    const modal = document.getElementById('modal');
    const close = document.getElementById('mClose');

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    close.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function openModal(id) {
    const d = PROJECTS[id];
    if (!d) return;

    document.getElementById('mCat').textContent   = d.cat;
    document.getElementById('mTitle').textContent  = d.title;
    document.getElementById('mDesc').textContent   = d.desc;
    document.getElementById('mImg').src            = d.img;
    document.getElementById('mImg').alt            = d.title;
    document.getElementById('mLive').href          = d.live;
    document.getElementById('mGit').href           = d.github;

    document.getElementById('mTags').innerHTML =
        d.tags.map(t => `<span class="tag">${t}</span>`).join('');

    document.getElementById('mFeats').innerHTML = `
        <h4>Key Features</h4>
        <ul>${d.features.map(f => `<li>${f}</li>`).join('')}</ul>
    `;

    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ── CONTACT FORM (EmailJS) ────────────────────────
function initContactForm() {
    const form   = document.getElementById('contactForm');
    if (!form) return;

    const fields = {
        name:    { el: document.getElementById('cName'),    err: document.getElementById('nameErr'),  v: s => s.trim().length >= 2 ? '' : 'Name must be at least 2 characters.' },
        email:   { el: document.getElementById('cEmail'),   err: document.getElementById('emailErr'), v: s => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) ? '' : 'Please enter a valid email address.' },
        message: { el: document.getElementById('cMsg'),     err: document.getElementById('msgErr'),   v: s => s.trim().length >= 10 ? '' : 'Message must be at least 10 characters.' }
    };

    // Live validation
    Object.values(fields).forEach(({ el, err, v }) => {
        el.addEventListener('input', () => {
            const msg = v(el.value);
            err.textContent = msg;
            el.classList.toggle('err', !!msg);
        });
    });

    form.addEventListener('submit', async e => {
        e.preventDefault();

        let hasErr = false;
        Object.values(fields).forEach(({ el, err, v }) => {
            const msg = v(el.value);
            err.textContent = msg;
            el.classList.toggle('err', !!msg);
            if (msg) hasErr = true;
        });
        if (hasErr) return;

        const btn     = document.getElementById('submitBtn');
        const txtEl   = document.getElementById('btnTxt');
        const loadEl  = document.getElementById('btnLoad');
        const status  = document.getElementById('fStatus');

        txtEl.style.display  = 'none';
        loadEl.style.display = 'inline-flex';
        btn.disabled         = true;
        status.className     = 'f-status';

        const params = {
            from_name:  fields.name.el.value.trim(),
            from_email: fields.email.el.value.trim(),
            subject:    document.getElementById('cSubject').value.trim() || 'Portfolio Contact',
            message:    fields.message.el.value.trim()
        };

        try {
            // Check if EmailJS is configured
            if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
                throw new Error('EmailJS not configured yet — see comment at top of main.js');
            }

            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params, EMAILJS_PUBLIC_KEY);

            status.textContent = '✅ Message sent! I\'ll get back to you within 24 hours.';
            status.className   = 'f-status ok';
            form.reset();
            showToast('Message sent! 🎉', 'ok');
        } catch (err) {
            const msg = err.message.includes('not configured')
                ? '⚠️ Email not yet configured — reach me directly at ankitjhinkwan9@gmail.com'
                : '❌ Couldn\'t send message. Please email ankitjhinkwan9@gmail.com directly.';
            status.textContent = msg;
            status.className   = 'f-status fail';
            showToast('Failed to send :(', 'fail');
        } finally {
            txtEl.style.display  = 'inline-flex';
            loadEl.style.display = 'none';
            btn.disabled         = false;
        }
    });
}

// ── TOAST ─────────────────────────────────────────
function showToast(msg, type = 'ok') {
    const wrap = document.getElementById('toasts');
    const t    = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(() => t.remove(), 3200);
}
