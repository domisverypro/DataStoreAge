from flask import Flask, render_template

# Initialize the Flask application
app = Flask(__name__)

# Home route
@app.route('/')
def home():
    return '<h1>Welcome to My Website</h1><p>This website is accessible from anywhere in the world!</p>'

# Another example route
@app.route('/about')
def about():
    return '<h1>About Us</h1><p>This is a simple website served by Flask!</p>'

if __name__ == '__main__':
    # Start the Flask app on all available IPs, allowing access from any network
    app.run(host='0.0.0.0', port=5000)
