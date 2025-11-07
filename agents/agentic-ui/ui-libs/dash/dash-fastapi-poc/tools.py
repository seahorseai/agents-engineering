# tools.py
"""
Real Google Analytics 4 and Google Ads API fetch functions
"""

import os
from dotenv import load_dotenv
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import RunReportRequest, DateRange, Metric, Dimension
from google.ads.googleads.client import GoogleAdsClient

load_dotenv()  # This loads the .env file into environment variables

GA_PROPERTY_ID = os.getenv("GA_PROPERTY_ID")
GOOGLE_ADS_ID = os.getenv("GOOGLE_ADS_ID")
GOOGLE_APPLICATION_CREDENTIALS = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
LLM_MODEL = os.getenv("LLM_MODEL")

# -----------------------------
# Google Analytics 4
# -----------------------------
def fetch_ga_report(args: dict):
    """
    Fetch GA4 report (activeUsers and sessions)
    Requires:
        - GOOGLE_APPLICATION_CREDENTIALS env var pointing to a service account JSON
        - GA_PROPERTY_ID env var or pass via args
    """
    property_id = GA_PROPERTY_ID
    start_date = args.get("start_date", "2025-09-01")
    end_date = args.get("end_date", "today")

    if not property_id:
        return {"error": "Missing GA4 property ID"}

    client = BetaAnalyticsDataClient()

    request = RunReportRequest(
        property=f"properties/{property_id}",
        dimensions=[Dimension(name="date")],
        metrics=[Metric(name="activeUsers"), Metric(name="sessions")],
        date_ranges=[DateRange(start_date=start_date, end_date=end_date)],
    )

    response = client.run_report(request)

    data = []
    for row in response.rows:
        entry = {}
        for dim_header, dim_value in zip(response.dimension_headers, row.dimension_values):
            entry[dim_header.name] = dim_value.value
        for met_header, met_value in zip(response.metric_headers, row.metric_values):
            entry[met_header.name] = met_value.value
        data.append(entry)

    return data

# -----------------------------
# Google Ads
# -----------------------------
def fetch_google_ads():
    """
    Fetch Google Ads report via Google Ads API
    Requires:
        - google-ads.yaml credentials in ~/.google-ads.yaml or path via env
        - Customer ID passed in env GOOGLE_ADS_ID
    """
    customer_id = GOOGLE_ADS_ID
    if not customer_id:
        return {"error": "Missing Google Ads customer ID"}

    # Load Google Ads client
    client = GoogleAdsClient.load_from_storage()

    query = """
        SELECT
          campaign.name,
          segments.date,
          metrics.clicks,
          metrics.cost_micros
        FROM
          campaign
        WHERE
          segments.date DURING LAST_7_DAYS
        ORDER BY segments.date
    """

    ga_service = client.service.google_ads
    response = ga_service.search(customer_id=customer_id, query=query)

    results = []
    for row in response:
        results.append({
            "date": row.segments.date.value,
            "campaign": row.campaign.name.value,
            "clicks": row.metrics.clicks.value,
            "cost_micros": row.metrics.cost_micros.value,
        })

    return results