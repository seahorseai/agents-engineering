from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import DateRange, Metric, Dimension, RunReportRequest
from google.oauth2 import service_account
from dotenv import load_dotenv
import pandas as pd
import os
import plotly.express as px
from dash import Dash, dcc, html


load_dotenv()  # reads .env file

KEY_NAME_FILE = os.getenv("KEY_NAME_FILE")
print(KEY_NAME_FILE)

# Path to your service account JSON key
KEY_PATH = os.path.join(os.getcwd(), KEY_NAME_FILE)

# GA4 Property ID
PROPERTY_ID = os.getenv("PROPERTY_ID")
print(PROPERTY_ID)


# Authenticate
credentials = service_account.Credentials.from_service_account_file(KEY_PATH)
client = BetaAnalyticsDataClient(credentials=credentials)


#Get pageviews and users by page path for the last 7 days.
request = RunReportRequest(
    property=f"properties/{PROPERTY_ID}",
    dimensions=[Dimension(name="pagePath")],
    metrics=[Metric(name="screenPageViews"), Metric(name="activeUsers")],
    date_ranges=[DateRange(start_date="7daysAgo", end_date="today")],
)

response = client.run_report(request)

# Print results
for row in response.rows:
    print({dim.name: val.value for dim, val in zip(request.dimensions, row.dimension_values)},
          {met.name: val.value for met, val in zip(request.metrics, row.metric_values)})


#Convert Results to Pandas DataFrame
data = []
for row in response.rows:
    row_data = {dim.name: val.value for dim, val in zip(request.dimensions, row.dimension_values)}
    row_data.update({met.name: val.value for met, val in zip(request.metrics, row.metric_values)})
    data.append(row_data)

df = pd.DataFrame(data)
print(df.head())

# Sum metrics across all pages
metrics_total = {
    "Metric": ["Page Views", "Active Users"],
    "Value": [df["screenPageViews"].astype(float).sum(), df["activeUsers"].astype(float).sum()]
}

metrics_df = pd.DataFrame(metrics_total)

# Create Pie Chart
fig = px.pie(
    metrics_df,
    names="Metric",
    values="Value",
    title="GA4 Metrics (Last 7 Days)"
)

# Optional: Add percentage inside pie slices
fig.update_traces(textposition='inside', textinfo='percent+label')

# Display
fig.show()