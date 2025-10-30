import yaml
import os
from dotenv import load_dotenv
from google.ads.googleads.oauth2 import get_authorization_url, get_access_and_refresh_token

# Load environment variables from .env
load_dotenv()

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
DEVELOPER_TOKEN = os.getenv("DEVELOPER_TOKEN")
LOGIN_CUSTOMER_ID = os.getenv("LOGIN_CUSTOMER_ID", "")  # optional
CONFIG_FILE = "google-ads.yaml"
SCOPES = ["https://www.googleapis.com/auth/adwords"]

def main():
    print("🚀 Starting Google Ads OAuth2 flow...\n")

    if not all([CLIENT_ID, CLIENT_SECRET, DEVELOPER_TOKEN]):
        print("❌ Missing required environment variables. Please check your .env file.")
        return

    # Step 1: Generate authorization URL
    auth_url = get_authorization_url(CLIENT_ID, SCOPES)
    print("🔗 Open this URL in your browser and authorize access:")
    print(auth_url)

    # Step 2: User provides the auth code
    auth_code = input("\nPaste the authorization code here: ").strip()

    # Step 3: Exchange code for access and refresh tokens
    credentials = get_access_and_refresh_token(CLIENT_ID, CLIENT_SECRET, auth_code)
    refresh_token = credentials["refresh_token"]

    print("\n✅ Successfully generated tokens!")
    print(f"🔑 Refresh token: {refresh_token}")

    # Step 4: Write the google-ads.yaml config
    config_data = {
        "developer_token": DEVELOPER_TOKEN,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "refresh_token": refresh_token,
        "login_customer_id": LOGIN_CUSTOMER_ID
    }

    with open(CONFIG_FILE, "w") as f:
        yaml.dump(config_data, f, sort_keys=False)

    print(f"\n📝 Saved configuration to '{CONFIG_FILE}' successfully.")
    print("You're all set to use the Google Ads API! 🎉")

if __name__ == "__main__":
    main()
