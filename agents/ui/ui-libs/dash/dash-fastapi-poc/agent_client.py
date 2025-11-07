# dash_app.py
import pandas as pd
import requests
from dash import Dash, dcc, html, Input, Output
import plotly.express as px

API_URL = "http://localhost:8000"

app = Dash(__name__)
app.title = "Analytics Dashboard"

app.layout = html.Div([
    html.H2("📊 Analytics Dashboard"),
    dcc.Dropdown(
        id="dataset",
        options=[
            {"label": "Google Analytics (GA4)", "value": "ga"},
            {"label": "Google Ads", "value": "ads"}
        ],
        value="ga",
        style={"width": "50%"}
    ),
    dcc.Graph(id="graph"),
    dcc.Interval(id="refresh", interval=60*1000, n_intervals=0)
])

@app.callback(
    Output("graph", "figure"),
    [Input("dataset", "value"), Input("refresh", "n_intervals")]
)
def update_chart(selected, _):
    if selected == "ga":
        response = requests.get(f"{API_URL}/api/ga_report")
        data = response.json()
        df = pd.DataFrame(data)
        if df.empty:
            return px.scatter(title="No GA Data")
        df["activeUsers"] = pd.to_numeric(df["activeUsers"], errors="coerce")
        df["sessions"] = pd.to_numeric(df["sessions"], errors="coerce")
        return px.line(df, x="date", y=["activeUsers", "sessions"], title="GA4 Active Users & Sessions")
    else:
        response = requests.get(f"{API_URL}/api/ads_report")
        data = response.json()
        df = pd.DataFrame(data)
        if df.empty:
            return px.scatter(title="No Ads Data")
        df["cost"] = df["cost_micros"].astype(float) / 1e6
        return px.bar(df, x="date", y="clicks", color="campaign", title="Google Ads Clicks by Campaign")

if __name__ == "__main__":
    app.run_server(host="0.0.0.0", port=8050, debug=True)
