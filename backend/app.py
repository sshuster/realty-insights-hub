
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
import hashlib
import secrets
from datetime import datetime, timedelta

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database setup
DB_PATH = os.path.join(os.path.dirname(__file__), 'realty_insights.db')

def init_db():
    """Initialize the database tables if they don't exist"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Create users table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        role TEXT NOT NULL,
        email TEXT UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
    )
    ''')
    
    # Create courses table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        instructor TEXT,
        category TEXT,
        duration INTEGER,  -- in minutes
        level TEXT,
        price REAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Create enrollments table (links users to courses)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS enrollments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        course_id INTEGER,
        progress INTEGER DEFAULT 0,  -- percentage
        completed_lessons INTEGER DEFAULT 0,
        enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_accessed TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (course_id) REFERENCES courses (id)
    )
    ''')
    
    # Create property_valuations table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS property_valuations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        property_type TEXT,  -- residential or commercial
        address TEXT,
        city TEXT,
        state TEXT,
        zip_code TEXT,
        bedrooms INTEGER,
        bathrooms REAL,
        square_feet INTEGER,
        year_built INTEGER,
        valuation_amount REAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    ''')
    
    # Insert mock users if they don't exist
    # Check if users already exist
    cursor.execute("SELECT COUNT(*) FROM users WHERE username IN ('muser', 'mvc')")
    count = cursor.fetchone()[0]
    
    if count < 2:
        # Insert mock users
        mock_users = [
            ('muser', 'muser', 'user', 'muser@example.com'),
            ('mvc', 'mvc', 'admin', 'mvc@example.com')
        ]
        
        for username, password, role, email in mock_users:
            salt = secrets.token_hex(16)
            password_hash = hashlib.sha256((password + salt).encode()).hexdigest()
            
            cursor.execute(
                "INSERT INTO users (username, password_hash, salt, role, email) VALUES (?, ?, ?, ?, ?)",
                (username, password_hash, salt, role, email)
            )
    
    # Insert sample courses if none exist
    cursor.execute("SELECT COUNT(*) FROM courses")
    if cursor.fetchone()[0] == 0:
        sample_courses = [
            ('Real Estate Fundamentals', 'Learn the basics of real estate valuation and investment.', 'Sarah Johnson', 'Fundamentals', 360, 'Beginner', 99.99),
            ('Commercial Property Valuation', 'Advanced techniques for valuing commercial real estate assets.', 'Michael Chen', 'Valuation', 480, 'Advanced', 149.99),
            ('Residential Market Analysis', 'How to analyze residential real estate markets for investment opportunities.', 'Jessica Martinez', 'Analysis', 300, 'Intermediate', 129.99),
            ('Real Estate Investment Strategies', 'Learn different strategies for investing in various real estate markets.', 'Robert Williams', 'Investment', 420, 'Intermediate', 149.99),
            ('Property Development Fundamentals', 'Understanding the basics of real estate development projects.', 'David Anderson', 'Development', 600, 'Advanced', 199.99)
        ]
        
        for title, description, instructor, category, duration, level, price in sample_courses:
            cursor.execute(
                "INSERT INTO courses (title, description, instructor, category, duration, level, price) VALUES (?, ?, ?, ?, ?, ?, ?)",
                (title, description, instructor, category, duration, level, price)
            )
    
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

# Authentication helpers
def authenticate_user(username, password):
    """Authenticate a user and return user data if successful"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Get user by username
    cursor.execute("SELECT id, username, password_hash, salt, role FROM users WHERE username = ?", (username,))
    user = cursor.fetchone()
    
    if not user:
        conn.close()
        return None
    
    user_id, username, password_hash, salt, role = user
    
    # Check password
    if hashlib.sha256((password + salt).encode()).hexdigest() == password_hash:
        # Update last login
        cursor.execute("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?", (user_id,))
        conn.commit()
        
        result = {
            "id": user_id,
            "username": username,
            "role": role
        }
        conn.close()
        return result
    
    conn.close()
    return None

# API Routes
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    user = authenticate_user(username, password)
    if user:
        return jsonify({"message": "Login successful", "user": user}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    # Create new user
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        salt = secrets.token_hex(16)
        password_hash = hashlib.sha256((password + salt).encode()).hexdigest()
        
        cursor.execute(
            "INSERT INTO users (username, password_hash, salt, role, email) VALUES (?, ?, ?, ?, ?)",
            (username, password_hash, salt, 'user', email)
        )
        conn.commit()
        return jsonify({"message": "Registration successful"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username or email already exists"}), 409
    finally:
        conn.close()

@app.route('/api/users', methods=['GET'])
def get_users():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('''
    SELECT id, username, role, email, created_at, last_login
    FROM users
    ORDER BY created_at DESC
    ''')
    
    users = [dict(row) for row in cursor.fetchall()]
    conn.close()
    
    return jsonify(users), 200

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
    conn.commit()
    
    if cursor.rowcount > 0:
        conn.close()
        return jsonify({"message": f"User with ID {user_id} deleted successfully"}), 200
    else:
        conn.close()
        return jsonify({"error": f"User with ID {user_id} not found"}), 404

@app.route('/api/courses', methods=['GET'])
def get_courses():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('''
    SELECT id, title, description, instructor, category, duration, level, price, created_at
    FROM courses
    ORDER BY created_at DESC
    ''')
    
    courses = [dict(row) for row in cursor.fetchall()]
    conn.close()
    
    return jsonify(courses), 200

@app.route('/api/user/<int:user_id>/courses', methods=['GET'])
def get_user_courses(user_id):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('''
    SELECT c.id, c.title, c.description, c.instructor, c.category, c.duration, c.level,
           e.progress, e.completed_lessons, e.enrolled_at, e.last_accessed
    FROM courses c
    JOIN enrollments e ON c.id = e.course_id
    WHERE e.user_id = ?
    ORDER BY e.enrolled_at DESC
    ''', (user_id,))
    
    courses = [dict(row) for row in cursor.fetchall()]
    conn.close()
    
    return jsonify(courses), 200

@app.route('/api/valuations', methods=['POST'])
def create_valuation():
    data = request.json
    user_id = data.get('user_id')
    property_type = data.get('property_type')
    address = data.get('address')
    city = data.get('city')
    state = data.get('state')
    zip_code = data.get('zip_code')
    bedrooms = data.get('bedrooms')
    bathrooms = data.get('bathrooms')
    square_feet = data.get('square_feet')
    year_built = data.get('year_built')
    valuation_amount = data.get('valuation_amount')
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
    INSERT INTO property_valuations 
    (user_id, property_type, address, city, state, zip_code, bedrooms, bathrooms, square_feet, year_built, valuation_amount)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (user_id, property_type, address, city, state, zip_code, bedrooms, bathrooms, square_feet, year_built, valuation_amount))
    
    conn.commit()
    valuation_id = cursor.lastrowid
    conn.close()
    
    return jsonify({"message": "Valuation saved successfully", "id": valuation_id}), 201

@app.route('/api/user/<int:user_id>/valuations', methods=['GET'])
def get_user_valuations(user_id):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('''
    SELECT id, property_type, address, city, state, zip_code, valuation_amount, created_at
    FROM property_valuations
    WHERE user_id = ?
    ORDER BY created_at DESC
    ''', (user_id,))
    
    valuations = [dict(row) for row in cursor.fetchall()]
    conn.close()
    
    return jsonify(valuations), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
