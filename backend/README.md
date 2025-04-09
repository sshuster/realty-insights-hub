
# Realty Insights Hub Backend

This is the backend server for the Realty Insights Hub application, built with Flask and SQLite.

## Setup and Installation

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Installation

1. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install flask flask-cors
   ```

3. Run the server:
   ```bash
   python app.py
   ```

The server will start at http://localhost:5000

## API Routes

### Authentication
- `POST /api/auth/login` - Login with username and password
- `POST /api/auth/register` - Register a new user

### User Management
- `GET /api/users` - Get all users
- `DELETE /api/users/<user_id>` - Delete a user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/user/<user_id>/courses` - Get courses for a specific user

### Valuations
- `POST /api/valuations` - Create a new property valuation
- `GET /api/user/<user_id>/valuations` - Get valuations for a specific user

## Database Structure

The application uses SQLite with the following tables:
- `users`: User accounts and authentication
- `courses`: Available training courses
- `enrollments`: User enrollment in courses
- `property_valuations`: Property valuation records

## Mock Users

The system includes two pre-configured mock users:
1. Username: `muser`, Password: `muser` - Standard user role
2. Username: `mvc`, Password: `mvc` - Admin role
