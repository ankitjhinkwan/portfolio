"""
⚡ NETFLIX CONTENT ANALYZER — CYBERPUNK EDITION ⚡
Author: Ankit Jinkwan
Portfolio: https://ankitjhinkwan.github.io/portfolio/
"""

import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
import os, warnings
warnings.filterwarnings('ignore')

st.set_page_config(page_title="⚡ Netflix Cyberpunk Analyzer", page_icon="⚡", layout="wide")

st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');
.stApp { background-color: #050510 !important; background-image: linear-gradient(rgba(0,255,249,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,249,0.03) 1px, transparent 1px); background-size: 40px 40px; }
h1,h2,h3 { font-family: 'Orbitron', monospace !important; color: #00fff9 !important; text-shadow: 0 0 10px #00fff9 !important; }
.cyber-header { font-family: 'Orbitron', monospace; font-size: 2.3rem; font-weight: 900; text-align: center; background: linear-gradient(90deg, #00fff9, #ff00c8, #ffe600, #00fff9); background-size: 300% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shine 3s linear infinite; letter-spacing: 4px; padding: 10px 0; }
@keyframes shine { to { background-position: 300% center; } }
.cyber-sub { font-family: 'Share Tech Mono', monospace; color: #00fff9; text-align: center; font-size: 0.75rem; letter-spacing: 5px; opacity: 0.7; margin-bottom: 20px; }
.kpi-card { background: #0a0a1a; border: 1px solid #00fff9; border-radius: 4px; padding: 18px; text-align: center; box-shadow: 0 0 15px rgba(0,255,249,0.2); margin-bottom: 10px; }
.kpi-value { font-family: 'Orbitron', monospace; font-size: 1.7rem; font-weight: 900; color: #00fff9; text-shadow: 0 0 10px #00fff9; }
.kpi-label { font-family: 'Share Tech Mono', monospace; font-size: 0.6rem; color: #ff00c8; letter-spacing: 3px; margin-top: 5px; }
.kpi-icon { font-size: 1.3rem; margin-bottom: 4px; }
.pink-card { border-color: #ff00c8 !important; box-shadow: 0 0 15px rgba(255,0,200,0.2) !important; }
.pink-card .kpi-value { color: #ff00c8 !important; text-shadow: 0 0 10px #ff00c8 !important; }
.yellow-card { border-color: #ffe600 !important; box-shadow: 0 0 15px rgba(255,230,0,0.2) !important; }
.yellow-card .kpi-value { color: #ffe600 !important; text-shadow: 0 0 10px #ffe600 !important; }
.green-card { border-color: #00ff41 !important; box-shadow: 0 0 15px rgba(0,255,65,0.2) !important; }
.green-card .kpi-value { color: #00ff41 !important; text-shadow: 0 0 10px #00ff41 !important; }
.section-divider { border: none; height: 1px; background: linear-gradient(90deg, transparent, #00fff9, #ff00c8, transparent); margin: 25px 0; box-shadow: 0 0 8px #00fff9; }
.section-label { font-family: 'Share Tech Mono', monospace; font-size: 0.6rem; color: #ff00c8; letter-spacing: 5px; opacity: 0.8; }
.terminal-box { background: #000; border: 1px solid #00ff41; border-radius: 4px; padding: 12px 16px; font-family: 'Share Tech Mono', monospace; color: #00ff41; font-size: 0.75rem; box-shadow: 0 0 12px rgba(0,255,65,0.2); line-height: 1.8; }
div[data-testid="stSidebarContent"] { background: #080818 !important; border-right: 1px solid rgba(0,255,249,0.2); }
</style>
""", unsafe_allow_html=True)

CYBER = dict(layout=go.Layout(
    paper_bgcolor='#0a0a1a', plot_bgcolor='#050510',
    font=dict(color='#00fff9', family='Share Tech Mono'),
    title_font=dict(color='#00fff9', size=13, family='Orbitron'),
    xaxis=dict(gridcolor='rgba(0,255,249,0.1)', linecolor='rgba(0,255,249,0.3)', tickfont=dict(color='rgba(0,255,249,0.7)')),
    yaxis=dict(gridcolor='rgba(0,255,249,0.1)', linecolor='rgba(0,255,249,0.3)', tickfont=dict(color='rgba(0,255,249,0.7)')),
    legend=dict(bgcolor='rgba(0,0,0,0.5)', bordercolor='rgba(0,255,249,0.3)', font=dict(color='#00fff9')),
    colorway=['#00fff9','#ff00c8','#ffe600','#00ff41','#a855f7','#ff6b35'],
))
NEON = [[0,'#050510'],[0.3,'#0d0d3d'],[0.6,'#00fff9'],[1,'#ff00c8']]

@st.cache_data
def load_data():
    base = os.path.dirname(__file__)
    return pd.read_csv(os.path.join(base, '..', 'data', 'netflix_data.csv'))

df = load_data()

# Header
st.markdown('<div class="cyber-header">⚡ NETFLIX CONTENT ANALYZER ⚡</div>', unsafe_allow_html=True)
st.markdown('<div class="cyber-sub">[ CYBERPUNK DATA INTELLIGENCE SYSTEM v2.0 ] — BY ANKIT JINKWAN</div>', unsafe_allow_html=True)
st.markdown('<hr class="section-divider">', unsafe_allow_html=True)

# Sidebar
st.sidebar.markdown('<p style="font-family:Orbitron;color:#00fff9;font-size:0.8rem;letter-spacing:3px">⚙ SYSTEM FILTERS</p>', unsafe_allow_html=True)
content_type = st.sidebar.multiselect("CONTENT TYPE", ["Movie","TV Show"], default=["Movie","TV Show"])
genres       = st.sidebar.multiselect("GENRE", sorted(df['Genre'].unique()), default=sorted(df['Genre'].unique()))
years        = st.sidebar.slider("RELEASE YEAR", int(df['ReleaseYear'].min()), int(df['ReleaseYear'].max()), (2015, 2023))
min_imdb     = st.sidebar.slider("MIN IMDB SCORE", 1.0, 10.0, 5.0, 0.1)
countries    = st.sidebar.multiselect("COUNTRY", sorted(df['Country'].unique()), default=sorted(df['Country'].unique()))

# All filters wrapped in () — no more operator errors
fdf = df[
    (df['Type'].isin(content_type)) &
    (df['Genre'].isin(genres)) &
    (df['ReleaseYear'].between(years[0], years[1])) &
    (df['IMDBScore'] >= min_imdb) &
    (df['Country'].isin(countries))
]

if len(fdf) == 0:
    st.warning("⚠️ No data matches your filters. Try adjusting the filters.")
    st.stop()

st.sidebar.markdown('<hr class="section-divider">', unsafe_allow_html=True)
st.sidebar.markdown(f'<div class="terminal-box">&gt; TITLES: {len(fdf)}<br>&gt; COUNTRIES: {fdf["Country"].nunique()}<br>&gt; AVG SCORE: {fdf["IMDBScore"].mean():.2f}<br>&gt; STATUS: ONLINE ■</div>', unsafe_allow_html=True)

# KPI Cards
k1,k2,k3,k4,k5 = st.columns(5)
for col, icon, val, label, cls in [
    (k1,"🎬",f"{len(fdf):,}","TOTAL TITLES",""),
    (k2,"🎥",f"{(fdf['Type']=='Movie').sum():,}","MOVIES","pink-card"),
    (k3,"📺",f"{(fdf['Type']=='TV Show').sum():,}","TV SHOWS","yellow-card"),
    (k4,"⭐",f"{fdf['IMDBScore'].mean():.1f}","AVG IMDB","green-card"),
    (k5,"🌍",f"{fdf['Country'].nunique()}","COUNTRIES","pink-card"),
]:
    col.markdown(f'<div class="kpi-card {cls}"><div class="kpi-icon">{icon}</div><div class="kpi-value">{val}</div><div class="kpi-label">{label}</div></div>', unsafe_allow_html=True)

st.markdown('<hr class="section-divider">', unsafe_allow_html=True)
st.markdown('<p class="section-label">// CONTENT INTELLIGENCE //</p>', unsafe_allow_html=True)

# Row 1
r1c1, r1c2, r1c3 = st.columns(3)
with r1c1:
    st.markdown("### 🎭 Content Split")
    ct = fdf['Type'].value_counts()
    fig = go.Figure(go.Pie(values=ct.values, labels=ct.index, hole=0.6,
                           marker=dict(colors=['#00fff9','#ff00c8'], line=dict(color='#050510', width=3)),
                           textfont=dict(color='white')))
    fig.add_annotation(text=f"<b>{len(fdf)}</b><br>TITLES", x=0.5, y=0.5, showarrow=False,
                       font=dict(size=14, color='#00fff9', family='Orbitron'))
    fig.update_layout(template=CYBER, height=300, margin=dict(l=5,r=5,t=30,b=30),
                      legend=dict(orientation='h', y=-0.15))
    st.plotly_chart(fig, use_container_width=True)

with r1c2:
    st.markdown("### 📡 Genre Radar")
    tg = fdf['Genre'].value_counts().nlargest(8)
    fig = go.Figure(go.Scatterpolar(r=tg.values, theta=tg.index, fill='toself',
                                    fillcolor='rgba(0,255,249,0.15)', line=dict(color='#00fff9', width=2),
                                    marker=dict(color='#ff00c8', size=7, symbol='diamond')))
    fig.update_layout(template=CYBER, height=300,
                      polar=dict(bgcolor='#050510',
                                 radialaxis=dict(gridcolor='rgba(0,255,249,0.2)', tickfont=dict(color='rgba(0,255,249,0.5)', size=7)),
                                 angularaxis=dict(gridcolor='rgba(0,255,249,0.2)', tickfont=dict(color='#00fff9', size=8))),
                      margin=dict(l=30,r=30,t=30,b=30))
    st.plotly_chart(fig, use_container_width=True)

with r1c3:
    st.markdown("### 🌍 Top Countries")
    tc = fdf['Country'].value_counts().nlargest(8).reset_index()
    tc.columns = ['Country','Count']
    fig = px.bar(tc, x='Count', y='Country', orientation='h', color='Count',
                 color_continuous_scale=NEON, text='Count')
    fig.update_traces(textposition='outside', textfont=dict(color='#00fff9', size=9), marker_line_width=0)
    fig.update_layout(template=CYBER, height=300, showlegend=False, coloraxis_showscale=False,
                      margin=dict(l=5,r=50,t=30,b=10), yaxis=dict(categoryorder='total ascending'))
    st.plotly_chart(fig, use_container_width=True)

st.markdown('<hr class="section-divider">', unsafe_allow_html=True)
st.markdown('<p class="section-label">// TEMPORAL ANALYSIS //</p>', unsafe_allow_html=True)

# Row 2
r2c1, r2c2 = st.columns(2)
with r2c1:
    st.markdown("### ⭐ IMDB Score by Type")
    fig = go.Figure()
    fill_map = {"Movie": "rgba(0,255,249,0.2)", "TV Show": "rgba(255,0,200,0.2)"}
    line_map = {"Movie": "#00fff9", "TV Show": "#ff00c8"}
    for t in ["Movie","TV Show"]:
        data = fdf[fdf['Type']==t]['IMDBScore']
        if len(data) > 0:
            fig.add_trace(go.Violin(x=data, name=t,
                                    side='positive' if t=='Movie' else 'negative',
                                    line_color=line_map[t], fillcolor=fill_map[t],
                                    meanline_visible=True, meanline=dict(color='white', width=2),
                                    points='outliers', marker=dict(color=line_map[t], size=3)))
    fig.update_layout(template=CYBER, height=320, violinmode='overlay',
                      margin=dict(l=10,r=10,t=30,b=10), xaxis_title='IMDB Score')
    st.plotly_chart(fig, use_container_width=True)

with r2c2:
    st.markdown("### 📅 Content Per Year")
    yearly = fdf.groupby(['ReleaseYear','Type']).size().reset_index(name='Count')
    fig = px.area(yearly, x='ReleaseYear', y='Count', color='Type',
                  color_discrete_map={'Movie':'#00fff9','TV Show':'#ff00c8'}, line_shape='spline')
    fig.update_traces(opacity=0.7)
    fig.update_layout(template=CYBER, height=320, margin=dict(l=10,r=10,t=30,b=10),
                      xaxis_title='Year', yaxis_title='Count', legend=dict(orientation='h', y=1.1))
    st.plotly_chart(fig, use_container_width=True)

st.markdown('<hr class="section-divider">', unsafe_allow_html=True)
st.markdown('<p class="section-label">// PATTERN RECOGNITION //</p>', unsafe_allow_html=True)

# Row 3
r3c1, r3c2 = st.columns(2)
with r3c1:
    st.markdown("### 🔥 Genre × Year Heatmap")
    pivot = fdf[fdf['ReleaseYear'] >= 2015].pivot_table(
        values='IMDBScore', index='Genre', columns='ReleaseYear', aggfunc='mean').round(1)
    fig = go.Figure(go.Heatmap(z=pivot.values, x=pivot.columns, y=pivot.index,
                               colorscale=[[0,'#050510'],[0.4,'#0d0d3d'],[0.7,'#00fff9'],[1,'#ff00c8']],
                               text=pivot.values.round(1), texttemplate='%{text}',
                               textfont=dict(size=8, color='white')))
    fig.update_layout(template=CYBER, height=360, margin=dict(l=5,r=5,t=30,b=10),
                      xaxis=dict(tickangle=45, tickfont=dict(size=8)),
                      yaxis=dict(tickfont=dict(size=8)))
    st.plotly_chart(fig, use_container_width=True)

with r3c2:
    st.markdown("### 🫧 Genre Bubble Universe")
    gs = fdf.groupby('Genre').agg(Count=('ShowID','count'), AvgIMDB=('IMDBScore','mean'),
                                   AvgPop=('Popularity','mean')).reset_index().round(2)
    fig = px.scatter(gs, x='AvgIMDB', y='AvgPop', size='Count', color='AvgIMDB',
                     text='Genre', color_continuous_scale=NEON, size_max=55)
    fig.update_traces(textfont=dict(color='white', size=8), textposition='top center',
                      marker=dict(line=dict(width=1, color='rgba(0,255,249,0.5)'), opacity=0.85))
    fig.update_layout(template=CYBER, height=360, margin=dict(l=10,r=10,t=30,b=10),
                      coloraxis_showscale=False, xaxis_title='Avg IMDB', yaxis_title='Avg Popularity')
    st.plotly_chart(fig, use_container_width=True)

st.markdown('<hr class="section-divider">', unsafe_allow_html=True)
st.markdown('<p class="section-label">// DEEP SCAN //</p>', unsafe_allow_html=True)

# Row 4
r4c1, r4c2, r4c3 = st.columns(3)
with r4c1:
    st.markdown("### 🔞 Content Ratings")
    r = fdf['Rating'].value_counts().reset_index()
    r.columns = ['Rating','Count']
    fig = px.bar(r, x='Rating', y='Count', color='Count', color_continuous_scale=NEON, text='Count')
    fig.update_traces(textposition='outside', marker_line_width=0, textfont=dict(color='#00fff9', size=9))
    fig.update_layout(template=CYBER, height=290, showlegend=False, coloraxis_showscale=False,
                      margin=dict(l=5,r=5,t=30,b=5))
    st.plotly_chart(fig, use_container_width=True)

with r4c2:
    st.markdown("### 🎬 Director Board")
    ds = fdf.groupby('Director').agg(Titles=('ShowID','count'), AvgIMDB=('IMDBScore','mean')).sort_values('AvgIMDB').tail(8).reset_index()
    fig = px.bar(ds, x='AvgIMDB', y='Director', orientation='h', color='AvgIMDB',
                 color_continuous_scale=NEON, text='Titles')
    fig.update_traces(texttemplate='%{text}', textposition='outside',
                      textfont=dict(color='#ff00c8', size=9), marker_line_width=0)
    fig.update_layout(template=CYBER, height=290, showlegend=False, coloraxis_showscale=False,
                      margin=dict(l=5,r=50,t=30,b=5))
    st.plotly_chart(fig, use_container_width=True)

with r4c3:
    st.markdown("### 📊 IMDB Histogram")
    fig = go.Figure(go.Histogram(x=fdf['IMDBScore'], nbinsx=20,
                                  marker=dict(color='#00fff9', line=dict(color='#050510', width=1)), opacity=0.85))
    fig.add_vline(x=fdf['IMDBScore'].mean(), line_dash='dash', line_color='#ff00c8', line_width=2,
                  annotation_text=f"AVG: {fdf['IMDBScore'].mean():.1f}", annotation_font_color='#ff00c8')
    fig.update_layout(template=CYBER, height=290, margin=dict(l=5,r=5,t=30,b=5),
                      xaxis_title='IMDB Score', yaxis_title='Count')
    st.plotly_chart(fig, use_container_width=True)

st.markdown('<hr class="section-divider">', unsafe_allow_html=True)

# Data Table
st.markdown('<p class="section-label">// RAW DATA FEED //</p>', unsafe_allow_html=True)
st.markdown("### 🖥️ Live Data Terminal")
cs, cn = st.columns([3,1])
with cs: search = st.text_input("SEARCH", placeholder="SEARCH...", label_visibility='collapsed')
with cn: n_rows = st.selectbox("ROWS", [10,25,50], label_visibility='collapsed')
display = fdf.copy()
if search:
    mask = display.apply(lambda r: r.astype(str).str.contains(search, case=False).any(), axis=1)
    display = display[mask]
st.dataframe(display[['Title','Type','Genre','Country','ReleaseYear','Rating','IMDBScore','Popularity']].head(n_rows),
             use_container_width=True, hide_index=True)

st.markdown('<hr class="section-divider">', unsafe_allow_html=True)
st.markdown("<div style='text-align:center;font-family:Share Tech Mono;color:rgba(0,255,249,0.5);font-size:0.75rem;letter-spacing:3px'>[ SYSTEM: ONLINE ] ■ BUILT BY <a href='https://ankitjhinkwan.github.io/portfolio/' style='color:#ff00c8;text-decoration:none'>ANKIT JINKWAN</a> ■ [ END OF LINE ]</div>", unsafe_allow_html=True)
