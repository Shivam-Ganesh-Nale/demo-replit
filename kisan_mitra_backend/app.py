# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import os
# import requests
# from supabase import create_client, Client
# # from extensions import db
#  # import db from extensions

# # Initialize Flask app
# app = Flask(__name__)
# CORS(app)

# # Database Configuration
# SUPABASE_URL = "https://wslbgavichffbfljolxn.supabase.co"          # Replace with your Supabase project URL
# SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzbGJnYXZpY2hmZmJmbGpvbHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MTU0MzMsImV4cCI6MjA3NTA5MTQzM30.JORn8uoKCqiNV-rLeerJzMmwx3JZT_X1VUqtl8_a3RI"                # Replace with your Supabase anon/public API key
# supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY) # Initialize db with app

# # Import models AFTER db.init_app
# from models import User, Farm

# # --- API Keys ---
# OPENWEATHERMAP_API_KEY = "76bfcb13b8679886a3eda86f3c35f384"
# GEOCODING_API_KEY = "76bfcb13b8679886a3eda86f3c35f384"

# # ----------------- API Endpoints -----------------
# @app.route("/")
# def home():
#     return "Agro AI API Running ✅"

# @app.route("/register", methods=["POST"])
# def register():
#     data = request.json
#     name = data.get("name")
#     mobile_number = data.get("mobile_number")

#     if not name or not mobile_number:
#         return jsonify({"error": "Name and mobile number are required"}), 400

#     # Check if user already exists in Supabase
#     existing = supabase.table("users").select("*").eq("mobile_number", mobile_number).execute()
#     if existing.data and len(existing.data) > 0:
#         return jsonify({"error": "User already exists"}), 409

#     # Insert new user
#     result = supabase.table("users").insert({
#         "name": name,
#         "mobile_number": mobile_number
#     }).execute()

#     return jsonify({
#         "message": "User registered successfully!",
#         "user": result.data[0]
#     }), 201

# @app.route("/api/weather", methods=["GET"])
# def get_weather():
#     location = request.args.get('location')
#     lat = request.args.get('lat')
#     lon = request.args.get('lon')

#     try:
#         # --- Reverse geocoding or geocoding ---
#         if lat and lon:
#             nominatim_url = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}"
#             headers = {"User-Agent": "YourAppName/1.0"}
#             location_data = requests.get(nominatim_url, headers=headers).json()
#             location = location_data.get('address', {}).get('city') or location_data.get('display_name', 'Unknown')
#         elif location:
#             geocode_url = f"http://api.openweathermap.org/geo/1.0/direct?q={location}&limit=1&appid={OPENWEATHERMAP_API_KEY}"
#             geocode_data = requests.get(geocode_url).json()
#             if not geocode_data:
#                 return jsonify({"error": "Location not found."}), 404
#             lat, lon = geocode_data[0]['lat'], geocode_data[0]['lon']
#         else:
#             return jsonify({"error": "Provide either location name or lat/lon."}), 400

#         # --- Current weather ---
#         current_url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHERMAP_API_KEY}&units=metric"
#         current_data = requests.get(current_url).json()
#         current_temp = current_data['main']['temp']
#         current_condition = current_data['weather'][0]['description']

#         # --- Forecast ---
#         forecast_url = f"http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={OPENWEATHERMAP_API_KEY}&units=metric"
#         forecast_data = requests.get(forecast_url).json()
#         forecast_temps = {}
#         for item in forecast_data['list']:
#             date = item['dt_txt'].split(" ")[0]
#             temp = item['main']['temp']
#             forecast_temps.setdefault(date, []).append(temp)
#         daily_avg = {date: round(sum(temps)/len(temps), 1) for date, temps in forecast_temps.items()}
#         dates = list(daily_avg.keys())
#         forecast_result = {
#             'tomorrow': daily_avg[dates[1]] if len(dates) > 1 else None,
#             'day2': daily_avg[dates[2]] if len(dates) > 2 else None,
#             'day3': daily_avg[dates[3]] if len(dates) > 3 else None,
#         }

#         # --- Store in Supabase ---
#         supabase.table("weather_history").insert({
#             "city": location,
#             "temp": current_temp,
#             "condition": current_condition,
#             "forecast": forecast_result
#         }).execute()

