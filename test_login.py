import requests

def test_login():
    # Use port 8002 as it's the one we know is running with the fix
    url = "http://localhost:8002/auth/login"
    
    # OAuth2PasswordRequestForm expects form data, not JSON
    # and fields 'username' and 'password'
    payload = {
        "username": "debug_user@example.com", 
        "password": "password123"
    }
    
    try:
        print(f"Sending login request to {url}...")
        # Note: OAuth2 uses form data (data=...), not json
        response = requests.post(url, data=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_login()
