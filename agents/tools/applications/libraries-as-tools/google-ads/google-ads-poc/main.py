from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

# Load credentials from google-ads.yaml
client = GoogleAdsClient.load_from_storage("google-ads.yaml")

# Replace with your Google Ads customer ID
customer_id = "INSERT_CUSTOMER_ID_HERE"

# Define a simple GAQL query
query = """
    SELECT
        campaign.id,
        campaign.name,
        metrics.impressions,
        metrics.clicks,
        metrics.cost_micros
    FROM campaign
    WHERE segments.date DURING LAST_7_DAYS
    ORDER BY metrics.clicks DESC
    LIMIT 10
"""

try:
    ga_service = client.get_service("GoogleAdsService")
    response = ga_service.search(customer_id=customer_id, query=query)

    for row in response:
        campaign = row.campaign
        metrics = row.metrics
        cost = metrics.cost_micros / 1_000_000  # Convert from micros to currency

        print(
            f"Campaign '{campaign.name}' (ID: {campaign.id}) - "
            f"Clicks: {metrics.clicks}, Impressions: {metrics.impressions}, Cost: {cost}"
        )

except GoogleAdsException as ex:
    print("Google Ads API request failed:")
    for error in ex.failure.errors:
        print(f"\t{error.message}")