#         # --- Return response ---
#         return jsonify({
#             'location': location,
#             'current': {'temp': current_temp, 'condition': current_condition},
#             'forecast': forecast_result
#         }), 200

#     except Exception as e:
#         print(f"Error fetching weather data: {e}")
#         return jsonify({"error": "Failed to fetch weather data."}), 500


# # ----------------- Run Server -----------------
# if __name__ == "__main__":
#      # Creates tables if they don’t exist
#     app.run(host="0.0.0.0", port=5000, debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from supabase import create_client, Client
import json

# Initialize Flask app
app = Flask(__name__)

# CRITICAL: Enable CORS for all routes
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Database Configuration
SUPABASE_URL = "https://wslbgavichffbfljolxn.supabase.co"          
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzbGJnYXZpY2hmZmJmbGpvbHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MTU0MzMsImV4cCI6MjA3NTA5MTQzM30.JORn8uoKCqiNV-rLeerJzMmwx3JZT_X1VUqtl8_a3RI" 
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY) 

# API Keys
OPENWEATHERMAP_API_KEY = "76bfcb13b8679886a3eda86f3c35f384"
DATA_GOV_IN_API_KEY = "579b464db66ec23bdd00000131c5f8cd8112429275ce02227b6ed8a1" 

print("=" * 60)
print("🚀 KISAN MITRA BACKEND SERVER")
print("=" * 60)
print(f"✅ Flask initialized")
print(f"✅ CORS enabled for all origins")
print(f"✅ Supabase client created")
print("=" * 60)

@app.route("/")
def home():
    """Health check endpoint"""
    return jsonify({
        "status": "success",
        "message": "Kisan Mitra API is running!",
        "endpoints": [
            "/register",
            "/login",
            "/profile/update",
            "/profile/get/<user_id>",
            "/api/weather",
            "/api/live_market"
        ]
    }), 200


@app.route("/register", methods=["POST", "OPTIONS"])
def register():
    """Handles new user registration"""
    print("\n" + "=" * 60)
    print("📝 REGISTER REQUEST RECEIVED")
    print("=" * 60)
    
    if request.method == "OPTIONS":
        print("⚠️  OPTIONS preflight request")
        return jsonify({}), 200

    try:
        data = request.json
        print(f"📦 Request data: {data}")
        
        name = data.get("name")
        mobile_number = data.get("mobile_number")

        print(f"👤 Name: {name}")
        print(f"📱 Mobile: {mobile_number}")

        # Validation
        if not name or not mobile_number:
            print("❌ Validation failed: Missing fields")
            return jsonify({"error": "Name and mobile number are required"}), 400

        # Check if user already exists
        print("🔍 Checking if user exists...")
        existing = supabase.table("users").select("id").eq("mobile_number", mobile_number).execute()
        print(f"📊 Existing users found: {len(existing.data) if existing.data else 0}")
        
        if existing.data and len(existing.data) > 0:
            print("❌ User already exists")
            return jsonify({"error": "User already exists. Please login instead."}), 409

        # Insert new user
        print("💾 Inserting new user into database...")
        result = supabase.table("users").insert({
            "name": name,
            "mobile_number": mobile_number
        }).execute()

        print(f"📊 Supabase response data: {result.data}")

        # Extract user_id
        if result.data and len(result.data) > 0:
            new_user_id = result.data[0].get('id')
            if new_user_id:
                print(f"✅ User registered successfully!")
                print(f"🆔 New user ID: {new_user_id}")
                print("=" * 60)
                return jsonify({
                    "message": "User registered successfully!",
                    "user_id": new_user_id,
                    "name": name
                }), 201
            else:
                print("❌ Error: User ID not in response")
                return jsonify({"error": "Registration failed - ID not generated"}), 500
        else:
            print("❌ Error: No data returned from Supabase")
            print(f"Full result: {result}")
            return jsonify({"error": "Registration failed - no data returned"}), 500

    except Exception as e:
        print(f"❌ EXCEPTION in register: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Registration failed: {str(e)}"}), 500


