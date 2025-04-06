import requests, json
from bs4 import BeautifulSoup
from datetime import datetime

url = "https://nitter.net/moneytaur_"  # lightweight frontend
resp = requests.get(url)
soup = BeautifulSoup(resp.text, "html.parser")
tweets = soup.select("div.timeline-item")

signals = []
for tweet in tweets:
    text = tweet.select_one(".tweet-content").text
    if "https://pbs.twimg.com/media/" in text:
        date = datetime.utcnow().strftime("%Y-%m-%d")
        chart = text.split("https://pbs.twimg.com/media/")[1].split(" ")[0]
        img = f"https://pbs.twimg.com/media/{chart}"
        logic = text.split("\n")[0]
        tags = [t for t in ["OB", "BB", "FVG"] if t in text]
        signals.append({{
            "date": date,
            "asset": "BTC",
            "terms": tags,
            "logic": logic,
            "chart": img
        }})
        break  # just the latest

Path("public").mkdir(exist_ok=True)
Path("public/data.json").write_text(json.dumps(signals, indent=2))
