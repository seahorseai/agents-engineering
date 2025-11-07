import os
from dotenv import load_dotenv
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import streamlit as st
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import DateRange, Dimension, Metric, RunReportRequest
from google.oauth2 import service_account

# --- Load environment variables ---
load_dotenv()

KEY_NAME_FILE = os.getenv("KEY_NAME_FILE")
PROPERTY_ID = os.getenv("PROPERTY_ID")

# Resolve service account file path
KEY_PATH = os.path.join(os.getcwd(), KEY_NAME_FILE)

# --- Debug info ---
st.sidebar.header("🔍 Debug Info")
st.sidebar.write("Property ID:", PROPERTY_ID)
st.sidebar.write("Key Path Exists:", os.path.exists(KEY_PATH))
st.sidebar.write("Key File:", KEY_NAME_FILE)

# --- Authenticate ---
if not os.path.exists(KEY_PATH):
    st.error(f"❌ Service account key file not found at: {KEY_PATH}")
    st.stop()

credentials = service_account.Credentials.from_service_account_file(KEY_PATH)

# --- Initialize GA4 client ---
client = BetaAnalyticsDataClient(credentials=credentials)

# --- Fetch GA4 data (Pageviews & Users by Page Path for last 7 days) ---
def fetch_ga4_page_data():
    try:
        request = RunReportRequest(
            property=f"properties/{PROPERTY_ID}",
            dimensions=[Dimension(name="pagePath")],
            metrics=[
                Metric(name="screenPageViews"),
                Metric(name="activeUsers")
            ],
            date_ranges=[DateRange(start_date="7daysAgo", end_date="today")]
        )
        response = client.run_report(request)

        data = []
        for row in response.rows:
            data.append([
                row.dimension_values[0].value,
                int(row.metric_values[0].value),
                int(row.metric_values[1].value)
            ])

        if not data:
            return pd.DataFrame(columns=["pagePath", "pageViews", "activeUsers"])
        else:
            df = pd.DataFrame(data, columns=["pagePath", "pageViews", "activeUsers"])
            return df

    except Exception as e:
        st.error(f"Error fetching GA4 data: {e}")
        return pd.DataFrame(columns=["pagePath", "pageViews", "activeUsers"])

# --- Streamlit Dashboard ---
st.set_page_config(page_title="GA4 Page Metrics Dashboard", layout="wide")
st.title("📊 GA4 Page Performance Dashboard")
st.write("Pageviews and Active Users by Page (Last 7 Days)")

# --- Fetch data with loading spinner ---
with st.spinner("Fetching GA4 data..."):
    df = fetch_ga4_page_data()

# --- Display data or warning ---
if df.empty:
    st.warning("⚠️ No GA4 data returned for this date range or property.")
else:
    st.subheader("Raw GA4 Data")
    st.dataframe(df.sort_values(by="pageViews", ascending=False))

    # --- Visualization: Top 10 Pages by Pageviews ---
    top_pages = df.sort_values(by="pageViews", ascending=False).head(10)
    st.subheader("Top 10 Pages by Pageviews")

    fig1, ax1 = plt.subplots(figsize=(10, 5))
    sns.barplot(data=top_pages, x="pageViews", y="pagePath", ax=ax1, orient="h")
    ax1.set_xlabel("Pageviews")
    ax1.set_ylabel("Page Path")
    ax1.set_title("Top 10 Pages (Last 7 Days)")
    st.pyplot(fig1)
    plt.close(fig1)

    # --- Visualization: Top 10 Pages by Active Users ---
    top_users = df.sort_values(by="activeUsers", ascending=False).head(10)
    st.subheader("Top 10 Pages by Active Users")

    fig2, ax2 = plt.subplots(figsize=(10, 5))
    sns.barplot(data=top_users, x="activeUsers", y="pagePath", ax=ax2, orient="h", color="skyblue")
    ax2.set_xlabel("Active Users")
    ax2.set_ylabel("Page Path")
    ax2.set_title("Top 10 Pages (Last 7 Days)")
    st.pyplot(fig2)
    plt.close(fig2)
