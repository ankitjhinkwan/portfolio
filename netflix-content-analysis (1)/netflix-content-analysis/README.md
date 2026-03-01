# ⚡ Netflix Content Analysis — Cyberpunk Edition

> The most insane Netflix dashboard you've ever seen — built with Streamlit, Plotly & pure cyberpunk energy

**Built by:** Ankit Jinkwan  
**Portfolio:** [ankitjhinkwan.github.io/portfolio](https://ankitjhinkwan.github.io/portfolio/)  
**LinkedIn:** [linkedin.com/in/ankit-jinkwan-a16882288](https://www.linkedin.com/in/ankit-jinkwan-a16882288/)

---

## ⚡ What Makes This Different

Every other project uses boring light themes. This one has:
- 🔲 **Cyberpunk grid background** with scanline overlay
- ✨ **Neon glowing KPI cards** with animated scan lines
- 🌈 **Animated gradient title** that shifts colors
- 🎭 **Radar chart** for genre analysis
- 🫧 **Bubble universe** scatter for genre comparison
- 🔥 **IMDB Heatmap** across genres and years
- 🎻 **Violin plots** for score distributions
- 📡 **Live terminal** data feed display
- Custom **Orbitron + Share Tech Mono** fonts

---

## 📊 Dashboard Sections

| Section | Charts |
|---------|--------|
| **Content Intelligence** | Donut, Radar, Horizontal Bar |
| **Temporal Analysis** | Violin plot, Area chart |
| **Pattern Recognition** | Heatmap, Bubble scatter |
| **Deep Scan** | Bar, Director leaderboard, Histogram |
| **Live Data Terminal** | Searchable table |

---

## 📂 Project Structure

```
netflix-content-analysis/
│
├── 📓 notebooks/
│   └── netflix_analysis.ipynb       ← Full EDA notebook
│
├── 📊 data/
│   ├── generate_data.py             ← Dataset generator
│   └── netflix_data.csv             ← 2,500 titles dataset
│
├── 🌐 app/
│   └── app.py                       ← Cyberpunk Streamlit app
│
├── requirements.txt
└── README.md
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/ankitjhinkwan/netflix-content-analysis
cd netflix-content-analysis
pip install -r requirements.txt
cd data && python generate_data.py && cd ..
streamlit run app/app.py
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| **Python** | Core language |
| **Pandas / NumPy** | Data analysis |
| **Plotly** | Interactive neon charts |
| **Streamlit** | Cyberpunk web app |
| **Matplotlib / Seaborn** | Notebook charts |

---

## 🔑 Key Findings

- **Drama** dominates Netflix content volume globally
- **US** leads production but **South Korea** growing fastest
- **TV-MA** is most common rating — adult content dominates
- **Documentary** genre consistently scores highest on IMDB
- **2019–2022** saw the biggest content addition spike

---

*[ END OF LINE ] — Built by Ankit Jinkwan*
