import { useEffect, useRef, useState } from "react";

/* ---------- DATA (content same as original) ---------- */
const NAV = ["Home", "About", "Skills", "Projects", "Contact"];
// Skills shown as 3D cards — edit names / groups to match exactly what you use
const SKILLS = [
  { n: "Python", g: "Programming", icon: "python" },
  { n: "MySQL", g: "Database", icon: "database" },
  { n: "Power BI", g: "Visualization", icon: "pie" },
  { n: "Excel", g: "Spreadsheets", icon: "sheet" },
  { n: "Tableau", g: "Visualization", icon: "bars" },
  { n: "Pandas", g: "Analysis", icon: "table" },
  { n: "NumPy", g: "Analysis", icon: "sigma" },
  { n: "Matplotlib", g: "Visualization", icon: "trend" },
  { n: "Machine Learning", g: "AI / ML", icon: "cpu" },
];
const PROJECTS = [
  { t: "Sales Performance Dashboard", c: "dash", l: "Dashboard", d: "Interactive dashboard that tracks revenue, orders and average order value by region, category and month.", tags: ["Power BI", "MySQL", "Python"] },
  { t: "SQL Business Analysis", c: "sql", l: "SQL", d: "SQL queries that answer business questions on sales data: top categories, regional revenue, best months and the strongest region and category pairs.", tags: ["MySQL", "SQL"] },
  { t: "Data Cleaning & EDA", c: "python", l: "Python / ML", d: "A step-by-step cleaning workflow in Python: fix text, parse numbers, fill missing values and remove duplicates.", tags: ["Python", "Pandas", "NumPy"] },
  { t: "Customer Churn Prediction", c: "python", l: "Python / ML", d: "Scores how likely a customer is to leave from tenure, charges, support tickets and contract, and explains the drivers.", tags: ["Python", "Scikit-learn", "Pandas"] },
  { t: "Sales Forecasting", c: "python", l: "Python / ML", d: "Forecasts the next six months of sales from past trends and seasonality, with an adjustable growth assumption.", tags: ["Python", "Pandas", "Matplotlib"] },
];
const FILTERS = [["all", "All"], ["dash", "Dashboards"], ["sql", "SQL"], ["python", "Python & ML"]];
const IDS = ["hero", "about", "skills", "projects", "contact"];

/* ---------- HOOKS ---------- */
const ICONS = {
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  up: <path d="M12 19V5M5 12l7-7 7 7" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  download: <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />,
  send: <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />,
  check: <path d="M20 6L9 17l-5-5" />,
  pin: <><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  github: <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></>,
  linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
  twitter: <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />,
  react: <><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /><circle cx="12" cy="12" r="1.6" fill="currentColor" /></>,
  python: <><path d="M12 3c-4 0-5 1.5-5 3v2h5v1H5.5C3.5 9 3 11 3 12.5S3.5 16 5.5 16H7v-2.5C7 12 8.2 11 10 11h4c1.4 0 2.5-1 2.5-2.5V6c0-1.8-1.7-3-4.5-3z" /><path d="M12 21c4 0 5-1.5 5-3v-2h-5v-1h6.5c2 0 2.5-2 2.5-3.5s-.5-3.5-2.5-3.5H17v2.5c0 1.5-1.2 2.5-3 2.5h-4c-1.4 0-2.5 1-2.5 2.5V18c0 1.8 1.7 3 4.5 3z" /><circle cx="9.5" cy="5.5" r=".8" fill="currentColor" /><circle cx="14.5" cy="18.5" r=".8" fill="currentColor" /></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>,
  table: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M3 15h18M9 4v16" /></>,
  sigma: <path d="M18 6H6l7 6-7 6h12" />,
  bars: <path d="M5 21V11M12 21V4M19 21v-7" />,
  pie: <><path d="M21 12A9 9 0 1 1 12 3v9z" /><path d="M15 3.5A9 9 0 0 1 20.5 9H15z" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-5-5" /></>,
  filter: <path d="M3 5h18l-7 8v6l-4 2v-8z" />,
  cpu: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></>,
  play: <path d="M7 5l12 7-12 7z" />,
  pulse: <path d="M3 12h4l3-8 4 16 3-8h4" />,
  sheet: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
  trend: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
};
function Ico({ n }) {
  return <svg className={"ic ic-" + n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[n]}</svg>;
}

function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

function useActiveSection() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    IDS.forEach((id) => { const el = document.getElementById(id); el && io.observe(el); });
    return () => io.disconnect();
  }, []);
  return active;
}

/* ---------- SMALL COMPONENTS ---------- */
const SHOTS = {
  "Sales Performance Dashboard": "dash", "SQL Business Analysis": "sql", "Data Cleaning & EDA": "clean",
  "Customer Churn Prediction": "churn", "Sales Forecasting": "fcast",
};
function Shot({ k }) {
  const art = {
    dash: <>
      <rect className="sh-p" x="14" y="12" width="292" height="136" rx="10" />
      {[0, 1, 2].map((i) => <g key={i}><rect className="sh-l" x={26 + i * 62} y="24" width="54" height="28" rx="6" /><rect className="sh-a" x={32 + i * 62} y="31" width="20" height="4" rx="2" /><rect className="sh-b" x={32 + i * 62} y="40" width="34" height="6" rx="3" /></g>)}
      <polyline className="sh-sb" points="26,128 56,110 86,118 116,92 146,100 176,76 206,86" />
      {[30, 48, 36, 60, 44].map((h, i) => <rect key={i} className="sh-a" x={222 + i * 15} y={134 - h} width="10" height={h} rx="3" />)}
    </>,
    sql: <>
      <rect className="sh-p" x="14" y="12" width="292" height="136" rx="10" />
      <rect className="sh-t" x="26" y="22" width="110" height="8" rx="4" />
      {[0, 1, 2, 3].map((i) => <g key={i}><rect className={i === 0 ? "sh-t" : "sh-l"} x="26" y={40 + i * 26} width="268" height="18" rx="5" /><rect className="sh-b" x="34" y={45 + i * 26} width={[64, 92, 52, 76][i]} height="8" rx="4" /><rect className="sh-a" x="214" y={45 + i * 26} width={[54, 38, 62, 30][i]} height="8" rx="4" /></g>)}
    </>,
    clean: <>
      <rect className="sh-p" x="14" y="12" width="292" height="136" rx="10" />
      {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => <rect key={r + "-" + c} className={(r === 1 && c === 2) || (r === 2 && c === 0) ? "sh-a" : "sh-l"} x={26 + c * 90} y={24 + r * 27} width="82" height="20" rx="5" />))}
      <path className="sh-sb" d="M30 132 l9 9 l17 -19" />
    </>,
    churn: <>
      <rect className="sh-p" x="14" y="12" width="292" height="136" rx="10" />
      <circle className="sh-ring" cx="92" cy="80" r="38" />
      <circle className="sh-arc" cx="92" cy="80" r="38" transform="rotate(-90 92 80)" style={{ strokeDasharray: "150 240" }} />
      {[0, 1, 2, 3].map((i) => <g key={i}><rect className="sh-l" x="170" y={36 + i * 26} width="122" height="10" rx="5" /><rect className={i % 2 ? "sh-t" : "sh-a"} x="170" y={36 + i * 26} width={[96, 62, 106, 44][i]} height="10" rx="5" /></g>)}
    </>,
    fcast: <>
      <rect className="sh-p" x="14" y="12" width="292" height="136" rx="10" />
      <path className="sh-l" d="M176 70 L296 20 L296 52 L176 72Z" />
      <polyline className="sh-sb" points="26,120 56,102 86,110 116,82 146,92 176,68" />
      <polyline className="sh-sb" style={{ strokeDasharray: "6 6" }} points="176,68 206,58 236,42 266,50 294,34" />
    </>,
  };
  return <svg viewBox="0 0 320 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">{art[k]}</svg>;
}

function ProjectCard({ p, i, onOpen, onDemo }) {
  const [ref, seen] = useInView(0.15);
  return (
    <article ref={ref} className={"card proj tilt rv rv-s" + (seen ? " in" : "")} style={{ transitionDelay: (i % 3) * 90 + "ms" }} role="button" tabIndex={0} onClick={() => onOpen(p)} onKeyDown={(e) => { if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onOpen(p); } }}>
      <div className={"thumb " + p.c}>{p.img ? <img src={p.img} alt={p.t} loading="lazy" /> : <Shot k={SHOTS[p.t] || "dash"} />}</div>
      <p className="pcat">{p.l}</p>
      <h3>{p.t}</h3>
      <p>{p.d}</p>
      <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
      <div className="proj-actions">
        <span className="proj-more">View case study <Ico n="arrow" /></span>
        <button className="proj-demo" onClick={(e) => { e.stopPropagation(); onDemo(p); }}><Ico n="play" /> Demo</button>
      </div>
    </article>
  );
}