@app.route("/login", methods=["POST", "OPTIONS"])
def login():
    """Handles user login"""
    print("\n" + "=" * 60)
    print("🔐 LOGIN REQUEST RECEIVED")
    print("=" * 60)
    
    if request.method == "OPTIONS":
        print("⚠️  OPTIONS preflight request")
        return jsonify({}), 200

    try:
        data = request.json
        print(f"📦 Request data: {data}")
        
        mobile_number = data.get("mobile_number")
        print(f"📱 Mobile: {mobile_number}")

        if not mobile_number:
            print("❌ Validation failed: No mobile number")
            return jsonify({"error": "Mobile number is required"}), 400

        # Find user
        print("🔍 Searching for user...")
        user_result = supabase.table("users").select("id, name").eq("mobile_number", mobile_number).execute()
        print(f"📊 Users found: {len(user_result.data) if user_result.data else 0}")
        
        if not user_result.data or len(user_result.data) == 0:
            print("❌ User not found")
            return jsonify({"error": "User not found. Please register first."}), 404

        user_data = user_result.data[0]
        print(f"✅ Login successful!")
        print(f"🆔 User ID: {user_data['id']}")
        print(f"👤 Name: {user_data['name']}")
        print("=" * 60)
        
        return jsonify({
            "message": "Login successful!",
            "user_id": user_data['id'],
            "name": user_data['name']
        }), 200

    except Exception as e:
        print(f"❌ EXCEPTION in login: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Login failed: {str(e)}"}), 500


@app.route("/profile/update", methods=["POST", "OPTIONS"])
def update_profile():
    """Updates user and farm profile"""
    print("\n" + "=" * 60)
    print("📝 PROFILE UPDATE REQUEST")
    print("=" * 60)
    
    if request.method == "OPTIONS":
        return jsonify({}), 200

    data = request.json
    user_id = data.get("user_id") 
    print(f"🆔 User ID: {user_id}")
    
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    try:
        # Update user details
        user_update_data = {
            "age": data.get("age"),
            "location": data.get("location_manual"),
        }
        user_update_data = {k: v for k, v in user_update_data.items() if v is not None and v != ''}
        
        if user_update_data:
            print(f"💾 Updating user table: {user_update_data}")
            supabase.table("users").update(user_update_data).eq("id", user_id).execute()

        # Update farm details
        farm_update_data = {
            "user_id": user_id,
            "farm_name": data.get("farm_name"),
            "farm_size": data.get("farm_size"),
            "crop_history": data.get("crop_history"),
            "soil_type": data.get("soil_type"),
            "irrigation_source": data.get("irrigation_source")
        }
        
        print(f"💾 Updating farm details: {farm_update_data}")
        farm_exists = supabase.table("farm_details").select("id").eq("user_id", user_id).execute()
        
        if farm_exists.data and len(farm_exists.data) > 0:
            supabase.table("farm_details").update(farm_update_data).eq("user_id", user_id).execute()
            print("✅ Farm details updated")
        else:
            supabase.table("farm_details").insert(farm_update_data).execute()
            print("✅ Farm details created")

        print("=" * 60)
        return jsonify({"message": "Profile updated successfully!"}), 200

    except Exception as e:
        print(f"❌ EXCEPTION in profile update: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Failed to update profile: {str(e)}"}), 500


@app.route("/profile/get/<int:user_id>", methods=["GET"])
def get_profile(user_id):
    """Fetches user and farm details"""
    print("\n" + "=" * 60)
    print(f"📖 GET PROFILE REQUEST - User ID: {user_id}")
    print("=" * 60)
    
    try:
        # Fetch user details
        user_result = supabase.table("users").select("*").eq("id", user_id).execute()
        
        if not user_result.data or len(user_result.data) == 0:
            print("❌ User not found")
            return jsonify({"error": "User not found"}), 404
        
        user_data = user_result.data[0]
        print(f"✅ User data found: {user_data}")

        # Fetch farm details
        farm_result = supabase.table("farm_details").select("*").eq("user_id", user_id).execute()
        farm_data = farm_result.data[0] if farm_result.data and len(farm_result.data) > 0 else {}
        print(f"✅ Farm data: {farm_data}")

        response_data = {
            "user": {
                "name": user_data.get('name', 'N/A'),
                "age": user_data.get('age', 'N/A'),
                "mobile_number": user_data.get('mobile_number', 'N/A'),
                "location": user_data.get('location', 'N/A'),
            },
            "farm": {
                "farm_name": farm_data.get('farm_name', 'N/A'),
                "farm_size": farm_data.get('farm_size', 'N/A'),
                "crop_history": farm_data.get('crop_history', 'N/A'),
                "soil_type": farm_data.get('soil_type', 'N/A'),
                "irrigation_source": farm_data.get('irrigation_source', 'N/A'),
            }
        }
        
        print("=" * 60)
        return jsonify(response_data), 200

    except Exception as e:
        print(f"❌ EXCEPTION in get profile: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Failed to load profile: {str(e)}"}), 500


