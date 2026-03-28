from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import os

from extensions import db
from models import User, Farm

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
basedir = os.path.abspath(os.path.dirname(__file__))
# Ensure instance directory exists
instance_dir = os.path.join(basedir, 'instance')
os.makedirs(instance_dir, exist_ok=True)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(instance_dir, 'site.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the db with the application
db.init_app(app)

# Create all tables if they don't exist
with app.app_context():
    db.create_all()

# API Keys
OPENWEATHERMAP_API_KEY = "76bfcb13b8679886a3eda86f3c35f384"
DATA_GOV_IN_API_KEY = "579b464db66ec23bdd00000131c5f8cd8112429275ce02227b6ed8a1" 

print("=" * 60)
print("🚀 KISAN MITRA BACKEND SERVER (SQLITE VERSION)")
print("=" * 60)
print(f"✅ Flask initialized")
print(f"✅ CORS enabled for all origins")
print(f"✅ SQLite Local Database Connected")
print("=" * 60)

@app.route("/")
def home():
    """Health check endpoint"""
    return jsonify({
        "status": "success",
        "message": "Kisan Mitra API is running (Local DB)!",
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
        return jsonify({}), 200

    try:
        data = request.json
        name = data.get("name")
        mobile_number = data.get("mobile_number")

        print(f"👤 Name: {name}, 📱 Mobile: {mobile_number}")

        if not name or not mobile_number:
            return jsonify({"error": "Name and mobile number are required"}), 400

        # Check if user already exists
        existing = User.query.filter_by(mobile_number=mobile_number).first()
        if existing:
            print("❌ User already exists")
            return jsonify({"error": "User already exists. Please login instead."}), 409

        # Insert new user
        print("💾 Inserting new user into database...")
        new_user = User(name=name, mobile_number=mobile_number)
        db.session.add(new_user)
        db.session.commit()

        print(f"✅ User registered successfully! ID: {new_user.id}")
        return jsonify({
            "message": "User registered successfully!",
            "user_id": new_user.id,
            "name": name
        }), 201

    except Exception as e:
        print(f"❌ EXCEPTION in register: {str(e)}")
        return jsonify({"error": "Registration failed"}), 500


@app.route("/login", methods=["POST", "OPTIONS"])
def login():
    """Handles user login"""
    print("\n" + "=" * 60)
    print("🔐 LOGIN REQUEST RECEIVED")
    print("=" * 60)
    
    if request.method == "OPTIONS":
        return jsonify({}), 200

    try:
        data = request.json
        mobile_number = data.get("mobile_number")
        if not mobile_number:
            return jsonify({"error": "Mobile number is required"}), 400

        user = User.query.filter_by(mobile_number=mobile_number).first()
        if not user:
            print("❌ User not found")
            return jsonify({"error": "User not found. Please register first."}), 404

        print(f"✅ Login successful! User ID: {user.id}")
        return jsonify({
            "message": "Login successful!",
            "user_id": user.id,
            "name": user.name
        }), 200

    except Exception as e:
        print(f"❌ EXCEPTION in login: {str(e)}")
        return jsonify({"error": "Login failed"}), 500


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
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Update User
        if data.get("age"): user.age = data.get("age")
        if data.get("location_manual"): user.location = data.get("location_manual")

        # Update Farm
        farm = Farm.query.filter_by(user_id=user_id).first()
        if not farm:
            farm = Farm(user_id=user_id)
            db.session.add(farm)

        if data.get("farm_name"): farm.farm_name = data.get("farm_name")
        if data.get("farm_size"): farm.farm_size = data.get("farm_size")
        if data.get("crop_history"): farm.crop_history = data.get("crop_history")
        if data.get("soil_type"): farm.soil_type = data.get("soil_type")
        if data.get("irrigation_source"): farm.irrigation_source = data.get("irrigation_source")

        db.session.commit()
        print("✅ Profile and Farm details updated!")
        return jsonify({"message": "Profile updated successfully!"}), 200

    except Exception as e:
        print(f"❌ EXCEPTION in profile update: {str(e)}")
        return jsonify({"error": "Failed to update profile"}), 500


@app.route("/profile/get/<int:user_id>", methods=["GET"])
def get_profile(user_id):
    """Fetches user and farm details"""
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        farm = Farm.query.filter_by(user_id=user_id).first()

        response_data = {
            "user": {
                "name": user.name or 'N/A',
                "age": user.age or 'N/A',
                "mobile_number": user.mobile_number or 'N/A',
                "location": user.location or 'N/A',
            },
            "farm": {
                "farm_name": farm.farm_name if farm else 'N/A',
                "farm_size": farm.farm_size if farm else 'N/A',
                "crop_history": farm.crop_history if farm else 'N/A',
                "soil_type": farm.soil_type if farm else 'N/A',
                "irrigation_source": farm.irrigation_source if farm else 'N/A',
            }
        }
        return jsonify(response_data), 200

    except Exception as e:
        print(f"❌ EXCEPTION in get profile: {str(e)}")
        return jsonify({"error": "Failed to load profile"}), 500


@app.route("/api/weather", methods=["GET"])
def get_weather():
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

        current_url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHERMAP_API_KEY}&units=metric"
        current_data = requests.get(current_url, timeout=5).json()
        
        forecast_url = f"http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={OPENWEATHERMAP_API_KEY}&units=metric"
        forecast_data = requests.get(forecast_url, timeout=5).json()
        
        forecast_temps = {}
        for item in forecast_data['list']:
            date = item['dt_txt'].split(" ")[0]
            forecast_temps.setdefault(date, []).append(item['main']['temp'])
            
        daily_avg = {date: round(sum(temps)/len(temps), 1) for date, temps in forecast_temps.items()}
        dates = list(daily_avg.keys())
        
        return jsonify({
            'location': location,
            'current': {'temp': current_data['main']['temp'], 'condition': current_data['weather'][0]['description']},
            'forecast': {
                'tomorrow': daily_avg[dates[1]] if len(dates) > 1 else None,
                'day2': daily_avg[dates[2]] if len(dates) > 2 else None,
                'day3': daily_avg[dates[3]] if len(dates) > 3 else None,
            }
        }), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch weather"}), 500


@app.route("/api/live_market", methods=["GET", "OPTIONS"])
def fetch_live_commodity_prices():
    if request.method == "OPTIONS":
        return jsonify({}), 200
    mock_data = [
        {"crop": "Wheat", "today": 2850, "seven_days_ago": 2700, "change": 5.56},
        {"crop": "Rice", "today": 3200, "seven_days_ago": 3050, "change": 4.92},
        {"crop": "Maize", "today": 2100, "seven_days_ago": 1950, "change": 7.69},
        {"crop": "Sugarcane", "today": 380, "seven_days_ago": 230, "change": 65.22}
    ]
    return jsonify(mock_data), 200

# Run Server
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)