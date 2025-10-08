from extensions import db

class User(db.Model):
    """
    User model for storing user authentication and personal details.
    """
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    mobile_number = db.Column(db.String(20), unique=True, nullable=False)

    # Progressive profile details (can be updated after initial signup)
    age = db.Column(db.Integer)
    location = db.Column(db.String(100))  # For manual location entry

    # Relationship to the Farm model
    farm = db.relationship('Farm', backref='owner', uselist=False, lazy=True)

    def __repr__(self):
        return f"User('{self.name}', '{self.mobile_number}')"


class Farm(db.Model):
    """
    Farm model for storing farm-specific details.
    """
    id = db.Column(db.Integer, primary_key=True)
    farm_name = db.Column(db.String(120), nullable=True)
    farm_size = db.Column(db.String(50))
    crop_history = db.Column(db.Text)
    soil_type = db.Column(db.String(50))
    soil_report_url = db.Column(db.String(200))  # Stores the URL to the uploaded report
    irrigation_source = db.Column(db.String(100))

    # Foreign key to link a farm to a user
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Farm('{self.farm_name}', '{self.farm_size}')"