@app.route("/api/weather", methods=["GET"])
def get_weather():
    """Fetches weather data"""
    print("\n🌤️  Weather request received")
    
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    location_name = request.args.get('location') 

    try:
        if lat and lon:
            nominatim_url = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}"
            headers = {"User-Agent": "KisanMitraApp/1.0"}
            location_data = requests.get(nominatim_url, headers=headers, timeout=5).json()
            
            address = location_data.get('address', {})
            location = address.get('city') or address.get('town') or address.get('village') or location_data.get('display_name', 'Unknown')
            
        elif location_name:
            geocode_url = f"http://api.openweathermap.org/geo/1.0/direct?q={location_name}&limit=1&appid={OPENWEATHERMAP_API_KEY}"
            geocode_data = requests.get(geocode_url, timeout=5).json()
            
            if not geocode_data:
                return jsonify({"error": "Location not found"}), 404
            
            lat, lon = geocode_data[0]['lat'], geocode_data[0]['lon']
            location = geocode_data[0]['name']
        else:
            return jsonify({"error": "Provide either location name or lat/lon"}), 400

        # Fetch current weather
        current_url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHERMAP_API_KEY}&units=metric"
        current_data = requests.get(current_url, timeout=5).json()
        current_temp = current_data['main']['temp']
        current_condition = current_data['weather'][0]['description']

        # Fetch forecast
        forecast_url = f"http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={OPENWEATHERMAP_API_KEY}&units=metric"
        forecast_data = requests.get(forecast_url, timeout=5).json()
        
        forecast_temps = {}
        for item in forecast_data['list']:
            date = item['dt_txt'].split(" ")[0]
            temp = item['main']['temp']
            forecast_temps.setdefault(date, []).append(temp)
            
        daily_avg = {date: round(sum(temps)/len(temps), 1) for date, temps in forecast_temps.items()}
        dates = list(daily_avg.keys())
        
        forecast_result = {
            'tomorrow': daily_avg[dates[1]] if len(dates) > 1 else None,
            'day2': daily_avg[dates[2]] if len(dates) > 2 else None,
            'day3': daily_avg[dates[3]] if len(dates) > 3 else None,
        }

        print(f"✅ Weather fetched for: {location}")
        return jsonify({
            'location': location,
            'current': {'temp': current_temp, 'condition': current_condition},
            'forecast': forecast_result
        }), 200

    except Exception as e:
        print(f"❌ Weather error: {e}")
        return jsonify({"error": f"Failed to fetch weather: {str(e)}"}), 500


@app.route("/api/live_market", methods=["GET", "OPTIONS"])
def fetch_live_commodity_prices():
    """Fetches commodity prices"""
    print("\n💰 Market data request received")
    
    if request.method == "OPTIONS":
        return jsonify({}), 200
        
    try:
        # Return mock data for now
        mock_data = [
            {"crop": "Wheat", "today": 2850, "seven_days_ago": 2700, "change": 5.56},
            {"crop": "Rice", "today": 3200, "seven_days_ago": 3050, "change": 4.92},
            {"crop": "Maize", "today": 2100, "seven_days_ago": 1950, "change": 7.69},
            {"crop": "Sugarcane", "today": 380, "seven_days_ago": 230, "change": 65.22}
        ]
        
        print(f"✅ Returning market data: {len(mock_data)} items")
        return jsonify(mock_data), 200

    except Exception as e:
        print(f"❌ Market data error: {e}")
        return jsonify([]), 200


# Run Server
if __name__ == "__main__":
    print("\n" + "=" * 60)
    print("🎯 Starting Flask Server...")
    print("=" * 60)
    print("📡 Server URL: http://127.0.0.1:5000")
    print("🌐 CORS: Enabled for all origins")
    print("=" * 60)
    print("\n✅ Server is ready! Open your browser and check the console.\n")
    
    app.run(host="0.0.0.0", port=5000, debug=True)