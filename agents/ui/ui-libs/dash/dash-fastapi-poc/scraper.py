import csv
import time
import re
import requests
import spacy
from bs4 import BeautifulSoup
from duckduckgo_search import DDGS
from urllib.parse import urlparse, urljoin

# Load spaCy NLP model
nlp = spacy.load("en_core_web_sm")

HEADERS = {"User-Agent": "Mozilla/5.0"}
OUTPUT_CSV = "b2b_leads_per_person.csv"
industry = "IT consulting companies"
regions = [".co.uk", ".de", ".fr", ".nl", ".eu"]
SUBPAGES = ["/about", "/contact", "/team", "/company"]

# Build DuckDuckGo search queries
def generate_queries():
    return [f'"{industry}" site:{region} "contact us"' for region in regions]

# DuckDuckGo search
def search_duckduckgo(query, max_results=10):
    urls = []
    with DDGS() as ddgs:
        results = ddgs.text(query, max_results=max_results)
        for r in results:
            urls.append(r['href'])
    return urls

# Basic HTML fetcher
def scrape_page(url):
    try:
        res = requests.get(url, headers=HEADERS, timeout=10)
        if res.status_code == 200:
            return res.text
    except:
        pass
    return ""

# Extract name-title pairs using spaCy + regex
def extract_people(text):
    doc = nlp(text)
    people = []

    for ent in doc.ents:
        if ent.label_ == "PERSON":
            sentence = ent.sent.text
            match = re.search(
                r"\b(CTO|CEO|CIO|COO|Founder|Co-Founder|Managing Director|VP|Vice President|Head of [\w\s]+|Chief [\w\s]+)\b",
                sentence,
                re.IGNORECASE
            )
            if match:
                job_title = match.group(0).strip()
                people.append({
                    "name": ent.text.strip(),
                    "job_title": job_title.upper()
                })

    return people

# LinkedIn search for each person
def search_linkedin_for_person(name, job_title, domain):
    query = (
        f'site:linkedin.com/in "{name}" "{job_title}" "{domain}"'
    )
    with DDGS() as ddgs:
        results = ddgs.text(query, max_results=2)
        for result in results:
            url = result['href']
            if "linkedin.com/in" in url:
                return url
    return ""

# Scrape company site and enrich each person with LinkedIn
def extract_contact_info(base_url):
    try:
        base_text = scrape_page(base_url)
        all_text = base_text

        for sub in SUBPAGES:
            full_url = urljoin(base_url, sub)
            print(f"↪️ Scraping subpage: {full_url}")
            sub_text = scrape_page(full_url)
            all_text += "\n" + sub_text
            time.sleep(1)

        emails = set(re.findall(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", all_text))
        phones = set(re.findall(r"\+?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{3,4}", all_text))
        domain = urlparse(base_url).netloc.replace("www.", "")
        people = extract_people(all_text)

        if not people:
            return [{
                "URL": base_url,
                "Emails": ", ".join(emails),
                "Phones": ", ".join(phones),
                "LinkedIn": "",
                "Name": "",
                "Job Title": ""
            }]

        rows = []
        for person in people:
            linkedin_profile = search_linkedin_for_person(person["name"], person["job_title"], domain)
            rows.append({
                "URL": base_url,
                "Emails": ", ".join(emails),
                "Phones": ", ".join(phones),
                "LinkedIn": linkedin_profile,
                "Name": person["name"],
                "Job Title": person["job_title"]
            })
        return rows

    except Exception as e:
        return [{
            "URL": base_url,
            "Emails": "",
            "Phones": "",
            "LinkedIn": "",
            "Name": "",
            "Job Title": f"Error: {str(e)}"
        }]

# Save final results
def save_to_csv(data, filename=OUTPUT_CSV):
    fieldnames = ["URL", "Emails", "Phones", "LinkedIn", "Name", "Job Title"]
    with open(filename, "w", newline='', encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)
    print(f"\n📁 Saved {len(data)} rows to '{filename}'")

# === Main ===
if __name__ == "__main__":
    all_results = []

    for query in generate_queries():
        print(f"\n🔍 Searching: {query}")
        urls = search_duckduckgo(query, max_results=10)
        for url in urls:
            print(f"\n🌐 Scraping: {url}")
            data_rows = extract_contact_info(url)
            all_results.extend(data_rows)
            time.sleep(2)  # polite delay

    save_to_csv(all_results)