function ScrollText({ children }) {
  const ref = useRef(null);
  const words = children.split(" ");
  useEffect(() => {
    const el = ref.current, spans = el.querySelectorAll("span");
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const n = Math.round(p * spans.length);
      spans.forEach((sp, i) => sp.classList.toggle("lit", i < n));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return <p className="stext" ref={ref}>{words.map((w, i) => <span key={i}>{w} </span>)}</p>;
}

// [type, left%, top%, size px, scroll-parallax speed]
const DECOS = {
  hero: [["sq", 6, 14, 70, 0.12], ["plus", 72, 82, 26, -0.08], ["sq", 88, 12, 56, 0.18]],
  about: [["plus", 90, 8, 28, -0.1], ["sq", 5, 62, 44, 0.14]],
  projects: [["sq", 3, 16, 64, -0.14], ["plus", 92, 68, 30, 0.1]],
  contact: [["plus", 92, 14, 26, 0.1], ["sq", 3, 72, 60, -0.12]],
};
function Deco({ k }) {
  return DECOS[k].map(([t, l, tp, sz, sp], i) => (
    <span key={i} className={"shape " + t} aria-hidden="true" data-par={sp} style={{ left: l + "%", top: tp + "%", width: sz, height: sz }} />
  ));
}

function Band() {
  const all = SKILLS.map((k) => [k.n, k.icon]);
  const list = [...all, ...all, ...all, ...all];
  return (
    <div className="band" aria-hidden="true">
      <div className="mtrack">{list.map(([n, ic], i) => <span className="chip" key={i}><Ico n={ic} />{n}</span>)}</div>
    </div>
  );
}

function NameText({ text }) {
  return (
    <svg className="gsvg" viewBox="0 0 1000 200" data-par="0.22" role="presentation">
      <text className="gtext" x="60" y="140" fontSize="124" textLength="880" lengthAdjust="spacingAndGlyphs">{text}</text>
    </svg>
  );
}

function Intro() {
  const ref = useRef(null);
  const st = useRef({ r: 0, target: 0, raf: 0, reduce: false });

  const step = () => {
    const o = st.current, el = ref.current;
    if (!el) return;
    o.r += (o.target - o.r) * 0.16;
    if (Math.abs(o.target - o.r) < 0.5) o.r = o.target;
    el.style.setProperty("--r", o.r + "px");
    o.raf = o.r === o.target ? 0 : requestAnimationFrame(step);
  };
  const grow = (target) => {
    const o = st.current;
    o.target = target;
    if (o.reduce) { o.r = target; ref.current.style.setProperty("--r", target + "px"); return; }
    if (!o.raf && o.r !== target) o.raf = requestAnimationFrame(step);
  };
  const move = (e) => {
    const el = ref.current, r = el.getBoundingClientRect();
    el.style.setProperty("--mx", e.clientX - r.left + "px");
    el.style.setProperty("--my", e.clientY - r.top + "px");
  };
  useEffect(() => {
    st.current.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => cancelAnimationFrame(st.current.raf);
  }, []);

  return (
    <section
      id="top"
      className="intro-s"
      ref={ref}
      onPointerEnter={(e) => { move(e); grow(260); }}
      onPointerMove={(e) => { move(e); grow(260); }}
      onPointerLeave={() => grow(0)}
      onPointerCancel={() => grow(0)}
    >
      <p className="sr-only">Ankit Jinkwan — Data Analytics, based in Uttarakhand, India</p>
      <div className="ilayer base" aria-hidden="true"><NameText text="Ankit Jinkwan" /></div>
      <div className="ilayer rev" aria-hidden="true"><NameText text="Data Analytics" /></div>
      <div className="scue" aria-hidden="true"><span>Scroll</span><i /></div>
    </section>
  );
}

function SectionHead({ kicker, title, sub }) {
  return (
    <div className="shead rv">
      <p className="kicker">{kicker}</p>
      <h2>{title.split(" ").map((w, i) => <span className="w" style={{ "--i": i }} key={i}>{w}{" "}</span>)}</h2>
      <p>{sub}</p>
    </div>
  );
}

function Pct({ to }) {
  const [ref, seen] = useInView(0.5);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const k = Math.min((t - t0) / 1200, 1);
      setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <b ref={ref}>{n}%</b>;
}

function SkillsShowcase() {
  return (
    <div className="skx">
      {SKILLS.map((k, i) => (
        <div className="card skx-card tilt rv rv-s" style={{ transitionDelay: (i % 3) * 90 + "ms" }} key={k.n}>
          <span className="skx-mark" aria-hidden="true"><Ico n={k.icon} /></span>
          <div className="skx-icon"><Ico n={k.icon} /></div>
          <p className="skx-group">{k.g}</p>
          <h3>{k.n}</h3>
        </div>
      ))}
    </div>
  );
}

// ---------- sample dataset for the dashboard demo (generated, not real client data)
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const REGIONS = ["North", "South", "East", "West"];
const CATS = ["Electronics", "Fashion", "Grocery"];
const PRICE = [1800, 900, 350]; // avg order value per category (Rs)
const SALES = REGIONS.flatMap((r, ri) => CATS.flatMap((c, ci) => MONTHS.map((m, mi) => {
  const base = 40 + ri * 9 + ci * 14;
  const season = 1 + 0.28 * Math.sin(((mi - 2) / 12) * Math.PI * 2) + (mi >= 9 ? 0.25 : 0);
  const rev = Math.round(base * season * (0.9 + ((ri * 7 + ci * 5 + mi * 3) % 7) / 35)); // Rs thousand
  return { r, c, m: mi, rev, ord: Math.round((rev * 1000) / PRICE[ci]) };
})));
const fmtRev = (k) => (k >= 1000 ? "₹" + (k / 1000).toFixed(2) + "M" : "₹" + Math.round(k) + "K");
const niceMax = (v) => { const p = Math.pow(10, Math.floor(Math.log10(v))), n = v / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p; };
function curve(pts) {
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}
function useTween(target, ms = 650) {
  const [val, setVal] = useState(target);
  const cur = useRef(target);
  const key = JSON.stringify(target);
  useEffect(() => {
    const from = cur.current, to = target, arr = Array.isArray(to), t0 = performance.now();
    let raf;
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3);
      const v = arr ? to.map((x, i) => (from[i] || 0) + (x - (from[i] || 0)) * e) : from + (to - from) * e;
      cur.current = v; setVal(v);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [key]);
  return val;
}
function HBars({ items, vals, active, onPick, fmt }) {
  const max = Math.max(...vals, 1);
  return (
    <div className="hb">
      {items.map((n, i) => (
        <button key={n} className={"hb-row" + (active === n ? " on" : "") + (active !== "All" && active !== n ? " dim" : "")} onClick={() => onPick(active === n ? "All" : n)}>
          <span className="hb-n">{n}</span>
          <span className="hb-t"><i style={{ width: (vals[i] / max) * 100 + "%" }} /></span>
          <span className="hb-v">{fmt(vals[i])}</span>
        </button>
      ))}
    </div>
  );
}
function Dashboard() {
  const [region, setRegion] = useState("All");
  const [cat, setCat] = useState("All");
  const [metric, setMetric] = useState("rev");
  const [hover, setHover] = useState(-1);
  const [ref, seen] = useInView(0.2);
  const sum = (arr, f) => arr.reduce((s, d) => s + f(d), 0);
  const inR = (d) => region === "All" || d.r === region, inC = (d) => cat === "All" || d.c === cat;
  const rows = SALES.filter((d) => inR(d) && inC(d));
  const byMonth = MONTHS.map((_, i) => sum(rows.filter((d) => d.m === i), (d) => d[metric]));
  const byCat = CATS.map((c) => sum(SALES.filter((d) => d.c === c && inR(d)), (d) => d[metric]));
  const byReg = REGIONS.map((r) => sum(SALES.filter((d) => d.r === r && inC(d)), (d) => d[metric]));
  const rev = sum(rows, (d) => d.rev), ord = sum(rows, (d) => d.ord), aov = ord ? (rev * 1000) / ord : 0;
  const z = (a) => a.map(() => 0);
  const tl = useTween(seen ? byMonth : z(byMonth)), tc = useTween(seen ? byCat : z(byCat)), tr = useTween(seen ? byReg : z(byReg)), kp = useTween(seen ? [rev, ord, aov] : [0, 0, 0]);
  const fmt = metric === "rev" ? fmtRev : (n) => Math.round(n).toLocaleString("en-IN");
  const tick = (v) => (metric === "rev" ? (v >= 1000 ? +(v / 1000).toFixed(1) + "M" : Math.round(v) + "K") : Math.round(v).toLocaleString("en-IN"));
  const best = byMonth.indexOf(Math.max(...byMonth)), avg = sum(byMonth, (x) => x) / 12;
  const up = avg ? Math.round((byMonth[best] / avg - 1) * 100) : 0;

  const W = 640, H = 260, L = 46, Rr = 14, T = 18, B = 30, step = (W - L - Rr) / 11;
  const max = niceMax(Math.max(...tl, 1));
  const px = (i) => L + i * step, py = (v) => T + (H - T - B) * (1 - v / max);
  const pts = tl.map((v, i) => [px(i), py(v)]);
  const line = curve(pts), area = line + ` L${px(11)} ${H - B} L${px(0)} ${H - B} Z`;
  const onMove = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    setHover(Math.max(0, Math.min(11, Math.round(((((e.clientX - b.left) / b.width) * W) - L) / step))));
  };
  return (
    <div className="dash" ref={ref}>
      <div className="dash-top">
        <div className="fgroup"><span>Region</span><div className="fchips">{["All", ...REGIONS].map((r) => <button key={r} className={region === r ? "on" : ""} onClick={() => setRegion(r)}>{r}</button>)}</div></div>
        <div className="fgroup"><span>Category</span><div className="fchips">{["All", ...CATS].map((c) => <button key={c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>{c}</button>)}</div></div>
        <div className="fgroup"><span>Metric</span><div className="fchips">{[["rev", "Revenue"], ["ord", "Orders"]].map(([k, l]) => <button key={k} className={metric === k ? "on" : ""} onClick={() => setMetric(k)}>{l}</button>)}</div></div>
      </div>
      <div className="kpis">
        <div className="card kpi"><small>Revenue</small><b>{fmtRev(kp[0])}</b></div>
        <div className="card kpi"><small>Orders</small><b>{Math.round(kp[1]).toLocaleString("en-IN")}</b></div>
        <div className="card kpi"><small>Avg order value</small><b>{"₹" + Math.round(kp[2]).toLocaleString("en-IN")}</b></div>
        <div className="card kpi"><small>Best month</small><b>{MONTHS[best]}</b></div>
      </div>
      <div className="dash-main">
        <div className="card chart-card">
          <h4>{metric === "rev" ? "Monthly revenue" : "Monthly orders"}<span> · {region} / {cat}</span></h4>
          <svg viewBox={`0 0 ${W} ${H}`} className="lc" onPointerMove={onMove} onPointerLeave={() => setHover(-1)} role="img" aria-label="Monthly trend line chart">
            <defs><linearGradient id="lcg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".28" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient></defs>
            {[0, 1, 2, 3, 4].map((i) => <g key={i}><line className="lc-g" x1={L} x2={W - Rr} y1={py((max * i) / 4)} y2={py((max * i) / 4)} /><text className="lc-t" x={L - 8} y={py((max * i) / 4) + 4} textAnchor="end">{tick((max * i) / 4)}</text></g>)}
            {MONTHS.map((m, i) => <text key={m} className="lc-t" x={px(i)} y={H - 8} textAnchor="middle">{m}</text>)}
            <path d={area} fill="url(#lcg)" />
            <path d={line} className="lc-l" />
            {hover >= 0 && <g>
              <line className="lc-h" x1={px(hover)} x2={px(hover)} y1={T} y2={H - B} />
              <circle cx={px(hover)} cy={py(tl[hover])} r="5" className="lc-d" />
              <g transform={`translate(${Math.max(64, Math.min(W - 64, px(hover)))} ${T - 4})`}>
                <rect x="-58" y="-16" width="116" height="22" rx="6" className="lc-pill" />
                <text className="lc-pt" textAnchor="middle" y="0">{MONTHS[hover]} · {fmt(byMonth[hover])}</text>
              </g>
            </g>}
          </svg>
          <p className="insight"><b>Insight:</b> {MONTHS[best]} is the strongest month ({fmt(byMonth[best])}), {up}% above the monthly average.</p>
        </div>
        <div className="card chart-card">
          <h4>By category <span>· click a bar to filter</span></h4>
          <HBars items={CATS} vals={tc} active={cat} onPick={setCat} fmt={fmt} />
          <h4 className="gap">By region</h4>
          <HBars items={REGIONS} vals={tr} active={region} onPick={setRegion} fmt={fmt} />
        </div>
      </div>
      <p className="dash-note">Sample dataset generated for this demo — not real client data.</p>
    </div>
  );
}

// ---------- case study popup
const CASE = {
  "Sales Performance Dashboard": { problem: "Sales numbers sit in many tables, so it is slow to see how each region and category is doing.", built: "An interactive dashboard with filters, KPIs and charts for revenue, orders and average order value." },
  "SQL Business Analysis": { problem: "Business questions like “which category earns the most?” need answers straight from the data.", built: "A set of SQL queries using GROUP BY, ORDER BY, HAVING and LIMIT to answer them from the sales table." },
  "Data Cleaning & EDA": { problem: "Raw data has messy text, text-formatted numbers, missing values and duplicates that break analysis.", built: "A repeatable Python and Pandas cleaning workflow, with each step shown and its effect on data quality." },
  "Customer Churn Prediction": { problem: "It is cheaper to keep a customer than to win a new one, but it is hard to know who is about to leave.", built: "A churn scoring approach that turns tenure, charges, support tickets and contract into a risk level, with the drivers explained." },
  "Sales Forecasting": { problem: "Planning stock and targets needs a view of what sales are likely to be next.", built: "A forecast of the next six months from historical trends and seasonality, with an adjustable growth assumption." },
};
// To add more detail, give an entry: result: "...", demo: "https://...", code: "https://github.com/..."
function CaseStudy({ p, onClose, onDemo }) {
  const closeRef = useRef(null);
  const c = CASE[p.t] || {};
  useEffect(() => {
    const prev = document.activeElement;
    closeRef.current && closeRef.current.focus();
    const key = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", key); document.body.style.overflow = ""; prev && prev.focus && prev.focus(); };
  }, []);
  return (
    <div className="cs-back" onClick={onClose}>
      <div className="card cs" role="dialog" aria-modal="true" aria-label={p.t + " case study"} onClick={(e) => e.stopPropagation()}>
        <button className="cs-close" ref={closeRef} onClick={onClose} aria-label="Close"><Ico n="x" /></button>
        <div className={"thumb " + p.c}>{p.img ? <img src={p.img} alt={p.t} /> : <Shot k={SHOTS[p.t] || "dash"} />}</div>
        <div className="cs-body">
          <p className="pcat">{p.l}</p>
          <h3>{p.t}</h3>
          <p>{p.d}</p>
          {c.problem && <><h4>Problem</h4><p>{c.problem}</p></>}
          {c.built && <><h4>What I built</h4><p>{c.built}</p></>}
          {c.result && <><h4>Result</h4><p>{c.result}</p></>}
          <h4>Tools</h4>
          <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
          <div className="btns cs-btns">
            <button className="btn primary" onClick={() => onDemo(p)}><Ico n="play" /> Try the demo</button>
            {c.demo && <a className="btn primary" href={c.demo} target="_blank" rel="noreferrer">Live demo</a>}
            {c.code && <a className="btn ghost" href={c.code} target="_blank" rel="noreferrer">Code</a>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- analytics demos (one per project, opened from the card's Demo button)
const sumF = (arr, f) => arr.reduce((s, d) => s + f(d), 0);
const nf = (n) => (typeof n === "number" ? Math.round(n).toLocaleString("en-IN") : n);

// 1) SQL business analysis — queries really run on the sample dataset
const SQ_KW = /\b(SELECT|FROM|GROUP BY|ORDER BY|HAVING|LIMIT|AS|SUM|ROUND|DESC)\b/g;
function Sql({ text }) {
  return <>{text.split(SQ_KW).map((s, i) => (i % 2 ? <b key={i}>{s}</b> : s))}</>;
}
const SQ = [
  { n: "Revenue by category", sql: "SELECT category,\n       SUM(revenue_k) AS revenue_k,\n       SUM(orders)    AS orders\nFROM sales\nGROUP BY category\nORDER BY revenue_k DESC;",
    run: () => ({ cols: ["category", "revenue_k", "orders"], rows: CATS.map((c) => { const r = SALES.filter((d) => d.c === c); return [c, sumF(r, (d) => d.rev), sumF(r, (d) => d.ord)]; }).sort((a, b) => b[1] - a[1]) }) },
  { n: "Revenue by region", sql: "SELECT region,\n       SUM(revenue_k) AS revenue_k\nFROM sales\nGROUP BY region\nORDER BY revenue_k DESC;",
    run: () => ({ cols: ["region", "revenue_k"], rows: REGIONS.map((g) => [g, sumF(SALES.filter((d) => d.r === g), (d) => d.rev)]).sort((a, b) => b[1] - a[1]) }) },
  { n: "Best 5 months", sql: "SELECT month,\n       SUM(revenue_k) AS revenue_k\nFROM sales\nGROUP BY month\nORDER BY revenue_k DESC\nLIMIT 5;",
    run: () => ({ cols: ["month", "revenue_k"], rows: MONTHS.map((m, i) => [m, sumF(SALES.filter((d) => d.m === i), (d) => d.rev)]).sort((a, b) => b[1] - a[1]).slice(0, 5) }) },
  { n: "Top region & category pairs", sql: "SELECT region, category,\n       SUM(revenue_k) AS revenue_k,\n       SUM(orders)    AS orders\nFROM sales\nGROUP BY region, category\nHAVING SUM(revenue_k) > 800\nORDER BY revenue_k DESC\nLIMIT 6;",
    run: () => ({ cols: ["region", "category", "revenue_k", "orders"], rows: REGIONS.flatMap((g) => CATS.map((c) => { const r = SALES.filter((d) => d.r === g && d.c === c); return [g, c, sumF(r, (d) => d.rev), sumF(r, (d) => d.ord)]; })).filter((x) => x[2] > 800).sort((a, b) => b[2] - a[2]).slice(0, 6) }) },
];
function SqlDemo() {
  const [qi, setQi] = useState(0), [res, setRes] = useState(null), id = useRef(0);
  const q = SQ[qi];
  const run = () => { id.current++; setRes({ ...q.run(), id: id.current }); };
  return (
    <div className="sq">
      <div className="sq-side">
        <div className="sq-list">{SQ.map((x, i) => <button key={x.n} className={i === qi ? "on" : ""} onClick={() => { setQi(i); setRes(null); }}>{x.n}</button>)}</div>
        <p className="sq-schema">Table: sales(region, category, month, revenue_k, orders)</p>
      </div>
      <div>
        <pre className="sq-code"><Sql text={q.sql} /></pre>
        <div className="sq-bar"><button className="mini" onClick={run}><Ico n="play" /> Run query</button>{res && <span className="sq-meta">{res.rows.length} rows returned</span>}</div>
        <div className="tbl-wrap">
          {res ? (
            <table className="tbl" key={res.id}>
              <thead><tr>{res.cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>{res.rows.map((r, i) => <tr key={i} className="rin" style={{ animationDelay: i * 70 + "ms" }}>{r.map((v, j) => <td key={j}>{nf(v)}</td>)}</tr>)}</tbody>
            </table>
          ) : <p className="sq-empty">Press “Run query” to see the result.</p>}
        </div>
        <p className="dash-note">Queries run on the same generated sample dataset as the dashboard.</p>
      </div>
    </div>
  );
}

// 2) Data cleaning & EDA — toggle cleaning steps and watch data quality change
const RAW = [
  { name: "Amit Sharma ", city: "dehradun", age: 24, amt: "₹1,200" },
  { name: "Neha Verma", city: "Delhi", age: null, amt: "850" },
  { name: "Amit Sharma ", city: "dehradun", age: 24, amt: "₹1,200" },
  { name: "ravi kumar", city: "DELHI ", age: 31, amt: "2,400" },
  { name: "Sana Khan", city: "Dehradun", age: null, amt: "N/A" },
  { name: "Priya Singh", city: "delhi", age: 28, amt: "1,050" },
  { name: "Ravi Kumar", city: "Delhi", age: 31, amt: "2,400" },
  { name: "Karan Mehta", city: "Haridwar", age: 45, amt: "₹3,900" },
];
const CL_STEPS = [
  ["trim", "Trim & fix case", "df[['name','city']] = df[['name','city']].apply(lambda s: s.str.strip().str.title())"],
  ["amount", "Parse amount", "df['amount'] = pd.to_numeric(df['amount'].str.replace('[₹,]', '', regex=True), errors='coerce')"],
  ["age", "Fill missing age", "df['age'] = df['age'].fillna(df['age'].median())"],
  ["dups", "Remove duplicates", "df = df.drop_duplicates()"],
  ["drop", "Drop rows without amount", "df = df.dropna(subset=['amount'])"],
];
const titleCase = (s) => s.trim().replace(/\s+/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
const missingAmt = (v) => v == null || v === "" || /^n\/?a$/i.test(String(v).trim());
function runClean(on) {
  let rows = RAW.map((r) => ({ ...r }));
  if (on.trim) rows = rows.map((r) => ({ ...r, name: titleCase(r.name), city: titleCase(r.city) }));
  if (on.amount) rows = rows.map((r) => { if (typeof r.amt !== "string") return r; const n = parseFloat(r.amt.replace(/[₹,]/g, "")); return { ...r, amt: isNaN(n) ? null : n }; });
  if (on.age) {
    const a = rows.map((r) => r.age).filter((x) => x != null).sort((x, y) => x - y);
    const m = a.length % 2 ? a[(a.length - 1) / 2] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2;
    rows = rows.map((r) => (r.age == null ? { ...r, age: m, filled: true } : r));
  }
  const seen = new Set();
  rows = rows.map((r) => { const k = JSON.stringify([r.name, r.city, r.age, r.amt]); const dup = seen.has(k); seen.add(k); return { ...r, dup }; });
  if (on.dups) rows = rows.filter((r) => !r.dup);
  if (on.drop) rows = rows.filter((r) => !missingAmt(r.amt));
  return rows;
}
function CleanDemo() {
  const [on, setOn] = useState({});
  const rows = runClean(on);
  const bad = (r) => [r.name !== titleCase(r.name), r.city !== titleCase(r.city), r.age == null, typeof r.amt !== "number"].map((b) => b || r.dup);
  const total = rows.length * 4, dirty = rows.reduce((s, r) => s + bad(r).filter(Boolean).length, 0);
  const q = total ? Math.round(((total - dirty) / total) * 100) : 100;
  const raw = (v, b) => (b && typeof v === "string" ? `"${v}"` : v);
  const code = CL_STEPS.filter(([k]) => on[k]).map((s) => s[2]).join("\n") || "# raw data — no cleaning applied yet";
  const allOn = CL_STEPS.every(([k]) => on[k]);
  return (
    <div className="cl">
      <div className="cl-top">
        <div className="fchips">{CL_STEPS.map(([k, l]) => <button key={k} className={on[k] ? "on" : ""} onClick={() => setOn({ ...on, [k]: !on[k] })}>{l}</button>)}</div>
        <button className="mini ghost" onClick={() => setOn(allOn ? {} : Object.fromEntries(CL_STEPS.map(([k]) => [k, true])))}>{allOn ? "Reset" : "Apply all"}</button>
      </div>
      <div className="cl-stats"><span>Rows <b>{rows.length}</b></span><span>Data quality <b>{q}%</b></span><div className="qbar"><i style={{ width: q + "%" }} /></div></div>
      <div className="tbl-wrap">
        <table className="tbl">
          <thead><tr><th>name</th><th>city</th><th>age</th><th>amount</th></tr></thead>
          <tbody>{rows.map((r, i) => { const b = bad(r); return (
            <tr key={i} className={r.dup ? "dup" : ""}>
              <td className={b[0] ? "bad" : ""}>{raw(r.name, b[0])}</td>
              <td className={b[1] ? "bad" : ""}>{raw(r.city, b[1])}</td>
              <td className={(b[2] ? "bad " : "") + (r.filled ? "fill" : "")}>{r.age == null ? "NaN" : r.age}</td>
              <td className={b[3] ? "bad" : ""}>{typeof r.amt === "number" ? "₹" + r.amt.toLocaleString("en-IN") : r.amt == null ? "NaN" : r.amt}</td>
            </tr>); })}</tbody>
        </table>
      </div>
      <pre className="ds-code">{code}</pre>
      <p className="dash-note">Highlighted cells are problems. Steps run in the order shown — duplicates only match once the text is cleaned.</p>
    </div>
  );
}

// 3) Churn prediction — a transparent scoring model with its drivers explained
const CH_CONTRACT = [["Monthly", 1.1], ["1 year", -0.2], ["2 year", -1.2]];
function ChurnDemo() {
  const [v, setV] = useState({ tenure: 14, charges: 800, tickets: 2, contract: 1, auto: false });
  const rng = (k, label, min, max, step, fmt) => (
    <div className="rng"><label><span>{label}</span><span>{fmt(v[k])}</span></label><input type="range" min={min} max={max} step={step} value={v[k]} onChange={(e) => setV({ ...v, [k]: +e.target.value })} /></div>
  );
  const drivers = [
    ["Tenure", -0.04 * (v.tenure - 24)],
    ["Monthly charges", 0.0012 * (v.charges - 700)],
    ["Support tickets", 0.35 * (v.tickets - 1)],
    ["Contract: " + CH_CONTRACT[v.contract][0], CH_CONTRACT[v.contract][1]],
    ["Payment: " + (v.auto ? "Auto-pay" : "Manual"), v.auto ? -0.3 : 0.5],
  ];
  const p = 1 / (1 + Math.exp(-(-0.5 + drivers.reduce((s, d) => s + d[1], 0))));
  const tier = p < 0.3 ? "Low risk" : p < 0.6 ? "Medium risk" : "High risk";
  const act = p < 0.3 ? "Healthy customer. Keep the experience smooth." : p < 0.6 ? "Watch closely. A check-in or small offer could help." : "Likely to leave. Reach out now with a retention offer.";
  const C = 2 * Math.PI * 40;
  return (
    <div className="ch">
      <div className="ch-ctrl">
        {rng("tenure", "Tenure", 1, 72, 1, (x) => x + " months")}
        {rng("charges", "Monthly charges", 200, 1500, 50, (x) => "₹" + x)}
        {rng("tickets", "Support tickets", 0, 8, 1, (x) => x)}
        <div className="fgroup"><span>Contract</span><div className="fchips">{CH_CONTRACT.map(([l], i) => <button key={l} className={v.contract === i ? "on" : ""} onClick={() => setV({ ...v, contract: i })}>{l}</button>)}</div></div>
        <div className="fgroup"><span>Payment</span><div className="fchips">{[["Manual", false], ["Auto-pay", true]].map(([l, a]) => <button key={l} className={v.auto === a ? "on" : ""} onClick={() => setV({ ...v, auto: a })}>{l}</button>)}</div></div>
      </div>
      <div className="ch-out">
        <div className="ch-gauge">
          <div className="gauge"><svg viewBox="0 0 100 100"><circle className="hr-t" cx="50" cy="50" r="40" /><circle className="hr-p" cx="50" cy="50" r="40" strokeDasharray={C} strokeDashoffset={C * (1 - p)} transform="rotate(-90 50 50)" /></svg><b>{Math.round(p * 100)}%</b></div>
          <div><p className="tier">{tier}</p><p className="tier-note">{act}</p></div>
        </div>
        <h4>What drives this score</h4>
        {drivers.map(([l, c]) => { const w = Math.min(50, (Math.abs(c) / 2) * 50); return (
          <div className="drv" key={l}><span>{l}</span><div className="drv-t"><i style={{ left: (c >= 0 ? 50 : 50 - w) + "%", width: w + "%", background: c >= 0 ? "#fff" : "#6b6b73" }} /></div></div>); })}
        <p className="dash-note">White bars push churn risk up, grey bars pull it down. Illustrative model with hand-set weights for this demo, not a trained model.</p>
      </div>
    </div>
  );
}

// 4) Sales forecasting — history + adjustable forecast with an uncertainty band
function ForecastDemo() {
  const [g, setG] = useState(8), [meth, setMeth] = useState("seasonal"), [hover, setHover] = useState(-1);
  const hist = MONTHS.map((_, i) => sumF(SALES.filter((d) => d.m === i), (d) => d.rev));
  const fc = [];
  if (meth === "seasonal") for (let i = 0; i < 6; i++) fc.push(hist[i] * (1 + g / 100));
  else { const a = [...hist]; for (let i = 0; i < 6; i++) { const n = ((a[a.length - 1] + a[a.length - 2] + a[a.length - 3]) / 3) * (1 + g / 100 / 12); a.push(n); fc.push(n); } }
  const all = [...hist, ...fc];
  const up = fc.map((x, i) => x * (1.05 + 0.015 * i)), lo = fc.map((x, i) => x * (0.95 - 0.015 * i));
  const W = 640, H = 270, L = 50, Rr = 14, T = 20, B = 30, step = (W - L - Rr) / 17;
  const max = niceMax(Math.max(...all, ...up));
  const px = (i) => L + i * step, py = (x) => T + (H - T - B) * (1 - x / max);
  const hp = hist.map((x, i) => [px(i), py(x)]), fp = [[px(11), py(hist[11])], ...fc.map((x, i) => [px(12 + i), py(x)])];
  const band = [...up.map((x, i) => [px(12 + i), py(x)]), ...lo.map((x, i) => [px(17 - i), py(lo[5 - i])])].map((p) => p.join(",")).join(" ");
  const lab = (i) => (i < 12 ? MONTHS[i] : MONTHS[i - 12] + "+");
  const next = sumF(fc, (x) => x), base = sumF(hist.slice(0, 6), (x) => x), delta = Math.round((next / base - 1) * 100);
  const onMove = (e) => { const b = e.currentTarget.getBoundingClientRect(); setHover(Math.max(0, Math.min(17, Math.round(((((e.clientX - b.left) / b.width) * W) - L) / step)))); };
  return (
    <div className="fc">
      <div className="dash-top">
        <div className="fgroup"><span>Method</span><div className="fchips">{[["seasonal", "Seasonal"], ["ma", "Moving average"]].map(([k, l]) => <button key={k} className={meth === k ? "on" : ""} onClick={() => setMeth(k)}>{l}</button>)}</div></div>
        <div className="fgroup"><span>Growth {g > 0 ? "+" : ""}{g}%</span><input type="range" min="-10" max="30" value={g} onChange={(e) => setG(+e.target.value)} style={{ accentColor: "#fff", width: 160 }} /></div>
      </div>
      <div className="kpis">
        <div className="card kpi"><small>Next 6 months</small><b>{fmtRev(next)}</b></div>
        <div className="card kpi"><small>vs Jan–Jun history</small><b>{(delta > 0 ? "+" : "") + delta}%</b></div>
        <div className="card kpi"><small>Method</small><b style={{ fontSize: "1.2rem" }}>{meth === "seasonal" ? "Seasonal" : "3-mo average"}</b></div>
      </div>
      <div className="card chart-card">
        <h4>Revenue: history and forecast <span>· hover the chart</span></h4>
        <svg viewBox={`0 0 ${W} ${H}`} className="lc" onPointerMove={onMove} onPointerLeave={() => setHover(-1)} role="img" aria-label="Revenue history and forecast chart">
          {[0, 1, 2, 3, 4].map((i) => <g key={i}><line className="lc-g" x1={L} x2={W - Rr} y1={py((max * i) / 4)} y2={py((max * i) / 4)} /><text className="lc-t" x={L - 8} y={py((max * i) / 4) + 4} textAnchor="end">{Math.round((max * i) / 4)}K</text></g>)}
          {all.map((_, i) => <text key={i} className="lc-t" x={px(i)} y={H - 8} textAnchor="middle" style={{ fontSize: 9 }}>{lab(i)}</text>)}
          <line className="lc-div" x1={px(11) + step / 2} x2={px(11) + step / 2} y1={T} y2={H - B} />
          <text className="lc-t" x={px(11) + step / 2 + 6} y={T + 8}>Forecast</text>
          <polygon className="lc-band" points={band} />
          <path className="lc-l" d={curve(hp)} />
          <path className="lc-f" d={curve(fp)} />
          {hover >= 0 && <g>
            <line className="lc-h" x1={px(hover)} x2={px(hover)} y1={T} y2={H - B} />
            <circle cx={px(hover)} cy={py(all[hover])} r="5" className="lc-d" />
            <g transform={`translate(${Math.max(64, Math.min(W - 64, px(hover)))} ${T - 6})`}><rect x="-62" y="-16" width="124" height="22" rx="6" className="lc-pill" /><text className="lc-pt" textAnchor="middle" y="0">{lab(hover)} · {fmtRev(all[hover])}{hover > 11 ? " (f)" : ""}</text></g>
          </g>}
        </svg>
        <p className="insight"><b>Insight:</b> {meth === "seasonal" ? "The seasonal method repeats last year's monthly pattern and applies your growth rate." : "The moving average smooths the recent months, so the forecast is flatter and ignores seasonality."} The shaded band widens further out, because far-away months are less certain.</p>
      </div>
      <p className="dash-note">Forecast built from the generated sample dataset (revenue in ₹ thousand).</p>
    </div>
  );
}

const DEMOS = { "Sales Performance Dashboard": Dashboard, "SQL Business Analysis": SqlDemo, "Data Cleaning & EDA": CleanDemo, "Customer Churn Prediction": ChurnDemo, "Sales Forecasting": ForecastDemo };
function DemoModal({ p, onClose }) {
  const closeRef = useRef(null);
  const D = DEMOS[p.t] || Dashboard;
  useEffect(() => {
    const prev = document.activeElement;
    closeRef.current && closeRef.current.focus();
    const key = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", key); document.body.style.overflow = ""; prev && prev.focus && prev.focus(); };
  }, []);
  return (
    <div className="cs-back" onClick={onClose}>
      <div className="card demo-win" role="dialog" aria-modal="true" aria-label={p.t + " interactive demo"} onClick={(e) => e.stopPropagation()}>
        <div className="demo-bar"><span /><span /><span /><em>{p.t} — interactive demo</em><button className="demo-x" ref={closeRef} onClick={onClose} aria-label="Close demo"><Ico n="x" /></button></div>
        <div className="demo-body"><D /></div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [f, setF] = useState({ name: "", email: "", subject: "", message: "" });
  const [err, setErr] = useState({});
  const [state, setState] = useState("idle"); // idle | sending | done
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setErr({ ...err, [k]: "" }); setState("idle"); };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = "Enter a valid email address.";
    if (!f.message.trim()) er.message = "Please write a short message.";
    setErr(er);
    if (Object.keys(er).length) return;
    setState("sending");
    // no backend wired up (same as original) — replace with your API / EmailJS / Formspree call
    setTimeout(() => { setState("done"); setF({ name: "", email: "", subject: "", message: "" }); }, 1200);
  };

  return (
    <form className="card form rv rv-r" onSubmit={submit} noValidate>
      <div className="row2">
        <div className="field">
          <label htmlFor="n">Your Name</label>
          <input id="n" value={f.name} onChange={set("name")} placeholder="Your name" aria-invalid={!!err.name} />
          {err.name && <small>{err.name}</small>}
        </div>
        <div className="field">
          <label htmlFor="e">Your Email</label>
          <input id="e" type="email" value={f.email} onChange={set("email")} placeholder="you@example.com" aria-invalid={!!err.email} />
          {err.email && <small>{err.email}</small>}
        </div>
      </div>
      <div className="field">
        <label htmlFor="s">Subject</label>
        <input id="s" value={f.subject} onChange={set("subject")} placeholder="Project inquiry / Freelance / Just saying hi!" />
      </div>
      <div className="field">
        <label htmlFor="m">Message</label>
        <textarea id="m" value={f.message} onChange={set("message")} placeholder="Tell me about your project or idea..." aria-invalid={!!err.message} />
        {err.message && <small>{err.message}</small>}
      </div>
      <button className="btn primary full" disabled={state === "sending"}>
        {state === "sending" ? "Sending..." : <><Ico n="send" /> Send Message</>}
      </button>
      <p className="status" role="status">{state === "done" && "Thanks! I'll get back to you soon."}</p>
    </form>
  );
}

/* ---------- APP ---------- */
export default function Portfolio() {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("all");
  const ready = true;
  const [open, setOpen] = useState(null);
  const [demo, setDemo] = useState(null);
  const hsRef = useRef(null);
  const trackRef = useRef(null);
  const progRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  const rootRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    // fonts + icons (remove if already in your index.html)
    const links = [
      "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;600;700;800&family=Libre+Caslon+Text:wght@400;700&family=Manrope:wght@400;500;600;700&display=swap",
    ].map((href) => { const l = document.createElement("link"); l.rel = "stylesheet"; l.href = href; document.head.appendChild(l); return l; });
    document.title = "Ankit Jinkwan | Data Analytics";
    let raf = 0;
    const reduceMo = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pars = reduceMo ? [] : [...document.querySelectorAll("[data-par]")].map((el) => ({ el, k: parseFloat(el.dataset.par) }));
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(y > 400);
        for (const o of pars) o.el.style.translate = "0 " + (y * o.k).toFixed(1) + "px"; // light parallax
        barRef.current && (barRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { links.forEach((l) => l.remove()); window.removeEventListener("scroll", onScroll); };
  }, []);

  // scroll reveal: anything with className "rv" fades/slides in once
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // horizontal-scroll projects: vertical scroll drives the sideways track
  useEffect(() => {
    const sec = hsRef.current, track = trackRef.current, prog = progRef.current;
    if (!sec || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, dist = 0, h = 0;
    const measure = () => {
      dist = Math.max(0, track.scrollWidth - window.innerWidth);
      h = dist + window.innerHeight;
      sec.style.height = h + "px";
    };
    const update = () => {
      const top = sec.getBoundingClientRect().top;
      const p = dist ? Math.min(1, Math.max(0, -top / (h - window.innerHeight))) : 0;
      track.style.transform = `translateX(${-p * dist}px)`;
      prog.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    const onResize = () => { measure(); onScroll(); };
    measure(); update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(track);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, [filter]);

  const shown = PROJECTS.filter((p) => filter === "all" || p.c === filter);

  return (
    <div className={"pf" + (ready ? " ready" : "")} ref={rootRef} onPointerMove={(e) => {
      const c = e.target.closest && e.target.closest(".card");
      if (c) { const r = c.getBoundingClientRect(); c.style.setProperty("--px", e.clientX - r.left + "px"); c.style.setProperty("--py", e.clientY - r.top + "px"); }
      const t = e.target.closest && e.target.closest(".tilt");
      if (t) {
        const r = t.getBoundingClientRect();
        t.style.setProperty("--ry", ((e.clientX - r.left) / r.width - 0.5) * 12 + "deg");
        t.style.setProperty("--rx", -((e.clientY - r.top) / r.height - 0.5) * 12 + "deg");
      }
    }} onPointerOut={(e) => {
      const t = e.target.closest && e.target.closest(".tilt");
      if (t && !(e.relatedTarget && t.contains(e.relatedTarget))) { t.style.setProperty("--rx", "0deg"); t.style.setProperty("--ry", "0deg"); }
    }}>
      <style>{CSS}</style>
      <div className="progress" ref={barRef} aria-hidden="true" />
      <nav className="dots" aria-label="Sections">
        {IDS.map((id, i) => <a key={id} href={"#" + id} aria-label={NAV[i]} title={NAV[i]} className={active === id ? "on" : ""} />)}
      </nav>
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>

      <header className="top">
        <div className="wrap bar-nav">
          <a href="#top" className="logo">Ankit<b>.</b></a>
          <nav className={"links" + (menu ? " open" : "")} aria-label="Primary">
            {NAV.map((n, i) => (
              <a key={n} href={"#" + IDS[i]} className={active === IDS[i] ? "on" : ""} onClick={() => setMenu(false)}>{n}</a>
            ))}
          </nav>
          <button className="burger" onClick={() => setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu}>
            <Ico n={menu ? "x" : "menu"} />
          </button>
        </div>
      </header>

      {/* HERO */}
      <Intro />

      <section id="hero" className="hero">
        <Deco k="hero" />
        <div className="wrap hero-grid">
          <div className="intro">
            <p className="hello">👋 Hello, I'm</p>
            <h1>Ankit<br />Jinkwan</h1>
            <p className="lead"><span className="lead-hook">Numbers hide stories. I find them.</span>Raw rows in. Sharp decisions out. I clean it, query it, chart it — and make the answer impossible to ignore.</p>
            <div className="btns">
              <a href="#projects" className="btn primary"><Ico n="arrow" /> View My Work</a>
              <a href="#contact" className="btn ghost"><Ico n="send" /> Hire Me</a>
            </div>
          </div>
        </div>
      </section>

      <Band />

      {/* ABOUT */}
      <section id="about">
        <Deco k="about" />
        <div className="wrap">
          <SectionHead kicker="A little about me" title="About Me" sub="Who I am and how I work" />
          <div className="about-grid">
            <div className="card about rv rv-r">
              <h3>Turning data into clear decisions</h3>
              <ScrollText>{"I'm a B.Tech Computer Science student from Uttarakhand, India, focused on data analytics and AI/ML. I enjoy cleaning data, finding patterns and turning them into simple, clear insights."}</ScrollText>
              <ScrollText>{"When I'm not coding, you'll find me exploring new technologies, contributing to open-source, or hiking in the Himalayas."}</ScrollText>
              <ul className="ticks">
                {["Clean & Accurate Analysis", "Python & SQL", "Clear Data Visualization", "Open to Remote Work"].map((t) => (
                  <li key={t}><Ico n="check" />{t}</li>
                ))}
              </ul>
              <div className="btns">
                <a href="https://github.com/ankitjhinkwan/portfolio/raw/main/Ankit_Jinkwan_Resume.pdf.pdf" target="_blank" rel="noopener" className="btn primary"><Ico n="download" /> Download CV</a>
                <a href="#contact" className="btn ghost">Let's Talk</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="wrap">
          <SectionHead kicker="What I work with" title="My Skills" sub="Technologies and tools I use daily" />
          <SkillsShowcase />
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="hs" ref={hsRef}>
        <div className="hs-sticky">
          <Deco k="projects" />
          <div className="wrap hs-head">
            <SectionHead kicker="Selected work" title="My Projects" sub="A selection of my recent work" />
            <div className="filters rv" role="tablist" aria-label="Filter projects">
              {FILTERS.map(([k, l]) => (
                <button key={k} role="tab" aria-selected={filter === k} className={filter === k ? "on" : ""} onClick={() => setFilter(k)}>{l}</button>
              ))}
            </div>
          </div>
          <div className="hs-track" ref={trackRef}>
            {shown.map((p, i) => <ProjectCard key={p.t} p={p} i={i} onOpen={setOpen} onDemo={setDemo} />)}
          </div>
          <div className="hs-prog" aria-hidden="true"><i ref={progRef} /></div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <Deco k="contact" />
        <div className="wrap">
          <SectionHead kicker="Get in touch" title="Let's Talk" sub="Have a project in mind? Let's talk!" />
          <div className="contact-grid">
            <div className="card info rv rv-l">
              <h3>Let's work together</h3>
              <p>I'm currently available for freelance projects and full-time roles. Reach out anytime!</p>
              {[
                ["pin", "Location", "Uttarakhand, India"],
                ["mail", "Email", <a href="mailto:hello@ankitjinkwan.dev">hello@ankitjinkwan.dev</a>],
                ["phone", "Phone", <a href="tel:+919528693191">+91 9528693191</a>],
                ["clock", "Availability", "Mon – Sat, 9 AM – 6 PM IST"],
              ].map(([ic, l, v]) => (
                <div className="irow" key={l}>
                  <div className="ico"><Ico n={ic} /></div>
                  <div><h4>{l}</h4><p>{v}</p></div>
                </div>
              ))}
              <div className="social">
                <a href="#" title="LinkedIn" aria-label="LinkedIn"><Ico n="linkedin" /></a>
                <a href="#" title="GitHub" aria-label="GitHub"><Ico n="github" /></a>
                <a href="#" title="Twitter" aria-label="Twitter"><Ico n="twitter" /></a>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap rv">
          <a href="#top" className="logo">Ankit<b>.</b></a>
          <p>Turning data into decisions.</p>
          <nav className="flinks" aria-label="Footer">
            {NAV.map((n, i) => <a key={n} href={"#" + IDS[i]}>{n}</a>)}
          </nav>
          <small>© 2025 Ankit Jinkwan. All rights reserved.</small>
        </div>
      </footer>

      {open && <CaseStudy p={open} onClose={() => setOpen(null)} onDemo={(q) => { setOpen(null); setDemo(q); }} />}
      {demo && <DemoModal p={demo} onClose={() => setDemo(null)} />}

      <a href="#top" className={"totop" + (scrolled ? " on" : "")} aria-label="Back to top"><Ico n="up" /></a>
    </div>
  );
}

/* ---------- STYLES ---------- */
const CSS = `
.pf{--bg:#000;--panel:#0a0a0c;--panel2:#131316;--line:#27272c;--text:#f3f3f5;--dim:#9a9aa3;--a:#fff;--b:#bdbdc6;
--display:'Bricolage Grotesque',system-ui,sans-serif;--body:'Manrope',system-ui,sans-serif;
background:var(--bg);color:var(--text);font-family:var(--body);line-height:1.7;overflow-x:clip;min-height:100vh}
.pf *{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
.pf a{color:inherit;text-decoration:none}
.pf ul{list-style:none}
.pf p{color:var(--dim)}
.pf :focus-visible{outline:2px solid var(--a);outline-offset:3px;border-radius:6px}
.pf h1,.pf h2,.pf h3,.pf h4{font-family:var(--display);line-height:1.1;letter-spacing:-.02em}
.wrap{max-width:1160px;margin:0 auto;padding:0 1.5rem}
section{padding:5rem 0;scroll-margin-top:60px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:16px}

/* nav */
.top{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(0,0,0,.92);border-bottom:1px solid var(--line)}
.bar-nav{display:flex;align-items:center;justify-content:space-between;height:64px}
.logo{font-family:var(--display);font-weight:800;font-size:1.45rem}
.logo b{color:var(--a)}
.links{display:flex;gap:.4rem}
.links a{padding:.45rem .9rem;border-radius:8px;font-size:.92rem;font-weight:600;color:var(--dim);transition:color .2s,background .2s}
.links a:hover{color:var(--text)}
.links a.on{color:var(--bg);background:var(--a)}
.burger{display:none;background:none;border:1px solid var(--line);color:var(--text);width:42px;height:42px;border-radius:10px;font-size:1.1rem;cursor:pointer}

/* buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.55rem;padding:.8rem 1.5rem;border-radius:10px;font-weight:700;font-size:.95rem;border:1px solid transparent;cursor:pointer;font-family:var(--body);transition:transform .2s,background .2s,border-color .2s}
.btn.primary{background:var(--a);color:#000}
.btn.primary:hover{transform:translateY(-2px);background:#d9d9de}
.btn.ghost{border-color:var(--line);color:var(--text);background:transparent}
.btn.ghost:hover{border-color:var(--b);color:var(--b)}
.btn:disabled{opacity:.7;cursor:wait}
.btn.full{width:100%}
.btns{display:flex;gap:.9rem;flex-wrap:wrap;justify-content:center}

/* scroll fx */
.progress{position:fixed;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--a),var(--b));transform-origin:left;transform:scaleX(0);z-index:60}
.aurora{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}
.aurora i{position:absolute;width:70vmax;height:70vmax;border-radius:50%;opacity:.45;will-change:transform;animation:aur 30s ease-in-out infinite alternate}
.aurora i:nth-child(1){background:radial-gradient(circle,rgba(255,255,255,.16) 0%,transparent 62%);top:-30vmax;left:-20vmax}
.aurora i:nth-child(2){background:radial-gradient(circle,rgba(220,220,230,.12) 0%,transparent 62%);bottom:-35vmax;right:-25vmax;animation-duration:36s;animation-delay:-8s}
.aurora i:nth-child(3){background:radial-gradient(circle,rgba(255,255,255,.1) 0%,transparent 62%);top:25%;left:35%;width:55vmax;height:55vmax;opacity:.3;animation-duration:42s;animation-delay:-16s}
@keyframes aur{0%{transform:translate(0,0) scale(1)}50%{transform:translate(8vmax,6vmax) scale(1.15)}100%{transform:translate(-6vmax,10vmax) scale(.95)}}
.pf section,.pf footer{position:relative;z-index:1}
.rv{opacity:0;transform:translateY(44px);transition:opacity .8s cubic-bezier(.16,.8,.34,1),transform .8s cubic-bezier(.16,.8,.34,1)}
.rv.in{opacity:1;transform:none}
.tiles .rv:nth-child(2),.skills-grid .rv:nth-child(even),.contact-grid .rv:nth-child(2){transition-delay:.12s}
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}

/* intro (hover reveal) */
.pf .intro-s{height:100vh;min-height:560px;overflow:hidden;cursor:crosshair;touch-action:pan-y;padding:0}
.ilayer{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 1.5rem}
.ibig{font-family:'Fredoka',var(--display);font-weight:600;font-size:clamp(3rem,11vw,9rem);line-height:1.02;letter-spacing:-.01em}
.itag{margin-top:1.6rem;font-size:clamp(.95rem,2vw,1.2rem);font-weight:600;color:var(--text)}
.itag.dim{color:var(--dim);font-weight:500}
.ilayer.base .ibig{color:transparent;-webkit-text-stroke:1.5px #3a3a42}
.ilayer.rev{background:radial-gradient(circle calc(var(--r,0px)*1.1) at var(--mx,50%) var(--my,50%),#2a2a2e 0%,#050505 75%);-webkit-mask-image:radial-gradient(circle var(--r,0px) at var(--mx,50%) var(--my,50%),#000 62%,transparent 100%);mask-image:radial-gradient(circle var(--r,0px) at var(--mx,50%) var(--my,50%),#000 62%,transparent 100%)}
.ilayer.rev .ibig{background:linear-gradient(100deg,var(--a),var(--b));-webkit-background-clip:text;background-clip:text;color:transparent}
.scue{position:absolute;bottom:1.6rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:.5rem;font-size:.78rem;color:var(--dim);z-index:2;pointer-events:none}
.scue i{width:1px;height:38px;background:linear-gradient(var(--a),transparent);animation:cue 1.7s ease-in-out infinite}
@keyframes cue{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}

/* visual elements */
.pf .wrap{position:relative;z-index:1}
.pf section{overflow-x:clip}
.shape{position:absolute;pointer-events:none;}
.shape.ring{border:1.5px solid #3a3a42;border-radius:50%;animation:spin 24s linear infinite;opacity:.65}
.shape.ring::after{content:"";position:absolute;top:-4px;left:50%;width:8px;height:8px;border-radius:50%;background:var(--b);box-shadow:0 0 12px var(--b)}
.shape.sq{border:1.5px solid #3a3a42;border-radius:14px;animation:spin 30s linear infinite reverse;opacity:.55}
.shape.plus{opacity:.75;animation:float 6s ease-in-out infinite}
.shape.plus::before,.shape.plus::after{content:"";position:absolute;background:var(--b);border-radius:2px}
.shape.plus::before{left:0;right:0;top:50%;height:2px;margin-top:-1px}
.shape.plus::after{top:0;bottom:0;left:50%;width:2px;margin-left:-1px}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes float{50%{transform:translateY(-14px) rotate(20deg)}}
.card{position:relative}
.card::before{content:"";position:absolute;inset:0;border-radius:inherit;background:radial-gradient(320px circle at var(--px,50%) var(--py,50%),rgba(255,255,255,.08),transparent 65%);opacity:0;transition:opacity .3s;pointer-events:none}
.card:hover::before{opacity:1}
.shead h2{overflow:hidden;padding-bottom:.15em}
.shead h2 .w{display:inline-block;opacity:0;transform:translateY(105%) rotate(4deg);transition:opacity .7s,transform .8s cubic-bezier(.16,.8,.34,1);transition-delay:calc(var(--i)*.1s + .15s)}
.shead h2 .w{margin-right:.26em}
.shead h2 .w:last-child{margin-right:0}
.shead.in h2 .w{opacity:1;transform:none}
.band{overflow:hidden;border-block:1px solid var(--line);padding:1.1rem 0;background:rgba(10,10,12,.6);position:relative;z-index:1;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.mtrack{display:flex;width:max-content;animation:mq 50s linear infinite}
.band:hover .mtrack{animation-play-state:paused}
.mtrack .chip{margin-right:.8rem}
@keyframes mq{to{transform:translateX(-50%)}}
.chip{display:inline-flex;align-items:center;gap:.5rem;padding:.55rem 1.1rem;border:1px solid var(--line);border-radius:999px;background:var(--panel2);font-weight:700;font-size:.9rem;color:var(--text);white-space:nowrap}
.chip .ic{color:var(--b)}
.ic{width:1.15em;height:1.15em;flex-shrink:0}
.btn .ic{width:1.1em;height:1.1em}
.burger .ic{width:20px;height:20px}
.ico .ic,.social .ic{width:20px;height:20px}
.totop .ic{width:20px;height:20px}
.tk{margin-top:3.2rem}
.tk-title{font-size:1.6rem;margin-bottom:1.2rem}
.tk-title span{color:var(--a)}
.tk-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.2rem}
.tk-card{padding:1.4rem}
.tk-head{display:flex;align-items:center;gap:.8rem;margin-bottom:1rem}
.tk-head h4{font-size:1.05rem}
.tk-ico{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:var(--panel2);border:1px solid var(--line);color:var(--b)}
.tk-chips{display:flex;flex-wrap:wrap;gap:.5rem}
.tk-chips .chip{padding:.4rem .8rem;font-size:.82rem;transition:border-color .2s}
.tk-chips .chip:hover{border-color:var(--a)}
.hero::before{content:"";position:absolute;inset:0;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:56px 56px;opacity:.4;-webkit-mask-image:radial-gradient(ellipse at 50% 40%,#000 15%,transparent 70%);mask-image:radial-gradient(ellipse at 50% 40%,#000 15%,transparent 70%);pointer-events:none}

/* scroll variants */
.rv-l{transform:translateX(-64px)}
.rv-r{transform:translateX(64px)}
.rv-s{transform:translateY(34px) scale(.92)}
.proj.rv,.tech.rv{transition:opacity .8s cubic-bezier(.16,.8,.34,1),transform .8s cubic-bezier(.16,.8,.34,1),border-color .2s}
.proj.in:hover{transform:translateY(-4px);transition:transform .25s,border-color .2s;transition-delay:0s!important}
.tech.in:hover{transform:translateY(-3px);transition:transform .25s,border-color .2s;transition-delay:0s!important}
.shead::before{content:"";display:block;width:56px;height:3px;border-radius:3px;background:linear-gradient(90deg,var(--a),var(--b));margin-bottom:1rem;transform:scaleX(0);transform-origin:left;transition:transform .9s cubic-bezier(.16,.8,.34,1) .1s}
.shead.in::before{transform:scaleX(1)}
.dots{position:fixed;right:1rem;top:50%;translate:0 -50%;display:flex;flex-direction:column;gap:.7rem;z-index:45}
.dots a{width:4px;height:18px;border-radius:4px;background:var(--line);transition:all .3s}
.dots a:hover{background:var(--dim)}
.dots a.on{background:var(--a);height:36px}
@supports (animation-timeline:view()){
  .thumb span{animation:thumbSlide linear both;animation-timeline:view();animation-range:entry 0% exit 100%}
  .tile b{animation:tilePop linear both;animation-timeline:view();animation-range:entry 0% cover 40%}
  .sk-card h3 i{animation:spin360 linear both;animation-timeline:view();animation-range:entry 0% exit 100%}
}
@keyframes thumbSlide{from{transform:translateY(26px)}to{transform:translateY(-26px)}}
@keyframes tilePop{from{transform:scale(.7);opacity:.3}to{transform:none;opacity:1}}
@keyframes spin360{to{transform:rotate(360deg)}}

/* scroll-lit text */
.about .stext{font-family:var(--display);font-size:clamp(1.25rem,2.5vw,1.9rem);line-height:1.45;font-weight:600;letter-spacing:-.01em;max-width:34em;margin-bottom:1.4rem}
.stext span{color:#4a4a52;transition:color .35s}
.stext span.lit{color:var(--text)}

/* mini analytics chart */
.chart{width:100%;margin-top:1.1rem;padding:1rem;border:1px solid var(--line);border-radius:12px;background:rgba(255,255,255,.04);text-align:left}
.chart-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:.5rem}
.chart-head span{font-size:.8rem;font-weight:700}
.chart-head em{font-style:normal;font-size:.7rem;color:var(--dim)}
.chart svg{width:100%;height:auto;display:block;overflow:visible}
.c-grid{stroke:var(--line);stroke-width:1;fill:none}
.c-line{fill:none;stroke:var(--b);stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 2s cubic-bezier(.65,0,.35,1)}
.c-area{fill:url(#cg);opacity:0;transition:opacity 1s 1s}
.c-dot{fill:var(--bg);stroke:var(--b);stroke-width:1.5;opacity:0;transition:opacity .4s calc(var(--i)*.2s + .3s)}
.go .c-line{stroke-dashoffset:0}
.go .c-area,.go .c-dot{opacity:1}
.bars{display:flex;align-items:flex-end;gap:6px;height:48px;margin-top:.7rem;border-bottom:1px solid var(--line)}
.bars i{flex:1;height:var(--h);background:linear-gradient(var(--b),var(--a));border-radius:4px 4px 0 0;transform:scaleY(0);transform-origin:bottom;transition:transform .9s cubic-bezier(.16,.8,.34,1) calc(var(--i)*.08s + .4s)}
.go .bars i{transform:scaleY(1)}

/* horizontal-scroll projects */
.pf #projects{padding:0}
.hs{position:relative}
.hs-sticky{position:sticky;top:0;height:100vh;height:100svh;display:flex;flex-direction:column;justify-content:center;padding-top:76px;overflow:hidden}
.hs-head{width:100%}
.hs .shead{margin-bottom:1.4rem}
.hs .filters{margin-bottom:1.2rem}
.hs-track{display:flex;gap:1.6rem;width:max-content;padding:.6rem 1.5rem .6rem max(1.5rem,calc((100vw - 1160px)/2 + 1.5rem));will-change:transform}
.hs-track .proj{flex:0 0 340px}
.hs .thumb{height:120px}
.hs-prog{height:3px;background:var(--line);border-radius:3px;overflow:hidden;align-self:center;width:min(1160px,calc(100% - 3rem));margin-top:1rem}
.hs-prog i{display:block;height:100%;background:linear-gradient(90deg,var(--a),var(--b));transform-origin:left;transform:scaleX(0)}
@media(max-height:760px){.hs .shead p:last-child{display:none}}
@media(max-width:768px){.hs-track .proj{flex-basis:280px}}

/* skills showcase */
.skx{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.2rem}
.skx-card{padding:1.5rem;overflow:hidden;min-height:190px;display:flex;flex-direction:column;justify-content:flex-end}
.skx-card::after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;background:linear-gradient(90deg,var(--a),var(--b));transform:scaleX(0);transform-origin:left;transition:transform .6s cubic-bezier(.16,.8,.34,1)}
.skx-card:hover::after{transform:scaleX(1)}
.skx-mark{position:absolute;right:-20px;top:-20px;width:11rem;height:11rem;color:var(--a);opacity:.1;pointer-events:none}
.skx-mark .ic{width:100%;height:100%}
.skx-icon .ic{width:2rem;height:2rem}
.skx-icon{position:absolute;top:1.4rem;left:1.4rem;width:54px;height:54px;border-radius:15px;display:grid;place-items:center;font-size:2rem;color:var(--b);background:var(--panel2);border:1px solid var(--line);box-shadow:0 0 32px rgba(255,255,255,.12)}
.skx-icon .ic-react{animation:spin 16s linear infinite}
.skx-icon .ic-python{animation:bob 4s ease-in-out infinite}
@keyframes bob{50%{transform:translateY(-5px)}}
.skx-group{color:var(--a);font-weight:700;font-size:.85rem}
.skx-card h3{font-size:1.5rem;margin:.1rem 0 0}
.skx-card b{font-family:var(--display);font-size:clamp(3.8rem,8vw,5.8rem);line-height:1;font-weight:800;background:linear-gradient(100deg,var(--a),var(--b));-webkit-background-clip:text;background-clip:text;color:transparent}
@media(max-width:768px){.skx{grid-template-columns:1fr}.skx-card{min-height:300px}}

/* name text (intro) */
.gsvg{width:min(1100px,94vw);height:auto;display:block;overflow:visible}
.gtext{font-family:'Libre Caslon Text',Georgia,'Times New Roman',serif;font-weight:400;fill:#fff}

/* hero */
.hero{min-height:auto;display:flex;align-items:center;padding:6.5rem 0 4rem}
.hero-grid{display:grid;grid-template-columns:1fr;justify-items:center;text-align:center}
.hello{color:var(--b);font-weight:700;margin-bottom:1rem}
.intro h1{font-size:clamp(3.6rem,10vw,8rem);font-weight:800;margin-bottom:1.5rem}
.lead{max-width:640px;margin-left:auto;margin-right:auto;font-size:1.08rem;margin-bottom:2rem}
.stats{display:flex;gap:2.5rem;margin-top:2.8rem;padding-top:1.6rem;border-top:1px solid var(--line);max-width:480px}
.stats dt{font-family:var(--display);font-size:1.9rem;font-weight:700;color:var(--text)}
.stats dd{font-size:.82rem;color:var(--dim)}
.intro>*{animation:rise .7s cubic-bezier(.16,.8,.34,1) both}
.intro>:nth-child(2){animation-delay:.08s}.intro>:nth-child(3){animation-delay:.16s}
.intro>:nth-child(4){animation-delay:.24s}
@keyframes rise{from{opacity:0;transform:translateY(22px)}}
.idcard{overflow:hidden;background:var(--panel)}
.idbar{display:flex;align-items:center;gap:.4rem;padding:.75rem 1rem;background:var(--panel2);border-bottom:1px solid var(--line)}
.idbar span{width:10px;height:10px;border-radius:50%;background:var(--line)}
.idbar span:first-child{background:#ff6b6b}.idbar span:nth-child(2){background:var(--a)}.idbar span:nth-child(3){background:var(--b)}
.idbar em{margin-left:auto;font-style:normal;font-size:.78rem;color:var(--dim)}
.idbody{padding:2.2rem 1.5rem;display:flex;flex-direction:column;align-items:center;text-align:center;gap:.5rem}
.avatar{width:130px;height:130px;border-radius:24px;background:var(--a);color:#000;display:grid;place-items:center;font-family:var(--display);font-size:2.8rem;font-weight:800;margin-bottom:.7rem}
.chips{display:flex;gap:.5rem;flex-wrap:wrap;justify-content:center;margin-top:.6rem}
.chips span,.tags span{padding:.25rem .75rem;border-radius:999px;border:1px solid var(--line);background:var(--panel2);font-size:.76rem;font-weight:700;color:var(--text)}

/* section heads */
.shead{margin-bottom:3rem;max-width:560px}
.kicker{color:var(--a);font-weight:700;font-size:.9rem;margin-bottom:.5rem}
.shead h2{font-size:clamp(2.2rem,4.5vw,3rem);font-weight:700;margin-bottom:.5rem}

/* about */
.about-grid{display:grid;grid-template-columns:1fr}
.tiles{display:grid;gap:1.6rem}
.tile{padding:2rem;display:flex;flex-direction:column;justify-content:center}
.tile b{font-family:var(--display);font-size:3rem;color:var(--a);line-height:1}
.tile span{color:var(--dim);font-size:.9rem;margin-top:.4rem}
.about{padding:2.4rem}
.about h3{font-size:1.7rem;margin-bottom:1.1rem}
.about p{margin-bottom:.9rem;max-width:62ch}
.ticks{display:grid;grid-template-columns:1fr 1fr;gap:.8rem;margin:1.6rem 0}
.ticks li{display:flex;gap:.6rem;align-items:center;font-size:.92rem}
.ticks .ic{color:var(--b)}

/* skills */
.skills-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.6rem}
.sk-card{padding:1.8rem}
.sk-card h3{font-size:1.1rem;margin-bottom:1.3rem;display:flex;gap:.6rem;align-items:center}
.sk-card h3 i{color:var(--a)}
.skill{margin-bottom:1.1rem}
.skill-top{display:flex;justify-content:space-between;font-size:.88rem;margin-bottom:.4rem;font-weight:600}
.skill-top span:last-child{color:var(--dim)}
.bar{height:6px;background:var(--panel2);border-radius:6px;overflow:hidden}
.bar i{display:block;height:100%;background:linear-gradient(90deg,var(--a),var(--b));border-radius:6px;transition:width 1.2s cubic-bezier(.16,.8,.34,1)}
.stack{margin-top:3.5rem}
.stack h3{margin-bottom:1.3rem}
.stack-row{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:1rem}
.tech{padding:1.1rem .5rem;display:flex;flex-direction:column;align-items:center;gap:.5rem;transition:border-color .2s,transform .2s}
.tech:hover{border-color:var(--a);transform:translateY(-3px)}
.tech i{font-size:1.7rem;color:var(--a)}
.tech span{font-size:.78rem;color:var(--dim);font-weight:600}

/* projects */
.filters{display:flex;gap:.6rem;flex-wrap:wrap;margin-bottom:2.2rem}
.filters button{padding:.5rem 1.2rem;border-radius:999px;border:1px solid var(--line);background:transparent;color:var(--dim);font:600 .88rem var(--body);cursor:pointer;transition:all .2s}
.filters button:hover{color:var(--text);border-color:var(--dim)}
.filters button.on{background:var(--a);border-color:var(--a);color:#000}
.proj-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1.6rem}
.proj{padding:1.3rem;transition:border-color .2s,transform .2s}
.proj:hover{border-color:var(--a);transform:translateY(-4px)}
.thumb{height:160px;border-radius:10px;margin-bottom:1.1rem;display:grid;place-items:center;text-align:center;padding:1rem;font-family:var(--display);font-weight:600;color:var(--text);background:linear-gradient(135deg,#1a1a1d,#0e0e10)}
.pcat{color:var(--a);font-size:.8rem;font-weight:700}
.proj h3{margin:.3rem 0 .5rem;font-size:1.2rem}
.proj>p:not(.pcat){font-size:.92rem;margin-bottom:1rem}
.tags{display:flex;flex-wrap:wrap;gap:.45rem}

/* contact */
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.6rem}
.info,.form{padding:2.2rem}
.info h3{margin-bottom:.8rem;font-size:1.5rem}
.info>p{margin-bottom:1.6rem}
.irow{display:flex;gap:1rem;align-items:center;margin-bottom:1.1rem}
.ico{width:44px;height:44px;border-radius:12px;background:var(--panel2);border:1px solid var(--line);display:grid;place-items:center;color:var(--a);flex-shrink:0}
.irow h4{font-size:.85rem;font-family:var(--body);font-weight:700}
.irow p{font-size:.92rem}
.irow a:hover{color:var(--b)}
.social{display:flex;gap:.7rem;margin-top:1.6rem}
.social a{width:44px;height:44px;border-radius:12px;border:1px solid var(--line);display:grid;place-items:center;transition:all .2s}
.social a:hover{background:var(--a);color:#000;border-color:var(--a)}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.field{margin-bottom:1.1rem}
.field label{display:block;font-size:.82rem;font-weight:600;margin-bottom:.4rem;color:var(--dim)}
.field input,.field textarea{width:100%;padding:.85rem 1rem;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--text);font:.95rem var(--body);transition:border-color .2s}
.field textarea{min-height:130px;resize:vertical}
.field input:focus,.field textarea:focus{outline:none;border-color:var(--a)}
.field [aria-invalid="true"]{border-color:#ff6b6b}
.field small{display:block;margin-top:.35rem;color:#ff8b8b;font-size:.8rem}
.status{text-align:center;margin-top:1rem;font-size:.9rem;color:var(--b);min-height:1.4em}

/* footer */
footer{padding:3rem 0 2rem;text-align:center;border-top:1px solid var(--line)}
footer .wrap>p{margin:.6rem 0}
.flinks{display:flex;justify-content:center;gap:1.8rem;flex-wrap:wrap;margin:1.4rem 0}
.flinks a{color:var(--dim);font-size:.9rem}
.flinks a:hover{color:var(--a)}
footer small{color:var(--dim)}
.totop{position:fixed;right:1.6rem;bottom:1.6rem;width:46px;height:46px;border-radius:12px;background:var(--a);color:#000;display:grid;place-items:center;opacity:0;visibility:hidden;transition:all .25s;z-index:40}
.totop.on{opacity:1;visibility:visible}

/* responsive */
@media(max-width:960px){
  .hero-grid,.about-grid,.contact-grid,.skills-grid{grid-template-columns:1fr}
  .idcard{max-width:420px}
  .tiles{grid-template-columns:1fr 1fr}
}
@media(max-width:768px){
  .dots{display:none}
  .burger{display:block}
  .links{position:fixed;top:64px;left:0;right:0;flex-direction:column;padding:1rem 1.5rem;background:var(--bg);border-bottom:1px solid var(--line);display:none}
  .links.open{display:flex}
  .ticks,.row2{grid-template-columns:1fr}
  section{padding:4.5rem 0}
}
@media(max-width:480px){.tiles{grid-template-columns:1fr}.stats{gap:1.4rem}}
.tilt.in{transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))}
.tilt.in:hover{transition:transform .12s ease-out,border-color .2s;transition-delay:0s!important}
.proj.tilt.in:hover{transform:perspective(900px) translateY(-4px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))}
.thumb{padding:0;overflow:hidden}
.thumb svg,.thumb img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.16,.8,.34,1)}
.proj:hover .thumb svg,.proj:hover .thumb img{transform:scale(1.06)}
.sh-p{fill:#121214;stroke:#2a2a30;stroke-width:1.5}
.sh-l{fill:#1f1f24}.sh-t{fill:#3a3a42}.sh-a{fill:#f2f2f2}.sh-b{fill:#b8b8c2}
.sh-sb{fill:none;stroke:#b8b8c2;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.sh-ring{fill:none;stroke:#1f1f24;stroke-width:8}
.sh-arc{fill:none;stroke:#f2f2f2;stroke-width:8;stroke-linecap:round;stroke-dasharray:112 164}
/* dashboard demo */
.dash{display:grid;gap:1.2rem}
.dash-top{display:flex;flex-wrap:wrap;gap:1rem 2rem}
.fgroup{display:flex;align-items:center;gap:.7rem;flex-wrap:wrap}
.fgroup>span{font-size:.78rem;font-weight:700;color:var(--dim);text-transform:uppercase;letter-spacing:.06em}
.fchips{display:flex;flex-wrap:wrap;gap:.4rem}
.fchips button{padding:.4rem 1rem;border-radius:999px;border:1px solid var(--line);background:transparent;color:var(--dim);font:600 .82rem var(--body);cursor:pointer;transition:all .2s}
.fchips button:hover{color:var(--text);border-color:var(--dim)}
.fchips button.on{background:var(--a);border-color:var(--a);color:#000}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:1rem}
.kpi{padding:1.1rem 1.3rem}
.kpi small{color:var(--dim);font-weight:600;font-size:.8rem}
.kpi b{display:block;font:700 1.9rem var(--display);letter-spacing:-.02em;margin-top:.2rem}
.dash-main{display:grid;grid-template-columns:1.6fr 1fr;gap:1.2rem}
.chart-card{padding:1.3rem}
.chart-card h4{font-size:1rem;margin-bottom:.8rem}
.chart-card h4 span{color:var(--dim);font:500 .8rem var(--body)}
.chart-card h4.gap{margin-top:1.4rem}
.lc{width:100%;height:auto;display:block;touch-action:pan-y;cursor:crosshair}
.lc-g{stroke:var(--line);stroke-width:1}
.lc-t{fill:var(--dim);font:500 11px var(--body)}
.lc-l{fill:none;stroke:#fff;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
.lc-h{stroke:var(--dim);stroke-width:1;stroke-dasharray:3 3}
.lc-d{fill:#000;stroke:#fff;stroke-width:2.5}
.lc-pill{fill:#fff}
.lc-pt{fill:#000;font:700 11px var(--body)}
.insight{margin-top:.8rem;font-size:.9rem}
.insight b{color:var(--text)}
.hb{display:grid;gap:.15rem}
.hb-row{display:grid;grid-template-columns:92px 1fr 64px;gap:.7rem;align-items:center;width:100%;background:none;border:0;color:var(--text);padding:.45rem .3rem;border-radius:8px;cursor:pointer;font:600 .85rem var(--body);text-align:left;transition:opacity .2s,background .2s}
.hb-row:hover{background:var(--panel2)}
.hb-t{height:10px;background:var(--panel2);border-radius:6px;overflow:hidden}
.hb-t i{display:block;height:100%;background:var(--b);border-radius:6px}
.hb-row.on .hb-t i{background:#fff}
.hb-row.dim{opacity:.45}
.hb-v{text-align:right;color:var(--dim);font-weight:500}
.dash-note{font-size:.78rem;color:var(--dim)}
@media(max-width:900px){.dash-main{grid-template-columns:1fr}}

/* case study popup */
.proj{cursor:pointer}
.proj-more{display:inline-flex;align-items:center;gap:.4rem;margin-top:1rem;font-size:.82rem;font-weight:700;color:var(--text)}
.proj-more .ic{width:1em;height:1em;transition:transform .25s}
.proj:hover .proj-more .ic{transform:translateX(4px)}
.cs-back{position:fixed;inset:0;z-index:120;background:rgba(0,0,0,.75);display:grid;place-items:center;padding:1.2rem;animation:csFade .25s both}
.cs{width:min(920px,100%);max-height:90vh;overflow:auto;display:grid;grid-template-columns:1fr 1.1fr;border-radius:20px;animation:csPop .35s cubic-bezier(.16,.8,.34,1) both}
.cs .thumb{height:100%;min-height:280px;border-radius:0;margin:0}
.cs-body{padding:2rem 2rem 2.2rem}
.cs-body h3{font-size:1.8rem;margin:.3rem 0 .6rem}
.cs-body h4{font:700 .75rem var(--body);text-transform:uppercase;letter-spacing:.07em;color:var(--dim);margin:1.2rem 0 .4rem}
.cs-btns{margin-top:1.4rem}
.cs-close{position:absolute;top:.9rem;right:.9rem;z-index:2;width:38px;height:38px;border-radius:10px;border:1px solid var(--line);background:rgba(0,0,0,.6);color:var(--text);display:grid;place-items:center;cursor:pointer}
.cs-close .ic{width:18px;height:18px}
@keyframes csFade{from{opacity:0}}
@keyframes csPop{from{opacity:0;transform:translateY(24px) scale(.96)}}
@media(max-width:760px){.cs{grid-template-columns:1fr}.cs .thumb{height:180px;min-height:0}}

/* analytics demos */
.lead-hook{display:block;font:700 clamp(1.4rem,3.2vw,2rem) var(--display);color:var(--text);letter-spacing:-.02em;margin-bottom:.7rem}
.sq{display:grid;grid-template-columns:.8fr 1.4fr;gap:1.2rem}
.sq-side{display:grid;gap:.8rem;align-content:start}
.sq-list{display:grid;gap:.4rem}
.sq-list button{text-align:left;padding:.6rem .9rem;border-radius:10px;border:1px solid var(--line);background:transparent;color:var(--dim);font:600 .85rem var(--body);cursor:pointer;transition:all .2s}
.sq-list button:hover{color:var(--text)}
.sq-list button.on{border-color:var(--a);color:var(--text);background:var(--panel2)}
.sq-schema,.sq-meta,.sq-empty{font-size:.78rem;color:var(--dim)}
.sq-code{padding:1rem;border:1px solid var(--line);border-radius:12px;background:#050505;font:500 .82rem/1.7 ui-monospace,Menlo,monospace;color:var(--dim);white-space:pre-wrap;overflow:auto}
.sq-code b{color:#fff;font-weight:800}
.sq-bar{display:flex;align-items:center;gap:1rem;margin:.8rem 0}
.tbl-wrap{border:1px solid var(--line);border-radius:12px;overflow:auto;min-height:120px}
.sq-empty{padding:1.4rem;display:block}
.tbl{width:100%;border-collapse:collapse;font-size:.85rem}
.tbl th{text-align:left;padding:.55rem .8rem;color:var(--dim);font:700 .72rem var(--body);text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid var(--line);white-space:nowrap}
.tbl td{padding:.5rem .8rem;border-bottom:1px solid var(--line);white-space:pre}
.tbl tr:last-child td{border-bottom:0}
.tbl tr.rin{animation:rowIn .4s both}
@keyframes rowIn{from{opacity:0;transform:translateX(-10px)}}
.cl{display:grid;gap:1rem}
.cl-top{display:flex;flex-wrap:wrap;gap:.6rem 1rem;align-items:center}
.cl-stats{display:flex;align-items:center;gap:1.4rem;flex-wrap:wrap;font-size:.85rem;color:var(--dim)}
.cl-stats b{color:var(--text);font-family:var(--display);font-size:1.1rem}
.qbar{flex:1;min-width:120px;height:8px;background:var(--panel2);border-radius:6px;overflow:hidden}
.qbar i{display:block;height:100%;background:#fff;transition:width .5s}
.tbl td.bad{background:rgba(255,255,255,.14);color:#fff}
.tbl td.fill{font-style:italic}
.tbl tr.dup td{opacity:.45;text-decoration:line-through}
.ch{display:grid;grid-template-columns:1fr 1.1fr;gap:1.6rem}
.ch-ctrl,.ch-out{display:grid;gap:1rem;align-content:start}
.rng{display:grid;gap:.35rem}
.rng label{display:flex;justify-content:space-between;font-size:.82rem;font-weight:600}
.rng label span:last-child{color:var(--dim)}
.rng input{width:100%;accent-color:#fff}
.ch-gauge{display:flex;align-items:center;gap:1.2rem}
.gauge{position:relative;width:120px;height:120px;flex-shrink:0}
.gauge svg{width:100%;height:100%}
.gauge b{position:absolute;inset:0;display:grid;place-items:center;font:800 1.6rem var(--display)}
.tier{font:800 1.3rem var(--display);color:var(--text)}
.tier-note{font-size:.85rem}
.ch-out h4{font-size:.95rem}
.drv{display:grid;grid-template-columns:150px 1fr;gap:.6rem;align-items:center;font-size:.8rem;color:var(--dim)}
.drv-t{position:relative;height:10px;background:var(--panel2);border-radius:6px}
.drv-t::after{content:"";position:absolute;left:50%;top:-3px;bottom:-3px;width:1px;background:var(--dim)}
.drv-t i{position:absolute;top:0;bottom:0;border-radius:6px;transition:left .4s,width .4s}
.fc{display:grid;gap:1.2rem}
.lc-f{fill:none;stroke:#fff;stroke-width:2.5;stroke-dasharray:6 6;stroke-linecap:round}
.lc-band{fill:rgba(255,255,255,.12)}
.lc-div{stroke:var(--dim);stroke-dasharray:3 4}
@media(max-width:760px){.sq,.ch{grid-template-columns:1fr}.ch-gauge{flex-wrap:wrap}}

/* project demos */
.proj-actions{display:flex;align-items:center;justify-content:space-between;gap:.6rem;margin-top:1rem}
.proj-actions .proj-more{margin-top:0}
.proj-demo{display:inline-flex;align-items:center;gap:.4rem;padding:.4rem .9rem;border-radius:999px;border:1px solid var(--a);background:var(--a);color:#000;font:700 .8rem var(--body);cursor:pointer;transition:transform .2s,background .2s}
.proj-demo:hover{transform:translateY(-2px);background:#d9d9de}
.proj-demo .ic{width:.9em;height:.9em}
.demo-win{width:min(1100px,100%);max-height:92vh;display:flex;flex-direction:column;overflow:hidden;border-radius:18px;animation:csPop .35s cubic-bezier(.16,.8,.34,1) both}
.demo-bar{display:flex;align-items:center;gap:.4rem;padding:.65rem 1rem;background:var(--panel2);border-bottom:1px solid var(--line)}
.demo-bar span{width:10px;height:10px;border-radius:50%;background:var(--line)}
.demo-bar em{flex:1;text-align:center;font-style:normal;font-size:.82rem;color:var(--dim);font-weight:600}
.demo-x{width:32px;height:32px;border-radius:8px;border:1px solid var(--line);background:transparent;color:var(--text);display:grid;place-items:center;cursor:pointer}
.demo-x .ic{width:16px;height:16px}
.demo-body{overflow:auto;padding:1.4rem}
.mini{padding:.4rem .9rem;border-radius:999px;border:1px solid var(--a);background:var(--a);color:#000;font:700 .78rem var(--body);cursor:pointer;display:inline-flex;align-items:center;gap:.35rem}
.mini.ghost{background:transparent;color:var(--text);border-color:var(--line)}
.mini.ghost:hover{border-color:var(--dim)}
.mini .ic{width:1em;height:1em}
.mini:disabled,.kb-ar:disabled{opacity:.35;cursor:default}
.gap{margin-top:1.2rem}
/* shared by the demos: gauge ring + code box */
.hr-t{fill:none;stroke:var(--line);stroke-width:9}
.hr-p{fill:none;stroke:#fff;stroke-width:9;stroke-linecap:round;transition:stroke-dashoffset .7s cubic-bezier(.16,.8,.34,1)}
.ds-code{padding:.9rem;border:1px solid var(--line);border-radius:12px;background:var(--panel2);color:var(--b);font:500 .8rem/1.6 ui-monospace,Menlo,monospace;white-space:pre-wrap}

@media(max-width:900px){
  section{padding:4rem 0}
  .hero{min-height:auto;padding:6rem 0 3rem}
  .hs{height:auto!important}
  .hs-sticky{position:static;height:auto;padding:4.5rem 0 2.5rem}
  .hs-track{width:auto;max-width:100%;transform:none!important;overflow-x:auto;scroll-snap-type:x mandatory;padding:.6rem 1.5rem 1rem;scrollbar-width:none}
  .hs-track::-webkit-scrollbar{display:none}
  .hs-track .proj{flex:0 0 80%;scroll-snap-align:start}
  .hs-prog{display:none}
}
@media(prefers-reduced-motion:reduce){.tilt.in,.proj.tilt.in:hover{transform:none!important}.aurora{filter:none!important}.aurora i{animation:none!important}.r-data{transform:none!important}.r-lab{opacity:1!important}.hs{height:auto!important}.hs-sticky{position:static;height:auto;padding:6rem 0}.hs-track{width:auto;flex-wrap:wrap;transform:none!important}.hs-prog{display:none}.intro>*{opacity:1!important}.stext span{color:var(--text)!important}.thumb span,.tile b,.sk-card h3 i{animation:none!important}.shape{animation:none!important;translate:none!important}.mtrack{translate:none!important}.shead h2 .w{opacity:1!important;transform:none!important}.rv{opacity:1!important;transform:none!important}.glow,.idcard,.ibig{transform:none!important}.pf *{animation:none!important;transition:none!important}html{scroll-behavior:auto}}
`;
