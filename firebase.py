from flask import Flask, render_template, request
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Initialize Flask app
app = Flask(__name__)

# Initialize Firebase with your credentials
cred = credentials.Certificate("path/to/serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://your-project-id.firebaseio.com'
})

# Function to save user data to Firebase
def save_user_data(email, name):
    # Get a reference to the Firebase Realtime Database
    ref = db.reference('users')

    # Push the user data to the database
    ref.push({
        'email': email,
        'name': name
    })

# Route to handle form submissions
@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        email = request.form['email']
        name = request.form['name']
        save_user_data(email, name)
        return 'Data saved successfully!'

# Route to render the form
@app.route('/')
def index():
    return render_template('index.html')

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
