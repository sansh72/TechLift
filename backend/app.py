from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load .env variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Build the connection string
app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"postgresql://{os.getenv('user')}:{os.getenv('password')}"
    f"@{os.getenv('host')}:{os.getenv('port')}/{os.getenv('dbname')}"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class WebsiteRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    organization = db.Column(db.String(100))
    email = db.Column(db.String(120))
    phone = db.Column(db.String(20))
    message = db.Column(db.Text)

with app.app_context():
    db.create_all()

@app.route('/submit', methods=['POST'])
def submit_request():
    data = request.get_json()
    new_request = WebsiteRequest(
        name=data['name'],
        organization=data['organization'],
        email=data['email'],
        phone=data['phone'],
        message=data['message']
    )
    db.session.add(new_request)
    db.session.commit()
    return jsonify({'status': 'success'}), 200

if __name__ == '__main__':
    app.run(debug=True)