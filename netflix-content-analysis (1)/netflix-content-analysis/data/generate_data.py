"""
Generate a realistic Netflix-style content dataset.
"""
import numpy as np
import pandas as pd
from datetime import datetime

np.random.seed(42)
N = 2500

GENRES = ["Drama", "Comedy", "Action", "Thriller", "Documentary",
          "Romance", "Horror", "Sci-Fi", "Animation", "Crime",
          "Fantasy", "Mystery", "Biography", "History", "Sport"]

COUNTRIES = ["United States", "India", "United Kingdom", "South Korea",
             "Japan", "Spain", "France", "Germany", "Mexico", "Brazil",
             "Canada", "Australia", "Turkey", "Italy", "Nigeria"]

RATINGS = ["G", "PG", "PG-13", "R", "NC-17", "TV-Y", "TV-G", "TV-PG", "TV-14", "TV-MA"]

DIRECTORS = ["Christopher Nolan", "Ava DuVernay", "Bong Joon-ho", "Alfonso Cuaron",
             "Greta Gerwig", "Martin Scorsese", "Quentin Tarantino", "Jordan Peele",
             "Chloe Zhao", "Denis Villeneuve", "Ryan Coogler", "Patty Jenkins",
             "James Cameron", "Steven Spielberg", "Ridley Scott"]

records = []
for i in range(N):
    content_type = np.random.choice(["Movie", "TV Show"], p=[0.65, 0.35])
    genre        = np.random.choice(GENRES, p=[0.14,0.12,0.10,0.09,0.08,0.07,0.07,0.07,0.06,0.05,0.04,0.04,0.03,0.02,0.02])
    country      = np.random.choice(COUNTRIES, p=[0.28,0.12,0.10,0.08,0.07,0.06,0.05,0.04,0.04,0.03,0.03,0.03,0.02,0.02,0.03])
    year         = np.random.randint(2010, 2024)
    rating       = np.random.choice(RATINGS, p=[0.03,0.06,0.15,0.20,0.02,0.03,0.04,0.08,0.15,0.24])
    director     = np.random.choice(DIRECTORS)
    imdb         = round(np.random.normal(6.8, 1.2), 1)
    imdb         = max(1.0, min(10.0, imdb))
    votes        = int(np.random.exponential(50000) + 1000)

    if content_type == "Movie":
        duration = int(np.random.normal(105, 25))
        duration = max(60, min(240, duration))
        seasons  = None
        episodes = None
    else:
        duration = None
        seasons  = np.random.choice([1,2,3,4,5,6,7,8], p=[0.30,0.25,0.18,0.10,0.07,0.05,0.03,0.02])
        episodes = seasons * np.random.randint(6, 14)

    # Popularity score
    popularity = round(
        (imdb / 10) * 0.4 +
        (min(votes, 200000) / 200000) * 0.3 +
        (1 if year >= 2020 else 0.7) * 0.2 +
        np.random.uniform(0, 0.1), 3
    )

    records.append({
        "ShowID":       f"NF{10000+i}",
        "Title":        f"Title_{i+1}",
        "Type":         content_type,
        "Genre":        genre,
        "Country":      country,
        "ReleaseYear":  year,
        "Rating":       rating,
        "Director":     director,
        "IMDBScore":    imdb,
        "IMDBVotes":    votes,
        "DurationMin":  duration,
        "Seasons":      seasons,
        "Episodes":     episodes,
        "Popularity":   popularity,
        "AddedYear":    np.random.randint(max(year, 2015), 2025),
    })

df = pd.DataFrame(records)
df.to_csv("netflix_data.csv", index=False)
print(f"✅ Dataset saved: {len(df)} titles")
print(f"   Movies:   {df[df['Type']=='Movie'].shape[0]}")
print(f"   TV Shows: {df[df['Type']=='TV Show'].shape[0]}")
print(f"   Avg IMDB: {df['IMDBScore'].mean():.1f}")
print(f"   Countries: {df['Country'].nunique()}")
